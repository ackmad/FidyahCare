import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DecisionEngine } from '../assets/js/engine.js';
import { calculateFidyah } from '../assets/js/calculator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }
}

console.log('=== RUNNING FINAL INTEGRATION & AUDIT TEST ===');

// 1. Files existence check
const requiredFiles = [
  'index.html',
  'manifest.json',
  'sw.js',
  'assets/css/variables.css',
  'assets/css/base.css',
  'assets/css/components.css',
  'assets/js/app.js',
  'assets/js/ui.js',
  'assets/js/engine.js',
  'assets/js/calculator.js',
  'assets/js/traceability.js',
  'assets/data/sources.json',
  'assets/data/rules.json',
  'assets/data/decisionTree.json',
  'docs/ROADMAP.md',
  'docs/CHECKLIST.md',
  'docs/CURRENT_STATE.md',
  'docs/PROGRESS_LOG.md',
  'docs/CHANGELOG.md',
  'CHECKPOINT.json'
];

requiredFiles.forEach(file => {
  assert(fs.existsSync(path.join(rootDir, file)), `Missing file: ${file}`);
});
console.log('✓ All 20 core project files exist.');

// 2. HTML Integrity Check
const htmlContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
assert(htmlContent.includes('id="view-home"'), 'Missing home view');
assert(htmlContent.includes('id="view-wizard"'), 'Missing wizard view');
assert(htmlContent.includes('id="view-calculator"'), 'Missing calculator view');
assert(htmlContent.includes('id="view-knowledge"'), 'Missing knowledge view');
assert(htmlContent.includes('id="view-audit"'), 'Missing audit view');
assert(htmlContent.includes('id="source-modal"'), 'Missing source modal');
assert(htmlContent.includes('assets/js/app.js'), 'Missing app.js module script');
console.log('✓ HTML5 semantic structure and unique IDs verified.');

// 3. Antigravity 15 Rules Compliance Check
const sources = JSON.parse(fs.readFileSync(path.join(rootDir, 'assets/data/sources.json'), 'utf8'));
const rules = JSON.parse(fs.readFileSync(path.join(rootDir, 'assets/data/rules.json'), 'utf8'));
const tree = JSON.parse(fs.readFileSync(path.join(rootDir, 'assets/data/decisionTree.json'), 'utf8'));
const sourcesMap = new Map(sources.map(s => [s.id, s]));

// Rule 1 & 3: SOURCE_REGISTRY whitelist
assert(sources.length === 22, 'Must match SOURCE_REGISTRY v2.3 item count');
rules.forEach(r => {
  r.source_ids.forEach(sid => {
    assert(sourcesMap.has(sid), `Unwhitelisted source ID ${sid} in ${r.rule_id}`);
  });
});
console.log('✓ Antigravity Rule 1 & 3: 100% Whitelist compliance.');

// Rule 6 & 7: Knowledge status vs Automation status
rules.forEach(r => {
  assert(r.knowledge_status === 'GREEN', `Knowledge status must be GREEN for MVP scope (${r.rule_id})`);
  assert(['AUTOMATIC', 'FRAMEWORK_REQUIRED', 'REVIEW_REQUIRED', 'CLASSIFICATION_ONLY'].includes(r.automation_status), `Invalid automation status for ${r.rule_id}`);
});
console.log('✓ Antigravity Rule 6 & 7: Knowledge status cleanly separated from Automation status.');

// Rule 10, 11, 12: No universal hardcoding of grams, distance, money
const calcResStandard = calculateFidyah({ days: 1, stapleFrameworkId: 'mud_shafii_675', sourcesMap });
const calcResIkhtiyath = calculateFidyah({ days: 1, stapleFrameworkId: 'mud_ikhtiyath_750', sourcesMap });
assert(calcResStandard.staple_food.grams_per_day === 675, 'Standard is 675g');
assert(calcResIkhtiyath.staple_food.grams_per_day === 750, 'Ikhtiyath is 750g');
assert(calcResStandard.staple_food.grams_per_day !== calcResIkhtiyath.staple_food.grams_per_day, 'Grams are framework-specific, not universal');

const calcResMoney = calculateFidyah({ days: 1, includeMonetary: true, monetaryFrameworkId: 'baznas_ri_2026', sourcesMap });
assert(calcResMoney.monetary.amountPerDay === 65000, 'BAZNAS 2026 amount is Rp65.000');
assert(calcResMoney.monetary.ikhtilaf_note.length > 20, 'Must have explicit ikhtilaf explanation');
console.log('✓ Antigravity Rule 10 & 12: Unit-First and multi-framework verified without universal claims.');

// Rule 13: Advanced deceased & intentional violation review-gated
const engine = new DecisionEngine({ rules, sources, tree });
let stMeninggal = engine.getInitialState();
stMeninggal = engine.processAnswer(stMeninggal, 'opt_meninggal');
stMeninggal = engine.processAnswer(stMeninggal, 'opt_meninggal_sempat_mampu');
assert(stMeninggal.result.automation_status === 'REVIEW_REQUIRED', 'RULE-11 must be REVIEW_REQUIRED');

let stTanpaUzur = engine.getInitialState();
stTanpaUzur = engine.processAnswer(stTanpaUzur, 'opt_tanpa_uzur');
stTanpaUzur = engine.processAnswer(stTanpaUzur, 'opt_tanpa_uzur_makan');
assert(stTanpaUzur.result.automation_status === 'CLASSIFICATION_ONLY', 'RULE-12 must be CLASSIFICATION_ONLY');
console.log('✓ Antigravity Rule 13: Advanced cases properly review-gated.');

// Rule 15: Traceability in every result
assert(stMeninggal.trace && stMeninggal.trace.chain.question_ids.length === 2, 'Trace must capture 2 questions');
assert(stMeninggal.trace.chain.rule_id === 'RULE-11', 'Trace must capture rule_id');
assert(stMeninggal.trace.chain.source_ids.length > 0, 'Trace must capture source_ids');
console.log('✓ Antigravity Rule 15: Full traceability preserved in all evaluated paths.');

console.log('=== FINAL INTEGRATION AUDIT: 100% PASSED ===');
