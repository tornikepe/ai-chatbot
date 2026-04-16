"use client";
import { useState, useCallback, useRef, useEffect } from "react";

const STORAGE_KEY = "ai-chatbot-messages";

// Maximum number of past messages to keep in the UI (older ones are pruned)
const MAX_STORED_MESSAGES = 100;

// Maximum number of messages sent to the AI — keeps context relevant and
// prevents token overflow on providers with small context windows.
const MAX_CONTEXT_MESSAGES = 20;

/**
 * useChat — custom React hook that owns all chat state and logic.
 *
 * Responsibilities:
 *   1. Store message history (user + assistant)
 *   2. Persist history to localStorage (survives page refresh)
 *   3. Stream responses from /api/chat via Server-Sent Events
 *   4. Track isThinking (waiting for first token) vs isLoading (streaming)
 *   5. Allow cancellation mid-stream via AbortController
 *
 * Message shape:
 *   { id, role, content, timestamp, isError? }
 */
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const abortRef = useRef(null);

  // ── Hydrate from localStorage on first mount (client-only) ──────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      /* Ignore corrupted storage */
    }
  }, []);

  // ── Persist to localStorage whenever messages change ────────────
  useEffect(() => {
    try {
      if (messages.length > 0) {
        // Keep only the most recent N messages to avoid filling up storage
        const toStore = messages.slice(-MAX_STORED_MESSAGES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      }
    } catch {
      /* localStorage may be disabled in private browsing — fail silently */
    }
  }, [messages]);

  // ── Send a message and stream the AI response ───────────────────
  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setIsThinking(true);

    try {
      abortRef.current = new AbortController();

      // Only send the last MAX_CONTEXT_MESSAGES to the API.
      // Older messages are still visible in the UI but don't consume tokens.
      const contextMessages = updatedMessages
        .slice(-MAX_CONTEXT_MESSAGES)
        .map(({ role, content }) => ({ role, content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: contextMessages }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error (${response.status})`);
      }

      // ── Read the SSE stream ──────────────────────────────────────
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";
      let firstToken = true;
      const assistantId = crypto.randomUUID();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ") || line === "data: [DONE]") continue;

          try {
            const data = JSON.parse(line.slice(6));

            if (data.error) throw new Error(data.error);

            if (data.text) {
              if (firstToken) {
                // Replace the typing indicator with the first real token
                setIsThinking(false);
                setMessages((prev) => [
                  ...prev,
                  {
                    id: assistantId,
                    role: "assistant",
                    content: data.text,
                    timestamp: Date.now(),
                  },
                ]);
                firstToken = false;
                fullContent = data.text;
              } else {
                // Append subsequent tokens to the existing bubble
                fullContent += data.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: fullContent,
                  };
                  return updated;
                });
              }
            }
          } catch (parseErr) {
            // Only re-throw real errors, not JSON parse failures on partial chunks
            if (parseErr.message && parseErr.name !== "SyntaxError") {
              throw parseErr;
            }
          }
        }
      }
    } catch (error) {
      setIsThinking(false);

      // AbortError means the user clicked Stop — not a real error, ignore it
      if (error.name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: error.message || "Something went wrong. Please try again.",
            timestamp: Date.now(),
            isError: true,
          },
        ]);
      }
    } finally {
      setIsLoading(false);
      setIsThinking(false);
      abortRef.current = null;
    }
  }, [messages, isLoading]);

  // ── Cancel in-flight request ────────────────────────────────────
  const stopGenerating = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  // ── Clear all messages ──────────────────────────────────────────
  const clearMessages = useCallback(() => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    messages,
    isLoading,
    isThinking,
    sendMessage,
    stopGenerating,
    clearMessages,
  };
}
