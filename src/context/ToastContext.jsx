import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react"

const ToastContext = createContext(null)

const toastStyles = {
  success: {
    icon: CircleCheck,
    className: "border-emerald-200 bg-white text-emerald-700",
    iconClassName: "text-emerald-600",
  },
  error: {
    icon: CircleX,
    className: "border-rose-200 bg-white text-rose-700",
    iconClassName: "text-rose-600",
  },
  warning: {
    icon: CircleAlert,
    className: "border-amber-200 bg-white text-amber-700",
    iconClassName: "text-amber-600",
  },
  info: {
    icon: Info,
    className: "border-sky-200 bg-white text-sky-700",
    iconClassName: "text-sky-600",
  },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    ({ title, message, type = "info", duration = 3600 }) => {
      const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
      setToasts((current) => [...current, { id, title, message, type }].slice(-4))

      window.setTimeout(() => dismissToast(id), duration)
      return id
    },
    [dismissToast]
  )

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-5 sm:top-5">
        {toasts.map((toast) => {
          const style = toastStyles[toast.type] ?? toastStyles.info
          const Icon = style.icon

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-xl shadow-slate-950/10 ${style.className}`}
              role="status"
            >
              <Icon size={20} className={`mt-0.5 shrink-0 ${style.iconClassName}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-950">{toast.title}</p>
                {toast.message ? <p className="mt-1 text-sm leading-5 text-slate-600">{toast.message}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Tutup notifikasi"
              >
                <X size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast harus digunakan di dalam ToastProvider")
  return context
}
