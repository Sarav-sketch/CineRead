import { useState } from "react";
import "./index.css";
import ModeToggle from "./components/ModeToggle";
import SearchBar from "./components/SearchBar";
import MovieResultsList from "./components/MovieResultsList";
import MovieDetailCard from "./components/MovieDetailCard";
import BookResultsList from "./components/BookResultsList";
import BookDetailCard from "./components/BookDetailCard";
import { useMovieSearch } from "./hooks/useMovieSearch";
import { useBookSearch } from "./hooks/useBookSearch";

const App = () => {
  const [mode, setMode] = useState("movie");
  const [clearTrigger, setClearTrigger] = useState(0);

  const {
    results: movieResults,
    selectedMovie,
    loading: movieLoading,
    detailLoading: movieDetailLoading,
    error: movieError,
    search: searchMovies,
    loadMovieDetails,
    clearSelection: clearMovie,
    clearAll: clearAllMovies,
  } = useMovieSearch();

  const {
    results: bookResults,
    selectedBook,
    loading: bookLoading,
    detailLoading: bookDetailLoading,
    error: bookError,
    search: searchBooks,
    selectBookFromResult,
    clearAll: clearAllBooks,
  } = useBookSearch();

  // Home button — sab clear + search bar bhi clear
  const handleHome = () => {
    clearAllMovies();
    clearAllBooks();
    setClearTrigger((n) => n + 1);
  };

  const handleModeChange = (newMode) => setMode(newMode);

  const handleSearch = (query) => {
    if (mode === "movie") searchMovies(query);
    else searchBooks(query);
  };

  const isLoading = mode === "movie" ? movieLoading : bookLoading;
  const error = mode === "movie" ? movieError : bookError;

  const hasMovieDetail = mode === "movie" && selectedMovie;
  const hasBookDetail = mode === "book" && selectedBook;
  const hasMovieResults = mode === "movie" && movieResults.length > 0 && !selectedMovie;
  const hasBookResults = mode === "book" && bookResults.length > 0 && !selectedBook;

  const isHomePage =
    !isLoading && !error &&
    !movieResults.length && !bookResults.length &&
    !selectedMovie && !selectedBook;

  return (
    <div className="min-h-screen bg-ink-900">
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(180,115,30,0.06) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(66,103,129,0.08) 0%, transparent 50%)`
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <header className="text-center mb-10 fade-up stagger-1">
          <h1 className="font-display text-5xl font-bold text-ink-50 leading-tight mb-3">
            Cine<span className="text-cinema-400">Read</span>
          </h1>
          <p className="font-body text-ink-400 text-base">
            Discover movies &amp; books — powered by TMDB &amp; Google Books
          </p>
        </header>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-7 fade-up stagger-2">
          <ModeToggle mode={mode} onChange={handleModeChange} />
        </div>

        {/* Search Bar + Home Button */}
        <div className="fade-up stagger-3 flex items-center gap-3 max-w-2xl mx-auto">
          <div className="flex-1">
            <SearchBar
              mode={mode}
              onSearch={handleSearch}
              loading={isLoading}
              clearTrigger={clearTrigger}
            />
          </div>

          {/* Home Button */}
          <button
            onClick={handleHome}
            title="Go to Home"
            className="flex-shrink-0 flex items-center gap-2 bg-ink-800/60 hover:bg-ink-700/80
                       border border-ink-600/30 hover:border-ink-500/50
                       text-ink-300 hover:text-ink-100
                       px-4 py-4 rounded-2xl font-body text-sm font-medium
                       transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="w-full max-w-2xl mx-auto mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="font-body text-red-300 text-sm text-center">{error}</p>
          </div>
        )}

        {hasMovieResults && <MovieResultsList results={movieResults} onSelect={loadMovieDetails} loading={movieDetailLoading} />}
        {hasBookResults && <BookResultsList results={bookResults} onSelect={selectBookFromResult} />}

        {(hasMovieDetail || (mode === "movie" && movieDetailLoading)) && (
          <MovieDetailCard movie={selectedMovie} loading={movieDetailLoading} onBack={clearMovie} />
        )}
        {(hasBookDetail || (mode === "book" && bookDetailLoading)) && (
          <BookDetailCard book={selectedBook} loading={bookDetailLoading} onBack={() => {}} />
        )}

        {/* Home / Landing page */}
        {isHomePage && (
          <div className="fade-up stagger-4">

            {/* Quick suggestions */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-ink-800/60 border border-ink-600/20 mb-5">
                {mode === "movie" ? (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#627d98" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" />
                    <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" />
                    <line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" />
                  </svg>
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#627d98" strokeWidth="1.5">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                  </svg>
                )}
              </div>
              <p className="font-body text-ink-400 text-sm mb-4">
                {mode === "movie"
                  ? "Search for any movie to see cast, genre, director, budget & trailer"
                  : "Search for any book to see author, summary, genre & more"}
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                {mode === "movie"
                  ? ["Dangal", "RRR", "Inception", "3 Idiots", "Interstellar"].map((s) => (
                      <button key={s} onClick={() => searchMovies(s)}
                        className="font-body text-ink-400 hover:text-ink-200 text-xs bg-ink-800/40 hover:bg-ink-700/60 border border-ink-600/20 px-3 py-1.5 rounded-full transition-all duration-200">
                        {s}
                      </button>
                    ))
                  : ["Harry Potter", "Atomic Habits", "1984", "Alchemist", "Ikigai"].map((s) => (
                      <button key={s} onClick={() => searchBooks(s)}
                        className="font-body text-ink-400 hover:text-ink-200 text-xs bg-ink-800/40 hover:bg-ink-700/60 border border-ink-600/20 px-3 py-1.5 rounded-full transition-all duration-200">
                        {s}
                      </button>
                    ))}
              </div>
            </div>

            {/* About Section */}
            <div className="mt-24 space-y-16">

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-ink-700/60" />
                <span className="font-body text-ink-500 text-xs uppercase tracking-widest">About CineRead</span>
                <div className="flex-1 h-px bg-ink-700/60" />
              </div>

              <div className="text-center max-w-2xl mx-auto">
                <h2 className="font-display text-3xl font-semibold text-ink-100 mb-4">
                  Your one-stop explorer for <span className="text-cinema-400">Movies</span> &amp; <span className="text-ink-300">Books</span>
                </h2>
                <p className="font-body text-ink-400 text-base leading-relaxed">
                  CineRead lets you instantly discover detailed information about any movie or book.
                  Just type a name and get everything — cast, genre, director, budget, trailer, story summary,
                  author details, reading recommendations and much more.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-ink-800/40 border border-ink-600/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-cinema-500/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4933a" strokeWidth="1.8">
                        <rect x="2" y="2" width="20" height="20" rx="2.18" />
                        <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                      </svg>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-cinema-300">Movie Explorer</h3>
                  </div>
                  <ul className="space-y-3">
                    {["Genre, Release Year & Runtime","Director & full Cast with photos","Budget & Box Office collection","Story / Plot overview","YouTube Trailer embedded","Songs & Music videos","Similar movie recommendations"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-cinema-500/30 flex items-center justify-center flex-shrink-0">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#d4933a" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span className="font-body text-ink-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-ink-800/40 border border-ink-600/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-ink-500/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9fb3c8" strokeWidth="1.8">
                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                      </svg>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-ink-300">Book Explorer</h3>
                  </div>
                  <ul className="space-y-3">
                    {["Author(s) & Publisher details","Genre & Categories","Published year & Page count","Full story summary","Star ratings & reviews count","Who should read this book","Google Books preview link"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-ink-500/30 flex items-center justify-center flex-shrink-0">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#9fb3c8" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span className="font-body text-ink-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="text-center">
                <p className="font-body text-ink-500 text-xs uppercase tracking-widest mb-5">Powered by</p>
                <div className="flex justify-center gap-4 flex-wrap">
                  {[
                    { name: "React 18", color: "bg-blue-500/10 border-blue-500/20 text-blue-300" },
                    { name: "Tailwind CSS", color: "bg-teal-500/10 border-teal-500/20 text-teal-300" },
                    { name: "TMDB API", color: "bg-cinema-500/10 border-cinema-500/20 text-cinema-300" },
                    { name: "Google Books API", color: "bg-green-500/10 border-green-500/20 text-green-300" },
                  ].map((tech) => (
                    <span key={tech.name} className={`font-body text-sm px-4 py-2 rounded-full border font-medium ${tech.color}`}>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to use */}
              <div className="bg-ink-800/30 border border-ink-600/20 rounded-2xl p-7">
                <h3 className="font-display text-xl font-semibold text-ink-100 mb-6 text-center">How to use</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {[
                    { step: "1", title: "Choose Mode", desc: "Select Movie or Book mode from the toggle at the top" },
                    { step: "2", title: "Search", desc: "Type any movie name or book title and press Search" },
                    { step: "3", title: "Explore", desc: "Click on any result to see complete details, cast, trailer and more" },
                  ].map((item) => (
                    <div key={item.step} className="text-center">
                      <div className="w-10 h-10 rounded-full bg-cinema-500/20 border border-cinema-500/30 flex items-center justify-center mx-auto mb-3">
                        <span className="font-display font-bold text-cinema-400">{item.step}</span>
                      </div>
                      <h4 className="font-body font-medium text-ink-100 text-sm mb-1">{item.title}</h4>
                      <p className="font-body text-ink-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;