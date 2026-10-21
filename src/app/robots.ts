import type { MetadataRoute } from "next";

const host = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"],
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
