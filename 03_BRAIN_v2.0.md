# Fidyah Care — Decision Brain v2.0

## 1. Core Pipeline

USER INPUT
↓
CONDITION CLASSIFICATION
↓
DECISION TREE
↓
RULE ENGINE
↓
FRAMEWORK CHECK
↓
SOURCE VALIDATION
↓
RESULT
↓
EXPLANATION
↓
TRACEABILITY

## 2. Golden Rule
The deterministic rule engine decides the applicable rule.
AI explains verified results.

## 3. Result Object
```json
{
  "rule_id": "RULE-04-HAID",
  "knowledge_status": "GREEN",
  "automation_status": "AUTOMATIC",
  "framework": "GENERAL",
  "source_ids": ["SRC-HADITH-MUSLIM-335C"],
  "result_type": "QADHA",
  "explanation": "..."
}
```

## 4. Automation Examples
RULE-04 HAID:
GREEN + AUTOMATIC

RULE-06 HAMIL/MENYUSUI:
GREEN + FRAMEWORK_REQUIRED

RULE-08 TELAT QADHA:
GREEN + FRAMEWORK_REQUIRED

RULE-11 MENINGGAL:
GREEN + REVIEW_REQUIRED

RULE-12 TANPA UZUR:
GREEN + CLASSIFICATION_ONLY / REVIEW_REQUIRED

## 5. Ikhtilaf
When multiple documented opinions apply:
- show that disagreement exists
- identify the framework
- do not merge opinions into a new rule
- allow the user to inspect sources

## 6. Failure Handling
Missing source:
→ INSUFFICIENT_EVIDENCE
→ explain limitation
→ recommend human review

Ambiguous user answer:
→ NEED_MORE_INFO

Advanced case:
→ REVIEW_REQUIRED
