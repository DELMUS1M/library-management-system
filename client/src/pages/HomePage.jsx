import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BookGrid from '../components/BookGrid';

export default function HomePage() {
  const [selectedGenreId, setSelectedGenreId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [genres, setGenres] = useState([]);
  const [genresLoading, setGenresLoading] = useState(true);

  // Fetch genres for the genre filter dropdown
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/genres`);
        if (response.ok) {
          const data = await response.json();
          setGenres(Array.isArray(data) ? data : data.data || []);
        }
      } catch (err) {
        console.error('Failed to load genres:', err);
      } finally {
        setGenresLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Explore the Library Catalog
        </h1>
        <p className="mt-2 text-indigo-100 max-w-2xl text-base">
          Browse through our curated collection of books across various genres or search for your favorite authors and titles.
        </p>
      </div>

      {/* Controls Section: Search Bar, Genre Filter, Sort Control */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/2">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <div className="flex flex-wrap w-full md:w-auto items-center gap-3">
            {/* Genre Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label htmlFor="genre-select" className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Genre:
              </label>
              <select
                id="genre-select"
                value={selectedGenreId}
                onChange={(e) => setSelectedGenreId(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={genresLoading}
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="title">Title (A-Z)</option>
                <option value="author">Author (A-Z)</option>
                <option value="year">Published Year (Newest)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Book Grid Component */}
      <BookGrid
        genreId={selectedGenreId}
        search={searchQuery}
        sortBy={sortBy}
      />
    </div>
  );
}
