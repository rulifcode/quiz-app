import { Camera, Code, ExternalLink, Globe, Network } from "lucide-react"
import logoQuizzy from "../../assets/logo_quizzy.png"

const socialLinks = [
  {
    label: "Instagram",
    value: "@ruliffadrian",
    href: "https://www.instagram.com/ruliffadrian/",
    icon: Camera,
  },
  {
    label: "LinkedIn",
    value: "ruliffadrian",
    href: "https://www.linkedin.com/in/ruliffadrian/",
    icon: Network,
  },
  {
    label: "Portfolio",
    value: "rulifweb.vercel.app",
    href: "http://rulifweb.vercel.app/",
    icon: Globe,
  },
  {
    label: "GitHub",
    value: "rulifcode",
    href: "https://github.com/rulifcode",
    icon: Code,
  },
]

export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <img src={logoQuizzy} alt="Quizzy" className="h-14 w-auto object-contain" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Quizzy dibuat sebagai pengalaman kuis yang ringan, modern, dan langsung terhubung ke OpenTDB.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-md hover:shadow-slate-200/70"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-sky-700 ring-1 ring-slate-200 group-hover:bg-sky-600 group-hover:text-white">
                    <item.icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-950">{item.label}</span>
                    <span className="block truncate text-sm text-slate-500">{item.value}</span>
                  </span>
                </span>
                <ExternalLink size={16} className="shrink-0 text-slate-400 group-hover:text-sky-600" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
