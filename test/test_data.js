import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }
}

console.log('--- RUNNING TEST: Data Layer Verification ---');

// 1. Load data
const sourcesRaw = fs.readFileSync(path.join(rootDir, 'assets/data/sources.json'), 'utf8');
const rulesRaw = fs.readFileSync(path.join(rootDir, 'assets/data/rules.json'), 'utf8');
const treeRaw = fs.readFileSync(path.join(rootDir, 'assets/data/decisionTree.json'), 'utf8');

const sources = JSON.parse(sourcesRaw);
const rules = JSON.parse(rulesRaw);
const tree = JSON.parse(treeRaw);

console.log(`Loaded: ${sources.length} sources, ${rules.length} rules, ${Object.keys(tree.questions).length} questions.`);

// 2. Validate Sources
assert(Array.isArray(sources) && sources.length >= 19, 'Sources must have at least 19 items from SOURCE_REGISTRY');
const sourceIds = new Set();
sources.forEach(src => {
  assert(src.id && typeof src.id === 'string', `Source missing valid ID: ${JSON.stringify(src)}`);
  assert(!sourceIds.has(src.id), `Duplicate source ID found: ${src.id}`);
  sourceIds.add(src.id);
  assert(src.category, `Source ${src.id} missing category`);
  assert(src.title, `Source ${src.id} missing title`);
  assert(src.reference, `Source ${src.id} missing reference`);
  assert(src.url && src.url.startsWith('http'), `Source ${src.id} has invalid URL: ${src.url}`);
  assert(src.role, `Source ${src.id} missing role explanation`);
});
console.log('✓ Sources verification passed: 100% valid whitelist IDs & metadata.');

// 3. Validate Rules
assert(Array.isArray(rules) && rules.length === 12, 'Rules must contain exactly 12 rules (RULE-01 to RULE-12)');
const ruleIds = new Set();
rules.forEach(r => {
  assert(r.rule_id && typeof r.rule_id === 'string', `Rule missing rule_id`);
  assert(!ruleIds.has(r.rule_id), `Duplicate rule_id: ${r.rule_id}`);
  ruleIds.add(r.rule_id);
  
  assert(r.title, `Rule ${r.rule_id} missing title`);
  assert(r.applicability, `Rule ${r.rule_id} missing applicability`);
  assert(r.exclusions, `Rule ${r.rule_id} missing exclusions`);
  assert(['GREEN', 'PENDING_REVIEW', 'INSUFFICIENT_EVIDENCE'].includes(r.knowledge_status), `Rule ${r.rule_id} invalid knowledge_status: ${r.knowledge_status}`);
  assert(['AUTOMATIC', 'FRAMEWORK_REQUIRED', 'REVIEW_REQUIRED', 'CLASSIFICATION_ONLY'].includes(r.automation_status), `Rule ${r.rule_id} invalid automation_status: ${r.automation_status}`);
  assert(r.framework, `Rule ${r.rule_id} missing framework`);
  assert(Array.isArray(r.source_ids) && r.source_ids.length > 0, `Rule ${r.rule_id} has no source_ids`);
  
  // Every source ID must exist in sources.json (whitelisting verification)
  r.source_ids.forEach(sid => {
    assert(sourceIds.has(sid), `Rule ${r.rule_id} references unknown source_id: ${sid}`);
  });
  
  assert(r.result_type, `Rule ${r.rule_id} missing result_type`);
  assert(r.action_label, `Rule ${r.rule_id} missing action_label`);
  assert(r.explanation, `Rule ${r.rule_id} missing explanation`);
  assert(r.caveats, `Rule ${r.rule_id} missing caveats`);
});
console.log('✓ Rules verification passed: All 12 rules satisfy SRS contract and strictly reference whitelisted sources.');

// 4. Validate Decision Tree
assert(tree.root_question_id && tree.questions[tree.root_question_id], 'Decision tree root question must exist');
const questionIds = Object.keys(tree.questions);

questionIds.forEach(qid => {
  const q = tree.questions[qid];
  assert(q.id === qid, `Question ID mismatch: ${qid}`);
  assert(q.title && q.question_text, `Question ${qid} missing text or title`);
  assert(Array.isArray(q.options) && q.options.length >= 2, `Question ${qid} must have at least 2 options`);
  
  q.options.forEach(opt => {
    assert(opt.id, `Option in ${qid} missing ID`);
    assert(opt.label, `Option ${opt.id} in ${qid} missing label`);
    if (opt.next_question_id) {
      assert(tree.questions[opt.next_question_id], `Option ${opt.id} targets non-existent question: ${opt.next_question_id}`);
    } else {
      assert(opt.direct_rule_id, `Option ${opt.id} has no next_question_id and no direct_rule_id`);
      assert(ruleIds.has(opt.direct_rule_id), `Option ${opt.id} references non-existent rule: ${opt.direct_rule_id}`);
      assert(opt.direct_result_type, `Option ${opt.id} missing direct_result_type`);
    }
  });
});
console.log('✓ Decision tree verification passed: All branches terminate in valid questions or verified rules.');

console.log('--- ALL DATA LAYER TESTS PASSED SUCCESSFULLY! ---');
