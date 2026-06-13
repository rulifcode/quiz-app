import { shuffleArray } from "../utils/shuffle"

const BASE_URL = "https://opentdb.com/api.php"
const CATEGORY_URL = "https://opentdb.com/api_category.php"

const RESPONSE_MESSAGES = {
  1: "Soal untuk filter ini tidak cukup. Coba kategori atau level lain.",
  2: "Filter kuis tidak valid. Coba pilih ulang kategori atau level.",
  3: "Token sesi OpenTDB tidak ditemukan.",
  4: "Token sesi OpenTDB sudah habis.",
  5: "OpenTDB sedang membatasi request. Tunggu sekitar 5 detik lalu coba lagi.",
}

export const fetchCategories = async () => {
  const response = await fetch(CATEGORY_URL)
  if (!response.ok) throw new Error("Gagal mengambil kategori dari OpenTDB")

  const data = await response.json()
  if (!Array.isArray(data.trivia_categories)) throw new Error("Format kategori OpenTDB tidak valid")

  return [
    { label: "Random", description: "Campuran soal dari berbagai kategori.", categoryId: null },
    ...data.trivia_categories.map((category) => ({
      label: category.name,
      description: `Soal dari kategori ${category.name}.`,
      categoryId: category.id,
    })),
  ]
}

export const fetchQuestions = async ({ amount = 10, difficulty = null, type = null, categoryId = null } = {}) => {
  const params = new URLSearchParams({ amount: String(amount) })
  if (difficulty) params.set("difficulty", difficulty)
  if (type) params.set("type", type)
  if (categoryId) params.set("category", String(categoryId))

  const url = `${BASE_URL}?${params.toString()}`
  const response = await fetch(url)
  if (!response.ok) throw new Error("Gagal mengambil soal dari server")

  const data = await response.json()
  if (data.response_code !== 0) {
    throw new Error(RESPONSE_MESSAGES[data.response_code] ?? "Gagal mengambil soal, coba lagi nanti")
  }

  return data.results.map((item, index) => ({
    id: index,
    question: item.question,
    correct_answer: item.correct_answer,
    answers: shuffleArray([...item.incorrect_answers, item.correct_answer]),
    category: item.category,
    difficulty: item.difficulty,
    type: item.type,
  }))
}
