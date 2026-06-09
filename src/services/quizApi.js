import { shuffleArray } from "../utils/shuffle"

const BASE_URL = "https://opentdb.com/api.php"

export const fetchQuestions = async (amount = 10, difficulty = "medium", type = "multiple", categoryId = null) => {
  let url = `${BASE_URL}?amount=${amount}&difficulty=${difficulty}&type=${type}`
  if (categoryId) url += `&category=${categoryId}`

  const response = await fetch(url)
  if (!response.ok) throw new Error("Gagal mengambil soal dari server")

  const data = await response.json()
  if (data.response_code !== 0) throw new Error("Gagal mengambil soal, coba lagi nanti")

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