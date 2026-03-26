<div align="center">

# ✦ Ideapulse

### A Modern Blogging Platform for Thinkers & Creators

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10.x-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

**Ideapulse** is a full-featured, Medium-inspired blogging platform built with React and Firebase. It delivers a premium reading and writing experience with real-time data, rich-text editing, social engagement features, and a clean, minimalist aesthetic.

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Key Pages & Components](#-key-pages--components)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🏠 Landing & Discovery
- **Elegant Landing Page** — Full-viewport hero with serif typography and animated SVG illustration
- **Trending Stories** — Numbered grid layout showcasing the top 6 stories in a 3-column responsive grid
- **Category Filtering** — Dynamic, pill-based category tabs extracted from published content
- **Full-Text Search** — Real-time search across all stories
- **Pagination** — Clean paginated browsing for the "All Stories" page

### ✍️ Writing & Publishing
- **Rich Text Editor** — Powered by [TipTap](https://tiptap.dev/) with a distraction-free, Medium-style drafting interface
- **Cover Image Support** — Paste any image URL (Unsplash recommended) as your story's hero image
- **Category & Tagging** — Assign a category and up to 5 tags for discoverability
- **Form Validation** — Inline validation for title, content, category, and image URL
- **One-Click Publish** — Stories are saved directly to Firestore in real time

### 📖 Reading Experience
- **Reading Progress Bar** — Animated top-bar indicator showing scroll progress through an article
- **Premium Typography** — Source Serif 4 for editorial content, Inter for UI, JetBrains Mono for code blocks
- **Styled Prose** — Beautiful blockquotes, code blocks, image treatments, and heading hierarchy via `@tailwindcss/typography`
- **Related Stories** — Automatically surfaces tag-matched articles at the bottom of each post

### 🔐 Authentication
- **Email/Password Auth** — Firebase Authentication with secure signup/login flows
- **Google OAuth** — One-click sign-in with Google via popup
- **Modal-Based Auth** — Clean, non-page-redirecting auth modals from any entry point
- **Protected Routes** — Authenticated-only access to Write, Profile, Bookmarks, and article pages

### 👤 User Profile
- **Editable Profile** — Update display name and upload a profile photo
- **Base64 Photo Storage** — Profile photos are compressed client-side and stored in Firestore (no external storage dependencies)
- **My Stories** — Dedicated view of all articles published by the logged-in user

### 📌 Social & Engagement
- **Bookmarks / Reading List** — Save any story to a personal reading list (persisted in `localStorage`)
- **Share Buttons** — Native sharing support for social platforms
- **Comment Section** — Real-time comments on every article
- **Auto-Refresh** — Stories auto-refresh every 30 minutes in the background

### 🎨 Design & UX
- **Responsive Design** — Fully responsive from mobile to ultra-wide displays
- **Skeleton Loaders** — Elegant loading skeletons instead of blank screens
- **Scroll-Aware Navbar** — Translucent glass-morphism effect with backdrop blur on scroll
- **Micro-Animations** — Hover effects, scale transitions, fade-ins, and smooth page transitions
- **Avatar Dropdown** — Profile avatar with animated dropdown menu in the navbar

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 18 with JSX |
| **Build Tool** | Vite 5 |
| **Routing** | React Router DOM v6 |
| **State Management** | Redux Toolkit + React-Redux |
| **Styling** | TailwindCSS 3.4 + `@tailwindcss/typography` |
| **Rich Text Editor** | TipTap (React bindings) |
| **Authentication** | Firebase Auth (Email/Password + Google OAuth) |
| **Database** | Cloud Firestore |
| **Storage** | Firebase Storage (configured) + Base64 in Firestore |
| **Icons** | React Icons (Feather + Font Awesome) |
| **Typography** | Google Fonts (Source Serif 4, Inter, JetBrains Mono) |
| **Color Extraction** | node-vibrant |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (React)                   │
│  ┌───────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  React    │  │  Redux   │  │  React Router    │  │
│  │  Components│  │  Store   │  │  (Protected +    │  │
│  │           │  │          │  │   Public Routes) │  │
│  └─────┬─────┘  └────┬─────┘  └────────┬─────────┘  │
│        │             │                 │             │
│        └─────────────┼─────────────────┘             │
│                      │                               │
│              ┌───────▼────────┐                      │
│              │   API Layer    │                      │
│              │  (auth.js +    │                      │
│              │  firebase.js)  │                      │
│              └───────┬────────┘                      │
└──────────────────────┼──────────────────────────────┘
                       │
          ┌────────────▼────────────┐
          │     Firebase Backend    │
          │  ┌──────────────────┐   │
          │  │  Authentication  │   │
          │  │  (Email + Google)│   │
          │  └──────────────────┘   │
          │  ┌──────────────────┐   │
          │  │  Cloud Firestore │   │
          │  │  (blogs, users,  │   │
          │  │   comments)      │   │
          │  └──────────────────┘   │
          │  ┌──────────────────┐   │
          │  │  Cloud Storage   │   │
          │  └──────────────────┘   │
          └─────────────────────────┘
```

**State Management Flow:**

```
User Action → Component → Redux Dispatch → Async Thunk → Firestore API → Redux Store → UI Re-render
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A [Firebase](https://console.firebase.google.com/) project with **Authentication** and **Firestore** enabled

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/Ideapulse.git
   cd Ideapulse
   ```

2. **Install dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `client/` directory:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project identifier |
| `VITE_FIREBASE_STORAGE_BUCKET` | Cloud Storage bucket URL |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app identifier |

> ⚠️ **Never commit `.env` files.** They are already included in `.gitignore`.

---

## 📁 Project Structure

```
Ideapulse/
├── client/
│   ├── public/                     # Static assets (SVGs, favicon)
│   ├── src/
│   │   ├── api/                    # Firebase config & auth helpers
│   │   │   ├── auth.js             # Signup, login, Google OAuth, profile update
│   │   │   └── firebase.js         # Firebase initialization & service exports
│   │   ├── assets/                 # SVGs, images, UI assets
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── AuthModal.jsx   # Login/Signup modal with Google OAuth
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx      # Responsive navbar with avatar dropdown
│   │   │   │   ├── Footer.jsx      # Site footer
│   │   │   │   ├── Search.jsx      # Search bar component
│   │   │   │   ├── Modal.jsx       # Reusable modal wrapper
│   │   │   │   ├── Loading.jsx     # Loading spinner
│   │   │   │   ├── BookmarkButton.jsx
│   │   │   │   ├── ShareButtons.jsx
│   │   │   │   └── ReadingProgressBar.jsx
│   │   │   └── write/
│   │   │       ├── RichTextEditor.jsx  # TipTap-powered rich text editor
│   │   │       └── CommentSection.jsx  # Real-time comment system
│   │   ├── hooks/
│   │   │   └── useBookmarks.js     # Custom hook for bookmark management
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   ├── Home.jsx        # Main feed (trending + recent)
│   │   │   │   ├── LandingBanner.jsx # Hero section for unauthenticated users
│   │   │   │   ├── Trending.jsx    # Numbered trending stories grid
│   │   │   │   ├── RecentPosts.jsx # Recent stories grid
│   │   │   │   └── ...
│   │   │   ├── blogs/
│   │   │   │   ├── Blogs.jsx       # All stories with categories & pagination
│   │   │   │   ├── SingleBlog.jsx  # Full article reader
│   │   │   │   ├── Card.jsx        # Blog card component
│   │   │   │   └── ...
│   │   │   ├── write/
│   │   │   │   └── Write.jsx       # Blog drafting & publishing page
│   │   │   ├── profile/
│   │   │   │   └── Profile.jsx     # User profile & authored stories
│   │   │   ├── bookmarks/
│   │   │   │   └── Bookmarks.jsx   # Saved reading list
│   │   │   └── About.jsx
│   │   ├── redux/
│   │   │   ├── store.js            # Redux store configuration
│   │   │   └── features/
│   │   │       ├── blogs/          # Blog list slice + async thunks
│   │   │       ├── singleBlog/     # Single article slice
│   │   │       ├── filter/         # Search & tag filter slice
│   │   │       └── relatedBlogs/   # Related articles slice
│   │   ├── utils/
│   │   │   └── timeUtils.js        # Relative time formatting
│   │   ├── App.jsx                 # Root layout with Navbar + Footer
│   │   ├── main.jsx                # Router configuration & entry point
│   │   ├── ProtectedRoute.jsx      # Auth guard wrapper
│   │   └── index.css               # Global styles
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🖼 Key Pages & Components

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` (unauthenticated) | Full-viewport hero with CTA and animated illustration |
| **Home Feed** | `/` (authenticated) | Trending stories grid + recent posts feed |
| **All Stories** | `/blogs` | Filterable, paginated blog directory |
| **Article Reader** | `/blogs/:id` | Full article view with progress bar, comments, related stories |
| **Write** | `/write` | Rich text editor with category, tags, and cover image |
| **Profile** | `/profile` | Editable user profile with authored stories list |
| **Reading List** | `/bookmarks` | Saved/bookmarked stories |
| **About** | `/about` | Platform information page |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Purpose |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Code style (formatting, no logic change) |
| `refactor:` | Code refactoring |
| `perf:` | Performance improvement |
| `chore:` | Build/tooling changes |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
