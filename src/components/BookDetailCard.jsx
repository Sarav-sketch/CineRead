import { MovieDetailSkeleton } from "./Skeleton";

const Badge = ({ children }) => (
  <span className="inline-block px-3 py-1 rounded-full text-xs font-body font-medium bg-ink-500/30 text-ink-200 border border-ink-500/30">
    {children}
  </span>
);

const InfoCard = ({ label, value, icon }) => (
  <div className="bg-ink-800/50 border border-ink-600/20 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-ink-400">{icon}</span>
      <span className="font-body text-ink-400 text-xs uppercase tracking-wider">{label}</span>
    </div>
    <span className="font-body text-ink-50 text-sm font-medium">{value || "N/A"}</span>
  </div>
);

const StarRating = ({ rating, count }) => {
  const stars = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} width="14" height="14" viewBox="0 0 24 24"
            fill={s <= stars ? "#d4933a" : "none"}
            stroke={s <= stars ? "#d4933a" : "#486581"} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <span className="font-body text-ink-200 text-sm font-medium">{rating}</span>
      {count > 0 && <span className="font-body text-ink-400 text-xs">({count.toLocaleString()} ratings)</span>}
    </div>
  );
};

const BookDetailCard = ({ book, loading, onBack }) => {
  if (loading) return (
    <div className="w-full max-w-4xl mx-auto mt-6 bg-ink-800/40 border border-ink-600/20 rounded-2xl p-6">
      <MovieDetailSkeleton />
    </div>
  );

  if (!book) return null;

  const year = book.publishedDate ? book.publishedDate.split("-")[0] : "N/A";
  const authors = book.authors?.join(", ") || "Unknown Author";

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 fade-up stagger-1">
      {/* Header bar */}
      <div className="bg-ink-700/40 border border-ink-600/20 rounded-t-2xl px-5 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-ink-300 hover:text-ink-100 text-sm font-body transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to results
        </button>
        {book.previewLink && (
          <a
            href={book.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-body text-ink-400 hover:text-ink-200 flex items-center gap-1 transition-colors"
          >
            Preview on Google Books
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>

      <div className="bg-ink-800/60 border border-t-0 border-ink-600/20 rounded-b-2xl p-6 space-y-6">

        {/* Top section */}
        <div className="flex gap-5">
          {/* Book cover */}
          <div className="flex-shrink-0">
            {book.thumbnail ? (
              <img
                src={book.thumbnail.replace("zoom=1", "zoom=2")}
                alt={book.title}
                className="w-32 h-48 object-cover rounded-xl border border-ink-600/30 shadow-xl"
              />
            ) : (
              <div className="w-32 h-48 bg-ink-700 rounded-xl flex flex-col items-center justify-center text-ink-500 gap-2 border border-ink-600/20">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
                <span className="text-xs">No cover</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-50 leading-tight">{book.title}</h2>
              {book.subtitle && (
                <p className="font-body text-ink-300 text-sm mt-1 italic">{book.subtitle}</p>
              )}
            </div>

            <p className="font-body text-ink-300 text-sm">by <span className="font-medium text-ink-100">{authors}</span></p>

            {/* Genres/Categories */}
            {book.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {book.categories.map((cat, i) => (
                  <Badge key={i}>{cat}</Badge>
                ))}
              </div>
            )}

            {book.averageRating && (
              <StarRating rating={book.averageRating} count={book.ratingsCount} />
            )}
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 fade-up stagger-2">
          <InfoCard
            label="Published"
            value={year}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
          />
          <InfoCard
            label="Publisher"
            value={book.publisher}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>}
          />
          <InfoCard
            label="Pages"
            value={book.pageCount ? `${book.pageCount} pages` : "N/A"}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>}
          />
          <InfoCard
            label="Language"
            value={book.language?.toUpperCase() || "EN"}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>}
          />
        </div>

        {/* Summary */}
        {book.description && (
          <div className="fade-up stagger-3">
            <h3 className="font-display text-base font-semibold text-ink-300 mb-2">Summary</h3>
            <p className="font-body text-ink-200 text-sm leading-relaxed line-clamp-6">
              {book.description}
            </p>
          </div>
        )}

        {/* Who should read */}
        {book.readingFor?.length > 0 && (
          <div className="fade-up stagger-4 bg-ink-700/30 border border-ink-600/20 rounded-xl p-4">
            <h3 className="font-display text-base font-semibold text-ink-300 mb-3">
              Who should read this?
            </h3>
            <div className="space-y-2">
              {book.readingFor.map((rec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-ink-500/40 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-body text-ink-200 text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Author info */}
        <div className="fade-up stagger-5">
          <h3 className="font-display text-base font-semibold text-ink-300 mb-3">Author(s)</h3>
          <div className="flex flex-wrap gap-3">
            {(book.authors || ["Unknown"]).map((author, i) => (
              <div key={i} className="flex items-center gap-2 bg-ink-700/40 border border-ink-600/20 rounded-xl px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-ink-600 flex items-center justify-center text-ink-300 text-sm font-body font-medium">
                  {author.charAt(0)}
                </div>
                <span className="font-body text-ink-100 text-sm">{author}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ISBN */}
        {book.isbn && (
          <div className="text-center">
            <span className="font-mono text-ink-500 text-xs">ISBN: {book.isbn}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetailCard;
