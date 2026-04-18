"use client";

/**
 * Lumo logo — a stylized "L" + orbit dot inside a rounded-square mark.
 * The violet→fuchsia gradient is the brand's signature color.
 */
export default function Logo({ size = 36, withWordmark = true, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-label="Lumo logo"
      >
        <defs>
          <linearGradient id="lumo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          <linearGradient id="lumo-grad-soft" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f0abfc" />
          </linearGradient>
        </defs>

        {/* Rounded-square background with gradient */}
        <rect x="1" y="1" width="38" height="38" rx="10" fill="url(#lumo-grad)" />

        {/* Soft highlight for depth */}
        <rect x="1" y="1" width="38" height="19" rx="10" fill="white" fillOpacity="0.12" />

        {/* Stylized "L" — bold, modern */}
        <path
          d="M13 10 L13 28 L25 28"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Orbit dot — the "spark" / light */}
        <circle cx="28" cy="12" r="3" fill="white" />
        <circle cx="28" cy="12" r="5" fill="white" fillOpacity="0.25" />
      </svg>

      {withWordmark && (
        <span className="text-[17px] font-semibold tracking-tight text-gray-100">
          Lumo
        </span>
      )}
    </div>
  );
}
