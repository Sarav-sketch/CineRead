# CineRead — Movie & Book Explorer
### React + Tailwind CSS + TMDB API + Google Books API

---

## Project Overview
CineRead ek full-featured web application hai jo movies aur books ke baare mein detailed information dikhata hai.

### Movie Features:
- Title, Year, Genre, Runtime
- Director & full Cast (with photos)
- Budget & Box Office collection
- Story / Overview
- YouTube Trailer embed
- Songs & Music videos
- Similar movie recommendations

### Book Features:
- Title, Author(s), Publisher
- Genre / Categories
- Published year & page count
- Full Summary
- Star rating
- "Who should read this" recommendation
- Google Books preview link

---

## Tech Stack
| Technology | Use |
|---|---|
| React 18 | Frontend framework |
| Tailwind CSS | Styling |
| TMDB API | Movie data (cast, genre, budget, trailer) |
| Google Books API | Book data (summary, author, genre) |
| Axios | HTTP requests |

---

## Step 1 — API Keys Kaise Milein

### TMDB API Key (FREE):
1. https://www.themoviedb.org/signup par account banao
2. Login karo → Settings → API → "Create" click karo
3. App type: "Personal" select karo
4. Form fill karo (simple details chahiye)
5. API Key (v3 auth) copy karo

### Google Books API Key (OPTIONAL - free tier mein bhi kaam karta hai):
1. https://console.cloud.google.com par jao
2. New project banao
3. "Books API" enable karo
4. Credentials → Create API Key
5. Key copy karo

---

## Step 2 — Project Setup

```bash
# 1. Is folder mein terminal kholo
cd movie-book-finder

# 2. Dependencies install karo
npm install

# 3. Tailwind install karo
npm install -D tailwindcss postcss autoprefixer

# 4. Axios install karo
npm install axios
```

---

## Step 3 — API Key Set Karo

`src/api/config.js` file kholo aur apni keys daalo:

```js
export const CONFIG = {
  TMDB_API_KEY: "apni_tmdb_key_yahan_daalo",
  GOOGLE_BOOKS_API_KEY: "apni_google_key_yahan_daalo",  // optional
  ...
};
```

---

## Step 4 — Project Run Karo

```bash
npm start
```

Browser mein `http://localhost:3000` khulega.

---

## Step 5 — Project Build (Deployment ke liye)

```bash
npm run build
```

`build/` folder banegi jise Netlify/Vercel pe deploy kar sakte ho.

---

## Project Structure

```
movie-book-finder/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── config.js       ← API keys yahan
│   │   ├── tmdb.js         ← TMDB API functions
│   │   ├── books.js        ← Google Books API functions
│   │   └── wikipedia.js    ← Wikipedia API functions
│   ├── components/
│   │   ├── SearchBar.jsx       ← Search input
│   │   ├── ModeToggle.jsx      ← Movie/Book toggle
│   │   ├── MovieResultsList.jsx ← Search results
│   │   ├── MovieDetailCard.jsx  ← Full movie info
│   │   ├── BookResultsList.jsx  ← Book search results
│   │   ├── BookDetailCard.jsx   ← Full book info
│   │   └── Skeleton.jsx         ← Loading placeholders
│   ├── hooks/
│   │   ├── useMovieSearch.js   ← Movie search logic
│   │   └── useBookSearch.js    ← Book search logic
│   ├── App.jsx             ← Main component
│   ├── index.js            ← Entry point
│   └── index.css           ← Global styles + Tailwind
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Possible Errors & Solutions

| Error | Solution |
|---|---|
| "Invalid API Key" | TMDB key galat hai — check karo config.js |
| "CORS Error" | Browser extension disable karo ya localhost use karo |
| "Cannot read properties of undefined" | API response empty hai — query check karo |
| Tailwind classes kaam nahi kar rahi | `tailwind.config.js` mein content path check karo |

---

## Deployment (Free)

### Netlify:
1. https://netlify.com par account banao
2. `npm run build` run karo
3. `build/` folder drag & drop karo

### Vercel:
1. https://vercel.com par account banao
2. GitHub se project import karo
3. Auto deploy ho jaata hai

---

## Made by
**[Saurabh Patel]**
3rd Year B.Tech — Web Development Project
