import { ArrowRight, Clock, MapPin, Phone, Star } from "lucide-react";
import { GemArt, Sparkle } from "@/components/ui/GemArt";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import type { Photo } from "@/lib/photo-types";

// Placed relative to the gem box, so the sparkles follow it across breakpoints.
const SPARKLES = [
  { className: "top-[24%] left-[22%] size-5 text-ice", delay: 0 },
  { className: "top-[39%] left-[52%] size-4 text-white", delay: 1.3 },
  { className: "top-[66%] left-[19%] size-3 text-gold", delay: 2.6 },
  { className: "top-[86%] left-[33%] size-4 text-white lg:hidden", delay: 0.7 },
  { className: "top-[30%] left-[79%] size-3 text-white", delay: 2 },
  { className: "top-[57%] left-[84%] size-4 text-gold", delay: 3.2 },
  { className: "top-[84%] left-[67%] size-2 text-ice", delay: 1.7 },
];

const factLabel = "flex items-center gap-2 text-xs font-medium tracking-widest text-haze uppercase";
const factIcon = "size-4 shrink-0 text-ice";
const factValue = "text-[0.9375rem] leading-6 font-medium text-white";

const { full: fullAddress, street } = site.address;
// Lets the address wrap before the street rather than in the middle of it.
const addressLead = fullAddress.endsWith(street) ? fullAddress.slice(0, -street.length) : "";

export function Hero({ photo }: { photo?: Photo }) {
  const { rating, hours, phones } = site;

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-end overflow-hidden pt-28 pb-12 sm:pb-16 lg:items-center lg:pt-32 lg:pb-20"
    >
      {photo ? <PhotoBackdrop photo={photo} /> : <CrystalBackdrop />}

      <div className="container-page">
        <div className="max-w-2xl">
          <p
            className="glass flex w-fit animate-rise items-start gap-2.5 rounded-full px-4 py-2 text-sm text-mist"
            style={{ animationDelay: "60ms" }}
          >
            <Star className="mt-0.5 size-4 shrink-0 fill-gold text-gold" aria-hidden="true" />
            {/* Two unbreakable halves: stacked on phones, one line from sm. */}
            <span className="flex flex-col sm:block">
              <span className="whitespace-nowrap">
                <span className="font-semibold text-white">{rating.value}</span>
                {` · ${rating.count} отзывов ·`}
              </span>{" "}
              <span className="whitespace-nowrap">{rating.rank}</span>
            </span>
          </p>

          {/* LCP element: no entrance animation here. */}
          <h1 className="mt-6 text-white">
            <span className="block font-sans text-sm font-semibold tracking-[0.3em] text-ice uppercase">Кафе</span>{" "}
            <span className="mt-3 block font-display text-[clamp(3.25rem,13vw,7.5rem)] leading-[0.95] font-semibold tracking-tight sm:whitespace-nowrap">
              <span className="text-crystal">Кристалл</span> <span className="text-gilded">24</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-rise text-lg text-mist sm:text-xl" style={{ animationDelay: "160ms" }}>
            {site.tagline}
          </p>

          <div className="mt-8 flex animate-rise flex-wrap gap-3" style={{ animationDelay: "260ms" }}>
            <a href={phones[0].href} className="btn btn-gold grow sm:grow-0">
              <Phone className="size-4.5" aria-hidden="true" />
              Забронировать стол
            </a>
            <a href="#banquets" className="btn btn-ghost grow sm:grow-0">
              Банкеты
              <ArrowRight className="size-4.5" aria-hidden="true" />
            </a>
          </div>

          <dl
            className="glass mt-10 grid animate-rise divide-y divide-white/10 rounded-3xl lg:mt-14 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
            style={{ animationDelay: "360ms" }}
          >
            <div className="px-5 py-4 lg:py-5">
              <dt className={factLabel}>
                <MapPin className={factIcon} strokeWidth={1.5} aria-hidden="true" />
                Адрес
              </dt>
              <dd className={cn(factValue, "mt-1.5")}>
                {addressLead ? (
                  <>
                    {addressLead}
                    <span className="whitespace-nowrap">{street}</span>
                  </>
                ) : (
                  fullAddress
                )}
              </dd>
            </div>

            <div className="px-5 py-4 lg:py-5">
              <dt className={factLabel}>
                <Clock className={factIcon} strokeWidth={1.5} aria-hidden="true" />
                Часы работы
              </dt>
              <dd className="mt-1.5">
                <ul className={factValue}>
                  {hours.map((entry) => (
                    <li key={entry.short} className={cn("flex gap-2", entry.closed && "text-haze")}>
                      <span className={cn("w-14 shrink-0 font-normal", entry.closed ? "text-haze" : "text-mist")}>
                        {entry.short}
                      </span>{" "}
                      <span>{entry.time}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>

            <div className="px-5 py-4 lg:py-5">
              <dt className={factLabel}>
                <Phone className={factIcon} strokeWidth={1.5} aria-hidden="true" />
                Телефон
              </dt>
              {/* 44px tap rows; the negative margins keep the text on the same rhythm as the other columns. */}
              <dd className="-mt-1 -mb-2 flex flex-col items-start">
                {phones.map((phone) => (
                  <a
                    key={phone.tel}
                    href={phone.href}
                    className={cn(factValue, "flex min-h-11 items-center whitespace-nowrap transition-colors hover:text-ice")}
                  >
                    {phone.display}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function PhotoBackdrop({ photo }: { photo: Photo }) {
  return (
    <>
      {/* PhotoFrame is always `relative`, so the absolute fill has to come from a wrapper. */}
      <div className="absolute inset-0 -z-20">
        <PhotoFrame
          photo={photo}
          kind="interior"
          alt="Интерьер кафе «Кристалл 24»"
          sizes="100vw"
          priority
          className="size-full"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/95 via-ink-950/70 to-ink-950/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/20 to-transparent"
      />
    </>
  );
}

function CrystalBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-linear-to-bl from-ink-800 via-ink-900 to-ink-950" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-ink-950 to-transparent" />
      <div className="orb -top-40 -right-40 size-[34rem] sm:size-[44rem] lg:-top-56 lg:size-[62rem]" />
      <div className="orb top-1/4 -left-72 size-[36rem] [--orb:rgb(63_169_216/0.09)]" />
      <div className="orb orb-gold bottom-0 -left-48 size-[30rem] sm:size-[38rem]" />

      {/* Anchored to the page container so the gem stays beside the text on very wide screens. */}
      <div className="container-page absolute inset-0">
        {/* On lg the girdle line sits just above the heading's cap height, so no facet edge strikes through the text. */}
        <div className="absolute -top-4 -right-28 aspect-square w-[21rem] opacity-55 sm:-top-6 sm:-right-16 sm:w-[26rem] sm:opacity-60 lg:top-1/2 lg:-right-20 lg:w-[40rem] lg:-translate-y-[64%] lg:opacity-100 xl:-right-12 xl:w-[46rem]">
          <GemArt className="size-full animate-drift" />
          {SPARKLES.map((sparkle) => (
            <Sparkle key={sparkle.className} className={sparkle.className} delay={sparkle.delay} />
          ))}
        </div>
      </div>
    </div>
  );
}
