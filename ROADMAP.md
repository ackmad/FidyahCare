# FIDYAH CARE — ROADMAP & MILESTONES

Proyek: Fidyah Care MVP  
Arsitektur: Offline-first Static Web Application (HTML5 + CSS3 + Vanilla JavaScript + Local Data)  
Standar: Antigravity Rules v2.3, Knowledge Base v2.3, PRD v2.0, SRS v2.0

---

## Tahapan Eksekusi

### [x] FASE 0: Inisialisasi & Setup Tracking (Completed)
- [x] Pembuatan file tracking: `ROADMAP.md`, `CHECKLIST.md`, `CURRENT_STATE.md`, `PROGRESS_LOG.md`, `CHANGELOG.md`, `CHECKPOINT.json`
- [x] Struktur direktori proyek (`assets/css`, `assets/js`, `assets/data`, `test`)

### [x] FASE 1: Pemodelan Data & Knowledge Base (Completed)
- [x] Ekstraksi dan pembuatan data resmi `assets/data/sources.json` (Whitelist SOURCE_REGISTRY v2.3)
- [x] Ekstraksi dan pembuatan data resmi `assets/data/rules.json` (12 Rules lengkap sesuai kontrak SRS)
- [x] Ekstraksi dan pembuatan data resmi `assets/data/decisionTree.json` (Pohon keputusan adaptif v3)
- [x] Pengujian integritas dan validasi skema data (`test/test_data.js` -> 100% Passed)

### [x] FASE 2: Deterministic Decision Engine & Traceability Layer (Completed)
- [x] Implementasi `assets/js/traceability.js` (Pembangun rantai audit lengkap: user_answers -> question_ids -> classification -> rule_id -> framework -> source_ids -> result -> explanation)
- [x] Implementasi `assets/js/engine.js` (Evaluasi deterministik, pencocokan aturan, gate ikhtilaf/framework, guardrails medis & usia)
- [x] Unit testing engine dengan skenario uji seluruh 12 aturan (`test/test_engine.js` -> 16 Skenario 100% Passed)

### [x] FASE 3: Kalkulator Fidyah Berbasis Satuan (Unit-First) (Completed)
- [x] Implementasi `assets/js/calculator.js` (Satuan utama 1 mud beras/hari, konversi gram transparan, kerangka uang Mazhab Hanafi & BAZNAS RI 2026 Rp65.000/hari, penyesuaian daerah)
- [x] Unit testing kalkulator (`test/test_calculator.js` -> 6 Skenario 100% Passed)

### [x] FASE 4: Design System & Styling (Vanilla CSS3) (Completed)
- [x] Implementasi `assets/css/variables.css` (Palet Modern Islamic: emerald, gold, cream, off-white, charcoal; token spasi, elevasi, tipografi)
- [x] Implementasi `assets/css/base.css` (Reset, tipografi modern Plus Jakarta Sans + font Arab Scheherazade/Amiri, layout mobile-first)
- [x] Implementasi `assets/css/components.css` (Cards, badges status GREEN/IKHTILAF/FRAMEWORK/REVIEW/INSUFFICIENT, button, stepper, form input, modal drawer, accordion)

### [x] FASE 5: UI Layer & Alur Pengguna (HTML5 + JS) (Completed)
- [x] Implementasi `index.html` (Struktur semantik, navigasi tab: Beranda, Pahami Kondisiku, Hitung Fidyah, Dasar Hukum & Sumber, Verifikasi)
- [x] Implementasi `assets/js/ui.js` & `assets/js/app.js`:
  - Path 1: "Pahami Kondisiku" (Wizard satu pertanyaan per layar, animasi halus, backward/reset, hasil komprehensif, drawer sumber, CTA kalkulator)
  - Path 2: "Langsung Hitung" (Kalkulator fidyah langsung dengan seleksi kerangka)
  - Path 3: "Dasar Hukum / Sumber" (Katalog 12 aturan, direktori sumber whitelist dengan link resmi, QS Al-Baqarah 184-185 foundation)
  - Path 4: Traceability & Audit Explorer (Pemeriksa rantai bukti interaktif & salin JSON audit)

### [x] FASE 6: PWA & Offline-First Support (Completed)
- [x] Implementasi `manifest.json` (Web App Manifest)
- [x] Implementasi `sw.js` (Service Worker caching statis untuk kapabilitas offline penuh)
- [x] Penanganan fallback offline dan status indikator koneksi

### [x] FASE 7: Verifikasi Sistem, Testing Komprehensif & Audit Akhir (Completed)
- [x] Eksekusi verifikasi checklist `08_INTEGRATION_CHECKLIST.md` (100% Passed)
- [x] Eksekusi verifikasi 15 aturan Antigravity (100% Passed)
- [x] Verifikasi HTTP Server & integrasi asset endpoint (`test/test_dom_simulation.js` & `test/test_integration.js` -> 100% Passed)
- [x] Perbaikan isu mandiri dan konfirmasi zero errors

### [x] FASE 8: Dokumentasi Akhir & Serah Terima (Completed)
- [x] Pembaruan seluruh tracking ke status FINAL
- [x] Ringkasan arsitektur dan panduan penggunaan

### [x] FASE 9: Modernisasi Tampilan Desktop (Completed)
- [x] Layout desktop dedicated melalui `assets/css/desktop.css` (499 baris, max-width 1280–1440px)
- [x] Grid 2-kolom seimbang untuk Beranda, Kalkulator (Form vs Live Output Card), dan Katalog Aturan
- [x] Header & Navigasi desktop natural dengan fixed brand dan tab terpusat
- [x] Preservasi 100% logic syariat, KB, engine, dan tampilan mobile

### [x] FASE 10: Modernisasi Iconography (Lucide Icons) (Completed)
- [x] Penggantian seluruh emoji antarmuka (navigasi, action cards, fitur, buttons, modal, audit) dengan **Lucide Icons** berbasis SVG
- [x] Integrasi offline-ready melalui script lokal `assets/js/lucide.min.js` dan update service worker cache `sw.js` (v2.4)
- [x] Pengecualian terjaga sesuai arahan: Logo brand header (`🌙`) dan Favicon (`🌙`) tetap dipertahankan
- [x] Penyelarasan sizing dan stroke di seluruh breakpoint (mobile, tablet, desktop) via CSS styling (.lucide, .nav-icon svg, dll.)
- [x] Seluruh suite pengujian lolos 100% tanpa error
