/**
 * Fidyah Care — Deterministic Decision Engine (03_BRAIN_v2.0.md & 02_SRS_v2.0.md)
 * Logika deterministik tanpa probabilistik atau fatwa bebas.
 */

import { buildTrace } from './traceability.js';

export class DecisionEngine {
  constructor({ rules = [], sources = [], tree = {} }) {
    this.rules = rules;
    this.sources = sources;
    this.tree = tree;

    this.rulesMap = new Map(rules.map(r => [r.rule_id, r]));
    this.sourcesMap = new Map(sources.map(s => [s.id, s]));
    this.questionsMap = new Map(Object.entries(tree.questions || {}));
  }

  /**
   * Mengembalikan pertanyaan awal (root)
   */
  getInitialState() {
    const rootId = this.tree.root_question_id || 'Q_MAIN';
    return {
      currentQuestionId: rootId,
      currentQuestion: this.questionsMap.get(rootId),
      answersHistory: [],
      isComplete: false,
      result: null,
      trace: null
    };
  }

  /**
   * Mengambil detail pertanyaan berdasarkan ID
   */
  getQuestion(questionId) {
    return this.questionsMap.get(questionId);
  }

  /**
   * Menjawab satu pertanyaan dan memajukan engine ke langkah berikutnya
   */
  processAnswer(state, selectedOptionId) {
    if (state.isComplete) {
      return state;
    }

    const currentQ = this.questionsMap.get(state.currentQuestionId);
    if (!currentQ) {
      throw new Error(`Question not found: ${state.currentQuestionId}`);
    }

    const option = currentQ.options.find(o => o.id === selectedOptionId);
    if (!option) {
      throw new Error(`Option ${selectedOptionId} not found in question ${state.currentQuestionId}`);
    }

    const updatedHistory = [
      ...state.answersHistory,
      {
        questionId: currentQ.id,
        questionText: currentQ.question_text,
        questionTitle: currentQ.title,
        optionId: option.id,
        optionLabel: option.label,
        optionDescription: option.description || '',
        optionRaw: option
      }
    ];

    // Branch 1: Pertanyaan lanjutan masih ada
    if (option.next_question_id) {
      const nextQ = this.questionsMap.get(option.next_question_id);
      if (!nextQ) {
        throw new Error(`Target question ${option.next_question_id} not found`);
      }

      return {
        ...state,
        currentQuestionId: nextQ.id,
        currentQuestion: nextQ,
        answersHistory: updatedHistory,
        isComplete: false,
        result: null,
        trace: null
      };
    }

    // Branch 2: Mencapai terminal leaf node -> Evaluasi aturan
    const resultObj = this.evaluateTerminalNode(option, updatedHistory);

    const trace = buildTrace({
      answersHistory: updatedHistory,
      rule: resultObj.rule,
      finalOption: option,
      framework: resultObj.framework,
      resultType: resultObj.result_type,
      sourcesMap: this.sourcesMap
    });

    resultObj.trace = trace;

    return {
      ...state,
      currentQuestionId: null,
      currentQuestion: null,
      answersHistory: updatedHistory,
      isComplete: true,
      result: resultObj,
      trace: trace
    };
  }

