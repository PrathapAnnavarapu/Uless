import { SchemaMarkup } from "./schema-markup"

export function LocalBusinessSchema() {
  return (
    <SchemaMarkup
      type="LocalBusiness"
      data={{
        name: "Uless Student Discounts",
        image: "https://uless.co/logo.png",
        "@id": "https://uless.co",
        url: "https://uless.co",
        telephone: "+1-800-STUDENT",
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Student Savings St",
          addressLocality: "College Town",
          addressRegion: "CA",
          postalCode: "90210",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 34.0736,
          longitude: -118.4004,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
          },
        ],
        sameAs: [
          "https://www.facebook.com/ulessdeals",
          "https://www.twitter.com/ulessdeals",
          "https://www.instagram.com/ulessdeals",
          "https://www.linkedin.com/company/ulessdeals",
        ],
      }}
    />
  )
}
