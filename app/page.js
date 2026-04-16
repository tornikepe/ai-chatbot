"use client";
import { useState, useEffect } from "react";
import ChatWindow from "../components/ChatWindow";

/**
 * Home page — manages dark/light mode and passes brand config to ChatWindow.
 *
 * Brand config is driven entirely by NEXT_PUBLIC_* environment variables
 * set in the Vercel dashboard. This means you can deploy ONE codebase and
 * customize it for every client without touching code — just change env vars.
 *
 * Available env vars:
 *   NEXT_PUBLIC_CHAT_TITLE       — Bot name shown in the header
 *   NEXT_PUBLIC_CHAT_SUBTITLE    — Status line under the name
 *   NEXT_PUBLIC_WELCOME_HEADING  — Heading in the empty state
 *   NEXT_PUBLIC_WELCOME_BODY     — Description text in the empty state
 *   NEXT_PUBLIC_PROMPTS          — JSON array of suggested prompt strings
 */
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Restore dark mode preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", next);
    document.documentElement.classList.toggle("dark", next);
  };

  // ── Read brand config from env vars (with sensible defaults) ────
  const config = {
    title: process.env.NEXT_PUBLIC_CHAT_TITLE || "AI Assistant",
    subtitle: process.env.NEXT_PUBLIC_CHAT_SUBTITLE || "",
    welcomeHeading:
      process.env.NEXT_PUBLIC_WELCOME_HEADING || "How can I help you today?",
    welcomeBody:
      process.env.NEXT_PUBLIC_WELCOME_BODY ||
      "I'm your AI-powered assistant. Ask me anything and I'll respond instantly.",
    prompts: (() => {
      try {
        return JSON.parse(process.env.NEXT_PUBLIC_PROMPTS || "[]");
      } catch {
        return [];
      }
    })(),
  };

  return (
    <main className="h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl h-full max-h-[800px]">
        <ChatWindow darkMode={darkMode} onToggleDark={toggleDark} config={config} />
      </div>
    </main>
  );
}
