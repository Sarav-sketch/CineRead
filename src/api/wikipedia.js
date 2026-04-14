import axios from "axios";
import { CONFIG } from "./config";

const wiki = axios.create({ baseURL: CONFIG.WIKI_BASE });

// Get Wikipedia summary for any topic
export const getWikiSummary = async (title) => {
  try {
    const encoded = encodeURIComponent(title.replace(/ /g, "_"));
    const res = await wiki.get(`/page/summary/${encoded}`);
    return res.data;
  } catch {
    return null;
  }
};

// Search Wikipedia for movie/book (returns list of results)
export const searchWiki = async (query) => {
  try {
    const res = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "opensearch",
        search: query,
        limit: 5,
        format: "json",
        origin: "*",
      },
    });
    return res.data[1] || [];
  } catch {
    return [];
  }
};
