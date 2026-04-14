const ModeToggle = ({ mode, onChange }) => {
  return (
    <div className="flex items-center bg-ink-800/60 border border-ink-600/30 rounded-2xl p-1 gap-1">
      <button
        onClick={() => onChange("movie")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-medium text-sm transition-all duration-200 ${
          mode === "movie"
            ? "bg-cinema-500 text-white shadow-lg shadow-cinema-500/20"
            : "text-ink-300 hover:text-ink-100"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="17" x2="22" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
        </svg>
        Movies
      </button>

      <button
        onClick={() => onChange("book")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-medium text-sm transition-all duration-200 ${
          mode === "book"
            ? "bg-ink-500 text-white shadow-lg shadow-ink-500/20"
            : "text-ink-300 hover:text-ink-100"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
        Books
      </button>
    </div>
  );
};

export default ModeToggle;
