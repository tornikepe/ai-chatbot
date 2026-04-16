"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

/**
 * MessageBubble — renders a single chat message.
 *
 * Props:
 *   message: { role: "user" | "assistant", content: string }
 *
 * Layout:
 *   - user messages: right-aligned, purple background
 *   - assistant messages: left-aligned, gray background, with a Copy button
 *
 * Assistant messages are rendered as Markdown (bold, lists, code blocks, etc.)
 * because LLM responses commonly include Markdown formatting.
 */
export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard API may be unavailable in some browsers — silently fail */
    }
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 group`}>
      {/* Assistant avatar on the left */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0">
          AI
        </div>
      )}

      {/* Bubble + copy button wrapper */}
      <div className="flex flex-col max-w-[75%]">
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-violet-600 text-white rounded-br-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md"
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Copy button — only on assistant messages, appears on hover */}
        {!isUser && message.content && (
          <button
            onClick={handleCopy}
            className="mt-1 self-start text-xs text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            title={copied ? "Copied!" : "Copy response"}
          >
            {copied ? (
              <>
                <Check size={12} /> Copied
              </>
            ) : (
              <>
                <Copy size={12} /> Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* User avatar on the right */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 text-sm font-bold ml-3 flex-shrink-0">
          U
        </div>
      )}
    </div>
  );
}
