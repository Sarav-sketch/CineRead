import { useState, useCallback } from "react";
import {
  searchMovie,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMovieRecommendations,
} from "../api/tmdb";

export const useMovieSearch = () => {
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSelectedMovie(null);
    try {
      const movies = await searchMovie(query);
      setResults(movies.slice(0, 8));
      if (movies.length === 1) {
        await loadMovieDetails(movies[0].id);
      }
    } catch (err) {
      setError("Could not fetch movies. Check your TMDB API key.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMovieDetails = useCallback(async (movieId) => {
    setDetailLoading(true);
    setError(null);
    try {
      const [details, credits, videos, recommendations] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
        getMovieVideos(movieId),
        getMovieRecommendations(movieId),
      ]);
      setSelectedMovie({ ...details, credits, videos, recommendations });
    } catch (err) {
      setError("Could not load movie details.");
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const clearSelection = () => setSelectedMovie(null);
  const clearAll = () => {
    setSelectedMovie(null);
    setResults([]);
    setError(null);
  };

  return {
    results,
    selectedMovie,
    loading,
    detailLoading,
    error,
    search,
    loadMovieDetails,
    clearSelection,
    clearAll,
  };
};