"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { mockBrands } from "@/data/mock-data"
import { ArrowLeft, ArrowRight, ExternalLink, ShoppingCart, Music, Coffee, Plane, Tv, Shirt } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { ensureBrandImages } from "@/utils/ensure-brand-images"

export function FeaturedBrandsHeroCarousel() {
  const router = useRouter()
  const { isAuthenticated, profile, openAuthModal } = useAuth()
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  // Get a selection of brands for the carousel (at least 9-10)
  // We want to avoid generating a different order on the server vs client, which
  // leads to hydration errors. The original code shuffled with Math.random during
  // render (both on the server and on the client). To keep the server markup
  // deterministic we build the carousel data after the component mounts.
  const [carouselBrands, setCarouselBrands] = useState<typeof mockBrands>([])

  useEffect(() => {
    const brands = mockBrands
      // Keep the filter logic intact; removed for demonstration earlier.
      .filter((brand) => true)
      .map((brand) => ensureBrandImages(brand))
      .sort(() => Math.random() - 0.5) // shuffle client-side once
      .slice(0, 10)
    setCarouselBrands(brands)
  }, [])

  const nextBrand = useCallback(() => {
    if (carouselBrands.length === 0) return
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselBrands.length)
  }, [carouselBrands.length])

  const prevBrand = useCallback(() => {
    if (carouselBrands.length === 0) return
    setActiveIndex((prevIndex) => (prevIndex - 1 + carouselBrands.length) % carouselBrands.length)
  }, [carouselBrands.length])

  // Auto-rotate the carousel
  useEffect(() => {
    if (!autoplayEnabled) return

    const timer = setInterval(() => {
      nextBrand()
    }, 8000) // Slowed down to 8 seconds

    return () => clearInterval(timer)
  }, [autoplayEnabled, nextBrand])

  // Pause autoplay when hovering
  const handleMouseEnter = () => {
    setAutoplayEnabled(false)
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setAutoplayEnabled(true)
    setIsHovering(false)
  }

  // Get contextual button text and icon based on brand category
  const getButtonInfo = (category: string) => {
    switch (category) {
      case "Food & Dining":
        return { text: "Order Now", icon: <Coffee className="w-3.5 h-3.5 ml-1.5" /> }
      case "Clothing & Accessories":
        return { text: "Shop Now", icon: <Shirt className="w-3.5 h-3.5 ml-1.5" /> }
      case "Technology & Software":
        return { text: "Get Deal", icon: <ExternalLink className="w-3.5 h-3.5 ml-1.5" /> }
      case "Music & Entertainment":
        return { text: "Subscribe Now", icon: <Music className="w-3.5 h-3.5 ml-1.5" /> }
      case "Subscriptions & Services":
        return { text: "Join Now", icon: <Tv className="w-3.5 h-3.5 ml-1.5" /> }
      case "Travel & Transportation":
        return { text: "Book Now", icon: <Plane className="w-3.5 h-3.5 ml-1.5" /> }
      default:
        return { text: "Get Discount", icon: <ShoppingCart className="w-3.5 h-3.5 ml-1.5" /> }
    }
  }

  const handleActionClick = (e: React.MouseEvent, brand: any) => {
    e.stopPropagation()

    if (!isAuthenticated) {
      // If not authenticated, open the auth modal
      openAuthModal()
      return
    }

    if (!profile.isVerified) {
      // If authenticated but not verified, redirect to verification
      router.push("/student-verification")
      return
    }

    // If authenticated and verified, redirect to the brand page
    router.push(`/brands/${brand.slug}`)
  }

  const handleBrandClick = (slug: string) => {
    router.push(`/brands/${slug}`)
  }

  if (carouselBrands.length === 0) return null

  const currentBrand = carouselBrands[activeIndex]
  const buttonInfo = getButtonInfo(currentBrand.category)

  return (
    <div
      className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={currentBrand.productImage || "/placeholder.svg"}
              alt={currentBrand.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-6">
          <div className="max-w-md">
            {/* Brand info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="text-white"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 bg-white rounded-lg shadow-md p-1.5 flex items-center justify-center mr-3">
                    <Image
                      src={currentBrand.logo || "/placeholder.svg"}
                      alt={currentBrand.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">{currentBrand.name}</h2>
                </div>

                <p className="text-base font-medium text-white/90 mb-3 line-clamp-2">{currentBrand.tagline}</p>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-white/70">Regular</span>
                    <span className="text-sm font-medium line-through text-white/80">{currentBrand.originalPrice}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/70">Student</span>
                    <span className="text-sm font-bold text-white">{currentBrand.studentPrice}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                    <Button
                      onClick={(e) => handleActionClick(e, currentBrand)}
                      className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white px-4 py-2 text-sm relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        {buttonInfo.text}
                        {buttonInfo.icon}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#6e5aff] to-[#5B48D9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                    <Button
                      variant="outline"
                      onClick={() => handleBrandClick(currentBrand.slug)}
                      className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-sm px-4 py-2"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation arrows with enhanced visibility on hover */}
      <div
        className={`absolute bottom-4 right-4 flex space-x-2 transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-70"}`}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
            onClick={prevBrand}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
            onClick={nextBrand}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </motion.div>
      </div>

      {/* Indicators with enhanced interactivity */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center space-x-1.5">
          {carouselBrands.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex ? "bg-white" : "bg-white/30"}`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
