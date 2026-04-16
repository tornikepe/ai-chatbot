"use client";
import { useState, useCallback, useRef } from "react";

/**
 * useChat — custom hook რომელიც მართავს ჩატის მთელ ლოგიკას.
 *
 * რას აკეთებს:
 * 1. ინახავს შეტყობინებების ისტორიას (messages)
 * 2. აგზავნის შეტყობინებას API-ზე
 * 3. streaming-ით იღებს პასუხს და რეალ-თაიმში აჩვენებს
 *
 * ეს არის "custom hook" — React-ში ხშირად გამოიყენება ლოგიკის
 * გამოსაყოფად UI-სგან. ანუ ლოგიკა ცალკე, ვიზუალი ცალკე.
 */
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return;

    // მომხმარებლის შეტყობინების დამატება
    const userMessage = { role: "user", content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    // ცარიელი assistant შეტყობინების დამატება (აქ ჩაიწერება streaming პასუხი)
    const assistantMessage = { role: "assistant", content: "" };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      // AbortController — საშუალებას გვაძლევს გავაუქმოთ request
      abortRef.current = new AbortController();

      // API-ზე POST request-ის გაგზავნა
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
        signal: abortRef.current.signal,
      });

      // თუ API-მ error დააბრუნა — წავიკითხოთ და მომხმარებელს ვუჩვენოთ
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "API request failed");
      }

      // Streaming პასუხის წაკითხვა
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // ბაიტების ტექსტად გარდაქმნა
        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            const data = JSON.parse(line.slice(6));
            fullContent += data.text;

            // რეალ-თაიმში განახლება — მომხმარებელი ხედავს როგორ იწერება პასუხი
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

  // შეტყობინების გაუქმება (stop ღილაკისთვის)
  const stopGenerating = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  // ახალი საუბრის დაწყება
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isLoading, sendMessage, stopGenerating, clearMessages };
}
