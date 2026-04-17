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
    default: "AI Chat Assistant — 24/7 Customer Support for Your Business",
    template: "%s — AI Chat Assistant",
  },
  description:
    "A production-grade AI assistant that answers customer questions 24/7, captures leads, and reduces support workload. Streaming responses, fully customizable, deploy in minutes.",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 dark:from-[#0b0b12] dark:via-[#0c0a18] dark:to-[#120a20] text-gray-900 dark:text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
