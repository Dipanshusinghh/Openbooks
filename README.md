# 📚 OpenBooks

OpenBooks is a modern, high-performance Single Page Application (SPA) designed to help users discover, explore, and read previews of millions of books. It leverages the **Google Books API** to provide real-time search results and features a premium UI with smooth animations.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Key Features

- **Live Data Fetching**: Integrated with the `Google Books API` for real-time book queries.
- **Advanced Search & Filtering**: Users can search by author or title, and filter results by categories (Tech, Romance, Fiction, etc.).
- **Debounced API Calls**: Optimized network requests with debounce logic to prevent API rate limiting.
- **Fluid Animations**: High-quality layout transitions, staggered lists, and hover effects powered by `Framer Motion`.
- **Skeleton Loading UI**: Provides a seamless user experience with skeleton loading states while fetching data.
- **Dark Mode Support**: Persistent dark/light theme toggling using `localStorage` and Tailwind's dark mode capabilities.
- **Responsive Design**: Fully responsive CSS Grid layout tailored for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS (v4)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Source**: Google Books API (v1)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Dipanshusinghh/Openbooks.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Openbooks
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧠 Architectural Decisions
- **State Management**: Lifted the `searchQuery` state to the root `App.jsx` component to allow decoupled interaction between the `Header` (search input) and `Bookcard` (data visualization) components.
- **Error Handling**: Implemented robust error boundaries to handle failed network requests or missing API data gracefully (e.g., fallback images for missing book covers).

---
*Built with ❤️ for book lovers and developers.*
