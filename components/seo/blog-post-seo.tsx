import Head from "next/head"

interface BlogPostSEOProps {
  title: string
  description: string
  publishDate: string
  modifiedDate?: string
  author: string
  category: string
  tags: string[]
  image: string
  url: string
}

export function BlogPostSEO({
  title,
  description,
  publishDate,
  modifiedDate,
  author,
  category,
  tags,
  image,
  url,
}: BlogPostSEOProps) {
  // Format dates for schema
  const publishISODate = new Date(publishDate).toISOString()
  const modifiedISODate = modifiedDate ? new Date(modifiedDate).toISOString() : publishISODate

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Uless",
      logo: {
        "@type": "ImageObject",
        url: "https://uless.co/logo.png",
      },
    },
    datePublished: publishISODate,
    dateModified: modifiedISODate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: tags.join(", "),
    articleSection: category,
  }

  return (
    <Head>
      <title>{`${title} | Uless Blog`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={tags.join(", ")} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="article:published_time" content={publishISODate} />
      <meta property="article:modified_time" content={modifiedISODate} />
      <meta property="article:author" content={author} />
      <meta property="article:section" content={category} />
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

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
