import Head from "next/head"
import { defaultSEO, pageSEO } from "@/lib/seo-config"

interface PageSEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: "website" | "article"
  pageName?: keyof typeof pageSEO
  noIndex?: boolean
}

export function PageSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  pageName,
  noIndex = false,
}: PageSEOProps) {
  // Use page-specific SEO if pageName is provided
  const pageSpecificSEO = pageName ? pageSEO[pageName] : null

  const seoTitle = title || (pageSpecificSEO?.title ? pageSpecificSEO.title : defaultSEO.defaultTitle)
  const seoDescription =
    description || (pageSpecificSEO?.description ? pageSpecificSEO.description : defaultSEO.description)
  const seoKeywords =
    keywords || (pageSpecificSEO?.keywords ? pageSpecificSEO.keywords : defaultSEO.additionalMetaTags?.[0]?.content)
  const seoImage = image || defaultSEO.openGraph.images[0].url
  const seoUrl = url || defaultSEO.openGraph.url

  const fullTitle = seoTitle.includes("Uless") ? seoTitle : `${seoTitle} | Uless - Student Discounts & Deals`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={seoDescription} />
      {seoKeywords && <meta name="keywords" content={seoKeywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content="Uless" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultSEO.twitter.site} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />

      {/* No index if specified */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Head>
  )
}
