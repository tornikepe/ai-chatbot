import { createChatStream } from "../../../lib/ai";
import { checkRateLimit } from "../../../lib/rateLimit";

const SYSTEM_PROMPT =
  process.env.SYSTEM_PROMPT ||
  "You are a helpful customer support assistant. Be friendly, concise, and professional. Answer questions clearly and offer to help further.";

export async function POST(request) {
  try {
    // Basic rate limiting — protects your API bill from abuse
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return Response.json(
        { error: `Rate limit exceeded. Try again in ${rate.retryAfter}s.` },
        { status: 429 }
      );
    }

    const { messages } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Delegate to the provider abstraction — works with OpenAI, Groq, or demo mode
    const stream = await createChatStream(messages, SYSTEM_PROMPT);

    // Re-encode the OpenAI-style stream as Server-Sent Events for the browser
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
        } catch (err) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`)
          );
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Translate common API errors into user-friendly messages
    let message = "Failed to generate response";
    if (error.code === "insufficient_quota") {
      message = "API quota exceeded. Please check your billing or switch provider.";
    } else if (error.code === "invalid_api_key") {
      message = "Invalid API key. Please check your .env configuration.";
    } else if (error.status === 429) {
      message = "Too many requests. Please try again later.";
    }

    return Response.json({ error: message }, { status: error.status || 500 });
  }
}
