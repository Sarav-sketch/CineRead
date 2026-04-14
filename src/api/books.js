import axios from "axios";
import { CONFIG } from "./config";

const booksApi = axios.create({ baseURL: CONFIG.GOOGLE_BOOKS_BASE });

// Search books by title/author
export const searchBooks = async (query) => {
  const params = { q: query, maxResults: 10, printType: "books" };
  if (CONFIG.GOOGLE_BOOKS_API_KEY !== "YOUR_GOOGLE_BOOKS_KEY") {
    params.key = CONFIG.GOOGLE_BOOKS_API_KEY;
  }
  const res = await booksApi.get("/volumes", { params });
  return res.data.items || [];
};

// Get detailed book info by volume ID
export const getBookDetails = async (volumeId) => {
  const params = {};
  if (CONFIG.GOOGLE_BOOKS_API_KEY !== "YOUR_GOOGLE_BOOKS_KEY") {
    params.key = CONFIG.GOOGLE_BOOKS_API_KEY;
  }
  const res = await booksApi.get(`/volumes/${volumeId}`, { params });
  return res.data;
};

// Parse and clean book data from Google Books response
export const parseBookData = (item) => {
  const info = item.volumeInfo;
  return {
    id: item.id,
    title: info.title || "Unknown Title",
    subtitle: info.subtitle || "",
    authors: info.authors || ["Unknown Author"],
    publisher: info.publisher || "Unknown Publisher",
    publishedDate: info.publishedDate || "Unknown",
    description: info.description
      ? stripHtml(info.description)
      : "No description available.",
    pageCount: info.pageCount || null,
    categories: info.categories || [],
    averageRating: info.averageRating || null,
    ratingsCount: info.ratingsCount || 0,
    language: info.language || "en",
    previewLink: info.previewLink || null,
    infoLink: info.infoLink || null,
    thumbnail:
      info.imageLinks?.thumbnail?.replace("http://", "https://") ||
      info.imageLinks?.smallThumbnail?.replace("http://", "https://") ||
      null,
    isbn:
      info.industryIdentifiers?.find((i) => i.type === "ISBN_13")?.identifier ||
      null,
    maturityRating: info.maturityRating || null,
  };
};

// Strip HTML tags from description
const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
};

// Generate "Who should read" based on categories & description
export const generateReadingRecommendation = (bookData) => {
  const cats = bookData.categories.join(" ").toLowerCase();
  const desc = bookData.description.toLowerCase();

  const recommendations = [];

  if (cats.includes("fiction") || cats.includes("novel")) {
    recommendations.push("Fiction lovers");
  }
  if (cats.includes("science") || desc.includes("science")) {
    recommendations.push("Science enthusiasts");
  }
  if (cats.includes("history") || desc.includes("history")) {
    recommendations.push("History buffs");
  }
  if (cats.includes("self-help") || cats.includes("personal") || desc.includes("self-improvement")) {
    recommendations.push("People seeking personal growth");
  }
  if (cats.includes("business") || cats.includes("economics")) {
    recommendations.push("Business & finance students");
  }
  if (cats.includes("philosophy") || desc.includes("philosophy")) {
    recommendations.push("Philosophy enthusiasts");
  }
  if (cats.includes("romance") || desc.includes("love story")) {
    recommendations.push("Romance readers");
  }
  if (cats.includes("mystery") || cats.includes("thriller") || desc.includes("thriller")) {
    recommendations.push("Thriller & mystery fans");
  }
  if (cats.includes("young adult") || cats.includes("juvenile")) {
    recommendations.push("Young adults & teens");
  }
  if (cats.includes("biography") || desc.includes("biography") || desc.includes("memoir")) {
    recommendations.push("Biography & memoir readers");
  }

  if (recommendations.length === 0) {
    recommendations.push("General readers", "Book club members");
  }

  return recommendations.slice(0, 3);
};
