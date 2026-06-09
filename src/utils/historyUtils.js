const HISTORY_KEY = "quiz_history"
const POINTS_KEY = "quiz_points"

export const saveHistory = (category, score, total) => {
  const history = getHistory()
  const newEntry = {
    id: Date.now(),
    category,
    score,
    total,
    date: new Date().toISOString(),
  }
  const updated = [newEntry, ...history].slice(0, 5)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))

  // akumulasi poin
  const prev = getPoints()
  localStorage.setItem(POINTS_KEY, prev + score)
}

export const getHistory = () => {
  const saved = localStorage.getItem(HISTORY_KEY)
  return saved ? JSON.parse(saved) : []
}

export const getPoints = () => {
  const saved = localStorage.getItem(POINTS_KEY)
  return saved ? parseInt(saved) : 0
}