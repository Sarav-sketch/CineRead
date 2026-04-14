# CineRead — Movie & Book Explorer

## About This Project

I built CineRead as my 3rd year web development project. The idea was simple — I wanted to create one place where anyone can search for a movie or a book and get all the important details instantly, without visiting multiple websites.

______________________________________________________________________________________________________________________________
<img width="1457" height="825" alt="image" src="https://github.com/user-attachments/assets/1f564231-01a4-41dd-b087-2a08ebb7bdca" />
<img width="1472" height="826" alt="image" src="https://github.com/user-attachments/assets/42e59c53-1935-4b8c-b47a-191092ef731b" />
<img width="1293" height="826" alt="image" src="https://github.com/user-attachments/assets/61a446d1-22f3-4433-8865-ca745ae32cc6" />




______________________________________________________________________________________________________________________________

## What It Does

**For Movies**, you can search any movie and see:
- Genre, release year and runtime
- Director and full cast with photos
- Budget and box office collection
- Story overview
- YouTube trailer
- Songs and music videos
- Similar movie recommendations

**For Books**, you can search any book and see:
- Author and publisher
- Genre and categories
- Published year and page count
- Full summary
- Star ratings
- Who should read this book

## Technologies I Used

- **React 18** — I used React because it makes building interactive UIs much easier with components and state management
- **Tailwind CSS** — for styling the app quickly without writing too much custom CSS
- **TMDB API** — to fetch all movie related data like cast, budget, trailer and genres
- **Google Books API** — to fetch book information like author, summary and categories
- **Axios** — to make API calls cleanly

## Challenges I Faced

- Understanding how to call multiple APIs at the same time and combine their data
- Parsing the API responses and displaying only the useful information
- Making the UI look good on different screen sizes
- Handling loading states and errors when API calls fail

## What I Learned

- How to work with real world REST APIs
- How React hooks like useState and useEffect work in practice
- How to structure a React project with components, hooks and API files separately
- How to deploy a web app live using Netlify

## How to Run Locally

```bash
npm install
npm start
```

Add your TMDB API key in `src/api/config.js` before running.

## Live Demo
(https://cineplusbook.netlify.app/)

## Made By
**Saurabh Patel**
3rd Year B.Tech — Web Development Project
