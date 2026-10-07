# Fidyah Care — Software Requirements Specification (SRS) v2.0

## 1. Architecture
Offline-first static application.

Core:
- UI layer
- Decision engine
- Knowledge Base
- Source registry
- Calculator
- Traceability layer

No authentication or backend is required for MVP.

## 2. Status Model

### Knowledge Status
- GREEN = source-verified knowledge module
- PENDING_REVIEW
- INSUFFICIENT_EVIDENCE

GREEN does NOT mean universal consensus or automatic applicability.

### Automation Status
- AUTOMATIC
- FRAMEWORK_REQUIRED
- REVIEW_REQUIRED
- CLASSIFICATION_ONLY

Knowledge status and automation status MUST remain separate.

## 3. Rule Contract
Every rule must contain:
- rule_id
- title
- applicability
- exclusions
- knowledge_status
- automation_status
- framework
- source_ids
- result_type
- explanation
- review_condition

## 4. Decision Engine
The engine is deterministic.

Input:
user answers

Processing:
classification → rule matching → framework gate → result

Output:
result + explanation + sources + traceability

## 5. AI Boundary
The LLM must never:
- invent sources
- invent legal rules
- select a new fiqh opinion probabilistically
- silently resolve ikhtilaf
- diagnose illness
- browse arbitrary websites to determine religious law

If source evidence is missing:
INSUFFICIENT_EVIDENCE → human review.

## 6. Calculator Requirements
- Never hardcode one universal gram conversion.
- Never hardcode one universal monetary amount.
- Show framework and source for each conversion.
- Store quantity and unit separately.
- Support source-specific institutional amounts.

## 7. Security & Privacy
- No account required.
- No personal religious profile stored remotely.
- Core answers processed locally.
- No unnecessary personal data collection.

## 8. Performance
- Mobile-first.
- Fast initial load.
- Core knowledge available offline.
- No unnecessary network dependency.
