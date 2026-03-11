"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchBar } from "@/components/search-bar"
import { DealCard } from "@/components/deal-card"
import { BrandCard } from "@/components/brand-card"
import { mockDeals, mockBrands, mockCategories } from "@/data/mock-data"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { HelpCircle, Users, MessageSquare, FileText, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  {
    title: "Is Uless free to use?",
    path: "/faq#is-uless-free",
    description: "Information about Uless pricing",
    icon: <FileText className="w-4 h-4 text-[#5B48D9]" />,
    type: "faq",
  },
  {
    title: "How do I update my profile information?",
    path: "/faq#update-profile",
    description: "Steps to update your account details",
    icon: <FileText className="w-4 h-4 text-[#5B48D9]" />,
    type: "faq",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [activeTab, setActiveTab] = useState("all")

  const [filteredDeals, setFilteredDeals] = useState<typeof mockDeals>([])
  const [filteredBrands, setFilteredBrands] = useState<typeof mockBrands>([])
  const [filteredCategories, setFilteredCategories] = useState<typeof mockCategories>([])
  const [filteredSections, setFilteredSections] = useState<ContentSection[]>([])
  const [filteredFaqs, setFilteredFaqs] = useState<ContentSection[]>([])

  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase()

      // Filter deals
      const deals = mockDeals.filter(
        (deal) =>
          (deal.title && deal.title.toLowerCase().includes(lowerQuery)) ||
          (deal.description && deal.description.toLowerCase().includes(lowerQuery)) ||
          (deal.brand && deal.brand.toLowerCase().includes(lowerQuery)) ||
          (deal.category && deal.category.toLowerCase().includes(lowerQuery)),
      )
      setFilteredDeals(deals)

      // Filter brands
      const brands = mockBrands.filter(
        (brand) =>
          (brand.name && brand.name.toLowerCase().includes(lowerQuery)) ||
          (brand.description && brand.description.toLowerCase().includes(lowerQuery)) ||
          (brand.category && brand.category.toLowerCase().includes(lowerQuery)) ||
          (brand.tagline && brand.tagline.toLowerCase().includes(lowerQuery)),
      )
      setFilteredBrands(brands)

      // Filter categories
      const categories = mockCategories.filter(
        (category) =>
          (category.name && category.name.toLowerCase().includes(lowerQuery)) ||
          (category.description && category.description.toLowerCase().includes(lowerQuery)),
      )
      setFilteredCategories(categories)

      // Filter website sections
      const sections = websiteSections.filter(
        (section) =>
          (section.title && section.title.toLowerCase().includes(lowerQuery)) ||
          (section.description && section.description.toLowerCase().includes(lowerQuery)),
      )
      setFilteredSections(sections)

      // Filter FAQs
      const faqs = faqContent.filter(
        (faq) =>
          (faq.title && faq.title.toLowerCase().includes(lowerQuery)) ||
          (faq.description && faq.description.toLowerCase().includes(lowerQuery)),
      )
      setFilteredFaqs(faqs)
    } else {
      setFilteredDeals([])
      setFilteredBrands([])
      setFilteredCategories([])
      setFilteredSections([])
      setFilteredFaqs([])
    }
  }, [query])

  const totalResults =
    filteredDeals.length +
    filteredBrands.length +
    filteredCategories.length +
    filteredSections.length +
    filteredFaqs.length

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f8faff]">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-center text-[#333] md:text-3xl">
          {query ? `Search Results for "${query}"` : "Search for Student Deals"}
        </h1>

        <div className="mb-8">
          <SearchBar />
        </div>

        {query ? (
          <>
            {totalResults > 0 ? (
              <>
                <p className="mb-6 text-center text-[#666]">
                  Found {totalResults} result{totalResults !== 1 ? "s" : ""} for "{query}"
                </p>

                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-5">
                    <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
                    <TabsTrigger value="brands">Brands ({filteredBrands.length})</TabsTrigger>
                    <TabsTrigger value="deals">Deals ({filteredDeals.length})</TabsTrigger>
                    <TabsTrigger value="pages">Pages ({filteredSections.length})</TabsTrigger>
                    <TabsTrigger value="faqs">FAQs ({filteredFaqs.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-8">
                    {filteredCategories.length > 0 && (
                      <div className="p-6 bg-white rounded-xl shadow-sm">
                        <h2 className="mb-4 text-xl font-bold text-[#333]">Categories</h2>
                        <div className="flex flex-wrap gap-2">
                          {filteredCategories.map((category) => (
                            <Link key={category.id} href={`/categories/${category.slug}`}>
                              <Badge className="px-3 py-1.5 bg-[#5B48D9]/10 text-[#5B48D9] hover:bg-[#5B48D9]/20 cursor-pointer">
                                {category.name || "Unknown Category"}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredSections.length > 0 && (
                      <div>
                        <h2 className="mb-4 text-xl font-bold text-[#333]">Pages</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {filteredSections.map((section, index) => (
                            <Link key={`section-${index}`} href={section.path} className="block">
                              <Card className="h-full transition-all hover:shadow-md">
                                <CardHeader className="flex flex-row items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-[#5B48D9]/10 flex items-center justify-center">
                                    {section.icon}
                                  </div>
                                  <CardTitle className="text-lg">{section.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-gray-600">{section.description}</p>
                                </CardContent>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredFaqs.length > 0 && (
                      <div>
                        <h2 className="mb-4 text-xl font-bold text-[#333]">FAQs</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {filteredFaqs.slice(0, 3).map((faq, index) => (
                            <Link key={`faq-${index}`} href={faq.path} className="block">
                              <Card className="h-full transition-all hover:shadow-md">
                                <CardHeader className="flex flex-row items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-[#5B48D9]/10 flex items-center justify-center">
                                    {faq.icon}
                                  </div>
                                  <CardTitle className="text-lg">{faq.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-gray-600">{faq.description}</p>
                                </CardContent>
                              </Card>
                            </Link>
                          ))}
                        </div>
                        {filteredFaqs.length > 3 && (
                          <div className="mt-4 text-center">
                            <Link href="#" onClick={() => setActiveTab("faqs")} className="text-[#5B48D9] font-medium">
                              View all {filteredFaqs.length} FAQs
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

                    {filteredBrands.length > 0 && (
                      <div>
                        <h2 className="mb-4 text-xl font-bold text-[#333]">Brands</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {filteredBrands.slice(0, 3).map((brand) => (
                            <BrandCard key={brand.id} brand={brand} />
                          ))}
                        </div>
                        {filteredBrands.length > 3 && (
                          <div className="mt-4 text-center">
                            <Link
                              href="#"
                              onClick={() => setActiveTab("brands")}
                              className="text-[#5B48D9] font-medium"
                            >
                              View all {filteredBrands.length} brands
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

                    {filteredDeals.length > 0 && (
                      <div>
                        <h2 className="mb-4 text-xl font-bold text-[#333]">Deals</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {filteredDeals.slice(0, 3).map((deal) => (
                            <DealCard key={deal.id} deal={deal} />
                          ))}
                        </div>
                        {filteredDeals.length > 3 && (
                          <div className="mt-4 text-center">
                            <Link href="#" onClick={() => setActiveTab("deals")} className="text-[#5B48D9] font-medium">
                              View all {filteredDeals.length} deals
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="brands">
                    {filteredBrands.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredBrands.map((brand) => (
                          <BrandCard key={brand.id} brand={brand} />
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-white rounded-xl shadow-sm">
                        <p className="text-[#666]">No brands found matching "{query}"</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="deals">
                    {filteredDeals.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredDeals.map((deal) => (
                          <DealCard key={deal.id} deal={deal} />
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-white rounded-xl shadow-sm">
                        <p className="text-[#666]">No deals found matching "{query}"</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="pages">
                    {filteredSections.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredSections.map((section, index) => (
                          <Link key={`section-${index}`} href={section.path} className="block">
                            <Card className="h-full transition-all hover:shadow-md">
                              <CardHeader className="flex flex-row items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#5B48D9]/10 flex items-center justify-center">
                                  {section.icon}
                                </div>
                                <CardTitle className="text-lg">{section.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-600">{section.description}</p>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-white rounded-xl shadow-sm">
                        <p className="text-[#666]">No pages found matching "{query}"</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="faqs">
                    {filteredFaqs.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredFaqs.map((faq, index) => (
                          <Link key={`faq-${index}`} href={faq.path} className="block">
                            <Card className="h-full transition-all hover:shadow-md">
                              <CardHeader className="flex flex-row items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#5B48D9]/10 flex items-center justify-center">
                                  {faq.icon}
                                </div>
                                <CardTitle className="text-lg">{faq.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-600">{faq.description}</p>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-white rounded-xl shadow-sm">
                        <p className="text-[#666]">No FAQs found matching "{query}"</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="p-8 text-center bg-white rounded-xl shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-[#333]">No results found</h2>
                <p className="text-[#666]">We couldn't find any matches for "{query}". Try a different search term.</p>
              </div>
            )}
          </>
        ) : (
          <div className="p-8 text-center bg-white rounded-xl shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[#333]">Search for Student Deals</h2>
            <p className="text-[#666]">
              Enter a brand name, category, keyword, or help topic to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
