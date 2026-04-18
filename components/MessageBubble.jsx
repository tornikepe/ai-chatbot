"use client";
import { useState } from "react";
import { Copy, Check, AlertTriangle, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

/**
 * MessageBubble — renders a single chat message.
 *
 * Props:
 *   message: { id, role, content, timestamp, isError? }
 *
 * Layout:
 *   - User messages: right-aligned, violet background
 *   - Assistant messages: left-aligned, gray background, with Copy button
 *   - Error messages: left-aligned, red accent, warning icon
 *
 * All messages slide up with a fade-in animation on mount.
 */
export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const isError = message.isError;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard API may be unavailable in some environments */
    }
  };

  // Format the timestamp as HH:MM — e.g. "14:32"
  const formattedTime = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 group message-enter`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white mr-3 flex-shrink-0 mt-1 shadow-glow">
          <Sparkles size={14} />
        </div>
      )}

      {/* Bubble + metadata */}
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[78%]`}>
        {/* The bubble itself */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-violet-600 text-white rounded-br-sm"
              : isError
              ? "message-error rounded-bl-sm"
              : "bg-white/[0.05] border border-white/5 text-gray-100 rounded-bl-sm"
          }`}
        >
          {isError && (
            <div className="flex items-center gap-1.5 mb-1 text-red-400">
              <AlertTriangle size={14} />
              <span className="text-xs font-medium">Error</span>
            </div>
          )}

          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          ) : (
            <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Timestamp + copy button row */}
        <div className="flex items-center gap-3 mt-1 px-1">
          {formattedTime && (
            <span className="text-[11px] text-gray-500">
              {formattedTime}
            </span>
          )}

          {/* Copy button — only on non-error assistant messages, visible on hover */}
          {!isUser && !isError && message.content && (
            <button
              onClick={handleCopy}
              className="text-[11px] text-gray-500 hover:text-violet-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title={copied ? "Copied!" : "Copy response"}
            >
              {copied ? (
                <>
                  <Check size={11} /> Copied
                </>
              ) : (
                <>
                  <Copy size={11} /> Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-violet-500/15 ring-1 ring-violet-500/25 flex items-center justify-center text-violet-300 text-xs font-bold ml-3 flex-shrink-0 mt-1">
          You
        </div>
      )}
    </div>
  );
}
