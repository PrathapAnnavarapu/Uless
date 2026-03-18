"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { BrandCard } from "@/components/brand-card"
import { PageSEO } from "@/components/seo/page-seo"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { useBrandsContext } from "@/contexts/brand-context"

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const { brands, loading } = useBrandsContext()

  // ✅ Dynamic categories from API
  const categories = [
    "all",
    ...Array.from(
      new Set(brands.map((b) => b.category?.trim()).filter(Boolean))
    ),
  ]

  // ✅ Filtering
  const filteredBrands = brands.filter((brand) => {
    const matchesSearch =
      brand.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.category?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      activeCategory === "all" || brand.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p>Loading brands...</p>
      </div>
    )
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f8faff]">
      <PageSEO pageName="brands" />

      <SchemaMarkup
        type="WebSite"
        data={{
          name: "Top Brands with Student Discounts | Uless",
          url: "https://uless.co/brands",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://uless.co/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />

      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            Student Discount Brands
          </h1>
          <p className="max-w-2xl mx-auto text-[#666]">
            Discover exclusive student discounts from top brands across various categories.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search brands..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex w-auto p-1">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="px-4">
                  {category === "all" ? "All Brands" : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredBrands
                  .filter((brand) =>
                    category === "all"
                      ? true
                      : brand.category === category
                  )
                  .map((brand) => (
                    <BrandCard key={brand.id} brand={brand} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Empty state */}
        {!loading && filteredBrands.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <h3 className="mb-2 text-xl font-medium">No brands found</h3>
            <p className="mb-6 text-[#666]">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("all")
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}