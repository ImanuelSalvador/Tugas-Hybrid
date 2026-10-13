import { useState } from "react";

function Profile({ user, onLogout, onNavigate }) {
  const [notif, setNotif] = useState(true);

  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto no-scrollbar pb-24 text-left">
      <header className="w-full px-5 py-3 flex items-center justify-between sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20">
        <h1 className="font-headline text-base font-bold text-on-surface">
          profil mahasiswa
        </h1>
        <button
          type="button"
          onClick={onLogout}
          className="text-xs text-error hover:bg-error-container/40 px-2 py-1 rounded-md flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          <span>keluar</span>
        </button>
      </header>

      <main className="px-5 pt-3 space-y-3.5">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 text-center space-y-2.5">
          <div className="w-16 h-16 mx-auto rounded-full ring-2 ring-primary/20 overflow-hidden shadow-xs">
            <img
              src={user?.avatar || "/assets/avatar.png"}
              alt="avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span class="material-symbols-outlined text-primary text-4xl flex items-center justify-center h-full">person</span>';
              }}
            />
          </div>

          <div>
            <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block mb-1">
              mahasiswa aktif
            </span>
            <h2 className="font-headline text-base font-bold text-on-surface">
              {user?.name || "imanuel salvador"}
            </h2>
            <p className="text-xs text-on-surface-variant">
              {user?.email || "student@edulearn.edu"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-outline-variant/20 text-xs">
            <div>
              <span className="font-headline font-bold text-on-surface block">3.85</span>
              <span className="text-[10px] text-outline">ipk</span>
            </div>
            <div>
              <span className="font-headline font-bold text-on-surface block">semester 4</span>
              <span className="text-[10px] text-outline">tingkat</span>
            </div>
            <div>
              <span className="font-headline font-bold text-primary block">20 sks</span>
              <span className="text-[10px] text-outline">beban sks</span>
            </div>
          </div>
        </div>

        <section className="space-y-1.5">
          <h3 className="font-headline text-xs font-bold text-on-surface">
            status tugas & pencapaian
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-2.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
              <div className="truncate">
                <span className="text-xs font-semibold text-on-surface block truncate">tugas 1 hybrid</span>
                <span className="text-[10px] text-outline">selesai dinilai</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-2.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-lg">verified</span>
              <div className="truncate">
                <span className="text-xs font-semibold text-on-surface block truncate">presensi 100%</span>
                <span className="text-[10px] text-outline">terverifikasi</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-1.5">
          <h3 className="font-headline text-xs font-bold text-on-surface">
            pengaturan aplikasi
          </h3>
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl divide-y divide-outline-variant/20 overflow-hidden text-xs">
            <div className="p-3 flex items-center justify-between">
              <span>notifikasi deadline tugas</span>
              <input
                type="checkbox"
                checked={notif}
                onChange={(e) => setNotif(e.target.checked)}
                className="w-4 h-4 rounded text-primary"
              />
            </div>

            <div className="p-3 flex items-center justify-between">
              <span>latihan kuis mandiri</span>
              <button
                type="button"
                onClick={() => onNavigate("quiz")}
                className="text-primary font-semibold hover:underline"
              >
                buka
              </button>
            </div>

            <div className="p-3 flex items-center justify-between">
              <span className="text-error font-medium">keluar dari akun</span>
              <button
                type="button"
                onClick={onLogout}
                className="text-error font-semibold hover:underline"
              >
                logout
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
