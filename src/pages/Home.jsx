import { useState } from "react";

function Home({ user, onNavigate, onSelectCourse }) {
  const [cari, setCari] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("semua");

  const listKategori = ["semua", "pemrograman", "desain", "basis data", "jaringan"];

  const kelasBerjalan = {
    id: "hybrid-apps",
    title: "pemrograman mobile & hybrid",
    subtitle: "arsitektur react native dan antarmuka mobile",
    kategori: "pemrograman",
    infoPertemuan: "pertemuan 7 dari 12",
    progres: 58,
    dosen: "andi pratama, m.kom",
    nilai: 4.9
  };

  const daftarKelas = [
    {
      id: "react-native",
      title: "pemrograman web & hybrid modern",
      kategori: "pemrograman",
      dosen: "siti rahma, s.t.",
      modul: 14,
      jam: "16 jam",
      nilai: 4.8,
      status: "sedang diambil",
      warna: "from-blue-600 to-indigo-700"
    },
    {
      id: "ui-ux-design",
      title: "desain antarmuka mobile ui/ux",
      kategori: "desain",
      dosen: "budi santoso, m.sn.",
      modul: 18,
      jam: "12 jam",
      nilai: 4.9,
      status: "baru",
      warna: "from-purple-600 to-pink-600"
    },
    {
      id: "basis-data-lanjut",
      title: "basis data & rest api terdistribusi",
      kategori: "basis data",
      dosen: "dr. rian hidayat",
      modul: 12,
      jam: "20 jam",
      nilai: 4.7,
      status: "tersedia",
      warna: "from-emerald-600 to-teal-700"
    }
  ];

  const filteredKelas = daftarKelas.filter(item => {
    const cocokKategori = kategoriAktif === "semua" || item.kategori === kategoriAktif;
    const cocokCari = item.title.toLowerCase().includes(cari.toLowerCase()) || 
                       item.kategori.toLowerCase().includes(cari.toLowerCase());
    return cocokKategori && cocokCari;
  });

  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto no-scrollbar pb-24 text-left">
      <header className="w-full px-5 py-3 flex items-center justify-between sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">
              school
            </span>
          </div>
          <span className="font-headline text-base font-bold tracking-tight text-primary">
            edulearn
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => alert("tidak ada notifikasi baru hari ini")}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("profile")}
            className="w-9 h-9 rounded-full ring-2 ring-primary/20 overflow-hidden shrink-0"
          >
            <img 
              src={user?.avatar || "/assets/avatar.png"} 
              alt="avatar" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span class="material-symbols-outlined text-primary text-lg flex items-center justify-center h-full">person</span>';
              }}
            />
          </button>
        </div>
      </header>

      <main className="px-5 pt-3 space-y-4">
        <section className="space-y-2.5">
          <div>
            <h1 className="font-headline text-xl font-bold tracking-tight text-on-surface">
              halo, {user?.name || "mahasiswa"} 👋
            </h1>
            <p className="text-xs text-on-surface-variant">
              jangan lupa cek tugas kuliah dan jadwal kuis minggu ini
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-11 bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-[18px]">search</span>
              <input
                type="text"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                placeholder="cari mata kuliah..."
                className="w-full bg-transparent border-none p-0 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-0"
              />
              {cari && (
                <button type="button" onClick={() => setCari("")} className="text-outline">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>

            <button 
              type="button"
              onClick={() => onNavigate("courses")}
              className="w-11 h-11 bg-surface-container-lowest border border-outline-variant/40 rounded-xl flex items-center justify-center text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-sm font-bold text-on-surface">
              ringkasan belajar
            </h2>
            <span className="text-[10px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
              semester 4
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-2 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-primary text-base mb-0.5">menu_book</span>
              <span className="font-headline font-bold text-sm text-on-surface">5</span>
              <span className="text-[9px] text-on-surface-variant">matkul</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-2 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-secondary text-base mb-0.5">task_alt</span>
              <span className="font-headline font-bold text-sm text-on-surface">2</span>
              <span className="text-[9px] text-on-surface-variant">selesai</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-2 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-primary text-base mb-0.5">schedule</span>
              <span className="font-headline font-bold text-sm text-on-surface">24j</span>
              <span className="text-[9px] text-on-surface-variant">total jam</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-2 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-amber-600 text-base mb-0.5">grade</span>
              <span className="font-headline font-bold text-sm text-on-surface">86%</span>
              <span className="text-[9px] text-on-surface-variant">rata-rata</span>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-sm font-bold text-on-surface">
              lanjutkan materi
            </h2>
            <button 
              type="button"
              onClick={() => onNavigate("quiz")}
              className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5"
            >
              <span>kerjakan kuis</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          <div className="relative overflow-hidden bg-primary rounded-2xl p-4 text-white shadow-md">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="bg-white/20 px-2 py-0.5 rounded-md font-medium">
                  {kelasBerjalan.kategori}
                </span>
                <span className="text-white/80">
                  {kelasBerjalan.infoPertemuan}
                </span>
              </div>

              <div>
                <h3 className="font-headline text-base font-bold text-white leading-tight">
                  {kelasBerjalan.title}
                </h3>
                <p className="text-[11px] text-white/80 mt-0.5">
                  {kelasBerjalan.subtitle}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] text-white/80">
                  <span>progres materi</span>
                  <span className="font-bold text-white">{kelasBerjalan.progres}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary-fixed rounded-full" 
                    style={{ width: `${kelasBerjalan.progres}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectCourse) onSelectCourse(kelasBerjalan);
                    onNavigate("courses");
                  }}
                  className="h-9 bg-white text-primary rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  <span>buka materi</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate("quiz")}
                  className="h-9 bg-white/15 text-white border border-white/20 rounded-lg text-xs font-medium flex items-center justify-center gap-1 hover:bg-white/25"
                >
                  <span className="material-symbols-outlined text-sm">quiz</span>
                  <span>latihan kuis</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-sm font-bold text-on-surface">
              kategori kelas
            </h2>
            <button 
              type="button"
              onClick={() => onNavigate("courses")}
              className="text-xs text-primary hover:underline"
            >
              lihat semua
            </button>
          </div>

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-5 px-5">
            {listKategori.map((kategori) => (
              <button
                key={kategori}
                type="button"
                onClick={() => setKategoriAktif(kategori)}
                className={`h-7 px-3 rounded-full text-xs transition-all whitespace-nowrap ${
                  kategoriAktif === kategori
                    ? "bg-primary text-white font-semibold"
                    : "bg-surface-container-lowest border border-outline-variant/40 text-on-surface-variant"
                }`}
              >
                {kategori}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-2.5 pb-2">
          {filteredKelas.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (onSelectCourse) onSelectCourse(item);
                onNavigate("courses");
              }}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3 flex gap-3 cursor-pointer hover:shadow-xs transition-all"
            >
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-tr ${item.warna} text-white flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-xl">
                  {item.kategori === "desain" ? "palette" : item.kategori === "basis data" ? "database" : "terminal"}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-primary uppercase">
                      {item.kategori}
                    </span>
                    <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-xs fill-icon">star</span>
                      {item.nilai}
                    </span>
                  </div>

                  <h4 className="font-headline text-xs font-bold text-on-surface line-clamp-1 mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant">
                    {item.dosen}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-outline pt-1">
                  <span>{item.modul} materi • {item.jam}</span>
                  <span className="font-semibold text-primary">{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Home;
