import Script from "next/script"

interface SchemaMarkupProps {
  type: "Organization" | "WebSite" | "FAQPage" | "Product" | "BreadcrumbList"
  data: any
}

export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  }

  return (
    <Script
      id={`schema-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      strategy="afterInteractive"
    />
  )
}
