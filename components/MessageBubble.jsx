"use client";
import ReactMarkdown from "react-markdown";

/**
 * MessageBubble — ერთი შეტყობინების ბუშტი.
 *
 * Props:
 * - message: { role: "user" | "assistant", content: "..." }
 *
 * user = მარჯვნივ, ლურჯი ფონით
 * assistant = მარცხნივ, ნაცრისფერი ფონით
 *
 * ReactMarkdown — AI-ს პასუხი ხშირად markdown ფორმატშია
 * (bold, lists, code blocks). ეს კომპონენტი HTML-ად გარდაქმნის.
 */
export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {/* ავატარი */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0">
          AI
        </div>
      )}

      {/* შეტყობინების ბუშტი */}
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

      {/* მომხმარებლის ავატარი */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 text-sm font-bold ml-3 flex-shrink-0">
          U
        </div>
      )}
    </div>
  );
}
