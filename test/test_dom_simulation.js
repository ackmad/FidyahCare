import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- RUNNING TEST: Headless Simulation & Static Assets Check ---');

// 1. Verify JSON loading from localhost
async function testFetch() {
  const urls = [
    'http://localhost:8080/index.html',
    'http://localhost:8080/manifest.json',
    'http://localhost:8080/sw.js',
    'http://localhost:8080/assets/data/sources.json',
    'http://localhost:8080/assets/data/rules.json',
    'http://localhost:8080/assets/data/decisionTree.json',
    'http://localhost:8080/assets/js/app.js',
    'http://localhost:8080/assets/js/ui.js',
    'http://localhost:8080/assets/js/engine.js',
    'http://localhost:8080/assets/js/calculator.js',
    'http://localhost:8080/assets/js/traceability.js',
    'http://localhost:8080/assets/css/variables.css',
    'http://localhost:8080/assets/css/base.css',
    'http://localhost:8080/assets/css/components.css',
    'http://localhost:8080/assets/css/desktop.css',
    'http://localhost:8080/assets/js/lucide.min.js'
  ];

  for (const u of urls) {
    const res = await fetch(u);
    if (res.status !== 200) {
      throw new Error(`Failed to fetch ${u}: HTTP ${res.status}`);
    }
  }
  console.log(`✓ All ${urls.length} HTTP asset endpoints respond with status 200 OK.`);

  // 2. Verify Calculator HTML content matches updated requirements
  const htmlRes = await fetch('http://localhost:8080/index.html');
  const html = await htmlRes.text();

  if (!html.includes('675 gram <em>— Rujukan yang umum digunakan</em>')) {
    throw new Error('Missing updated 675 gram wording');
  }
  if (!html.includes('≈ 1 mud makanan pokok')) {
    throw new Error('Missing 1 mud note');
  }
  if (!html.includes('Rujukan: NU Online &amp; MUI')) {
    throw new Error('Missing NU Online & MUI citation');
  }
  if (!html.includes('Acuan BAZNAS RI 2026')) {
    throw new Error('Missing Acuan BAZNAS RI 2026 note');
  }
  if (!html.includes('Sesuai ketetapan daerah setempat')) {
    throw new Error('Missing regional BAZNAS note');
  }
  if (!html.includes('Diserahkan kepada fakir atau miskin.')) {
    throw new Error('Missing safe distribution text');
  }
  if (!html.includes('Satu mud makanan pokok untuk setiap hari yang ditinggalkan.')) {
    throw new Error('Missing 1 mud per day distribution text');
  }
  
  // Verify monetary calculator box has no Mazhab Hanafi label
  const monetaryBoxMatch = html.match(/id="calc-monetary-box"[\s\S]*?<\/div>\s*<\/div>/);
  if (monetaryBoxMatch && monetaryBoxMatch[0].includes('Mazhab Hanafi')) {
    throw new Error('calc-monetary-box still contains Mazhab Hanafi');
  }
  console.log('✓ Calculator HTML content & copywriting fully verified.');
}

testFetch().then(() => {
  console.log('--- ALL SIMULATION & ENDPOINT CHECKS PASSED! ---');
  process.exit(0);
}).catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
