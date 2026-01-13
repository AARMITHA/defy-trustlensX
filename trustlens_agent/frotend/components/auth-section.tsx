"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, Mail, Eye, EyeOff, Shield } from "lucide-react"

export function AuthSection() {
  const [activeTab, setActiveTab] = useState<"signup" | "login">("login")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section id="auth-section" className="py-24 bg-gradient-to-b from-[#050814] to-[#0b1020]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Card */}
          <div className="bg-[#0a0f1e] rounded-2xl p-8 border border-[#1e2842] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#00d4ff]" />

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-[#050814] rounded-lg mb-8">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all relative ${
                  activeTab === "login" ? "bg-[#00d4ff] text-[#050814]" : "text-[#00d4ff] hover:bg-[#00d4ff]/10"
                }`}
              >
                Log in
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all relative ${
                  activeTab === "signup" ? "bg-[#00d4ff] text-[#050814]" : "text-[#00d4ff] hover:bg-[#00d4ff]/10"
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-[#f5f7ff] mb-2">
              {activeTab === "signup" ? "Create TrustLens Account" : "Welcome back"}
            </h2>
            <p className="text-[#9ca6c8] mb-8">
              {activeTab === "signup"
                ? "Save scans, export PDF reports, sync portfolio"
                : "Sign in to access your dashboard and saved scans."}
            </p>

            {/* Form */}
            {activeTab === "signup" ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#f5f7ff]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="bg-[#050814] border-[#1e2842] text-[#f5f7ff] placeholder:text-[#9ca6c8]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-[#f5f7ff]">
                    Username <span className="text-[#9ca6c8]">(optional)</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="satoshi"
                    className="bg-[#050814] border-[#1e2842] text-[#f5f7ff] placeholder:text-[#9ca6c8]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#f5f7ff]">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-[#050814] border-[#1e2842] text-[#f5f7ff] placeholder:text-[#9ca6c8]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca6c8] hover:text-[#f5f7ff]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-[#00d4ff] text-[#050814] hover:bg-[#00d4ff]/90 gap-2 font-medium glow-cyan">
                  <Wallet className="w-4 h-4" />
                  Continue with Shardeum Wallet
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 gap-2 bg-transparent"
                >
                  <Mail className="w-4 h-4" />
                  Use Email Instead
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-[#f5f7ff]">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    className="bg-[#050814] border-[#1e2842] text-[#f5f7ff] placeholder:text-[#9ca6c8]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20"
                  />
                </div>

                <Button className="w-full bg-[#00d4ff] text-[#050814] hover:bg-[#00d4ff]/90 gap-2 font-medium glow-cyan">
                  <Wallet className="w-4 h-4" />
                  Connect wallet
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 gap-2 bg-transparent"
                >
                  <Mail className="w-4 h-4" />
                  Continue with email
                </Button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[#1e2842]">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-[#00d4ff]" />
                <span className="text-sm text-[#00d4ff] font-mono">Data secured on Shardeum blockchain</span>
              </div>
              <p className="text-xs text-[#9ca6c8]/70 text-center">
                By continuing, you agree to our{" "}
                <a href="#" className="text-[#00d4ff] hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#00d4ff] hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
