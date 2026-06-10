import LandingNavbar from "../components/landing/LandingNavbar"
import LandingHero from "../components/landing/LandingHero"
import { Atom, Dna, FlaskConical, Globe, LayoutDashboard, Sigma } from "lucide-react"

const CATEGORY_CARDS = [
  {
    name: "Science & Tech",
    accent: "bg-white/5 ring-white/10",
    icon: Atom,
  },
  {
    name: "Mathematics",
    accent: "bg-white/5 ring-white/10",
    icon: Sigma,
  },
  {
    name: "Chemistry",
    accent: "bg-white/5 ring-white/10",
    icon: FlaskConical,
  },
  {
    name: "Biology",
    accent: "bg-white/5 ring-white/10",
    icon: Dna,
  },
  {
    name: "General Knowledge",
    accent: "bg-white/5 ring-white/10",
    icon: LayoutDashboard,
  },
  {
    name: "Current Affairs",
    accent: "bg-white/5 ring-white/10",
    icon: Globe,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#2f9df4] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-300 rounded-[2.5rem] bg-[#f8fbff] p-3 shadow-[0_28px_80px_rgba(16,80,150,0.16)] sm:p-4">
        <div className="rounded-4xl bg-[#f8fbff] text-slate-900">
        <LandingNavbar />
        <LandingHero />

        <main className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["10 min", "fast session timer"],
              ["6", "quiz categories ready"],
              ["5", "history items stored"],
              ["100%", "mobile friendly"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <p className="text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
                <p className="mt-2 text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </section>

          <section id="categories" className="mt-24">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Categories</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Explore Quiz Categories
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                  Choose a topic that fits your mood, then jump straight into the quiz with the same API-backed question set.
                </p>
              </div>
              <button className="self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                View all categories
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {CATEGORY_CARDS.map((card) => (
                <article key={card.name} className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ring-inset ${card.accent}`}>
                        <card.icon className="h-6 w-6 text-slate-700" strokeWidth={2.2} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{card.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Pick this category to get a focused set of multiple-choice questions.
                      </p>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                      10 Qs
                    </span>
                  </div>
                  <button className="mt-6 text-sm font-medium text-[#2f9df4] transition-colors group-hover:text-[#228fee]">
                    Start quiz
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section id="why" className="mt-24">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Why Quizzy</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Built for momentum</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                The experience stays focused on the quiz itself: direct sign in, fast question loading, and a clean flow from landing to result.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                ["Personalized Learning", "Quickly jump into a category that fits your current focus."],
                ["Reward System", "Keep score history and cumulative points across sessions."],
                ["Teacher Friendly", "Shareable quiz structure with a clean classroom-style flow."],
                ["Progress Tracking", "Persist quiz state on refresh so the session can continue."],
                ["Competitive Leaderboards", "Built around repeat sessions and improving score streaks."],
                ["Mobile Ready", "Responsive layouts that stay usable on smaller screens."],
              ].map(([title, body]) => (
                <article key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                  <div className="mb-4 h-11 w-11 rounded-2xl bg-[#2f9df4]/10" />
                  <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-24 overflow-hidden rounded-4xl bg-[#2f9df4] p-8 text-white md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">Ready to start</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Quiz journey on one click.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
                  Sign in with Google, then go straight into the quiz. No dashboard detour, no extra menu layers.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                  >
                    Back to top
                  </button>
                  <button
                    onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    className="rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Browse categories
                  </button>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Flow</p>
                <div className="mt-5 space-y-4 text-sm font-medium text-slate-700">
                  {[
                    "Landing page",
                    "Google sign in",
                    "Start quiz immediately",
                    "Finish and review",
                  ].map((step, index) => (
                    <div key={step} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2f9df4] text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer id="footer" className="border-t border-slate-200 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-xl font-black tracking-tight text-slate-900">
                Quizzy
              </p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
                A focused quiz app with Firebase sign in and API-backed questions, built to keep the path short from landing to play.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-500 md:justify-end">
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2">React + Vite</span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Firebase Auth</span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Open Trivia API</span>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </div>
  )
}