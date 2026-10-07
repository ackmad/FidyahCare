# Fidyah Care — Traceability Specification

Every result must be auditable.

Required chain:

user_answers
→ question_ids
→ classification
→ rule_id
→ framework
→ source_ids
→ result
→ explanation

No result may exist without a rule_id and source_ids, except an explicit INSUFFICIENT_EVIDENCE state.

Example:

RULE-04-HAID
knowledge_status = GREEN
automation_status = AUTOMATIC
source_ids = [SRC-HADITH-MUSLIM-335C]
