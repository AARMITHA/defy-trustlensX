import Link from "next/link"
import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 bg-[#050814] border-t border-[#1e2842]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <span className="font-semibold text-[#f5f7ff] group-hover:text-[#00d4ff] transition-colors">
              TrustLens X
            </span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-[#9ca6c8] hover:text-[#f5f7ff] transition-colors">
              Documentation
            </Link>
            <Link href="#" className="text-[#9ca6c8] hover:text-[#f5f7ff] transition-colors">
              API
            </Link>
            <Link href="#" className="text-[#9ca6c8] hover:text-[#f5f7ff] transition-colors">
              Support
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-[#9ca6c8]">© 2026 TrustLens X. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
