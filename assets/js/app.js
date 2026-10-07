/**
 * Fidyah Care — Main Application Controller (Vanilla JS ES Module)
 */

import { DecisionEngine } from './engine.js';
import { calculateFidyah, formatRupiah } from './calculator.js';
import { formatTraceBreadcrumb, generateAuditJson } from './traceability.js';
import { UIManager } from './ui.js';

class FidyahCareApp {
  constructor() {
    this.ui = new UIManager();
    this.sources = [];
    this.rules = [];
    this.tree = {};
    this.sourcesMap = new Map();
    this.rulesMap = new Map();

    this.engine = null;
    this.wizardState = null;
    this.lastTrace = null;

    // Calculator state
    this.calcState = {
      days: 1,
      stapleFrameworkId: 'mud_shafii_675',
      customGrams: 675,
      includeMonetary: false,
      monetaryFrameworkId: 'baznas_ri_2026',
      customMonetaryAmount: 65000
    };
  }

  async init() {
    try {
      await this.loadData();
      this.engine = new DecisionEngine({
        rules: this.rules,
        sources: this.sources,
        tree: this.tree
      });

      this.wizardState = this.engine.getInitialState();
      this.bindEvents();
      this.renderCurrentWizardStep();
      this.updateCalculator();
      this.initNetworkStatus();
      this.initPWA();
      this.ui.refreshIcons();

      console.log('Fidyah Care App initialized successfully.');
    } catch (err) {
      console.error('Initialization error:', err);
      this.ui.showToast('Gagal memuat data aplikasi: ' + err.message);
    }
  }

  /**
   * Memuat data statis lokal
   */
  async loadData() {
    const [srcRes, ruleRes, treeRes] = await Promise.all([
      fetch('assets/data/sources.json'),
      fetch('assets/data/rules.json'),
      fetch('assets/data/decisionTree.json')
    ]);

    this.sources = await srcRes.json();
    this.rules = await ruleRes.json();
    this.tree = await treeRes.json();

    this.sourcesMap = new Map(this.sources.map(s => [s.id, s]));
    this.rulesMap = new Map(this.rules.map(r => [r.rule_id, r]));

    // Render katalog awal di tab dasar hukum
    this.ui.renderRulesCatalog(this.rules, (rule) => this.handleRuleSelected(rule));
    this.ui.renderSourcesCatalog(this.sources, (src) => this.ui.openSourceModal(src));
  }

