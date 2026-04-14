import { getImageUrl, formatCurrency, formatRuntime } from "../api/tmdb";
import { MovieDetailSkeleton } from "./Skeleton";

const Badge = ({ children, color = "cinema" }) => {
  const colors = {
    cinema: "bg-cinema-500/20 text-cinema-300 border-cinema-500/30",
    blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    green: "bg-green-500/20 text-green-300 border-green-500/30",
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-body font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="font-body text-ink-400 text-xs uppercase tracking-wider">{label}</span>
    <span className="font-body text-ink-100 text-sm font-medium">{value || "N/A"}</span>
  </div>
);

const StatCard = ({ label, value, icon }) => (
  <div className="bg-ink-800/50 border border-ink-600/20 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-cinema-400">{icon}</span>
      <span className="font-body text-ink-400 text-xs uppercase tracking-wider">{label}</span>
    </div>
    <span className="font-body text-ink-50 text-base font-medium">{value}</span>
  </div>
);

const MovieDetailCard = ({ movie, loading, onBack }) => {
  if (loading) return (
    <div className="w-full max-w-4xl mx-auto mt-6 bg-ink-800/40 border border-ink-600/20 rounded-2xl p-6">
      <MovieDetailSkeleton />
    </div>
  );

  if (!movie) return null;

  const poster = getImageUrl(movie.poster_path, "w342");
  const backdrop = getImageUrl(movie.backdrop_path, "w780");
  const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
  const director = movie.credits?.director;
  const cast = movie.credits?.cast || [];
  const trailer = movie.videos?.find((v) => v.type === "Trailer" && v.site === "YouTube");
  const songs = movie.videos?.filter((v) => v.type === "Featurette" || v.name?.toLowerCase().includes("song") || v.name?.toLowerCase().includes("music")) || [];
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const genres = movie.genres || [];

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 fade-up stagger-1">

      {/* Backdrop header */}
      {backdrop && (
        <div className="relative h-48 rounded-t-2xl overflow-hidden">
          <img src={backdrop} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
          <button
            onClick={onBack}
            className="absolute top-4 left-4 bg-ink-900/70 hover:bg-ink-800 text-ink-200 
                       px-3 py-1.5 rounded-xl text-sm font-body flex items-center gap-1.5 
                       transition-all duration-200 backdrop-blur-sm border border-ink-600/30"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      )}

      <div className="bg-ink-800/60 border border-ink-600/20 rounded-b-2xl p-6 space-y-6">

        {/* Top section: poster + basic info */}
        <div className="flex gap-5">
          <div className="flex-shrink-0">
            {poster ? (
              <img src={poster} alt={movie.title} className="w-36 h-52 object-cover rounded-xl border border-ink-600/30 shadow-xl" />
            ) : (
              <div className="w-36 h-52 bg-ink-700 rounded-xl flex items-center justify-center text-ink-500">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-50 leading-tight">{movie.title}</h2>
              {movie.tagline && (
                <p className="font-body text-cinema-400 text-sm italic mt-1">"{movie.tagline}"</p>
              )}
            </div>

            {/* Genres */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <Badge key={g.id} color="cinema">{g.name}</Badge>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm font-body">
              <span className="flex items-center gap-1 text-cinema-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="font-medium text-ink-100">{rating}</span>
                <span className="text-ink-400 text-xs">/ 10</span>
              </span>
              <span className="text-ink-400">{year}</span>
              <span className="text-ink-400">{formatRuntime(movie.runtime)}</span>
            </div>

            {/* Director */}
            {director && (
              <div className="flex items-center gap-2 text-sm font-body">
                <span className="text-ink-400">Directed by</span>
                <span className="text-ink-100 font-medium">{director.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Story / Overview */}
        {movie.overview && (
          <div className="fade-up stagger-2">
            <h3 className="font-display text-base font-semibold text-cinema-300 mb-2">Story</h3>
            <p className="font-body text-ink-200 text-sm leading-relaxed">{movie.overview}</p>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 fade-up stagger-3">
          <StatCard
            label="Release Year"
            value={year}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
          />
          <StatCard
            label="Budget"
            value={formatCurrency(movie.budget)}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>}
          />
          <StatCard
            label="Box Office"
            value={formatCurrency(movie.revenue)}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>}
          />
          <StatCard
            label="Rating"
            value={`${rating} / 10`}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>}
          />
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="fade-up stagger-4">
            <h3 className="font-display text-base font-semibold text-cinema-300 mb-3">Cast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cast.slice(0, 8).map((actor) => {
                const photo = getImageUrl(actor.profile_path, "w185");
                return (
                  <div key={actor.id} className="flex items-center gap-2 bg-ink-700/40 rounded-xl p-2.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-ink-600 flex-shrink-0">
                      {photo ? (
                        <img src={photo} alt={actor.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-ink-400 text-xs font-body font-medium">
                          {actor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-body text-ink-100 text-xs font-medium truncate">{actor.name}</p>
                      <p className="font-body text-ink-400 text-xs truncate">{actor.character}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Trailer */}
        {trailer && (
          <div className="fade-up stagger-5">
            <h3 className="font-display text-base font-semibold text-cinema-300 mb-3">Trailer</h3>
            <div className="rounded-xl overflow-hidden bg-ink-900">
              <iframe
                width="100%"
                height="280"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              />
            </div>
          </div>
        )}

        {/* Songs/Music Videos */}
        {songs.length > 0 && (
          <div>
            <h3 className="font-display text-base font-semibold text-cinema-300 mb-3">
              Songs & Music ({songs.length})
            </h3>
            <div className="space-y-2">
              {songs.slice(0, 6).map((song) => (
                <a
                  key={song.id}
                  href={`https://www.youtube.com/watch?v=${song.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-ink-700/30 hover:bg-ink-700/60 
                             border border-ink-600/20 hover:border-cinema-500/30
                             rounded-xl p-3 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cinema-500/20 flex items-center justify-center text-cinema-400 flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <span className="font-body text-ink-200 text-sm group-hover:text-cinema-300 transition-colors truncate">
                    {song.name}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto flex-shrink-0 text-ink-500 group-hover:text-cinema-400">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {movie.recommendations?.length > 0 && (
          <div>
            <h3 className="font-display text-base font-semibold text-cinema-300 mb-3">You might also like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {movie.recommendations.slice(0, 4).map((rec) => {
                const recPoster = getImageUrl(rec.poster_path, "w185");
                const recYear = rec.release_date ? rec.release_date.split("-")[0] : "";
                return (
                  <div key={rec.id} className="bg-ink-800/40 border border-ink-600/20 rounded-xl overflow-hidden">
                    <div className="h-28 bg-ink-700 overflow-hidden">
                      {recPoster ? (
                        <img src={recPoster} alt={rec.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-ink-600 text-xs">No image</div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="font-body text-ink-100 text-xs font-medium truncate">{rec.title}</p>
                      <p className="font-body text-ink-400 text-xs">{recYear}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailCard;
