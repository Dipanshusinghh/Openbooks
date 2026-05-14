import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Settings, Key, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [keyInput, setKeyInput] = useState('');
  
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hey! I'm your AI Book Assistant. What are you looking to read today?" }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  
  const bottomRef = useRef(null);

  // grab saved key on mount
  useEffect(() => {
    const saved = localStorage.getItem('gemini_key');
    if (saved) {
      setApiKey(saved);
      setKeyInput(saved);
    } else {
      setShowSettings(true);
    }
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem('gemini_key', keyInput);
    setApiKey(keyInput);
    setShowSettings(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const getBooksContext = async (query) => {
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`);
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      
      if (!data.items) return "No books found.";

      return data.items.map((item, i) => {
        const v = item.volumeInfo;
        return `Book ${i + 1}:
Title: ${v.title}
Author: ${v.authors?.join(", ") || "Unknown"}
Categories: ${v.categories?.join(", ") || "Unknown"}
Desc: ${v.description ? v.description.substring(0, 300) + '...' : "N/A"}`;
      }).join('\n\n');

    } catch (err) {
      console.error("book fetch failed:", err);
      return "Error fetching books.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputVal.trim() || !apiKey) return;

    const userMsg = inputVal.trim();
    setInputVal('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      // get context from google books
      const contextText = await getBooksContext(userMsg);

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `You are a casual book assistant for Openbooks.
User said: "${userMsg}"

Here is some live data from Google Books to help you:
---
${contextText}
---

Answer the user based on this data. Suggest books and give a quick reason why. Be friendly and conversational. Don't sound like a robot.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.text }]);
    } catch (err) {
      console.error("genai error:", err);
      let errMsg = "Oops, something went wrong finding books.";
      if (err.message?.includes("API key")) {
        errMsg = "Looks like the API key is invalid. Check settings.";
      }
      setMessages(prev => [...prev, { role: 'ai', content: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-50 transition-all ${
          isOpen ? 'hidden' : 'bg-indigo-600 text-white hover:bg-indigo-500'
        }`}
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-full max-w-[380px] h-[600px] max-h-[85vh] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-slate-200 dark:border-neutral-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* top bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-neutral-800 bg-indigo-600/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    AI Assistant <Sparkles className="w-3 h-3 text-indigo-500" />
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Powered by Gemini</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* config section */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 overflow-hidden"
                >
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <Key className="w-4 h-4" /> Config
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Gemini API Key</label>
                      <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="AIzaSy..."
                        className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200"
                      />
                      <p className="text-[10px] text-slate-400 mt-2">
                        Stored locally. Get one from Google AI Studio.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveKey}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
                    >
                      Save Key
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* messages container */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
              {!apiKey && !showSettings && (
                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-3 rounded-xl text-amber-600 dark:text-amber-400 text-xs text-center font-medium">
                  Drop your Gemini API key in the settings to chat.
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      m.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                        : 'bg-white dark:bg-neutral-800 text-slate-700 dark:text-slate-200 rounded-bl-none shadow-sm border border-slate-100 dark:border-neutral-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-neutral-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-slate-100 dark:border-neutral-800">
                    <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* input bar */}
            <div className="p-4 bg-white dark:bg-neutral-900 border-t border-slate-100 dark:border-neutral-800">
              <form onSubmit={handleSend} className="relative">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Need a book idea?..."
                  disabled={!apiKey || loading}
                  className="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-full px-5 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 text-slate-800 dark:text-slate-200"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || !apiKey || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
