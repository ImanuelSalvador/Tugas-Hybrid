/**
 * @file coursesData.js
 * @description Static dataset repository for the HappyLearn Hybrid Mobile Application.
 * Complies with specification requirement: "data statis di berkas terpisah".
 * Structured with strict schemas for courses, quiz questions, and user academic records.
 * 
 * @author AI Assistant Collaboration
 */

/**
 * Static categories catalog for academic stream filtering.
 * @type {Array<string>}
 */
export const CATEGORIES_CATALOG = [
  "Semua",
  "Pemrograman",
  "Desain",
  "Basis Data",
  "Jaringan"
];

/**
 * Initial student academic profile data object.
 * @type {Object}
 */
export const INITIAL_STUDENT_PROFILE = {
  name: "Djie, Fernando S.V.W",
  studentId: "2802458592",
  username: "student",
  email: "djie.wijaya@binus.ac.id",
  institution: "BINUS University Semarang",
  major: "Computer Science - Hybrid Application Development",
  classGroup: "LA95",
  semester: 4,
  gpa: 3.85,
  completedCredits: 72,
  avatarUrl: "/assets/avatar.png"
};

/**
 * Static course database containing curriculum and meeting details.
 * @type {Array<Object>}
 */
export const COURSES_DATABASE = [
  {
    id: "hybrid-apps-01",
    code: "COMP6923051",
    kode: "COMP6923051",
    title: "Pemrograman Mobile & Hybrid",
    judul: "Pemrograman Mobile & Hybrid",
    subtitle: "Arsitektur React Native, Hooks, dan Navigasi Multi-Platform",
    category: "Pemrograman",
    kategori: "Pemrograman",
    dosen: "Andi Pratama, M.Kom",
    sks: 3,
    totalModul: 12,
    totalJam: "18 jam",
    ratingScore: 4.9,
    progresPercent: 50,
    statusEnrolled: true,
    tersimpan: true,
    bannerGradient: "from-blue-600 to-indigo-700",
    description: "Mata kuliah ini membahas perancangan antarmuka mobile modern menggunakan ekosistem React Native, integrasi reusable component, pengelolaan state reaktif, serta pemanggilan API statis.",
    deskripsi: "Mata kuliah ini membahas perancangan antarmuka mobile modern menggunakan ekosistem React Native, integrasi reusable component, pengelolaan state reaktif, serta pemanggilan API statis.",
    rps: [
      { minggu: 1, topik: "Konsep Dasar Hybrid App & React Native Environment", capaian: "Memahami arsitektur native bridge & perbandingan Webview vs Native." },
      { minggu: 2, topik: "JSX, Functional Component, dan Atomic Styling", capaian: "Mampu menyusun hierarki komponen fungsional dengan StyleSheet." },
      { minggu: 3, topik: "Reusable Component & Pengelolaan Props Komprehensif", capaian: "Membangun komponen InputField, CourseCard, dan ModalDialog modular." },
      { minggu: 4, topik: "State Management Menggunakan React Hooks (useState & useEffect)", capaian: "Mengelola state form reaktif, countdown timer, dan data terpisah." },
      { minggu: 5, topik: "Navigasi Antar Layar & Dynamic Data Routing", capaian: "Implementasi tab navigasi bawah dan seleksi data dinamis." },
      { minggu: 6, topik: "Layouting Adaptif, Flexbox, dan Gestures", capaian: "Menyesuaikan tata letak multi-device dengan SafeAreaView." },
      { minggu: 7, topik: "Integrasi Modal Dialog, Animasi, dan Ujian Tengah Semester", capaian: "Pengujian evaluasi komprehensif 5 butir soal formatif." }
    ],
    silabusList: [
      "Pertemuan 1 - Konsep Dasar Hybrid App & React Native Environment",
      "Pertemuan 2 - JSX, Functional Component, dan Atomic Styling",
      "Pertemuan 3 - Reusable Component & Pengelolaan Props Komprehensif",
      "Pertemuan 4 - State Management Menggunakan React Hooks (useState & useEffect)",
      "Pertemuan 5 - Navigasi Antar Layar & Dynamic Data Routing",
      "Pertemuan 6 - Layouting Adaptif, Flexbox, dan Gestures",
      "Pertemuan 7 - Integrasi Modal Dialog, Animasi, dan Ujian Tengah Semester"
    ]
  },
  {
    id: "web-modern-02",
    code: "COMP6047001",
    kode: "COMP6047001",
    title: "Pemrograman Web Lanjut",
    judul: "Pemrograman Web Lanjut",
    subtitle: "Pengembangan Antarmuka Web Reaktif Menggunakan Node.js & Vite",
    category: "Pemrograman",
    kategori: "Pemrograman",
    dosen: "Siti Rahma, S.T.",
    sks: 3,
    totalModul: 14,
    totalJam: "16 jam",
    ratingScore: 4.8,
    progresPercent: 35,
    statusEnrolled: false,
    tersimpan: false,
    bannerGradient: "from-indigo-600 to-purple-700",
    description: "Pembahasan mendalam seputar asynchronous JavaScript, Promises, async/await, pembuatan modul terpisah, dan teknik arsitektur SPA.",
    deskripsi: "Pembahasan mendalam seputar asynchronous JavaScript, Promises, async/await, pembuatan modul terpisah, dan teknik arsitektur SPA.",
    rps: [
      { minggu: 1, topik: "Modern ECMAScript (ES6+) Syntax & Paradigma Fungsional", capaian: "Menguasai arrow functions, destructuring, dan modul ES." },
      { minggu: 2, topik: "Single Page Application Router & State Isolation", capaian: "Menyusun perutean SPA yang decoupled dari backend." },
      { minggu: 3, topik: "Pengelolaan Event Handling & DOM Virtualization", capaian: "Memahami siklus hidup Virtual DOM dan re-render efisien." },
      { minggu: 4, topik: "Optimasi Bundling dan Deployment Cloud", capaian: "Menerapkan tree-shaking Vite dan static asset hosting." }
    ],
    silabusList: [
      "Pertemuan 1 - Modern ECMAScript (ES6+) Syntax & Paradigma Fungsional",
      "Pertemuan 2 - Single Page Application Router & State Isolation",
      "Pertemuan 3 - Pengelolaan Event Handling & DOM Virtualization",
      "Pertemuan 4 - Optimasi Bundling dan Deployment Cloud"
    ]
  },
  {
    id: "uiux-design-03",
    code: "DSGN6033002",
    kode: "DSGN6033002",
    title: "Desain Antarmuka Mobile UI/UX",
    judul: "Desain Antarmuka Mobile UI/UX",
    subtitle: "Design Thinking, Prototyping Figma, dan Sistem Desain Mobile",
    category: "Desain",
    kategori: "Desain",
    dosen: "Budi Santoso, M.Sn.",
    sks: 2,
    totalModul: 10,
    totalJam: "12 jam",
    ratingScore: 4.9,
    progresPercent: 15,
    statusEnrolled: false,
    tersimpan: false,
    bannerGradient: "from-purple-600 to-pink-600",
    description: "Prinsip hierarki visual antarmuka pengguna pada perangkat mobile layar sentuh, pedoman Human Interface Guidelines, dan Material Design 3.",
    deskripsi: "Prinsip hierarki visual antarmuka pengguna pada perangkat mobile layar sentuh, pedoman Human Interface Guidelines, dan Material Design 3.",
    rps: [
      { minggu: 1, topik: "User Persona, Journey Mapping, dan Wireframing", capaian: "Menemukan pain points pengguna dan mendesain alur antarmuka." },
      { minggu: 2, topik: "Atomic Design System dan Typography Scale", capaian: "Menerapkan hierarki tipografi Plus Jakarta Sans dan token warna." },
      { minggu: 3, topik: "Layout Grid 8pt dan Accessible Color Palette", capaian: "Memastikan standar rasio kontras WCAG AAA pada antarmuka mobile." },
      { minggu: 4, topik: "Usability Testing & Interactive Micro-Interactions", capaian: "Validasi feedback responsif dan kemudahan navigasi pengguna." }
    ],
    silabusList: [
      "Pertemuan 1 - User Persona, Journey Mapping, dan Wireframing",
      "Pertemuan 2 - Atomic Design System dan Typography Scale",
      "Pertemuan 3 - Layout Grid 8pt dan Accessible Color Palette",
      "Pertemuan 4 - Usability Testing & Interactive Micro-Interactions"
    ]
  },
  {
    id: "database-dist-04",
    code: "ISYS6169003",
    kode: "ISYS6169003",
    title: "Basis Data & REST API Terdistribusi",
    judul: "Basis Data & REST API Terdistribusi",
    subtitle: "Struktur Query Terindeks dan Normalisasi Data Relasional",
    category: "Basis Data",
    kategori: "Basis Data",
    dosen: "Dr. Rian Hidayat",
    sks: 3,
    totalModul: 12,
    totalJam: "20 jam",
    ratingScore: 4.7,
    progresPercent: 0,
    statusEnrolled: false,
    tersimpan: false,
    bannerGradient: "from-emerald-600 to-teal-700",
    description: "Konsep pemisahan data statis dan dinamis, relasi tabel 1NF-3NF, transaksi ACID, serta manipulasi objek JSON terstruktur.",
    deskripsi: "Konsep pemisahan data statis dan dinamis, relasi tabel 1NF-3NF, transaksi ACID, serta manipulasi objek JSON terstruktur.",
    rps: [
      { minggu: 1, topik: "Entity Relationship Diagram & Konsep Data Terpisah", capaian: "Merancang skema relasi dan normalisasi entitas akademik." },
      { minggu: 2, topik: "Query Complex Subquery & Index Optimization", capaian: "Menulis indeks efisien untuk pencarian cepat dataset perkuliahan." },
      { minggu: 3, topik: "Arsitektur RESTful JSON Endpoints", capaian: "Menyusun skema data payload JSON yang terstandarisasi." },
      { minggu: 4, topik: "Caching Data & Integritas Penyimpanan", capaian: "Menjamin ketersediaan data secara konsisten dan teruji." }
    ],
    silabusList: [
      "Pertemuan 1 - Entity Relationship Diagram & Konsep Data Terpisah",
      "Pertemuan 2 - Query Complex Subquery & Index Optimization",
      "Pertemuan 3 - Arsitektur RESTful JSON Endpoints",
      "Pertemuan 4 - Caching Data & Integritas Penyimpanan"
    ]
  }
];

