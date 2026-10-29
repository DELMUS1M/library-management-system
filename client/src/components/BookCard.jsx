import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  if (!book) return null;

  const { id, title, author, publishedYr, genre, isbn } = book;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
            {genre?.name || 'General'}
          </span>
          {publishedYr && (
            <span className="text-xs text-slate-400 font-medium">{publishedYr}</span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-sm text-slate-600 font-medium">
          by <span className="text-slate-800">{author}</span>
        </p>

        {isbn && (
          <p className="text-xs text-slate-400 font-mono mt-1">
            ISBN: {isbn}
          </p>
        )}
      </div>

      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/books/${id}`}
          className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors group-hover:translate-x-0.5 transform duration-150"
        >
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
}
