"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToAuth = () => {
    document.getElementById("auth-section")?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#050814]/90 backdrop-blur-md border-b border-[#1e2842]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <span className="font-semibold text-lg text-[#f5f7ff] group-hover:text-[#00d4ff] transition-colors relative">
              TrustLens X
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00d4ff] group-hover:w-full transition-all duration-300" />
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#hero" className="text-[#9ca6c8] hover:text-[#f5f7ff] transition-colors text-sm">
              Overview
            </Link>
            <Link href="#why" className="text-[#9ca6c8] hover:text-[#f5f7ff] transition-colors text-sm">
              Why TrustLens
            </Link>
            <Link href="#how" className="text-[#9ca6c8] hover:text-[#f5f7ff] transition-colors text-sm">
              How It Works
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToAuth}
              className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff] bg-transparent glow-cyan"
            >
              Log in
            </Button>
            <Button
              size="sm"
              onClick={scrollToAuth}
              className="bg-[#00d4ff] text-[#050814] hover:bg-[#00d4ff]/90 font-medium glow-cyan"
            >
              Sign up
            </Button>
          </div>

          <button className="md:hidden text-[#f5f7ff] p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#050814]/95 backdrop-blur-md border-b border-[#1e2842] py-4">
            <nav className="flex flex-col gap-4 px-4">
              <Link
                href="#hero"
                className="text-[#9ca6c8] hover:text-[#f5f7ff] transition-colors text-sm py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Overview
              </Link>
              <Link
                href="#why"
                className="text-[#9ca6c8] hover:text-[#f5f7ff] transition-colors text-sm py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Why TrustLens
              </Link>
              <Link
                href="#how"
                className="text-[#9ca6c8] hover:text-[#f5f7ff] transition-colors text-sm py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollToAuth}
                  className="flex-1 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10 bg-transparent"
                >
                  Log in
                </Button>
                <Button
                  size="sm"
                  onClick={scrollToAuth}
                  className="flex-1 bg-[#00d4ff] text-[#050814] hover:bg-[#00d4ff]/90 font-medium"
                >
                  Sign up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
