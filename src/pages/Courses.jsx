import { useState } from "react";

function Courses({ onNavigate, onStartQuiz }) {
  const [cari, setCari] = useState("");
  const [tabAktif, setTabAktif] = useState("semua");
  const [bookmark, setBookmark] = useState(["hybrid-apps"]);
  const [detailKelas, setDetailKelas] = useState(null);
  const [kelasDiambil, setKelasDiambil] = useState(["hybrid-apps"]);

  const listKategori = ["semua", "pemrograman", "desain", "basis data", "jaringan"];

  const dataKelas = [
    {
      id: "hybrid-apps",
      title: "pemrograman mobile & hybrid",
      deskripsi: "mempelajari react native, flutter, pengelolaan state dan integrasi api perangkat.",
      kategori: "pemrograman",
      dosen: "andi pratama, m.kom",
      sks: "3 sks",
      modul: 12,
      waktu: "18 jam",
      rating: 4.9,
      warna: "from-blue-600 to-indigo-700",
      silabus: [
        "minggu 1 - pengenalan arsitektur hybrid & react",
        "minggu 2 - komponen ui dasar dan layouting",
        "minggu 3 - state management dan hooks",
        "minggu 4 - integrasi rest api & fetch data",
        "minggu 5 - navigasi dan penyimpanan lokal",
        "minggu 6 - deployment dan uas"
      ]
    },
    {
      id: "web-lanjut",
      title: "pemrograman web lanjut",
      deskripsi: "pengembangan aplikasi web berbasis react, node.js dan tailwind css modern.",
      kategori: "pemrograman",
      dosen: "siti rahma, s.t.",
      sks: "3 sks",
      modul: 14,
      waktu: "16 jam",
      rating: 4.8,
      warna: "from-indigo-600 to-primary",
      silabus: [
        "minggu 1 - modern javascript es6+",
        "minggu 2 - routing dan auth token",
        "minggu 3 - backend rest api node.js",
        "minggu 4 - optimasi performa web"
      ]
    },
    {
      id: "ui-ux",
      title: "desain antarmuka mobile ui/ux",
      deskripsi: "prinsip desain produk digital, wireframe, prototipe figma dan usability testing.",
      kategori: "desain",
      dosen: "budi santoso, m.sn.",
      sks: "2 sks",
      modul: 10,
      waktu: "12 jam",
      rating: 4.9,
      warna: "from-purple-600 to-pink-600",
      silabus: [
        "minggu 1 - user persona & wireframing",
        "minggu 2 - komponen auto-layout figma",
        "minggu 3 - design system dan warna",
        "minggu 4 - uji coba interaksi prototipe"
      ]
    },
    {
      id: "basis-data",
      title: "basis data terdistribusi & sql",
      deskripsi: "desain skema relasional, indeks query postgresql dan nosql mongodb.",
      kategori: "basis data",
      dosen: "dr. rian hidayat",
      sks: "3 sks",
      modul: 12,
      waktu: "20 jam",
      rating: 4.7,
      warna: "from-emerald-600 to-teal-700",
      silabus: [
        "minggu 1 - normalisasi data 1nf sampai 3nf",
        "minggu 2 - query sql kompleks & indexing",
        "minggu 3 - transaksi acld dan integritas",
        "minggu 4 - integrasi mongodb nosql"
      ]
    }
  ];

  function toggleSimpan(id, e) {
    e.stopPropagation();
    setBookmark(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  function handleAmbilKelas(id) {
    if (!kelasDiambil.includes(id)) {
      setKelasDiambil(prev => [...prev, id]);
    }
  }

  const listFiltered = dataKelas.filter(item => {
    const cocokTab = tabAktif === "semua" || item.kategori === tabAktif;
    const cocokCari = item.title.toLowerCase().includes(cari.toLowerCase()) ||
                       item.dosen.toLowerCase().includes(cari.toLowerCase());
    return cocokTab && cocokCari;
  });

  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto no-scrollbar pb-24 text-left">
      <header className="w-full px-5 py-3 flex items-center justify-between sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <h1 className="font-headline text-base font-bold text-on-surface">
            daftar mata kuliah
          </h1>
        </div>

        <button
          type="button"
          onClick={() => alert(`kamu menyimpan ${bookmark.length} mata kuliah favorit`)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container"
        >
          <span className="material-symbols-outlined text-[19px]">bookmark</span>
        </button>
      </header>

      <div className="px-5 pt-3 space-y-2.5">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="cari mata kuliah atau dosen..."
            className="w-full h-11 pl-9 pr-3 bg-surface-container-lowest border border-outline-variant/40 rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-0"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-5 px-5">
          {listKategori.map((kat) => (
            <button
              key={kat}
              type="button"
              onClick={() => setTabAktif(kat)}
              className={`h-7 px-3 rounded-full text-xs transition-all whitespace-nowrap ${
                tabAktif === kat
                  ? "bg-primary text-white font-semibold"
                  : "bg-surface-container-lowest border border-outline-variant/40 text-on-surface-variant"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-3 space-y-3">
        {listFiltered.map((item) => {
          const isTersimpan = bookmark.includes(item.id);
          const isAmbil = kelasDiambil.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => setDetailKelas(item)}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xs transition-all"
            >
              <div className={`h-24 bg-gradient-to-r ${item.warna} p-3 flex flex-col justify-between text-white`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium bg-black/20 px-2 py-0.5 rounded-full">
                    {item.sks}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => toggleSimpan(item.id, e)}
                    className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center text-white"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isTersimpan ? "bookmark" : "bookmark_border"}
                    </span>
                  </button>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-semibold text-white/80">
                    {item.kategori}
                  </span>
                  <h3 className="font-headline font-bold text-sm text-white line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-3 space-y-2">
                <p className="text-[11px] text-on-surface-variant line-clamp-2">
                  {item.deskripsi}
                </p>

                <div className="flex items-center justify-between text-[11px] text-outline border-t border-outline-variant/20 pt-2">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-amber-500 text-xs fill-icon">star</span>
                    <strong className="text-on-surface">{item.rating}</strong>
                  </span>

                  <span>{item.modul} pertemuan • {item.waktu}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-on-surface font-medium">
                    {item.dosen}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailKelas(item);
                    }}
                    className={`h-7 px-3 rounded-lg text-[11px] font-semibold transition-all ${
                      isAmbil
                        ? "bg-secondary/10 text-secondary"
                        : "bg-primary text-white"
                    }`}
                  >
                    {isAmbil ? "buka" : "ambil"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {detailKelas && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-surface rounded-t-2xl sm:rounded-2xl max-h-[80vh] flex flex-col overflow-hidden text-left shadow-xl">
            <div className={`p-4 bg-gradient-to-r ${detailKelas.warna} text-white flex justify-between items-start`}>
              <div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase">
                  {detailKelas.kategori}
                </span>
                <h3 className="font-headline text-base font-bold text-white mt-1">
                  {detailKelas.title}
                </h3>
                <p className="text-[11px] text-white/80">
                  dosen: {detailKelas.dosen}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDetailKelas(null)}
                className="w-7 h-7 rounded-full bg-black/20 text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
              <div>
                <h4 className="font-bold text-on-surface mb-1">deskripsi kuliah</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  {detailKelas.deskripsi}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-on-surface mb-1.5">silabus pertemuan</h4>
                <div className="space-y-1">
                  {detailKelas.silabus.map((sil, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                      <span>{sil}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-surface border-t border-outline-variant/20 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  handleAmbilKelas(detailKelas.id);
                  if (onStartQuiz) onStartQuiz();
                  setDetailKelas(null);
                }}
                className="flex-1 h-10 bg-primary text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">quiz</span>
                <span>kerjakan kuis</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleAmbilKelas(detailKelas.id);
                  alert(`berhasil mengambil mata kuliah ${detailKelas.title}`);
                  setDetailKelas(null);
                }}
                className="h-10 px-4 bg-surface-container text-on-surface rounded-xl text-xs font-medium"
              >
                {kelasDiambil.includes(detailKelas.id) ? "terdaftar" : "ambil matkul"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
