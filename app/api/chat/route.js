import OpenAI from "openai";

// Lazy initialization of the OpenAI client.
// The client is only created on the first request — not during the build —
// which is required for Vercel deployments where env vars are available at runtime only.
let openai;
function getClient() {
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

// System prompt defines the AI's personality and behavior.
// Customize this in .env to fit your business.
const SYSTEM_PROMPT =
  process.env.SYSTEM_PROMPT ||
  "You are a helpful customer support assistant. Be friendly, concise, and professional. Answer questions clearly and offer to help further.";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Validate input: messages must be an array
    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Call OpenAI with streaming enabled.
    // Streaming means the response arrives token-by-token instead of all at once,
    // giving a much better UX (user sees the AI "typing").
    const stream = await getClient().chat.completions.create({
      model: "gpt-4o-mini", // Fast and affordable — ideal for customer support
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
      max_tokens: 1000,
    });

    // Convert the OpenAI stream into a browser-readable stream
    // using the Server-Sent Events (SSE) format.
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
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

    // Return specific error messages so the frontend can display helpful info
    let message = "Failed to generate response";
    if (error.code === "insufficient_quota") {
      message = "API quota exceeded. Please check your OpenAI billing.";
    } else if (error.code === "invalid_api_key") {
      message = "Invalid API key. Please check your configuration.";
    } else if (error.status === 429) {
      message = "Too many requests. Please try again later.";
    }

    return Response.json({ error: message }, { status: error.status || 500 });
  }
}
