"use client";

import { AnimatePresence, m, useIsPresent } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryPlaceholders, photoKindLabels } from "@/data/site";
import { cn } from "@/lib/cn";
import type { Photo, PhotoKind } from "@/lib/photo-types";

type Filter = PhotoKind | "all";

type GalleryItem = {
  key: string;
  kind: PhotoKind;
  photo?: Photo;
  alt: string;
  aspect: string;
};

const KINDS = Object.keys(photoKindLabels) as PhotoKind[];

const ASPECTS = ["aspect-[4/5]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]", "aspect-[5/4]"];

// Two columns on phones, three inside the 74rem container from lg up.
const TILE_SIZES = "(min-width: 1184px) 360px, (min-width: 1024px) 33vw, 50vw";

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTROL =
  "absolute z-10 grid size-12 cursor-pointer place-items-center rounded-full border border-white/15 bg-ink-950/70 text-white backdrop-blur-sm transition-colors duration-300 hover:border-ice/60 hover:text-ice";

function toItems(photos: Photo[]): GalleryItem[] {
  if (photos.length > 0) {
    return photos.map((photo, i) => ({
      key: photo.src,
      kind: photo.kind,
      photo,
      alt: `${photoKindLabels[photo.kind]} кафе «Кристалл 24» — фото ${photo.index}`,
      aspect: ASPECTS[i % ASPECTS.length],
    }));
  }

  return galleryPlaceholders.map(({ kind }, i) => ({
    key: `placeholder-${i}`,
    kind,
    alt: "",
    aspect: ASPECTS[i % ASPECTS.length],
  }));
}

