"use client";
import { useState, useEffect } from "react";
import ChatWindow from "../components/ChatWindow";

/**
 * Home — the main landing page.
 *
 * Responsible for:
 *   1. Managing dark/light mode (persisted to localStorage)
 *   2. Centering the ChatWindow on screen
 *
 * The "use client" directive opts this component into client-side rendering,
 * which is required because we use useState / useEffect / localStorage.
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

  return (
    <main className="h-screen flex items-center justify-center p-4 md:p-8">
      {/* Container: max 800px wide, full height (capped at 800px) */}
      <div className="w-full max-w-3xl h-full max-h-[800px]">
        <ChatWindow darkMode={darkMode} onToggleDark={toggleDark} />
      </div>
    </main>
  );
}
