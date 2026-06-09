const EVENTS = [
  { title: "Science Mid-term Quiz", time: "Today, 2:30 PM", participants: 32, live: true },
  { title: "Mathematics Weekly Test", time: "Tomorrow, 10:00 AM", participants: 28, live: false },
  { title: "History Final Exam", time: "May 20, 9:00 AM", participants: 45, live: false },
]

export default function HomeRecentEvents() {
  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-5 flex-1">
      <h2 className="text-white font-bold text-base mb-1">Recent Events</h2>
      <p className="text-gray-500 text-xs mb-5">Manage your upcoming and active quiz events</p>
      <div className="flex flex-col gap-4">
        {EVENTS.map((event) => (
          <div key={event.title} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{event.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-gray-500 text-xs">{event.time}</span>
                  <span className="text-gray-500 text-xs">{event.participants} participants</span>
                </div>
              </div>
            </div>
            {event.live ? (
              <button className="bg-purple-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-purple-700 transition-colors">
                View Live
              </button>
            ) : (
              <button className="border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                Manage
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}