import "./globals.css";

/**
 * Root layout — wraps every page in the app.
 *
 * Next.js App Router requires a root layout that defines <html> and <body>.
 * This is also where you set global metadata (SEO) and load fonts.
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
