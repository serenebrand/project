import { Armchair, ArrowUpRight, HeartHandshake, Star, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews, site } from "@/data/site";

type ThemeId = (typeof reviews.themes)[number]["id"];

const THEME_ICONS: Record<ThemeId, LucideIcon> = {
  food: UtensilsCrossed,
  cozy: Armchair,
  staff: HeartHandshake,
};

const STARS = [0, 1, 2, 3, 4];

// Share of the star row to fill: 4.3 of 5 → 86%.
const ratingPercent = Math.round((Number(site.rating.value) / STARS.length) * 100);

export function Reviews() {
  return (
    <section id="reviews" className="section overflow-hidden border-y border-white/[0.06] bg-ink-900/50">
      <div className="container-page">
        <SectionHeading eyebrow={reviews.eyebrow} title={reviews.title} />

        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-[0.9fr_1.6fr]">
          <Reveal className="min-w-0">
            <div className="glass h-full rounded-3xl p-8 md:flex md:items-center md:gap-10 lg:block">
              <div className="md:flex-1">
                <p className="w-fit pb-2 font-display text-7xl leading-none font-semibold text-crystal lining-nums">
                  {site.rating.value}
                </p>
                <div
                  role="img"
                  aria-label={`Рейтинг ${site.rating.value} из ${STARS.length}`}
                  className="relative mt-3 w-fit"
                >
                  <div className="flex text-gold/35">
                    {STARS.map((star) => (
                      <Star key={star} className="size-6 shrink-0" strokeWidth={1.5} aria-hidden />
                    ))}
                  </div>
                  <div
                    className="absolute inset-y-0 left-0 flex overflow-hidden text-gold"
                    style={{ width: `${ratingPercent}%` }}
                  >
                    {STARS.map((star) => (
                      <Star key={star} className="size-6 shrink-0 fill-current" strokeWidth={1.5} aria-hidden />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-lg font-medium text-white">{site.rating.count} отзывов</p>
                <p className="mt-1 text-sm leading-relaxed text-haze">{site.rating.source}</p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-8 md:mt-0 md:flex-1 md:border-t-0 md:border-l md:pt-0 md:pl-10 lg:mt-8 lg:border-t lg:border-l-0 lg:pt-8 lg:pl-0">
                <p className="font-medium text-white">{site.rating.rank}</p>
                <p className="mt-1 text-sm text-haze">{site.rating.rankSource}</p>
                <a
                  href={site.maps.place}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm mt-6 h-auto py-3 text-center whitespace-normal"
                >
                  {reviews.cta}
                  <ArrowUpRight className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
                </a>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-rows-3">
            {reviews.themes.map((theme, i) => {
              const Icon = THEME_ICONS[theme.id];

              return (
                <Reveal key={theme.id} delay={(i + 1) * 0.07} className="min-w-0">
                  <div className="glass lift flex h-full flex-col gap-5 rounded-3xl p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-ice">
                      <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-semibold text-white">{theme.title}</h3>
                      <p className="mt-2 leading-relaxed text-mist">{theme.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
