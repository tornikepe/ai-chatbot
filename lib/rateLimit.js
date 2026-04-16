/**
 * Simple in-memory rate limiter.
 *
 * Tracks requests per IP address in a sliding window.
 * Protects your API key from abuse — one malicious user can't drain your credits
 * by spamming the endpoint.
 *
 * LIMITATIONS:
 *   - In-memory state is lost on server restart
 *   - Doesn't work across multiple instances (e.g., Vercel serverless)
 *
 * For production at scale, swap this for Upstash Redis or similar.
 * For a single-instance deployment (VPS, single Vercel region), this is fine.
 */

const WINDOW_MS = 60_000; // 1 minute window
const MAX_REQUESTS = 20;  // 20 requests per minute per IP

const buckets = new Map();

export function checkRateLimit(ip) {
  const now = Date.now();
  const bucket = buckets.get(ip) || [];

  // Drop timestamps older than the window
  const recent = bucket.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0];
    const retryAfter = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    return { allowed: false, retryAfter };
  }

  recent.push(now);
  buckets.set(ip, recent);

  // Opportunistic cleanup — delete buckets that haven't been touched in a while
  if (buckets.size > 10_000) {
    for (const [key, value] of buckets) {
      if (value.every((t) => now - t >= WINDOW_MS)) {
        buckets.delete(key);
      }
    }
  }

  return { allowed: true, remaining: MAX_REQUESTS - recent.length };
}
