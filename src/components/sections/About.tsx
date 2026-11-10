import { Car, HeartHandshake, Sofa, Sparkles, Star, Wallet, type LucideIcon } from "lucide-react";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, site } from "@/data/site";
import type { Photo } from "@/lib/photo-types";

type HighlightId = (typeof about.highlights)[number]["id"];

const HIGHLIGHT_ICONS: Record<HighlightId, LucideIcon> = {
  hall: Sparkles,
  staff: HeartHandshake,
  prices: Wallet,
  road: Car,
};

export function About({ photos }: { photos: Photo[] }) {
  return (
    <section id="about" className="section overflow-hidden">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />

          <Reveal delay={0.07} className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-mist">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
            {about.highlights.map((highlight, i) => {
              const Icon = HIGHLIGHT_ICONS[highlight.id];

              return (
                <Reveal
                  key={highlight.id}
                  delay={i * 0.07}
                  className="glass flex items-start gap-4 rounded-2xl p-5 lg:flex-col"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-ice">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg leading-snug font-semibold text-white">{highlight.title}</h3>
                    {/* Balanced lines keep «430–820 ₽» together when the card gets narrow. */}
                    <p className="mt-1.5 text-sm leading-relaxed text-balance text-haze">{highlight.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden className="orb -top-40 -right-40 size-[34rem]" />

          {/* The padding keeps the overlapping frame and the rating card inside the column. */}
          <Reveal delay={0.1} className="relative pr-4 pb-10 pl-6 sm:pr-6 sm:pb-14 sm:pl-10">
            <PhotoFrame
              photo={photos[0]}
              kind="interior"
              alt="Зал кафе «Кристалл 24»"
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 384px, 80vw"
              className="aspect-[4/5] rounded-[2rem]"
            />

            <div className="absolute bottom-0 left-0 w-[46%]">
              <PhotoFrame
                photo={photos[1]}
                kind="interior"
                icon={Sofa}
                alt="Интерьер кафе «Кристалл 24»"
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 206px, 42vw"
                className="aspect-square rounded-3xl ring-8 ring-ink-950"
              />
            </div>

            <div className="glass absolute top-8 right-0 rounded-2xl bg-ink-950/60 px-5 py-4 sm:top-10">
              {/* Baseline, not centre: Playfair's old-style digits hang below the line. */}
              <p className="flex items-baseline gap-2 font-display text-3xl font-semibold text-white">
                <Star className="size-5 shrink-0 fill-gold text-gold" strokeWidth={1.5} aria-hidden />
                <span className="sr-only">Рейтинг </span>
                {site.rating.value}
              </p>
              <p className="mt-1 text-sm text-haze">{site.rating.count} отзывов</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
