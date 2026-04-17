import { createChatStream } from "../../../lib/ai";
import { checkRateLimit } from "../../../lib/rateLimit";

// Force Node.js runtime — the OpenAI SDK uses Node-specific APIs.
// force-dynamic ensures this route is never statically cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Validation limits ────────────────────────────────────────────────
const MAX_MESSAGES = 50;          // Max messages per request
const MAX_MESSAGE_LENGTH = 4000;  // Max characters per message
const VALID_ROLES = new Set(["user", "assistant", "system"]);

const SYSTEM_PROMPT =
  process.env.SYSTEM_PROMPT ||
  `You are "Georgian Bot" — a sharp, friendly AI assistant built for Georgian businesses. You are fluent in Georgian (ქართული), English, and Russian, and you ALWAYS reply in the exact language the user wrote in.

Core behavior:
- Detect the user's language from their message and reply in that language. Georgian users get Georgian. English users get English.
- Be warm, professional, and concise (1–3 short paragraphs max). Use bullet points for lists.
- For Georgian: use natural, modern Georgian — not machine-translated wording. Avoid transliteration.
- When asked about business specifics you don't know (hours, prices, stock), honestly say you don't have that exact info, and offer to collect the user's name + phone/email so a human can follow up.
- Never invent prices, promises, or facts. Never claim to be human.
- If the user shows buying or booking intent, politely ask for their name and contact (phone or email).
- Use Markdown sparingly: **bold** for emphasis, lists for options.`;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// ── POST /api/chat ───────────────────────────────────────────────────
export async function POST(request) {
  try {
    // ── Rate limit by client IP ────────────────────────────────────
    // x-forwarded-for may contain a comma-separated list; take the first (real client)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return Response.json(
        { error: `Rate limit exceeded. Try again in ${rate.retryAfter}s.` },
        { status: 429 }
      );
    }

    // ── Parse the request body ─────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const { messages } = body;

    // ── Validate messages array ────────────────────────────────────
    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "messages must be a non-empty array." },
        { status: 400 }
      );
    }

    if (messages.length > MAX_MESSAGES) {
      return Response.json(
        { error: `Too many messages. Maximum allowed: ${MAX_MESSAGES}.` },
        { status: 400 }
      );
    }

    // Validate each individual message
    for (const msg of messages) {
      if (!VALID_ROLES.has(msg.role)) {
        return Response.json(
          { error: `Invalid message role: "${msg.role}".` },
          { status: 400 }
        );
      }
      if (typeof msg.content !== "string" || !msg.content.trim()) {
        return Response.json(
          { error: "Each message must have non-empty string content." },
          { status: 400 }
        );
      }
      if (msg.content.length > MAX_MESSAGE_LENGTH) {
        return Response.json(
          {
            error: `Message too long. Maximum: ${MAX_MESSAGE_LENGTH} characters.`,
          },
          { status: 400 }
        );
      }
    }

    // ── Call the AI provider and stream the response ───────────────
    const stream = await createChatStream(messages, SYSTEM_PROMPT);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
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
        "Cache-Control": "no-cache, no-store",
        Connection: "keep-alive",
        ...CORS_HEADERS,
      },
    });
  } catch (error) {
    console.error("[Chat API]", error.message);

    // Translate provider errors into user-friendly messages
    let message = "Failed to generate a response. Please try again.";
    let status = error.status || 500;

    if (error.code === "insufficient_quota") {
      message =
        "API quota exceeded. Please check your billing or switch to a different AI provider.";
    } else if (error.code === "invalid_api_key") {
      message = "Invalid API key. Please check the server configuration.";
      status = 503;
    } else if (error.status === 429) {
      message = "The AI provider is rate-limited. Please try again in a moment.";
    }

    return Response.json({ error: message }, { status });
  }
}
