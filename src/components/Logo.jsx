function Logo({ compact = false, showTagline = true }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "justify-start" : "justify-center"}`}>
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-md shadow-primary/20 shrink-0">
        <span className="material-symbols-outlined text-[24px]">
          school
        </span>
      </div>

      <div className="text-left">
        <div className="flex items-center gap-1.5">
          <h2 className="font-headline font-bold text-xl text-primary tracking-tight leading-tight">
            EduLearn
          </h2>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
            PRO
          </span>
        </div>
        {showTagline && (
          <span className="text-xs text-on-surface-variant block font-medium">
            Smart Education Platform
          </span>
        )}
      </div>
    </div>
  );
}

export default Logo;