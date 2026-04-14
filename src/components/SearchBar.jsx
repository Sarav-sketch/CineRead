import { useState, useEffect } from "react";

const SearchBar = ({ mode, onSearch, loading, clearTrigger }) => {
  const [query, setQuery] = useState("");

  // Jab clearTrigger change ho, query clear ho jayegi
  useEffect(() => {
    setQuery("");
  }, [clearTrigger]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const placeholder =
    mode === "movie"
      ? "Search for a movie... e.g. Dangal, RRR, Inception"
      : "Search for a book... e.g. Harry Potter, Atomic Habits";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-ink-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-ink-800/60 border border-ink-600/40 text-ink-50 placeholder-ink-400 
                     rounded-2xl py-4 pl-12 pr-36 text-base outline-none 
                     focus:border-cinema-400/60 focus:bg-ink-800/80 transition-all duration-200
                     font-body"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 bg-cinema-500 hover:bg-cinema-400 disabled:bg-ink-700 
                     text-white px-5 py-2.5 rounded-xl font-body font-medium text-sm 
                     transition-all duration-200 disabled:cursor-not-allowed
                     hover:shadow-lg hover:shadow-cinema-500/20"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8V0" stroke="currentColor" strokeWidth="3" className="opacity-75" />
              </svg>
              Searching
            </span>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;