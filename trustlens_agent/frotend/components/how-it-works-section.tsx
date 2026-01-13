"use client"

import { useState } from "react"
import { Brain, Shield, FlaskConical, FileText, Settings } from "lucide-react"

const steps = [
  {
    number: "1",
    title: "You paste an NFT or collection.",
    description: "Enter any NFT contract address or collection URL to begin analysis.",
  },
  {
    number: "2",
    title: "Agents score price integrity, wallet behavior, and volume authenticity.",
    description: "Our multi-agent engine analyzes on-chain data across multiple dimensions.",
  },
  {
    number: "3",
    title: "You get a single trust score and a plain-language verdict.",
    description: "Receive actionable insights with clear explanations, not just numbers.",
  },
]

const sidebarItems = [
  { icon: Brain, label: "Neural Scanner", active: true },
  { icon: Shield, label: "Security Lab", active: false },
  { icon: FlaskConical, label: "Synth Engine", active: false },
  { icon: FileText, label: "Compliance Report", active: false },
  { icon: Settings, label: "Settings", active: false, bottom: true },
]

const agents = [
  {
    label: "Price Integrity",
    score: 92,
    description: "Checks volatility, floor depth, and buy wall power.",
    status: "healthy",
  },
  {
    label: "Wallet Behavior",
    score: 78,
    description: "Analyzes holder distribution and transaction patterns.",
    status: "moderate",
  },
  {
    label: "Volume Authenticity",
    score: 65,
    description: "Detects wash trading and artificial volume inflation.",
    status: "caution",
  },
  {
    label: "Manipulation Signal",
    score: 24,
    scoreLabel: "LOW RISK",
    description: "Identifies coordinated pumps and suspicious activity.",
    status: "low-risk",
  },
]

export function HowItWorksSection() {
  const [activeNav, setActiveNav] = useState("Neural Scanner")

  return (
    <section id="how" className="py-24 bg-[#050814]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#f5f7ff] mb-4 text-center lg:text-left">
          Multi-Agent Trust Engine
        </h2>
        <p className="text-[#9ca6c8] mb-12 text-center lg:text-left">
          Three simple steps to understand any NFT&apos;s true market health.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:flex flex-col w-56 bg-[#0a0f1e] rounded-xl border border-[#1e2842] p-3">
            <div className="flex-1 space-y-1">
              {sidebarItems
                .filter((item) => !item.bottom)
                .map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveNav(item.label)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeNav === item.label
                        ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30"
                        : "text-[#9ca6c8] hover:text-[#f5f7ff] hover:bg-[#1e2842]/50"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
            </div>
            {/* Settings at bottom */}
            <div className="mt-auto pt-4 border-t border-[#1e2842]">
              {sidebarItems
                .filter((item) => item.bottom)
                .map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveNav(item.label)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#9ca6c8] hover:text-[#f5f7ff] hover:bg-[#1e2842]/50 transition-all"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Steps */}
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00d4ff]/20 flex items-center justify-center">
                      <span className="text-[#00d4ff] font-semibold font-mono">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#f5f7ff] mb-1">{step.title}</h3>
                      <p className="text-[#9ca6c8]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Agent Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {agents.map((agent, index) => (
                  <AgentCard key={index} {...agent} />
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1E2842" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#00D4FF"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${24 * 2.83} ${100 * 2.83}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[#f5f7ff] font-mono">24</span>
                  <span className="text-[10px] text-[#9ca6c8]">/100</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <span className="text-[#f5f7ff] font-semibold">Global Trust Score: </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono">
                  LOW RISK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AgentCard({
  label,
  score,
  scoreLabel,
  description,
  status,
}: {
  label: string
  score: number
  scoreLabel?: string
  description: string
  status: string
}) {
  const getStatusStyles = () => {
    switch (status) {
      case "healthy":
        return { barColor: "bg-[#00d4ff]", pillBg: "bg-[#00d4ff]/20", pillText: "text-[#00d4ff]" }
      case "moderate":
        return { barColor: "bg-[#f5c518]", pillBg: "bg-[#f5c518]/20", pillText: "text-[#f5c518]" }
      case "caution":
        return { barColor: "bg-orange-500", pillBg: "bg-orange-500/20", pillText: "text-orange-500" }
      case "low-risk":
        return { barColor: "bg-emerald-500", pillBg: "bg-emerald-500/20", pillText: "text-emerald-500" }
      default:
        return { barColor: "bg-[#00d4ff]", pillBg: "bg-[#00d4ff]/20", pillText: "text-[#00d4ff]" }
    }
  }

  const styles = getStatusStyles()

  return (
    <div className="bg-[#0a0f1e] rounded-xl p-4 border border-[#1e2842] hover:border-[#00d4ff]/30 transition-colors relative overflow-hidden">
      {/* Top cyan bar */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] ${styles.barColor}`} />

      {/* Circular progress */}
      <div className="flex justify-center mb-3">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#1E2842" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={
                status === "healthy"
                  ? "#00d4ff"
                  : status === "moderate"
                    ? "#f5c518"
                    : status === "caution"
                      ? "#f97316"
                      : "#22c55e"
              }
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${score * 2.64} ${100 * 2.64}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-[#f5f7ff] font-mono">{score}</span>
          </div>
        </div>
      </div>

      <h4 className="font-semibold text-[#f5f7ff] text-center text-sm mb-1">{label}</h4>

      {scoreLabel ? (
        <div className="flex justify-center mb-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${styles.pillBg} ${styles.pillText}`}>
            {scoreLabel}
          </span>
        </div>
      ) : (
        <p className="text-center text-xs text-[#9ca6c8] font-mono mb-2">{score}/100</p>
      )}

      <p className="text-xs text-[#9ca6c8] text-center">{description}</p>
    </div>
  )
}
