import React from "react";
import { BookOpen } from "lucide-react";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo & Description */}
        <div className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          <span className="font-semibold text-lg">OpenBooks</span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
          Discover, read, and organize your favorite books with OpenBooks — your personal digital bookshelf.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-indigo-600">
            <FaTwitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-indigo-600">
            <FaFacebookF className="h-5 w-5" />
          </a>
          <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-indigo-600">
            <FaInstagram className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-500">
        © {new Date().getFullYear()} OpenBooks. All rights reserved.
      </div>
    </footer>
  );
}
