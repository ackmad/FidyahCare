/**
 * Fidyah Care — UI Rendering Layer (Vanilla JS)
 */

export const STATUS_TRANSLATION = {
  automation: {
    'AUTOMATIC': {
      label: 'Panduan langsung tersedia',
      icon: 'check-circle-2',
      badgeClass: 'badge-direct',
      desc: 'Aturan dapat disimpulkan langsung berdasarkan dalil sahih terverifikasi.'
    },
    'FRAMEWORK_REQUIRED': {
      label: 'Bergantung pada mazhab',
      icon: 'scale',
      badgeClass: 'badge-framework',
      desc: 'Ketentuan memiliki rincian atau perbedaan menurut rujukan mazhab fiqih.'
    },
    'IKHTILAF': {
      label: 'Ada perbedaan pendapat',
      icon: 'scale',
      badgeClass: 'badge-ikhtilaf',
      desc: 'Terdapat perbedaan pendapat di antara ulama fiqih mu\'tabar.'
    },
    'REVIEW_REQUIRED': {
      label: 'Perlu peninjauan lebih lanjut',
      icon: 'help-circle',
      badgeClass: 'badge-review',
      desc: 'Memerlukan pertimbangan kondisi riil keluarga atau musyawarah asatidz.'
    },
    'CLASSIFICATION_ONLY': {
      label: 'Perlu konteks lebih lanjut',
      icon: 'info',
      badgeClass: 'badge-review',
      desc: 'Termasuk kasus khusus yang tidak diselesaikan dengan fidyah harian biasa.'
    },
    'INSUFFICIENT_EVIDENCE': {
      label: 'Belum cukup informasi',
      icon: 'alert-circle',
      badgeClass: 'badge-insufficient',
      desc: 'Belum dapat disimpulkan karena memerlukan rujukan tambahan.'
    }
  },

  results: {
    'QADHA': {
      label: 'Wajib Qadha (Ganti Puasa)',
      short: 'Wajib Qadha',
      cls: 'outcome-qadha',
      icon: 'calendar'
    },
    'FIDYAH': {
      label: 'Wajib Fidyah (Beri Makan)',
      short: 'Wajib Fidyah',
      cls: 'outcome-fidyah',
      icon: 'utensils'
    },
    'QADHA_AND_FIDYAH': {
      label: 'Wajib Qadha & Fidyah',
      short: 'Qadha & Fidyah',
      cls: 'outcome-both',
      icon: 'layers'
    },
    'VALID_NO_OBLIGATION': {
      label: 'Puasa Sah (Tidak Ada Utang)',
      short: 'Puasa Sah',
      cls: 'outcome-valid',
      icon: 'check'
    },
    'IKHTILAF': {
      label: 'Ada Perbedaan Pendapat Ulama',
      short: 'Ikhtilaf Ulama',
      cls: 'outcome-ikhtilaf',
      icon: 'scale'
    },
    'FRAMEWORK_REQUIRED': {
      label: 'Bergantung Rujukan Mazhab',
      short: 'Beda Mazhab',
      cls: 'outcome-framework',
      icon: 'book-open'
    },
    'FIDYAH_CALCULATION': {
      label: 'Kadar Pokok: 1 Mud (~675–750 gr)',
      short: '1 Mud (~675–750 gr)',
      cls: 'outcome-fidyah',
      icon: 'scale'
    },
    'MONETARY_FIDYAH': {
      label: 'Boleh Menurut Mazhab Hanafi & BAZNAS',
      short: 'Opsi Fidyah Uang',
      cls: 'outcome-fidyah',
      icon: 'banknote'
    },
    'REVIEW_REQUIRED': {
      label: 'Perlu Musyawarah / Konsultasi Ahli',
      short: 'Konsultasi Ahli',
      cls: 'outcome-review',
      icon: 'users'
    },
    'CLASSIFICATION_ONLY': {
      label: 'Wajib Taubat & Qadha (Bukan Fidyah)',
      short: 'Taubat & Qadha',
      cls: 'outcome-special',
      icon: 'alert-triangle'
    }
  },

  sourceCategories: {
    'Quran': {
      label: 'Ayat Al-Qur\'an',
      icon: 'book-open',
      badgeClass: 'src-badge-quran'
    },
    'Hadith': {
      label: 'Hadis Sahih',
      icon: 'scroll',
      badgeClass: 'src-badge-hadith'
    },
    'Athar': {
      label: 'Riwayat Sahabat (Atsar)',
      icon: 'users',
      badgeClass: 'src-badge-athar'
    },
    'Institutional': {
      label: 'Panduan Resmi Lembaga',
      icon: 'landmark',
      badgeClass: 'src-badge-inst'
    },
    'VERIFIED_PRIMARY': {
      label: 'Sumber Utama Al-Qur\'an',
      icon: 'book-open',
      badgeClass: 'src-badge-quran'
    },
    'VERIFIED_HADITH': {
      label: 'Hadis Terverifikasi',
      icon: 'scroll',
      badgeClass: 'src-badge-hadith'
    },
    'SCHOLARLY_SOURCE': {
      label: 'Penjelasan Ulama Fiqih',
      icon: 'book-marked',
      badgeClass: 'src-badge-scholarly'
    },
    'INSTITUTIONAL_SOURCE': {
      label: 'Panduan Lembaga Resmi',
      icon: 'landmark',
      badgeClass: 'src-badge-inst'
    }
  }
};