  /**
   * Evaluasi terminal leaf node sesuai aturan syariat dan ikhtilaf
   */
  evaluateTerminalNode(option, history) {
    const ruleId = option.direct_rule_id;
    const rule = this.rulesMap.get(ruleId);

    if (!rule) {
      // Missing rule guardrail (Antigravity Rule 14)
      return {
        rule_id: 'INSUFFICIENT_EVIDENCE',
        rule: null,
        title: 'Dalil Belum Mencukupi',
        knowledge_status: 'INSUFFICIENT_EVIDENCE',
        automation_status: 'REVIEW_REQUIRED',
        framework: 'NONE',
        source_ids: [],
        sources: [],
        result_type: 'INSUFFICIENT_EVIDENCE',
        action_label: 'Perlu Penelaahan Manual',
        classification: option.classification || 'Kondisi Belum Terklasifikasi',
        summary: 'Dasar yang tersedia belum cukup untuk memberikan jawaban otomatis.',
        detailed_explanation: 'Kondisi ini belum memiliki pemetaan dalil terverifikasi dalam sistem. Harap berkonsultasi langsung dengan ustaz atau ahli fikih.',
        caveats: 'Hindari mengambil kesimpulan hukum tanpa dalil yang jelas.',
        requires_fidyah_calculator: false
      };
    }

    const resultType = option.direct_result_type || rule.result_type;
    const selectedFramework = option.selected_framework || rule.framework;

    // Ambil metadata sumber terverifikasi
    const verifiedSources = (rule.source_ids || []).map(sid => {
      const s = this.sourcesMap.get(sid);
      return s ? { ...s } : { id: sid, title: sid };
    });

    // Sesuaikan status otomasi dan label berdasarkan kondisi khusus
    let automationStatus = rule.automation_status;
    let actionLabel = rule.action_label;
    let detailedExplanation = rule.explanation;
    let caveats = rule.caveats;
    let requiresFidyahCalculator = false;

    // Deteksi kebutuhan kalkulator fidyah
    if (resultType === 'FIDYAH' || resultType === 'QADHA_AND_FIDYAH') {
      requiresFidyahCalculator = true;
    }

    // Penyesuaian spesifik per kasus
    switch (rule.rule_id) {
      case 'RULE-01': // Sakit Sementara
        if (resultType === 'INSUFFICIENT_EVIDENCE') {
          automationStatus = 'REVIEW_REQUIRED';
          actionLabel = 'Konsultasi Medis & Tinjau Kembali';
          detailedExplanation = 'Karena kondisi sakit masih belum dipastikan apakah sementara atau permanen, Fidyah Care menyarankan pemeriksaan dokter yang amanah terlebih dahulu. Jika dokter menyatakan bisa pulih, maka wajib qadha di kemudian hari.';
        }
        break;

      case 'RULE-02': // Sakit Kronis
        actionLabel = 'Wajib Membayar Fidyah (1 Mud Makanan Pokok per Hari)';
        break;

      case 'RULE-03': // Safar
        if (resultType === 'VALID_NO_OBLIGATION') {
          actionLabel = 'Puasa Sah — Tidak Ada Utang Puasa';
          detailedExplanation = 'Berdasarkan kesepakatan sahabat (Sahih Bukhari 1947), musafir yang memilih tetap berpuasa dan menyelesaikannya secara sah, puasanya diterima dan tidak memiliki kewajiban qadha.';
        } else if (resultType === 'FRAMEWORK_REQUIRED') {
          automationStatus = 'FRAMEWORK_REQUIRED';
          actionLabel = 'Bergantung Ketentuan Jarak Mazhab';
          detailedExplanation = 'Para ulama berbeda pendapat mengenai batas jarak minimal safar yang membolehkan berbuka (misalnya ±81–89 km menurut jumhur ulama Syafi\'i, Maliki, Hanbali, atau perjalanan 3 hari 3 malam menurut Hanafi, atau segala perjalanan yang dianggap safar secara adat/\'urf). Fidyah Care tidak memaksakan angka jarak universal tunggal.';
        }
        break;

      case 'RULE-06': // Hamil & Menyusui
        if (option.id === 'opt_hamil_diri_sendiri' || option.id === 'opt_hamil_diri_dan_bayi') {
          actionLabel = 'Wajib Qadha Saja (Tidak Dikenakan Fidyah)';
          detailedExplanation = 'Dalam Mazhab Syafi\'i dan mayoritas ulama (sebagaimana dirangkum MUI): jika alasan tidak berpuasa adalah karena mengkhawatirkan kesehatan fisik ibu sendiri (atau sekaligus anak), maka konsekuensinya disamakan dengan orang sakit, yaitu wajib qadha saja tanpa fidyah.';
        } else if (resultType === 'QADHA_AND_FIDYAH') {
          actionLabel = 'Wajib Qadha Sekaligus Membayar Fidyah';
          detailedExplanation = 'Dalam kerangka Mazhab Syafi\'i (MUI): jika ibu tidak berpuasa semata-mata karena mengkhawatirkan kondisi bayi/janin/ASI sementara ibu sendiri kuat, ibu wajib mengqadha puasa dan juga menunaikan fidyah 1 mud per hari.';
        } else if (resultType === 'IKHTILAF') {
          automationStatus = 'FRAMEWORK_REQUIRED';
          actionLabel = 'Ada Perbedaan Pendapat Ulama (Ikhtilaf)';
          detailedExplanation = 'Kasus khawatir anak saja memiliki perbedaan pandangan kuat: (1) Mazhab Syafi\'i & Hanbali: Wajib Qadha + Fidyah. (2) Mazhab Hanafi: Wajib Qadha saja tanpa fidyah. (3) Atsar Ibnu Abbas & Ibnu Umar menurut sebagian penafsiran: Fidyah saja tanpa qadha bagi wanita hamil/menyusui yang berat. Fidyah Care menampilkan perbedaan ini secara transparan agar pengguna dapat berikhtiar sesuai keyakinan atau arahan guru agama.';
        }
        break;

      case 'RULE-07': // Lansia
        if (resultType === 'VALID_NO_OBLIGATION') {
          actionLabel = 'Tetap Wajib Berpuasa';
          detailedExplanation = 'Karena lansia yang bersangkutan masih memiliki fisik sehat, kuat, dan sanggup berpuasa, maka kewajiban puasa tetap berlaku. Usia tua semata bukan alasan otomatis untuk mengganti puasa dengan fidyah.';
        }
        break;

      case 'RULE-08': // Telat Qadha
        if (resultType === 'QADHA_AND_FIDYAH') {
          actionLabel = 'Wajib Qadha Puasa + Denda Fidyah Keterlambatan';
          detailedExplanation = 'Dalam Mazhab Syafi\'i (rujukan fatwa MUI): menunda qadha hingga masuk Ramadan berikutnya tanpa uzur berlanjut mewajibkan dua hal: tetap mengqadha puasa setelah Ramadan selesai, dan membayar fidyah 1 mud per hari sebagai konsekuensi kelalaian.';
        } else if (option.id === 'opt_framework_hanafi_telat') {
          actionLabel = 'Wajib Qadha Puasa Saja + Istighfar';
          detailedExplanation = 'Dalam Mazhab Hanafi dan catatan Kemenag RI: kewajiban qadha tidak gugur dan tidak ada dalil hadits marfu\' yang mewajibkan tambahan fidyah atas keterlambatan. Cukup mengqadha puasa serta bertaubat atas penundaan.';
        }
        break;

      case 'RULE-11': // Meninggal Dunia
        automationStatus = 'REVIEW_REQUIRED';
        actionLabel = 'Kasus Khusus — Memerlukan Musyawarah Keluarga & Ustadz';
        break;

      case 'RULE-12': // Sengaja Tanpa Uzur
        automationStatus = 'CLASSIFICATION_ONLY';
        actionLabel = 'Di Luar Fidyah Umum — Wajib Taubat & Qadha / Kaffarah Khusus';
        requiresFidyahCalculator = false;
        break;
    }

    return {
      rule_id: rule.rule_id,
      rule: rule,
      title: rule.title,
      knowledge_status: rule.knowledge_status,
      automation_status: automationStatus,
      framework: selectedFramework,
      source_ids: rule.source_ids,
      sources: verifiedSources,
      result_type: resultType,
      action_label: actionLabel,
      classification: option.classification || rule.title,
      summary: `${actionLabel} — ${rule.title}`,
      detailed_explanation: detailedExplanation,
      caveats: caveats,
      review_condition: rule.review_condition,
      requires_fidyah_calculator: requiresFidyahCalculator
    };
  }

  /**
   * Mengembalikan langkah sebelumnya jika pengguna ingin kembali (Back navigation)
   */
  stepBack(state) {
    if (!state.answersHistory || state.answersHistory.length === 0) {
      return this.getInitialState();
    }

    const newHistory = state.answersHistory.slice(0, -1);
    if (newHistory.length === 0) {
      return this.getInitialState();
    }

    const lastStep = newHistory[newHistory.length - 1];
    const targetQ = this.questionsMap.get(lastStep.questionId);

    return {
      currentQuestionId: targetQ.id,
      currentQuestion: targetQ,
      answersHistory: newHistory.slice(0, -1), // Siap menjawab pertanyaan targetQ lagi
      isComplete: false,
      result: null,
      trace: null
    };
  }
}
