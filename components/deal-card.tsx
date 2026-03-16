"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Heart, ExternalLink } from "lucide-react"
import type { Deal } from "@/types/types"
import { useAuth } from "@/contexts/auth-context"
import { useSavedDeals } from "@/contexts/saved-deals-context"

interface DealCardProps {
  deal: Deal
  onClick?: () => void
  onSave?: (e: React.MouseEvent) => void
}

export function DealCard({ deal, onClick, onSave }: DealCardProps) {
  console.log(deal)
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { isSaved, toggleSaved } = useSavedDeals()
  const saved = isSaved(deal.id)

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (onSave) {
      onSave(e)
      return
    }

    if (!isAuthenticated) {
      toast.info("Please sign in to save deals")
      router.push("/auth")
      return
    }

    toggleSaved(deal)
    toast.success(saved ? "Removed from saved deals" : "Added to saved deals")
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    router.push(`/deals/${deal.id}`)
  }

  return (
    <Card className="overflow-hidden transition-all cursor-pointer group hover:shadow-md" onClick={handleClick}>
      <div className="relative">
        {/* Product image */}
        <div className="relative w-full h-48">
          <Image
            src={deal.image || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(deal.title)}`}
            alt={deal.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100"></div>
        </div>

        {/* Brand logo in square box */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-lg shadow-md p-1.5 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={deal.brandLogo || `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(deal.brand)}`}
              alt={deal.brand}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white"
          onClick={handleSave}
        >
          <Heart
            className="w-5 h-5"
            fill={saved ? "#ff4b4b" : "none"}
            stroke={saved ? "#ff4b4b" : "currentColor"}
          />
        </Button>

        {/* View details button on hover - EXACTLY like in BrandCard */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 translate-y-full group-hover:translate-y-0 flex justify-center">
          <Button className="bg-white text-[#5B48D9] hover:bg-white/90 px-6" size="sm">
            View Deal
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge
            variant="outline"
            className="px-2 py-0.5 text-xs bg-[#f8faff] text-[#5B48D9] border-[#5B48D9] font-bold"
          >
            {deal.category}
          </Badge>
          <span className="text-sm font-bold text-white bg-[#5B48D9] px-2 py-0.5 rounded-md">{deal.discount}</span>
        </div>

        <h3 className="mb-2 text-base font-semibold text-[#333] line-clamp-2">{deal.title}</h3>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#666]">{deal.brand}</span>
          <span className="text-xs text-[#666]">Valid until {deal.validUntil}</span>
        </div>

        {deal.originalPrice && deal.studentPrice && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-xs text-[#666]">Regular</span>
              <span className="text-sm font-medium line-through text-[#666]">{deal.originalPrice}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-[#5B48D9]">Student</span>
              <span className="text-sm font-bold text-[#5B48D9]">{deal.studentPrice}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
