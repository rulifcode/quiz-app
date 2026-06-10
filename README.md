# Quizzy

A web-based quiz application built with React and Firebase. Users can log in with Google, start a quiz from the landing page, answer multiple-choice questions, and track their score history.

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
- One question per screen, move to the next question after answering
- Quiz state persisted to localStorage so the session can resume on refresh
- Score history (last 5 sessions) saved to localStorage
- Cumulative points system across sessions
- Dynamic leaderboard from Firebase Firestore (signed-in users)
- Result review with per-question breakdown
- Protected routes (redirect to landing if not authenticated)
- Dark theme throughout (Landing, Quiz, Result)

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
├── pages/
    ├── LandingPage.jsx
    ├── LoginPage.jsx
    ├── QuizPage.jsx
    └── ResultPage.jsx
```

---

## App Flow

```
/          LandingPage (public)
            |
            | Sign In / Play Quiz
            v
/login     LoginPage (Google Sign-In)
            |
            | login success
            v
/          LandingPage (signed-in navbar: Play Quiz / Logout)
            |
            | Play Quiz
            v
/quiz      QuizPage (protected) — dark theme, one question per screen
            |
            | all questions answered or timer ends
            v
/result    ResultPage (protected)
            |
            | Ulangi Quiz or Kembali ke Landing
            v
/          LandingPage
```

---

## QuizPage Layout

Dark theme (`#050507` background), card-based layout:
- **Header** — back button, quiz title, simple session label
- **Progress bar** — question count + countdown timer
- **Question card** — question number, type badge, question text
- **Options card** — radio-style answer choices with one active state
- **Bottom bar** — Next / Finish button

---

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/quizzy.git
cd quizzy
npm install
```

### 2. Firebase Configuration

Create a project at [firebase.google.com](https://firebase.google.com), enable **Authentication > Google** and **Cloud Firestore**, then copy your config.

Create `.env` in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

The app stores quiz history locally and writes leaderboard totals to Firestore so the ranking panel can show real signed-in users.

### 3. Run

```bash
npm run dev
```

---

## License

MIT
