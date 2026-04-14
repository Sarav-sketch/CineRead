import { getImageUrl } from "../api/tmdb";

const MovieResultCard = ({ movie, onClick }) => {
  const poster = getImageUrl(movie.poster_path, "w185");
  const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <button
      onClick={() => onClick(movie.id)}
      className="flex items-center gap-3 w-full bg-ink-800/40 hover:bg-ink-700/60 
                 border border-ink-600/20 hover:border-cinema-500/30
                 rounded-xl p-3 text-left transition-all duration-200 group"
    >
      <div className="w-10 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-ink-700">
        {poster ? (
          <img src={poster} alt={movie.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-500 text-xs">?</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-medium text-ink-50 text-sm truncate group-hover:text-cinema-300 transition-colors">
          {movie.title}
        </p>
        <p className="font-body text-ink-400 text-xs mt-0.5">{year}</p>
      </div>
      <div className="flex items-center gap-1 text-cinema-400 flex-shrink-0">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <span className="text-xs font-body font-medium">{rating}</span>
      </div>
    </button>
  );
};

const MovieResultsList = ({ results, onSelect, loading }) => {
  if (!results.length) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <p className="font-body text-ink-400 text-xs mb-2 px-1">
        {results.length} result{results.length !== 1 ? "s" : ""} found — select to view details
      </p>
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {results.map((movie) => (
          <MovieResultCard key={movie.id} movie={movie} onClick={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default MovieResultsList;
