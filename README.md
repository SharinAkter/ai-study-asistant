# AI Study Assistant

A full-stack study platform for students — manage notes, chat with an AI assistant, generate smart summaries, and plan daily study tasks. Includes a complete admin panel for managing users, site settings, announcements, and feature modules.

## Tech Stack

**Frontend**
- React 19
- Vite 6
- Tailwind CSS 4
- React Router 7
- Zustand (state management)

**Backend**
- Node.js + Express 5
- Google Generative AI (Gemini) for chat & summarization

**Data storage**
- Browser `localStorage` (no external database required)

## Features

- User registration & login (role-based: student / admin)
- Notes — create, edit, delete, and search study notes
- AI Chat & Smart Summary — powered by Google Gemini
- Study Planner — daily task tracking with progress bar
- Dark / Light theme toggle
- Admin Panel:
  - User management (full CRUD)
  - Site-wide announcements (shown live to users)
  - App settings (site name, registration toggle, maintenance mode, module toggles)
  - Data export / import / reset
  - Session & activity log monitoring

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
GOOGLE_AI_API_KEY=your_google_ai_api_key
GOOGLE_AI_MODEL=gemini-flash-lite-latest
PORT=5000
```

Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey).

### 3. Start the backend (AI server)

```bash
npm run dev:server
```

Runs on `http://localhost:5000`.

### 4. Start the frontend (in a separate terminal)

```bash
npm run dev
```

Runs on `http://localhost:5173`.

### 5. Build for production

```bash
npm run build
npm run preview
```

## Demo Login

| Role | Email | Password |
|------|-------|----------|
| Admin | `sharin@aistydy.com` | `sharin123` |
| Student | Register a new account via the app | — |

## Project Structure

```
├── server.js              # Express AI backend (chat + summarize)
├── vite.config.js         # Vite + Tailwind + dev API proxy
├── docs/                  # Project presentation guide (HTML/PDF)
├── scripts/                # PDF generation utility
└── src/
    ├── components/         # Reusable UI components
    ├── layouts/            # Page layouts (Main, Auth, Dashboard, Admin)
    ├── pages/              # Route pages (incl. admin/ and modules/)
    ├── routes/              # App route definitions
    ├── store/               # Zustand state stores
    ├── hooks/               # Custom React hooks
    └── utils/               # Helpers (storage, API, constants)
```

## Documentation

A detailed project walkthrough (architecture, features, and setup) is available in [`docs/project-guide.html`](./docs/project-guide.html) and as a ready-to-present PDF at `AI-Study-Assistant-Project-Guide.pdf`.
