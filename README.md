# Ideapulse

A modern, full-stack blogging platform built with **React**, **Redux Toolkit**, and **Firebase**. Features a Medium-inspired reading experience with rich text editing, real-time comments, social sharing, and a fully responsive glassmorphism UI.

🔗 **[Live Demo](https://ideapulse.vercel.app)** &nbsp;·&nbsp; **[Report Bug](https://github.com/cax6505/Ideapulse/issues)**

---

## Features

- **Rich Text Editor** — TipTap-powered, distraction-free writing with cover images, categories, and tags
- **Trending & Discovery** — Numbered trending grid, category filters, full-text search, and pagination
- **Reading Experience** — Scroll progress bar, premium serif typography, styled prose, and related stories
- **Authentication** — Firebase Auth with email/password and Google OAuth via modal-based flows
- **Social Engagement** — Bookmarks, share buttons, and real-time comment threads
- **User Profiles** — Editable profiles with client-side compressed Base64 photo storage
- **Polished UI** — Skeleton loaders, glassmorphism navbar, micro-animations, and fully responsive layouts

---

## Tech Stack

| | Technology |
|---|---|
| **Frontend** | React 18 · Vite 5 · React Router v6 |
| **State** | Redux Toolkit · React-Redux |
| **Styling** | TailwindCSS 3.4 · @tailwindcss/typography |
| **Editor** | TipTap (React) |
| **Backend** | Firebase Auth · Cloud Firestore |
| **Extras** | React Icons · Google Fonts · node-vibrant |

---

## Quick Start

```bash
# Clone & install
git clone https://github.com/cax6505/Ideapulse.git
cd Ideapulse/client
npm install

# Add Firebase credentials
cp .env.example .env   # then fill in your Firebase config

# Run
npm run dev            # → http://localhost:5173
```

> Your `.env` needs: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`

---

## Architecture

```
React Components → Redux Dispatch → Async Thunks → Firestore API → Redux Store → UI Re-render
```

The app follows a unidirectional data flow with **Redux Toolkit** managing global state and **Firebase** serving as the serverless backend for auth, database, and storage.

---

## License

MIT
