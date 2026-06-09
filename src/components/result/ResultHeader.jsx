export default function ResultHeader({ onRetry, onLogout }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-xl font-bold text-gray-800">Hasil Kuis</h1>
      <div className="flex gap-2">
        <button
          onClick={onRetry}
          className="text-sm px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Ulangi
        </button>
        <button
          onClick={onLogout}
          className="text-sm px-4 py-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          Keluar
        </button>
      </div>
    </div>
  )
}