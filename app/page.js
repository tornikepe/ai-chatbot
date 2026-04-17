"use client";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Shield,
  Globe,
  MessageSquare,
  TrendingUp,
  Clock,
  Check,
  ArrowRight,
  Star,
  Moon,
  Sun,
} from "lucide-react";
import ChatWindow from "../components/ChatWindow";

/**
 * Premium landing page + embedded live chatbot.
 *
 * Sections:
 *   1. Sticky nav bar
 *   2. Hero: headline, sub-headline, CTA, live chat demo side-by-side
 *   3. Trust bar (social proof)
 *   4. Feature grid
 *   5. "How it works" steps
 *   6. Pricing / CTA
 *   7. Footer
 *
 * Per-client branding is entirely env-var driven:
 *   NEXT_PUBLIC_BRAND_NAME, NEXT_PUBLIC_CHAT_TITLE, NEXT_PUBLIC_CHAT_SUBTITLE,
 *   NEXT_PUBLIC_WELCOME_HEADING, NEXT_PUBLIC_WELCOME_BODY, NEXT_PUBLIC_PROMPTS
 *   NEXT_PUBLIC_HERO_HEADLINE, NEXT_PUBLIC_HERO_SUBHEADLINE
 *   NEXT_PUBLIC_HIDE_LANDING=true  — hides landing, shows only the chat
 */
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldDark = saved === null ? prefersDark : saved === "true";
    setDarkMode(shouldDark);
    document.documentElement.classList.toggle("dark", shouldDark);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", next);
    document.documentElement.classList.toggle("dark", next);
  };

  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Nexus AI";
  const heroHeadline =
    process.env.NEXT_PUBLIC_HERO_HEADLINE ||
    "Turn your website into a 24/7 sales & support channel.";
  const heroSubheadline =
    process.env.NEXT_PUBLIC_HERO_SUBHEADLINE ||
    "An AI assistant that answers your customers' questions instantly, captures leads while you sleep, and lets your team focus on what actually matters.";

  const chatConfig = {
    title: process.env.NEXT_PUBLIC_CHAT_TITLE || brandName,
    subtitle: process.env.NEXT_PUBLIC_CHAT_SUBTITLE || "AI assistant · Online",
    welcomeHeading:
      process.env.NEXT_PUBLIC_WELCOME_HEADING ||
      `Hi! I'm ${brandName}. How can I help?`,
    welcomeBody:
      process.env.NEXT_PUBLIC_WELCOME_BODY ||
      "Ask me anything about our product, pricing, or how to get started. I'm available around the clock.",
    prompts: (() => {
      try {
        return JSON.parse(process.env.NEXT_PUBLIC_PROMPTS || "[]");
      } catch {
        return [];
      }
    })(),
  };

  const hideLanding = process.env.NEXT_PUBLIC_HIDE_LANDING === "true";

  if (hideLanding) {
    return (
      <main className="h-screen flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl h-full max-h-[820px]">
          <ChatWindow
            darkMode={darkMode}
            onToggleDark={toggleDark}
            config={chatConfig}
          />
        </div>
      </main>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-400/30 dark:bg-violet-600/20 rounded-full blur-3xl animate-blob" />
        <div
          className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] bg-fuchsia-400/20 dark:bg-fuchsia-600/15 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      {/* ── Nav ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/60 dark:bg-gray-950/60 border-b border-gray-200/60 dark:border-gray-800/60">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-glow">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-semibold tracking-tight">{brandName}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <a href="#features" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Features</a>
            <a href="#how" className="hover:text-violet-600 dark:hover:text-violet-400 transition">How it works</a>
            <a href="#pricing" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="#demo"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium shadow-glow hover:shadow-none hover:-translate-y-[1px] transition"
            >
              Try it free <ArrowRight size={14} />
            </a>
          </div>
        </nav>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs font-medium ring-1 ring-violet-200/60 dark:ring-violet-400/20">
              <Sparkles size={12} /> Powered by GPT-class AI
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              {heroHeadline.split(".")[0]}
              <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
                {heroHeadline.split(".")[1] || "Never miss a customer again."}
              </span>
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              {heroSubheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium shadow-card hover:shadow-glow hover:-translate-y-[1px] transition"
              >
                Try the live demo <ArrowRight size={16} />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:border-violet-400 dark:hover:border-violet-500 transition"
              >
                See pricing
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">4.9/5</span>
                <span>from early users</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={14} className="text-green-500" />
                Set up in under 10 minutes
              </div>
            </div>
          </div>

          {/* Live chat demo */}
          <div id="demo" className="h-[620px] md:h-[680px] animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative h-full">
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-400/30 to-fuchsia-400/30 blur-2xl rounded-3xl" />
              <div className="relative h-full">
                <ChatWindow
                  darkMode={darkMode}
                  onToggleDark={toggleDark}
                  config={chatConfig}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ──────────────────────────────────────────────── */}
      <section className="border-y border-gray-200/60 dark:border-gray-800/60 bg-white/40 dark:bg-gray-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "< 1s", label: "First token latency" },
            { value: "24/7", label: "Always available" },
            { value: "40+", label: "Languages supported" },
            { value: "99.9%", label: "Uptime on Vercel" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Everything you need to delight customers
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Built on a modern stack. Production-ready from day one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: "Streaming responses",
              body: "Tokens appear as the AI generates them. Feels instant, just like ChatGPT.",
            },
            {
              icon: Shield,
              title: "Secure by default",
              body: "Rate limiting, CSP headers, input validation — no API keys ever touch the browser.",
            },
            {
              icon: Globe,
              title: "Speaks 40+ languages",
              body: "Your customers write in their language — the AI responds in kind.",
            },
            {
              icon: MessageSquare,
              title: "Trained on your business",
              body: "A single env var tells the AI what your business does, how to sound, and what to sell.",
            },
            {
              icon: TrendingUp,
              title: "Captures leads 24/7",
              body: "Never miss a customer at 3 AM again. Hand off warm leads to your inbox.",
            },
            {
              icon: Clock,
              title: "Deploys in minutes",
              body: "One-click Vercel deploy. Free tier forever. No servers to manage.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group relative p-6 rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/60 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-600 hover:-translate-y-0.5 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white mb-4 shadow-glow">
                <f.icon size={18} />
              </div>
              <h3 className="font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">From zero to live in 3 steps</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "01", title: "Tell us about your business", body: "Share a one-paragraph description of what you do, your tone, and your top FAQs." },
            { n: "02", title: "We configure & deploy", body: "Branding, prompts, colors — all wired up. Deployed to your domain on Vercel." },
            { n: "03", title: "Embed & go live", body: "Drop one line of code on your site. Customers start chatting within the hour." },
          ].map((s) => (
            <div key={s.n} className="relative p-6 rounded-2xl bg-white/70 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-800">
              <div className="text-xs font-mono text-violet-600 dark:text-violet-400">{s.n}</div>
              <h3 className="mt-2 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────── */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Simple, honest pricing</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">One-time setup. Own your bot forever.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter",
              price: "$299",
              note: "one-time",
              tag: "Small business",
              perks: ["Branded chatbot", "Up to 1,000 chats/mo", "FAQ training", "Email support"],
            },
            {
              name: "Growth",
              price: "$599",
              note: "one-time",
              tag: "Most popular",
              featured: true,
              perks: ["Everything in Starter", "Lead capture to email", "Custom tone & voice", "Priority support"],
            },
            {
              name: "Custom",
              price: "Let's talk",
              note: "",
              tag: "Enterprise",
              perks: ["Everything in Growth", "CRM integration", "Multilingual training", "SLA & white-label"],
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative p-6 rounded-2xl border transition ${
                p.featured
                  ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white border-transparent shadow-glow scale-[1.02]"
                  : "bg-white/70 dark:bg-gray-900/60 border-gray-200/60 dark:border-gray-800"
              }`}
            >
              {p.featured && (
                <div className="absolute top-4 right-4 text-[10px] font-medium uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  {p.tag}
                </div>
              )}
              <div className={`text-xs uppercase tracking-wider ${p.featured ? "text-violet-100" : "text-gray-500 dark:text-gray-400"}`}>
                {p.featured ? "Popular" : p.tag}
              </div>
              <h3 className={`mt-2 text-xl font-semibold ${p.featured ? "text-white" : ""}`}>{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className={`text-3xl font-semibold ${p.featured ? "text-white" : ""}`}>{p.price}</span>
                {p.note && <span className={`text-sm ${p.featured ? "text-violet-100" : "text-gray-500"}`}>{p.note}</span>}
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm">
                    <Check size={15} className={p.featured ? "text-white" : "text-violet-600 dark:text-violet-400"} />
                    <span className={p.featured ? "text-violet-50" : "text-gray-700 dark:text-gray-300"}>{perk}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#demo"
                className={`mt-6 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-sm transition ${
                  p.featured
                    ? "bg-white text-violet-700 hover:bg-violet-50"
                    : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90"
                }`}
              >
                Get started <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200/60 dark:border-gray-800/60 bg-white/40 dark:bg-gray-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
              <Sparkles size={11} className="text-white" />
            </div>
            <span>© {new Date().getFullYear()} {brandName}. Built with Next.js & Tailwind.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Features</a>
            <a href="#pricing" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Pricing</a>
            <a href="#demo" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Demo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
