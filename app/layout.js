import "./globals.css";

/**
 * Layout — Next.js App Router-ის მთავარი layout.
 *
 * ეს ფაილი ყველა გვერდს ერტყმის გარშემო.
 * აქ ვსვამთ:
 * - <html> და <body> ტეგებს
 * - ფონტებს
 * - მეტა-ინფორმაციას (SEO-სთვის)
 */
export const metadata = {
  title: "AI Chatbot — Smart Customer Support",
  description:
    "AI-powered customer support chatbot for businesses. Fast, intelligent, and easy to embed on any website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-950 antialiased">
        {children}
      </body>
    </html>
  );
}
