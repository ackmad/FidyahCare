# RULE-03 — Safar

Status: GREEN — FINAL VERIFIED

## Critical correction
Being a traveller does NOT automatically mean the person must break the fast or automatically owe qadha.

## Rule
- If a traveller fasts and the fast is valid, this rule does not create an automatic qadha.
- If the traveller uses the travel concession and does not fast, the missed day is made up later (qadha).
- Severe hardship may strengthen the case for not fasting, but hardship is not required to establish that travel has a concession in the first place.

## Primary basis
- SRC-QURAN-001
- SRC-QURAN-002
- SRC-HADITH-SAFAR-001
- SRC-HADITH-SAFAR-002
- SRC-HADITH-SAFAR-003

## Decision-tree requirement
Never ask only "Apakah kamu musafir?" and immediately output qadha.

Ask:
1. Was the person travelling under the relevant rukhsah context?
2. Did they actually leave the fast because of that travel?
3. Are we discussing a missed day or a valid fast completed while travelling?

## Output
If missed because of travel → QADHA.
If validly fasted → no automatic qadha from travel alone.

## Boundary
The app does not hard-code a universal travel distance. If a user asks whether their specific trip qualifies as safar, show the framework/source context or require a chosen fiqh framework.
