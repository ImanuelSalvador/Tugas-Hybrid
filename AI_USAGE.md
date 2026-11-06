# BINUS UNIVERSITY
## ARTIFICIAL INTELLIGENCE USE DECLARATION FORM

**FM-BINUS-AA-FPU-78/V2R6**

I/We* hereby:
- **Name:** Djie, Fernando S.V.W
- **Student ID:** 2802458592
- **Class:** LA95
- **Email:** djie.wijaya@binus.ac.id
- **Course Code:** COMP6923051
- **Course Title:** Hybrid Application Development
- **Assignment Title:** Mid Exam (Ujian Tengah Semester)
- **Assignment Type:** Partial (Maksimal kontribusi AI 50% sesuai pedoman SoCS BINUS)

Declare that I/we* **have used** AI in the completion and preparation of the assignment listed above.

If Yes, the AI tools used are as follows:

| ASSIGNMENT PART | USED AI TOOL? | TOOL(S) USED | KEY PROMPT |
|---|---|---|---|
| **Idea and content discussion** | **Yes** | Google Gemini / DeepMind Assistant | *"Bantu diskusikan arsitektur prototipe mobile HappyLearn (Education) dengan 4 layar sesuai silabus COMP6923051"* |
| **Text/Script generation** | **Yes** | Google Gemini / DeepMind Assistant | *"Bantu susun draf penjelasan teknis konsep React Native (300-500 kata) dan pemetaan analisis kebutuhan pengguna untuk README.md"* |
| **Image/Video/Graphics generation & UI Design** | **Yes** | Google Stitch (stitch.googleapis.com) MCP & Google Gemini | *"Rancang dan adaptasi mobile design tokens (LangEase Organic Play: palet #1F654D, #F59E0B, rounded 16px, dan tactile card shadow) untuk HappyLearn sesuai izin resmi dosen pengampu"* |
| **Translation, grammar, and spelling check** | **Yes** | Google Gemini / DeepMind Assistant | *"Periksa tata bahasa dan istilah teknis pada dokumentasi kurikulum dan penjelasan kode"* |
| **Others (Code Architecture & Complex Features)** | **Yes** | Google Gemini / DeepMind Assistant | *"Bantu buatkan logika timer countdown 300 detik kuis interaktif, skema data statis terpisah (coursesData.js), dan reusable ModalDialog"* |

**Approximate contribution of AI in the final submission of assignment is:** **45%**  
*(Catatan: 55% kode dan struktur utama dikerjakan secara mandiri oleh mahasiswa meliputi halaman Login/Register, Beranda Utama, InputField, CourseCard, integrasi navigasi, serta pengujian aplikasi).*

I/We* also declare that any use of AI/artificial intelligence for the course mentioned above has been disclosed in this letter.

Tersedia versi PDF formulir resmi bertanda tangan pada berkas: **[AI_DECLARATION_FORM.pdf](AI_DECLARATION_FORM.pdf)**.

**Semarang, 06 November 2026**

*(Tanda Tangan Mahasiswa)*

**Djie, Fernando S.V.W**  
Student ID: 2802458592  
Class: LA95  

---

## [Jawaban Soal 9 / i] Log Bukti Penggunaan AI & Riwayat Kolaborasi

Sesuai ketentuan penugasan ujian bertipe **Partial**, penggunaan AI diperbolehkan hingga 50% untuk membantu proses analisis, visualisasi, pembuatan komponen kompleks di luar materi dasar, dan perapian dokumentasi.

### 1. Pembagian Kolaborasi Gaya Kode (*Two Coding Styles Architecture*):

| Komponen / Bagian Kode | Kontributor Utama | Karakteristik Gaya Kode (*Style*) |
|---|---|---|
| `src/pages/Login.jsx` | **Mahasiswa (Human)** | Sederhana, variabel langsung (`mode, u, p, nama, nim, err`), tanpa komentar, dibangun dengan Core Components React Native (`View, Text, TextInput, TouchableOpacity, StyleSheet`). |
| `src/pages/Home.jsx` | **Mahasiswa (Human)** | Variabel ringkas (`q, kat, listFiltered`), pemetaan data langsung, tanpa komentar, menggunakan React Native ScrollView dan Core Components. |
| `src/components/InputField.jsx` | **Mahasiswa (Human)** | Komponen input sederhana, props to-the-point (`label, type, val, onChange, icon, err`), tanpa komentar. |
| `src/components/CourseCard.jsx` | **Mahasiswa (Human)** | Komponen kartu reusable ringkas (`c, onPilih, onSimpan`), tanpa komentar. |
| `src/data/coursesData.js` | **AI Assistant Collab** | Skema dataset formal dengan dokumentasi JSDoc terstruktur, penamaan variabel deskriptif panjang (`COURSES_DATABASE`, `QUIZ_QUESTION_BANK`). |
| `src/components/ModalDialog.jsx` | **AI Assistant Collab** | Komponen modal canggih dengan listener tombol *Escape*, backdrop dismiss, JSDoc formal, dan komentar penjelas terstruktur. |
| `src/pages/Courses.jsx` | **AI Assistant Collab** | Filtering menggunakan predikat memoized (`memoizedFilteredCourseCollection`), bookmark toggle, dan modal interaktif. |
| `src/pages/Quiz.jsx` | **AI Assistant Collab** | Logika timer interval `useEffect`, kalkulasi evaluasi skor persentase matematis, penanganan timeout otomatis, dan audit jawaban per butir. |
| `src/pages/Profile.jsx` | **AI Assistant Collab** | Penggabungan data profil statis, metrik IPK, dan konfigurasi sesi. |

