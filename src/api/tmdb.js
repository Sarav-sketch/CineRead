import axios from "axios";
import { CONFIG } from "./config";

const tmdb = axios.create({
  baseURL: CONFIG.TMDB_BASE_URL,
  params: { api_key: CONFIG.TMDB_API_KEY, language: "en-US" },
});

// Search for a movie by name
export const searchMovie = async (query) => {
  const res = await tmdb.get("/search/movie", { params: { query, page: 1 } });
  return res.data.results;
};

// Get full movie details: genres, budget, revenue, runtime
export const getMovieDetails = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}`);
  return res.data;
};

// Get movie credits: director, cast
export const getMovieCredits = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}/credits`);
  const director = res.data.crew.find((p) => p.job === "Director");
  const cast = res.data.cast.slice(0, 8);
  return { director, cast };
};

// Get movie videos: trailer, songs
export const getMovieVideos = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}/videos`);
  return res.data.results;
};

// Get movie recommendations
export const getMovieRecommendations = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}/recommendations`);
  return res.data.results.slice(0, 4);
};

// Get movie images (backdrops/posters)
export const getMovieImages = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}/images`);
  return res.data;
};

// Build full image URL
export const getImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `${CONFIG.TMDB_IMAGE_BASE}/${size}${path}`;
};

// Format currency
export const formatCurrency = (amount) => {
  if (!amount || amount === 0) return "Not disclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
};

// Format runtime
export const formatRuntime = (minutes) => {
  if (!minutes) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};
