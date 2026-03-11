"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { mockCategories } from "@/data/mock-data"
import { useEffect } from "react"

export function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Save to recent searches
      const updatedSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updatedSearches)
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSuggestions(false)

      // Ensure the page scrolls to top
      window.scrollTo(0, 0)
    }
  }

  const handleFocus = () => {
    if (recentSearches.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (searchRef.current && !searchRef.current.contains(e.relatedTarget as Node)) {
        setShowSuggestions(false)
      }
    }, 200)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
    setShowSuggestions(false)

    // Ensure the page scrolls to top
    window.scrollTo(0, 0)
  }

  // Popular brands for suggestions - updated to include new premium brands
  const popularBrands = ["Apple", "Adobe", "Microsoft", "Samsung", "Levi's", "Costco", "Walmart+", "Best Buy"]

  return (
    <section className="relative py-20 overflow-hidden bg-[#f8faff] md:py-32">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-gradient-to-r from-[#5B48D9] to-[#6366F1] blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 bg-gradient-to-r from-[#6366F1] to-[#5B48D9] blur-3xl translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="container relative px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-[#333] md:text-5xl lg:text-6xl">
              Exclusive <span className="text-[#5B48D9]">Uless</span> Deals for Students
            </h1>
            <p className="mb-8 text-lg text-[#666] md:text-xl">
              Discover premium discounts on your favorite brands, exclusively for students. Save big on tech,
              entertainment, fashion, wholesale memberships, and more.
            </p>

            <div ref={searchRef} className="relative max-w-md mx-auto mb-8 md:mx-0">
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="text"
                  placeholder="Search for brands, deals, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="h-12 rounded-l-xl border-r-0"
                />
                <Button type="submit" className="h-12 px-4 rounded-l-none rounded-r-xl bg-[#5B48D9] hover:bg-[#4a3ac0]">
                  <Search className="w-5 h-5" />
                </Button>
              </form>

              {/* Amazon/Walmart style search suggestions */}
              {showSuggestions && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200">
                  <div className="p-4">
                    {recentSearches.length > 0 && (
                      <>
                        <h3 className="font-medium text-sm text-gray-500 mb-2">Recent Searches</h3>
                        <div className="space-y-2 mb-4">
                          {recentSearches.map((search, index) => (
                            <div
                              key={index}
                              className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                              onClick={() => handleSuggestionClick(search)}
                            >
                              <Search className="w-4 h-4 text-gray-400 mr-2" />
                              <span>{search}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 pt-4">
                          <h3 className="font-medium text-sm text-gray-500 mb-2">Popular Brands</h3>
                          <div className="space-y-2">
                            {popularBrands.map((brand, index) => (
                              <div
                                key={index}
                                className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                                onClick={() => handleSuggestionClick(brand)}
                              >
                                <span>{brand}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {mockCategories.slice(0, 5).map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="text-[#5B48D9] border-[#5B48D9]/30 hover:bg-[#5B48D9]/10"
                  onClick={() => {
                    router.push(`/categories/${category.slug}`)
                    window.scrollTo(0, 0)
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Central uless logo - positioned with z-index to ensure it's on top */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="text-8xl font-bold text-[#5B48D9]">Uless</span>
              </div>

              {/* Amazon Prime bouncing element - top */}
              <div className="absolute top-[10%] left-[35%] animate-bounce-slow z-20" style={{ animationDelay: "0ms" }}>
                <div className="px-3 py-2 text-sm font-bold text-white rounded-full whitespace-nowrap bg-[#FF9900] shadow-lg">
                  Amazon Prime FREE
                </div>
              </div>

              {/* GitHub bouncing element - right */}
              <div
                className="absolute top-[40%] right-[-15%] animate-bounce-slow z-20"
                style={{ animationDelay: "500ms" }}
              >
                <div className="px-3 py-2 text-sm font-bold text-white rounded-full whitespace-nowrap bg-[#333333] shadow-lg">
                  GitHub FREE
                </div>
              </div>

              {/* Under Armour bouncing element - bottom */}
              <div
                className="absolute bottom-[10%] left-[35%] animate-bounce-slow z-20"
                style={{ animationDelay: "1500ms" }}
              >
                <div className="px-3 py-2 text-sm font-bold text-white rounded-full whitespace-nowrap bg-[#000000] shadow-lg">
                  Under Armour 10% OFF
                </div>
              </div>

              {/* Walmart+ bouncing element - left */}
              <div
                className="absolute top-[40%] left-[-15%] animate-bounce-slow z-20"
                style={{ animationDelay: "1000ms" }}
              >
                <div className="px-3 py-2 text-sm font-bold text-white rounded-full whitespace-nowrap bg-[#0071DC] shadow-lg">
                  Walmart+ 50% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
