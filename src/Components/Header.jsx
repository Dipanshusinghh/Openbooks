import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X, Moon, Sun, Search } from "lucide-react";

export default function Header({ searchQuery, setSearchQuery }) {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Load dark mode preference
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm dark:shadow-neutral-800 border-b border-transparent dark:border-neutral-800 transition-colors duration-300">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>
            <BookOpen className="h-7 w-7 text-indigo-600 dark:text-indigo-400 transition-colors" />
          </motion.div>
          <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
            OpenBooks
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={`font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${location.pathname === '/' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'}`}>Home</Link>
          <Link to="/books" className={`font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${location.pathname === '/books' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'}`}>Books</Link>
          <span className="text-slate-400 dark:text-slate-600 cursor-not-allowed font-medium">Authors</span>
          <span className="text-slate-400 dark:text-slate-600 cursor-not-allowed font-medium">Pricing</span>
        </div>

        {/* Search + Dark Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center border border-slate-200 dark:border-neutral-700 rounded-full px-3 py-1.5 bg-slate-50 dark:bg-neutral-800 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none px-2 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 w-32 focus:w-48 transition-all duration-300"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDark}
            className="p-2 rounded-full bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-600 dark:text-slate-300 transition-colors"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white dark:bg-neutral-900 border-t dark:border-neutral-800"
          >
            <div className="px-4 py-4 space-y-3">
              <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-700 dark:text-slate-200 font-medium hover:text-indigo-600">Home</Link>
              <Link to="/books" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-700 dark:text-slate-200 font-medium hover:text-indigo-600">Books</Link>
              
              <div className="flex items-center gap-2 border border-slate-200 dark:border-neutral-700 rounded-xl px-3 py-2 bg-slate-50 dark:bg-neutral-800 mt-4">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none px-2 text-base w-full text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
