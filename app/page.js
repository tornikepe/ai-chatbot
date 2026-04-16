"use client";
import { useState, useEffect } from "react";
import ChatWindow from "../components/ChatWindow";

/**
 * Home — მთავარი გვერდი.
 *
 * აქ ხდება:
 * 1. Dark mode-ს მართვა (localStorage-ში ინახავს)
 * 2. ChatWindow კომპონენტის ჩვენება
 *
 * "use client" ნიშნავს რომ ეს კომპონენტი ბრაუზერში მუშაობს
 * (client-side rendering), არა სერვერზე.
 */
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // dark mode-ს ჩატვირთვა localStorage-დან
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
      {/* კონტეინერი — მაქსიმუმ 800px სიგანე, სრული სიმაღლე */}
      <div className="w-full max-w-3xl h-full max-h-[800px]">
        <ChatWindow darkMode={darkMode} onToggleDark={toggleDark} />
      </div>
    </main>
  );
}
