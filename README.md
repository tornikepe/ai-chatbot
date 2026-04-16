# AI Chatbot — Smart Customer Support

A modern, AI-powered customer support chatbot that can be embedded on any website with a single line of code. Built with Next.js, OpenAI API, and Tailwind CSS.

## Features

- **Streaming Responses** — AI replies appear in real-time, word by word
- **Embeddable Widget** — Add to any website with one `<script>` tag
- **Dark / Light Mode** — Automatic theme switching
- **Markdown Support** — AI responses render bold, lists, code blocks
- **Mobile Responsive** — Works on all screen sizes
- **Customizable** — Change colors, position, and system prompt
- **Fast** — Built on Next.js App Router with edge-ready API routes

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/ai-chatbot.git
cd ai-chatbot
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-api-key-here
SYSTEM_PROMPT="You are a helpful assistant for [Your Business Name]."
```

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the chatbot.

## Embed on Any Website

Deploy your chatbot (e.g., on Vercel), then add this single line to any website:

```html
<script src="https://your-chatbot-url.vercel.app/widget.js" data-url="https://your-chatbot-url.vercel.app"></script>
```

### Widget Options

| Attribute | Default | Description |
|-----------|---------|-------------|
| `data-url` | Current origin | Your deployed chatbot URL |
| `data-position` | `right` | Widget position: `right` or `left` |
| `data-color` | `#7c3aed` | Bubble button color (any hex) |

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **AI:** [OpenAI API](https://openai.com/) (GPT-4o-mini)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Project Structure

```
ai-chatbot/
├── app/
│   ├── api/chat/route.js    # AI streaming API endpoint
│   ├── layout.js            # Root layout with metadata
│   ├── page.js              # Main chat page
│   └── globals.css          # Global styles
├── components/
│   ├── ChatWindow.jsx       # Main chat container
│   ├── ChatInput.jsx        # Message input with auto-resize
│   └── MessageBubble.jsx    # Individual message display
├── lib/
│   └── useChat.js           # Custom hook for chat logic
├── public/
│   ├── widget.js            # Embeddable widget script
│   └── demo.html            # Widget demo page
└── .env.example             # Environment variables template
```

## Customization

### Change the AI behavior

Edit the `SYSTEM_PROMPT` in your `.env` file:

```
SYSTEM_PROMPT="You are a sales assistant for an e-commerce store. Help customers find products, answer questions about shipping, and process returns."
```

### Use a different AI model

In `app/api/chat/route.js`, change the model:

```js
model: "gpt-4o"        // More capable, higher cost
model: "gpt-4o-mini"   // Fast and affordable (default)
model: "gpt-3.5-turbo" // Budget option
```

## Deploy

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add `OPENAI_API_KEY` to environment variables
4. Deploy

## License

MIT
