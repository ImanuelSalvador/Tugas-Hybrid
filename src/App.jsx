import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "William Surya",
    username: "student",
    email: "student@edulearn.edu",
    avatar: "/assets/avatar.png"
  });
  const [activeTab, setActiveTab] = useState("home"); // "home" | "courses" | "quiz" | "profile"
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  function handleLoginSuccess(userData) {
    if (userData) setUser(userData);
    setIsLoggedIn(true);
    setActiveTab("home");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setActiveTab("home");
  }

  return (
    <div className="min-h-screen bg-slate-200/80 flex flex-col items-center justify-center p-0 sm:p-4 font-body text-on-surface select-none">
      {/* Top Device / View Switcher Controls (Helpful for desktop preview) */}
      <div className="hidden sm:flex items-center gap-2 mb-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs border border-slate-300/80 text-xs text-slate-700">
        <span className="font-semibold text-primary flex items-center gap-1">
          <span className="material-symbols-outlined text-base">devices</span>
          EduLearn Viewport:
        </span>
        <button
          type="button"
          onClick={() => setIsMobileFrame(true)}
          className={`px-3 py-1 rounded-full font-medium transition-all ${
            isMobileFrame 
              ? "bg-primary text-white shadow-xs" 
              : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          📱 Mobile Canvas (390×844)
        </button>
        <button
          type="button"
          onClick={() => setIsMobileFrame(false)}
          className={`px-3 py-1 rounded-full font-medium transition-all ${
            !isMobileFrame 
              ? "bg-primary text-white shadow-xs" 
              : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          💻 Full Responsive
        </button>
      </div>

      {/* Main App Container Shell */}
      <div className={`w-full bg-background flex flex-col relative overflow-hidden transition-all duration-300 ${
        isMobileFrame
          ? "max-w-[390px] h-[844px] sm:rounded-[44px] shadow-2xl border-0 sm:border-8 sm:border-slate-800"
          : "max-w-4xl min-h-[90vh] sm:rounded-3xl shadow-xl border border-slate-300"
      }`}>
        {/* iOS Native Status Bar (Shown in Mobile View) */}
        {isMobileFrame && (
          <div className="w-full h-11 pt-3 px-6 flex justify-between items-center text-on-surface text-xs font-semibold z-50 bg-surface shrink-0">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-on-surface">
              <span className="material-symbols-outlined text-[15px]">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[15px]">wifi</span>
              <span className="material-symbols-outlined text-[18px]">battery_full</span>
            </div>
          </div>
        )}

        {/* Dynamic View Router */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {!isLoggedIn ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <>
              {activeTab === "home" && (
                <Home 
                  user={user} 
                  onNavigate={setActiveTab} 
                  onSelectCourse={setSelectedCourse}
                />
              )}

              {activeTab === "courses" && (
                <Courses 
                  onNavigate={setActiveTab} 
                  onStartQuiz={() => setActiveTab("quiz")}
                />
              )}

              {activeTab === "quiz" && (
                <Quiz 
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === "profile" && (
                <Profile 
                  user={user} 
                  onLogout={handleLogout} 
                  onNavigate={setActiveTab}
                />
              )}

              {/* Bottom Navigation Bar */}
              <nav className="absolute bottom-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-md border-t border-outline-variant/30 px-6 flex items-center justify-around z-40">
                <button
                  type="button"
                  onClick={() => setActiveTab("home")}
                  className={`flex flex-col items-center justify-center gap-0.5 transition-all ${
                    activeTab === "home" ? "text-primary" : "text-outline hover:text-on-surface"
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl ${activeTab === "home" ? "fill-icon font-bold" : ""}`}>
                    home
                  </span>
                  <span className="text-[10px] font-semibold">Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("courses")}
                  className={`flex flex-col items-center justify-center gap-0.5 transition-all ${
                    activeTab === "courses" ? "text-primary" : "text-outline hover:text-on-surface"
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl ${activeTab === "courses" ? "fill-icon font-bold" : ""}`}>
                    menu_book
                  </span>
                  <span className="text-[10px] font-semibold">Courses</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("quiz")}
                  className={`flex flex-col items-center justify-center gap-0.5 transition-all ${
                    activeTab === "quiz" ? "text-primary" : "text-outline hover:text-on-surface"
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl ${activeTab === "quiz" ? "fill-icon font-bold" : ""}`}>
                    quiz
                  </span>
                  <span className="text-[10px] font-semibold">Quiz</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("profile")}
                  className={`flex flex-col items-center justify-center gap-0.5 transition-all ${
                    activeTab === "profile" ? "text-primary" : "text-outline hover:text-on-surface"
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl ${activeTab === "profile" ? "fill-icon font-bold" : ""}`}>
                    person
                  </span>
                  <span className="text-[10px] font-semibold">Profile</span>
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