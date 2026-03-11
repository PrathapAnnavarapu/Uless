"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { FeaturedBrandsHeroCarousel } from "./featured-brands-hero-carousel"
import { Button } from "@/components/ui/button"
import { Search, Sparkles, BadgePercent, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"

export function AnimatedHeroSection() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // Floating animation for the background elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  }

  // Staggered entrance for the text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  // Pulse animation for the CTA button
  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  }

  // Scroll to deals section
  const scrollToDeals = () => {
    const dealsSection = document.getElementById("featured-deals")
    if (dealsSection) {
      dealsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#f8faff] to-[#eef2ff] py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-10 left-[10%] w-20 h-20 rounded-full bg-purple-200 opacity-30 blur-xl"
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1 },
          }}
          className="absolute top-[30%] right-[15%] w-32 h-32 rounded-full bg-blue-200 opacity-30 blur-xl"
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 },
          }}
          className="absolute bottom-[20%] left-[20%] w-24 h-24 rounded-full bg-indigo-200 opacity-30 blur-xl"
        />
      </div>

      <div className="container px-4 mx-auto relative z-10" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Animated text content */}
          <div className="flex flex-col space-y-6">
            <motion.div initial="hidden" animate="visible" className="space-y-4">
              <motion.h1
                custom={0}
                variants={textVariants}
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              >
                Exclusive Student Discounts on Premium Brands
              </motion.h1>

              <motion.p custom={1} variants={textVariants} className="text-lg text-gray-600 max-w-lg">
                Join thousands of students saving big on their favorite brands. Verified student-only deals you won't
                find anywhere else.
              </motion.p>

              <motion.div custom={2} variants={textVariants} className="flex flex-wrap gap-4 pt-2">
                <motion.div animate={pulseAnimation}>
                  <Button
                    onClick={() => router.push("/deals")}
                    className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white px-6 py-6 rounded-xl text-lg"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explore Student Deals
                  </Button>
                </motion.div>

                <Button
                  variant="outline"
                  onClick={scrollToDeals}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-6 rounded-xl text-lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Find Discounts
                </Button>
              </motion.div>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <BadgePercent className="h-5 w-5 text-[#5B48D9]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Exclusive Savings</h3>
                  <p className="text-sm text-gray-600">Up to 80% off regular prices</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Student Verified</h3>
                  <p className="text-sm text-gray-600">Deals for students only</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <FeaturedBrandsHeroCarousel />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
