/** @type {import('next').NextConfig} */

/**
 * Security headers applied to every response.
 * These protect users from common web attacks (XSS, clickjacking, MIME sniffing).
 * Enterprise clients often run security scanners — having these headers
 * immediately separates a professional build from an amateur one.
 */
const securityHeaders = [
  // Prevent browsers from guessing the content type (MIME sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Allow embedding in iframes from any origin — required for the embeddable widget.
  // Use Content-Security-Policy frame-ancestors if you need to restrict specific domains.
  { key: "X-Frame-Options", value: "ALLOWALL" },
  // Enable the browser's built-in XSS filter
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Control how much referrer info is sent to external sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable access to sensitive hardware APIs we don't use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Speed up DNS resolution for linked resources
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
