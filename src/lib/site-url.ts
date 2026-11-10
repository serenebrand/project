const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Canonical origin for metadata, sitemap and JSON-LD. Set NEXT_PUBLIC_SITE_URL in production.
export const siteUrl = fromEnv.replace(/\/+$/, "");
