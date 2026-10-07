# FIDYAH CARE — VERIFICATION & INTEGRATION CHECKLIST

Dokumen ini memantau keselarasan implementasi terhadap PRD, SRS, Decision Tree, Source Registry, dan Antigravity Rules v2.3.

---

## 1. Product & Domain Guardrails
- [x] Edukasi dan panduan, bukan mesin fatwa personal (PRD §1).
- [x] Tidak mendiagnosis kondisi medis atau meramal prognosis (Antigravity Rule 9).
- [x] Tidak mengklaim satu pendapat ulama sebagai konsensus universal tanpa dasar (PRD §6, Rule 5).
- [x] Menampilkan ikhtilaf secara transparan saat ada perbedaan pandangan ulama yang sah (PRD §2, Rule 5).
- [x] Menjaga seluruh rantai penelusuran (traceability) dari input pengguna hingga sumber primer/sekunder (PRD §9, SRS §3).

## 2. Antigravity Legal Rules & Content Whitelist
- [x] SOURCE_REGISTRY v2.3 diperlakukan sebagai whitelist sumber hukum yang mutlak (Rule 1).
- [x] Tidak melakukan web browsing bebas untuk menciptakan hukum syariat baru saat runtime (Rule 2).
- [x] Tidak memalsukan sitasi dalil, hadits, atau ayat (Rule 3).
- [x] Tidak memalsukan pendapat fikih ulama (Rule 4).
- [x] Status Knowledge terpisah secara tegas dari Status Automasi (Rule 6, SRS §2).
- [x] Status GREEN bermakna "source-verified module", bukan konsensus universal (Rule 7).
- [x] AI/sistem hanya menjelaskan konten yang telah diverifikasi (Rule 8).
- [x] Tidak melakukan hardcode konversi gram fidyah secara universal (Rule 10).
- [x] Tidak melakukan hardcode batas jarak musafir secara universal (Rule 11).
- [x] Tidak melakukan hardcode izin/larangan fidyah uang secara universal (Rule 12).
- [x] Kasus wafat dengan utang puasa (RULE-11) dan sengaja tanpa uzur (RULE-12) masuk gerbang REVIEW_REQUIRED / CLASSIFICATION_ONLY (Rule 13).
- [x] Kekurangan dalil menghasilkan status INSUFFICIENT_EVIDENCE -> Human Review (Rule 14).
- [x] Setiap hasil memiliki tautan penelusuran (source traceability) (Rule 15).

## 3. Engineering & Decision Engine
- [x] Arsitektur offline-first statis tanpa framework berat atau backend/DB (SRS §1).
- [x] Decision Engine deterministik: jawaban -> klasifikasi -> matching rule -> framework gate -> output (SRS §4).
- [x] Seluruh 12 aturan terpetakan secara lengkap:
  - [x] RULE-01: Sakit Sementara -> Qadha (GREEN, AUTOMATIC)
  - [x] RULE-02: Sakit Kronis/Permanen -> Fidyah (GREEN, FRAMEWORK_SPECIFIC)
  - [x] RULE-03: Safar -> Rukhsah tidak puasa = Qadha; puasa sah = sah (GREEN, AUTOMATIC)
  - [x] RULE-04: Haid -> Qadha, bukan fidyah (GREEN, AUTOMATIC)
  - [x] RULE-05: Nifas -> Qadha, bukan fidyah, tanpa batas kaku 40 hari (GREEN, AUTOMATIC)
  - [x] RULE-06: Hamil & Menyusui -> Pilihan kerangka & ikhtilaf (GREEN, FRAMEWORK_REQUIRED)
  - [x] RULE-07: Lansia -> Tidak mampu permanen = Fidyah, bukan umur semata (GREEN, AUTOMATIC)
  - [x] RULE-08: Telat Qadha -> Masih ada waktu vs Lewat Ramadan tanpa uzur (GREEN, FRAMEWORK_REQUIRED)
  - [x] RULE-09: Kadar Fidyah -> Satuan 1 mud beras/hari, konversi gram transparan (GREEN, UNIT_FIRST)
  - [x] RULE-10: Fidyah dengan Uang -> Hanafi vs Jumhur, rujukan operasional BAZNAS 2026 Rp65.000 (GREEN, FRAMEWORK_SPECIFIC)
  - [x] RULE-11: Meninggal dengan Utang Puasa -> Klasifikasi & review (GREEN, REVIEW_REQUIRED)
  - [x] RULE-12: Sengaja Batal Tanpa Uzur -> Di luar fidyah umum, taubat/qadha, kaffarah khusus jika jima' (GREEN, CLASSIFICATION_ONLY)

## 4. UI/UX Design System
- [x] Skema warna Modern Islamic (Emerald `#0D5C3A`, Off-White `#F8F9F6`, Warm Gold `#C28B1E`, Charcoal `#1C2421`).
- [x] Tipografi modern dan font naskah Arab yang jelas.
- [x] Alur 1 pertanyaan per layar (one-question-at-a-time) dengan tombol kembali dan reset.
- [x] Indikator status hasil jelas: VERIFIED / IKHTILAF / FRAMEWORK REQUIRED / REVIEW REQUIRED / INSUFFICIENT EVIDENCE.
- [x] Detail sumber (Source Modal / Drawer) dapat dibuka dan menampilkan dalil/kutipan serta link resmi.
- [x] Penjelas Ikhtilaf transparan.
- [x] Kalkulator Fidyah unit-first dengan opsi kerangka beras vs uang BAZNAS 2026.
- [x] Mobile-first dan sepenuhnya responsif pada berbagai ukuran layar.

## 5. Offline & PWA
- [x] Web App Manifest valid (`manifest.json`).
- [x] Service Worker (`sw.js`) meng-cache shell dan file statis lokal untuk akses offline.
