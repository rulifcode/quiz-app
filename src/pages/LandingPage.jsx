import LandingNavbar from "../components/landing/LandingNavbar"
import LandingHero from "../components/landing/LandingHero"
import LandingFooter from "../components/landing/LandingFooter"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <LandingNavbar />
      <LandingHero />
      <LandingFooter />
    </div>
  )
}
