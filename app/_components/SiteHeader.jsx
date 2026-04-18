"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import Logo from "./Logo";
import { useLang } from "../../lib/useLang";

export default function SiteHeader() {
  const { lang, toggle, t } = useLang();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/features", label: t.nav.features },
    { href: "/how-it-works", label: t.nav.how },
    { href: "/use-cases", label: t.nav.usecases },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#07070c]/80 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo size={32} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "text-violet-300 bg-violet-500/10"
                    : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Right side — lang + CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:text-gray-100 hover:bg-white/5 transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={15} />
            <span className="font-medium">{t.lang}</span>
          </button>

          <Link
            href="/#demo"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white hover:shadow-lg hover:shadow-violet-500/30 transition-shadow"
          >
            {t.nav.try}
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-white/5"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#07070c]/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-5 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm ${
                  pathname === l.href
                    ? "text-violet-300 bg-violet-500/10"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
