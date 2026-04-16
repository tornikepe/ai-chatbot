import "./globals.css";

/**
 * Root layout — wraps every page in the app.
 *
 * Next.js App Router requires a root layout that defines <html> and <body>.
 * This is also where we set global metadata (title, description, OG tags).
 * Good SEO metadata is important when clients Google your work or share the link.
 */
export const metadata = {
  title: "AI Assistant — Smart Customer Support",
  description:
    "AI-powered customer support chatbot for businesses. Streaming responses, embeddable widget, works with OpenAI and Groq.",
  keywords: ["AI chatbot", "customer support", "chatbot widget", "AI assistant"],
  authors: [{ name: "AI Chatbot" }],
  // Open Graph — controls how the link looks when shared on LinkedIn, Slack, etc.
  openGraph: {
    title: "AI Assistant — Smart Customer Support",
    description: "Embed an AI-powered support chatbot on any website in seconds.",
    type: "website",
  },
  // Twitter/X card
  twitter: {
    card: "summary",
    title: "AI Assistant — Smart Customer Support",
  },
  // Prevent search engines from indexing the demo (remove this in production)
  // robots: { index: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7c3aed",
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
