"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, HelpCircle, Users, MessageSquare, FileText, Info } from "lucide-react"
import { mockBrands, mockCategories } from "@/data/mock-data"
import { useDeals } from "@/hooks/use-deals"
import Link from "next/link"
import Image from "next/image"

// Define types for different content sections
type ContentSection = {
  title: string
  path: string
  description: string
  icon: React.ReactNode
  type: string
}

// Website sections data
const websiteSections: ContentSection[] = [
  {
    title: "Support",
    path: "/support",
    description: "Get help with your account and student discounts",
    icon: <HelpCircle className="w-4 h-4 text-[#5B48D9]" />,
    type: "section",
  },
  {
    title: "Partnerships",
    path: "/partnerships",
    description: "Partner with us to reach millions of students",
    icon: <Users className="w-4 h-4 text-[#5B48D9]" />,
    type: "section",
  },
  {
    title: "Contact Us",
    path: "/contact",
    description: "Get in touch with our team",
    icon: <MessageSquare className="w-4 h-4 text-[#5B48D9]" />,
    type: "section",
  },
  {
    title: "FAQ",
    path: "/faq",
    description: "Frequently asked questions about Uless",
    icon: <FileText className="w-4 h-4 text-[#5B48D9]" />,
    type: "section",
  },
  {
    title: "About Us",
    path: "/about",
    description: "Learn more about Uless and our mission",
    icon: <Info className="w-4 h-4 text-[#5B48D9]" />,
    type: "section",
  },
  {
    title: "Careers",
    path: "/careers",
    description: "Join our team at Uless",
    icon: <Users className="w-4 h-4 text-[#5B48D9]" />,
    type: "section",
  },
  {
    title: "Help Center",
    path: "/help",
    description: "Find answers to common questions",
    icon: <HelpCircle className="w-4 h-4 text-[#5B48D9]" />,
    type: "section",
  },
  {
    title: "Student Verification",
    path: "/student-verification",
    description: "Verify your student status",
    icon: <FileText className="w-4 h-4 text-[#5B48D9]" />,
    type: "section",
  },
]

// FAQ content for search
const faqContent = [
  {
    title: "What is Uless?",
    path: "/faq#what-is-uless",
    description: "Learn about our student discount platform",
    icon: <FileText className="w-4 h-4 text-[#5B48D9]" />,
    type: "faq",
  },
  {
    title: "How do I verify my student status?",
    path: "/faq#student-verification",
    description: "Steps to verify your student status",
    icon: <FileText className="w-4 h-4 text-[#5B48D9]" />,
    type: "faq",
  },
  {
    title: "How do I redeem a deal?",
    path: "/faq#redeem-deal",
    description: "Learn how to redeem student discounts",
    icon: <FileText className="w-4 h-4 text-[#5B48D9]" />,
    type: "faq",
  },
]

