"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DealCard } from "@/components/deal-card"
import { useDeals } from "@/hooks/use-deals"

export function TrendingDeals() {
  const router = useRouter()
  const rawDeals = useDeals()

  // Helper function to safely parse dates
  const parseDate = (dateStr: string) => {
    if (!dateStr) return new Date()
    try {
      // Handles "DD/MM/YYYY" format if that's what your API sends
      return new Date(dateStr.split("/").reverse().join("-"))
    } catch (e) {
      return new Date()
    }
  }

  // 1. SAFE DATA NORMALIZATION
  // This ensures 'deals' is always an array, even if the API is still loading
  const deals = useMemo(() => {
    if (!rawDeals) return []
    return Array.isArray(rawDeals) ? rawDeals : []
  }, [rawDeals])

  // 2. TRENDING LOGIC
  const trendingDeals = useMemo(() => {
    if (deals.length === 0) return []

    return [...deals]
      .filter((deal) => deal.valid_until || deal.validUntil) // Check both naming conventions
      .sort((a, b) => {
        const dateA = parseDate(a.valid_until || a.validUntil)
        const dateB = parseDate(b.valid_until || b.validUntil)
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, 6)
  }, [deals])

  const handleExploreMoreDeals = () => {
    router.push("/deals?sort=trending")
  }

  // 3. LOADING STATE
  if (!rawDeals || deals.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <p className="text-gray-400 animate-pulse">Loading trending offers...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <h2 className="mb-3 text-3xl font-bold text-[#333]">Trending Now</h2>
        <p className="max-w-2xl mb-8 text-[#666]">
          The hottest deals that students are loving right now. Don't miss out on these popular offers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trendingDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          onClick={handleExploreMoreDeals}
          size="lg"
          className="border-[#5B48D9] text-[#5B48D9] hover:bg-[#5B48D9]/10 transition-colors"
        >
          Explore More Deals
        </Button>
      </div>
    </div>
  )
}