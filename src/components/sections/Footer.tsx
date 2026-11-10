import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const columnTitle = "text-xs font-semibold tracking-[0.2em] text-haze uppercase";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-900/60">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-haze">{site.tagline}</p>
            <p className="mt-3 text-sm text-mist">{site.address.full}</p>
          </div>

          <nav aria-labelledby="footer-nav-title">
            <h2 id="footer-nav-title" className={columnTitle}>
              Навигация
            </h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-4">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="block py-3 text-sm text-mist transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={columnTitle}>Телефоны</h2>
            <ul className="mt-2">
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={phone.href}
                    className="block py-2.5 text-[0.9375rem] leading-6 font-medium whitespace-nowrap text-white transition-colors hover:text-ice"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={columnTitle}>Часы работы</h2>
            <dl className="mt-5 space-y-3 text-sm">
              {site.hours.map((entry) => (
                <div key={entry.short} className="flex items-baseline justify-between gap-4">
                  <dt className="text-mist">{entry.days}</dt>
                  <dd className={cn("shrink-0 font-medium whitespace-nowrap", entry.closed ? "text-gold" : "text-white")}>
                    {entry.time}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div aria-hidden="true" className="hairline mt-12 lg:mt-14" />

        <div className="mt-4 flex flex-col gap-2 text-sm text-haze sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
            <p>
              © {site.copyrightYear} {site.name}
            </p>
            <p>
              {site.address.locality}, {site.address.region}
            </p>
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 self-start py-3 font-medium text-mist transition-colors hover:text-white sm:self-auto"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            Наверх
          </a>
        </div>
      </div>
    </footer>
  );
}
