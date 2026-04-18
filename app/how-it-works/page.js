"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageShell from "../_components/PageShell";
import { useLang } from "../../lib/useLang";

export default function HowItWorksPage() {
  const { t } = useLang();
  return (
    <PageShell>
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 pb-10">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-100 mb-4">
          {t.how.heading}
        </h1>
        <p className="text-lg text-gray-400">{t.how.sub}</p>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-16">
        <ol className="space-y-5">
          {t.how.steps.map((s, i) => (
            <li
              key={i}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-semibold text-lg">
                {i + 1}
              </div>
              <div>
                <h3 className="text-gray-100 font-semibold mb-1.5 text-lg">{s.t}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.b}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/30 transition-shadow"
          >
            {t.how.cta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
