"use client";
import ReactMarkdown from "react-markdown";

/**
 * MessageBubble — renders a single chat message.
 *
 * Props:
 *   message: { role: "user" | "assistant", content: string }
 *
 * Layout:
 *   - user messages: right-aligned, purple background
 *   - assistant messages: left-aligned, gray background
 *
 * Assistant messages are rendered as Markdown (bold, lists, code blocks, etc.)
 * because LLM responses commonly include Markdown formatting.
 */
export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {/* Assistant avatar on the left */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0">
          AI
        </div>
      )}

      {/* The message bubble itself */}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
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

      {/* User avatar on the right */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 text-sm font-bold ml-3 flex-shrink-0">
          U
        </div>
      )}
    </div>
  );
}
