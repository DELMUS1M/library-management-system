import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetail from './pages/BookDetail';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="bg-indigo-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight hover:text-indigo-200 transition-colors flex items-center gap-2">
            <span>📚</span>
            <span>Library Catalog</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link to="/" className="hover:text-indigo-200 transition-colors">Catalog</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </main>

      <footer className="bg-slate-800 text-slate-400 py-6 border-t border-slate-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
