"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BrandCard } from "@/components/brand-card"
import { mockBrands } from "@/data/mock-data"
import { ensureBrandImages } from "@/utils/ensure-brand-images"

export function BrandShowcase() {
  const router = useRouter()
  const [topBrands, setTopBrands] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 1. Guard against non-array data
    const brandsArray = Array.isArray(mockBrands) ? mockBrands : []

    // 2. Filter and Shuffle logic
    const featured = brandsArray
      .filter((brand) => brand.featured)
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)

    setTopBrands(featured)
    setIsLoaded(true)
  }, [])

  const handleViewAllBrands = () => {
    router.push("/brands")
  }

  // Prevents layout shift/flash before the shuffle happens
  if (!isLoaded || topBrands.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <h2 className="mb-3 text-3xl font-bold text-[#333]">Premium Brands</h2>
        <p className="max-w-2xl mb-8 text-[#666]">
          Discover exclusive student discounts from leading brands. Save on everything from tech to fashion,
          entertainment to wholesale memberships.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topBrands.map((originalBrand) => {
          // Ensure we have fallback images for each brand
          const brand = ensureBrandImages(originalBrand)
          return <BrandCard key={brand.id} brand={brand} />
        })}
      </div>

      <div className="flex justify-center mt-8">
        <Button 
          className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white px-8 transition-all active:scale-95" 
          onClick={handleViewAllBrands} 
          size="lg"
        >
          View All Brands
        </Button>
      </div>
    </div>
  )
}