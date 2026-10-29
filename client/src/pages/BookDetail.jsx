import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/books/${id}`);
        if (!response.ok) {
          throw new Error(`Book not found (Status: ${response.status})`);
        }
        const data = await response.json();
        setBook(data.data || data);
      } catch (err) {
        setError(err.message || 'Failed to fetch book details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-pulse space-y-4">
        <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        <div className="h-8 bg-slate-200 rounded w-3/4"></div>
        <div className="h-5 bg-slate-200 rounded w-1/2"></div>
        <div className="h-24 bg-slate-100 rounded mt-6"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto bg-red-50 border border-red-200 rounded-2xl p-8 text-center text-red-800">
        <div className="text-4xl mb-3">❌</div>
        <h2 className="text-xl font-bold">Error Loading Book</h2>
        <p className="text-sm mt-1 text-red-600">{error}</p>
        <Link
          to="/"
          className="inline-block mt-6 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
        >
          &larr; Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        &larr; Back to Catalog
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <span className="px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full uppercase tracking-wider">
            {book?.genre?.name || 'General'}
          </span>
          <span className="text-sm text-slate-500 font-medium">
            Published: {book?.publishedYr || 'N/A'}
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
            {book?.title}
          </h1>
          <p className="text-lg text-slate-600 font-medium mt-2">
            Written by <span className="text-slate-800 font-semibold">{book?.author}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
          <div>
            <span className="text-slate-500 font-medium">ISBN:</span>
            <span className="ml-2 font-mono text-slate-800">{book?.isbn || 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Book ID:</span>
            <span className="ml-2 font-mono text-slate-800 text-xs">{book?.id}</span>
          </div>
        </div>

        {book?.reviews && book.reviews.length > 0 && (
          <div className="border-t border-slate-100 pt-6 space-y-3">
            <h3 className="text-lg font-bold text-slate-900">User Reviews</h3>
            <div className="space-y-3">
              {book.reviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-amber-600">{"★".repeat(rev.rating)}</span>
                    <span>{rev.user?.name || 'Patron'}</span>
                  </div>
                  {rev.comment && <p className="text-slate-700">{rev.comment}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
