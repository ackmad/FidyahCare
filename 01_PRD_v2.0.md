# Fidyah Care — Product Requirements Document (PRD) v2.0

## 1. Product Overview
Fidyah Care adalah aplikasi edukasi dan panduan untuk membantu pengguna memahami kondisi puasa Ramadan, qadha, fidyah, serta perbedaan pendapat ulama secara sederhana, transparan, dan dapat ditelusuri sumbernya.

Fidyah Care bukan mesin fatwa dan tidak menggantikan konsultasi kepada ustaz, ahli fikih, atau lembaga keagamaan.

## 2. Product Goals
- Membantu pengguna memahami kondisi puasanya.
- Mengarahkan pengguna pada tindakan yang relevan: qadha, fidyah, atau review.
- Menampilkan dasar hukum dan sumber.
- Menampilkan ikhtilaf tanpa menyembunyikannya.
- Menghindari kepastian palsu.
- Menyediakan kalkulator fidyah yang mengikuti framework sumber yang dipilih.
- Menjaga seluruh hasil dapat ditelusuri dari jawaban pengguna sampai sumber.

## 3. Core UX Principle
Tanyakan seperlunya. Jawab dengan jelas. Tunjukkan dasar. Jangan menyembunyikan perbedaan pendapat. Jangan membuat kepastian palsu.

## 4. Main User Paths
1. Pahami Kondisiku
2. Langsung Hitung
3. Dasar Hukum / Sumber

## 5. Functional Requirements
- Adaptive decision tree.
- One-question-at-a-time flow.
- Early exit when sufficient information is available.
- Deterministic rule engine.
- Framework selection where required.
- Result explanation.
- Source detail.
- Ikhtilaf state.
- Review-required state.
- Insufficient-evidence state.
- Fidyah calculator.
- Traceability for every result.
- Offline access for bundled core content.

## 6. Non-Goals
- Memberikan fatwa personal.
- Diagnosis medis.
- Memilih pendapat ulama secara probabilistik.
- Mengambil hukum baru dari web secara bebas.
- Mengklaim satu pendapat sebagai konsensus.
- Mengubah angka fidyah menjadi nilai universal.

## 7. Source Philosophy
Priority:
1. Al-Qur'an
2. Hadis Nabi ﷺ
3. Atsar Sahabat
4. Tafsir/Syarah
5. Pendapat ulama/mazhab
6. Guidance institusional
7. Deterministic application rule

## 8. AI Policy
AI hanya boleh menjelaskan dan merangkum knowledge yang telah diverifikasi.
AI tidak boleh menciptakan rule, source, framework, atau keputusan hukum baru.

## 9. Traceability
Every result:
user_answers → rule_id → framework → source_ids → explanation

## 10. Success Criteria
- Tidak ada fabricated source.
- Tidak ada universal hardcoded fidyah amount.
- Tidak ada universal travel-distance threshold.
- Ikhtilaf terlihat jelas.
- Advanced cases tidak diputuskan secara otomatis.
- Semua hasil dapat ditelusuri.
