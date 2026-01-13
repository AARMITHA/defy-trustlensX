import { Button } from "@/components/ui/button"
import { DashboardPreview } from "@/components/dashboard-preview"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d4ff]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-xs text-[#00d4ff] font-mono">
                NFT Trust Engine
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-xs text-[#00d4ff] font-mono">
                Multi-Chain
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-xs text-[#00d4ff] font-mono">
                AI Powered
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[48px] font-semibold leading-tight text-[#f5f7ff] text-balance">
              Trust Scores for NFTs, Not Just Floor Prices
            </h1>

            <p className="text-xl text-[#9ca6c8] max-w-[520px] leading-relaxed">
              Neural Scanner detects wallet collusion, fake volume, and manipulation signals
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#00d4ff] text-[#050814] hover:bg-[#00d4ff]/90 gap-2 font-medium glow-cyan"
              >
                Start Free Scan
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff] gap-2 bg-transparent"
              >
                <Play className="w-4 h-4" />
                View Demo
              </Button>
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="relative lg:pl-8">
            <DashboardPreview />
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2842] to-transparent" />
    </section>
  )
}
