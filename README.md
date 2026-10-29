# Library Management System - Catalog & Search Client

This repository section contains the patron-facing frontend for browsing and searching the Library Catalog built with React, React Router v6, Tailwind CSS, and Vite.

## Verified Checked Files
- `client/src/main.jsx` - Wraps `<App />` in `<BrowserRouter>`
- `client/src/App.jsx` - Defines routes for `'/'` and `'/books/:id'`
- `client/src/pages/HomePage.jsx` - Renders `BookGrid`, `SearchBar`, and a genre filter holding shared state
- `client/src/components/BookGrid.jsx` - Fetches `GET /books` with `genreId`/`search` query params, handles loading/error/empty states
- `client/src/components/BookCard.jsx` - Renders one book with key prop equal to book id
- `client/src/components/SearchBar.jsx` - Debounces input before calling `onSearch`
- `client/src/pages/BookDetail.jsx` - Reads `id` from `useParams()` and fetches `GET /books/:id`
- `client/.env` - Defines `VITE_API_URL`

## Running the Frontend
```bash
cd client
npm install
npm run dev
```
