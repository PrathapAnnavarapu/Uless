"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DealCard } from "@/components/deal-card"
import { useDeals } from "@/hooks/use-deals"

export function FeaturedDeals() {
  const router = useRouter()
  
  // 1. Grab data from your Flask API hook
  const rawDeals = useDeals()

  // 2. The "Safety Guard": Ensure we are always working with an array
  // This stops the "forEach is not a function" error immediately.
  const deals = useMemo(() => {
    if (!rawDeals) return []
    // If your hook returns an object like { data: [] }, adjust to rawDeals.data
    return Array.isArray(rawDeals) ? rawDeals : []
  }, [rawDeals])

  // 3. Sort by highest discount percentage
  const featuredDeals = useMemo(() => {
    if (deals.length === 0) return []

    return [...deals]
      .sort((a, b) => {
        const getDiscountPercent = (deal: any) => {
          // Extracts "20" from "20% OFF" or just "20"
          const discountText = String(deal?.discount || "")
          const match = discountText.match(/(\d+)/)
          return match ? parseInt(match[1], 10) : 0
        }
        return getDiscountPercent(b) - getDiscountPercent(a)
      })
      .slice(0, 6)
  }, [deals])

  const handleViewAllDeals = () => {
    router.push("/deals")
  }

  // 4. Loading State: Show a placeholder while the Flask API responds
  if (!rawDeals) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#5B48D9] border-t-transparent"></div>
        <p className="mt-4 text-[#666] font-medium">Fetching the best deals...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <h2 className="mb-3 text-3xl font-bold text-[#333]">Featured Deals</h2>
        <p className="max-w-2xl mb-8 text-[#666]">
          Handpicked offers with the biggest savings. Updated regularly to bring you the best value.
        </p>
      </div>

      {/* Grid of Deal Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      {/* "No Deals Found" Fallback */}
      {featuredDeals.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No featured deals available right now.
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Button 
          className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white px-8 transition-transform active:scale-95" 
          onClick={handleViewAllDeals} 
          size="lg"
        >
          View All Deals
        </Button>
      </div>
    </div>
  )
}