"use client";
import { useEffect, useRef } from "react";
import { MessageSquarePlus, Trash2, Moon, Sun } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "../lib/useChat";

/**
 * ChatWindow — the main chat container.
 *
 * Composes:
 *   - Header (title + dark mode & clear buttons)
 *   - Messages area (scrollable, auto-scrolls to bottom)
 *   - ChatInput (message input box)
 *
 * Props:
 *   darkMode: boolean       — current theme state
 *   onToggleDark: function  — called when the theme toggle is clicked
 */
export default function ChatWindow({ darkMode, onToggleDark }) {
  const { messages, isLoading, isThinking, sendMessage, stopGenerating, clearMessages } = useChat();
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom whenever a new message arrives or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-violet-600 to-purple-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquarePlus size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">AI Assistant</h1>
            <p className="text-violet-200 text-xs">
              {isLoading ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDark}
            className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={clearMessages}
            className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
            title="Clear chat"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          // Empty state: welcome screen with suggested prompts
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4">
              <MessageSquarePlus size={28} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              How can I help you?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
              Ask me anything. I&apos;m here to assist you with any questions or concerns.
            </p>
            {/* Suggested prompt buttons — one-click starters */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {[
                "What services do you offer?",
                "How can I get started?",
                "Tell me about pricing",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-gray-800 hover:border-violet-300 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {isThinking && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} onStop={stopGenerating} />
    </div>
  );
}
