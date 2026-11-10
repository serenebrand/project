import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "ice" | "gold";
  className?: string;
};

export function SectionHeading({ eyebrow, title, lead, align = "left", tone = "ice", className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", tone === "gold" && "eyebrow-gold")}>{eyebrow}</p>
      <h2 className="mt-5 font-display text-4xl leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {lead ? <p className="mt-5 text-lg leading-relaxed text-mist">{lead}</p> : null}
    </Reveal>
  );
}
