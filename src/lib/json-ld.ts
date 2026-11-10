import { site } from "@/data/site";
import type { Photo } from "./photo-types";
import { siteUrl } from "./site-url";

// Ratings are left out on purpose: they come from third-party sites, and search engines
// reject aggregateRating markup that a business did not collect itself.
export function restaurantJsonLd(photos: Photo[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: site.name,
    description: site.description,
    url: siteUrl,
    telephone: site.phones.map((phone) => phone.tel),
    servesCuisine: site.cuisine,
    priceRange: site.averageCheck,
    currenciesAccepted: "RUB",
    paymentAccepted: "Наличные, банковская карта, QR-код",
    acceptsReservations: true,
    hasMenu: `${siteUrl}/#menu`,
    hasMap: site.maps.place,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: site.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Wi‑Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Парковка", value: true },
    ],
    ...(photos.length > 0 ? { image: photos.map((photo) => `${siteUrl}${photo.src}`) } : {}),
  };
}