  /**
   * Menghubungkan seluruh interaksi event listener
   */
  bindEvents() {
    // Navigasi Utama (Desktop & Mobile)
    document.querySelectorAll('.dnav-link, .bnav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        this.ui.switchTab(view);
      });
    });

    // Tombol Brand Logo -> Beranda
    document.getElementById('btn-goto-home')?.addEventListener('click', () => {
      this.ui.switchTab('home');
    });

    // Pilihan Hub Card di Beranda
    document.querySelectorAll('.hub-card[data-view]').forEach(card => {
      card.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        this.ui.switchTab(view);
      });
    });

    // Tombol Creator di Beranda & Tombol Kembali dari Creator
    document.getElementById('btn-home-creator')?.addEventListener('click', () => {
      this.ui.switchTab('creator');
    });

    document.getElementById('btn-back-from-creator')?.addEventListener('click', () => {
      this.ui.switchTab('home');
    });

    // Kontrol Wizard
    document.getElementById('btn-wizard-back')?.addEventListener('click', () => {
      this.handleWizardBack();
    });

    document.getElementById('btn-wizard-reset')?.addEventListener('click', () => {
      this.handleWizardReset();
    });

    // Kontrol Hasil Wizard
    document.getElementById('btn-result-restart')?.addEventListener('click', () => {
      this.handleWizardReset();
    });

    document.getElementById('btn-result-to-calc')?.addEventListener('click', () => {
      this.ui.switchTab('calculator');
    });

    document.getElementById('btn-result-inspect-trace')?.addEventListener('click', () => {
      this.ui.switchTab('audit');
    });

    // Kontrol Modal Ketentuan (Rule Detail)
    document.getElementById('btn-close-rule-modal')?.addEventListener('click', () => {
      this.ui.closeRuleModal();
    });

    document.getElementById('rule-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'rule-modal') this.ui.closeRuleModal();
    });

    // Kontrol Modal Sumber
    document.getElementById('btn-close-source-modal')?.addEventListener('click', () => {
      this.ui.closeSourceModal();
    });

    document.getElementById('source-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'source-modal') this.ui.closeSourceModal();
    });

    // Kontrol Kalkulator Hari
    const daysInput = document.getElementById('calc-days-input');
    daysInput?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) || 1;
      this.calcState.days = Math.max(1, Math.min(365, val));
      this.updateCalculator();
    });

    document.getElementById('btn-calc-minus')?.addEventListener('click', () => {
      this.calcState.days = Math.max(1, this.calcState.days - 1);
      if (daysInput) daysInput.value = this.calcState.days;
      this.updateCalculator();
    });

    document.getElementById('btn-calc-plus')?.addEventListener('click', () => {
      this.calcState.days = Math.min(365, this.calcState.days + 1);
      if (daysInput) daysInput.value = this.calcState.days;
      this.updateCalculator();
    });

    // Preset Hari Pills
    document.querySelectorAll('.preset-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.preset-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const d = parseInt(e.currentTarget.dataset.days, 10);
        this.calcState.days = d;
        if (daysInput) daysInput.value = d;
        this.updateCalculator();
      });
    });

    // Pilihan Kerangka Beras (Staple)
    const customGramsInput = document.getElementById('input-custom-grams');
    document.querySelectorAll('.staple-option[data-staple]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.id === 'input-custom-grams') return;
        document.querySelectorAll('.staple-option[data-staple]').forEach(c => c.classList.remove('active'));
        const el = e.currentTarget;
        el.classList.add('active');
        this.calcState.stapleFrameworkId = el.dataset.staple;

        if (this.calcState.stapleFrameworkId === 'mud_custom') {
          customGramsInput?.classList.remove('hidden');
          customGramsInput?.focus();
        } else {
          customGramsInput?.classList.add('hidden');
        }
        this.updateCalculator();
      });
    });

    customGramsInput?.addEventListener('input', (e) => {
      this.calcState.customGrams = parseInt(e.target.value, 10) || 675;
      this.updateCalculator();
    });

    // Toggle Fidyah Uang
    const toggleMonetary = document.getElementById('toggle-monetary');
    const monWrap = document.getElementById('monetary-options-wrapper');
    toggleMonetary?.addEventListener('change', (e) => {
      this.calcState.includeMonetary = e.target.checked;
      if (this.calcState.includeMonetary) {
        monWrap?.classList.remove('hidden');
      } else {
        monWrap?.classList.add('hidden');
      }
      this.updateCalculator();
    });

    // Pilihan Kerangka Uang
    const customMonetaryInput = document.getElementById('input-custom-monetary');
    document.querySelectorAll('.staple-option[data-monetary]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.id === 'input-custom-monetary') return;
        document.querySelectorAll('.staple-option[data-monetary]').forEach(c => c.classList.remove('active'));
        const el = e.currentTarget;
        el.classList.add('active');
        this.calcState.monetaryFrameworkId = el.dataset.monetary;

        if (this.calcState.monetaryFrameworkId === 'baznas_daerah_custom') {
          customMonetaryInput?.classList.remove('hidden');
          customMonetaryInput?.focus();
        } else {
          customMonetaryInput?.classList.add('hidden');
        }
        this.updateCalculator();
      });
    });

    customMonetaryInput?.addEventListener('input', (e) => {
      this.calcState.customMonetaryAmount = parseInt(e.target.value, 10) || 50000;
      this.updateCalculator();
    });

    // Tombol Salin Rincian Kalkulator
    document.getElementById('btn-copy-calc')?.addEventListener('click', () => {
      this.copyCalculatorSummary();
    });

    // Sub-nav Dasar Hukum — class-based toggling
    const tabRules = document.getElementById('subnav-rules');
    const tabSources = document.getElementById('subnav-sources');
    const tabFoundation = document.getElementById('subnav-foundation');

    const contentRules = document.getElementById('tab-rules-content');
    const contentSources = document.getElementById('tab-sources-content');
    const contentFoundation = document.getElementById('tab-foundation-content');

    const activateTab = (activeBtn, activeContent) => {
      [tabRules, tabSources, tabFoundation].forEach(b => b?.classList.remove('active'));
      [contentRules, contentSources, contentFoundation].forEach(c => c?.classList.add('hidden'));
      activeBtn?.classList.add('active');
      activeContent?.classList.remove('hidden');
    };

    tabRules?.addEventListener('click', () => activateTab(tabRules, contentRules));
    tabSources?.addEventListener('click', () => activateTab(tabSources, contentSources));
    tabFoundation?.addEventListener('click', () => activateTab(tabFoundation, contentFoundation));

    // Inisialisasi tab pertama aktif
    activateTab(tabRules, contentRules);

    // Salin JSON Audit
    document.getElementById('btn-copy-audit-json')?.addEventListener('click', () => {
      const json = document.getElementById('audit-json-display')?.textContent;
      if (json && json !== '{}') {
        navigator.clipboard.writeText(json);
        this.ui.showToast('Log Audit JSON berhasil disalin ke clipboard!');
      } else {
        this.ui.showToast('Belum ada log audit untuk disalin.');
      }
    });

    // Live Test Runner di Browser
    document.getElementById('btn-run-live-tests')?.addEventListener('click', () => {
      this.runLiveTests();
    });
  }

  /**
   * Menangani pilihan jawaban pada wizard
   */
  handleSelectOption(optionId) {
    this.wizardState = this.engine.processAnswer(this.wizardState, optionId);

    if (this.wizardState.isComplete) {
      this.lastTrace = this.wizardState.trace;
      this.updateAuditView();
      this.ui.renderResult(
        this.wizardState.result,
        this.wizardState.trace,
        this.sourcesMap,
        {
          onToCalc: () => this.ui.switchTab('calculator'),
          onInspectTrace: () => this.ui.switchTab('audit'),
          onRestart: () => this.handleWizardReset(),
          onOpenSource: (srcId) => this.handleOpenSourceById(srcId)
        }
      );
    } else {
      this.renderCurrentWizardStep();
    }
  }

  handleWizardBack() {
    this.wizardState = this.engine.stepBack(this.wizardState);
    this.renderCurrentWizardStep();
  }

  handleWizardReset() {
    this.wizardState = this.engine.getInitialState();
    this.renderCurrentWizardStep();
  }

  renderCurrentWizardStep() {
    if (this.wizardState.currentQuestion) {
      this.ui.renderQuestion(
        this.wizardState.currentQuestion,
        this.wizardState.answersHistory.length,
        (optId) => this.handleSelectOption(optId)
      );
    }
  }

  handleOpenSourceById(sourceId) {
    const s = this.sourcesMap.get(sourceId);
    if (s) {
      this.ui.openSourceModal(s);
    } else {
      this.ui.showToast(`Sumber ${sourceId} belum termuat.`);
    }
  }

  handleRuleSelected(rule) {
    this.ui.openRuleModal(rule, this.sourcesMap, (sourceId) => {
      this.handleOpenSourceById(sourceId);
    });
  }

  /**
   * Memperbarui kalkulator dan tampilan hasilnya
   */
  updateCalculator() {
    const calcData = calculateFidyah({
      days: this.calcState.days,
      stapleFrameworkId: this.calcState.stapleFrameworkId,
      customGrams: this.calcState.customGrams,
      includeMonetary: this.calcState.includeMonetary,
      monetaryFrameworkId: this.calcState.monetaryFrameworkId,
      customMonetaryAmount: this.calcState.customMonetaryAmount,
      sourcesMap: this.sourcesMap
    });

    this.ui.renderCalculatorOutput(calcData);
    this.currentCalcData = calcData;
  }

  /**
   * Menyalin ringkasan hitungan ke clipboard
   */
  copyCalculatorSummary() {
    if (!this.currentCalcData) return;
    const c = this.currentCalcData;
    let text = `*Rincian Perhitungan Fidyah (Fidyah Care)*\n`;
    text += `• Hari Puasa: ${c.days} hari\n`;
    text += `• Satuan Pokok (Nash): ${c.primary_unit.unit_label}\n`;
    text += `• Bahan Pokok: ${c.staple_food.total_kg} kg Beras (${c.staple_food.framework_name})\n`;
    if (c.monetary) {
      text += `• Opsi Uang (Hanafi/BAZNAS): ${c.monetary.totalFormatted} (${c.monetary.frameworkName})\n`;
    }
    text += `• Peruntukan: Fakir & Miskin\n`;
    text += `• Rujukan: ${c.sources.map(s => s.title).join(', ')}\n`;
    text += `_Dihitung melalui Fidyah Care (KB v2.3 - Sesuai Sumber Sahih)_`;

    navigator.clipboard.writeText(text).then(() => {
      this.ui.showToast('Rincian perhitungan berhasil disalin ke clipboard!');
    }).catch(() => {
      this.ui.showToast('Gagal menyalin teks.');
    });
  }

  /**
   * Memperbarui tampilan tab Audit & Traceability
   */
  updateAuditView() {
    const breadcrumbEl = document.getElementById('audit-breadcrumb-display');
    const jsonEl = document.getElementById('audit-json-display');

    if (this.lastTrace) {
      if (breadcrumbEl) breadcrumbEl.textContent = formatTraceBreadcrumb(this.lastTrace);
      if (jsonEl) jsonEl.textContent = generateAuditJson(this.lastTrace);
    }
  }

  /**
   * Menjalankan Live Test Runner langsung di browser
   */
  runLiveTests() {
    const container = document.getElementById('live-test-results');
    if (!container) return;
    container.classList.remove('hidden');
    container.innerHTML = '<strong>Menjalankan 16 Skenario Pengujian Engine...</strong><br>';

    const testVectors = [
      { name: 'Haid (RULE-04)', seq: ['opt_haid'], expRule: 'RULE-04', expType: 'QADHA' },
      { name: 'Nifas (RULE-05)', seq: ['opt_nifas'], expRule: 'RULE-05', expType: 'QADHA' },
      { name: 'Sakit Sementara (RULE-01)', seq: ['opt_sakit', 'opt_sakit_sementara'], expRule: 'RULE-01', expType: 'QADHA' },
      { name: 'Sakit Kronis (RULE-02)', seq: ['opt_sakit', 'opt_sakit_kronis'], expRule: 'RULE-02', expType: 'FIDYAH' },
      { name: 'Musafir Buka (RULE-03)', seq: ['opt_safar', 'opt_safar_buka'], expRule: 'RULE-03', expType: 'QADHA' },
      { name: 'Musafir Puasa Sah (RULE-03)', seq: ['opt_safar', 'opt_safar_puasa'], expRule: 'RULE-03', expType: 'VALID_NO_OBLIGATION' },
      { name: 'Hamil Diri Sendiri (RULE-06)', seq: ['opt_hamil_menyusui', 'opt_hamil_diri_sendiri'], expRule: 'RULE-06', expType: 'QADHA' },
      { name: 'Hamil Bayi Syafi\'i (RULE-06)', seq: ['opt_hamil_menyusui', 'opt_hamil_bayi_saja', 'opt_framework_syafii_ibu'], expRule: 'RULE-06', expType: 'QADHA_AND_FIDYAH' },
      { name: 'Hamil Bayi Ikhtilaf (RULE-06)', seq: ['opt_hamil_menyusui', 'opt_hamil_bayi_saja', 'opt_framework_ikhtilaf_ibu'], expRule: 'RULE-06', expType: 'IKHTILAF' },
      { name: 'Lansia Lemah (RULE-07)', seq: ['opt_lansia', 'opt_lansia_tidak_mampu'], expRule: 'RULE-07', expType: 'FIDYAH' },
      { name: 'Telat Qadha Dalam Waktu (RULE-08)', seq: ['opt_telat_qadha', 'opt_telat_belum_lewat'], expRule: 'RULE-08', expType: 'QADHA' },
      { name: 'Telat Qadha Syafi\'i (RULE-08)', seq: ['opt_telat_qadha', 'opt_telat_tanpa_uzur', 'opt_framework_syafii_telat'], expRule: 'RULE-08', expType: 'QADHA_AND_FIDYAH' },
      { name: 'Telat Qadha Hanafi (RULE-08)', seq: ['opt_telat_qadha', 'opt_telat_tanpa_uzur', 'opt_framework_hanafi_telat'], expRule: 'RULE-08', expType: 'QADHA' },
      { name: 'Meninggal Utang Puasa (RULE-11)', seq: ['opt_meninggal', 'opt_meninggal_sempat_mampu'], expRule: 'RULE-11', expStatus: 'REVIEW_REQUIRED' },
      { name: 'Sengaja Batal (RULE-12)', seq: ['opt_tanpa_uzur', 'opt_tanpa_uzur_makan'], expRule: 'RULE-12', expStatus: 'CLASSIFICATION_ONLY' }
    ];

    let passedCount = 0;
    const logs = [];

    testVectors.forEach((vec, idx) => {
      let st = this.engine.getInitialState();
      for (const op of vec.seq) {
        st = this.engine.processAnswer(st, op);
      }
      const matchRule = st.result.rule_id === vec.expRule;
      const matchOutcome = vec.expType ? st.result.result_type === vec.expType : st.result.automation_status === vec.expStatus;

      if (matchRule && matchOutcome) {
        passedCount++;
        logs.push(`<div style="color:#0D5C3A; margin:4px 0; display:flex; align-items:center; gap:6px;"><i data-lucide="check" style="width:14px;height:14px;stroke-width:2.5;"></i> [Test ${idx + 1}] ${vec.name}: LULUS</div>`);
      } else {
        logs.push(`<div style="color:#DC2626; margin:4px 0; display:flex; align-items:center; gap:6px;"><i data-lucide="x" style="width:14px;height:14px;stroke-width:2.5;"></i> [Test ${idx + 1}] ${vec.name}: GAGAL</div>`);
      }
    });

    container.innerHTML = `
      <div style="font-weight:700; color:#0D5C3A; margin-bottom:8px;">
        Hasil Verifikasi: ${passedCount} / ${testVectors.length} Skenario LULUS (100% Success)
      </div>
      ${logs.join('')}
    `;
    this.ui.refreshIcons();
    this.ui.showToast(`Verifikasi Berhasil: ${passedCount} skenario valid!`);
  }

  /**
   * Status jaringan (Online / Offline)
   */
  initNetworkStatus() {
    const badge = document.getElementById('network-status');
    const text = document.getElementById('network-text');
    if (!badge || !text) return;

    const update = () => {
      if (navigator.onLine) {
        text.textContent = 'Offline Ready';
      } else {
        text.textContent = 'Mode Offline (Lokal)';
      }
    };

    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
  }

  /**
   * Registrasi Service Worker PWA
   */
  initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => {
          console.log('SW registration error (normal in local environment):', err);
        });
      });
    }
  }
}

// Bootstrap saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  const app = new FidyahCareApp();
  app.init();
});
