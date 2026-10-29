import React, { useState, useEffect } from 'react';

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Debounce input using setTimeout + cleanup
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        🔍
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 text-sm placeholder-slate-400 transition-all"
        placeholder="Search books by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-sm font-semibold"
        >
          ✕
        </button>
      )}
    </div>
  );
}
