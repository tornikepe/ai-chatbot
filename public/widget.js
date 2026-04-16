/**
 * Embeddable Chat Widget
 *
 * Adds a floating chat bubble + iframe-based chat window to any website
 * with a single line of code:
 *
 *   <script src="https://your-domain.com/widget.js"
 *           data-url="https://your-domain.com"></script>
 *
 * Supported data-* attributes:
 *   data-url       — the chatbot URL to load in the iframe (default: current origin)
 *   data-position  — "right" or "left" (default: "right")
 *   data-color     — bubble color, any CSS color (default: "#7c3aed")
 *
 * The script is a self-executing function (IIFE) so it doesn't leak
 * variables into the host page.
 */
(function () {
  // Read config from the <script> tag's data-* attributes
  const script = document.currentScript;
  const chatbotUrl = script.getAttribute("data-url") || window.location.origin;
  const position = script.getAttribute("data-position") || "right";
  const primaryColor = script.getAttribute("data-color") || "#7c3aed";

  // Inject widget styles into the host page
  const style = document.createElement("style");
  style.textContent = `
    #ai-chatbot-widget-bubble {
      position: fixed;
      bottom: 24px;
      ${position}: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: ${primaryColor};
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 24px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #ai-chatbot-widget-bubble:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 32px rgba(0,0,0,0.3);
    }
    #ai-chatbot-widget-frame {
      position: fixed;
      bottom: 100px;
      ${position}: 24px;
      width: 400px;
      height: 600px;
      border: none;
      border-radius: 16px;
      box-shadow: 0 8px 48px rgba(0,0,0,0.2);
      z-index: 99998;
      display: none;
      overflow: hidden;
    }
    @media (max-width: 480px) {
      #ai-chatbot-widget-frame {
        width: calc(100vw - 32px);
        height: calc(100vh - 140px);
        ${position}: 16px;
        bottom: 90px;
      }
    }
  `;
  document.head.appendChild(style);

  // Create the floating bubble button
  const bubble = document.createElement("button");
  bubble.id = "ai-chatbot-widget-bubble";
  bubble.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  bubble.setAttribute("aria-label", "Open chat");
  document.body.appendChild(bubble);

  // Create the iframe that hosts the chatbot
  const frame = document.createElement("iframe");
  frame.id = "ai-chatbot-widget-frame";
  frame.src = chatbotUrl;
  frame.title = "AI Chat Assistant";
  document.body.appendChild(frame);

  // Toggle open/closed on bubble click and swap the icon
  let isOpen = false;
  bubble.addEventListener("click", function () {
    isOpen = !isOpen;
    frame.style.display = isOpen ? "block" : "none";
    bubble.innerHTML = isOpen
      ? `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  });
})();
