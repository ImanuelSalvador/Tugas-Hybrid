import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    name: "Imanuel Salvador",
    username: "student",
    email: "student@edulearn.edu",
    avatar: "/assets/avatar.png"
  });
  const [tabAktif, setTabAktif] = useState("home");
  const [pilihanKelas, setPilihanKelas] = useState(null);
  const [modeHp, setModeHp] = useState(true);

  function handleLoginBerhasil(dataUser) {
    if (dataUser) setUser(dataUser);
    setIsLogin(true);
    setTabAktif("home");
  }

  function handleLogout() {
    setIsLogin(false);
    setTabAktif("home");
  }

  return (
    <div className="min-h-screen bg-slate-200/80 flex flex-col items-center justify-center p-0 sm:p-4 font-body text-on-surface select-none">
      <div className="hidden sm:flex items-center gap-2 mb-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs border border-slate-300 text-xs text-slate-700">
        <span className="font-semibold text-primary">tampilan preview:</span>
        <button
          type="button"
          onClick={() => setModeHp(true)}
          className={`px-3 py-1 rounded-full font-medium transition-all ${
            modeHp 
              ? "bg-primary text-white" 
              : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          📱 mode mobile (390×844)
        </button>
        <button
          type="button"
          onClick={() => setModeHp(false)}
          className={`px-3 py-1 rounded-full font-medium transition-all ${
            !modeHp 
              ? "bg-primary text-white" 
              : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          💻 mode web penuh
        </button>
      </div>

      <div className={`w-full bg-background flex flex-col relative overflow-hidden transition-all duration-300 ${
        modeHp
          ? "max-w-[390px] h-[844px] sm:rounded-[44px] shadow-2xl border-0 sm:border-8 sm:border-slate-800"
          : "max-w-4xl min-h-[90vh] sm:rounded-3xl shadow-xl border border-slate-300"
      }`}>
        {modeHp && (
          <div className="w-full h-11 pt-3 px-6 flex justify-between items-center text-on-surface text-xs font-semibold z-50 bg-surface shrink-0">
            <span>09:41</span>
            <div className="flex items-center gap-1.5 text-on-surface">
              <span className="material-symbols-outlined text-[15px]">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[15px]">wifi</span>
              <span className="material-symbols-outlined text-[18px]">battery_full</span>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden relative">
          {!isLogin ? (
            <Login onLoginSuccess={handleLoginBerhasil} />
          ) : (
            <>
              {tabAktif === "home" && (
                <Home 
                  user={user} 
                  onNavigate={setTabAktif} 
                  onSelectCourse={setPilihanKelas}
                />
              )}

              {tabAktif === "courses" && (
                <Courses 
                  onNavigate={setTabAktif} 
                  onStartQuiz={() => setTabAktif("quiz")}
                />
              )}

              {tabAktif === "quiz" && (
                <Quiz 
                  onNavigate={setTabAktif}
                />
              )}

              {tabAktif === "profile" && (
                <Profile 
                  user={user} 
                  onLogout={handleLogout} 
                  onNavigate={setTabAktif}
                />
              )}

              <nav className="absolute bottom-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-md border-t border-outline-variant/30 px-6 flex items-center justify-around z-40">
                <button
                  type="button"
                  onClick={() => setTabAktif("home")}
                  className={`flex flex-col items-center justify-center gap-0.5 transition-all ${
                    tabAktif === "home" ? "text-primary font-bold" : "text-outline hover:text-on-surface"
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl ${tabAktif === "home" ? "fill-icon" : ""}`}>
                    home
                  </span>
                  <span className="text-[10px]">beranda</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTabAktif("courses")}
                  className={`flex flex-col items-center justify-center gap-0.5 transition-all ${
                    tabAktif === "courses" ? "text-primary font-bold" : "text-outline hover:text-on-surface"
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl ${tabAktif === "courses" ? "fill-icon" : ""}`}>
                    menu_book
                  </span>
                  <span className="text-[10px]">kelas</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTabAktif("quiz")}
                  className={`flex flex-col items-center justify-center gap-0.5 transition-all ${
                    tabAktif === "quiz" ? "text-primary font-bold" : "text-outline hover:text-on-surface"
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl ${tabAktif === "quiz" ? "fill-icon" : ""}`}>
                    quiz
                  </span>
                  <span className="text-[10px]">kuis</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTabAktif("profile")}
                  className={`flex flex-col items-center justify-center gap-0.5 transition-all ${
                    tabAktif === "profile" ? "text-primary font-bold" : "text-outline hover:text-on-surface"
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl ${tabAktif === "profile" ? "fill-icon" : ""}`}>
                    person
                  </span>
                  <span className="text-[10px]">profil</span>
                </button>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;