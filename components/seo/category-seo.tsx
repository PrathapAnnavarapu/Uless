import Head from "next/head"

interface CategorySEOProps {
  title: string
  description: string
  category: string
  image: string
  url: string
  itemCount: number
}

export function CategorySEO({ title, description, category, image, url, itemCount }: CategorySEOProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: title,
    description: description,
    image: image,
    url: url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    numberOfItems: itemCount,
    itemListElement: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: itemCount,
    },
  }

  return (
    <Head>
      <title>{`${title} | Uless Student Discounts`}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`${category} student discounts, ${category} student deals, ${category} college discounts, student ${category} offers`}
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Head>
  )
}