export const RULE_USER_DATA = {
  'RULE-01': {
    status: { label: 'Panduan langsung tersedia', icon: 'check-circle-2', cls: 'badge-direct' },
    outcome: { label: 'Wajib Qadha (setelah sembuh)', icon: 'calendar', cls: 'outcome-qadha' },
    summary: 'Bagi orang yang sakit sementara dan dapat sembuh, dispensasi syariat adalah berbuka lalu mengganti puasa sebanyak hari yang ditinggalkan setelah sembuh. Fidyah tidak berlaku.',
    sourceText: 'Didukung 3 rujukan dalil (Al-Qur\'an & Fatwa MUI)'
  },
  'RULE-02': {
    status: { label: 'Berdasarkan kondisi fisik riil', icon: 'heart-pulse', cls: 'badge-direct' },
    outcome: { label: 'Wajib Fidyah (gugur qadha)', icon: 'utensils', cls: 'outcome-fidyah' },
    summary: 'Bagi orang yang sakit menahun dan secara wajar tidak diharapkan mampu berpuasa lagi, kewajiban qadha dialihkan ke pembayaran fidyah untuk setiap hari yang ditinggalkan.',
    sourceText: 'Didukung 3 rujukan dalil (Al-Qur\'an, MUI & BAZNAS)'
  },
  'RULE-03': {
    status: { label: 'Panduan langsung tersedia', icon: 'check-circle-2', cls: 'badge-direct' },
    outcome: { label: 'Qadha jika mengambil keringanan', icon: 'compass', cls: 'outcome-qadha' },
    summary: 'Musafir boleh memilih berpuasa atau berbuka. Jika mengambil keringanan berbuka, wajib mengqadha di hari lain. Safar tidak menggugurkan puasa dengan fidyah.',
    sourceText: 'Didukung 5 rujukan dalil (Al-Qur\'an & Hadis Sahih)'
  },
  'RULE-04': {
    status: { label: 'Panduan langsung tersedia', icon: 'check-circle-2', cls: 'badge-direct' },
    outcome: { label: 'Wajib Qadha (bukan fidyah)', icon: 'calendar', cls: 'outcome-qadha' },
    summary: 'Berdasarkan hadis sahih riwayat Sayyidah Aisyah r.a., wanita haid dilarang berpuasa dan diperintahkan mengqadha di luar Ramadan. Fidyah sama sekali bukan pengganti.',
    sourceText: 'Didukung 2 rujukan dalil (Sahih Muslim & MUI)'
  },
  'RULE-05': {
    status: { label: 'Panduan langsung tersedia', icon: 'check-circle-2', cls: 'badge-direct' },
    outcome: { label: 'Wajib Qadha (bukan fidyah)', icon: 'calendar', cls: 'outcome-qadha' },
    summary: 'Wanita nifas pasca melahirkan dilarang berpuasa dan wajib mengqadha seluruh hari yang terlewat setelah suci. Fidyah tidak menggantikan kewajiban qadha nifas.',
    sourceText: 'Didukung 3 rujukan dalil (Al-Qur\'an & Fatwa MUI)'
  },
  'RULE-06': {
    status: { label: 'Ada perbedaan pendapat', icon: 'scale', cls: 'badge-ikhtilaf' },
    outcome: { label: 'Bergantung motif khawatir & mazhab', icon: 'scale', cls: 'outcome-ikhtilaf' },
    summary: 'Mazhab Syafi\'i: jika khawatir diri sendiri wajib qadha saja; jika khawatir janin/ASI wajib qadha sekaligus fidyah. Ulama mazhab lain memiliki pandangan berbeda.',
    sourceText: 'Didukung 2 rujukan dalil (Al-Qur\'an & Fatwa MUI)'
  },
  'RULE-07': {
    status: { label: 'Panduan langsung tersedia', icon: 'check-circle-2', cls: 'badge-direct' },
    outcome: { label: 'Wajib Fidyah (gugur qadha)', icon: 'utensils', cls: 'outcome-fidyah' },
    summary: 'Berdasarkan riwayat Ibnu Abbas r.a., orang tua renta yang fisiknya tidak berdaya lagi berpuasa dibebaskan dari qadha dan wajib membayar fidyah harian.',
    sourceText: 'Didukung 3 rujukan dalil (Al-Qur\'an, Bukhari & BAZNAS)'
  },
  'RULE-08': {
    status: { label: 'Bergantung pada mazhab', icon: 'scale', cls: 'badge-framework' },
    outcome: { label: 'Qadha wajib; fidyah beda mazhab', icon: 'clock', cls: 'outcome-framework' },
    summary: 'Menunda qadha tanpa uzur hingga Ramadan berikutnya: Mazhab Syafi\'i mewajibkan qadha plus denda fidyah keterlambatan; Mazhab Hanafi mewajibkan qadha saja disertai taubat.',
    sourceText: 'Didukung 3 rujukan dalil (Fatwa MUI & Kemenag RI)'
  },
  'RULE-09': {
    status: { label: 'Panduan langsung tersedia', icon: 'check-circle-2', cls: 'badge-direct' },
    outcome: { label: '1 Mud (~675–750 gr beras) per hari', icon: 'scale', cls: 'outcome-fidyah' },
    summary: 'Kadar pokok fidyah adalah 1 mud makanan pokok per hari untuk satu orang miskin. Di Indonesia setara sekitar 675 gram beras (dibulatkan 750 gram untuk kehati-hatian).',
    sourceText: 'Didukung 3 rujukan dalil (Al-Qur\'an, MUI & NU)'
  },
  'RULE-10': {
    status: { label: 'Bergantung pada mazhab', icon: 'scale', cls: 'badge-framework' },
    outcome: { label: 'Boleh menurut Hanafi & BAZNAS', icon: 'banknote', cls: 'outcome-fidyah' },
    summary: 'Mayoritas ulama mewajibkan fidyah berupa makanan mentah. Mazhab Hanafi membolehkan uang seharga makanan. BAZNAS RI 2026 menetapkan rujukan Rp65.000 per jiwa/hari.',
    sourceText: 'Didukung 3 rujukan dalil (NU & SK BAZNAS RI)'
  },
  'RULE-11': {
    status: { label: 'Perlu peninjauan lebih lanjut', icon: 'help-circle', cls: 'badge-review' },
    outcome: { label: 'Wali puasa vs Fidyah harta waris', icon: 'users', cls: 'outcome-review' },
    summary: 'Kasus kasuistik yang memerlukan musyawarah: apakah almarhum sempat mampu qadha sebelum wafat, dan apakah wali mengqadhakan puasa atau membayar fidyah dari harta waris.',
    sourceText: 'Didukung 5 rujukan dalil (Hadis Sahih & Kemenag RI)'
  },
  'RULE-12': {
    status: { label: 'Perlu konteks lebih lanjut', icon: 'info', cls: 'badge-review' },
    outcome: { label: 'Bukan fidyah biasa (Taubat & Qadha)', icon: 'alert-triangle', cls: 'outcome-special' },
    summary: 'Membatalkan puasa dengan sengaja adalah dosa besar yang tidak gugur dengan fidyah biasa. Wajib taubat nasuha, qadha, atau kaffarah berat jika berhubungan suami istri.',
    sourceText: 'Didukung 1 rujukan dalil (QS Al-Baqarah 2:185)'
  }
};

