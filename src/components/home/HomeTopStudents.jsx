import { useAuth } from "../../context/AuthContext"
import { getPoints } from "../../utils/historyUtils"

const DUMMY = [
  { name: "Alex John", subject: "Science", points: 950 },
  { name: "Emma Watson", subject: "Mathematics", points: 920 },
  { name: "Michael Clark", subject: "Physics", points: 980 },
  { name: "Sophia Green", subject: "English", points: 890 },
  { name: "Lucia Wilde", subject: "Science", points: 870 },
]

export default function HomeTopStudents() {
  const { user } = useAuth()
  const myPoints = getPoints()

  const students = [
    { name: user?.displayName ?? "You", subject: "Computer Science", points: myPoints, isMe: true },
    ...DUMMY,
  ]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5)

  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-5 w-72">
      <h2 className="text-white font-bold text-base mb-1">Top Students</h2>
      <p className="text-gray-500 text-xs mb-5">Students with highest quiz scores</p>
      <div className="flex flex-col gap-4">
        {students.map((student, i) => (
          <div key={student.name} className="flex items-center gap-3">
            <span className="text-gray-500 text-xs w-4">{i + 1}</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {student.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${student.isMe ? "text-purple-400" : "text-white"}`}>
                {student.name}
              </p>
              <p className="text-gray-500 text-xs">{student.subject}</p>
            </div>
            <div className="flex items-center gap-1 text-orange-400 text-xs font-bold">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {student.points}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}