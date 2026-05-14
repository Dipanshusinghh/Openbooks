import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Search, ArrowRight } from "lucide-react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Bookcard from "./Components/Bookcard";
import ChatAssistant from "./Components/ChatAssistant";

const Home = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-slate-50 dark:bg-neutral-950"
  >
    {/* Hero Section */}
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-slate-900 dark:bg-black"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-slate-900/90 to-purple-900/80 dark:from-indigo-950 dark:via-black dark:to-purple-950"></div>
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20 bg-cover bg-center mix-blend-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      
      {/* Animated Particles/Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          Powered by Google Books API
        </motion.div>

        <motion.h1 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-tight drop-shadow-2xl"
        >
          Discover Your Next <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Great Read</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto drop-shadow-md font-medium leading-relaxed"
        >
          Explore millions of books, from timeless classics to modern programming guides. Your personal digital library starts right here.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/books"
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full text-white font-bold bg-indigo-600 hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:-translate-y-1"
          >
            <BookOpen className="w-5 h-5" />
            Explore Library
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/books"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full text-white font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:-translate-y-1"
          >
            <Search className="w-5 h-5" />
            Search Books
          </Link>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const App = () => {
  const [searchQuery, setSearchQuery] = useState("programming");

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Bookcard searchQuery={searchQuery} />} />
          </Routes>
        </main>
        <Footer />
        <ChatAssistant />
      </div>
    </Router>
  );
};

export default App;
