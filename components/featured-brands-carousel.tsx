"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { mockBrands } from "@/data/mock-data"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FeaturedBrandsCarousel() {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)

  // Get featured brands only
  const featuredBrands = mockBrands
    .filter((brand) => brand.featured)
    .sort(() => Math.random() - 0.5) // Shuffle the array
    .slice(0, 5)

  const nextBrand = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % featuredBrands.length)
  }

  const prevBrand = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + featuredBrands.length) % featuredBrands.length)
  }

  // Auto-rotate the carousel
  const nextBrandRef = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % featuredBrands.length)
  }

  useEffect(() => {
    if (!autoplayEnabled) return

    const timer = setInterval(() => {
      nextBrandRef()
    }, 5000)

    return () => clearInterval(timer)
  }, [autoplayEnabled])

  // Pause autoplay when hovering
  const handleMouseEnter = () => setAutoplayEnabled(false)
  const handleMouseLeave = () => setAutoplayEnabled(true)

  if (featuredBrands.length === 0) return null

  return (
    <div
      className="relative p-6 bg-white rounded-xl shadow-sm overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#333]">Featured Brands</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="rounded-full" onClick={prevBrand}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" onClick={nextBrand}>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-[300px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <div
              className="flex flex-col items-center text-center cursor-pointer"
              onClick={() => router.push(`/brands/${featuredBrands[activeIndex].slug}`)}
            >
              <div className="relative w-32 h-32 mb-6">
                <Image
                  src={featuredBrands[activeIndex].logo || "/placeholder.svg"}
                  alt={featuredBrands[activeIndex].name}
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="text-2xl font-bold mb-3 text-[#333]">{featuredBrands[activeIndex].name}</h3>
              <p className="text-lg font-medium text-[#5B48D9] mb-3">{featuredBrands[activeIndex].tagline}</p>

              <div className="bg-[#f8faff] px-4 py-2 rounded-full text-[#333] mb-4">
                <span className="text-sm">By {featuredBrands[activeIndex].parentCompany}</span>
              </div>

              <div className="flex space-x-4 mb-4">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-[#666]">Regular</span>
                  <span className="text-base font-medium line-through text-[#666]">
                    {featuredBrands[activeIndex].originalPrice}
                  </span>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="flex flex-col items-center">
                  <span className="text-sm text-[#5B48D9]">Student</span>
                  <span className="text-base font-bold text-[#5B48D9]">{featuredBrands[activeIndex].studentPrice}</span>
                </div>
              </div>

              <Button
                className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white"
                onClick={() => router.push(`/brands/${featuredBrands[activeIndex].slug}`)}
              >
                View Deal
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {featuredBrands.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-[#5B48D9]" : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
