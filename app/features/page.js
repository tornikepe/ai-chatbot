"use client";
import Link from "next/link";
import { Sparkles, Zap, Shield, Globe, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
import PageShell from "../_components/PageShell";
import { useLang } from "../../lib/useLang";

const ICONS = [Globe, Zap, Shield, Sparkles, MessageSquare, TrendingUp];

export default function FeaturesPage() {
  const { t } = useLang();
  return (
    <PageShell>
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-10">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-100 mb-4">
          {t.features.heading}
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl">{t.features.sub}</p>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.items.map((f, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.05] transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-gray-100 font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/30 transition-shadow"
          >
            {t.features.cta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
