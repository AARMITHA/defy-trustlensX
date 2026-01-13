import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhySection } from "@/components/why-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { AuthSection } from "@/components/auth-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <WhySection />
      <HowItWorksSection />
      <AuthSection />
      <Footer />
    </main>
  )
}
