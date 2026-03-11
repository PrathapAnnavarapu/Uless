"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Laptop, Music, ShoppingBag, Utensils, Plane, Shirt, Heart, CreditCard, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Category } from "@/types/types"

// Map category names to icons
const categoryIcons: Record<string, React.ReactNode> = {
  "Technology & Software": <Laptop className="w-6 h-6" />,
  "Clothing & Accessories": <Shirt className="w-6 h-6" />,
  "Music & Entertainment": <Music className="w-6 h-6" />,
  "Subscriptions & Services": <CreditCard className="w-6 h-6" />,
  "Food & Dining": <Utensils className="w-6 h-6" />,
  "Travel & Transportation": <Plane className="w-6 h-6" />,
  "Health & Wellness": <Heart className="w-6 h-6" />,
}

// Map categories to unique theme colors
const categoryColors: Record<string, { color: string; gradient: string; light: string }> = {
  "Technology & Software": {
    color: "#3B82F6", // Blue
    gradient: "linear-gradient(to bottom, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.6))",
    light: "rgba(59, 130, 246, 0.1)",
  },
  "Clothing & Accessories": {
    color: "#EC4899", // Pink
    gradient: "linear-gradient(to bottom, rgba(236, 72, 153, 0.4), rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.6))",
    light: "rgba(236, 72, 153, 0.1)",
  },
  "Music & Entertainment": {
    color: "#8B5CF6", // Purple
    gradient: "linear-gradient(to bottom, rgba(139, 92, 246, 0.4), rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.6))",
    light: "rgba(139, 92, 246, 0.1)",
  },
  "Subscriptions & Services": {
    color: "#10B981", // Green
    gradient: "linear-gradient(to bottom, rgba(16, 185, 129, 0.4), rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.6))",
    light: "rgba(16, 185, 129, 0.1)",
  },
  "Food & Dining": {
    color: "#F59E0B", // Amber
    gradient: "linear-gradient(to bottom, rgba(245, 158, 11, 0.4), rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.6))",
    light: "rgba(245, 158, 11, 0.1)",
  },
  "Travel & Transportation": {
    color: "#06B6D4", // Cyan
    gradient: "linear-gradient(to bottom, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.6))",
    light: "rgba(6, 182, 212, 0.1)",
  },
  "Health & Wellness": {
    color: "#EF4444", // Red
    gradient: "linear-gradient(to bottom, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.6))",
    light: "rgba(239, 68, 68, 0.1)",
  },
  "View All": {
    color: "#5B48D9",
    gradient: "linear-gradient(to bottom, rgba(91, 72, 217, 0.5), rgba(91, 72, 217, 0.3), rgba(91, 72, 217, 0.7))",
    light: "rgba(91, 72, 217, 0.1)",
  },
}

interface CategoryCardProps {
  category: Category
  dealCount?: number
  href?: string
  onClick?: () => void
  priority?: boolean
}

export function CategoryCard({ category, dealCount, href, onClick, priority = false }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const themeColor = categoryColors[category.name] || categoryColors["View All"]
  const finalHref = href || `/categories/${category.slug}`

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <Link href={finalHref} className="block h-full" onClick={handleClick}>
      <Card
        className="overflow-hidden transition-all cursor-pointer h-full hover:shadow-xl group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-56 overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={priority}
              />
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"
              animate={{
                background: isHovered
                  ? themeColor.gradient
                  : "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))",
              }}
              transition={{ duration: 0.3 }}
            />
            {isHovered && <div className="absolute inset-0 shine-effect"></div>}
          </div>
        </div>

        <CardContent className="flex flex-col items-center p-6 relative z-10">
          <div
            className="flex items-center justify-center w-16 h-16 -mt-14 mb-4 rounded-full bg-white shadow-lg border-4 border-white transition-all"
            style={{
              color: isHovered ? themeColor.color : "#5B48D9",
              boxShadow: isHovered ? `0 0 20px 5px ${themeColor.light}` : "none",
            }}
          >
            {categoryIcons[category.name] || <ShoppingBag className="w-6 h-6" />}
          </div>

          <h3
            className="text-lg font-semibold text-center text-[#333] transition-colors"
            style={{ color: isHovered ? themeColor.color : "#333" }}
          >
            {category.name}
          </h3>

          {dealCount !== undefined && (
            <p className="mt-2 text-sm text-center text-[#666]">
              {dealCount} {dealCount === 1 ? "student deal" : "student deals"}
            </p>
          )}

          <motion.div
            className="flex items-center justify-center mt-4 w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            style={{ color: themeColor.color }}
          >
            <span className="text-sm font-medium flex items-center">
              View Categories <ChevronRight className="w-4 h-4 ml-1" />
            </span>
          </motion.div>
        </CardContent>
      </Card>
    </Link>
  )
}
