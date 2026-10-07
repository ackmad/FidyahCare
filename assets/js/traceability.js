/**
 * Fidyah Care — Traceability Module (06_TRACEABILITY_SPEC.md)
 * Membangun rantai audit lengkap dan deterministik:
 * user_answers -> question_ids -> classification -> rule_id -> framework -> source_ids -> result -> explanation
 */

export function buildTrace({
  answersHistory = [],
  rule = null,
  finalOption = null,
  framework = null,
  resultType = null,
  sourcesMap = new Map()
}) {
  const questionIds = answersHistory.map(a => a.questionId);
  const userAnswersSummary = answersHistory.map(a => ({
    question_id: a.questionId,
    question_text: a.questionText,
    selected_option_id: a.optionId,
    selected_option_label: a.optionLabel
  }));

  const classification = finalOption?.classification || rule?.title || 'Evaluasi Kondisi Puasa';
  const ruleId = rule?.rule_id || finalOption?.direct_rule_id || 'UNKNOWN_RULE';
  const resolvedFramework = framework || finalOption?.selected_framework || rule?.framework || 'UMUM';
  const sourceIds = Array.isArray(rule?.source_ids) ? [...rule.source_ids] : [];

  const verifiedSources = sourceIds.map(sid => {
    const s = sourcesMap.get(sid);
    return s ? { id: s.id, category: s.category, title: s.title, url: s.url } : { id: sid, title: sid };
  });

  const traceObj = {
    timestamp: new Date().toISOString(),
    audit_id: `AUDIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    chain: {
      user_answers: userAnswersSummary,
      question_ids: questionIds,
      classification: classification,
      rule_id: ruleId,
      rule_title: rule?.title || 'Aturan Belum Terdaftar',
      knowledge_status: rule?.knowledge_status || 'GREEN',
      automation_status: rule?.automation_status || 'AUTOMATIC',
      framework: resolvedFramework,
      source_ids: sourceIds,
      sources: verifiedSources,
      result_type: resultType || rule?.result_type || 'UNKNOWN',
      action_label: rule?.action_label || 'Perlu Evaluasi'
    }
  };

  return traceObj;
}

/**
 * Menghasilkan representasi breadcrumb teks yang mudah dibaca pengguna
 */
export function formatTraceBreadcrumb(trace) {
  if (!trace || !trace.chain) return '';
  const c = trace.chain;
  const questionsPart = c.question_ids.join(' → ');
  const sourcesPart = c.source_ids.join(', ');

  return `Alur: ${questionsPart} → Klasifikasi: "${c.classification}" → Aturan: ${c.rule_id} [${c.framework}] → Sumber: [${sourcesPart}] → Hasil: ${c.result_type}`;
}

/**
 * Menghasilkan JSON terformat rapi untuk disalin atau diinspeksi pengguna
 */
export function generateAuditJson(trace) {
  return JSON.stringify(trace, null, 2);
}
