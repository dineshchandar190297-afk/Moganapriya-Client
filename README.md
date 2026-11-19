# PLIS — Personalized Learning Intelligence System

PLIS is a full-stack learning platform that builds a personal study plan for each student. Students take assessments, upload handwritten answer sheets for OCR grading, practise with subject-aware quizzes, and chat with an offline AI tutor. Teachers, parents and admins each get a dashboard of their own.

![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-SDK%2056-000020?logo=expo&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3FCF8E?logo=supabase&logoColor=white)

---

## Table of contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [API reference](#api-reference)
- [Testing](#testing)
- [Deployment](#deployment)

---

## Features

**Students**
- **Diagnostic assessment** that sets the starting level for each subject.
- **Personalized learning path**, generated per subject and broken into topics and subtopics with progress tracking.
- **Subject-aware MCQ quizzes**, generated from uploaded question papers. They use a non-repeating bank of 105+ questions.
- **Answer sheet upload with OCR.** Handwritten or printed sheets are scanned with Tesseract.js and analysed.
- **AI Tutor chat.** It runs on a local NLP engine (NLP.js), so it needs no external API key and works offline. It covers Maths, Physics, Chemistry, Biology, English and Computer Science.
- **Progress tracker and analysis reports**, exportable as **PDF** or **Excel**.
- **Community forum** with posts, replies and upvotes.

**Teachers, parents and admins**
- A dashboard for each role, showing student performance and activity.
- In-app notifications and email alerts (SMTP or Brevo).

---

## Architecture

```
┌──────────────────────┐     ┌──────────────────────┐
│  Mobile / Web app    │     │  Web portal          │
│  React Native (Expo) │     │  Next.js (plis-v2)   │
└──────────┬───────────┘     └──────────┬───────────┘
           │        REST  /api/*        │
           └──────────────┬─────────────┘
                          ▼
              ┌────────────────────────┐
              │  Backend API           │
              │  Node.js · Express · TS│
              │  NLP · OCR · Reports   │
              └───┬───────────┬────────┘
                  ▼           ▼
           ┌───────────┐ ┌────────────┐
           │ Supabase  │ │ Cloudinary │
           │ Postgres  │ │ media      │
           └───────────┘ └────────────┘
```

The mobile app calls the hosted API first. If that request fails, it automatically retries against `http://localhost:5001/api`. See [frontend/src/services/api.ts](frontend/src/services/api.ts).

---

## Tech stack

| Layer | Technologies |
|---|---|
| **Mobile / Web app** | React Native 0.85, Expo SDK 56, React Navigation, Redux Toolkit, Axios, react-native-chart-kit |
| **Web portal** | Next.js 16, React 19, Tailwind CSS 4, TanStack Query, Zustand, Recharts, Framer Motion |
| **Backend** | Node.js, Express, TypeScript, JWT auth, bcrypt, Multer |
| **AI / processing** | NLP.js (`node-nlp`) tutor, Tesseract.js OCR, optional Gemini / Ollama for content generation |
| **Data and storage** | Supabase (PostgreSQL), Cloudinary |
| **Reports** | PDFKit, ExcelJS |
| **Testing and CI** | Jest, Supertest, custom E2E / load runners, GitHub Actions |

---

## Project structure

```
.
├── backend/                  # Express + TypeScript REST API
│   └── src/
│       ├── app.ts            # Server entry point
│       ├── config/           # Supabase client and SQL schema
│       ├── controllers/      # Route handlers
│       ├── middleware/       # Auth (JWT) and error handling
│       ├── routes/           # /api/* route definitions
│       ├── services/         # NLP tutor, OCR, reports, email, AI
│       └── tests/            # Jest tests
├── frontend/                 # React Native (Expo) app: Android, iOS and web
│   └── src/
│       ├── screens/          # student / teacher / parent / admin / auth
│       ├── navigation/       # App navigator
│       ├── store/            # Redux store and auth slice
│       └── services/api.ts   # Axios client with failover
├── plis-v2/                  # Next.js web portal
├── question_papers/          # Source question papers (JSON)
├── scripts/                  # Test runners and data generators
├── reports/                  # Generated test reports
├── .github/workflows/        # CI pipeline
├── render.yaml               # Render deployment blueprint
└── DEPLOYMENT.md             # Detailed deployment guide
```

---

## Getting started

### Prerequisites

- **Node.js 18+** and npm
- A **Supabase** project. Run [backend/src/config/supabase_schema.sql](backend/src/config/supabase_schema.sql) in its SQL editor to create the tables.
- *(Optional)* a **Cloudinary** account, for storing uploaded media.
- *(Optional)* the **Expo Go** app or an Android / iOS emulator.

### 1. Clone

```bash
git clone https://github.com/dineshchandar190297-afk/Moganapriya-Client.git
cd Moganapriya-Client
```

### 2. Backend

```bash
cd backend
npm install
# create backend/.env (see "Environment variables" below)
npm run dev          # development server with hot reload on http://localhost:5001
```

For a production build:

```bash
npm run build && npm start
```

### 3. Mobile / web app (Expo)

```bash
cd frontend
npm install
npm start            # opens the Expo dev server
npm run android      # or: npm run ios / npm run web
```

### 4. Web portal (Next.js)

```bash
cd plis-v2
npm install
# create plis-v2/.env.local (see below)
npm run dev          # http://localhost:3000
```

---

## Environment variables

### `backend/.env`

| Variable | Required | Description |
|---|:---:|---|
| `PORT` | | API port (default `5001`) |
| `NODE_ENV` | | `development` or `production` |
| `JWT_SECRET` | ✅ | Secret used to sign auth tokens |
| `SUPABASE_URL` | ✅ | Supabase project URL |
| `SUPABASE_KEY` | ✅ | Supabase service or anon key |
| `CLOUDINARY_CLOUD_NAME` | | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | | Cloudinary API secret |
| `GEMINI_API_KEY` / `OLLAMA_API_KEY` | | Enables AI-generated learning paths and quizzes |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | | SMTP settings for email (password reset, alerts) |
| `BREVO_API_KEY` | | Alternative to SMTP for sending email |

### `plis-v2/.env.local`

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

> **Never commit `.env` files.** They are already listed in `.gitignore`.

---

## API reference

All routes are prefixed with `/api`. Every route except register, login, Google login and forgot-password requires an `Authorization: Bearer <token>` header.

| Module | Endpoints |
|---|---|
| **Auth** | `POST /auth/register` · `POST /auth/login` · `POST /auth/google` · `POST /auth/forgot-password` · `GET /auth/me` |
| **Profile** | `GET /profile` · `PUT /profile` |
| **Learning path** | `GET /path` · `POST /path/generate` · `PUT /path/subtopic-status` · `POST /path/lesson/generate` |
| **Quiz** | `GET /quiz/assessment` · `POST /quiz/assessment/submit` · `POST /quiz/generate-from-papers` · `POST /quiz/create` · `GET /quiz/:id` · `POST /quiz/:id/submit` |
| **AI tutor** | `POST /tutor/message` · `GET /tutor/history` |
| **Uploads** | `POST /upload/answer-sheet` · `GET /upload/my-sheets` |
| **Dashboard** | `GET /dashboard` |
| **Reports** | `GET /report/pdf` · `GET /report/excel` |
| **Notifications** | `GET /notification` · `PUT /notification/:id/read` |
| **Community** | `GET /community` · `POST /community` · `POST /community/:id/reply` · `PUT /community/:id/upvote` |
| **Test runner** | `POST /test-runner/run` · `GET /test-runner/status` · `GET /test-runner/logs` · `GET /test-runner/download-excel` |

---

## Testing

From the repository root:

```bash
npm run test:unified      # run every suite and consolidate the reports
npm run test:backend      # backend API tests
npm run test:e2e          # end-to-end flows
npm run test:load         # API load test
npm run test:build        # frontend build check
```

Backend unit tests:

```bash
cd backend && npm test
```

The results are written to [reports/](reports/). The GitHub Actions workflow in [.github/workflows/unified_reports.yml](.github/workflows/unified_reports.yml) runs the pipeline on every push to `main`.

---

## Deployment

- **Backend → Render.** [render.yaml](render.yaml) defines the service. Set the secret environment variables in the Render dashboard.
- **Mobile app → EAS Build.** Build an Android APK or AAB with `eas build -p android` from `frontend/` (configured in [frontend/eas.json](frontend/eas.json)).
- **Web → Vercel.** Configured in [frontend/vercel.json](frontend/vercel.json); `plis-v2` deploys to Vercel as a standard Next.js app.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full step-by-step guide.
