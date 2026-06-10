import { collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, increment } from "firebase/firestore"
import { db } from "../firebase"

const LEADERBOARD_COLLECTION = "leaderboard"

export const recordLeaderboardScore = async ({ user, score, total, category }) => {
  if (!user) return

  const leaderboardRef = doc(db, LEADERBOARD_COLLECTION, user.uid)

  await setDoc(
    leaderboardRef,
    {
      userId: user.uid,
      displayName: user.displayName || "Quiz Player",
      email: user.email || "",
      photoURL: user.photoURL || "",
      totalScore: increment(score),
      quizzesTaken: increment(1),
      lastScore: score,
      lastTotal: total,
      lastCategory: category,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

export const subscribeLeaderboard = (callback, limitCount = 9) => {
  const leaderboardQuery = query(
    collection(db, LEADERBOARD_COLLECTION),
    orderBy("totalScore", "desc"),
    limit(limitCount)
  )

  return onSnapshot(leaderboardQuery, (snapshot) => {
    const entries = snapshot.docs.map((entry) => ({
      id: entry.id,
      ...entry.data(),
    }))
    callback(entries)
  })
}