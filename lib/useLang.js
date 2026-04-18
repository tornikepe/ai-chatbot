"use client";
import { useSyncExternalStore, useCallback } from "react";
import { T } from "./i18n";

const STORAGE_KEY = "lumo-lang";
const DEFAULT_LANG = "ka";

let currentLang = DEFAULT_LANG;
const listeners = new Set();

if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ka" || saved === "en") currentLang = saved;
  } catch {}

  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY && (e.newValue === "ka" || e.newValue === "en")) {
      currentLang = e.newValue;
      listeners.forEach((l) => l());
    }
  });
}

function setLangGlobal(next) {
  if (next !== "ka" && next !== "en") return;
  if (currentLang === next) return;
  currentLang = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return currentLang;
}

function getServerSnapshot() {
  return DEFAULT_LANG;
}

export function useLang() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLang = useCallback((next) => setLangGlobal(next), []);
  const toggle = useCallback(() => setLangGlobal(lang === "ka" ? "en" : "ka"), [lang]);
  return { lang, setLang, toggle, t: T[lang] };
}
