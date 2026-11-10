import { ArrowUpRight, Bus, Clock, MapPin, Navigation, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

type GroupProps = {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
};

// Phones: icon and label share a row with the content below; from sm the content sits beside the icon.
function Group({ icon: Icon, label, children }: GroupProps) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-t border-white/10 py-6 first:border-t-0 first:pt-0 sm:items-start sm:gap-x-5 sm:gap-y-2">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-ice sm:row-span-2">
        <Icon className="size-5" strokeWidth={1.5} aria-hidden />
      </span>
      <h3 className="text-xs font-semibold tracking-[0.2em] text-haze uppercase">{label}</h3>
      <div className="col-span-2 sm:col-span-1 sm:col-start-2">{children}</div>
    </div>
  );
}

export function Contacts() {
  return (
    <section id="contacts" className="section overflow-hidden">
      <div aria-hidden className="orb -right-40 top-10 size-[34rem]" />

      <div className="relative container-page">
        <SectionHeading eyebrow="Контакты" title="Как нас найти" />

        <div className="mt-12 grid items-stretch gap-6 sm:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Reveal className="min-w-0">
            <div className="glass h-full rounded-[2rem] p-6 sm:p-8">
              <Group icon={MapPin} label="Адрес">
                <address className="text-lg leading-snug text-white not-italic">{site.address.full}</address>
              </Group>

              <Group icon={Phone} label="Телефон">
                <ul className="-my-1.5">
                  {site.phones.map((phone) => (
                    <li key={phone.tel}>
                      <a
                        href={phone.href}
                        className="inline-flex min-h-11 items-center font-display text-xl text-white lining-nums transition-colors duration-300 hover:text-ice sm:text-2xl"
                      >
                        {phone.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </Group>

              <Group icon={Clock} label="Часы работы">
                <table className="w-full">
                  <caption className="sr-only">Часы работы</caption>
                  <tbody>
                    {site.hours.map((row) => (
                      <tr key={row.days}>
                        <th scope="row" className="py-1 pr-3 text-left align-top font-normal text-mist">
                          {row.days}
                        </th>
                        <td
                          className={cn(
                            "py-1 text-right align-top whitespace-nowrap tabular-nums",
                            row.closed ? "text-gold" : "text-white",
                          )}
                        >
                          {row.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Group>

              <Group icon={Bus} label="Как добраться">
                <ul className="space-y-2">
                  {site.transit.map((point) => (
                    <li key={point.stop} className="leading-relaxed text-mist">
                      <span className="font-medium text-white">«{point.stop}»</span>
                      {"\u00A0· "}
                      {point.routes}
                      {"\u00A0· "}
                      <span className="whitespace-nowrap">{point.walk}</span>
                    </li>
                  ))}
                </ul>
              </Group>

              <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
                <a
                  href={site.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold btn-sm grow"
                >
                  <Navigation className="size-4" strokeWidth={1.5} aria-hidden />
                  Построить маршрут
                </a>
                <a
                  href={site.maps.yandex}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm grow"
                >
                  Яндекс Карты
                  <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.07} className="min-w-0">
            <div className="glass h-full rounded-[2rem] p-2">
              <iframe
                src={site.maps.embed}
                title="Кафе Кристалл 24 на карте Google"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[22rem] w-full rounded-[1.5rem] border-0 lg:h-full lg:min-h-[34rem]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
