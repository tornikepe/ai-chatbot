/**
 * Centralised i18n dictionary.
 *
 * Every string the user can read lives here. Adding a language = add a new key.
 * Pages import `T[lang]` via the `useLang` hook; there is no per-page dictionary.
 */
export const T = {
  en: {
    brand: "Lumo",
    tagline: "AI that speaks your customer's language",

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
      cta: "See pricing →",
      items: [
        { title: "Fluent Georgian", body: "Modern, natural Georgian — not machine translation. Also speaks English & Russian out of the box." },
        { title: "Streaming replies", body: "Tokens appear as the AI thinks. Feels instant, like ChatGPT." },
        { title: "Secure by default", body: "Rate limiting, security headers, input validation — API keys never reach the browser." },
        { title: "Trained on your business", body: "One paragraph about your business is enough — tone, FAQs, products, all remembered by the bot." },
        { title: "Captures leads 24/7", body: "Asks for name + contact the moment a customer shows buying intent. Straight to your inbox." },
        { title: "Live in a day", body: "We handle setup, deploy to Vercel, and give you a single line to embed on your site." },
      ],
    },

    how: {
      heading: "From zero to live in 3 steps",
      sub: "You tell us about your business. We handle the rest.",
      cta: "See pricing →",
      steps: [
        { t: "Tell us about your business", b: "Share a short description, your tone, and your top FAQs." },
        { t: "We configure & publish", b: "Branding, prompts, colors — all wired up and deployed to your domain." },
        { t: "Embed & go live", b: "One line of code on your site. Customers start chatting within the hour." },
      ],
    },

    usecases: {
      heading: "Built for any customer-facing business",
      sub: "One platform — unlimited applications.",
      cta: "See pricing →",
      items: [
        { e: "🍽️", t: "Restaurants & cafés", b: "Takes reservations, answers menu questions, shares hours. Never miss a booking because nobody picked up the phone." },
        { e: "🏨", t: "Hotels & guesthouses", b: "Multilingual concierge for international guests. Answers bookings, explains amenities, upsells rooms." },
        { e: "🛍️", t: "E-commerce", b: "Recommends products, answers sizing & shipping, and recovers abandoned carts — 24/7." },
        { e: "💼", t: "Professional services", b: "Lawyers, accountants, clinics — screens inquiries and schedules consultations automatically." },
        { e: "🏫", t: "Schools & courses", b: "Answers admissions, tuition, and schedule questions. Frees up your team for real work." },
        { e: "🏢", t: "SaaS & agencies", b: "Onboards users, handles tier-1 support, and qualifies demo requests." },
      ],
    },

    pricing: {
      heading: "Transparent pricing, in Georgian Lari",
      sub: "One-time setup + optional monthly support. Own your bot forever.",
      popular: "Most popular",
      oneTime: "one-time",
      plusMonthly: "+ optional ₾200/month support",
      cta: "Contact us →",
      plans: [
        {
          name: "Starter",
          price: "₾249",
          tag: "Small business",
          cta: "Get started",
          perks: ["Custom-branded bot", "Up to 1,000 chats/month", "FAQ training in Georgian", "1 language (KA or EN)", "3 months free hosting", "Email support"],
        },
        {
          name: "Growth",
          price: "₾499",
          tag: "Most popular",
          featured: true,
          cta: "Get started",
          perks: ["Everything in Starter", "Lead capture → your email", "Up to 3 languages (KA/EN/RU)", "Custom tone & voice", "6 months free hosting", "Priority support"],
        },
        {
          name: "Premium",
          price: "₾999",
          tag: "Enterprise",
          cta: "Contact us",
          perks: ["Everything in Growth", "CRM integration", "White-label deployment", "Multilingual training", "12 months hosting + SLA", "Dedicated support"],
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

    footer: "© {year} Lumo. Built for Georgian businesses.",
    lang: "KA",
  },

  ka: {
    brand: "Lumo",
    tagline: "AI, რომელიც თქვენი კლიენტის ენაზე საუბრობს",

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
      cta: "ფასების ნახვა →",
      items: [
        { title: "სუფთა ქართული", body: "ნამდვილი, ცოცხალი ქართული — არა მანქანური თარგმანი. ასევე ინგლისურად და რუსულად თავისუფლად." },
        { title: "Streaming პასუხები", body: "ტექსტი ჩნდება მაშინვე, როცა AI ფიქრობს. ChatGPT-ის მსგავსი შეგრძნება." },
        { title: "უსაფრთხოება პირველ რიგში", body: "Rate limiting, security headers, ვალიდაცია — API გასაღებები ბრაუზერამდე არასდროს აღწევს." },
        { title: "თქვენი ბიზნესისთვის მორგებული", body: "ერთი პარაგრაფი თქვენი ბიზნესის შესახებ საკმარისია — ტონი, FAQ-ები, პროდუქტები, ყველაფერი ბოტს ახსოვს." },
        { title: "Lead-ების შეგროვება 24/7", body: "როცა კლიენტი ყიდვის განწყობაზეა, იკითხავს სახელს და კონტაქტს — პირდაპირ თქვენი იმეილისკენ." },
        { title: "ერთ დღეში გაშვება", body: "ჩვენ ვაყენებთ, Vercel-ზე ვაქვეყნებთ და ერთი სტრიქონი გრჩება საიტზე ჩასასმელად." },
      ],
    },

    how: {
      heading: "ნულიდან ცოცხლამდე — 3 ნაბიჯი",
      sub: "თქვენ გვიამბობთ ბიზნესზე. დანარჩენი ჩვენზეა.",
      cta: "ფასების ნახვა →",
      steps: [
        { t: "გვიამბეთ თქვენი ბიზნესის შესახებ", b: "მოკლე აღწერა, სასურველი სტილი, ხშირი კითხვები." },
        { t: "ჩვენ ვაკონფიგურებთ და ვაქვეყნებთ", b: "ბრენდინგი, prompt-ები, ფერები — ყველაფერი ჩართულია და თქვენს დომენზე მუშაობს." },
        { t: "ჩასვით საიტზე და დაიწყეთ", b: "ერთი ხაზი კოდი თქვენს საიტზე. კლიენტები საათის განმავლობაში დაიწყებენ საუბარს." },
      ],
    },

    usecases: {
      heading: "ნებისმიერი ბიზნესისთვის, რომელიც კლიენტთან ურთიერთობს",
      sub: "ერთი პლატფორმა — შეუზღუდავი გამოყენება.",
      cta: "ფასების ნახვა →",
      items: [
        { e: "🍽️", t: "რესტორნები და კაფეები", b: "იღებს ჯავშნებს, პასუხობს მენიუზე, იუწყება სამუშაო საათებზე. აღარ დაკარგავთ კლიენტს იმის გამო, რომ ტელეფონს ვერავინ აუღო." },
        { e: "🏨", t: "სასტუმროები და გესთჰაუსები", b: "მრავალენოვანი კონსიერჟი უცხოელი სტუმრებისთვის. პასუხობს ჯავშანზე, განმარტავს სერვისებს, ყიდის upgrade-ებს." },
        { e: "🛍️", t: "ონლაინ მაღაზიები", b: "გირჩევთ პროდუქტებს, პასუხობს ზომებზე და მიწოდებაზე, აბრუნებს მიტოვებულ კალათებს — 24/7." },
        { e: "💼", t: "პროფესიული სერვისები", b: "ადვოკატები, ბუღალტრები, კლინიკები — იღებს მიმართვებს და იწერს კონსულტაციებს ავტომატურად." },
        { e: "🏫", t: "სკოლები და კურსები", b: "პასუხობს მიღებაზე, ღირებულებაზე, განრიგზე. თქვენი გუნდი მნიშვნელოვან საქმეზე ფოკუსირდება." },
        { e: "🏢", t: "SaaS და სააგენტოები", b: "აცნობს მომხმარებლებს პროდუქტს, მართავს პირველადი დონის მხარდაჭერას, ამოწმებს დემო მოთხოვნებს." },
      ],
    },

    pricing: {
      heading: "გამჭვირვალე ფასები ლარში",
      sub: "ერთჯერადი setup + (სურვილისამებრ) თვიური მხარდაჭერა. ბოტი სამუდამოდ თქვენია.",
      popular: "ყველაზე პოპულარული",
      oneTime: "ერთჯერადი",
      plusMonthly: "+ სურვილისამებრ ₾200/თვეში მხარდაჭერა",
      cta: "დაგვიკავშირდით →",
      plans: [
        {
          name: "Starter",
          price: "₾249",
          tag: "პატარა ბიზნესი",
          cta: "დაიწყეთ",
          perks: ["ბრენდირებული ჩატბოტი", "1,000 საუბრამდე/თვეში", "FAQ ტრენინგი ქართულად", "1 ენა (KA ან EN)", "3 თვე უფასო hosting", "Email მხარდაჭერა"],
        },
        {
          name: "Growth",
          price: "₾499",
          tag: "ყველაზე პოპულარული",
          featured: true,
          cta: "დაიწყეთ",
          perks: ["ყველაფერი Starter-ში", "Lead-ები → თქვენს იმეილზე", "3 ენამდე (KA/EN/RU)", "Custom სტილი და ხმა", "6 თვე უფასო hosting", "პრიორიტეტული მხარდაჭერა"],
        },
        {
          name: "Premium",
          price: "₾999",
          tag: "Enterprise",
          cta: "დაგვიკავშირდით",
          perks: ["ყველაფერი Growth-ში", "CRM ინტეგრაცია", "White-label deploy", "მრავალენოვანი ტრენინგი", "12 თვე hosting + SLA", "გამოყოფილი მხარდაჭერა"],
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

    footer: "© {year} Lumo. შექმნილია ქართული ბიზნესისთვის.",
    lang: "EN",
  },
};
