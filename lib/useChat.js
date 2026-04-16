"use client";
import { useState, useCallback, useRef, useEffect } from "react";

const STORAGE_KEY = "ai-chatbot-messages";

/**
 * useChat — custom React hook that manages all chat state and logic.
 *
 * Responsibilities:
 *   1. Store the message history (user + assistant messages)
 *   2. Persist history to localStorage (survives page refresh)
 *   3. Send messages to the /api/chat endpoint
 *   4. Read the streaming response and update the UI in real-time
 *   5. Expose isThinking (before first token) vs isStreaming (tokens arriving)
 *
 * Separating logic from UI makes the code easier to test and reuse.
 */
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false); // true before first token
  const abortRef = useRef(null);

  // Hydrate messages from localStorage on first mount (client-only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  // Persist messages whenever they change
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch {
      /* localStorage may be disabled (e.g., private browsing) */
    }
  }, [messages]);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return;

    const userMessage = { role: "user", content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setIsThinking(true); // show typing indicator until first token arrives

    try {
      abortRef.current = new AbortController();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "API request failed");
      }

      // Read the streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";
      let firstToken = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const data = JSON.parse(line.slice(6));

              // Check for server-side stream errors
              if (data.error) {
                throw new Error(data.error);
              }

              if (data.text) {
                // On first token: swap the typing indicator for the real bubble
                if (firstToken) {
                  setIsThinking(false);
                  setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.text },
                  ]);
                  firstToken = false;
                  fullContent = data.text;
                } else {
                  fullContent += data.text;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: "assistant",
                      content: fullContent,
                    };
                    return updated;
                  });
                }
              }
            } catch (parseErr) {
              if (parseErr.message && parseErr.message !== "API request failed") throw parseErr;
            }
          }
        }
      }
    } catch (error) {
      setIsThinking(false);
      if (error.name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `⚠️ ${error.message || "Something went wrong. Please try again."}`,
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

  const stopGenerating = useCallback(() => {
    abortRef.current?.abort();
  }, []);

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
