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
  Mail,
  Phone,
  Send,
  Copy,
  Languages,
} from "lucide-react";
import ChatWindow from "../components/ChatWindow";

/* ───────────────────────── i18n ───────────────────────── */
/**
 * All user-facing strings live here. Add a new language by adding another key
 * and a matching object. The language toggle in the nav flips between keys.
 */
const T = {
  en: {
    nav: {
      features: "Features",
      how: "How it works",
      usecases: "Use cases",
      pricing: "Pricing",
      contact: "Contact",
      try: "Try it free",
    },
    hero: {
      badge: "Speaks Georgian fluently",
      h1: "Your 24/7 AI assistant,",
      accent: "fluent in Georgian.",
      sub: "Answers customer questions instantly in Georgian, English, and Russian. Captures leads while you sleep. Built for Georgian businesses — from restaurants to clinics.",
      ctaPrimary: "Try the live demo",
      ctaSecondary: "See pricing",
      rating: "from early users",
      setup: "Live in 1 day",
    },
    stats: [
      { v: "< 1s", l: "First token latency" },
      { v: "24/7", l: "Always available" },
      { v: "3", l: "Languages built-in" },
      { v: "99.9%", l: "Uptime on Vercel" },
    ],
    features: {
      heading: "Everything a Georgian business needs",
      sub: "Production-grade tech. Tailored for the Georgian market.",
      items: [
        {
          title: "Fluent Georgian",
          body: "Modern, natural Georgian — not machine translation. Also speaks English & Russian out of the box.",
        },
        {
          title: "Streaming replies",
          body: "Tokens appear as the AI thinks. Feels instant, like ChatGPT.",
        },
        {
          title: "Secure by default",
          body: "Rate limiting, security headers, input validation — no API keys ever touch the browser.",
        },
        {
          title: "Trained on your business",
          body: "One paragraph describing your business is all it takes. Tone, products, FAQs — dialed in.",
        },
        {
          title: "Captures leads 24/7",
          body: "Asks for name + contact the moment a customer shows buying intent. Straight to your inbox.",
        },
        {
          title: "Live in a day",
          body: "We handle setup, deploy to Vercel, and give you a single line to embed on your site.",
        },
      ],
    },
    how: {
      heading: "From zero to live in 3 steps",
      steps: [
        {
          t: "Tell us about your business",
          b: "Share a short description, your tone, and your top FAQs.",
        },
        {
          t: "We configure & deploy",
          b: "Branding, prompts, colors — all wired up and deployed to your domain.",
        },
        {
          t: "Embed & go live",
          b: "One line of code on your site. Customers start chatting within the hour.",
        },
      ],
    },
    usecases: {
      heading: "Built for any customer-facing Georgian business",
      sub: "One platform — unlimited applications.",
      items: [
        {
          e: "🍽️",
          t: "Restaurants & cafés",
          b: "Takes reservations, answers menu questions, shares hours. Never miss a booking because nobody picked up the phone.",
        },
        {
          e: "🏨",
          t: "Hotels & guesthouses",
          b: "Multilingual concierge for international guests. Answers bookings, explains amenities, upsells rooms.",
        },
        {
          e: "🛍️",
          t: "E-commerce",
          b: "Recommends products, answers sizing & shipping, and recovers abandoned carts — 24/7.",
        },
        {
          e: "💼",
          t: "Professional services",
          b: "Lawyers, accountants, clinics — screens inquiries and schedules consultations automatically.",
        },
        {
          e: "🏫",
          t: "Schools & courses",
          b: "Answers admissions, tuition, and schedule questions. Frees up your team for real work.",
        },
        {
          e: "🏢",
          t: "SaaS & agencies",
          b: "Onboards users, handles tier-1 support, and qualifies demo requests.",
        },
      ],
    },
    pricing: {
      heading: "Transparent pricing, in Georgian Lari",
      sub: "One-time setup + optional monthly support. Own your bot forever.",
      popular: "Most popular",
      oneTime: "one-time",
      monthly: "/month",
      plusMonthly: "+ optional ₾200/month support",
      plans: [
        {
          name: "Starter",
          price: "₾800",
          tag: "Small business",
          cta: "Get started",
          perks: [
            "Custom-branded bot",
            "Up to 1,000 chats/month",
            "FAQ training in Georgian",
            "1 language (KA or EN)",
            "3 months free hosting",
            "Email support",
          ],
        },
        {
          name: "Growth",
          price: "₾1,500",
          tag: "Most popular",
          featured: true,
          cta: "Get started",
          perks: [
            "Everything in Starter",
            "Lead capture → your email",
            "Up to 3 languages (KA/EN/RU)",
            "Custom tone & voice",
            "6 months free hosting",
            "Priority support",
          ],
        },
        {
          name: "Premium",
          price: "₾3,000+",
          tag: "Enterprise",
          cta: "Contact us",
          perks: [
            "Everything in Growth",
            "CRM integration",
            "White-label deployment",
            "Multilingual training",
            "12 months hosting + SLA",
            "Dedicated support",
          ],
        },
      ],
    },
    contact: {
      heading: "Let's talk",
      sub: "Book a free 20-minute consultation. I'll show you exactly what your bot would look like — no pressure, no jargon.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      telegramLabel: "Telegram",
      linkedinLabel: "LinkedIn",
      copied: "Copied!",
    },
    payment: {
      heading: "Payment details",
      sub: "After we agree on scope, 50% upfront and 50% on delivery. Pay via the method that suits you.",
      bank: "Bank transfer (Georgia)",
      intl: "International",
      beneficiary: "Beneficiary",
      iban: "IBAN",
      bankName: "Bank",
    },
    cta: {
      heading: "Ready to stop missing customers?",
      sub: "Book a free 20-minute call. Let's see what this looks like for your business.",
      btn: "Get in touch",
    },
    footer: "© {year} Georgian Bot. Built for Georgian businesses.",
    theme: "Toggle theme",
    lang: "KA",
  },

  ka: {
    nav: {
      features: "შესაძლებლობები",
      how: "როგორ მუშაობს",
      usecases: "გამოყენება",
      pricing: "ფასები",
      contact: "კონტაქტი",
      try: "გამოცადე უფასოდ",
    },
    hero: {
      badge: "ქართულად თავისუფლად საუბრობს",
      h1: "თქვენი 24/7 AI ასისტენტი,",
      accent: "რომელიც ქართულად საუბრობს.",
      sub: "მყისიერად პასუხობს თქვენს კლიენტებს ქართულად, ინგლისურად და რუსულად. იჭერს ახალ კლიენტებს მაშინაც, როცა თქვენ გძინავთ. შექმნილია ქართული ბიზნესისთვის — რესტორნიდან კლინიკამდე.",
      ctaPrimary: "ცოცხალი დემო",
      ctaSecondary: "ფასების ნახვა",
      rating: "ადრეული მომხმარებლები",
      setup: "ერთ დღეში გაშვება",
    },
    stats: [
      { v: "< 1წმ", l: "პირველი პასუხი" },
      { v: "24/7", l: "ყოველთვის ხაზზე" },
      { v: "3", l: "ენა ჩაშენებული" },
      { v: "99.9%", l: "Uptime Vercel-ზე" },
    ],
    features: {
      heading: "ყველაფერი, რაც ქართულ ბიზნესს სჭირდება",
      sub: "სერიოზული ტექნოლოგია. მორგებული ქართულ ბაზარზე.",
      items: [
        {
          title: "სუფთა ქართული",
          body: "ნამდვილი, ცოცხალი ქართული — არა მანქანური თარგმანი. ასევე ინგლისურად და რუსულად თავისუფლად.",
        },
        {
          title: "Streaming პასუხები",
          body: "ტექსტი ჩნდება მაშინვე, როცა AI ფიქრობს. ChatGPT-ის მსგავსი შეგრძნება.",
        },
        {
          title: "უსაფრთხოება პირველ რიგში",
          body: "Rate limiting, security headers, ვალიდაცია — API გასაღებები ბრაუზერამდე არასდროს აღწევს.",
        },
        {
          title: "თქვენი ბიზნესისთვის მორგებული",
          body: "ერთი პარაგრაფი თქვენი ბიზნესის შესახებ საკმარისია — ტონი, FAQ-ები, პროდუქტები, ყველაფერი ბოტს ახსოვს.",
        },
        {
          title: "Lead-ების შეგროვება 24/7",
          body: "როცა კლიენტი ყიდვის განწყობაზეა, იკითხავს სახელს და კონტაქტს — პირდაპირ თქვენი იმეილისკენ.",
        },
        {
          title: "ერთ დღეში გაშვება",
          body: "ჩვენ ვაყენებთ, Vercel-ზე ვაქვეყნებთ და ერთი სტრიქონი გრჩება საიტზე ჩასასმელად.",
        },
      ],
    },
    how: {
      heading: "ნულიდან ცოცხლამდე — 3 ნაბიჯი",
      steps: [
        {
          t: "გვიამბეთ თქვენი ბიზნესის შესახებ",
          b: "მოკლე აღწერა, სასურველი სტილი, ხშირი კითხვები.",
        },
        {
          t: "ჩვენ ვაკონფიგურებთ და ვაქვეყნებთ",
          b: "ბრენდინგი, prompt-ები, ფერები — ყველაფერი ჩართულია და თქვენს დომენზე მუშაობს.",
        },
        {
          t: "ჩასვით საიტზე და დაიწყეთ",
          b: "ერთი ხაზი კოდი თქვენს საიტზე. კლიენტები საათის განმავლობაში დაიწყებენ საუბარს.",
        },
      ],
    },
    usecases: {
      heading: "ნებისმიერი ქართული ბიზნესისთვის",
      sub: "ერთი პლატფორმა — შეუზღუდავი გამოყენება.",
      items: [
        {
          e: "🍽️",
          t: "რესტორნები და კაფეები",
          b: "იღებს ჯავშნებს, პასუხობს მენიუზე, იუწყება სამუშაო საათებზე. აღარ დაკარგავთ კლიენტს იმის გამო, რომ ტელეფონს ვერავინ აუღო.",
        },
        {
          e: "🏨",
          t: "სასტუმროები და გესთჰაუსები",
          b: "მრავალენოვანი კონსიერჟი უცხოელი სტუმრებისთვის. პასუხობს ჯავშანზე, განმარტავს სერვისებს, ყიდის upgrade-ებს.",
        },
        {
          e: "🛍️",
          t: "ონლაინ მაღაზიები",
          b: "გირჩევთ პროდუქტებს, პასუხობს ზომებზე და მიწოდებაზე, აბრუნებს მიტოვებულ კალათებს — 24/7.",
        },
        {
          e: "💼",
          t: "პროფესიული სერვისები",
          b: "ადვოკატები, ბუღალტრები, კლინიკები — იღებს მიმართვებს და იწერს კონსულტაციებს ავტომატურად.",
        },
        {
          e: "🏫",
          t: "სკოლები და კურსები",
          b: "პასუხობს მიღებაზე, ღირებულებაზე, განრიგზე. თქვენი გუნდი მნიშვნელოვან საქმეზე ფოკუსირდება.",
        },
        {
          e: "🏢",
          t: "SaaS და სააგენტოები",
          b: "აცნობს მომხმარებლებს პროდუქტს, მართავს პირველადი დონის მხარდაჭერას, ამოწმებს დემო მოთხოვნებს.",
        },
      ],
    },
    pricing: {
      heading: "გამჭვირვალე ფასები ლარში",
      sub: "ერთჯერადი setup + (სურვილისამებრ) თვიური მხარდაჭერა. ბოტი სამუდამოდ თქვენია.",
      popular: "ყველაზე პოპულარული",
      oneTime: "ერთჯერადი",
      monthly: "/თვეში",
      plusMonthly: "+ სურვილისამებრ ₾200/თვეში მხარდაჭერა",
      plans: [
        {
          name: "Starter",
          price: "₾249",
          tag: "პატარა ბიზნესი",
          cta: "დაიწყეთ",
          perks: [
            "ბრენდირებული ჩატბოტი",
            "1,000 საუბრამდე/თვეში",
            "FAQ ტრენინგი ქართულად",
            "1 ენა (KA ან EN)",
            "3 თვე უფასო hosting",
            "Email მხარდაჭერა",
          ],
        },
        {
          name: "Growth",
          price: "₾499",
          tag: "ყველაზე პოპულარული",
          featured: true,
          cta: "დაიწყეთ",
          perks: [
            "ყველაფერი Starter-ში",
            "Lead-ები → თქვენს იმეილზე",
            "3 ენამდე (KA/EN/RU)",
            "Custom სტილი და ხმა",
            "6 თვე უფასო hosting",
            "პრიორიტეტული მხარდაჭერა",
          ],
        },
        {
          name: "Premium",
          price: "₾999",
          tag: "Enterprise",
          cta: "დაგვიკავშირდით",
          perks: [
            "ყველაფერი Growth-ში",
            "CRM ინტეგრაცია",
            "White-label deploy",
            "მრავალენოვანი ტრენინგი",
            "12 თვე hosting + SLA",
            "გამოყოფილი მხარდაჭერა",
          ],
        },
      ],
    },
    contact: {
      heading: "დავიწყოთ საუბარი",
      sub: "დაჯავშნეთ უფასო 20-წუთიანი კონსულტაცია. ზუსტად გაჩვენებთ როგორი იქნება თქვენი ბოტი — ყოველგვარი ზეწოლის გარეშე.",
      emailLabel: "იმეილი",
      phoneLabel: "ტელეფონი",
      telegramLabel: "Telegram",
      linkedinLabel: "LinkedIn",
      copied: "დაკოპირდა!",
    },
    payment: {
      heading: "გადახდის რეკვიზიტები",
      sub: "მოცულობის შეთანხმების შემდეგ — 50% წინასწარ, 50% ჩაბარების დროს. აირჩიეთ თქვენთვის მოსახერხებელი მეთოდი.",
      bank: "საბანკო გადარიცხვა (საქართველო)",
      intl: "საერთაშორისო",
      beneficiary: "მიმღები",
      iban: "IBAN",
      bankName: "ბანკი",
    },
    cta: {
      heading: "მზად ხართ აღარ დაკარგოთ კლიენტი?",
      sub: "დაჯავშნეთ უფასო 20-წუთიანი ზარი. ერთად ვნახოთ, როგორი იქნება ეს თქვენი ბიზნესისთვის.",
      btn: "დამიკავშირდით",
    },
    footer: "© {year} Georgian Bot. შექმნილია ქართული ბიზნესისთვის.",
    theme: "თემის გადართვა",
    lang: "EN",
  },
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("ka"); // Georgian by default

  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode");
    const shouldDark = savedDark === null ? true : savedDark === "true";
    setDarkMode(shouldDark);
    document.documentElement.classList.toggle("dark", shouldDark);

    const savedLang = localStorage.getItem("lang");
    if (savedLang === "en" || savedLang === "ka") setLang(savedLang);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", next);
    document.documentElement.classList.toggle("dark", next);
  };

  const toggleLang = () => {
    const next = lang === "ka" ? "en" : "ka";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const t = T[lang];
  const brandName = "Georgian Bot";

  /* Contact & payment details — driven by env vars so you can edit without code */
  const contact = {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "tornikepe@gmail.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+995 5XX XX XX XX",
    telegram: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || "@tornikepe",
    linkedin:
      process.env.NEXT_PUBLIC_CONTACT_LINKEDIN ||
      "linkedin.com/in/tornike-peitrishvili",
  };
  const payment = {
    beneficiary:
      process.env.NEXT_PUBLIC_PAYMENT_BENEFICIARY || "Tornike Peitrishvili",
    bankName: process.env.NEXT_PUBLIC_PAYMENT_BANK || "TBC Bank",
    iban: process.env.NEXT_PUBLIC_PAYMENT_IBAN || "GE00TB0000000000000000",
    paypal: process.env.NEXT_PUBLIC_PAYMENT_PAYPAL || "paypal.me/tornikepe",
    revolut: process.env.NEXT_PUBLIC_PAYMENT_REVOLUT || "@tornikepe",
  };

  /* Chat config — localized */
  const chatConfig = {
    title: "Georgian Bot",
    subtitle: lang === "ka" ? "AI ასისტენტი · ხაზზე" : "AI assistant · Online",
    welcomeHeading:
      lang === "ka"
        ? "გამარჯობა! მე Georgian Bot ვარ 👋"
        : "Hi! I'm Georgian Bot 👋",
    welcomeBody:
      lang === "ka"
        ? "მკითხე ნებისმიერი შეკითხვა — ქართულად, ინგლისურად ან რუსულად. მყისიერად გიპასუხებ."
        : "Ask me anything — in Georgian, English, or Russian. I reply instantly.",
    prompts:
      lang === "ka"
        ? [
            "რა სერვისებს სთავაზობ?",
            "რა ღირს setup?",
            "რამდენ ენაზე საუბრობ?",
            "როგორ დავიწყო?",
          ]
        : [
            "What services do you offer?",
            "How much does setup cost?",
            "Which languages do you speak?",
            "How do I get started?",
          ],
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

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#07070c]/70 border-b border-white/5">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-glow">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-semibold tracking-tight">{brandName}</span>
            <span className="ml-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20">
              🇬🇪 KA·EN·RU
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-violet-300 transition">
              {t.nav.features}
            </a>
            <a href="#how" className="hover:text-violet-300 transition">
              {t.nav.how}
            </a>
            <a href="#usecases" className="hover:text-violet-300 transition">
              {t.nav.usecases}
            </a>
            <a href="#pricing" className="hover:text-violet-300 transition">
              {t.nav.pricing}
            </a>
            <a href="#contact" className="hover:text-violet-300 transition">
              {t.nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-gray-200 text-xs font-medium hover:border-violet-500/40 hover:bg-white/[0.06] transition"
              aria-label="Toggle language"
              title="Language / ენა"
            >
              <Languages size={13} />
              <span className="tabular-nums">{t.lang}</span>
            </button>
            <button
              onClick={toggleDark}
              aria-label={t.theme}
              className="p-2 rounded-lg text-gray-300 hover:bg-white/5 transition"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="#demo"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium shadow-glow hover:shadow-none hover:-translate-y-[1px] transition"
            >
              {t.nav.try} <ArrowRight size={14} />
            </a>
          </div>
        </nav>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs font-medium ring-1 ring-violet-400/20 backdrop-blur-sm">
              <Sparkles size={12} /> {t.hero.badge}
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              {t.hero.h1}
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
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
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-gray-200 font-medium hover:border-violet-500/50 hover:bg-white/[0.06] transition"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="font-medium text-gray-200">4.9/5</span>
                <span>{t.hero.rating}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={14} className="text-green-400" />
                {t.hero.setup}
              </div>
            </div>
          </div>

          <div
            id="demo"
            className="h-[560px] sm:h-[620px] md:h-[680px] animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="relative h-full">
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/25 to-fuchsia-500/25 blur-2xl rounded-3xl" />
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

      {/* ── Stats bar ────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {t.stats.map((s, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {s.v}
              </div>
              <div className="mt-1 text-xs text-gray-400 uppercase tracking-wider">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t.features.heading}
          </h2>
          <p className="mt-4 text-gray-400">{t.features.sub}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((f, i) => {
            const Icons = [
              Globe,
              Zap,
              Shield,
              MessageSquare,
              TrendingUp,
              Clock,
            ];
            const Icon = Icons[i] || Sparkles;
            return (
              <div
                key={f.title}
                className="group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.05] hover:-translate-y-0.5 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white mb-4 shadow-glow">
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t.how.heading}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.how.steps.map((s, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="text-xs font-mono text-violet-300">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {s.b}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Use cases ───────────────────────────────────────────── */}
      <section id="usecases" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t.usecases.heading}
          </h2>
          <p className="mt-4 text-gray-400">{t.usecases.sub}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.usecases.items.map((u) => (
            <div
              key={u.t}
              className="group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.05] hover:-translate-y-0.5 transition"
            >
              <div className="text-3xl mb-3">{u.e}</div>
              <h3 className="font-semibold tracking-tight">{u.t}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {u.b}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t.pricing.heading}
          </h2>
          <p className="mt-3 text-gray-400">{t.pricing.sub}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.pricing.plans.map((p) => (
            <div
              key={p.name}
              className={`relative p-6 rounded-2xl border transition ${
                p.featured
                  ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white border-transparent shadow-glow md:scale-[1.03]"
                  : "bg-white/[0.03] border-white/10 hover:border-violet-500/40"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider bg-white text-violet-700 px-3 py-1 rounded-full shadow">
                  {t.pricing.popular}
                </div>
              )}
              <div
                className={`text-xs uppercase tracking-wider ${p.featured ? "text-violet-100" : "text-gray-400"}`}
              >
                {p.tag}
              </div>
              <h3
                className={`mt-2 text-xl font-semibold ${p.featured ? "text-white" : ""}`}
              >
                {p.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-semibold ${p.featured ? "text-white" : ""}`}
                >
                  {p.price}
                </span>
                <span
                  className={`text-sm ${p.featured ? "text-violet-100" : "text-gray-400"}`}
                >
                  {t.pricing.oneTime}
                </span>
              </div>
              <p
                className={`mt-1 text-xs ${p.featured ? "text-violet-100" : "text-gray-500"}`}
              >
                {t.pricing.plusMonthly}
              </p>
              <ul className="mt-6 space-y-2.5">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm">
                    <Check
                      size={15}
                      className={`mt-0.5 flex-shrink-0 ${p.featured ? "text-white" : "text-violet-300"}`}
                    />
                    <span
                      className={
                        p.featured ? "text-violet-50" : "text-gray-300"
                      }
                    >
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-6 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-sm transition ${
                  p.featured
                    ? "bg-white text-violet-700 hover:bg-violet-50"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {p.cta} <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────── */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="mt-4 text-gray-400">{t.contact.sub}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <ContactRow
            icon={Mail}
            label={t.contact.emailLabel}
            value={contact.email}
            href={`mailto:${contact.email}`}
            copied={t.contact.copied}
          />
          <ContactRow
            icon={Phone}
            label={t.contact.phoneLabel}
            value={contact.phone}
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            copied={t.contact.copied}
          />
          <ContactRow
            icon={Send}
            label={t.contact.telegramLabel}
            value={contact.telegram}
            href={`https://t.me/${contact.telegram.replace("@", "")}`}
            copied={t.contact.copied}
          />
          <ContactRow
            icon={Globe}
            label={t.contact.linkedinLabel}
            value={contact.linkedin}
            href={`https://${contact.linkedin}`}
            copied={t.contact.copied}
          />
        </div>
      </section>

      {/* ── Payment ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t.payment.heading}
          </h2>
          <p className="mt-4 text-gray-400">{t.payment.sub}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bank transfer */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-lg">🏦</span> {t.payment.bank}
            </h3>
            <dl className="space-y-3 text-sm">
              <PayRow
                k={t.payment.beneficiary}
                v={payment.beneficiary}
                copied={t.contact.copied}
              />
              <PayRow
                k={t.payment.bankName}
                v={payment.bankName}
                copied={t.contact.copied}
              />
              <PayRow
                k={t.payment.iban}
                v={payment.iban}
                mono
                copied={t.contact.copied}
              />
            </dl>
          </div>

          {/* International */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-lg">🌍</span> {t.payment.intl}
            </h3>
            <dl className="space-y-3 text-sm">
              <PayRow k="PayPal" v={payment.paypal} copied={t.contact.copied} />
              <PayRow
                k="Revolut"
                v={payment.revolut}
                copied={t.contact.copied}
              />
            </dl>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 px-8 py-16 md:p-16 text-center shadow-glow">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent)] pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
              {t.cta.heading}
            </h2>
            <p className="mt-4 text-violet-100 max-w-xl mx-auto">{t.cta.sub}</p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-violet-700 font-semibold hover:bg-violet-50 transition shadow-lg"
            >
              {t.cta.btn} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
              <Sparkles size={11} className="text-white" />
            </div>
            <span>{t.footer.replace("{year}", new Date().getFullYear())}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-violet-300 transition">
              {t.nav.features}
            </a>
            <a href="#pricing" className="hover:text-violet-300 transition">
              {t.nav.pricing}
            </a>
            <a href="#contact" className="hover:text-violet-300 transition">
              {t.nav.contact}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Small helpers ───────────────────────────────────────────── */
function ContactRow({ icon: Icon, label, value, href, copied: copiedLabel }) {
  const [copied, setCopied] = useState(false);
  const copy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="group flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.05] transition">
      <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-violet-500/15 ring-1 ring-violet-500/25 flex items-center justify-center text-violet-300">
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-gray-500">
          {label}
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-100 hover:text-violet-300 transition truncate block"
        >
          {value}
        </a>
      </div>
      <button
        onClick={copy}
        className="p-2 rounded-lg text-gray-400 hover:text-violet-300 hover:bg-white/5 transition"
        title="Copy"
      >
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}

function PayRow({ k, v, mono = false, copied: copiedLabel }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(v);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0">
      <dt className="text-gray-500 text-xs uppercase tracking-wider flex-shrink-0">
        {k}
      </dt>
      <dd className="flex items-center gap-2 min-w-0">
        <span
          className={`text-gray-100 truncate ${mono ? "font-mono text-xs" : "text-sm"}`}
        >
          {v}
        </span>
        <button
          onClick={copy}
          className="p-1.5 rounded-md text-gray-400 hover:text-violet-300 hover:bg-white/5 transition flex-shrink-0"
          title="Copy"
        >
          {copied ? (
            <Check size={13} className="text-green-400" />
          ) : (
            <Copy size={13} />
          )}
        </button>
      </dd>
    </div>
  );
}
