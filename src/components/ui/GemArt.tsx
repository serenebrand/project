import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

// Large decorative crystal. Uses fixed gradient ids, so render it once per page.
export function GemArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="gemart-line" x1="60" y1="150" x2="540" y2="560" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#7fd3f7" stopOpacity="0.7" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="gemart-left" x1="60" y1="150" x2="300" y2="560" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c5ecfc" stopOpacity="0.3" />
          <stop offset="1" stopColor="#7fd3f7" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="gemart-right" x1="540" y1="150" x2="300" y2="560" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#7fd3f7" stopOpacity="0.03" />
        </linearGradient>
        <radialGradient id="gemart-glow" cx="300" cy="320" r="270" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7fd3f7" stopOpacity="0.22" />
          <stop offset="1" stopColor="#7fd3f7" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="300" cy="320" r="270" fill="url(#gemart-glow)" />

      <polygon points="60,250 200,150 180,250" fill="url(#gemart-left)" />
      <polygon points="200,150 300,250 180,250" fill="#fff" fillOpacity="0.07" />
      <polygon points="200,150 400,150 300,250" fill="#fff" fillOpacity="0.16" />
      <polygon points="400,150 420,250 300,250" fill="#fff" fillOpacity="0.05" />
      <polygon points="400,150 540,250 420,250" fill="url(#gemart-right)" />
      <polygon points="60,250 180,250 300,560" fill="url(#gemart-left)" />
      <polygon points="180,250 300,250 300,560" fill="#7fd3f7" fillOpacity="0.1" />
      <polygon points="300,250 420,250 300,560" fill="#fff" fillOpacity="0.06" />
      <polygon points="420,250 540,250 300,560" fill="url(#gemart-right)" />

      <g stroke="url(#gemart-line)" strokeWidth="1.5" strokeLinejoin="round">
        <polygon points="200,150 400,150 540,250 300,560 60,250" />
        <path d="M60 250H540M200 150 180 250M200 150 300 250M400 150 300 250M400 150 420 250M180 250 300 560M300 250V560M420 250 300 560" />
      </g>
    </svg>
  );
}

type SparkleProps = {
  /** Position, size and colour, e.g. "left-[12%] top-[30%] size-4 text-ice". */
  className?: string;
  /** Seconds; offsets the twinkle so sparkles do not pulse in unison. */
  delay?: number;
};

export function Sparkle({ className, delay = 0 }: SparkleProps) {
  const style: CSSProperties = { animationDelay: `${delay}s` };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("pointer-events-none absolute animate-twinkle", className)}
      style={style}
    >
      <path
        fill="currentColor"
        d="M12 0c.6 7.5 4.5 11.4 12 12-7.5.6-11.4 4.5-12 12-.6-7.5-4.5-11.4-12-12 7.5-.6 11.4-4.5 12-12Z"
      />
    </svg>
  );
}
