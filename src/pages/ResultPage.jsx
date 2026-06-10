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
    <div className="min-h-screen bg-[#2f9df4] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-300 rounded-[2.5rem] bg-[#f8fbff] p-3 shadow-[0_28px_80px_rgba(16,80,150,0.16)] sm:p-4">
        <div className="rounded-4xl bg-[#f8fbff] text-slate-900">
          <ResultHeader onRetry={handleRetry} onLogout={handleLogout} />

          <main className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pt-8">
            <div className="space-y-6">
              <ResultLeaderboard entries={leaderboard} />

              <section className="rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-6">
                <ResultScore correct={summary.correct} total={questions.length} />
                <ResultStats
                  correct={summary.correct}
                  wrong={summary.wrong}
                  skipped={summary.skipped}
                  timeUsed={summary.timeUsed}
                />
              </section>

              <section className="rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-6">
                <ResultReview
                  questions={questions}
                  answers={answers}
                />
              </section>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleRetry}
                className="w-full rounded-xl bg-[#2f9df4] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#228fee]"
              >
                Ulangi Quiz
              </button>
              <button
                onClick={handleHome}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Kembali ke Landing
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}