import { cn } from "@/lib/cn";

export function GemMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <polygon points="14,8 34,8 24,18" fill="#fff" />
      <polygon points="14,8 24,18 12,18" fill="#c5ecfc" />
      <polygon points="34,8 36,18 24,18" fill="#a6e1fa" />
      <polygon points="14,8 12,18 4,18" fill="#7fd3f7" />
      <polygon points="34,8 44,18 36,18" fill="#63c1ea" />
      <polygon points="4,18 12,18 24,42" fill="#3fa9d8" />
      <polygon points="12,18 24,18 24,42" fill="#7fd3f7" />
      <polygon points="24,18 36,18 24,42" fill="#b4e6fb" />
      <polygon points="36,18 44,18 24,42" fill="#4fb4e0" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <GemMark className="size-8 shrink-0 drop-shadow-[0_0_10px_rgb(127_211_247/0.5)]" />
      <span className="font-display text-xl leading-none font-semibold tracking-tight text-white">
        Кристалл <span className="text-gold">24</span>
      </span>
    </span>
  );
}