export function getRuleUserFacing(rule) {
  if (!rule) {
    return {
      status: { label: 'Panduan tersedia', icon: 'check-circle-2', cls: 'badge-direct' },
      outcome: { label: 'Perlu evaluasi', icon: 'check', cls: 'outcome-qadha' },
      summary: '',
      sourceText: 'Rujukan dalil sahih'
    };
  }

  const custom = RULE_USER_DATA[rule.rule_id];
  if (custom) return custom;

  const status = STATUS_TRANSLATION.automation[rule.automation_status] || {
    label: 'Panduan tersedia',
    icon: 'info',
    cls: 'badge-direct'
  };
  const outcome = STATUS_TRANSLATION.results[rule.result_type] || {
    label: rule.action_label || 'Perlu evaluasi',
    icon: 'check',
    cls: 'outcome-qadha'
  };

  return {
    status,
    outcome,
    summary: rule.explanation || '',
    sourceText: `Didukung ${rule.source_ids?.length || 0} rujukan dalil`
  };
}

export class UIManager {
  constructor() {
    this.toastTimeout = null;
  }

  /**
   * Mengganti tampilan tab aktif
   */
  switchTab(targetView) {
    document.querySelectorAll('.page').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.dnav-link').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.bnav-item').forEach(btn => btn.classList.remove('active'));

