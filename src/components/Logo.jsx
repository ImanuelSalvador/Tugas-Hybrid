function Logo({ compact = false, showTagline = true }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "justify-start" : "justify-center"}`}>
      <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-sm shrink-0">
        <span className="material-symbols-outlined text-[22px]">
          school
        </span>
      </div>

      <div className="text-left">
        <div className="flex items-center gap-1.5">
          <h2 className="font-headline font-bold text-lg text-primary tracking-tight leading-tight">
            edulearn
          </h2>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
            app
          </span>
        </div>
        {showTagline && (
          <span className="text-xs text-on-surface-variant block font-normal">
            portal tugas mahasiswa
          </span>
        )}
      </div>
    </div>
  );
}

export default Logo;