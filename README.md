# Quizzy

A web-based quiz application built with React and Firebase. Users can log in with Google, pick a category, answer multiple-choice questions, and track their score history.

---

## Tech Stack

- React 18 + Vite
- React Router v6
- Tailwind CSS
- Firebase Authentication (Google Sign-In)
- Open Trivia Database API (opentdb.com)
- localStorage (quiz state persistence & history)

---

## Features

- Landing page with public access
- Google Sign-In via Firebase
- Category selection (HTML, JavaScript, React, C++, Python, Random)
- 10 multiple-choice questions per session with 10-minute timer
- Quiz state persisted to localStorage (resume on refresh)
- Score history (last 5 sessions) saved to localStorage
- Cumulative points system across sessions
- Result review with per-question breakdown
- Protected routes (redirect to landing if not authenticated)
- Full desktop dashboard layout with sidebar navigation
- Dark theme throughout (QuizPage & HomePage)

---

## Project Structure

```
src/
├── firebase.js
├── App.jsx
├── main.jsx
├── index.css
├── context/
│   ├── AuthContext.jsx
│   └── QuizContext.jsx
├── services/
│   └── quizApi.js
├── utils/
│   ├── decode.js
│   ├── shuffle.js
│   └── historyUtils.js
├── routes/
│   └── ProtectedRoute.jsx
├── components/
│   ├── common/
│   │   └── LoadingScreen.jsx
│   ├── landing/
│   │   ├── LandingNavbar.jsx
│   │   └── LandingHero.jsx
│   ├── login/
│   │   ├── LoginHeader.jsx
│   │   ├── LoginCard.jsx
│   │   └── LoginForm.jsx
│   ├── home/
│   │   ├── HomeSidebar.jsx
│   │   ├── HomeDashboard.jsx
│   │   ├── HomeStatsCards.jsx
│   │   ├── HomeRecentEvents.jsx
│   │   ├── HomeTopStudents.jsx
│   │   └── HomeRecentQuizzes.jsx
│   ├── quiz/
│   │   ├── QuizHeader.jsx
│   │   ├── QuizProgress.jsx
│   │   ├── QuizQuestion.jsx
│   │   └── QuizOptions.jsx
│   └── result/
│       ├── ResultHeader.jsx
│       ├── ResultScore.jsx
│       ├── ResultStats.jsx
│       └── ResultReview.jsx
└── pages/
    ├── LandingPage.jsx
    ├── LoginPage.jsx
    ├── HomePage.jsx
    ├── QuizPage.jsx
    └── ResultPage.jsx
```

---

## App Flow

```
/          LandingPage (public)
            |
            | Sign In / Get Started / Explore Quizzes
            v
/login     LoginPage (Google Sign-In)
            |
            | login success
            v
/home      HomePage (protected) — desktop layout with sidebar
            |
            | Create Quiz / Create New Quiz card
            v
/quiz      QuizPage (protected) — dark theme, card-based
            |
            | all questions answered or timer ends
            v
/result    ResultPage (protected)
            |
            | Ulangi Quiz or Kembali ke Home
            v
/home      HomePage
```

---

## HomePage Layout

Full desktop layout with a persistent left sidebar. Sidebar includes logo, search input, nav links (Dashboard active, Quizzes, Events, Students, Settings decorative), and signed-in user info with logout.

Main content area:
- **Top bar** — search input + Create Quiz button
- **Stats cards** — Total Quizzes (from localStorage), Active Events, Students, Avg. Completion
- **Recent Events** — dummy data with View Live / Manage actions
- **Top Students** — leaderboard mixing current user's real points with dummy data
- **Recent Quizzes** — pulled from localStorage history + Create New Quiz card (navigates to `/quiz`)

---

## QuizPage Layout

Dark theme (`#0f0f1a` background), card-based layout:
- **Header** — back button, title, Save Draft & Preview buttons
- **Progress bar** — question count + countdown timer
- **Question card** — points badge, type selector, question text
- **Options card** — radio-style answer choices with purple active state
- **Add Question** — decorative dashed card
- **Bottom bar** — Prev button (decorative) + Next / Finish button

---

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/quizzy.git
cd quizzy
npm install
```

### 2. Firebase Configuration

Create a project at [firebase.google.com](https://firebase.google.com), enable **Authentication > Google**, then copy your config.

Create `.env` in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run

```bash
npm run dev
```

---

## License

MIT

referensi design FIGMA
https://www.figma.com/design/w0EN8QGI9tOPUZIHZuulY4/Quizzy-%E2%80%93-Modern-Web-UI--Community-?node-id=39-971&t=TDT6l1Zrb7bobW3O-0 