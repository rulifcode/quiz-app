# Quizzy - React Quiz App

Quizzy adalah aplikasi kuis berbasis React yang menggunakan Google Login, Open Trivia Database API, timer, resume session menggunakan `localStorage`, leaderboard Firebase Firestore, halaman hasil, dan review jawaban.

Project ini dibuat untuk memenuhi challenge:

1. Membuat aplikasi kuis menggunakan React.
2. Mengambil soal dari API Open Trivia Database.
3. Menampilkan satu soal per halaman.
4. Memiliki timer dan hasil pengerjaan.
5. Memilik  i mekanisme resume kuis saat browser ditutup.
6. Mengupload source code ke GitHub.

Dokumen tambahan untuk persiapan video demo ada di [DEMO_SCRIPT.md](./DEMO_SCRIPT.md).

## Fitur Utama

- Login menggunakan Google via Firebase Authentication.
- Splash screen sederhana dengan logo `logo_quizzy.png`.
- Landing page modern dengan hero image `hero1.jpg`.
- Filter kategori dari OpenTDB API.
- Filter level soal: Any Difficulty, Easy, Medium, Hard.
- Card kategori default menampilkan 8 item, tombol `See All` untuk membuka semua kategori.
- 10 soal per sesi.
- Timer 10 menit per sesi.
- Satu halaman hanya menampilkan satu soal.
- Setelah user memilih jawaban, aplikasi langsung pindah ke soal berikutnya.
- Jika timer habis, quiz otomatis selesai dan pindah ke halaman hasil.
- Halaman hasil menampilkan jumlah benar, salah, skipped/tidak dijawab, waktu pengerjaan, skor, leaderboard, dan review jawaban.
- Resume quiz menggunakan `localStorage`, jadi sesi aktif tetap bisa dilanjutkan setelah browser/tab ditutup.
- Riwayat quiz lokal disimpan di browser.
- Leaderboard disimpan di Firebase Firestore.
- Toast notifikasi untuk login berhasil/gagal, quiz dimulai/gagal, dan quiz selesai.
- Protected route untuk halaman quiz dan result.
- Footer berisi link sosial media dan portfolio.

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- Firebase Authentication
- Firebase Firestore
- Open Trivia Database API
- Lucide React Icons
- Browser `localStorage`
- ESLint

## API yang Digunakan

Project ini menggunakan Open Trivia Database:

- Website: https://opentdb.com/
- Endpoint soal: `https://opentdb.com/api.php`
- Endpoint kategori: `https://opentdb.com/api_category.php`

### Cara Consume API

Consume API dilakukan di [src/services/quizApi.js](./src/services/quizApi.js).

Untuk mengambil kategori:

```js
const CATEGORY_URL = "https://opentdb.com/api_category.php"

export const fetchCategories = async () => {
  const response = await fetch(CATEGORY_URL)
  const data = await response.json()

  return [
    { label: "Random", description: "Campuran soal dari berbagai kategori.", categoryId: null },
    ...data.trivia_categories.map((category) => ({
      label: category.name,
      description: `Soal dari kategori ${category.name}.`,
      categoryId: category.id,
    })),
  ]
}
```

Untuk mengambil soal:

```js
const BASE_URL = "https://opentdb.com/api.php"

export const fetchQuestions = async ({ amount = 10, difficulty = null, type = null, categoryId = null } = {}) => {
  const params = new URLSearchParams({ amount: String(amount) })
  if (difficulty) params.set("difficulty", difficulty)
  if (type) params.set("type", type)
  if (categoryId) params.set("category", String(categoryId))

  const response = await fetch(`${BASE_URL}?${params.toString()}`)
  const data = await response.json()

  return data.results
}
```

Parameter API yang dipakai:

- `amount`: jumlah soal, saat ini `10`.
- `category`: id kategori dari OpenTDB.
- `difficulty`: `easy`, `medium`, atau `hard`.
- `type`: disiapkan di service, tetapi saat ini belum dipakai di UI.

OpenTDB mengembalikan data dengan format:

```json
{
  "response_code": 0,
  "results": [
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Science: Computers",
      "question": "Question text",
      "correct_answer": "Correct",
      "incorrect_answers": ["A", "B", "C"]
    }
  ]
}
```

Di project ini, jawaban benar dan salah digabung lalu diacak menggunakan helper `shuffleArray` dari [src/utils/shuffle.js](./src/utils/shuffle.js).

## Konfigurasi Quiz

Konfigurasi utama ada di [src/config/quizConfig.js](./src/config/quizConfig.js):

```js
export const QUIZ_AMOUNT = 10
export const QUIZ_DURATION_SECONDS = 10 * 60
```

Artinya:

- Total soal: 10.
- Durasi quiz: 10 menit.

