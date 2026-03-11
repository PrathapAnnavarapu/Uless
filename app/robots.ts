import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/debug/",
          "/auth/",
          "/profile/edit",
          "/settings/",
          "/config-instructions/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/debug/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/debug/"],
      },
      {
        userAgent: "Slurp",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/debug/"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/debug/"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/debug/"],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/debug/"],
      },
    ],
    sitemap: "https://uless.co/sitemap.xml",
    host: "https://uless.co",
  }
}
