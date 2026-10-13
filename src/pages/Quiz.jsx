import { useState, useEffect } from "react";

function Quiz({ onNavigate }) {
  const [nomorSoal, setNomorSoal] = useState(0);
  const [jawabanUser, setJawabanUser] = useState({});
  const [selesai, setSelesai] = useState(false);
  const [sisaWaktu, setSisaWaktu] = useState(300);

  const daftarSoal = [
    {
      id: 1,
      materi: "modul 1 - dasar javascript",
      pertanyaan: "keyword manakah di javascript yang digunakan untuk mendeklarasikan variabel yang nilainya tidak dapat diubah kembali (immutable binding)?",
      opsi: [
        { kunci: "A", teks: "var" },
        { kunci: "B", teks: "const" },
        { kunci: "C", teks: "let" },
        { kunci: "D", teks: "function" }
      ],
      kunciBenar: "B"
    },
    {
      id: 2,
      materi: "modul 2 - react hooks",
      pertanyaan: "hook react apa yang paling sering digunakan untuk menyimpan dan memperbarui data state internal di dalam komponen fungsional?",
      opsi: [
        { kunci: "A", teks: "useEffect" },
        { kunci: "B", teks: "useContext" },
        { kunci: "C", teks: "useState" },
        { kunci: "D", teks: "useMemo" }
      ],
      kunciBenar: "C"
    },
    {
      id: 3,
      materi: "modul 3 - arsitektur hybrid",
      pertanyaan: "apa keunggulan utama dari framework aplikasi hybrid seperti react native dibanding native murni?",
      opsi: [
        { kunci: "A", teks: "satu basis kode untuk android dan ios sekaligus" },
        { kunci: "B", teks: "tidak memerlukan instalasi node.js" },
        { kunci: "C", teks: "hanya bisa berjalan di browser desktop" },
        { kunci: "D", teks: "tidak mendukung komponen css" }
      ],
      kunciBenar: "A"
    },
    {
      id: 4,
      materi: "modul 4 - es6 & array",
      pertanyaan: "operator apa yang digunakan untuk menyalin atau menggabungkan array/objek dengan simbol tiga titik (...) di javascript modern?",
      opsi: [
        { kunci: "A", teks: "spread operator" },
        { kunci: "B", teks: "ternary operator" },
        { kunci: "C", teks: "bitwise operator" },
        { kunci: "D", teks: "arithmetic operator" }
      ],
      kunciBenar: "A"
    },
    {
      id: 5,
      materi: "modul 5 - git & version control",
      pertanyaan: "perintah git apa yang digunakan untuk mengirimkan commit lokal menuju repositori remote di github?",
      opsi: [
        { kunci: "A", teks: "git pull origin main" },
        { kunci: "B", teks: "git push origin main" },
        { kunci: "C", teks: "git clone" },
        { kunci: "D", teks: "git checkout" }
      ],
      kunciBenar: "B"
    }
  ];

  useEffect(() => {
    if (selesai || sisaWaktu <= 0) return;
    const interval = setInterval(() => {
      setSisaWaktu(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [selesai, sisaWaktu]);

  const menit = Math.floor(sisaWaktu / 60);
  const detik = sisaWaktu % 60;
  const formatTimer = `${menit.toString().padStart(2, "0")}:${detik.toString().padStart(2, "0")}`;

  const soalIni = daftarSoal[nomorSoal];
  const persenProgres = ((nomorSoal + 1) / daftarSoal.length) * 100;

  function pilihOpsi(kunci) {
    if (selesai) return;
    setJawabanUser(prev => ({
      ...prev,
      [soalIni.id]: kunci
    }));
  }

  function handleLanjut() {
    if (nomorSoal < daftarSoal.length - 1) {
      setNomorSoal(prev => prev + 1);
    } else {
      setSelesai(true);
    }
  }

  function handleSebelumnya() {
    if (nomorSoal > 0) {
      setNomorSoal(prev => prev - 1);
    }
  }

  let totalBenar = 0;
  daftarSoal.forEach(s => {
    if (jawabanUser[s.id] === s.kunciBenar) {
      totalBenar++;
    }
  });
  const nilaiAkhir = Math.round((totalBenar / daftarSoal.length) * 100);

  if (selesai) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-between p-6 overflow-y-auto no-scrollbar pb-24 text-center bg-background text-on-surface">
        <div className="w-full max-w-sm space-y-4 pt-3">
          <div className="w-24 h-24 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl">military_tech</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full uppercase">
              selesai dikerjakan
            </span>
            <h1 className="font-headline text-xl font-bold text-on-surface mt-1">
              hasil kuis mahasiswa
            </h1>
            <p className="text-xs text-on-surface-variant">
              tugas kuis modul pemahaman aplikasi hybrid
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-2.5">
              <span className="text-[10px] text-outline block">nilai</span>
              <span className="font-headline text-lg font-bold text-primary">{nilaiAkhir}</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-2.5">
              <span className="text-[10px] text-outline block">benar</span>
              <span className="font-headline text-lg font-bold text-secondary">{totalBenar}/{daftarSoal.length}</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-2.5">
              <span className="text-[10px] text-outline block">status</span>
              <span className="font-headline text-xs font-bold text-amber-600">
                {nilaiAkhir >= 60 ? "lulus" : "remedial"}
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3 text-left space-y-2">
            <span className="text-xs font-bold text-on-surface block">evaluasi jawaban:</span>
            <div className="space-y-1 text-xs">
              {daftarSoal.map((s, i) => {
                const benar = jawabanUser[s.id] === s.kunciBenar;
                return (
                  <div key={s.id} className="flex items-center justify-between py-1 border-b border-outline-variant/20 last:border-none">
                    <span className="text-on-surface text-[11px] truncate flex-1 pr-2">
                      soal {i+1}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      benar ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    }`}>
                      {benar ? "benar" : "salah"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-2 pt-4">
          <button
            type="button"
            onClick={() => {
              setJawabanUser({});
              setNomorSoal(0);
              setSelesai(false);
              setSisaWaktu(300);
            }}
            className="w-full h-11 rounded-xl bg-surface-container text-xs font-semibold hover:bg-surface-container-high transition-all"
          >
            coba kerjakan ulang
          </button>

          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="w-full h-11 rounded-xl bg-primary text-white text-xs font-bold shadow-sm"
          >
            kembali ke beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar pb-24 text-left">
      <div>
        <nav className="w-full px-5 py-3 flex items-center justify-between sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>

          <div className="h-8 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-full flex items-center">
            <span className="text-xs font-bold text-on-surface">
              soal {nomorSoal + 1} <span className="text-outline font-normal">/ {daftarSoal.length}</span>
            </span>
          </div>

          <div className="h-8 px-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-primary text-sm">timer</span>
            <span className="text-xs font-mono font-bold text-primary">{formatTimer}</span>
          </div>
        </nav>

        <div className="w-full h-1 bg-surface-container-high">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${persenProgres}%` }}
          />
        </div>

        <main className="px-5 pt-3 space-y-3">
          <span className="text-[10px] text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-md inline-block">
            {soalIni.materi}
          </span>

          <div className="bg-surface-container-lowest rounded-xl p-3.5 border border-outline-variant/30 space-y-1">
            <span className="text-[9px] text-outline uppercase font-semibold">
              pilihan ganda
            </span>
            <h2 className="font-headline text-sm font-bold text-on-surface leading-snug">
              {soalIni.pertanyaan}
            </h2>
          </div>

          <div className="space-y-2">
            {soalIni.opsi.map((item) => {
              const dipilih = jawabanUser[soalIni.id] === item.kunci;

              return (
                <button
                  key={item.kunci}
                  type="button"
                  onClick={() => pilihOpsi(item.kunci)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    dipilih
                      ? "bg-primary/5 border-primary ring-1 ring-primary/30"
                      : "bg-surface-container-lowest border-outline-variant/40 text-on-surface"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    dipilih 
                      ? "bg-primary text-white" 
                      : "bg-surface-container text-on-surface-variant"
                  }`}>
                    {item.kunci}
                  </div>

                  <span className={`text-xs flex-1 ${dipilih ? "text-primary font-semibold" : "text-on-surface"}`}>
                    {item.teks}
                  </span>
                </button>
              );
            })}
          </div>
        </main>
      </div>

      <footer className="w-full px-5 py-3 border-t border-outline-variant/20 bg-surface/90 backdrop-blur-md flex items-center justify-between gap-2 sticky bottom-0 z-30">
        <button
          type="button"
          disabled={nomorSoal === 0}
          onClick={handleSebelumnya}
          className="h-10 px-3.5 rounded-xl border border-outline-variant/40 text-xs font-medium text-on-surface-variant disabled:opacity-30"
        >
          sebelumnya
        </button>

        <button
          type="button"
          onClick={handleLanjut}
          disabled={!jawabanUser[soalIni.id]}
          className="flex-1 h-10 rounded-xl bg-primary text-white text-xs font-bold disabled:opacity-40"
        >
          {nomorSoal === daftarSoal.length - 1 ? "kumpulkan kuis" : "soal berikutnya"}
        </button>
      </footer>
    </div>
  );
}

export default Quiz;
