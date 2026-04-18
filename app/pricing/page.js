"use client";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import PageShell from "../_components/PageShell";
import { useLang } from "../../lib/useLang";

export default function PricingPage() {
  const { t } = useLang();
  return (
    <PageShell>
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-100 mb-4">
          {t.pricing.heading}
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t.pricing.sub}</p>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {t.pricing.plans.map((p, i) => (
            <div
              key={i}
              className={`relative p-7 rounded-2xl border transition-all ${
                p.featured
                  ? "bg-gradient-to-b from-violet-500/10 to-fuchsia-500/5 border-violet-500/40 shadow-lg shadow-violet-500/10"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white">
                  {t.pricing.popular}
                </span>
              )}
              <div className="text-sm text-gray-400 mb-1">{p.tag}</div>
              <h3 className="text-xl font-semibold text-gray-100 mb-4">{p.name}</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-gray-100">{p.price}</span>
                <span className="text-sm text-gray-500">{t.pricing.oneTime}</span>
              </div>
              <p className="text-xs text-gray-500 mb-6">{t.pricing.plusMonthly}</p>

              <ul className="space-y-2.5 mb-7">
                {p.perks.map((perk, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check size={16} className="text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`block text-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  p.featured
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white hover:shadow-lg hover:shadow-violet-500/30"
                    : "bg-white/5 text-gray-100 border border-white/10 hover:bg-white/10"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-violet-300 hover:text-violet-200 transition-colors"
          >
            {t.pricing.cta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
