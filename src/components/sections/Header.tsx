"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { type FocusEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const MENU_ID = "mobile-menu";
const SCROLL_OFFSET = 24;
// Tailwind's `lg` breakpoint: the overlay menu only exists below it.
const DESKTOP_QUERY = "(min-width: 64rem)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const iconButton =
  "grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:border-ice/60 hover:bg-ice/10";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isScrolled = () => window.scrollY > SCROLL_OFFSET;
const isScrolledOnServer = () => false;

export function Header() {
  // Renders transparent on the server, then syncs with the real scroll position right after hydration.
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, isScrolledOnServer);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [mainPhone, secondPhone] = site.phones;
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktopChange);

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktopChange);
    };
  }, [open]);

  // Focus that moves past the menu would land on content hidden behind the overlay.
  const closeOnFocusOut = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (open && next && !event.currentTarget.contains(next)) close();
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Перейти к содержимому
      </a>

      <div className="contents" onBlur={closeOnFocusOut}>
        <header className="fixed inset-x-0 top-0 z-50 h-16 lg:h-20">
          {/* The frost lives on its own layer: on <header> it would trap fixed children and could not fade. */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 border-b border-white/10 bg-ink-950/75 backdrop-blur-xl transition-opacity duration-300",
              scrolled || open ? "opacity-100" : "opacity-0",
            )}
          />

          <div className="container-page relative flex h-full items-center justify-between gap-4">
            <a
              href="#top"
              aria-label="Кафе Кристалл 24 — наверх"
              onClick={close}
              className="flex min-h-11 items-center rounded-lg"
            >
              <Logo />
            </a>

            <nav aria-label="Основная навигация" className="hidden lg:block">
              <ul className="flex items-center gap-6 xl:gap-8">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="relative flex h-11 items-center text-sm font-medium text-mist transition-colors after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-ice/70 after:transition-transform after:duration-300 after:ease-soft hover:text-white hover:after:scale-x-100 focus-visible:after:scale-x-100"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a href={mainPhone.href} className="btn btn-gold btn-sm hidden lg:inline-flex">
              <Phone className="size-4" aria-hidden="true" />
              {mainPhone.display}
            </a>

            <div className="flex items-center gap-2 lg:hidden">
              <a href={mainPhone.href} aria-label="Позвонить в кафе" className={iconButton}>
                <Phone className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </a>
              <button
                ref={toggleRef}
                type="button"
                className={iconButton}
                aria-expanded={open}
                aria-controls={MENU_ID}
                aria-label={open ? "Закрыть меню" : "Открыть меню"}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? (
                  <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {open ? (
            <m.div
              key={MENU_ID}
              id={MENU_ID}
              // Nearly opaque: where backdrop-filter is not rendered, a lighter veil leaves a readable ghost of the page.
              className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-ink-950/98 backdrop-blur-xl lg:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <div className="container-page flex min-h-full flex-col pt-[4.5rem] pb-6">
                <nav aria-label="Мобильная навигация">
                  <ul>
                    {site.nav.map((item, index) => (
                      <m.li
                        key={item.href}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.05 + index * 0.04, ease: EASE }}
                      >
                        <a
                          href={item.href}
                          onClick={close}
                          className="flex min-h-12 items-center font-display text-3xl font-semibold text-white transition-colors hover:text-ice-light"
                        >
                          {item.label}
                        </a>
                      </m.li>
                    ))}
                  </ul>
                </nav>

                <m.div
                  className="mt-auto pt-6"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 + site.nav.length * 0.04, ease: EASE }}
                >
                  <div className="flex flex-col gap-3">
                    <a href={mainPhone.href} className="btn btn-gold w-full">
                      <Phone className="size-4.5" aria-hidden="true" />
                      {mainPhone.display}
                    </a>
                    <a href={secondPhone.href} className="btn btn-ghost w-full">
                      <Phone className="size-4.5" aria-hidden="true" />
                      {secondPhone.display}
                    </a>
                  </div>
                  <ul className="mt-5 space-y-0.5 text-sm text-haze">
                    {site.hours.map((entry) => (
                      <li key={entry.short}>
                        {entry.short} — {entry.time}
                      </li>
                    ))}
                  </ul>
                </m.div>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
