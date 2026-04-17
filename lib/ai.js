import OpenAI from "openai";

/**
 * AI Provider abstraction.
 *
 * Supports three modes, chosen via the AI_PROVIDER env var:
 *
 *   AI_PROVIDER=openai  (default) — uses OpenAI, requires OPENAI_API_KEY + billing
 *   AI_PROVIDER=groq              — uses Groq (FREE, very fast), requires GROQ_API_KEY
 *   AI_PROVIDER=demo              — uses canned responses, no API key needed
 *
 * Groq is OpenAI-compatible, so the same SDK works by just changing the baseURL.
 * Groq offers a generous free tier and runs Llama 3.1 / Mixtral at blazing speed.
 * Sign up at https://console.groq.com — no credit card required.
 */

// Pick provider from env. If not set, fall back to whichever API key is present.
// This way, fresh Vercel deploys without env vars still work (in demo mode),
// and setting only a key is enough to switch to real AI.
function detectProvider() {
  const explicit = (process.env.AI_PROVIDER || "").toLowerCase();
  if (explicit) return explicit;
  if (process.env.GROQ_API_KEY) return "groq";
  if (process.env.OPENAI_API_KEY) return "openai";
  return "demo";
}

const PROVIDER = detectProvider();

// Lazy-initialized client — created on first request only.
let client;

function getClient() {
  if (client) return client;

  if (PROVIDER === "groq") {
    client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });
  } else if (PROVIDER === "openai") {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

// Pick a reasonable default model per provider.
// Groq: llama-3.3-70b-versatile is dramatically smarter than 8b-instant and
// still fast enough to feel realtime. Override via AI_MODEL if you want 8b for cost.
function getModel() {
  if (PROVIDER === "groq") return process.env.AI_MODEL || "llama-3.3-70b-versatile";
  return process.env.AI_MODEL || "gpt-4o-mini";
}

/**
 * Create a streaming chat completion.
 *
 * In demo mode, returns a fake async iterator that streams a canned response
 * so the UI can be tested without any API key.
 */
export async function createChatStream(messages, systemPrompt) {
  const fullMessages = [
    { role: "system", content: systemPrompt },
    ...messages,
  ];

  if (PROVIDER === "demo") {
    return createDemoStream(messages);
  }

  return getClient().chat.completions.create({
    model: getModel(),
    messages: fullMessages,
    stream: true,
    max_tokens: 1200,
    temperature: 0.6,
    top_p: 0.9,
  });
}

/**
 * Demo stream — yields a canned response word-by-word with a small delay,
 * mimicking the shape of a real OpenAI streaming response.
 * Useful for testing the UI, recording demos, or showing clients.
 */
async function* createDemoStream(messages) {
  const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";

  let reply;
  if (lastUserMsg.includes("price") || lastUserMsg.includes("cost")) {
    reply = "Our pricing is flexible and depends on your needs. The basic package starts at **$29/month** and includes all core features. Would you like me to walk you through the options?";
  } else if (lastUserMsg.includes("service")) {
    reply = "We offer a full range of services including:\n\n- **AI-powered customer support**\n- **24/7 automated responses**\n- **Multi-language support**\n- **Custom integrations**\n\nWhich one interests you most?";
  } else if (lastUserMsg.includes("start") || lastUserMsg.includes("begin")) {
    reply = "Getting started is simple! Just **three steps**:\n\n1. Sign up for a free trial\n2. Configure your chatbot's personality\n3. Embed it on your website with one line of code\n\nReady to try it?";
  } else if (lastUserMsg.includes("hello") || lastUserMsg.includes("hi") || lastUserMsg.length < 10) {
    reply = "Hello! 👋 I'm your AI assistant (running in demo mode). Ask me anything — I'll do my best to help. Try asking about our services, pricing, or how to get started!";
  } else {
    reply = `Thanks for your message! I'm currently running in **demo mode** (no API key configured). In production, I would use OpenAI or Groq to give you a real AI-powered answer.\n\nYour message was: *"${messages[messages.length - 1]?.content}"*`;
  }

  // Stream the reply word-by-word
  const words = reply.split(" ");
  for (const word of words) {
    await new Promise((r) => setTimeout(r, 40));
    yield {
      choices: [{ delta: { content: word + " " } }],
    };
  }
}

export function getProviderInfo() {
  return { provider: PROVIDER, model: getModel() };
}
