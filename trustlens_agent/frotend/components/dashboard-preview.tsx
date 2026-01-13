"use client"

import { useEffect, useState } from "react"

export function DashboardPreview() {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= 24) {
            clearInterval(interval)
            return 24
          }
          return prev + 1
        })
      }, 30)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[#00d4ff]/20 rounded-2xl blur-3xl animate-subtle-pulse" />

      {/* Dashboard mock */}
      <div className="relative bg-[#0a0f1e]/80 backdrop-blur-sm rounded-2xl border border-[#1e2842] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#9ca6c8] tracking-wider">NEURAL SCANNER · NFT SECURITY V1.0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-[#00d4ff]/20 text-[#00d4ff] text-xs font-mono">LIVE</span>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1E2842" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#00D4FF"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${animatedScore * 2.83} ${100 * 2.83}`}
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#f5f7ff] font-mono">{animatedScore}</span>
              <span className="text-xs text-[#9ca6c8] mt-1">GLOBAL TRUST</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono mt-1">
                LOW RISK
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MetricCard label="Price Integrity" score={92} status="excellent" />
          <MetricCard label="Wallet Behavior" score={78} status="moderate" />
          <MetricCard label="Volume Auth" score={65} status="caution" />
          <MetricCard label="Manipulation" score={24} status="low-risk" />
        </div>

        {/* Verdict */}
        <div className="mt-4 p-3 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#f5f7ff]">
            <span className="text-[#00d4ff] font-semibold">Verdict:</span> Low manipulation risk detected. Healthy
            trading patterns observed.
          </p>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, score, status }: { label: string; score: number; status: string }) {
  const getStatusColor = () => {
    switch (status) {
      case "excellent":
        return { bar: "bg-[#00d4ff]", border: "border-t-[#00d4ff]" }
      case "moderate":
        return { bar: "bg-[#f5c518]", border: "border-t-[#f5c518]" }
      case "caution":
        return { bar: "bg-orange-500", border: "border-t-orange-500" }
      case "low-risk":
        return { bar: "bg-emerald-500", border: "border-t-emerald-500" }
      default:
        return { bar: "bg-[#00d4ff]", border: "border-t-[#00d4ff]" }
    }
  }

  const styles = getStatusColor()

  return (
    <div className={`bg-[#0a0f1e] rounded-lg p-3 border-t-2 ${styles.border}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#9ca6c8]">{label}</span>
        <span className="text-sm font-mono font-semibold text-[#f5f7ff]">{score}/100</span>
      </div>
      <div className="h-1.5 bg-[#1E2842] rounded-full overflow-hidden">
        <div
          className={`h-full ${styles.bar} rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
