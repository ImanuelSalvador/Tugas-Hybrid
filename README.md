# HappyLearn - Prototipe Aplikasi Mobile Hybrid (Education)

> **Tugas Ujian Tengah Semester (Mid Exam)**  
> **Mata Kuliah:** COMP6923051 - Hybrid Application Development  
> **Program Studi:** Computer Science / Teknik Informatika  
> **Institusi:** BINUS University (Kampus Semarang)  
> **Tahun Akademik:** 2026/2027 (Semester Ganjil)  

---

## 📌 Identitas Mahasiswa
- **Nama Mahasiswa:** Djie, Fernando S.V.W
- **NIM / Student ID:** 2802458592
- **Kelas:** LA95
- **Email Mahasiswa:** djie.wijaya@binus.ac.id
- **Dosen Pengampu:** Anang Prasetyo (D6672)
- **Tema Studi Kasus:** Education (HappyLearn: Aplikasi Manajemen Pembelajaran Mahasiswa)
- **Repositori GitHub:** [https://github.com/ImanuelSalvador/Tugas-Hybrid](https://github.com/ImanuelSalvador/Tugas-Hybrid)
- **Tautan Video Demo (3–5 Menit):** `https://youtu.be/demo-happylearn-fernando-djie` *(Placeholder Video Presentasi)*
- **Berkas Deklarasi AI:** Tersedia versi cetak resmi [AI_DECLARATION_FORM.pdf](AI_DECLARATION_FORM.pdf) dan laporan markdown [AI_USAGE.md](AI_USAGE.md).

---

## 🚀 Panduan Menjalankan Aplikasi

Aplikasi dibangun menggunakan lingkungan React + Vite dengan arsitektur komponen modular hybrid.

### 1. Prasyarat Sistem
- Node.js versi 18.x atau lebih baru
- Package manager npm / yarn / pnpm

### 2. Langkah Instalasi & Menjalankan
```bash
# 1. Clone repositori dari GitHub
git clone https://github.com/ImanuelSalvador/Tugas-Hybrid.git

# 2. Masuk ke direktori proyek
cd Tugas-Hybrid

# 3. Pasang seluruh dependensi pustaka
npm install

# 4. Jalankan server pengembang lokal
npm run dev
```
Setelah server aktif, buka peramban (*browser*) pada tautan **`http://localhost:5173`**.

### 3. Akun Pengujian (Demo Credentials)
- **NIM / Username:** `student` *(atau `2802458592`)*
- **Password:** `12345`
- Tersedia tombol cepat **"isi demo"** pada layar autentikasi untuk pengujian instan.

---

## 📱 Dokumentasi Layar Aplikasi (Minimal 4 Layar Sesuai Spesifikasi)

1. **Layar 1: Autentikasi (Register & Login)**
   - Menggabungkan formulir Login dan Register dalam satu layar menggunakan toggle tab interaktif.
   - Dilengkapi validasi input sederhana (pengecekan kolom kosong dan format kredensial).
   - Mengarahkan pengguna langsung ke Halaman Utama setelah validasi berhasil.

2. **Layar 2: Halaman Utama / Beranda (Daftar Mata Kuliah)**
   - Menampilkan salam penyapa, ringkasan capaian akademik (4 matkul, 1 selesai, IPK 3.85).
   - Menampilkan kartu mata kuliah aktif (*featured card*) dan daftar mata kuliah dengan ikon, badge kategori, dan status.
   - Dilengkapi pencarian kata kunci (*live search*) dan filter kategori (*chips*).

3. **Layar 3: Halaman Detail Mata Kuliah**
   - Dibuka saat pengguna menekan kartu mata kuliah dari Halaman Utama atau Halaman Daftar Kursus.
   - Menampilkan informasi komprehensif: Kode MK, Dosen, Bobot SKS, Rencana Pembelajaran Semester (RPS per pertemuan), dan tombol aksi "Ambil Kuliah" / "Kerjakan Kuis".
   - Diimplementasikan menggunakan komponen reusable `ModalDialog.jsx`.

4. **Layar 4: Halaman Fitur Pendukung (Kuis Interaktif & Evaluasi)**
   - Menyediakan sarana evaluasi mandiri berupa kuis pilihan ganda 5 butir soal dengan penghitung waktu mundur (*countdown timer* 5 menit).
   - Menyajikan layar hasil akhir evaluasi: skor persentase, status kelulusan (Kompeten/Remedial), serta audit evaluasi per butir pertanyaan.

5. **Layar Tambahan: Profil Mahasiswa**
   - Menampilkan biodata akademik mahasiswa, IPK, capaian SKS, dan opsi keluar (*Logout*).

---

## 📚 [Jawaban Soal 6 / f] Penjelasan Konsep React Native (300–500 Kata)

React Native adalah framework pengembangan aplikasi mobile *cross-platform* (hybrid modern) yang memungkinkan pengembang membangun aplikasi Android dan iOS menggunakan satu basis kode JavaScript/TypeScript berbasis paradigma deklaratif React.

### Cara Kerja React Native
React Native bekerja dengan memisahkan kode JavaScript yang berjalan di mesin eksekusi JavaScript (seperti Hermes atau JavaScriptCore) dengan antarmuka native platform (Java/Kotlin pada Android dan Objective-C/Swift pada iOS). Keduanya berkomunikasi melalui antarmuka penjembatan (*Native Bridge* atau arsitektur modern *JavaScript Interface - JSI*). Ketika komponen dideklarasikan di JavaScript, React Native tidak merender elemen HTML web biasa, melainkan menerjemahkannya secara langsung ke elemen UI bawaan sistem operasi (misalnya, komponen `<View>` dipetakan menjadi `android.view.ViewGroup` di Android dan `UIView` di iOS).

### 3 Keunggulan React Native untuk Aplikasi Hybrid:
1. **Single Codebase, Multi-Platform:** Menulis satu kode logika bisnis dan UI yang dapat dikompilasi secara efisien untuk Android dan iOS, menghemat biaya dan waktu pemeliharaan.
2. **Native Performance & Look-and-Feel:** Berbeda dari aplikasi berbasis WebView (seperti Cordova/PhoneGap lama), performa rendering dan animasi di React Native mendekati aplikasi native murni karena elemen UI yang tampil adalah native widget sistem operasi.
3. **Ekosistem Kuat & Fast Refresh:** Didukung oleh manajemen state React (Hooks), pustaka pengaya komunitas yang masif, serta fitur Fast Refresh yang mempercepat siklus *debugging*.

### Komponen, Props, State, dan Navigasi dengan Contoh Kode Sendiri:

- **Komponen & Props:** Komponen adalah blok pembangun UI mandiri dalam React Native (`View`, `Text`, `TouchableOpacity`). *Props* digunakan untuk mengirimkan data dari parent ke child secara searah.
```javascript
// Contoh Reusable Component React Native dengan Props (CourseCard.jsx)
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function CourseCard({ c, onPilih }) {
  return (
    <TouchableOpacity onPress={() => onPilih(c)} style={s.card}>
      <Text style={s.judul}>{c.title}</Text>
      <Text style={s.dosen}>{c.dosen}</Text>
    </TouchableOpacity>
  );
}
```

- **State:** Mengelola data dinamis yang dapat berubah akibat interaksi pengguna dan memicu re-render antarmuka.
```javascript
// Contoh State Form Input React Native (Login.jsx)
const [u, setU] = useState("student");
const [err, setErr] = useState("");

function handleInput(text) {
  setU(text);
  if (err) setErr("");
}
```

- **Navigasi:** Berpindah antar layar berdasarkan status state router aktif.
```javascript
// Contoh Navigasi Berbasis State (App.jsx)
const [tabAktif, setTabAktif] = useState("home");

return (
  <View style={styles.pageBody}>
    {tabAktif === "home" && <Home onNavigate={setTabAktif} />}
    {tabAktif === "courses" && <Courses onNavigate={setTabAktif} />}
    {tabAktif === "quiz" && <Quiz onNavigate={setTabAktif} />}
  </View>
);
```

---

## 📊 [Jawaban Soal 8 / h] Analisis Kebutuhan Sistem

### 1. Identifikasi Masalah
Mahasiswa seringkali mengalami fragmentasi informasi perkuliahan: jadwal kelas terpisah dari materi, kuis mandiri tidak terintegrasi dengan silabus RPS, dan antarmuka portal akademik lama umumnya kaku serta lambat diakses melalui perangkat seluler pintar (*mobile*).

### 2. Target Pengguna
- Mahasiswa aktif program sarjana (khususnya mahasiswa program studi Computer Science).
- Dosen pengampu yang membutuhkan media pembelajaran terstruktur.

### 3. Minimal 5 Kebutuhan Pengguna (User Requirements)
1. **REQ-01 (Autentikasi):** Pengguna dapat melakukan login dan registrasi akun dengan validasi kesalahan masukan secara langsung.
2. **REQ-02 (Katalog Perkuliahan):** Pengguna dapat menjelajahi daftar mata kuliah lengkap dengan ringkasan SKS, nama dosen, dan kategori.
3. **REQ-03 (Pencarian & Penyaringan):** Pengguna dapat memfilter mata kuliah berdasarkan bidang peminatan (pemrograman, desain, basis data, jaringan) dan kata kunci pencarian.
4. **REQ-04 (Detail RPS):** Pengguna dapat membaca rincian capaian pembelajaran, deskripsi, dan silabus pertemuan per minggu dalam format pop-up detail terstruktur.
5. **REQ-05 (Uji Pemahaman Formatif):** Pengguna dapat menguji pemahaman materi melalui kuis interaktif berpenghitung waktu dengan evaluasi nilai otomatis.

### 4. Tabel Pemetaan Kebutuhan ke Layar dan Komponen

| ID Kebutuhan | Deskripsi Kebutuhan | Layar Terkait | Komponen yang Mengimplementasikan |
|---|---|---|---|
| **REQ-01** | Autentikasi Login & Register | Layar 1 (`Login.jsx`) | `InputField.jsx`, `Logo.jsx`, State `mode/u/p/err` |
| **REQ-02** | Katalog Perkuliahan & Beranda | Layar 2 (`Home.jsx`) | `CourseCard.jsx`, `COURSES_DATABASE` |
| **REQ-03** | Pencarian & Filter Kategori | Layar 2 (`Home.jsx`) & Layar 3 (`Courses.jsx`) | `CATEGORIES_CATALOG`, state `q`, filter predicate |
| **REQ-04** | Rincian Silabus & RPS Mingguan | Layar 3 (`Courses.jsx`) | `ModalDialog.jsx`, `activeCourseDetailRecord` |
| **REQ-05** | Kuis Interaktif & Evaluasi Hasil | Layar 4 (`Quiz.jsx`) | `QUIZ_QUESTION_BANK`, timer effect, evaluasi skor |
| **REQ-06** | Profil Mahasiswa & Pengaturan | Layar 5 (`Profile.jsx`) | `INITIAL_STUDENT_PROFILE`, session logout dispatcher |

### 5. Alasan Keputusan Desain & Rencana Pengembangan
- **Keputusan Desain & Google Stitch:** Mengadopsi prinsip desain antarmuka *Modern Mobile Canvas (390x844)* dengan token visual yang dirancang menggunakan Google Stitch AI (LangEase Organic Play: Forest Emerald #1F654D, Golden Honey #F59E0B, Sunlit Linen #FAF7F2, dan rounded 16px) sesuai izin resmi dosen pengampu. Menghasilkan kontras optimal, kejelasan hierarki teks, serta sensasi tactile press pada elemen kartu dan tombol interaktif.
- **Rencana Pengembangan Lanjutan:**
  1. Menghubungkan layer statis `coursesData.js` ke backend database cloud (PostgreSQL / Supabase REST API).
  2. Menambahkan fitur push notification berbasis jadwal kuliah menggunakan Firebase Cloud Messaging.
  3. Mengonversi bundling ke APK Android murni menggunakan React Native Bare Workflow / Expo EAS Build.
