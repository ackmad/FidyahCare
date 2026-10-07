# DECISION TREE v3 — SOURCE-VERIFIED

## Global rule
No outcome is produced from a condition label alone. The engine must use the documented questions and framework.

## Flow

START
→ What happened to the Ramadan fast?
  ├─ Menstruation → RULE-04 → QADHA
  ├─ Nifas → RULE-05 → QADHA
  ├─ Illness → temporary vs continuing/permanent
  │    ├─ temporary → RULE-01 → QADHA
  │    └─ continuing/permanent inability → RULE-02 → FIDYAH framework
  ├─ Travel
  │    ├─ fasted → no automatic qadha from travel
  │    └─ did not fast because of travel → RULE-03 → QADHA
  ├─ Elderly continuing inability → RULE-07 → FIDYAH
  ├─ Pregnancy/breastfeeding → RULE-06 → framework selection + ikhtilaf
  ├─ Existing qadha delayed → RULE-08 → framework selection
  ├─ Deceased person's missed fasts → RULE-11 → advanced/framework review
  └─ Intentional/no excuse → RULE-12 → classification/review

## Calculator gate
The calculator may be entered directly only when:
- the user already knows they are in a fidyah-applicable framework; OR
- the decision tree has produced a fidyah outcome.

## Framework gate
If a material ikhtilaf changes the outcome:
- ask for the framework; OR
- show multiple documented positions.
Never choose one silently.

## Trace
Every result:
user_answers
→ rule_id
→ framework_id (if relevant)
→ source_ids
→ outcome
→ explanation
