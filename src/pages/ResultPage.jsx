import useResultPage from "../hooks/useResultPage"
import ResultHeader from "../components/result/ResultHeader"
import ResultScore from "../components/result/ResultScore"
import ResultStats from "../components/result/ResultStats"
import ResultReview from "../components/result/ResultReview"
import ResultLeaderboard from "../components/result/ResultLeaderboard"

export default function ResultPage() {
  const { handleHome, handleLogout, handleRetry, leaderboard, quizState, summary } = useResultPage()
  const { questions, answers } = quizState

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <ResultHeader onRetry={handleRetry} onLogout={handleLogout} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <section className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <ResultScore correct={summary.correct} total={questions.length} />
              <ResultStats
                correct={summary.correct}
                wrong={summary.wrong}
                skipped={summary.skipped}
                timeUsed={summary.timeUsed}
              />
            </div>

            <ResultLeaderboard entries={leaderboard} />
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <ResultReview questions={questions} answers={answers} />
          </section>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleRetry}
            className="rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Ulangi Quiz
          </button>
          <button
            onClick={handleHome}
            className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Kembali ke Beranda
          </button>
        </div>
      </main>
    </div>
  )
}
