"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Square } from "lucide-react";

/**
 * ChatInput — შეტყობინების შეყვანის ველი.
 *
 * ფუნქციები:
 * - Enter-ზე დაჭერით გაგზავნა (Shift+Enter = ახალი ხაზი)
 * - auto-resize textarea (ტექსტის მიხედვით იზრდება)
 * - Loading დროს Stop ღილაკი ჩანს
 * - ცარიელ შეტყობინებას არ აგზავნის
 */
export default function ChatInput({ onSend, isLoading, onStop }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  // textarea-ს ავტომატური resize
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput("");
    // textarea-ს სიმაღლის რესეტი
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    // Enter = გაგზავნა, Shift+Enter = ახალი ხაზი
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={1}
        className="flex-1 resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
      />

      {isLoading ? (
        <button
          type="button"
          onClick={onStop}
          className="p-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
          title="Stop generating"
        >
          <Square size={18} />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white disabled:text-gray-500 transition-colors"
          title="Send message"
        >
          <Send size={18} />
        </button>
      )}
    </form>
  );
}
