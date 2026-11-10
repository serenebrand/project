import { Briefcase, Cake, DoorOpen, Heart, Phone, Snowflake, Truck, type LucideIcon } from "lucide-react";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { banquets, site } from "@/data/site";
import type { Photo } from "@/lib/photo-types";

type OccasionId = (typeof banquets.occasions)[number]["id"];
type FeatureId = (typeof banquets.features)[number]["id"];

const OCCASION_ICONS: Record<OccasionId, LucideIcon> = {
  wedding: Heart,
  anniversary: Cake,
  corporate: Briefcase,
  newyear: Snowflake,
};

const FEATURE_ICONS: Record<FeatureId, LucideIcon> = {
  hall: DoorOpen,
  catering: Truck,
};

export function Banquets({ photo }: { photo?: Photo }) {
  const phone = site.phones[0];

  return (
    <section id="banquets" className="section overflow-hidden">
      <div className="container-page relative">
        <div aria-hidden className="orb orb-gold top-1/2 -left-48 size-[44rem] -translate-y-1/2" />

        {/* lg uses 12, not 14: at 1024px the title then still fits in two lines beside the photo. */}
        <div className="glass glass-gold relative grid gap-10 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-12 lg:p-12 xl:gap-14 xl:p-14">
          <div>
            <SectionHeading eyebrow={banquets.eyebrow} title={banquets.title} lead={banquets.lead} tone="gold" />

            <Reveal delay={0.07} className="mt-8 sm:mt-10">
              {/* One column on phones: «Корпоративы» does not fit a half-width tile at 360px. */}
              <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {banquets.occasions.map((occasion) => {
                  const Icon = OCCASION_ICONS[occasion.id];

                  return (
                    <li
                      key={occasion.id}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <Icon className="size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
                      <span className="font-display text-lg text-white">{occasion.title}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.14} className="mt-8">
              <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                {banquets.features.map((feature) => {
                  const Icon = FEATURE_ICONS[feature.id];

                  return (
                    <li key={feature.id} className="flex items-start gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                        <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg leading-snug font-semibold text-white">{feature.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-haze">{feature.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.21} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-10">
              <a href={phone.href} className="btn btn-gold">
                <Phone className="size-4.5" aria-hidden />
                {banquets.cta}
              </a>
              <a
                href={phone.href}
                className="inline-flex min-h-11 items-center font-medium whitespace-nowrap text-mist transition-colors hover:text-white"
              >
                {phone.display}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <PhotoFrame
              photo={photo}
              kind="interior"
              alt="Банкетный зал кафе «Кристалл 24»"
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="aspect-[4/3] rounded-3xl lg:aspect-auto lg:h-full lg:min-h-[28rem]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
