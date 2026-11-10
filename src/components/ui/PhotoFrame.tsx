import { Armchair, Store, UtensilsCrossed, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Photo, PhotoKind } from "@/lib/photo-types";

const ART: Record<PhotoKind, { Icon: LucideIcon; tone: string; glow: string }> = {
  interior: {
    Icon: Armchair,
    tone: "from-[#14294f] via-[#0d1a33] to-[#070f1e]",
    glow: "rgb(127 211 247 / 0.3)",
  },
  food: {
    Icon: UtensilsCrossed,
    tone: "from-[#2b2616] via-[#151a26] to-[#080e1a]",
    glow: "rgb(212 175 55 / 0.3)",
  },
  exterior: {
    Icon: Store,
    tone: "from-[#1c2c44] via-[#111c2e] to-[#080f1c]",
    glow: "rgb(197 236 252 / 0.22)",
  },
};

type PhotoFrameProps = {
  /** Real photo from /public/photos; a themed placeholder is drawn when it is missing. */
  photo?: Photo;
  kind: PhotoKind;
  alt: string;
  /** next/image `sizes`, e.g. "(min-width: 1024px) 33vw, 100vw". */
  sizes: string;
  /** Set the shape here: aspect ratio, rounding, borders. */
  className?: string;
  /** Only for the above-the-fold hero image. */
  priority?: boolean;
  /** Small caption chip in the corner. */
  label?: string;
  /** Overrides the placeholder icon. */
  icon?: LucideIcon;
};

export function PhotoFrame({ photo, kind, alt, sizes, className, priority = false, label, icon }: PhotoFrameProps) {
  return (
    <div className={cn("relative isolate overflow-hidden bg-ink-800", className)}>
      {photo ? (
        <Image
          src={photo.src}
          alt={alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover"
        />
      ) : (
        <Placeholder kind={kind} icon={icon} />
      )}
      {label ? (
        <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm">
          {label}
        </span>
      ) : null}
    </div>
  );
}

function Placeholder({ kind, icon }: { kind: PhotoKind; icon?: LucideIcon }) {
  const art = ART[kind];
  const Icon = icon ?? art.Icon;

  return (
    <div aria-hidden="true" className={cn("absolute inset-0 bg-linear-to-br", art.tone)}>
      <div
        className="absolute -top-1/4 -right-1/4 size-[90%] rounded-full"
        style={{ backgroundImage: `radial-gradient(closest-side, ${art.glow}, transparent)` }}
      />
      <svg className="absolute inset-0 size-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <g fill="#fff">
          <polygon points="0,170 140,120 0,300" fillOpacity="0.045" />
          <polygon points="0,300 140,120 250,300" fillOpacity="0.03" />
          <polygon points="140,120 300,60 250,300" fillOpacity="0.055" />
          <polygon points="300,60 400,160 400,300 250,300" fillOpacity="0.025" />
          <polygon points="180,0 400,0 300,60" fillOpacity="0.04" />
          <polygon points="180,0 300,60 140,120" fillOpacity="0.02" />
        </g>
        <path
          d="M0 170 140 120 180 0M140 120 300 60 400 0M300 60 400 160M140 120 250 300M300 60 250 300M0 300 140 120"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.09"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/[0.06] text-white/75">
          <Icon className="size-6" strokeWidth={1.5} />
        </span>
      </div>
    </div>
  );
}