File ini juga menyimpan fallback kategori jika API kategori OpenTDB gagal dimuat, serta daftar difficulty:

- Any Difficulty
- Easy
- Medium
- Hard

## Alur Aplikasi

```text
User membuka web
        |
        v
Splash screen logo Quizzy
        |
        v
Landing page
        |
        | Jika belum login
        v
Login page -> Google Login
        |
        v
Landing page setelah login
        |
        | Pilih kategori + difficulty
        v
Quiz page
        |
        | Jawab soal satu per satu / timer habis
        v
Result page
        |
        v
Review hasil, leaderboard, retry, logout
```

## Pemenuhan Kriteria Challenge

| Kriteria | Implementasi |
| --- | --- |
| Memiliki fitur login | Google Login via Firebase Authentication |
| API soal dari OpenTDB | Service `fetchQuestions` di `src/services/quizApi.js` |
| Jumlah dan type soal bebas | 10 soal per sesi, support multiple/boolean dari response API |
| Total soal dan jumlah dikerjakan ditampilkan | `QuizProgress` menampilkan progress jawaban |
| Memiliki timer | Timer 10 menit di `QuizContext` dan `useQuizSession` |
| Satu halaman satu soal | `QuizPage` render satu `currentQuestion` |
| Setelah memilih jawaban langsung pindah soal | `answerQuestion` langsung menaikkan `currentIndex` |
| Timer habis menampilkan hasil | `tickTimer` mengubah status menjadi `finished`, lalu route ke `/result` |
| Resume ketika browser ditutup | State quiz disimpan di `localStorage` dengan key `quiz_state` |
| Upload code di GitHub | Source code siap diupload ke repository GitHub |

## Struktur Folder

```text
src/
  assets/
  components/
    common/
    landing/
    login/
    quiz/
    result/
    home/
  config/
  context/
  hooks/
  pages/
  routes/
  services/
  utils/
  App.jsx
  firebase.js
  index.css
  main.jsx
```

## Penjelasan Folder

### `src/assets`

Menyimpan asset gambar dan logo.

- `logo_quizzy.png`: logo aplikasi untuk navbar, login, splash screen, favicon, dan footer.
- `hero1.jpg`: gambar utama untuk hero landing dan visual login.
- `hero.png`: asset lama yang masih ada, tetapi visual login terbaru menggunakan `hero1.jpg`.

### `src/components`

Berisi komponen UI yang dipakai berulang.

#### `components/common`

- `LoadingScreen.jsx`: splash/loading screen sederhana dengan logo Quizzy.

#### `components/landing`

- `LandingNavbar.jsx`: navbar landing, hanya menampilkan logo, menu, tombol login/start/logout.
- `LandingHero.jsx`: hero section, filter kategori, filter difficulty, card kategori, fitur, dan leaderboard.
- `LandingFooter.jsx`: footer sosial media: Instagram, LinkedIn, portfolio, dan GitHub.

#### `components/login`

- `LoginCard.jsx`: wrapper card login.
- `LoginHeader.jsx`: logo dan teks pembuka login.
- `LoginForm.jsx`: tombol Google Login.
- `LoginVisual.jsx`: gambar visual login menggunakan `hero1.jpg`.

#### `components/quiz`

- `QuizHeader.jsx`: header halaman quiz.
- `QuizProgress.jsx`: progress jumlah soal yang sudah dikerjakan dan timer.
- `QuizQuestion.jsx`: menampilkan satu soal aktif, kategori, difficulty, dan type.
- `QuizOptions.jsx`: pilihan jawaban.
- `QuizSessionContent.jsx`: layout utama halaman quiz.

#### `components/result`

- `ResultHeader.jsx`: header halaman hasil, tombol ulangi dan logout.
- `ResultScore.jsx`: ringkasan skor.
- `ResultStats.jsx`: statistik benar, salah, skipped, waktu.
- `ResultLeaderboard.jsx`: leaderboard dari Firestore.
- `ResultReview.jsx`: review per soal.

#### `components/home`

- `HomeDashboard.jsx`: komponen dashboard lama/opsional yang belum menjadi flow utama landing saat ini.

### `src/config`

Menyimpan konfigurasi aplikasi.

- `quizConfig.js`: jumlah soal, durasi quiz, fallback kategori, dan difficulty.
- `loginMedia.js`: mapping gambar untuk visual login.

### `src/context`

Menyimpan global state menggunakan React Context.

- `AuthContext.jsx`: mengelola user login, Google Sign-In, logout, dan loading auth Firebase.
- `QuizContext.jsx`: mengelola state quiz, mulai quiz, jawab soal, timer, finish quiz, localStorage, dan simpan leaderboard.
- `ToastContext.jsx`: sistem toast notifikasi custom.

### `src/hooks`

Berisi custom hook untuk memisahkan logic dari page.

