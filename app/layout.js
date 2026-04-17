import "./globals.css";
import { Inter } from "next/font/google";

/**
 * Inter — modern, neutral UI typeface used by Vercel, Linear, Notion, etc.
 * Variable weights are loaded locally by Next.js (no FOUC, no extra request).
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ai-chatbot.vercel.app"
  ),
  title: {
    default: "Georgian Bot — AI ასისტენტი ქართული ბიზნესისთვის",
    template: "%s — Georgian Bot",
  },
  description:
    "AI ასისტენტი, რომელიც სრულყოფილად საუბრობს ქართულად და ინგლისურად. 24/7 პასუხობს თქვენს კლიენტებს, იღებს ჯავშნებს, იჭერს lead-ებს.",
  keywords: [
    "AI chatbot",
    "customer support automation",
    "24/7 support",
    "AI assistant for business",
    "website chatbot",
    "lead generation",
  ],
  authors: [{ name: "Tornike Peitrishvili" }],
  creator: "Tornike Peitrishvili",
  openGraph: {
    type: "website",
    title: "AI Chat Assistant — 24/7 Customer Support",
    description:
      "Turn your website into a 24/7 sales & support channel. Powered by GPT-class models, styled for your brand, deployed in minutes.",
    siteName: "AI Chat Assistant",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chat Assistant — 24/7 Customer Support",
    description:
      "Production-ready AI assistant for your business. Streaming, customizable, secure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf5ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b12" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#07070c] text-gray-100 min-h-screen selection:bg-violet-500/30 selection:text-white">
        {/* Deep background with subtle noise + radial violet wash */}
        <div className="fixed inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.12),transparent_55%)]" />
        <div className="fixed inset-0 -z-20 bg-[linear-gradient(180deg,#07070c_0%,#0a0a15_50%,#07070c_100%)]" />
        {children}
      </body>
    </html>
  );
}
