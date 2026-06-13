export const QUIZ_AMOUNT = 10
export const QUIZ_DURATION_SECONDS = 10 * 60

export const QUIZ_CATEGORIES = [
  { label: "Random", description: "Campuran soal dari berbagai kategori.", categoryId: null },
  { label: "General Knowledge", description: "Pengetahuan umum untuk pemanasan.", categoryId: 9 },
  { label: "Science & Nature", description: "Sains, alam, dan konsep dasar.", categoryId: 17 },
  { label: "Science: Computers", description: "Teknologi, komputer, dan internet.", categoryId: 18 },
  { label: "Geography", description: "Negara, kota, peta, dan dunia.", categoryId: 22 },
  { label: "History", description: "Peristiwa dan tokoh bersejarah.", categoryId: 23 },
  { label: "Sports", description: "Olahraga dan kompetisi populer.", categoryId: 21 },
  { label: "Entertainment", description: "Film, musik, game, dan budaya pop.", categoryId: 11 },
]

export const QUIZ_DIFFICULTIES = [
  { label: "Any Difficulty", value: null, description: "Campuran level soal dari API." },
  { label: "Easy", value: "easy", description: "Soal ringan untuk pemanasan." },
  { label: "Medium", value: "medium", description: "Tantangan seimbang untuk latihan." },
  { label: "Hard", value: "hard", description: "Level sulit untuk uji kemampuan." },
]
