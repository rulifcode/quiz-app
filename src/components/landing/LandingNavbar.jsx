export default function LandingNavbar({ onSignIn }) {
  return (
    <nav className="flex items-center justify-between px-10 py-5">
      <span className="text-purple-400 font-bold text-xl tracking-tight">Quizzy</span>
      <div className="flex items-center gap-8 text-sm text-gray-400">
        {["Quiz", "Weekly Quiz", "Rewards", "About"].map((item) => (
          <span key={item} className="hover:text-white cursor-pointer transition-colors">
            {item}
          </span>
        ))}
      </div>
      <button
        onClick={onSignIn}
        className="border border-white/20 text-white text-sm px-5 py-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        Sign In
      </button>
    </nav>
  )
}