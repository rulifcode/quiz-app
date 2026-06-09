export default function LandingHero({ onSignIn }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-32">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 text-xs px-4 py-2 rounded-full mb-8">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
        The ultimate quiz experience
      </div>

      <h1 className="text-5xl font-bold text-white leading-tight mb-6 max-w-2xl">
        Learn, Quiz,{" "}
        <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Earn Rewards
        </span>
      </h1>

      <p className="text-gray-400 text-base max-w-lg leading-relaxed mb-10">
        Join thousands of students and teachers on the ultimate quiz platform.
        Test your knowledge, compete with peers, and win exciting rewards.
      </p>

      <div className="flex items-center gap-4 mb-12">
        <button
          onClick={onSignIn}
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-sm font-semibold px-7 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Get Started
        </button>
        <button
          onClick={onSignIn}
          className="border border-white/20 text-white text-sm font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          Explore Quizzes
        </button>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {[1,2,3,4].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-black" />
          ))}
        </div>
        <p className="text-sm text-gray-400">
          <span className="text-purple-400 font-semibold">5,000+</span> students joined this week
        </p>
      </div>
    </div>
  )
}