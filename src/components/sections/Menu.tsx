import {
  Beef,
  CakeSlice,
  Coffee,
  CookingPot,
  Croissant,
  Phone,
  Soup,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { menu, site } from "@/data/site";
import type { Photo } from "@/lib/photo-types";

type CategoryId = (typeof menu.categories)[number]["id"];

const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  lunch: UtensilsCrossed,
  pelmeni: CookingPot,
  bakery: Croissant,
  soups: Soup,
  mains: Beef,
  desserts: CakeSlice,
  drinks: Coffee,
};

const photoAlt = (title: string) => `${title} — кафе «Кристалл 24»`;

export function Menu({ photos }: { photos: Photo[] }) {
  const [featured, ...categories] = menu.categories;
  const phone = site.phones[0];

  return (
    <section id="menu" className="section overflow-hidden border-y border-white/[0.06] bg-ink-900/50">
      <div className="container-page">
        <SectionHeading eyebrow={menu.eyebrow} title={menu.title} lead={menu.lead} />

        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <Reveal className="sm:col-span-2">
            <article className="glass lift flex h-full flex-col overflow-hidden rounded-3xl sm:min-h-72 sm:flex-row">
              {/* Taller than wide from sm up, so object-cover enlarges the photo: ask for more than the slot width. */}
              <PhotoFrame
                photo={photos[0]}
                kind="food"
                icon={CATEGORY_ICONS[featured.id]}
                alt={photoAlt(featured.title)}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 55vw, 92vw"
                className="aspect-[4/3] sm:aspect-auto sm:w-[45%] sm:shrink-0"
              />
              <div className="flex flex-1 flex-col items-start justify-center p-6 sm:p-8 lg:p-10">
                {featured.price ? (
                  <p className="inline-flex rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1.5 text-sm font-semibold text-gold-light">
                    {featured.price}
                  </p>
                ) : null}
                <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">{featured.title}</h3>
                <p className="mt-3 leading-relaxed text-mist sm:text-lg">{featured.text}</p>
              </div>
            </article>
          </Reveal>

          {categories.map((category, i) => (
            // Stagger by column: the featured card fills the first two cells of the lg grid.
            <Reveal key={category.id} delay={((i + 2) % 3) * 0.07}>
              <article className="glass lift h-full overflow-hidden rounded-3xl">
                <PhotoFrame
                  photo={photos[i + 1]}
                  kind="food"
                  icon={CATEGORY_ICONS[category.id]}
                  alt={photoAlt(category.title)}
                  sizes="(min-width: 1184px) 360px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                  className="aspect-[4/3]"
                />
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-white">{category.title}</h3>
                  <p className="mt-2 text-haze">{category.text}</p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal
            delay={0.14}
            className="glass glass-gold flex flex-col gap-6 rounded-3xl p-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-8 lg:col-span-1 lg:flex-col lg:items-start lg:gap-8"
          >
            <div>
              <p className="eyebrow eyebrow-gold">{menu.checkLabel}</p>
              {/* leading-tight: a tighter line box clips the old-style digits of the gradient text. */}
              <p className="mt-4 w-fit font-display text-4xl leading-tight font-semibold whitespace-nowrap text-gilded sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
                {site.averageCheck}
              </p>
            </div>
            <div className="sm:max-w-xs lg:max-w-none">
              <p className="text-mist">{menu.checkNote}</p>
              <a href={phone.href} className="btn btn-ghost btn-sm mt-5">
                <Phone className="size-4" aria-hidden />
                {phone.display}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
