"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { mockCategories, mockDeals } from "@/data/mock-data"
import { Laptop, Music, ShoppingBag, Utensils, Plane, Shirt, Heart, CreditCard, ChevronRight, Grid } from "lucide-react"
import Image from "next/image"
import { useDeals } from "@/hooks/use-deals"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

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
    color: "#5B48D9", // Original purple
    gradient: "linear-gradient(to bottom, rgba(91, 72, 217, 0.5), rgba(91, 72, 217, 0.3), rgba(91, 72, 217, 0.7))",
    light: "rgba(91, 72, 217, 0.1)",
  },
}

// High-quality category images with animation effects
const categoryImages = [
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2020&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2020&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2020&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2020&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2020&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2020&auto=format&fit=crop",
  // View All Categories image - colorful shopping/diverse brands image
  "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2020&auto=format&fit=crop",
]

export function CategoryShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [animationComplete, setAnimationComplete] = useState(false)

  // Calculate accurate deal counts for each category
 const rawDeals = useDeals()

  // Ensure deals is always an array
  const deals = useMemo(() => {
    return Array.isArray(rawDeals) ? rawDeals : []
  }, [rawDeals])

  // Calculate accurate deal counts for each category
  const categoryDealCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    // 1. Safety check for categories
    const safeCategories = Array.isArray(mockCategories) ? mockCategories : []
    safeCategories.forEach((category) => {
      counts[category.name] = 0
    })

    // 2. Safety check for deals (using the guarded 'deals' array from above)
    deals.forEach((deal: any) => {
      if (deal?.category && counts[deal.category] !== undefined) {
        counts[deal.category]++
      }
    })

    return counts
  }, [deals])

  // Calculate total number of deals
  const totalDeals = useMemo(() => mockDeals.length, [])

  useEffect(() => {
    if (isInView && !animationComplete) {
      setTimeout(() => {
        setAnimationComplete(true)
      }, 1000)
    }
  }, [isInView, animationComplete])

  return (
    <div className="py-24 space-y-12 relative overflow-hidden" id="category-section" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12" id="category-heading">
          <h2 className="mb-4 text-4xl font-bold text-[#333]">Browse by Category</h2>
          <p className="max-w-2xl mb-8 text-lg text-[#666]">
            Explore student discounts across various categories. From tech gadgets to wholesale memberships, find deals
            that match your interests and needs.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {mockCategories.slice(0, 7).map((category, index) => {
            const dealCount = categoryDealCounts[category.name] || 0
            const imageUrl = categoryImages[index % categoryImages.length]
            const themeColor = categoryColors[category.name] || categoryColors["View All"]

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="category-card-container"
              >
                <Link href={`/categories/${category.slug}`} className="block h-full">
                  <Card
                    className="overflow-hidden transition-all cursor-pointer h-full hover:shadow-xl group"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="relative w-full h-56 overflow-hidden">
                      {/* High-quality image with animation effects */}
                      <div className="absolute inset-0 w-full h-full">
                        <div className="relative w-full h-full">
                          <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 animated-image"
                            priority={index < 4}
                            onError={() => {
                              console.log("Image failed to load:", imageUrl)
                            }}
                          />
                        </div>

                        {/* Animated overlay with category-specific color */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"
                          animate={{
                            background:
                              hoveredIndex === index
                                ? themeColor.gradient
                                : "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))",
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Animated shine effect */}
                        {hoveredIndex === index && <div className="absolute inset-0 shine-effect"></div>}
                      </div>
                    </div>

                    <CardContent className="flex flex-col items-center p-6 relative z-10">
                      <div
                        className="flex items-center justify-center w-16 h-16 -mt-14 mb-4 rounded-full bg-white shadow-lg border-4 border-white pulse-glow"
                        style={{
                          color: hoveredIndex === index ? themeColor.color : "#5B48D9",
                          boxShadow:
                            hoveredIndex === index
                              ? `0 0 20px 5px ${themeColor.light}`
                              : "0 0 0 0 rgba(91, 72, 217, 0.2)",
                        }}
                      >
                        {categoryIcons[category.name] || <ShoppingBag className="w-6 h-6" />}
                      </div>

                      <h3
                        className="text-lg font-semibold text-center text-[#333] transition-colors"
                        style={{
                          color: hoveredIndex === index ? themeColor.color : "#333",
                        }}
                      >
                        {category.name}
                      </h3>

                      <p className="mt-2 text-sm text-center text-[#666]">
                        {dealCount} {dealCount === 1 ? "student deal" : "student deals"}
                      </p>

                      <motion.div
                        className="flex items-center justify-center mt-4 w-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          y: hoveredIndex === index ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ color: themeColor.color }}
                      >
                        <span className="text-sm font-medium flex items-center">
                          View Deals <ChevronRight className="w-4 h-4 ml-1" />
                        </span>
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}

          {/* View All Categories Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="category-card-container"
          >
            <Link href="/categories" className="block h-full">
              <Card
                className="overflow-hidden transition-all cursor-pointer h-full hover:shadow-xl group"
                onMouseEnter={() => setHoveredIndex(999)} // Special index for this card
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full h-56 overflow-hidden">
                  {/* View All Categories image */}
                  <div className="absolute inset-0 w-full h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={categoryImages[7] || "/placeholder.svg"} // Use the special "View All" image
                        alt="View All Categories"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 animated-image"
                        priority={false}
                        onError={() => {
                          console.log("View All image failed to load")
                        }}
                      />
                    </div>

                    {/* Animated overlay with special gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"
                      animate={{
                        background:
                          hoveredIndex === 999
                            ? categoryColors["View All"].gradient
                            : "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7))",
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Animated shine effect */}
                    {hoveredIndex === 999 && <div className="absolute inset-0 shine-effect"></div>}
                  </div>
                </div>

                <CardContent className="flex flex-col items-center p-6 relative z-10">
                  <div
                    className="flex items-center justify-center w-16 h-16 -mt-14 mb-4 rounded-full bg-white shadow-lg border-4 border-white pulse-glow"
                    style={{
                      color: hoveredIndex === 999 ? categoryColors["View All"].color : "#5B48D9",
                      boxShadow:
                        hoveredIndex === 999
                          ? `0 0 20px 5px ${categoryColors["View All"].light}`
                          : "0 0 0 0 rgba(91, 72, 217, 0.2)",
                    }}
                  >
                    <Grid className="w-6 h-6" />
                  </div>

                  <h3
                    className="text-lg font-semibold text-center text-[#333] transition-colors"
                    style={{
                      color: hoveredIndex === 999 ? categoryColors["View All"].color : "#333",
                    }}
                  >
                    View All Categories
                  </h3>

                  <p className="mt-2 text-sm text-center text-[#666]">{totalDeals} total student deals</p>

                  <motion.div
                    className="flex items-center justify-center mt-4 w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredIndex === 999 ? 1 : 0,
                      y: hoveredIndex === 999 ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ color: categoryColors["View All"].color }}
                  >
                    <span className="text-sm font-medium flex items-center">
                      Explore All <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </motion.div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