    const targetSection = document.getElementById(`view-${targetView}`);
    const desktopNavBtn = document.querySelector(`.dnav-link[data-view="${targetView}"]`);
    const bottomNavBtn = document.querySelector(`.bnav-item[data-view="${targetView}"]`);

    if (targetSection) targetSection.classList.add('active');
    if (desktopNavBtn) desktopNavBtn.classList.add('active');
    if (bottomNavBtn) bottomNavBtn.classList.add('active');

    this.refreshIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Menampilkan pesan toast sementara
   */
  showToast(message) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    toast.textContent = message;
    toast.classList.add('show');

    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  refreshIcons() {
    if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /**
   * Merender pertanyaan wizard saat ini
   */
  renderQuestion(question, historyLength, onSelectOption) {
    const box = document.getElementById('wizard-question-box');
    const resultBox = document.getElementById('wizard-result-box');
    box.classList.remove('hidden');
    resultBox.classList.add('hidden');

    const stepBadge = document.getElementById('wizard-step-badge');
    const backBtn = document.getElementById('btn-wizard-back');
    const progressBar = document.getElementById('wizard-progress-bar');
    const qTitle = document.getElementById('wizard-question-title');
    const qText = document.getElementById('wizard-question-text');
    const qHelp = document.getElementById('wizard-question-help');
    const optionsContainer = document.getElementById('wizard-options-container');

    const stepNum = (question.step_number || (historyLength + 1));
    stepBadge.textContent = `Langkah ${stepNum}`;

    if (historyLength > 0) {
      backBtn.classList.remove('hidden');
    } else {
      backBtn.classList.add('hidden');
    }

    const estimatedTotal = 3;
    const progressPercent = Math.min(100, Math.round((stepNum / estimatedTotal) * 100));
    progressBar.style.width = `${progressPercent}%`;

    qTitle.textContent = question.title || 'Pertanyaan Evaluasi';
    qText.textContent = question.question_text || '';
    qHelp.textContent = question.help_text || '';

    optionsContainer.innerHTML = '';
    (question.options || []).forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-button';
      btn.type = 'button';
      btn.innerHTML = `
        <div class="option-radio-visual" aria-hidden="true"></div>
        <div class="option-content">
          <div class="option-label">${this.escapeHtml(opt.label)}</div>
          ${opt.description ? `<div class="option-desc">${this.escapeHtml(opt.description)}</div>` : ''}
        </div>
      `;
      btn.addEventListener('click', () => onSelectOption(opt.id));
      optionsContainer.appendChild(btn);
    });