/**
 * Static examination question bank for the interactive quiz module.
 * Fully compatible with both object-based and index-based evaluator lookups.
 * 
 * @type {Array<Object>}
 */
export const QUIZ_QUESTION_BANK = [
  {
    id: 101,
    lo: "LO 1 - Fundamental React Native",
    topicTag: "Modul 1 - Fundamental React Native",
    question: "Manakah konsep inti yang membedakan React Native dengan framework web view tradisional dalam pembuatan aplikasi mobile hybrid?",
    questionText: "Manakah konsep inti yang membedakan React Native dengan framework web view tradisional dalam pembuatan aplikasi mobile hybrid?",
    options: [
      { key: "A", text: "React Native merender antarmuka menggunakan komponen native sistem operasi (bukan sekadar HTML iframe/webview)." },
      { key: "B", text: "React Native mengharuskan pengembang menulis seluruh kode aplikasi dalam bahasa assembly tingkat rendah." },
      { key: "C", text: "React Native tidak mengizinkan penggunaan JavaScript maupun JSX sama sekali." },
      { key: "D", text: "React Native hanya dapat dikompilasi pada sistem operasi server Linux tanpa GUI." }
    ],
    correctAnswerKey: "A",
    correctIndex: 0,
    explanation: "React Native menerjemahkan komponen JSX ke representasi UI native platform (UIKit di iOS dan Android Views di Android) lewat native bridge / JSI, menghasilkan performa tinggi mendekati aplikasi native sejati."
  },
  {
    id: 102,
    lo: "LO 2 - State & React Hooks",
    topicTag: "Modul 2 - State & React Hooks",
    question: "Hook fungsional manakah yang paling ideal digunakan untuk mengelola data form input yang nilainya berubah secara reaktif saat diketik oleh pengguna?",
    questionText: "Hook fungsional manakah yang paling ideal digunakan untuk mengelola data form input yang nilainya berubah secara reaktif saat diketik oleh pengguna?",
    options: [
      { key: "A", text: "useContext" },
      { key: "B", text: "useState" },
      { key: "C", text: "useReducer" },
      { key: "D", text: "useImperativeHandle" }
    ],
    correctAnswerKey: "B",
    correctIndex: 1,
    explanation: "useState mengembalikan pasangan nilai state saat ini dan fungsi updater yang memicu re-render ketika pengguna mengetik karakter pada form input."
  },
  {
    id: 103,
    lo: "LO 2 - Reusable Components & Props",
    topicTag: "Modul 3 - Reusable Components & Props",
    question: "Bagaimana cara terbaik untuk meneruskan data atau callback event dari parent component ke child component di React?",
    questionText: "Bagaimana cara terbaik untuk meneruskan data atau callback event dari parent component ke child component di React?",
    options: [
      { key: "A", text: "Melalui atribut props yang dideklarasikan saat memanggil child component." },
      { key: "B", text: "Mengubah langsung variabel window global di seluruh berkas." },
      { key: "C", text: "Menulis data ke dalam berkas teks lokal harddisk secara sinkron." },
      { key: "D", text: "Menggunakan selector querySelectorDOM yang mengakses ID tag HTML." }
    ],
    correctAnswerKey: "A",
    correctIndex: 0,
    explanation: "Aliran data di React bersifat unidirectional (satu arah) dari parent ke child menggunakan props, menjaga kestabilan dan kemudahan pelacakan bug (predictable state)."
  },
  {
    id: 104,
    lo: "LO 3 - Arsitektur Data Terpisah",
    topicTag: "Modul 4 - Arsitektur Data Terpisah",
    question: "Mengapa spesifikasi teknis aplikasi hybrid menganjurkan pemisahan data statis ke dalam berkas terpisah (seperti coursesData.js)?",
    questionText: "Mengapa spesifikasi teknis aplikasi hybrid menganjurkan pemisahan data statis ke dalam berkas terpisah (seperti coursesData.js)?",
    options: [
      { key: "A", text: "Meningkatkan modularitas kode, memudahkan perawatan, dan mencegah hardcoded duplicate data pada komponen UI." },
      { key: "B", text: "Memperberat ukuran file agar aplikasi terlihat rumit saat dinilai dosen." },
      { key: "C", text: "Karena React akan menolak me-render string teks yang ditulis di dalam JSX." },
      { key: "D", text: "Untuk menghapus kebutuhan dependensi package manager npm." }
    ],
    correctAnswerKey: "A",
    correctIndex: 0,
    explanation: "Pemisahan data (separation of concerns) memisahkan layer data dengan layer presentasi UI sehingga kode lebih mudah diuji, dirawat, dan diskalakan."
  },
  {
    id: 105,
    lo: "LO 3 - Version Control Git",
    topicTag: "Modul 5 - Version Control Git",
    question: "Perintah Git yang digunakan untuk mempublikasikan commit dari cabang lokal menuju repositori remote di GitHub adalah?",
    questionText: "Perintah Git yang digunakan untuk mempublikasikan commit dari cabang lokal menuju repositori remote di GitHub adalah?",
    options: [
      { key: "A", text: "git checkout --track" },
      { key: "B", text: "git push origin main" },
      { key: "C", text: "git rebase --abort" },
      { key: "D", text: "git reset --hard HEAD" }
    ],
    correctAnswerKey: "B",
    correctIndex: 1,
    explanation: "Perintah 'git push origin main' mengunggah riwayat commit cabang main lokal ke repositori remote bernama origin di GitHub."
  }
];
