import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Bookcard from "./Components/Bookcard";

const Home = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Book 1"
            className="w-full h-full object-cover transform rotate-2 scale-110"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_vector-1711645651692-7e95fef3244f?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Book 2"
            className="w-full h-full object-cover transform -rotate-1 scale-110"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>
      </div>
      <div className="relative z-10 text-center px-6">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 drop-shadow-lg"
        >
          Welcome to Book Ghar 📚
        </motion.h1>
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 text-lg text-neutral-100 max-w-2xl mx-auto drop-shadow-md"
        >
          Discover timeless stories, master coding skills, and explore your next favorite read.
        </motion.p>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <Link
            to="/books"
            className="inline-block px-8 py-4 rounded-full text-white font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:scale-105 transform transition duration-300 shadow-[0_10px_20px_rgba(236,72,153,0.3)] hover:shadow-[0_15px_30px_rgba(236,72,153,0.4)]"
          >
            Explore Books 
          </Link>
        </motion.div>
      </div>
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-10 left-5 opacity-40"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
          alt="Floating Book"
          className="w-12 h-12"
        />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-10 opacity-30"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
          alt="Floating Book"
          className="w-16 h-16"
        />
      </motion.div>
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
      </div>
    </Router>
  );
};

export default App;
