import { useState } from "react";

function Profile({ user, onLogout, onNavigate }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="w-full flex-1 flex flex-col overflow-y-auto no-scrollbar pb-24 text-left">
      {/* Header */}
      <header className="w-full px-5 py-3 flex items-center justify-between sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20">
        <h1 className="font-headline text-lg font-bold text-on-surface">
          Student Profile
        </h1>
        <button
          type="button"
          onClick={onLogout}
          className="text-xs font-semibold text-error hover:bg-error-container/40 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          <span>Log Out</span>
        </button>
      </header>

      {/* Main Profile Content */}
      <main className="px-5 pt-4 space-y-4">
        {/* Profile Avatar Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-5 text-center shadow-2xs space-y-3 relative overflow-hidden">
          <div className="w-20 h-20 mx-auto rounded-full ring-4 ring-primary/20 overflow-hidden shadow-md">
            <img
              src={user?.avatar || "/assets/avatar.png"}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span class="material-symbols-outlined text-primary text-5xl flex items-center justify-center h-full">person</span>';
              }}
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold mb-1">
              <span className="material-symbols-outlined text-xs fill-icon">verified</span>
              <span>Active Student</span>
            </div>
            <h2 className="font-headline text-xl font-bold text-on-surface">
              {user?.name || "William Surya"}
            </h2>
            <p className="text-xs text-on-surface-variant">
              {user?.email || "student@edulearn.edu"}
            </p>
          </div>

          {/* Quick Academic Meta */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-outline-variant/30">
            <div>
              <span className="font-headline text-sm font-bold text-on-surface block">3.92</span>
              <span className="text-[10px] text-outline">GPA</span>
            </div>
            <div>
              <span className="font-headline text-sm font-bold text-on-surface block">Sem 4</span>
              <span className="text-[10px] text-outline">Semester</span>
            </div>
            <div>
              <span className="font-headline text-sm font-bold text-primary block">1,420</span>
              <span className="text-[10px] text-outline">XP Points</span>
            </div>
          </div>
        </div>

        {/* Certificates & Achievements */}
        <section className="space-y-2">
          <h3 className="font-headline text-sm font-bold text-on-surface">
            My Badges & Certificates
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-3 flex items-center gap-2.5 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl fill-icon">military_tech</span>
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-on-surface block truncate">JavaScript Pro</span>
                <span className="text-[10px] text-outline block">Verified</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-3 flex items-center gap-2.5 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl fill-icon">workspace_premium</span>
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-on-surface block truncate">Top 5% Cohort</span>
                <span className="text-[10px] text-outline block">Academic</span>
              </div>
            </div>
          </div>
        </section>

        {/* Preferences & Settings */}
        <section className="space-y-2">
          <h3 className="font-headline text-sm font-bold text-on-surface">
            Settings & Account
          </h3>
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl divide-y divide-outline-variant/30 shadow-2xs overflow-hidden">
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-xl">notifications</span>
                <div>
                  <span className="text-xs font-semibold text-on-surface block">Push Notifications</span>
                  <span className="text-[10px] text-outline">Assignment reminders</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
              />
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-xl">quiz</span>
                <div>
                  <span className="text-xs font-semibold text-on-surface block">Take Academic Quiz</span>
                  <span className="text-[10px] text-outline">Earn XP & review topics</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("quiz")}
                className="text-xs font-bold text-primary hover:underline"
              >
                Start
              </button>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-error text-xl">logout</span>
                <div>
                  <span className="text-xs font-semibold text-error block">Sign Out</span>
                  <span className="text-[10px] text-outline">Exit student session</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="text-xs font-bold text-error hover:underline"
              >
                Log Out
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
