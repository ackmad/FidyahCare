# RULE-09 — Kadar Fidyah / Calculation

Status: GREEN — FINAL VERIFIED, UNIT-FIRST

## Primary unit
The application should represent fidyah as:
1 mud of staple food per missed day, within the selected documented framework.

## Important conversion rule
A mud is a measure, not inherently a universal gram value.

If the selected Indonesian framework uses an approximate gram conversion, display it as a conversion, not as the definition itself.

Example:
1 mud → approximately 675 g under the documented conversion being used.

Sources:
- SRC-QURAN-001
- SRC-NU-002
- SRC-MUI-001

## Calculation
fidyah_units = missed_days × 1 mud

If using a gram conversion:
grams = missed_days × documented_gram_conversion

## Monetary amount
Money is a separate framework/institutional layer. Do not silently convert 1 mud into a universal rupiah amount.

## 2026 institutional reference
BAZNAS RI states Rp65,000 per person per day for 2026 in its BAZNAS framework:
- SRC-BAZNAS-002
- SRC-BAZNAS-003

This is an institutional 2026 reference, not a timeless universal shari'a rate.
