import { SchemaMarkup } from "./schema-markup"

export function HomeStructuredData() {
  return (
    <>
      <SchemaMarkup
        type="Organization"
        data={{
          name: "Uless",
          url: "https://uless.co",
          logo: "https://uless.co/logo.png",
          sameAs: [
            "https://twitter.com/ulessdeals",
            "https://www.instagram.com/ulessdeals",
            "https://www.facebook.com/ulessdeals",
          ],
          description: "Uless provides exclusive student discounts on premium brands and services.",
        }}
      />

      <SchemaMarkup
        type="WebSite"
        data={{
          name: "Uless - Student Discounts & Deals",
          url: "https://uless.co",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://uless.co/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />

      <SchemaMarkup
        type="FAQPage"
        data={{
          mainEntity: [
            {
              "@type": "Question",
              name: "What is Uless?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Uless is a platform that provides exclusive student discounts on premium brands and services. We verify student status and connect students with special offers that help them save money.",
              },
            },
            {
              "@type": "Question",
              name: "How do I get student discounts on Uless?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "To get student discounts on Uless, simply create an account, verify your student status, and browse our collection of exclusive deals. Once verified, you can redeem discounts directly through our platform.",
              },
            },
            {
              "@type": "Question",
              name: "What brands offer student discounts on Uless?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Uless features student discounts from premium brands across various categories including Apple, Microsoft, Adobe, Amazon Prime, Spotify, YouTube Premium, Nike, Adidas, UberEats, DoorDash, and many more.",
              },
            },
          ],
        }}
      />
    </>
  )
}
