"use client";
import Link from "next/link";
import Logo from "./Logo";
import { useLang } from "../../lib/useLang";

export default function SiteFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Logo size={28} />

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-500">
          <Link href="/features" className="hover:text-gray-200 transition-colors">{t.nav.features}</Link>
          <Link href="/how-it-works" className="hover:text-gray-200 transition-colors">{t.nav.how}</Link>
          <Link href="/use-cases" className="hover:text-gray-200 transition-colors">{t.nav.usecases}</Link>
          <Link href="/pricing" className="hover:text-gray-200 transition-colors">{t.nav.pricing}</Link>
          <Link href="/contact" className="hover:text-gray-200 transition-colors">{t.nav.contact}</Link>
        </div>

        <p className="text-xs text-gray-500 text-center">
          {t.footer.replace("{year}", year)}
        </p>
      </div>
    </footer>
  );
}
