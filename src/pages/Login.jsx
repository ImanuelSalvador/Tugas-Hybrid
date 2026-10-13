import { useState } from "react";
import InputField from "../components/InputField";
import Logo from "../components/Logo";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("student");
  const [password, setPassword] = useState("12345");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const userBersih = username.trim().toLowerCase();
      const userValid = userBersih === "student" || userBersih === "imanuel" || userBersih === "scholar.turner@edulearn.edu";
      const passValid = password === "12345" || password === "LearningIsPower2025";

      if (userValid && passValid) {
        setError("");
        setLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess({
            name: "Imanuel Salvador",
            username: username,
            email: "student@edulearn.edu",
            avatar: "/assets/avatar.png"
          });
        }
      } else {
        setError("username atau password salah (coba: student / 12345)");
        setLoading(false);
      }
    }, 900);
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-background text-on-surface">
      <div>
        <nav className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-xl">
              school
            </span>
            <span className="font-headline font-bold text-sm tracking-tight text-primary">
              edulearn
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setUsername("student");
              setPassword("12345");
              setError("");
            }}
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            demo: student / 12345
          </button>
        </nav>

        <div className="mb-5 text-left">
          <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md inline-block mb-2">
            portal tugas mahasiswa
          </span>
          <h1 className="font-headline text-2xl font-bold text-on-surface tracking-tight">
            selamat datang kembali
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            masuk ke akun untuk melanjutkan tugas dan kelas
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error-container/70 border border-error/30 rounded-xl flex items-start gap-2 text-left">
            <span className="material-symbols-outlined text-error text-lg shrink-0 mt-0.5">
              error
            </span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-on-error-container">
                login gagal
              </p>
              <p className="text-xs text-error mt-0.5">
                {error}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-3.5">
          <InputField
            label="username / email"
            type="text"
            placeholder="masukkan username (student)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon="person"
            required
          />

          <InputField
            label="kata sandi"
            type={showPassword ? "text" : "password"}
            placeholder="masukkan password (12345)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="lock"
            required
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            }
          />

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded text-primary border-outline-variant"
              />
              <span className="text-xs text-on-surface-variant">
                ingat saya
              </span>
            </label>

            <button
              type="button"
              onClick={() => alert("link reset sudah dikirim ke email mahasiswa")}
              className="text-xs text-primary hover:underline"
            >
              lupa password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-2 bg-primary text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-70"
          >
            {loading ? (
              <span>memeriksa data...</span>
            ) : (
              <>
                <span>masuk sekarang</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/30"></div>
          </div>
          <div className="relative bg-background px-3 text-[10px] text-outline uppercase tracking-wider">
            atau coba akses cepat
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setUsername("student");
              setPassword("12345");
              handleLogin();
            }}
            className="h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center gap-1.5 text-xs text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-primary text-base">verified</span>
            <span>login otomatis</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onLoginSuccess) {
                onLoginSuccess({
                  name: "Mahasiswa Tamu",
                  username: "tamu",
                  email: "tamu@edulearn.edu",
                  avatar: "/assets/avatar.png"
                });
              }
            }}
            className="h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center gap-1.5 text-xs text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-secondary text-base">account_circle</span>
            <span>mode tamu</span>
          </button>
        </div>
      </div>

      <div className="text-center pt-3">
        <p className="text-[11px] text-on-surface-variant">
          belum punya akun?{" "}
          <button
            type="button"
            onClick={() => alert("silakan hubungi bagian akademik kampus")}
            className="font-bold text-primary hover:underline"
          >
            daftar mahasiswa
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;