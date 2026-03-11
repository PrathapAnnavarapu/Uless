import { SchemaMarkup } from "./schema-markup"

interface ProductSchemaProps {
  name: string
  description: string
  image: string
  brand: string
  regularPrice: string
  studentPrice: string
  discount: string
  category: string
  url: string
  sku?: string
  availability?: string
  reviewCount?: number
  ratingValue?: number
}

export function ProductSchema({
  name,
  description,
  image,
  brand,
  regularPrice,
  studentPrice,
  discount,
  category,
  url,
  sku = "STUDENT-DEAL",
  availability = "https://schema.org/InStock",
  reviewCount = 0,
  ratingValue = 0,
}: ProductSchemaProps) {
  // Extract numeric values from prices
  const extractPrice = (price: string) => {
    const match = price.match(/[\d.]+/)
    return match ? Number.parseFloat(match[0]) : 0
  }

  const regularPriceValue = extractPrice(regularPrice)
  const studentPriceValue = extractPrice(studentPrice)

  // Calculate savings amount
  const savingsAmount = regularPriceValue - studentPriceValue

  const schemaData: any = {
    name: `${name} Student Discount`,
    description: description,
    image: image,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url: url,
      priceCurrency: "USD",
      price: studentPriceValue,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days from now
      availability: availability,
      seller: {
        "@type": "Organization",
        name: "Uless",
      },
    },
    sku: sku,
    mpn: `ULESS-${brand.replace(/\s+/g, "-").toUpperCase()}`,
    category: category,
  }

  // Add review data if available
  if (reviewCount > 0 && ratingValue > 0) {
    schemaData.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      bestRating: "5",
      worstRating: "1",
    }
  }

  return <SchemaMarkup type="Product" data={schemaData} />
}
