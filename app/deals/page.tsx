"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DealCard } from "@/components/deal-card"
import { mockCategories } from "@/data/mock-data"
import { API_BASE } from "@/lib/backend"
import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { PageSEO } from "@/components/seo/page-seo"
import { SchemaMarkup } from "@/components/seo/schema-markup"

export default function AllDealsPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "default")
  const [allDeals, setAllDeals] = useState<any[]>([])
  const [filteredDeals, setFilteredDeals] = useState<any[]>([])

  // Scroll to top on page load and fetch deals from backend
  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchDeals = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/deals/all`)
        const data = await res.json()
        setAllDeals(data)
        setFilteredDeals(data)
      } catch (err) {
        console.error("Failed to load deals", err)
      }
    }

    fetchDeals()
  }, [])

  // Filter and sort deals based on search query, selected category, and sort option
  useEffect(() => {
    let filtered = [...allDeals]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (deal) =>
          deal.title.toLowerCase().includes(query) ||
          deal.description.toLowerCase().includes(query) ||
          deal.brand.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((deal) => deal.category === selectedCategory)
    }

    // Sort deals
    if (selectedSort === "trending") {
      filtered.sort((a, b) => {
        // Sort by newest first (using validUntil as a proxy for recency)
        const dateA = new Date(a.validUntil.split("/").reverse().join("-"))
        const dateB = new Date(b.validUntil.split("/").reverse().join("-"))
        return dateB.getTime() - dateA.getTime()
      })
    } else if (selectedSort === "discount") {
      filtered.sort((a, b) => {
        // Sort by discount percentage (higher first)
        const getDiscountPercent = (deal: any) => {
          const discountText = deal.discount
          const match = discountText.match(/(\d+)%/)
          return match ? Number.parseInt(match[1]) : 0
        }
        return getDiscountPercent(b) - getDiscountPercent(a)
      })
    }

    setFilteredDeals(filtered)
  }, [searchQuery, selectedCategory, selectedSort])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f8faff]">
      <PageSEO pageName="deals" />

      <SchemaMarkup
        type="FAQPage"
        data={{
          mainEntity: [
            {
              "@type": "Question",
              name: "How do I redeem student deals on Uless?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "To redeem student deals, verify your student status through our platform, then click on the deal you want and follow the redemption instructions. Most deals provide a discount code or direct link to the offer.",
              },
            },
            {
              "@type": "Question",
              name: "Are all Uless student discounts verified?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, all student discounts on Uless are verified and updated regularly. We work directly with brands to ensure all deals are current and exclusive to students.",
              },
            },
          ],
        }}
      />

      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold text-[#333] md:text-4xl">All Student Deals</h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-[#666]">
              Browse all available student discounts and exclusive offers. Find the best deals for your needs.
            </p>

            <form onSubmit={handleSearch} className="flex max-w-md mx-auto mb-8">
              <Input
                type="text"
                placeholder="Search for deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-l-xl border-r-0"
              />
              <Button type="submit" className="h-12 px-4 rounded-l-none rounded-r-xl bg-[#5B48D9] hover:bg-[#4a3ac0]">
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-[#666]">Sort by:</h3>
            <div className="flex space-x-2 mb-4">
              <Button
                variant={selectedSort === "default" ? "default" : "outline"}
                className={`rounded-xl px-4 py-2 ${
                  selectedSort === "default"
                    ? "bg-[#5B48D9] text-white hover:bg-[#4a3ac0]"
                    : "border-[#e0e0e0] text-[#666] hover:bg-[#f8faff]"
                }`}
                onClick={() => setSelectedSort("default")}
                size="sm"
              >
                Default
              </Button>
              <Button
                variant={selectedSort === "trending" ? "default" : "outline"}
                className={`rounded-xl px-4 py-2 ${
                  selectedSort === "trending"
                    ? "bg-[#5B48D9] text-white hover:bg-[#4a3ac0]"
                    : "border-[#e0e0e0] text-[#666] hover:bg-[#f8faff]"
                }`}
                onClick={() => setSelectedSort("trending")}
                size="sm"
              >
                Trending
              </Button>
              <Button
                variant={selectedSort === "discount" ? "default" : "outline"}
                className={`rounded-xl px-4 py-2 ${
                  selectedSort === "discount"
                    ? "bg-[#5B48D9] text-white hover:bg-[#4a3ac0]"
                    : "border-[#e0e0e0] text-[#666] hover:bg-[#f8faff]"
                }`}
                onClick={() => setSelectedSort("discount")}
                size="sm"
              >
                Highest Discount
              </Button>
            </div>
          </div>

          <div className="mb-8 overflow-x-auto">
            <h3 className="mb-2 text-sm font-medium text-[#666]">Filter by category:</h3>
            <div className="flex space-x-2 pb-2">
              <Button
                key="all"
                variant={selectedCategory === "All" ? "default" : "outline"}
                className={`rounded-xl px-4 py-2 ${
                  selectedCategory === "All"
                    ? "bg-[#5B48D9] text-white hover:bg-[#4a3ac0]"
                    : "border-[#e0e0e0] text-[#666] hover:bg-[#f8faff]"
                }`}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </Button>

              {mockCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className={`rounded-xl px-4 py-2 whitespace-nowrap ${
                    selectedCategory === category.name
                      ? "bg-[#5B48D9] text-white hover:bg-[#4a3ac0]"
                      : "border-[#e0e0e0] text-[#666] hover:bg-[#f8faff]"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {filteredDeals.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-xl shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-[#333]">No deals found</h2>
              <p className="text-[#666]">Try adjusting your search or browse a different category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
