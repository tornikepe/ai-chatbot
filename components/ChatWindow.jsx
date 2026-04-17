"use client";
import { useEffect, useRef } from "react";
import { Bot, Trash2, Zap, Shield, Globe } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "../lib/useChat";

/**
 * ChatWindow — the main chat container.
 *
 * Props:
 *   config: {
 *     title, subtitle, welcomeHeading, welcomeBody, prompts
 *   }
 *
 * All config values come from NEXT_PUBLIC_* env vars set per deployment.
 */
export default function ChatWindow({ config = {} }) {
  const {
    messages,
    isLoading,
    isThinking,
    sendMessage,
    stopGenerating,
    clearMessages,
  } = useChat();

  const messagesContainerRef = useRef(null);

  const title = config.title || "Tornikes AI BOT";
  const subtitle = config.subtitle || "";

  // Auto-scroll the MESSAGES container only — never the page.
  // Using scrollIntoView() would scroll all ancestors, including the page,
  // so we manipulate the container's scrollTop directly.
  useEffect(() => {
    const c = messagesContainerRef.current;
    if (c) c.scrollTop = c.scrollHeight;
  }, [messages, isThinking]);

  return (
    <div className="flex flex-col h-full bg-[#0d0d18]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 ring-1 ring-black/40 overflow-hidden">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-gradient-to-r from-violet-700 via-violet-700 to-fuchsia-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-base leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLoading ? "bg-yellow-300 animate-pulse" : "bg-green-400"
                }`}
              />
              <p className="text-violet-200 text-xs">
                {isLoading ? "Typing..." : subtitle || "Online"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              title="Clear conversation"
            >
              <Trash2 size={17} />
            </button>
          )}
        </div>
      </div>

      {/* ── Messages area ──────────────────────────────────────── */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-5 py-5">
        {messages.length === 0 ? (
          <EmptyState onSend={sendMessage} config={config} />
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isThinking && <TypingIndicator />}
          </>
        )}
      </div>

      {/* ── Input ──────────────────────────────────────────────── */}
      <ChatInput
        onSend={sendMessage}
        isLoading={isLoading}
        onStop={stopGenerating}
        placeholder={config.inputPlaceholder}
      />
    </div>
  );
}

// ── Empty state ─────────────────────────────────────────────────────
const DEFAULT_PROMPTS = [
  "What services do you offer?",
  "How can I get started?",
  "Tell me about pricing",
  "Do you offer a free trial?",
];

const DEFAULT_FEATURES = [
  { icon: Zap, label: "Instant replies" },
  { icon: Shield, label: "Secure & private" },
  { icon: Globe, label: "Available 24/7" },
];

function EmptyState({ onSend, config = {} }) {
  const heading = config.welcomeHeading || "How can I help you today?";
  const body =
    config.welcomeBody ||
    "I'm your AI-powered assistant. Ask me anything and I'll respond instantly.";
  const prompts =
    config.prompts && config.prompts.length > 0
      ? config.prompts
      : DEFAULT_PROMPTS;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-5 shadow-lg shadow-violet-200 dark:shadow-violet-900/30">
        <Bot size={30} className="text-white" />
      </div>

      <h2 className="text-xl font-semibold text-gray-100 mb-2">
        {heading}
      </h2>
      <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
        {body}
      </p>

      {/* Feature pills */}
      <div className="flex items-center gap-4 mt-5 mb-6">
        {DEFAULT_FEATURES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 text-xs text-gray-500"
          >
            <Icon size={13} className="text-violet-400" />
            {label}
          </div>
        ))}
      </div>

      {/* Suggested prompts */}
      <div className="flex flex-wrap gap-2 justify-center max-w-sm">
        {prompts.map((q) => (
          <button
            key={q}
            onClick={() => onSend(q)}
            className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-gray-300 hover:bg-violet-500/10 hover:border-violet-500/50 hover:text-violet-200 transition-all"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
