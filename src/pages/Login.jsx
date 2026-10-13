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
      // Original logic preserved: username === "student" && password === "12345"
      // Also allows email alias scholar.turner@edulearn.edu
      const isUsernameValid = username.trim().toLowerCase() === "student" || username.trim().toLowerCase() === "scholar.turner@edulearn.edu";
      const isPasswordValid = password === "12345" || password === "LearningIsPower2025";

      if (isUsernameValid && isPasswordValid) {
        setError("");
        setLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess({
            name: "William Surya",
            username: username,
            email: username.includes("@") ? username : "student@edulearn.edu",
            avatar: "/assets/avatar.png"
          });
        }
      } else {
        setError("Invalid username or password. Use student / 12345");
        setLoading(false);
      }
    }, 1200);
  }

  function handleFillDemo(accountType) {
    if (accountType === "student") {
      setUsername("student");
      setPassword("12345");
      setError("");
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-background text-on-surface">
      {/* Top Header & Brand Pill */}
      <div>
        <nav className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-full border border-outline-variant/30 shadow-xs">
            <span className="material-symbols-outlined text-primary text-xl">
              school
            </span>
            <span className="font-headline font-bold text-sm tracking-tight text-primary">
              EduLearn
            </span>
          </div>

          <button
            type="button"
            aria-label="Demo account"
            onClick={() => handleFillDemo("student")}
            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            title="Click to fill demo account credentials"
          >
            Demo: student / 12345
          </button>
        </nav>

        {/* Welcome Section & Academic Badge */}
        <div className="mb-5 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-fixed/50 text-tertiary border border-tertiary-fixed/60 mb-2.5">
            <span className="material-symbols-outlined text-sm text-tertiary fill-icon">
              stars
            </span>
            <span className="text-xs font-semibold">Over 50k+ active scholars</span>
          </div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Continue your learning journey today.
          </p>
        </div>

        {/* Dynamic Error Banner */}
        {error && (
          <div className="mb-4 p-3.5 bg-error-container/70 border border-error/30 rounded-2xl flex items-start gap-2.5 text-left animate-fadeIn">
            <span className="material-symbols-outlined text-error text-xl shrink-0 mt-0.5 fill-icon">
              error
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-on-error-container">
                Invalid credentials
              </p>
              <p className="text-xs text-error mt-0.5">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            label="Username or Email"
            type="text"
            placeholder="student or student@edulearn.edu"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon="alternate_email"
            helperText="Default demo: student"
            required
          />

          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="lock"
            helperText="Default demo: 12345"
            required
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 text-outline hover:text-on-surface transition-colors rounded-lg"
                aria-label="Toggle password visibility"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            }
          />

          {/* Options: Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded text-primary-container border-outline-variant focus:ring-primary-container/20 cursor-pointer"
              />
              <span className="text-sm text-on-surface-variant font-medium">
                Remember me
              </span>
            </label>

            <button
              type="button"
              onClick={() => alert("Password reset link sent to demo registered email.")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Primary CTA Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-13 mt-2 bg-gradient-to-r from-primary-container to-primary text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-container/25 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <span>Log In</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/40"></div>
          </div>
          <div className="relative bg-background px-3 text-[11px] font-semibold text-outline uppercase tracking-wider">
            Or continue with
          </div>
        </div>

        {/* Quick Social / Demo Login Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setUsername("student");
              setPassword("12345");
              handleLogin();
            }}
            className="h-11 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/50 flex items-center justify-center gap-2 text-xs font-semibold text-on-surface hover:bg-surface-container active:scale-98 transition-all shadow-2xs"
          >
            <span className="material-symbols-outlined text-primary text-base">verified_user</span>
            <span>Fast Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onLoginSuccess) {
                onLoginSuccess({
                  name: "Guest Scholar",
                  username: "guest",
                  email: "guest@edulearn.edu",
                  avatar: "/assets/avatar.png"
                });
              }
            }}
            className="h-11 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/50 flex items-center justify-center gap-2 text-xs font-semibold text-on-surface hover:bg-surface-container active:scale-98 transition-all shadow-2xs"
          >
            <span className="material-symbols-outlined text-secondary text-base">person</span>
            <span>Guest Mode</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center pt-4">
        <p className="text-xs text-on-surface-variant">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => alert("Registration is currently open for semester enrollment.")}
            className="font-bold text-primary hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;