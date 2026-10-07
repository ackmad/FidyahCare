# FIDYAH CARE — CHANGELOG

Semua perubahan file dan penciptaan modul dicatat di sini.

---

## [Phase 0: Inisialisasi & Tracking] — 2026-10-06
- `ROADMAP.md` — Rencana tahapan pengerjaan 8 fase dari awal sampai serah terima.
- `CHECKLIST.md` — Daftar periksa integrasi, PRD, SRS, dan 15 aturan Antigravity.
- `CURRENT_STATE.md` — Pelacak status aktif, posisi terakhir, dan aksi selanjutnya.
- `PROGRESS_LOG.md` — Jurnal progres pengerjaan dan log verifikasi.
- `CHANGELOG.md` — Berkas riwayat perubahan sistem.
- `CHECKPOINT.json` — Status terstruktur (machine-readable state) untuk melanjutkan eksekusi secara mulus.

---

## [Phase 1: Knowledge Base & Data Layer] — 2026-10-06
- `assets/data/sources.json` — Whitelist 22 sumber resmi lengkap (Al-Qur'an, Hadits, Atsar, Institusional) beserta teks asli & terjemahan.
- `assets/data/rules.json` — 12 modul aturan fiqih sesuai kontrak SRS v2.0 dengan pemisahan tegas Knowledge Status vs Automation Status.
- `assets/data/decisionTree.json` — Struktur pohon keputusan deterministik adaptif v3 dengan alur satu pertanyaan per tahap dan early exit.
- `test/test_data.js` — Script pengujian integritas skema data lokal.

---

## [Phase 2: Decision Engine & Traceability Layer] — 2026-10-06
- `assets/js/traceability.js` — Modul audit builder, breadcrumb formatter, dan JSON exporter sesuai `06_TRACEABILITY_SPEC.md`.
- `assets/js/engine.js` — Modul `DecisionEngine` deterministik dengan penanganan spesifik untuk seluruh aturan syariat dan gerbang ikhtilaf.
- `test/test_engine.js` — Unit test suite 16 skenario uji komprehensif (100% lulus).

---

## [Phase 3: Unit-First Fidyah Calculator] — 2026-10-06
- `assets/js/calculator.js` — Modul kalkulator fidyah unit-first (1 Mud/hari beras, konversi gram transparan, opsi uang Mazhab Hanafi & BAZNAS RI 2026 Rp65.000).
- `test/test_calculator.js` — Unit test suite kalkulator 6 skenario uji (100% lulus).

---

## [Phase 4: Design System & Styling (Vanilla CSS3)] — 2026-10-06
- `assets/css/variables.css` — Token desain Modern Islamic, palet warna, badge status, radius, spasi, tipografi.
- `assets/css/base.css` — Reset CSS modern, layout shell mobile-first, dukungan naskah Arab RTL.
- `assets/css/components.css` — Header, tab navigasi, kartu hero & aksi, step wizard, kartu hasil komprehensif, kontrol kalkulator, modal drawer, toast.

---

## [Phase 5 & 6: UI Layer & PWA Offline Support] — 2026-10-06
- `index.html` — Antarmuka pengguna lengkap 5 tampilan (Beranda, Wizard, Kalkulator, Dasar Hukum, Audit) beserta modal drawer dalil.
- `assets/js/ui.js` — Modul perender tampilan DOM dan manajemen interaksi antarmuka.
- `assets/js/app.js` — Orkestrator utama aplikasi Fidyah Care.
- `manifest.json` — Konfigurasi Progressive Web App.
- `sw.js` — Service worker caching offline penuh.

---

## [Phase 7 & 8: Verifikasi Sistem, Audit & Handover] — 2026-10-06
- `test/test_integration.js` — Audit integrasi akhir untuk kepatuhan PRD, SRS, dalil, dan 15 aturan Antigravity (100% Lulus).
- `test/test_dom_simulation.js` — Verifikasi HTTP status 200 untuk seluruh 16 endpoint aset web (100% Lulus).
- `08_INTEGRATION_CHECKLIST.md` & `CHECKLIST.md` — Diperbarui ke status terverifikasi penuh [x].

---

## [Phase 9: Modernisasi Tampilan Desktop] — 2026-10-06
- `assets/css/desktop.css` — Pembuatan stylesheet responsif desktop (499 baris) dengan 4 breakpoint (681px, 1024px, 1280px, 1440px).
- `index.html` — Restrukturisasi DOM form kalkulator dan live output card menjadi sibling untuk grid 2-kolom desktop yang proporsional.
- `assets/css/components.css` — Penyesuaian margin-top kalkulator agar seamless di mobile dan desktop.

---

## [Phase 10: Modernisasi Iconography (Lucide Icons)] — 2026-10-06
- `assets/js/lucide.min.js` — Penambahan library icon Lucide lokal UMD untuk kapabilitas 100% offline-ready tanpa bergantung pada CDN eksternal.
- `index.html` — Penggantian seluruh emoji antarmuka (navigasi, action cards, fitur, buttons, modal, audit) menjadi tag `<i data-lucide="..."></i>`, dengan pengecualian logo website (`🌙`) dan favicon (`🌙`) yang tetap dipertahankan.
- `assets/js/ui.js` — Penambahan metode `refreshIcons()` dan pemanggilan otomatis pada setiap siklus rendering dinamis (pertanyaan wizard, hasil keputusan, katalog aturan & dalil, drawer modal).
- `assets/js/app.js` — Inisialisasi ikon Lucide pada saat bootstrapping aplikasi dan runner pengujian interaktif di audit explorer.
- `assets/js/traceability.js` — Standarisasi karakter panah breadcrumb menjadi `→`.
- `assets/css/components.css` & `assets/css/desktop.css` — Penambahan styling presisi untuk `.lucide`, `.nav-icon svg`, `.action-card-icon svg`, `.hero-feat-item svg`, `.btn-close-modal svg`, dll.
- `sw.js` — Pembaruan `STATIC_ASSETS` dan penambahan versi cache ke `fidyah-care-v2.4` untuk mencakup `lucide.min.js` dan `desktop.css`.

