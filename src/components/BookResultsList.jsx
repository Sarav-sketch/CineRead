const BookResultCard = ({ book, onClick }) => {
  const year = book.publishedDate ? book.publishedDate.split("-")[0] : "N/A";
  const author = book.authors?.[0] || "Unknown Author";

  return (
    <button
      onClick={() => onClick(book)}
      className="flex items-center gap-3 w-full bg-ink-800/40 hover:bg-ink-700/60 
                 border border-ink-600/20 hover:border-ink-400/40
                 rounded-xl p-3 text-left transition-all duration-200 group"
    >
      <div className="w-10 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-ink-700">
        {book.thumbnail ? (
          <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-medium text-ink-50 text-sm truncate group-hover:text-ink-200 transition-colors">
          {book.title}
        </p>
        <p className="font-body text-ink-400 text-xs mt-0.5">
          {author} · {year}
        </p>
      </div>
      {book.averageRating && (
        <div className="flex items-center gap-1 text-ink-400 flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-xs font-body">{book.averageRating}</span>
        </div>
      )}
    </button>
  );
};

const BookResultsList = ({ results, onSelect }) => {
  if (!results.length) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <p className="font-body text-ink-400 text-xs mb-2 px-1">
        {results.length} result{results.length !== 1 ? "s" : ""} found — select to view details
      </p>
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {results.map((book) => (
          <BookResultCard key={book.id} book={book} onClick={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default BookResultsList;