export function SearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  const allDeals = useDeals()

  // Handle search query change
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const lowerQuery = searchQuery.toLowerCase()

      // Search in brands
      const brandResults = mockBrands
        .filter((brand) => brand.name && brand.name.toLowerCase().includes(lowerQuery))
        .slice(0, 3)
        .map((brand) => ({
          ...brand,
          resultType: "brand",
        }))

      // Search in deals
      const dealResults = allDeals
        .filter(
          (deal) =>
            (deal.title && deal.title.toLowerCase().includes(lowerQuery)) ||
            (deal.description && deal.description.toLowerCase().includes(lowerQuery)) ||
            (deal.brand && deal.brand.toLowerCase().includes(lowerQuery)),
        )
        .slice(0, 3)
        .map((deal) => ({
          ...deal,
          resultType: "deal",
        }))

      // Search in categories
      const categoryResults = mockCategories
        .filter((category) => category.name && category.name.toLowerCase().includes(lowerQuery))
        .slice(0, 2)
        .map((category) => ({
          ...category,
          resultType: "category",
        }))

      // Search in website sections
      const sectionResults = websiteSections
        .filter(
          (section) =>
            (section.title && section.title.toLowerCase().includes(lowerQuery)) ||
            (section.description && section.description.toLowerCase().includes(lowerQuery)),
        )
        .slice(0, 3)
        .map((section) => ({
          ...section,
          resultType: "section",
        }))

      // Search in FAQ content
      const faqResults = faqContent
        .filter(
          (faq) =>
            (faq.title && faq.title.toLowerCase().includes(lowerQuery)) ||
            (faq.description && faq.description.toLowerCase().includes(lowerQuery)),
        )
        .slice(0, 2)
        .map((faq) => ({
          ...faq,
          resultType: "faq",
        }))

      // Combine all results
      setSearchResults([...brandResults, ...dealResults, ...categoryResults, ...sectionResults, ...faqResults])
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [searchQuery, allDeals])

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const updatedSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updatedSearches)
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowResults(false)
      window.scrollTo(0, 0)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowResults(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleResultClick = () => {
    setShowResults(false)
    setSearchQuery("")
    window.scrollTo(0, 0)
  }

  const handleFocus = () => {
    if (searchQuery.trim().length > 1) {
      setShowResults(true)
    } else if (recentSearches.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
    window.scrollTo(0, 0)
  }

  // Render different result types
  const renderSearchResult = (result: any, index: number) => {
    if (result.resultType === "brand") {
      return (
        <Link
          key={`brand-${result.id}-${index}`}
          href={`/brands/${result.slug}`}
          className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
          onClick={handleResultClick}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
            {result.logo ? (
              <Image
                src={result.logo || "/placeholder.svg"}
                alt={result.name || "Brand"}
                width={40}
                height={40}
                className="object-contain p-1"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#5B48D9]">
                {result.name && result.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="font-medium text-sm">{result.name || "Unknown Brand"}</p>
            <p className="text-xs text-gray-500">Brand {result.category ? ` • ${result.category}` : ""}</p>
          </div>
        </Link>
      )
    } else if (result.resultType === "deal") {
      return (
        <Link
          key={`deal-${result.id}-${index}`}
          href={`/deals/${result.id}`}
          className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
          onClick={handleResultClick}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
            <div className="w-full h-full flex items-center justify-center text-[#5B48D9]">
              {result.title && result.title.charAt(0)}
            </div>
          </div>
          <div className="ml-3">
            <p className="font-medium text-sm">{result.title || "Unknown Deal"}</p>
            <p className="text-xs text-gray-500">
              Deal • {result.brand || "Unknown"} {result.discount ? ` • ${result.discount}` : ""}
            </p>
          </div>
        </Link>
      )
    } else if (result.resultType === "category") {
      return (
        <Link
          key={`category-${result.id}-${index}`}
          href={`/categories/${result.slug}`}
          className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
          onClick={handleResultClick}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#5B48D9]/10 flex-shrink-0 flex items-center justify-center">
            <span className="text-lg text-[#5B48D9]">
              {result.icon && typeof result.icon === "string" ? result.icon.charAt(0).toUpperCase() : "C"}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium text-sm">{result.name || "Unknown Category"}</p>
            <p className="text-xs text-gray-500">Category</p>
          </div>
        </Link>
      )
    } else if (result.resultType === "section" || result.resultType === "faq") {
      return (
        <Link
          key={`${result.resultType}-${index}`}
          href={result.path}
          className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
          onClick={handleResultClick}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#5B48D9]/10 flex-shrink-0 flex items-center justify-center">
            {result.icon}
          </div>
          <div className="ml-3">
            <p className="font-medium text-sm">{result.title || "Unknown"}</p>
            <p className="text-xs text-gray-500">
              {result.resultType === "section" ? "Page" : "FAQ"} • {result.description || ""}
            </p>
          </div>
        </Link>
      )
    }

    return null
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex w-full">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for brands, deals, or help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            className="h-12 rounded-l-xl border-r-0 pr-10"
            key="search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <Button type="submit" className="h-12 px-4 rounded-l-none rounded-r-xl bg-[#5B48D9] hover:bg-[#4a3ac0]">
          <Search className="w-5 h-5" />
        </Button>
      </form>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-sm text-gray-500">Search Results</h3>
              <button onClick={clearSearch} className="text-xs text-[#5B48D9] hover:underline">
                Clear
              </button>
            </div>

            <div className="space-y-3">{searchResults.map((result, index) => renderSearchResult(result, index))}</div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <Button onClick={handleSearch} variant="link" className="w-full text-[#5B48D9] justify-center">
                View all results
                <Search className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Searches & Suggestions */}
      {showSuggestions && recentSearches.length > 0 && !showResults && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-4">
            <h3 className="font-medium text-sm text-gray-500 mb-2">Recent Searches</h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div
                  key={`recent-${index}-${search}`}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => handleSuggestionClick(search)}
                >
                  <div className="flex items-center">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{search}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
