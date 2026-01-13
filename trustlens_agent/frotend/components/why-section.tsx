import { ShieldAlert, Users, TrendingDown } from "lucide-react"

const reasons = [
  {
    icon: ShieldAlert,
    title: "Stop Fake Volume",
    stats: "82% of NFT volume is wash trading",
    description: "Neural Scanner filters bot loops and identifies artificial trading activity.",
  },
  {
    icon: Users,
    title: "Spot Wallet Collusion",
    stats: "Detect coordinated pump/dumps",
    description: "6 AI agents analyze behavior patterns across wallet networks.",
  },
  {
    icon: TrendingDown,
    title: "Avoid Overpaid Entries",
    stats: "Confidence price bands",
    description: "Global trust score 0-100 tells you when floor prices are artificially elevated.",
  },
]

export function WhySection() {
  return (
    <section id="why" className="py-24 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#f5f7ff] mb-4">Why NFT Traders Use TrustLens X</h2>
          <p className="text-[#9ca6c8] max-w-2xl mx-auto">Make informed decisions with data-driven trust analysis</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="relative bg-[#0a0f1e] rounded-xl p-6 border border-[#1e2842] hover:border-[#00d4ff]/50 transition-all group"
            >
              {/* Top cyan bar - exact spec styling */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#00d4ff] rounded-t-xl" />

              {/* Icon pill */}
              <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 flex items-center justify-center mb-4 group-hover:bg-[#00d4ff]/20 transition-colors">
                <reason.icon className="w-6 h-6 text-[#00d4ff]" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[#f5f7ff] mb-2">{reason.title}</h3>
              <p className="text-sm text-[#00d4ff] font-mono mb-2">{reason.stats}</p>
              <p className="text-[#9ca6c8] leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
