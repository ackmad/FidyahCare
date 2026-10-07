import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateFidyah, formatRupiah, CONVERSION_FRAMEWORKS } from '../assets/js/calculator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }
}

console.log('--- RUNNING TEST: Unit-First Fidyah Calculator Suite ---');

const sources = JSON.parse(fs.readFileSync(path.join(rootDir, 'assets/data/sources.json'), 'utf8'));
const sourcesMap = new Map(sources.map(s => [s.id, s]));

// 1. Basic Unit-First Test (5 days)
{
  const res = calculateFidyah({ days: 5, stapleFrameworkId: 'mud_shafii_675', includeMonetary: false, sourcesMap });
  assert(res.days === 5, 'Days should be 5');
  assert(res.primary_unit.total_units === 5, 'Total mud must be 5');
  assert(res.primary_unit.unit_name === 'Mud', 'Unit name must be Mud');
  assert(res.staple_food.total_grams === 3375, '5 * 675g = 3375g');
  assert(res.staple_food.total_kg === 3.38, '3375g = 3.38kg approx');
  assert(res.monetary === null, 'Monetary must be null when includeMonetary is false');
  console.log('✓ Test 1 (Unit-First & 675g Beras) PASSED:', `${res.days} hari -> ${res.primary_unit.unit_label} (${res.staple_food.total_kg} kg)`);
}

// 2. Ikhtiyath 750g Conversion Test (10 days)
{
  const res = calculateFidyah({ days: 10, stapleFrameworkId: 'mud_ikhtiyath_750', includeMonetary: false, sourcesMap });
  assert(res.primary_unit.total_units === 10, 'Total mud must be 10');
  assert(res.staple_food.total_grams === 7500, '10 * 750g = 7500g');
  assert(res.staple_food.total_kg === 7.5, '7500g = 7.5kg');
  console.log('✓ Test 2 (Ikhtiyath 750g Beras) PASSED:', `${res.staple_food.total_kg} kg beras`);
}

// 3. Custom Gram Input Test (7 days @ 700g)
{
  const res = calculateFidyah({ days: 7, stapleFrameworkId: 'mud_custom', customGrams: 700, includeMonetary: false, sourcesMap });
  assert(res.staple_food.total_grams === 4900, '7 * 700g = 4900g');
  assert(res.staple_food.total_kg === 4.9, '4900g = 4.9kg');
  console.log('✓ Test 3 (Kustom Gram Makanan Pokok) PASSED:', `${res.staple_food.total_kg} kg beras`);
}

// 4. BAZNAS RI 2026 Monetary Framework Test (30 days @ Rp65.000)
{
  const res = calculateFidyah({
    days: 30,
    stapleFrameworkId: 'mud_shafii_675',
    includeMonetary: true,
    monetaryFrameworkId: 'baznas_ri_2026',
    sourcesMap
  });
  assert(res.monetary !== null, 'Monetary must not be null');
  assert(res.monetary.amountPerDay === 65000, 'BAZNAS 2026 amount must be 65000');
  assert(res.monetary.totalAmount === 1950000, '30 * 65000 = 1950000');
  assert(res.monetary.year === 2026, 'Year must be 2026');
  assert(res.monetary.source_ids.includes('SRC-BAZNAS-002'), 'Must cite BAZNAS 2026 source');
  assert(res.monetary.ikhtilaf_note.includes('Hanafi'), 'Must explicitly mention Hanafi ikhtilaf');
  console.log('✓ Test 4 (BAZNAS RI 2026 Rp65.000) PASSED:', res.monetary.totalFormatted);
}

// 5. Regional BAZNAS Custom Amount Test (15 days @ Rp50.000)
{
  const res = calculateFidyah({
    days: 15,
    stapleFrameworkId: 'mud_shafii_675',
    includeMonetary: true,
    monetaryFrameworkId: 'baznas_daerah_custom',
    customMonetaryAmount: 50000,
    sourcesMap
  });
  assert(res.monetary.totalAmount === 750000, '15 * 50000 = 750000');
  assert(res.monetary.source_ids.includes('SRC-BAZNAS-003'), 'Must cite BAZNAS Lampung/Daerah source');
  console.log('✓ Test 5 (BAZNAS Daerah Rp50.000) PASSED:', res.monetary.totalFormatted);
}

// 6. Source Traceability Whitelist Check
{
  const res = calculateFidyah({ days: 3, includeMonetary: true, sourcesMap });
  assert(res.source_ids.length >= 3, 'Must have at least 3 source IDs');
  res.source_ids.forEach(sid => {
    assert(sourcesMap.has(sid), `Calculator generated unwhitelisted source ID: ${sid}`);
  });
  console.log('✓ Test 6 (Calculator Source Whitelist Check) PASSED: All source IDs verified against SOURCE_REGISTRY.');
}

console.log('--- ALL CALCULATOR TESTS PASSED SUCCESSFULLY! ---');
