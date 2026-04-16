"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Square } from "lucide-react";

// Hard limit matches the server-side MAX_MESSAGE_LENGTH in route.js
const MAX_LENGTH = 4000;
// Show the character counter when this many characters remain
const COUNTER_THRESHOLD = 500;

/**
 * ChatInput — the message composer at the bottom of the chat.
 *
 * Features:
 *   - Enter sends; Shift+Enter inserts a newline
 *   - Auto-resizing textarea (max ~150px tall)
 *   - Character counter appears when user is near the limit
 *   - Send button disabled when empty or over the limit
 *   - Stop button replaces Send while the AI is generating
 */
export default function ChatInput({ onSend, isLoading, onStop }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const remaining = MAX_LENGTH - input.length;
  const isOverLimit = remaining < 0;
  const showCounter = remaining <= COUNTER_THRESHOLD;

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
    if (!input.trim() || isLoading || isOverLimit) return;
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
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message… (Enter to send)"
            rows={1}
            maxLength={MAX_LENGTH + 50} // allow slight overage so they see the counter turn red
            className={`w-full resize-none rounded-xl border px-4 py-3 pr-4 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              isOverLimit
                ? "border-red-400 dark:border-red-500 focus:ring-red-400"
                : "border-gray-300 dark:border-gray-600 focus:ring-violet-500 focus:border-transparent"
            }`}
          />

          {/* Character counter — only shown when user is near/over the limit */}
          {showCounter && (
            <span
              className={`absolute bottom-2.5 right-3 text-[11px] pointer-events-none ${
                isOverLimit
                  ? "text-red-500 font-medium"
                  : remaining <= 100
                  ? "text-orange-400"
                  : "text-gray-400"
              }`}
            >
              {remaining}
            </span>
          )}
        </div>

        {/* Stop or Send button */}
        {isLoading ? (
          <button
            type="button"
            onClick={onStop}
            className="flex-shrink-0 p-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors shadow-sm"
            title="Stop generating"
          >
            <Square size={17} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim() || isOverLimit}
            className="flex-shrink-0 p-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 text-white disabled:text-gray-400 transition-colors shadow-sm disabled:shadow-none"
            title="Send message"
          >
            <Send size={17} />
          </button>
        )}
      </form>

      {/* Hint text */}
      <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-1.5 ml-1">
        Shift+Enter for a new line
      </p>
    </div>
  );
}
