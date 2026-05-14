<div align="center">
  <br />
  <img src="https://img.shields.io/badge/OpenBooks-Library-blueviolet?style=for-the-badge&logo=gitbook&logoColor=white" alt="OpenBooks Banner" />
  <br />
  <h3>📚 OpenBooks</h3>
  <p>A modern, high-performance Single Page Application (SPA) designed to help users discover, explore, and read previews of millions of books.</p>
</div>

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

</div>

<hr />

## 📖 About The Project

**OpenBooks** is a premium, interactive web application that leverages the powerful **Google Books API** to provide real-time book search results. Engineered with a focus on User Experience (UX), it features a fluid interface, dynamic animations, and seamless navigation. Whether you are searching for your next favorite novel, technical documentation, or historical texts, OpenBooks delivers instant access to an expansive digital library.

## ✨ Key Features

- **Live Data Fetching**: Fully integrated with the Google Books API for instantaneous, real-time book queries.
- **Smart Book Assistant**: Built-in chat assistant using the Gemini API. It grabs live search results and recommends books conversationally.
- **Advanced Search & Filtering**: Robust search capabilities (by author or title) with smart category filtering (Tech, Romance, Fiction, and more).
- **Optimized Performance**: Network requests are optimized using debounce logic to prevent API rate limiting and ensure snappy feedback.
- **Fluid UI & Animations**: High-quality layout transitions, staggered lists, and interactive hover effects powered by `Framer Motion`.
- **Skeleton Loading States**: Seamless user experience with skeleton loaders while fetching and rendering asynchronous data.
- **Dark/Light Mode**: Persistent theme toggling using `localStorage` and TailwindCSS's native dark mode system.
- **Responsive Architecture**: Fully responsive CSS Grid layout tailored for flawless viewing across mobile, tablet, and desktop devices.

## 🛠️ Technology Stack

| Category | Technologies |
| --- | --- |
| **Frontend Framework** | React 19, Vite |
| **Routing** | React Router DOM (v7) |
| **Styling & UI** | Tailwind CSS (v4), Lucide React, React Icons |
| **Animations** | Framer Motion |
| **Data Source** | Google Books API (v1) |
| **AI/LLM Integration**| Google Gemini (`@google/genai`) |
| **Code Quality** | ESLint |

## 📁 Project Structure

```text
Openbooks/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── assets/             # Images, SVGs, etc.
│   ├── Components/         # Reusable React components (Header, BookCard, etc.)
│   ├── App.jsx             # Main application component & layout state
│   ├── main.jsx            # Application entry point
│   ├── index.css           # Global Tailwind styles
├── package.json            # Project metadata & dependencies
├── vite.config.js          # Vite configuration
└── eslint.config.js        # ESLint rules & configuration
```

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js installed on your local machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dipanshusinghh/Openbooks.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Openbooks
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🧠 Architectural Decisions

- **State Management**: Search query state is hoisted to the root `App.jsx` component. This allows decoupled, predictable interaction between the `Header` (which contains the search input) and the main data visualization components.
- **Error Handling & Resilience**: Implemented robust error boundaries to handle failed network requests or missing API data gracefully (e.g., displaying fallback images for missing book covers, handling empty result sets).

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<hr />

<div align="center">
  <i>Built with ❤️ for book lovers and developers.</i>
</div>
