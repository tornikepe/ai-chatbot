"use client";
import { useState, useCallback, useRef } from "react";

/**
 * useChat — custom React hook that manages all chat state and logic.
 *
 * Responsibilities:
 * 1. Store the message history (user + assistant messages)
 * 2. Send messages to the /api/chat endpoint
 * 3. Read the streaming response and update the UI in real-time
 *
 * Separating logic from UI makes the code easier to test and reuse.
 */
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return;

    // Append the user's message to the history
    const userMessage = { role: "user", content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Add an empty assistant message — it will be filled in as the stream arrives
    const assistantMessage = { role: "assistant", content: "" };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      // AbortController lets the user cancel an in-flight request
      abortRef.current = new AbortController();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
        signal: abortRef.current.signal,
      });

      // If the API returned an error, read it and show the user a specific message
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "API request failed");
      }

      // Read the streaming response chunk-by-chunk
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            const data = JSON.parse(line.slice(6));
            fullContent += data.text;

            // Update the last (assistant) message with the new content.
            // React will re-render and the user sees the text appearing live.
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
      }
    } catch (error) {
      // Ignore AbortError — it's intentional (user clicked Stop)
      if (error.name !== "AbortError") {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: `⚠️ ${error.message || "Something went wrong. Please try again."}`,
          };
          return updated;
        });
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [messages, isLoading]);

  // Cancel the current streaming response
  const stopGenerating = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  // Clear the chat history and start over
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isLoading, sendMessage, stopGenerating, clearMessages };
}