export function Gallery({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const items = toItems(photos);
  const kinds = KINDS.filter((kind) => items.some((item) => item.kind === kind));
  const activeFilter: Filter = filter !== "all" && kinds.includes(filter) ? filter : "all";
  const visible = activeFilter === "all" ? items : items.filter((item) => item.kind === activeFilter);
  const openIndex = openKey === null ? -1 : visible.findIndex((item) => item.key === openKey);
  const openItem = openIndex === -1 ? null : visible[openIndex];

  const filters: Array<{ value: Filter; label: string }> = [
    { value: "all", label: "Все" },
    ...kinds.map((kind) => ({ value: kind, label: photoKindLabels[kind] })),
  ];

  function selectFilter(value: Filter) {
    setFilter(value);
    // A tile of the outgoing grid can still be clicked while it fades; never keep its key around.
    setOpenKey(null);
  }

  function open(key: string, opener: HTMLButtonElement) {
    openerRef.current = opener;
    setOpenKey(key);
  }

  function close() {
    setOpenKey(null);
    openerRef.current?.focus({ preventScroll: true });
  }

  function step(delta: number) {
    if (openIndex === -1) return;
    setOpenKey(visible[(openIndex + delta + visible.length) % visible.length].key);
  }

  return (
    <section id="gallery" className="section overflow-hidden">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Галерея" title="Загляните к нам" />
          {kinds.length > 1 ? (
            <Reveal delay={0.07} className="lg:shrink-0">
              <div role="group" aria-label="Фильтр фотографий" className="flex flex-wrap gap-2 sm:gap-3">
                {filters.map(({ value, label }) => {
                  const active = value === activeFilter;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectFilter(value)}
                      className={cn(
                        "chip min-h-11 cursor-pointer justify-center px-5 font-medium transition-colors duration-300",
                        active ? "border-ice bg-ice text-ink-950" : "hover:border-ice/50 hover:text-white",
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          ) : null}
        </div>

        <Reveal className="mt-12 sm:mt-16">
          <AnimatePresence mode="wait" initial={false}>
            <m.ul
              key={activeFilter}
              className="-mb-4 columns-2 gap-4 sm:-mb-5 sm:gap-5 lg:columns-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {visible.map((item, index) => (
                <li key={item.key} className="mb-4 break-inside-avoid sm:mb-5">
                  <button
                    type="button"
                    aria-label={`Открыть фото: ${photoKindLabels[item.kind]}, ${index + 1} из ${visible.length}`}
                    onClick={(event) => open(item.key, event.currentTarget)}
                    className="group relative isolate block w-full cursor-pointer overflow-hidden rounded-3xl"
                  >
                    <PhotoFrame
                      photo={item.photo}
                      kind={item.kind}
                      alt={item.alt}
                      sizes={TILE_SIZES}
                      label={item.photo ? undefined : photoKindLabels[item.kind]}
                      className={cn(
                        item.aspect,
                        "rounded-3xl transition-transform duration-500 ease-soft group-hover:scale-[1.04]",
                      )}
                    />
                    <span
                      aria-hidden
                      className="absolute top-3 right-3 grid size-10 place-items-center rounded-full border border-white/15 bg-ink-950/60 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      <Maximize2 className="size-4" strokeWidth={1.5} />
                    </span>
                  </button>
                </li>
              ))}
            </m.ul>
          </AnimatePresence>
        </Reveal>
      </div>

      <AnimatePresence>
        {openItem ? (
          <Lightbox
            key="lightbox"
            item={openItem}
            index={openIndex}
            total={visible.length}
            onClose={close}
            onStep={step}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

type LightboxProps = {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (delta: number) => void;
};

function Lightbox({ item, index, total, onClose, onStep }: LightboxProps) {
  const isPresent = useIsPresent();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Also re-runs when the dialog is reopened while it is still fading out.
  useEffect(() => {
    if (isPresent) closeRef.current?.focus();
  }, [isPresent]);

  // Lock page scroll; pad the body so the layout does not shift when the scrollbar goes.
  useEffect(() => {
    const { body, documentElement } = document;
    const { overflow, paddingRight } = body.style;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = overflow;
      body.style.paddingRight = paddingRight;
    };
  }, []);

  useEffect(() => {
    // The dialog stays mounted while it fades out; stop handling keys as soon as it closes.
    if (!isPresent) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onStep(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onStep(1);
      } else if (event.key === "Tab") {
        const dialog = dialogRef.current;
        const buttons = dialog?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!dialog || !buttons || buttons.length === 0) return;

        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        const active = document.activeElement;
        const onControl = active !== dialog && dialog.contains(active);

        if (!onControl || active === (event.shiftKey ? first : last)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isPresent, onClose, onStep]);

  function onBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  // The <img> fills the whole stage, so a click on its letterbox bars still counts as the backdrop.
  function onImageClick(event: MouseEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    const box = image.getBoundingClientRect();
    const scale = Math.min(box.width / image.naturalWidth, box.height / image.naturalHeight);
    const barX = (box.width - image.naturalWidth * scale) / 2;
    const barY = (box.height - image.naturalHeight * scale) / 2;
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    const onPicture = x >= barX && x <= box.width - barX && y >= barY && y <= box.height - barY;

    if (!onPicture) onClose();
  }

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches.length === 1 ? event.touches[0] : null;
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) onStep(dx < 0 ? 1 : -1);
  }

  return createPortal(
    <m.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фото"
      tabIndex={-1}
      className={cn(
        "fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 outline-none backdrop-blur-md",
        !isPresent && "pointer-events-none",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onBackdropClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className={cn(CONTROL, "top-3 right-3 sm:top-6 sm:right-6")}
      >
        <X className="size-5" strokeWidth={1.5} aria-hidden />
      </button>

      <AnimatePresence mode="wait">
        <m.div
          key={item.key}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          {item.photo ? (
            <div className="relative h-[78vh] w-[min(94vw,72rem)]">
              <Image
                src={item.photo.src}
                alt={item.alt}
                fill
                sizes="100vw"
                draggable={false}
                onClick={onImageClick}
                className="object-contain select-none"
              />
            </div>
          ) : (
            <PhotoFrame
              kind={item.kind}
              alt=""
              sizes="100vw"
              className="aspect-[4/3] max-h-[78vh] w-[min(92vw,56rem)] rounded-3xl"
            />
          )}
        </m.div>
      </AnimatePresence>

      {total > 1 ? (
        <>
          <button
            type="button"
            aria-label="Предыдущее фото"
            onClick={() => onStep(-1)}
            className={cn(CONTROL, "bottom-3 left-3 sm:top-1/2 sm:bottom-auto sm:left-6 sm:-translate-y-1/2")}
          >
            <ChevronLeft className="size-6" strokeWidth={1.5} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Следующее фото"
            onClick={() => onStep(1)}
            className={cn(CONTROL, "right-3 bottom-3 sm:top-1/2 sm:right-6 sm:bottom-auto sm:-translate-y-1/2")}
          >
            <ChevronRight className="size-6" strokeWidth={1.5} aria-hidden />
          </button>
        </>
      ) : null}

      <p
        aria-live="polite"
        className="pointer-events-none absolute inset-x-0 bottom-3 flex h-12 items-center justify-center gap-3 px-20 text-sm sm:bottom-6"
      >
        <span className="font-medium text-white">{photoKindLabels[item.kind]}</span>
        <span aria-hidden className="size-1 rounded-full bg-white/30" />
        <span aria-hidden className="text-haze tabular-nums">
          {index + 1} / {total}
        </span>
        <span className="sr-only">
          фото {index + 1} из {total}
        </span>
      </p>
    </m.div>,
    document.body,
  );
}
