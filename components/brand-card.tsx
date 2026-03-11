"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Brand } from "@/types/types"
// Import the ensureBrandImages utility
import { ensureBrandImages } from "@/utils/ensure-brand-images"

interface BrandCardProps {
  brand: Brand
  onClick?: () => void
}

// In the BrandCard component, update the brand before using it
export function BrandCard({ brand: originalBrand }: BrandCardProps) {
  const router = useRouter()
  const [imageError, setImageError] = useState(false)

  // Ensure the brand has all necessary images
  const brand = ensureBrandImages(originalBrand)

  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    router.push(`/brands/${brand.slug}`)
    window.scrollTo(0, 0)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card className="overflow-hidden transition-all cursor-pointer group hover:shadow-md" onClick={handleClick}>
      <div className="relative">
        {/* Product image */}
        <div className="relative w-full h-48">
          <Image
            src={brand.productImage || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(brand.name)}`}
            alt={`${brand.name} product used by student`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100"></div>
        </div>

        {/* Brand logo in square box */}
        <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-lg shadow-md p-2 flex items-center justify-center">
          <div className="relative w-full h-full">
            {!imageError ? (
              <Image
                src={brand.logo || `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(brand.name)}`}
                alt={brand.name}
                width={64}
                height={64}
                className="object-contain"
                onError={handleImageError}
                unoptimized={true} // Add this to prevent image optimization issues
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#5B48D9] font-bold">
                {brand.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Discount badge */}
        <Badge className="absolute top-4 right-4 bg-[#5B48D9] text-white font-bold px-3 py-1.5 rounded-md shadow-md">
          {brand.discount ||
            (brand.studentPrice && brand.originalPrice
              ? `${Math.round(
                  (1 -
                    Number.parseFloat(brand.studentPrice.replace(/[^0-9.]/g, "")) /
                      Number.parseFloat(brand.originalPrice.replace(/[^0.9.]/g, ""))) *
                    100,
                )}% OFF`
              : "Student Exclusive")}
        </Badge>

        {/* View details button on hover */}
        <div className="absolute bottom-0 left-2 right-0 p-4 transition-transform duration-300 translate-y-full group-hover:translate-y-0 flex justify-end">
          <Button className="bg-white text-[#5B48D9] hover:bg-white/90 px-6" size="sm">
            View Details
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="px-2 py-0.5 text-xs bg-[#f8faff] text-[#5B48D9] border-[#5B48D9]">
            {brand.category}
          </Badge>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-[#333]">{brand.name}</h3>

        <p className="mb-3 text-sm text-[#666] line-clamp-2">{brand.tagline || "Exclusive student offers"}</p>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-[#666]">Regular</span>
            <span className="text-sm font-medium line-through text-[#666]">{brand.originalPrice}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-[#5B48D9]">Student</span>
            <span className="text-sm font-bold text-[#5B48D9]">{brand.studentPrice}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
