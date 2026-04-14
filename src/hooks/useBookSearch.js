import { useState, useCallback } from "react";
import { searchBooks, getBookDetails, parseBookData, generateReadingRecommendation } from "../api/books";

export const useBookSearch = () => {
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSelectedBook(null);
    try {
      const items = await searchBooks(query);
      if (!items.length) {
        setError("No books found. Try a different title or author.");
        setResults([]);
        return;
      }
      const parsed = items.map(parseBookData);
      setResults(parsed);
      if (parsed.length === 1) {
        await loadBookDetails(items[0].id);
      }
    } catch (err) {
      setError("Could not fetch books. Check your API key.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadBookDetails = useCallback(async (volumeId) => {
    setDetailLoading(true);
    try {
      const detail = await getBookDetails(volumeId);
      const parsed = parseBookData(detail);
      const readingFor = generateReadingRecommendation(parsed);
      setSelectedBook({ ...parsed, readingFor });
    } catch {
      setError("Could not load book details.");
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const selectBookFromResult = useCallback((book) => {
    const readingFor = generateReadingRecommendation(book);
    setSelectedBook({ ...book, readingFor });
  }, []);

  const clearAll = () => { setSelectedBook(null); setResults([]); setError(null); };

  return {
    results,
    selectedBook,
    loading,
    detailLoading,
    error,
    search,
    loadBookDetails,
    selectBookFromResult,
    clearAll,
  };
};
