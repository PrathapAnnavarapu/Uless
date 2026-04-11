"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import { CategoryCard } from "@/components/category-card"
import { useDeals } from "@/hooks/use-deals"
import { useCategoryContext } from "@/contexts/category-context"

// High-quality category images are now handled via the Category object or fallback in CategoryCard

export function CategoryShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [animationComplete, setAnimationComplete] = useState(false)

  const { categories, loading: categoriesLoading } = useCategoryContext()
  const rawDeals = useDeals()

  // Ensure deals is always an array
  const deals = useMemo(() => {
    return Array.isArray(rawDeals) ? rawDeals : []
  }, [rawDeals])

  // Calculate accurate deal counts for each category
  const categoryDealCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    // 1. Safety check for categories
    const safeCategories = Array.isArray(categories) ? categories : []
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
  }, [deals, categories])

  // Calculate total number of deals
  const totalDeals = useMemo(() => deals.length, [deals])

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
          {categories.slice(0, 7).map((category, index) => {
            const dealCount = categoryDealCounts[category.name] || 0

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="category-card-container"
              >
                <CategoryCard category={category} dealCount={dealCount} priority={index < 4} />
              </motion.div>
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="category-card-container"
          >
            <CategoryCard 
              category={{ id: "all", name: "View All Categories", slug: "all", description: "", image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2020&auto=format&fit=crop" , icon: "grid"}} 
              dealCount={totalDeals} 
              href="/categories" 
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}



// flask db init     
// flask db migrate -m "migrste models"    
// flask db upgrade  
