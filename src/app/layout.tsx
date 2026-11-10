import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "@/components/ui/Providers";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const title = "Кафе Кристалл 24 — русская кухня и банкеты в Полевском";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "кафе Кристалл 24",
    "кафе Полевской",
    "русская кухня Полевской",
    "банкеты Полевской",
    "бизнес-ланч Полевской",
    "свадьба юбилей корпоратив Полевской",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#050a14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        {/* Scroll-in animations start hidden; keep content readable without JS. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
