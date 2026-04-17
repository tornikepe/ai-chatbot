"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowUp, Square } from "lucide-react";

// Hard limit matches the server-side MAX_MESSAGE_LENGTH in route.js
const MAX_LENGTH = 4000;
// Show the character counter when this many characters remain
const COUNTER_THRESHOLD = 500;

/**
 * ChatInput — the message composer at the bottom of the chat.
 *
 * Single rounded-pill input with the send button tucked inside (ChatGPT-style).
 * No hint paragraph below — the placeholder + intuitive arrow icon are enough.
 */
export default function ChatInput({ onSend, isLoading, onStop, placeholder }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const remaining = MAX_LENGTH - input.length;
  const isOverLimit = remaining < 0;
  const showCounter = remaining <= COUNTER_THRESHOLD;
  const canSend = input.trim() && !isOverLimit && !isLoading;

  // Auto-resize the textarea to fit its content (capped at 150px)
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSend) return;
    onSend(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-white/5 bg-[#0d0d18]/80 backdrop-blur-sm px-4 py-3">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Message…"}
          rows={1}
          maxLength={MAX_LENGTH + 50}
          className={`w-full resize-none rounded-2xl border bg-white/[0.05] pl-4 pr-14 py-3.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-all ${
            isOverLimit
              ? "border-red-500/60 focus:border-red-500/80"
              : "border-white/10 focus:border-violet-500/50 focus:bg-white/[0.07]"
          }`}
        />

        {/* Send / Stop button — tucked inside the input on the right */}
        <div className="absolute bottom-2 right-2">
          {isLoading ? (
            <button
              type="button"
              onClick={onStop}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors shadow-sm"
              title="Stop"
              aria-label="Stop generating"
            >
              <Square size={14} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canSend}
              className={`w-9 h-9 flex items-center justify-center rounded-xl text-white transition-all ${
                canSend
                  ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 hover:shadow-glow hover:scale-105"
                  : "bg-white/10 text-gray-600 cursor-not-allowed"
              }`}
              title="Send"
              aria-label="Send message"
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Character counter — floats above the input, only when near the limit */}
        {showCounter && (
          <span
            className={`absolute -top-5 right-2 text-[11px] tabular-nums pointer-events-none ${
              isOverLimit
                ? "text-red-500 font-medium"
                : remaining <= 100
                ? "text-orange-400"
                : "text-gray-500"
            }`}
          >
            {remaining}
          </span>
        )}
      </form>
    </div>
  );
}
