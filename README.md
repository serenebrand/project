# Кафе Кристалл 24 — website

One-page site for «Кафе Кристалл 24» (Полевской, Свердловская обл.), built with
Next.js 16 (App Router), Tailwind CSS v4 and Framer Motion.

## Run

```bash
pnpm install
pnpm dev                    # http://localhost:3000
pnpm build && pnpm start    # production build
```

## Edit the content

All facts and copy — address, phones, opening hours, menu, texts — live in
[`src/data/site.ts`](src/data/site.ts). Components only render that data.

## Add photos

Put files into `public/photos/`. They are picked up automatically at build time, so
rebuild (or redeploy) after adding them. Until a photo exists, a placeholder is shown.

| File                          | Used for                                          |
| ----------------------------- | ------------------------------------------------- |
| `interior-1.jpg`              | Hero background                                   |
| `interior-2.jpg`, `-3.jpg`    | «О нас»                                           |
| `interior-4.jpg`              | «Банкеты»                                         |
| `food-1.jpg` … `food-7.jpg`   | Menu cards, in menu order (Бизнес-ланч … Напитки) |
| `exterior-1.jpg`, …           | Gallery                                           |

Every photo also appears in the gallery. `.jpg`, `.jpeg`, `.png`, `.webp` and `.avif`
are accepted. Only publish photos you have the rights to use.

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to the public address (for example `https://example.ru`) so
canonical URLs, the sitemap and structured data point to the right domain. Any Node.js
host works with `pnpm build && pnpm start`; Vercel needs no extra configuration.
