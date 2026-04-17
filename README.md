# AI Chat Assistant — 24/7 Customer Support for Your Business

A premium, production-grade AI chatbot designed for businesses that want to turn their website into a 24/7 sales and support channel. One codebase, unlimited clients — just change environment variables.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftornikepe%2Fai-chatbot&env=AI_PROVIDER,GROQ_API_KEY,SYSTEM_PROMPT&envDescription=Pick%20an%20AI%20provider%20and%20paste%20the%20matching%20API%20key.%20Groq%20is%20free.&envLink=https%3A%2F%2Fconsole.groq.com%2Fkeys)

---

## ✨ What's inside

- **Premium landing page** — Hero, feature grid, pricing, footer. Built to sell.
- **Live streaming chat** — Tokens stream in real-time like ChatGPT.
- **Multi-provider AI** — OpenAI, Groq (free, fast), or demo mode.
- **Multi-client by design** — One deploy, many brands. All config via `NEXT_PUBLIC_*` env vars.
- **Glassmorphism UI** — Inter font, ambient gradient blobs, subtle animations.
- **Dark mode** — Respects system preference, persisted locally.
- **Security first** — CSP headers, rate limiting, input validation, no secrets in the client.
- **Production polish** — SEO metadata, Open Graph, reduced-motion support, keyboard a11y.

---

## 🚀 Quick start

```bash
git clone https://github.com/tornikepe/ai-chatbot.git
cd ai-chatbot
npm install
cp .env.example .env         # then paste your Groq or OpenAI key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔧 Configuration (per client, via env vars)

Every piece of branding is driven by environment variables — no code changes needed between deployments.

| Variable | Purpose |
|---|---|
| `AI_PROVIDER` | `openai`, `groq`, or `demo` |
| `GROQ_API_KEY` / `OPENAI_API_KEY` | API key for the chosen provider |
| `AI_MODEL` | Optional: override default model |
| `SYSTEM_PROMPT` | The "personality" — tell the AI what the business does |
| `NEXT_PUBLIC_BRAND_NAME` | Brand name shown in nav & footer |
| `NEXT_PUBLIC_HERO_HEADLINE` | Hero headline (first sentence gets color-split) |
| `NEXT_PUBLIC_HERO_SUBHEADLINE` | Hero paragraph under the headline |
| `NEXT_PUBLIC_CHAT_TITLE` | Bot name in the chat header |
| `NEXT_PUBLIC_CHAT_SUBTITLE` | Status line under the bot name |
| `NEXT_PUBLIC_WELCOME_HEADING` | Empty-state heading |
| `NEXT_PUBLIC_WELCOME_BODY` | Empty-state description |
| `NEXT_PUBLIC_PROMPTS` | JSON array of suggested prompt buttons |
| `NEXT_PUBLIC_HIDE_LANDING` | `true` → hide landing, show only the chat (for embedding) |

### Example: restaurant client

```env
SYSTEM_PROMPT="You are the friendly host of Bella Italia, a family-run Italian restaurant in downtown Tbilisi. Answer questions about the menu, hours (12pm–11pm daily), reservations, and directions. Be warm and suggest dishes when relevant."
NEXT_PUBLIC_BRAND_NAME="Bella Italia"
NEXT_PUBLIC_HERO_HEADLINE="A table awaits. Questions answered instantly."
NEXT_PUBLIC_CHAT_TITLE="Bella Italia Concierge"
NEXT_PUBLIC_PROMPTS='["What are tonight''s specials?","Can I book a table for 4?","Do you offer vegan options?"]'
```

---

## 🛡️ Security

- All API keys stay on the server — never exposed to the browser.
- Rate limiting per IP (in-memory; swap for Redis in production).
- Strict CSP & security headers (see `next.config.js`).
- Message length & count validation on every request.
- `.env` is gitignored. **Never** commit real keys.

---

## 📦 Tech stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3**
- **OpenAI SDK** (compatible with Groq)
- **Lucide icons**
- **React Markdown**

---

## 🌍 Deploy

One-click deploy to Vercel via the button above, or:

```bash
vercel --prod
```

Set your env vars in the Vercel dashboard. Done.

---

## 📄 License

MIT — build businesses with it.
