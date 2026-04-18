"use client";
import { Sparkles } from "lucide-react";

/**
 * TypingIndicator — animated dots shown while the AI is "thinking".
 *
 * Appears immediately after the user sends a message, then is replaced
 * by the real assistant bubble as soon as the first token arrives.
 * This eliminates the perception of lag — the UI feels responsive even
 * when the API takes a second or two to start streaming.
 */
export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 message-enter">
      {/* AI avatar — matches MessageBubble layout */}
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white mr-3 flex-shrink-0 mt-1 shadow-glow">
        <Sparkles size={14} />
      </div>

      {/* Bubble with three bouncing dots */}
      <div className="bg-white/[0.05] border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3.5">
        <div className="flex gap-1.5 items-center h-4">
          <span
            className="w-2 h-2 rounded-full bg-violet-400/70 animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "1s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-violet-400/70 animate-bounce"
            style={{ animationDelay: "180ms", animationDuration: "1s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-violet-400/70 animate-bounce"
            style={{ animationDelay: "360ms", animationDuration: "1s" }}
          />
        </div>
      </div>
    </div>
  );
}
