"use client";
import { useEffect, useRef } from "react";
import { Sparkles, Trash2 } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "../lib/useChat";

/**
 * ChatWindow — the main chat container.
 * Config values come from NEXT_PUBLIC_* env vars set per deployment.
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

  const title = config.title || "AI Assistant";
  const subtitle = config.subtitle || "Online";

  // Auto-scroll the MESSAGES container only — never the page.
  useEffect(() => {
    const c = messagesContainerRef.current;
    if (c) c.scrollTop = c.scrollHeight;
  }, [messages, isThinking]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a14]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
      {/* ── Header — refined glassmorphism, not heavy gradient ───── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-glow">
              <Sparkles size={18} className="text-white" />
            </div>
            {/* Online status — pulsing green dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 ring-2 ring-[#0a0a14]">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
            </span>
          </div>
          <div>
            <h1 className="text-gray-100 font-semibold text-[15px] leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">
              {isLoading ? "typing…" : subtitle}
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-white/5 transition-colors"
            title="Clear conversation"
            aria-label="Clear conversation"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* ── Messages area ──────────────────────────────────────── */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-5 py-6"
      >
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
  "Tell me about pricing",
  "How do I get started?",
];

function EmptyState({ onSend, config = {} }) {
  const heading = config.welcomeHeading || "How can I help you today?";
  const body =
    config.welcomeBody ||
    "Ask me anything — I reply instantly.";
  const prompts =
    config.prompts && config.prompts.length > 0
      ? config.prompts
      : DEFAULT_PROMPTS;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-2 animate-fade-in">
      {/* Bot avatar with soft halo */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-violet-500/30 blur-2xl rounded-full" />
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-glow">
          <Sparkles size={28} className="text-white" />
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-100 mb-2 tracking-tight">
        {heading}
      </h2>
      <p className="text-gray-400 text-sm max-w-[280px] leading-relaxed">
        {body}
      </p>

      {/* Suggested prompts — vertical list, more clickable */}
      <div className="flex flex-col gap-2 mt-7 w-full max-w-xs">
        {prompts.slice(0, 4).map((q) => (
          <button
            key={q}
            onClick={() => onSend(q)}
            className="text-left px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-gray-300 hover:bg-violet-500/10 hover:border-violet-500/40 hover:text-violet-100 transition-all"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
