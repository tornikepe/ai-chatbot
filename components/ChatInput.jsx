"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowUp, Square } from "lucide-react";

const MAX_LENGTH = 4000;
const COUNTER_THRESHOLD = 500;

/**
 * ChatInput — message composer.
 *
 * Single rounded pill that contains the textarea and send button as flex
 * siblings. No absolute positioning, so the button can never bleed past
 * the pill's edge — solves the cropping issue from the previous design.
 */
export default function ChatInput({ onSend, isLoading, onStop, placeholder }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const remaining = MAX_LENGTH - input.length;
  const isOverLimit = remaining < 0;
  const showCounter = remaining <= COUNTER_THRESHOLD;
  const canSend = input.trim() && !isOverLimit && !isLoading;

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 150) + "px";
    }
  }, [input]);

  const submit = (e) => {
    e?.preventDefault();
    if (!canSend) return;
    onSend(input.trim());
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-white/5 bg-[#0a0a14]/80 backdrop-blur-sm px-4 py-3">
      <form
        onSubmit={submit}
        className={`relative flex items-end gap-2 rounded-2xl border bg-white/[0.04] pl-4 pr-2 py-2 transition-colors ${
          isOverLimit
            ? "border-red-500/60"
            : "border-white/10 focus-within:border-violet-500/50 focus-within:bg-white/[0.06]"
        }`}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Message…"}
          rows={1}
          maxLength={MAX_LENGTH + 50}
          className="flex-1 self-center min-w-0 resize-none bg-transparent border-0 py-1.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0"
        />

        {isLoading ? (
          <button
            type="button"
            onClick={onStop}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
            title="Stop"
            aria-label="Stop generating"
          >
            <Square size={13} fill="currentColor" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!canSend}
            className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl transition-all ${
              canSend
                ? "bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-md shadow-violet-900/40 hover:shadow-glow hover:scale-105"
                : "bg-white/[0.06] text-gray-600"
            }`}
            title="Send"
            aria-label="Send message"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        )}

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
