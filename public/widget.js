/**
 * AI Chatbot — Embeddable Widget
 *
 * Drop this single line onto any website to add a floating AI chat button:
 *
 *   <script
 *     src="https://your-domain.com/widget.js"
 *     data-url="https://your-domain.com"
 *     data-title="Support Chat"
 *     data-position="right"
 *     data-color="#7c3aed">
 *   </script>
 *
 * Supported attributes:
 *   data-url       — chatbot URL loaded in the iframe  (default: current origin)
 *   data-title     — bot name shown in the bubble tooltip (default: "Chat with us")
 *   data-position  — "right" or "left"                (default: "right")
 *   data-color     — bubble background color (any CSS color, default: "#7c3aed")
 *
 * The script runs inside an IIFE (Immediately Invoked Function Expression)
 * so it doesn't leak any variables into the host page's global scope.
 */
(function () {
  // ── Read configuration from the <script> tag ───────────────────
  var script = document.currentScript;
  var chatbotUrl = script.getAttribute("data-url") || window.location.origin;
  var position   = script.getAttribute("data-position") || "right";
  var color      = script.getAttribute("data-color") || "#7c3aed";
  var title      = script.getAttribute("data-title") || "Chat with us";

  // ── Inject widget styles ───────────────────────────────────────
  var style = document.createElement("style");
  style.textContent = [
    "#_aichat_bubble {",
    "  position:fixed;",
    "  bottom:24px;",
    "  " + position + ":24px;",
    "  width:60px;",
    "  height:60px;",
    "  border-radius:50%;",
    "  background:" + color + ";",
    "  color:#fff;",
    "  border:none;",
    "  cursor:pointer;",
    "  box-shadow:0 4px 24px rgba(0,0,0,0.22);",
    "  display:flex;",
    "  align-items:center;",
    "  justify-content:center;",
    "  z-index:2147483646;",
    "  transition:transform 0.2s ease, box-shadow 0.2s ease;",
    "}",
    "#_aichat_bubble:hover {",
    "  transform:scale(1.1);",
    "  box-shadow:0 6px 32px rgba(0,0,0,0.3);",
    "}",
    "#_aichat_badge {",
    "  position:absolute;",
    "  top:0;",
    "  right:0;",
    "  width:16px;",
    "  height:16px;",
    "  border-radius:50%;",
    "  background:#ef4444;",
    "  border:2px solid #fff;",
    "  display:none;",
    "}",
    "#_aichat_frame {",
    "  position:fixed;",
    "  bottom:100px;",
    "  " + position + ":24px;",
    "  width:400px;",
    "  height:620px;",
    "  border:none;",
    "  border-radius:20px;",
    "  box-shadow:0 12px 56px rgba(0,0,0,0.22);",
    "  z-index:2147483645;",
    "  display:none;",
    "  overflow:hidden;",
    "  opacity:0;",
    "  transform:scale(0.95) translateY(8px);",
    "  transition:opacity 0.2s ease, transform 0.2s ease;",
    "  transform-origin:bottom " + position + ";",
    "}",
    "#_aichat_frame._aichat_open {",
    "  opacity:1;",
    "  transform:scale(1) translateY(0);",
    "}",
    "@media(max-width:480px){",
    "  #_aichat_frame{",
    "    width:calc(100vw - 24px);",
    "    height:calc(100vh - 110px);",
    "    " + position + ":12px;",
    "    bottom:88px;",
    "    border-radius:16px;",
    "  }",
    "}",
  ].join("\n");
  document.head.appendChild(style);

  // ── SVG icons ─────────────────────────────────────────────────
  var iconChat =
    '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var iconClose =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  // ── Build the bubble button ────────────────────────────────────
  var bubble = document.createElement("button");
  bubble.id = "_aichat_bubble";
  bubble.setAttribute("aria-label", title);
  bubble.setAttribute("title", title);
  bubble.innerHTML = iconChat;

  // Unread notification badge (shown when a new reply comes in while closed)
  var badge = document.createElement("span");
  badge.id = "_aichat_badge";
  bubble.appendChild(badge);

  // ── Build the iframe ───────────────────────────────────────────
  var frame = document.createElement("iframe");
  frame.id = "_aichat_frame";
  frame.src = chatbotUrl;
  frame.title = "AI Chat";
  // Sandbox: allow scripts and same-origin — enough for a Next.js app inside an iframe
  frame.setAttribute("allow", "clipboard-write");

  document.body.appendChild(bubble);
  document.body.appendChild(frame);

  // ── Listen for unread messages from the iframe ─────────────────
  // The chatbot iframe can post a message: { type: "ai-chatbot-unread" }
  // to trigger the red notification dot on the bubble.
  window.addEventListener("message", function (e) {
    if (e.origin !== chatbotUrl.replace(/\/$/, "").split("/").slice(0, 3).join("/")) return;
    if (e.data && e.data.type === "ai-chatbot-unread" && !isOpen) {
      badge.style.display = "block";
    }
  });

  // ── Toggle open / closed ───────────────────────────────────────
  var isOpen = false;

  bubble.addEventListener("click", function () {
    isOpen = !isOpen;

    if (isOpen) {
      // Open: show frame, animate in
      frame.style.display = "block";
      badge.style.display = "none"; // clear unread dot
      // Small delay so the display:block takes effect before the transition
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          frame.classList.add("_aichat_open");
        });
      });
      bubble.innerHTML = iconClose + '<span id="_aichat_badge"></span>';
    } else {
      // Close: animate out, then hide
      frame.classList.remove("_aichat_open");
      frame.addEventListener(
        "transitionend",
        function hide() {
          frame.style.display = "none";
          frame.removeEventListener("transitionend", hide);
        },
        { once: true }
      );
      bubble.innerHTML = iconChat + '<span id="_aichat_badge"></span>';
      // Re-grab the badge reference after innerHTML swap
      badge = bubble.querySelector("#_aichat_badge");
    }

    // Re-grab badge after innerHTML swap (bubble.innerHTML resets it)
    badge = document.getElementById("_aichat_badge") || bubble.querySelector("#_aichat_badge");
    bubble.setAttribute("aria-label", isOpen ? "Close chat" : title);
  });
})();
