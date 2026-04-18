"use client";
import { useEffect, useState, useCallback } from "react";
import { T } from "./i18n";

const STORAGE_KEY = "lumo-lang";
const DEFAULT_LANG = "ka";

export function useLang() {
  const [lang, setLang] = useState(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ka" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "ka" ? "en" : "ka";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return { lang, setLang, toggle, t: T[lang] };
}
