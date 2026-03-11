import { SchemaMarkup } from "./schema-markup"

export function EnhancedStructuredData() {
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
            "https://www.linkedin.com/company/ulessdeals",
            "https://www.youtube.com/channel/ulessdeals",
          ],
          description: "Uless provides exclusive student discounts on premium brands and services.",
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+1-800-STUDENT",
              contactType: "customer service",
              areaServed: "US",
              availableLanguage: ["English"],
            },
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Student Savings St",
            addressLocality: "College Town",
            addressRegion: "CA",
            postalCode: "90210",
            addressCountry: "US",
          },
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
          publisher: {
            "@type": "Organization",
            name: "Uless",
            logo: {
              "@type": "ImageObject",
              url: "https://uless.co/logo.png",
            },
          },
        }}
      />

      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://uless.co",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Student Discounts",
              item: "https://uless.co/deals",
            },
          ],
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
                text: "Uless is a platform that provides exclusive student discounts on premium brands and services. We verify student status and connect students with special offers that help them save money on everything from technology to food delivery.",
              },
            },
            {
              "@type": "Question",
              name: "How do I get student discounts on Uless?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "To get student discounts on Uless, simply create an account, verify your student status using your .edu email or student ID, and browse our collection of exclusive deals. Once verified, you can redeem discounts directly through our platform.",
              },
            },
            {
              "@type": "Question",
              name: "What brands offer student discounts on Uless?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Uless features student discounts from premium brands across various categories including Apple, Microsoft, Adobe, Amazon Prime, Spotify, YouTube Premium, Nike, Adidas, UberEats, DoorDash, and many more. We're constantly adding new brands and deals to provide the best savings for students.",
              },
            },
            {
              "@type": "Question",
              name: "Is Uless free for students?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, Uless is completely free for students to use. We don't charge any fees to access or redeem student discounts. Our platform is supported by our brand partnerships, allowing us to provide this valuable service to students at no cost.",
              },
            },
            {
              "@type": "Question",
              name: "How does student verification work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Student verification on Uless is simple and secure. You can verify your student status by using your .edu email address or by uploading your student ID. Our verification process typically takes less than 24 hours, and once verified, you'll have access to all exclusive student discounts on our platform.",
              },
            },
          ],
        }}
      />
    </>
  )
}
