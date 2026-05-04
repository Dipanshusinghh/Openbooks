import React, { useState, useEffect } from "react";
import { Star, BookOpen, Heart, Code, Filter, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "All", search: "", icon: <Filter size={18} /> },
  { name: "Tech", search: "programming+algorithms", icon: <Code size={18} /> },
  { name: "Romance", search: "romance+love", icon: <Heart size={18} /> },
  { name: "Fiction", search: "fiction", icon: <BookOpen size={18} /> },
  { name: "Non-Fiction", search: "non-fiction", icon: <BookOpen size={18} /> },
];

export default function BooksGrid({ searchQuery = "programming" }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch books from Google Books API
  useEffect(() => {
    // Determine the query to use
    let query = searchQuery.trim();
    if (query === "") {
      query = "bestsellers"; // Fallback if search is totally empty
    }
    
    // If a specific category is clicked (and it's not 'All'), append or use it
    if (activeCategory !== "All") {
      const catSearch = categories.find(c => c.name === activeCategory)?.search;
      if (searchQuery.trim() === "" || searchQuery === "programming") {
        query = catSearch;
      } else {
        query = `${searchQuery}+subject:${catSearch}`;
      }
    }

    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`);
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        
        if (data.items) {
          // Map Google Books data structure to our needed format
          const formattedBooks = data.items.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title || "Unknown Title",
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown Author",
            rating: item.volumeInfo.averageRating || (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // Mock rating if missing
            description: item.volumeInfo.description || "No description available for this book.",
            cover: item.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
            category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : "General",
            previewLink: item.volumeInfo.previewLink
          }));
          setBooks(formattedBooks);
        } else {
          setBooks([]); // No results
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please check your connection.");
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the API call by 600ms
    const timeoutId = setTimeout(() => {
      fetchBooks();
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, activeCategory]);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6"
      >
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-3">
            Explore Collection
            {isLoading && <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Find your next favorite book from millions of titles</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeCategory === cat.name
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-neutral-800 dark:text-slate-300 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700"
              }`}
            >
              {cat.icon}
              {cat.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 mb-8">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Books Grid */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {isLoading && books.length === 0 ? (
            // Skeleton Loading UI
            [...Array(8)].map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 h-[450px]"
              >
                <div className="h-64 bg-slate-200 dark:bg-neutral-800 animate-pulse"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-slate-200 dark:bg-neutral-800 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 dark:bg-neutral-800 rounded w-1/2 animate-pulse"></div>
                  <div className="space-y-2 mt-4">
                    <div className="h-3 bg-slate-200 dark:bg-neutral-800 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-slate-200 dark:bg-neutral-800 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-slate-200 dark:bg-neutral-800 rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : books.length > 0 ? (
            books.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 flex flex-col h-[480px]"
              >
                <div className="relative overflow-hidden h-64 bg-slate-100 dark:bg-neutral-800">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={book.cover}
                    alt={book.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold dark:text-white">{book.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-indigo-600/90 backdrop-blur px-2.5 py-1 rounded-md text-white text-xs font-semibold uppercase tracking-wider max-w-[80%] truncate">
                    {book.category}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" title={book.title}>
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium line-clamp-1" title={book.author}>
                    {book.author}
                  </p>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <a 
                      href={book.previewLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline flex items-center gap-1"
                    >
                      Read Preview
                    </a>
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-slate-50 hover:bg-indigo-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 flex flex-col items-center justify-center text-center"
            >
              <div className="w-24 h-24 bg-slate-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">No books found</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">We couldn't find any books matching "{searchQuery}". Try different keywords or categories.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
