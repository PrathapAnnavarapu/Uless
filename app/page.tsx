import { FeaturedDeals } from "@/components/featured-deals"
import { CategoryShowcase } from "@/components/category-showcase"
import { BrandShowcase } from "@/components/brand-showcase"
import { TrendingDeals } from "@/components/trending-deals"
import { Newsletter } from "@/components/newsletter"
import { HowItWorks } from "@/components/how-it-works"
import { PageSEO } from "@/components/seo/page-seo"
import { HomeStructuredData } from "@/components/seo/home-structured-data"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { AnimatedHeroSection } from "@/components/animated-hero-section"
import { DynamicColorScheme } from "@/components/dynamic-color-scheme"

export default function HomePage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <PageSEO pageName="home" />
      <HomeStructuredData />
      <DynamicColorScheme />

      <SchemaMarkup
        type="Organization"
        data={{
          name: "Uless",
          url: "https://uless.co",
          logo: "https://uless.co/logo.png",
          sameAs: [],
          description: "Uless provides exclusive student discounts on premium brands and services.",
        }}
      />

      <AnimatedHeroSection />      

      <section id="category-section" className="py-16 bg-[#f8faff]">
        <div className="container px-4 mx-auto">
          <CategoryShowcase />
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <BrandShowcase />
        </div>
      </section>

      <section id="featured-deals" className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <FeaturedDeals />
        </div>
      </section>


      <section className="py-16 bg-[#f8faff]">
        <div className="container px-4 mx-auto">
          <TrendingDeals />
        </div>
      </section>
      

      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <HowItWorks />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#5B48D9] to-[#6366F1]">
        <div className="container px-4 mx-auto">
          <Newsletter />
        </div>
      </section>
    </main>
  )
}