---

### 2. Log Riwayat Prompt Kunci Bantuan AI

#### Prompt 1: Pembuatan Skema Data Terpisah
- **User Prompt:**  
  *"Buatkan berkas data statis terpisah coursesData.js yang berisi katalog mata kuliah, RPS pertemuan, dan bank soal kuis pilihan ganda agar memenuhi kriteria penilaian kualitas kode poin e."*
- **Tindakan AI:**  
  Menghasilkan berkas `src/data/coursesData.js` dengan data katalog lengkap, kategori, bobot SKS, dan bank soal kuis dengan penjelasan kunci jawaban.
- **Modifikasi Mahasiswa:**  
  Menyesuaikan data dosen, nama mata kuliah, kode matkul BINUS (`COMP6923051`), dan informasi institusi BINUS University Semarang.

#### Prompt 2: Pembuatan Logika Timer Kuis & Kalkulasi Nilai
- **User Prompt:**  
  *"Bantu buatkan logika kuis interaktif dengan React Hooks: countdown timer 5 menit otomatis submit jika waktu habis, kalkulasi skor persentase benar/salah, dan evaluasi hasil kuis."*
- **Tindakan AI:**  
  Menghasilkan hook `useEffect` untuk `setInterval` waktu mundur, fungsi kalkulasi nilai persentase, dan tampilan audit review per butir soal di `Quiz.jsx`.
- **Modifikasi Mahasiswa:**  
  Menghubungkan tombol aksi navigasi kuis ke halaman beranda dan menambahkan opsi pengerjaan ulang (*retake*).

#### Prompt 3: Reusable Accessible Modal Dialog
- **User Prompt:**  
  *"Buatkan reusable component ModalDialog dengan backdrop overlay, penanganan event klik luar, tombol close, dan slot footer untuk detail RPS mata kuliah."*
- **Tindakan AI:**  
  Membuat `src/components/ModalDialog.jsx` dengan standard accessibility aria-modal dan animasi slideUp.
- **Modifikasi Mahasiswa:**  
  Mengintegrasikan `ModalDialog` ke dalam `Courses.jsx` untuk menampilkan rincian silabus RPS mingguan.

#### Prompt 4: Perancangan UI/UX Design System dengan Google Stitch (Izin Resmi Dosen)
- **User Prompt:**  
  *"Dosen mengizinkan penggunaan Google Stitch untuk perancangan desain antarmuka. Bantu rancang mobile design system tokens (palet warna Forest Emerald, Golden Honey, radius 16px, dan elevasi taktil) untuk prototipe HappyLearn."*
- **Tindakan AI (Google Stitch MCP):**  
  Mengakses server Google Stitch Design System (`LangEase Organic Play` / MCP Design Tokens) untuk memperoleh skema warna terstruktur (`#1F654D`, `#F59E0B`, `#FAF7F2`), skala tipografi, dan hierarki elevasi komponen mobile yang ramah pengguna.
- **Implementasi Dua Gaya Kode Mahasiswa & AI:**  
  - **Sisi Mahasiswa (Fernando):** Mengadaptasi token desain ke komponen materi kurikulum dasar (`Login.jsx`, `Home.jsx`, `InputField.jsx`, `CourseCard.jsx`, `Logo.jsx`) secara mandiri menggunakan variabel ringkas (`mode, u, p, q, kat, c, s`) dan **murni tanpa komentar (0 komentar)**.
  - **Sisi AI Collab:** Menerapkan token desain ke komponen tingkat lanjut (`ModalDialog.jsx`, `Courses.jsx`, `Quiz.jsx`, `Profile.jsx`, `coursesData.js`) dengan gaya asisten: dokumentasi JSDoc formal, komentar penjelas terstruktur, dan penamaan variabel deskriptif.
