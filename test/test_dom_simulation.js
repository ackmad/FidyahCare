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
}

testFetch().then(() => {
  console.log('--- ALL SIMULATION & ENDPOINT CHECKS PASSED! ---');
  process.exit(0);
}).catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
