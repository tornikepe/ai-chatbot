"use client";
import Link from "next/link";
import { Sparkles, ArrowRight, Star, Zap } from "lucide-react";
import ChatWindow from "../components/ChatWindow";
import PageShell from "./_components/PageShell";
import { useLang } from "../lib/useLang";

export default function Home() {
  const { lang, t } = useLang();

  const chatConfig = {
    title: t.brand,
    subtitle: lang === "ka" ? "AI ასისტენტი · ხაზზე" : "AI assistant · Online",
    welcomeHeading:
      lang === "ka" ? "გამარჯობა! მე Lumo ვარ 👋" : "Hi! I'm Lumo 👋",
    welcomeBody:
      lang === "ka"
        ? "მკითხე ნებისმიერი შეკითხვა — ქართულად, ინგლისურად ან რუსულად. მყისიერად გიპასუხებ."
        : "Ask me anything — in Georgian, English, or Russian. I reply instantly.",
    prompts:
      lang === "ka"
        ? ["რა სერვისებს სთავაზობ?", "რა ღირს setup?", "რამდენ ენაზე საუბრობ?", "როგორ დავიწყო?"]
        : ["What services do you offer?", "How much does setup cost?", "Which languages do you speak?", "How do I get started?"],
    inputPlaceholder: lang === "ka" ? "დაწერე შეტყობინება…" : "Message…",
  };

  const hideLanding = process.env.NEXT_PUBLIC_HIDE_LANDING === "true";

  if (hideLanding) {
    return (
      <main className="h-screen flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl h-full max-h-[820px]">
          <ChatWindow config={chatConfig} />
        </div>
      </main>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[520px] h-[520px] bg-violet-600/25 rounded-full blur-3xl animate-blob" />
        <div
          className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      <PageShell>
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 md:pt-20 pb-14">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs font-medium ring-1 ring-violet-400/20 backdrop-blur-sm">
                <Sparkles size={12} /> {t.hero.badge}
              </span>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15]">
                {t.hero.h1}
                <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent pb-2">
                  {t.hero.accent}
                </span>
              </h1>
              <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-xl">
                {t.hero.sub}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium shadow-card hover:shadow-glow hover:-translate-y-[1px] transition"
                >
                  {t.hero.ctaPrimary} <ArrowRight size={16} />
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-gray-200 font-medium hover:border-violet-500/50 hover:bg-white/[0.06] transition"
                >
                  {t.hero.ctaSecondary}
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span>{t.hero.rating}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={14} className="text-violet-400" />
                  <span>{t.hero.setup}</span>
                </div>
              </div>
            </div>

            {/* Live demo */}
            <div id="demo" className="relative h-[620px]">
              <ChatWindow config={chatConfig} />
            </div>
          </div>
        </section>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            {t.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {s.v}
                </div>
                <div className="text-xs text-gray-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Explore pages ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/features", label: t.nav.features },
              { href: "/how-it-works", label: t.nav.how },
              { href: "/use-cases", label: t.nav.usecases },
              { href: "/pricing", label: t.nav.pricing },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.05] transition-colors flex items-center justify-between"
              >
                <span className="text-gray-100 font-medium">{item.label}</span>
                <ArrowRight size={16} className="text-gray-500 group-hover:text-violet-300 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-20">
          <div className="relative overflow-hidden p-10 rounded-3xl bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-indigo-600/20 border border-violet-500/20 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-100 mb-3">
                {t.cta.heading}
              </h2>
              <p className="text-gray-400 mb-7 max-w-xl mx-auto">{t.cta.sub}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/40 transition-shadow"
              >
                {t.cta.btn} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </PageShell>
    </div>
  );
}
