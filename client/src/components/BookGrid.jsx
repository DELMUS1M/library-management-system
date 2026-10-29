import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

export default function BookGrid({ genreId, search, sortBy }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const params = new URLSearchParams();

        if (genreId) params.append('genreId', genreId);
        if (search) params.append('search', search);

        const response = await fetch(`${baseUrl}/books?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch books (Status: ${response.status})`);
        }

        const data = await response.json();
        const bookList = Array.isArray(data) ? data : data.data || [];

        if (isMounted) {
          setBooks(bookList);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'An error occurred while loading books.');
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, [genreId, search]);

  // Client-side sorting stretch feature
  const sortedBooks = [...books].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'author') {
      return a.author.localeCompare(b.author);
    } else if (sortBy === 'year') {
      return (b.publishedYr || 0) - (a.publishedYr || 0);
    }
    return 0;
  });

  // Loading skeleton UI (Stretch feature)
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 animate-pulse flex flex-col gap-3">
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-10 bg-slate-100 rounded mt-4"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-800 max-w-md mx-auto my-8">
        <div className="text-3xl mb-2">⚠️</div>
        <h3 className="text-lg font-bold">Unable to Load Catalog</h3>
        <p className="text-sm text-red-600 mt-1">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty State
  if (sortedBooks.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto my-8 shadow-sm">
        <div className="text-4xl mb-3">📖</div>
        <h3 className="text-xl font-bold text-slate-800">No Books Found</h3>
        <p className="text-slate-500 text-sm mt-2">
          We couldn't find any books matching your current search or genre filter. Try resetting your criteria.
        </p>
      </div>
    );
  }

  // Grid Rendering with key prop equal to book.id
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sortedBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
