# Fidyah Care 🌙

Aplikasi web modern (PWA offline-first) untuk panduan edukasi puasa Ramadan, ketentuan qadha, dan kalkulator fidyah berbasis sumber sahih dan transparansi ikhtilaf fiqih di Indonesia.

---

## 📁 Struktur Direktori Project

Proyek ini disusun secara modular, fungsional, dan ramah pengembang:

```
FidyahCare/
├── assets/                    # Runtime Web Assets
│   ├── css/                   # Stylesheets (variables, base, components, desktop)
│   ├── data/                  # Runtime JSON Datasets (sources.json, rules.json, decisionTree.json)
│   └── js/                    # Application Modules & Engine (app, ui, engine, calculator, traceability)
├── docs/                      # Dokumentasi & Spesifikasi Teknis Project
│   ├── 01_PRD_v2.0.md         # Product Requirements Document
│   ├── 02_SRS_v2.0.md         # Software Requirements Specification
│   ├── 03_BRAIN_v2.0.md       # Decision Architecture & Knowledge Engine Spec
│   ├── 04_DESIGN_SYSTEM_v2.0.md # Design System & Color Tokens Spec
│   ├── 05_MOBILE_SCREEN_FLOW_v2.0.md # Mobile Screen Flow & Interaction Spec
│   ├── 06_TRACEABILITY_SPEC.md # Traceability & Audit Verification Spec
│   ├── 07_ANTIGRAVITY_RULES_v2.0.md # 15 Core Architectural Rules
│   ├── 08_INTEGRATION_CHECKLIST.md # Verification & Integration Checklist
│   ├── CHANGELOG.md           # Riwayat versi dan perubahan fitur
│   ├── CHECKLIST.md           # Tracking checklist implementasi
│   ├── CURRENT_STATE.md       # Status aktif sistem saat ini
│   ├── PROGRESS_LOG.md        # Jurnal progres pengerjaan
│   └── ROADMAP.md             # Peta jalan 8 fase pengembangan
├── knowledge/                 # Knowledge Base Fiqih & Dalil Sahih (18 Modul)
│   ├── README.md              # Ringkasan status verifikasi Knowledge Base v2.3
│   ├── ANTIGRAVITY_RULES.md   # Ketentuan kepatuhan aturan fiqih & arsitektur
│   ├── AUDIT_v2_3.md          # Laporan audit verifikasi sumber dalil
│   ├── DECISION_TREE_v3.md    # Pohon keputusan deterministik
│   ├── FOUNDATION_001.md      # Landasan dalil utama (QS 2:184-185)
│   ├── RULE-01-SAKIT.md s/d RULE-12-TANPA-UZUR.md # 12 Modul aturan fiqih
│   └── SOURCE_REGISTRY.md     # Registry 22 sumber dalil terverifikasi
├── test/                      # Rangkaian Tes Otomatis (Node.js)
│   ├── test_calculator.js     # Validasi unit kalkulator (beras & uang)
│   ├── test_data.js           # Verifikasi integritas schema & whitelist dalil
│   ├── test_engine.js         # Pengujian 16 skenario decision tree
│   ├── test_integration.js    # Pengujian integritas berkas & audit aturan
│   └── test_dom_simulation.js # Pengujian simulasi DOM & endpoint HTTP
├── index.html                 # Entry point aplikasi web utama
├── manifest.json              # Web App Manifest (PWA)
├── sw.js                      # Service Worker (Cache Offline-First)
├── CHECKPOINT.json            # Machine-readable Project Phase Checkpoint
└── README.md                  # Dokumentasi umum proyek
```

---

## 🚀 Menjalankan Aplikasi Secara Lokal

Aplikasi menggunakan Vanilla HTML, CSS, dan JavaScript murni (ES Modules) tanpa dependensi build tools yang rumit:

```bash
# Menggunakan Python HTTP Server
python3 -m http.server 8080

# Atau menggunakan Node http-server
npx http-server -p 8080
```

Buka peramban di `http://localhost:8080`.

---

## 🧪 Menjalankan Rangkaian Pengujian

Seluruh logika keputusan, kalkulator, integritas data, dan audit dapat diuji dengan Node.js:

```bash
node test/test_calculator.js
node test/test_data.js
node test/test_engine.js
node test/test_integration.js
node test/test_dom_simulation.js
```

---

## 📜 Lisensi & Kepatuhan Dalil
Seluruh aturan dan kalkulasi fidyah dalam aplikasi ini mengacu pada Al-Qur'an, Hadits Sahih, fatwa MUI, kajian Bahtsul Masail NU Online, dan ketetapan resmi BAZNAS RI tahun 2026.
