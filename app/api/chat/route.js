import OpenAI from "openai";

// OpenAI კლიენტის "lazy" ინიციალიზაცია
// ანუ კლიენტი მხოლოდ მაშინ იქმნება როცა პირველი request მოვა,
// არა build-ის დროს. ეს აუცილებელია Vercel-ზე deploy-ისთვის.
let openai;
function getClient() {
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

// სისტემის prompt — ეს ეუბნება AI-ს როგორ მოიქცეს
const SYSTEM_PROMPT =
  process.env.SYSTEM_PROMPT ||
  "You are a helpful customer support assistant. Be friendly, concise, and professional. Answer questions clearly and offer to help further.";

export async function POST(request) {
  try {
    // მომხმარებლის შეტყობინებების წამოღება request body-დან
    const { messages } = await request.json();

    // ვალიდაცია — messages უნდა იყოს მასივი
    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // OpenAI API-ს გამოძახება streaming რეჟიმში
    // streaming ნიშნავს რომ პასუხი ნაწილ-ნაწილ მოდის, არა ერთიანად
    const stream = await getClient().chat.completions.create({
      model: "gpt-4o-mini", // იაფი და სწრაფი მოდელი, კლიენტებისთვის იდეალური
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true, // streaming ჩართვა
      max_tokens: 1000,
    });

    // ReadableStream-ის შექმნა — ეს ნაწილ-ნაწილ აგზავნის პასუხს ბრაუზერში
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            // SSE (Server-Sent Events) ფორმატში გაგზავნა
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

    // უფრო კონკრეტული error message-ები კლიენტისთვის
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