    this.refreshIcons();
  }  /**
   * Merender hasil evaluasi keputusan syariat
   */
  renderResult(result, trace, sourcesMap, { onToCalc, onInspectTrace, onRestart, onOpenSource }) {
    const box = document.getElementById('wizard-question-box');
    const resultBox = document.getElementById('wizard-result-box');
    box.classList.add('hidden');
    resultBox.classList.remove('hidden');

    // 1. Status Badges — User-Facing (Maksimal 1 status utama + 1 metadata ringan)
    const badgeGroup = document.getElementById('result-badge-group');
    badgeGroup.innerHTML = '';

    // Status Utama
    let primaryStatus;
    if (result.result_type === 'IKHTILAF') {
      primaryStatus = {
        label: 'Ada perbedaan pendapat ulama',
        icon: 'scale',
        cls: 'badge-ikhtilaf'
      };
    } else if (result.automation_status === 'FRAMEWORK_REQUIRED') {
      primaryStatus = {
        label: 'Bergantung pada mazhab',
        icon: 'scale',
        cls: 'badge-framework'
      };
    } else if (result.automation_status === 'REVIEW_REQUIRED') {
      primaryStatus = {
        label: 'Perlu peninjauan lebih lanjut',
        icon: 'help-circle',
        cls: 'badge-review'
      };
    } else if (result.automation_status === 'CLASSIFICATION_ONLY') {
      primaryStatus = {
        label: 'Perlu konteks lebih lanjut',
        icon: 'info',
        cls: 'badge-review'
      };
    } else if (result.automation_status === 'INSUFFICIENT_EVIDENCE') {
      primaryStatus = {
        label: 'Belum cukup informasi',
        icon: 'alert-circle',
        cls: 'badge-insufficient'
      };
    } else {
      primaryStatus = {
        label: 'Panduan langsung tersedia',
        icon: 'check-circle-2',
        cls: 'badge-direct'
      };
    }

    const pBadge = document.createElement('span');
    pBadge.className = `status-badge ${primaryStatus.cls}`;
    pBadge.innerHTML = `<i data-lucide="${primaryStatus.icon}"></i> ${primaryStatus.label}`;
    badgeGroup.appendChild(pBadge);

    // Metadata Ringan: Dalil Terverifikasi
    const sBadge = document.createElement('span');
    sBadge.className = 'status-badge badge-subtle-source';
    sBadge.innerHTML = `<i data-lucide="shield-check"></i> Rujukan Terverifikasi`;
    badgeGroup.appendChild(sBadge);

    // 2. Headings & Explanations
    document.getElementById('result-action-title').textContent = result.action_label;
    document.getElementById('result-detailed-explanation').innerHTML = this.formatMarkdownText(result.detailed_explanation);

    // Caveat box
    const caveatText = document.getElementById('result-caveats-text');
    if (result.caveats) {
      caveatText.innerHTML = this.formatMarkdownText(result.caveats);
      document.getElementById('result-caveats-box').classList.remove('hidden');
    } else {
      document.getElementById('result-caveats-box').classList.add('hidden');
    }

    // 3. Referenced Sources
    const sourcesContainer = document.getElementById('result-sources-container');
    sourcesContainer.innerHTML = '';

    (result.sources || []).forEach(src => {
      const item = document.createElement('div');
      item.className = 'source-tag-item';
      const catInfo = STATUS_TRANSLATION.sourceCategories[src.category] || { label: 'Sumber Sahih', icon: 'book-open' };
      item.innerHTML = `
        <div>
          <div class="source-tag-title">${this.escapeHtml(src.title)}</div>
          <div class="source-tag-cat"><i data-lucide="${catInfo.icon}" style="width:12px;height:12px;vertical-align:-1px;margin-right:3px;"></i> ${this.escapeHtml(catInfo.label)} • ${this.escapeHtml(src.reference || 'Rujukan Sahih')}</div>
        </div>
        <span style="font-size:0.85rem; color:var(--primary); font-weight:600; display:inline-flex; align-items:center; gap:4px;">Buka Dalil <i data-lucide="external-link" style="width:13px;height:13px;"></i></span>
      `;
      item.addEventListener('click', () => onOpenSource(src.id));
      sourcesContainer.appendChild(item);
    });

    // 4. Action Buttons
    const toCalcBtn = document.getElementById('btn-result-to-calc');
    if (result.requires_fidyah_calculator) {
      toCalcBtn.classList.remove('hidden');
      toCalcBtn.onclick = onToCalc;
    } else {
      toCalcBtn.classList.add('hidden');
    }

    document.getElementById('btn-result-inspect-trace').onclick = onInspectTrace;
    document.getElementById('btn-result-restart').onclick = onRestart;

    this.refreshIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Merender output kalkulator fidyah langsung
   */
  renderCalculatorOutput(calcData) {
    const mudEl = document.getElementById('calc-out-mud');
    const kgEl  = document.getElementById('calc-out-kg');
    if (mudEl) mudEl.textContent = calcData.primary_unit.unit_label;
    if (kgEl) {
      const kgFormatted = calcData.staple_food.total_kg.toString().replace('.', ',');
      kgEl.textContent  = `${kgFormatted} kg`;
    }

    const monetaryBox = document.getElementById('calc-monetary-box');
    const outRp = document.getElementById('calc-out-rp');
    const monetaryNoteEl = document.getElementById('calc-monetary-note');

    if (calcData.monetary) {
      if (monetaryBox) monetaryBox.classList.remove('hidden');
      if (outRp) outRp.textContent = calcData.monetary.totalFormatted;
      if (monetaryNoteEl) {
        monetaryNoteEl.textContent = calcData.monetary.frameworkId === 'baznas_ri_2026'
          ? 'Acuan BAZNAS RI 2026'
          : 'Sesuai ketetapan daerah setempat';
      }
    } else {
      if (monetaryBox) monetaryBox.classList.add('hidden');
    }
  }

  /**
   * Merender katalog 12 aturan hukum dengan kartu human-friendly
   */
  renderRulesCatalog(rules, onRuleSelect) {
    const container = document.getElementById('tab-rules-content');
    if (!container) return;
    container.innerHTML = '';

    rules.forEach(rule => {
      const card = document.createElement('div');
      card.className = 'rule-item-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      const userFacing = getRuleUserFacing(rule);

      card.innerHTML = `
        <div class="rule-card-top">
          <span class="status-badge ${userFacing.status.cls}">
            <i data-lucide="${userFacing.status.icon}"></i> ${userFacing.status.label}
          </span>
          <span class="rule-source-pill">
            <i data-lucide="book-open"></i> ${rule.source_ids.length} rujukan dalil
          </span>
        </div>
        <h3 class="rule-card-title">${this.escapeHtml(rule.title)}</h3>
        <p class="rule-card-desc">${this.escapeHtml(userFacing.summary)}</p>
        <div class="rule-card-outcome">
          <span class="outcome-label">Ketetapan Pokok:</span>
          <span class="outcome-value ${userFacing.outcome.cls}">
            <i data-lucide="${userFacing.outcome.icon}"></i> ${userFacing.outcome.label}
          </span>
        </div>
        <div class="rule-card-footer">
          <span>Buka rujukan dalil & detail syariat</span>
          <i data-lucide="arrow-right"></i>
        </div>
      `;

      card.addEventListener('click', () => onRuleSelect(rule));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onRuleSelect(rule);
        }
      });
      container.appendChild(card);
    });

    this.refreshIcons();
  }

  /**
   * Merender katalog whitelist sumber dengan rujukan manusiawi
   */
  renderSourcesCatalog(sources, onSourceSelect) {
    const container = document.getElementById('tab-sources-content');
    if (!container) return;
    container.innerHTML = '';

    sources.forEach(src => {
      const card = document.createElement('div');
      card.className = 'rule-item-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      const catInfo = STATUS_TRANSLATION.sourceCategories[src.category] || {
        label: 'Sumber Sahih',
        icon: 'book-open',
        badgeClass: 'src-badge-quran'
      };

      card.innerHTML = `
        <div class="rule-card-top">
          <span class="status-badge ${catInfo.badgeClass}">
            <i data-lucide="${catInfo.icon}"></i> ${catInfo.label}
          </span>
          <span class="rule-source-pill">
            <i data-lucide="check-circle-2"></i> Terverifikasi
          </span>
        </div>
        <h3 class="rule-card-title">${this.escapeHtml(src.title)}</h3>
        <p class="rule-card-desc">${this.escapeHtml(src.role || src.reference)}</p>
        <div class="rule-card-footer">
          <span>Buka Teks Arab, Terjemahan & Rujukan</span>
          <i data-lucide="arrow-right"></i>
        </div>
      `;

      card.addEventListener('click', () => onSourceSelect(src));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSourceSelect(src);
        }
      });
      container.appendChild(card);
    });

    this.refreshIcons();
  }

  /**
   * Membuka modal drawer detail ketentuan hukum (Rule Detail)
   */
  openRuleModal(rule, sourcesMap, onOpenSource) {
    const modal = document.getElementById('rule-modal');
    if (!modal || !rule) return;

    const userFacing = getRuleUserFacing(rule);

    const statusBadge = document.getElementById('modal-rule-status');
    if (statusBadge) {
      statusBadge.className = `status-badge ${userFacing.status.cls}`;
      statusBadge.innerHTML = `<i data-lucide="${userFacing.status.icon}"></i> ${userFacing.status.label}`;
    }

    document.getElementById('modal-rule-title').textContent = rule.title || 'Detail Ketentuan';

    const outcomeEl = document.getElementById('modal-rule-outcome-text');
    if (outcomeEl) {
      outcomeEl.className = `modal-rule-outcome-val ${userFacing.outcome.cls}`;
      outcomeEl.innerHTML = `<i data-lucide="${userFacing.outcome.icon}"></i> ${userFacing.outcome.label}`;
    }

    document.getElementById('modal-rule-explanation').innerHTML = this.formatMarkdownText(rule.explanation || '');

    const appBox = document.getElementById('modal-rule-applicability-box');
    const appEl = document.getElementById('modal-rule-applicability');
    if (rule.applicability) {
      let appText = `<strong>Berlaku untuk:</strong> ${this.escapeHtml(rule.applicability)}`;
      if (rule.exclusions) {
        appText += `<br><br><strong>Pengecualian:</strong> ${this.escapeHtml(rule.exclusions)}`;
      }
      appEl.innerHTML = appText;
      appBox.classList.remove('hidden');
    } else {
      appBox.classList.add('hidden');
    }

    const cavBox = document.getElementById('modal-rule-caveats-box');
    const cavEl = document.getElementById('modal-rule-caveats');
    if (rule.caveats) {
      cavEl.innerHTML = this.formatMarkdownText(rule.caveats);
      cavBox.classList.remove('hidden');
    } else {
      cavBox.classList.add('hidden');
    }

    const sourcesContainer = document.getElementById('modal-rule-sources');
    if (sourcesContainer) {
      sourcesContainer.innerHTML = '';
      (rule.source_ids || []).forEach(sid => {
        const src = sourcesMap.get(sid);
        if (!src) return;
        const catInfo = STATUS_TRANSLATION.sourceCategories[src.category] || { label: 'Sumber Sahih', icon: 'book-open' };
        const item = document.createElement('div');
        item.className = 'modal-source-item';
        item.innerHTML = `
          <div>
            <div class="modal-source-item-title">${this.escapeHtml(src.title)}</div>
            <div class="modal-source-item-cat"><i data-lucide="${catInfo.icon}" style="width:11px;height:11px;vertical-align:-1px;margin-right:3px;"></i> ${this.escapeHtml(catInfo.label)} • ${this.escapeHtml(src.reference || '')}</div>
          </div>
          <span style="font-size:0.75rem; color:var(--primary); font-weight:700; display:inline-flex; align-items:center; gap:3px;">Buka Dalil <i data-lucide="external-link" style="width:12px;height:12px;"></i></span>
        `;
        item.addEventListener('click', () => {
          this.closeRuleModal();
          onOpenSource(src.id);
        });
        sourcesContainer.appendChild(item);
      });
    }

    this.refreshIcons();
    modal.classList.add('active');
  }

  /**
   * Menutup modal drawer ketentuan
   */
  closeRuleModal() {
    const modal = document.getElementById('rule-modal');
    if (modal) modal.classList.remove('active');
  }

  /**
   * Membuka modal drawer detail sumber
   */
  openSourceModal(source) {
    const modal = document.getElementById('source-modal');
    if (!modal || !source) return;

    const catInfo = STATUS_TRANSLATION.sourceCategories[source.category] || {
      label: 'Sumber Sahih',
      icon: 'book-open',
      badgeClass: 'src-badge-quran'
    };

    const catBadge = document.getElementById('modal-source-category');
    if (catBadge) {
      catBadge.className = `inline-badge ${catInfo.badgeClass}`;
      catBadge.innerHTML = `<i data-lucide="${catInfo.icon}"></i> ${catInfo.label}`;
    }

    document.getElementById('modal-source-title').textContent = source.title || source.id;
    document.getElementById('modal-source-ref').textContent = source.reference || '';
    document.getElementById('modal-source-trans').textContent = source.translation_id || '';
    document.getElementById('modal-source-role').textContent = source.role || 'Rujukan verifikasi hukum.';

    const arabicEl = document.getElementById('modal-source-arabic');
    if (source.arabic_text) {
      arabicEl.textContent = source.arabic_text;
      arabicEl.classList.remove('hidden');
    } else {
      arabicEl.classList.add('hidden');
    }

    const linkEl = document.getElementById('modal-source-link');
    if (source.url) {
      linkEl.href = source.url;
      linkEl.classList.remove('hidden');
    } else {
      linkEl.classList.add('hidden');
    }

    this.refreshIcons();
    modal.classList.add('active');
  }

  /**
   * Menutup modal drawer
   */
  closeSourceModal() {
    const modal = document.getElementById('source-modal');
    if (modal) modal.classList.remove('active');
  }

  /**
   * Memformat teks dengan dukungan markdown dan penomoran list (1), (2) dst.
   */
  formatMarkdownText(text) {
    if (!text) return '';

    const inlineFormat = (str) => {
      return str
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');
    };

    // Deteksi jika teks memiliki penomoran seperti (1) dan (2)
    const hasParenthesesNumbers = /\(1\)/.test(text) && /\(2\)/.test(text);

    if (hasParenthesesNumbers) {
      const introPart = text.split(/\(1\)/)[0].trim();
      const rest = text.substring(text.indexOf('(1)'));
      const tokens = rest.split(/\((\d+)\)\s*/);

      const items = [];
      let outro = '';

      for (let i = 1; i < tokens.length; i += 2) {
        const num = tokens[i];
        let content = tokens[i + 1].trim();

        if (i + 2 >= tokens.length) {
          // Deteksi kalimat penutup (kesimpulan / catatan) pada item terakhir
          const outroMatch = content.match(/(\.\s+(Namun|Karena|Fidyah Care|Jika keterlambatan|Catatan)[^.]*.*)$/i);
          if (outroMatch) {
            outro = outroMatch[1].replace(/^\.\s+/, '').trim();
            content = content.substring(0, content.length - outroMatch[1].length + 1).trim();
          }
        }
        items.push({ num, content });
      }

      let html = '';
      if (introPart) {
        html += `<p class="explanation-intro">${inlineFormat(this.escapeHtml(introPart))}</p>`;
      }

      html += '<ol class="explanation-list">';
      items.forEach(item => {
        let itemContent = this.escapeHtml(item.content);
        // Highlight lead jika ada titik dua ':' sebelum karakter ke-70
        const colonIdx = itemContent.indexOf(':');
        if (colonIdx > 0 && colonIdx < 70) {
          const lead = itemContent.substring(0, colonIdx + 1);
          const remainder = itemContent.substring(colonIdx + 1);
          itemContent = `<strong class="explanation-item-lead">${lead}</strong>${remainder}`;
        }
        itemContent = inlineFormat(itemContent);

        html += `
          <li class="explanation-item">
            <span class="explanation-num">${item.num}</span>
            <div class="explanation-item-body">${itemContent}</div>
          </li>
        `;
      });
      html += '</ol>';

      if (outro) {
        html += `<p class="explanation-outro">${inlineFormat(this.escapeHtml(outro))}</p>`;
      }

      return html;
    }

    // Dukungan markdown baris baru / list standar
    if (text.includes('\n- ') || text.includes('\n* ') || text.includes('\n1. ')) {
      const lines = text.split('\n');
      let html = '';
      let inUl = false;
      let inOl = false;

      lines.forEach(line => {
        const trimmed = line.trim();
        if (/^[-*]\s+/.test(trimmed)) {
          if (inOl) { html += '</ol>'; inOl = false; }
          if (!inUl) { html += '<ul class="explanation-list">'; inUl = true; }
          const itemText = inlineFormat(this.escapeHtml(trimmed.replace(/^[-*]\s+/, '')));
          html += `<li class="explanation-item"><div class="explanation-item-body">${itemText}</div></li>`;
        } else if (/^\d+\.\s+/.test(trimmed)) {
          if (inUl) { html += '</ul>'; inUl = false; }
          if (!inOl) { html += '<ol class="explanation-list">'; inOl = true; }
          const match = trimmed.match(/^(\d+)\.\s+(.*)$/);
          const num = match ? match[1] : '';
          const itemText = inlineFormat(this.escapeHtml(match ? match[2] : trimmed));
          html += `
            <li class="explanation-item">
              <span class="explanation-num">${num}</span>
              <div class="explanation-item-body">${itemText}</div>
            </li>
          `;
        } else {
          if (inUl) { html += '</ul>'; inUl = false; }
          if (inOl) { html += '</ol>'; inOl = false; }
          if (trimmed) {
            html += `<p class="explanation-intro">${inlineFormat(this.escapeHtml(trimmed))}</p>`;
          }
        }
      });
      if (inUl) html += '</ul>';
      if (inOl) html += '</ol>';
      return html;
    }

    // Default: split paragraf ganda
    const paragraphs = text.split(/\n\n+/);
    return paragraphs.map(p => `<p>${inlineFormat(this.escapeHtml(p))}</p>`).join('');
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