- `useQuizSession.js`: logic halaman quiz, timer interval, redirect saat quiz selesai.
- `useResultPage.js`: logic halaman hasil, summary skor, retry, logout, dan leaderboard.

### `src/pages`

Berisi halaman utama aplikasi.

- `LandingPage.jsx`: halaman landing publik.
- `LoginPage.jsx`: halaman login Google.
- `QuizPage.jsx`: halaman pengerjaan quiz.
- `ResultPage.jsx`: halaman hasil quiz.

### `src/routes`

- `ProtectedRoute.jsx`: membatasi akses `/quiz` dan `/result` hanya untuk user login.

### `src/services`

Berisi komunikasi dengan API eksternal.

- `quizApi.js`: mengambil kategori dan soal dari OpenTDB.
- `leaderboardService.js`: menyimpan dan membaca leaderboard dari Firebase Firestore.

### `src/utils`

Berisi helper kecil.

- `decode.js`: decode HTML entity dari OpenTDB, misalnya `&quot;`.
- `shuffle.js`: mengacak pilihan jawaban.
- `historyUtils.js`: menyimpan riwayat quiz dan poin di localStorage.

## State Quiz

State utama quiz dikelola di [src/context/QuizContext.jsx](./src/context/QuizContext.jsx).

Contoh bentuk state:

```js
{
  sessionId: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  timeLeft: 0,
  totalTime: 0,
  endsAt: null,
  finishedAt: null,
  status: "idle",
  category: null,
  categoryId: null,
  difficulty: null,
  resultSaved: false,
  error: null,
}
```

Status quiz:

- `idle`: belum ada sesi.
- `loading`: sedang mengambil soal dari API.
- `active`: quiz sedang berjalan.
- `finished`: quiz selesai karena semua soal dijawab atau timer habis.

## Resume Quiz dengan localStorage

Setiap perubahan `quizState` disimpan ke `localStorage`:

```js
localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizState))
```

Saat aplikasi dibuka ulang, state dibaca kembali:

```js
const saved = localStorage.getItem(QUIZ_STORAGE_KEY)
```

Jika quiz masih aktif dan waktu belum habis, user bisa melanjutkan quiz. Jika waktu sudah habis, state otomatis diubah menjadi `finished`.

## Timer

Timer memakai kombinasi:

- `endsAt`: waktu akhir quiz dalam timestamp.
- `timeLeft`: sisa waktu dalam detik.
- `setInterval` di `useQuizSession`.

Dengan cara ini, timer tetap akurat walaupun browser di-refresh atau ditutup sementara.

## Sistem Jawaban

Saat user memilih jawaban:

1. Jawaban disimpan ke array `answers`.
2. Jika belum soal terakhir, `currentIndex` naik ke soal berikutnya.
3. Jika soal terakhir, status quiz berubah menjadi `finished`.
4. User diarahkan ke halaman result.

## Halaman Result

Halaman result menghitung:

- Jumlah benar.
- Jumlah salah.
- Jumlah skipped/tidak dijawab.
- Waktu yang digunakan.
- Total score.

Hasil juga disimpan ke:

- `localStorage` untuk riwayat lokal.
- Firestore untuk leaderboard global user login.

## Firebase

Firebase digunakan untuk:

- Google Authentication.
- Firestore leaderboard.

File konfigurasi ada di [src/firebase.js](./src/firebase.js).

Firestore collection yang digunakan:

```text
leaderboard
```

Data leaderboard disimpan per user dengan document id `user.uid`, sehingga total score dan jumlah quiz bisa diakumulasi.

## Toast Notification

Toast custom ada di [src/context/ToastContext.jsx](./src/context/ToastContext.jsx).

Toast muncul saat:

- Login berhasil.
- Login gagal.
- Quiz berhasil dimulai.
- Quiz gagal dimulai.
- Quiz selesai dikerjakan.

## Cara Menjalankan Project

### 1. Clone repository

```bash
git clone https://github.com/rulifcode/quiz-app.git
cd quiz-app
```

### 2. Install dependency

```bash
npm install
```

### 3. Jalankan development server

```bash
npm run dev
```

Lalu buka URL dari Vite, biasanya:

```text
http://localhost:5173/
```

### 4. Build production

```bash
npm run build
```

### 5. Preview build

```bash
npm run preview
```

## Script NPM

| Script | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan development server |
| `npm run build` | Membuat build production |
| `npm run lint` | Mengecek kualitas kode dengan ESLint |
| `npm run preview` | Preview hasil build production |

## Author

Rulif Adrian

- Instagram: https://www.instagram.com/ruliffadrian/
- LinkedIn: https://www.linkedin.com/in/ruliffadrian/
- Portfolio: http://rulifweb.vercel.app/
- GitHub: https://github.com/rulifcode
