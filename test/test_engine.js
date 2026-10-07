import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DecisionEngine } from '../assets/js/engine.js';
import { formatTraceBreadcrumb, generateAuditJson } from '../assets/js/traceability.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }
}

console.log('--- RUNNING TEST: Decision Engine & Traceability Suite ---');

const sources = JSON.parse(fs.readFileSync(path.join(rootDir, 'assets/data/sources.json'), 'utf8'));
const rules = JSON.parse(fs.readFileSync(path.join(rootDir, 'assets/data/rules.json'), 'utf8'));
const tree = JSON.parse(fs.readFileSync(path.join(rootDir, 'assets/data/decisionTree.json'), 'utf8'));

const engine = new DecisionEngine({ rules, sources, tree });

// Test helper: answer a series of option IDs
function runScenario(optionIds) {
  let state = engine.getInitialState();
  for (const optId of optionIds) {
    state = engine.processAnswer(state, optId);
  }
  return state;
}

// 1. Haid (Direct early exit)
{
  const s = runScenario(['opt_haid']);
  assert(s.isComplete, 'Haid should complete directly');
  assert(s.result.rule_id === 'RULE-04', 'Haid must map to RULE-04');
  assert(s.result.result_type === 'QADHA', 'Haid must require QADHA');
  assert(s.result.knowledge_status === 'GREEN', 'Knowledge status must be GREEN');
  assert(s.result.automation_status === 'AUTOMATIC', 'Automation status must be AUTOMATIC');
  assert(s.trace.chain.source_ids.includes('SRC-HADITH-HAID-001'), 'Must include Sahih Muslim 335c');
  console.log('✓ Scenario 1 (Haid) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 2. Nifas (Direct early exit)
{
  const s = runScenario(['opt_nifas']);
  assert(s.isComplete, 'Nifas should complete directly');
  assert(s.result.rule_id === 'RULE-05', 'Nifas must map to RULE-05');
  assert(s.result.result_type === 'QADHA', 'Nifas must require QADHA');
  console.log('✓ Scenario 2 (Nifas) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 3. Sakit Sementara
{
  const s = runScenario(['opt_sakit', 'opt_sakit_sementara']);
  assert(s.isComplete, 'Sakit sementara should complete in 2 steps');
  assert(s.result.rule_id === 'RULE-01', 'Must map to RULE-01');
  assert(s.result.result_type === 'QADHA', 'Must require QADHA');
  console.log('✓ Scenario 3 (Sakit Sementara) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 4. Sakit Kronis / Permanen
{
  const s = runScenario(['opt_sakit', 'opt_sakit_kronis']);
  assert(s.isComplete, 'Sakit kronis should complete in 2 steps');
  assert(s.result.rule_id === 'RULE-02', 'Must map to RULE-02');
  assert(s.result.result_type === 'FIDYAH', 'Must require FIDYAH');
  assert(s.result.requires_fidyah_calculator === true, 'Must trigger fidyah calculator');
  console.log('✓ Scenario 4 (Sakit Kronis) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 5. Safar Mengambil Rukhsah
{
  const s = runScenario(['opt_safar', 'opt_safar_buka']);
  assert(s.result.rule_id === 'RULE-03', 'Must map to RULE-03');
  assert(s.result.result_type === 'QADHA', 'Must require QADHA');
  console.log('✓ Scenario 5 (Safar Buka) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 6. Safar Tetap Puasa Sah
{
  const s = runScenario(['opt_safar', 'opt_safar_puasa']);
  assert(s.result.rule_id === 'RULE-03', 'Must map to RULE-03');
  assert(s.result.result_type === 'VALID_NO_OBLIGATION', 'Fast was valid, no qadha');
  console.log('✓ Scenario 6 (Safar Puasa Sah) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 7. Hamil Khawatir Diri Sendiri
{
  const s = runScenario(['opt_hamil_menyusui', 'opt_hamil_diri_sendiri']);
  assert(s.result.rule_id === 'RULE-06', 'Must map to RULE-06');
  assert(s.result.result_type === 'QADHA', 'Must require QADHA only');
  console.log('✓ Scenario 7 (Hamil Diri Sendiri) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 8. Hamil Khawatir Bayi Saja + Syafi'i Framework
{
  const s = runScenario(['opt_hamil_menyusui', 'opt_hamil_bayi_saja', 'opt_framework_syafii_ibu']);
  assert(s.result.rule_id === 'RULE-06', 'Must map to RULE-06');
  assert(s.result.result_type === 'QADHA_AND_FIDYAH', 'Must require QADHA + FIDYAH in Shafi\'i');
  assert(s.result.requires_fidyah_calculator === true, 'Must trigger fidyah calculator');
  console.log('✓ Scenario 8 (Hamil Bayi Syafi\'i) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 9. Hamil Khawatir Bayi Saja + Ikhtilaf Transparan
{
  const s = runScenario(['opt_hamil_menyusui', 'opt_hamil_bayi_saja', 'opt_framework_ikhtilaf_ibu']);
  assert(s.result.rule_id === 'RULE-06', 'Must map to RULE-06');
  assert(s.result.result_type === 'IKHTILAF', 'Must state IKHTILAF');
  console.log('✓ Scenario 9 (Hamil Bayi Ikhtilaf) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 10. Lansia Tidak Mampu
{
  const s = runScenario(['opt_lansia', 'opt_lansia_tidak_mampu']);
  assert(s.result.rule_id === 'RULE-07', 'Must map to RULE-07');
  assert(s.result.result_type === 'FIDYAH', 'Must require FIDYAH');
  assert(s.trace.chain.source_ids.includes('SRC-ATHAR-IBNABBAS-001'), 'Must cite Ibn Abbas Bukhari 4505');
  console.log('✓ Scenario 10 (Lansia Tidak Mampu) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 11. Telat Qadha Belum Lewat Ramadan
{
  const s = runScenario(['opt_telat_qadha', 'opt_telat_belum_lewat']);
  assert(s.result.rule_id === 'RULE-08', 'Must map to RULE-08');
  assert(s.result.result_type === 'QADHA', 'Must require QADHA only');
  console.log('✓ Scenario 11 (Telat Qadha Dalam Waktu) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 12. Telat Qadha Lewat Ramadan Tanpa Uzur + Syafi'i Framework
{
  const s = runScenario(['opt_telat_qadha', 'opt_telat_tanpa_uzur', 'opt_framework_syafii_telat']);
  assert(s.result.rule_id === 'RULE-08', 'Must map to RULE-08');
  assert(s.result.result_type === 'QADHA_AND_FIDYAH', 'Must require QADHA + FIDYAH in Shafi\'i');
  console.log('✓ Scenario 12 (Telat Qadha Syafi\'i) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 13. Telat Qadha Lewat Ramadan Tanpa Uzur + Hanafi Framework
{
  const s = runScenario(['opt_telat_qadha', 'opt_telat_tanpa_uzur', 'opt_framework_hanafi_telat']);
  assert(s.result.rule_id === 'RULE-08', 'Must map to RULE-08');
  assert(s.result.result_type === 'QADHA', 'Must require QADHA only in Hanafi');
  console.log('✓ Scenario 13 (Telat Qadha Hanafi) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 14. Meninggal Dunia dengan Utang Puasa
{
  const s = runScenario(['opt_meninggal', 'opt_meninggal_sempat_mampu']);
  assert(s.result.rule_id === 'RULE-11', 'Must map to RULE-11');
  assert(s.result.automation_status === 'REVIEW_REQUIRED', 'Must be REVIEW_REQUIRED (Antigravity Rule 13)');
  console.log('✓ Scenario 14 (Meninggal Dunia) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 15. Sengaja Tanpa Uzur (Makan/Minum)
{
  const s = runScenario(['opt_tanpa_uzur', 'opt_tanpa_uzur_makan']);
  assert(s.result.rule_id === 'RULE-12', 'Must map to RULE-12');
  assert(s.result.automation_status === 'CLASSIFICATION_ONLY', 'Must be CLASSIFICATION_ONLY');
  assert(s.result.requires_fidyah_calculator === false, 'Cannot directly enter standard fidyah calculator');
  console.log('✓ Scenario 15 (Sengaja Makan/Minum) PASSED:', formatTraceBreadcrumb(s.trace));
}

// 16. Traceability JSON Audit Export Check
{
  const s = runScenario(['opt_sakit', 'opt_sakit_kronis']);
  const auditJson = generateAuditJson(s.trace);
  const parsed = JSON.parse(auditJson);
  assert(parsed.chain.user_answers.length === 2, 'Audit must record both user answers');
  assert(parsed.chain.rule_id === 'RULE-02', 'Audit rule_id must be RULE-02');
  assert(Array.isArray(parsed.chain.sources) && parsed.chain.sources.length > 0, 'Audit must contain verified sources array');
  console.log('✓ Scenario 16 (Audit JSON Integrity) PASSED.');
}

console.log('--- ALL 16 DECISION ENGINE & TRACEABILITY TESTS PASSED! ---');
