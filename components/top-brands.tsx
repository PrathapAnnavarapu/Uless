"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { mockBrands } from "@/data/mock-data"
import { Badge } from "@/components/ui/badge"

export function TopBrands() {
  // Get a diverse selection of brands, prioritizing the requested ones
  const priorityBrands = ["Walmart+", "Sam's Club", "Costco", "Best Buy"]

  // Client-only state so that shuffling occurs after hydration
  const [displayBrands, setDisplayBrands] = useState<typeof mockBrands>([])

  useEffect(() => {
    // First, get the priority brands
    const priorityBrandItems = mockBrands.filter((brand) => priorityBrands.includes(brand.name))

    // Then get other brands to fill the remaining slots
    const otherBrands = mockBrands
      .filter((brand) => !priorityBrands.includes(brand.name))
      .sort(() => 0.5 - Math.random()) // Shuffle the array on client
      .slice(0, 12 - priorityBrandItems.length) // Fill remaining slots

    // Combine and ensure we have exactly 12 brands
    setDisplayBrands([...priorityBrandItems, ...otherBrands].slice(0, 12))
  }, [])

  if (displayBrands.length === 0) {
    // Optionally render nothing or a placeholder while loading
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#333]">Top Brands</h2>

      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-2">
          {displayBrands.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.slug}`} className="block">
              <div className="flex flex-col items-center min-w-[120px] p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden bg-white border flex items-center justify-center">
                  {brand.logo ? (
                    <Image
                      src={brand.logo || `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(brand.name)}`}
                      alt={brand.name}
                      width={64}
                      height={64}
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#5B48D9] font-bold">
                      {brand.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-center text-[#333] mb-1">{brand.name}</span>
                <Badge className="bg-[#5B48D9]/10 text-[#5B48D9] hover:bg-[#5B48D9]/20 text-xs font-bold">
                  {brand.discount || "Student Deal"}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
