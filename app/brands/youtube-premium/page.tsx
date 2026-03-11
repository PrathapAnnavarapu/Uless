"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { mockBrands, mockDeals } from "@/data/mock-data"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, Calendar, Check, ExternalLink, Heart, Info, Share2, Star, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DealCard } from "@/components/deal-card"

export default function YouTubePremiumPage() {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  const { isAuthenticated, profile } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  // Find the brand by slug from mock data
  const brand = mockBrands.find((b) => b.slug === "youtube-premium") || {
    id: "youtube-premium",
    name: "YouTube Premium",
    slug: "youtube-premium",
    logo: "/placeholder.svg?height=100&width=100&text=YouTube%20Premium",
    category: "Music & Entertainment",
    discount: "50% OFF",
    originalPrice: "$11.99/month",
    studentPrice: "$6.99/month",
    description:
      "YouTube Premium offers ad-free videos, background play, and YouTube Music Premium with exclusive student discounts.",
    tagline: "Ad-free videos and music with student savings",
    benefits: [
      "Ad-free viewing across all devices",
      "Background play on mobile devices",
      "Download videos for offline viewing",
      "Access to YouTube Music Premium",
      "YouTube Originals content",
    ],
    validUntil: "While enrolled as a student",
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Find related deals from this brand
  const relatedDeals = mockDeals.filter((deal) => deal.brand === brand.name).slice(0, 3)

  // Find similar brands in the same category
  const similarBrands = mockBrands.filter((b) => b.category === brand.category && b.id !== brand.id).slice(0, 4)

  const handleSave = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to save brands")
      router.push("/auth")
      return
    }

    setIsSaved(!isSaved)
    toast.success(isSaved ? "Removed from saved brands" : "Added to saved brands")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${brand.name} Student Discount`,
          text: `Check out this student discount from ${brand.name}`,
          url: window.location.href,
        })
        .catch(() => {
          navigator.clipboard.writeText(window.location.href)
          toast.success("Link copied to clipboard")
        })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  const handleRedeem = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in with your student email to access this discount")
      router.push("/auth")
      return
    }

    if (!profile.isVerified) {
      toast.error("This discount requires a verified student email (.edu)")
      return
    }

    window.open("https://www.youtube.com/premium/student", "_blank")
    toast.success(`Redirecting to ${brand.name} student discount`)
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f8faff]">
      {/* Sticky CTA that appears on scroll */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 transform ${
          isScrolled ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container px-4 py-3 mx-auto bg-white border-t shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 p-1 mr-3 bg-white rounded-lg shadow">
                <div className="relative w-full h-full">
                  <Image
                    src={brand.logo || `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(brand.name)}`}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">{brand.name}</h3>
                <p className="text-xs text-[#5B48D9]">{brand.discount}</p>
              </div>
            </div>
            <Button type="button" className="px-6 text-white bg-[#5B48D9] hover:bg-[#4a3ac0]" onClick={handleRedeem}>
              Get Discount
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 mx-auto">
        <Button type="button" variant="ghost" className="p-0 mb-6" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Brands
        </Button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="overflow-hidden bg-white rounded-2xl shadow-sm">
              {/* Hero section */}
              <div className="relative w-full h-64 md:h-96">
                <Image
                  src="/placeholder.svg?height=400&width=800&text=YouTube%20Premium"
                  alt={brand.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-20 h-20 p-2 mr-4 bg-white rounded-lg shadow-lg">
                      <div className="relative w-full h-full">
                        <Image
                          src={
                            brand.logo || `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(brand.name)}`
                          }
                          alt={brand.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <Badge className="mb-2 bg-[#5B48D9]">{brand.category}</Badge>
                      <h1 className="text-2xl font-bold text-white md:text-4xl">{brand.name}</h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="outline" className="px-3 py-1 text-lg bg-[#f8faff] text-[#5B48D9] border-[#5B48D9]">
                    {brand.discount}
                  </Badge>

                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleSave}
                      className={isSaved ? "text-[#ff4b4b]" : "text-[#666]"}
                    >
                      <Heart className="w-5 h-5" fill={isSaved ? "#ff4b4b" : "none"} />
                    </Button>

                    <Button type="button" variant="ghost" size="icon" onClick={handleShare}>
                      <Share2 className="w-5 h-5 text-[#666]" />
                    </Button>
                  </div>
                </div>

                <h2 className="mb-4 text-xl font-semibold text-[#333] md:text-2xl">{brand.tagline}</h2>
                <p className="mb-6 text-[#666] leading-relaxed">{brand.description}</p>

                <Tabs defaultValue="details" className="mb-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Discount Details</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    <TabsTrigger value="how-to">How to Redeem</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="p-4 mt-4 rounded-xl bg-[#f8faff]">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <Tag className="w-10 h-10 p-2 mr-4 text-[#5B48D9] bg-[#f0f0ff] rounded-full" />
                        <div>
                          <div className="text-sm font-medium text-[#666]">Regular Price</div>
                          <div className="text-lg font-medium line-through text-[#666]">{brand.originalPrice}</div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <Star className="w-10 h-10 p-2 mr-4 text-[#5B48D9] bg-[#f0f0ff] rounded-full" />
                        <div>
                          <div className="text-sm font-medium text-[#5B48D9]">Student Price</div>
                          <div className="text-lg font-bold text-[#5B48D9]">{brand.studentPrice}</div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <Calendar className="w-10 h-10 p-2 mr-4 text-[#5B48D9] bg-[#f0f0ff] rounded-full" />
                        <div>
                          <div className="text-sm font-medium text-[#666]">Valid Until</div>
                          <div className="text-base font-medium text-[#333]">{brand.validUntil || "No Expiration"}</div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <Info className="w-10 h-10 p-2 mr-4 text-[#5B48D9] bg-[#f0f0ff] rounded-full" />
                        <div>
                          <div className="text-sm font-medium text-[#666]">Verification Required</div>
                          <div className="text-base font-medium text-[#333]">Student Status</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="benefits" className="mt-4">
                    <ul className="space-y-3">
                      {brand.benefits?.map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-start p-3 transition-colors bg-white rounded-lg shadow-sm hover:bg-[#f8faff]"
                        >
                          <Check className="w-5 h-5 mr-3 text-[#5B48D9] shrink-0" />
                          <span className="text-[#666]">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="how-to" className="mt-4">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <ol className="space-y-3 list-decimal list-inside text-[#666]">
                        <li className="p-2">Sign in to your Uless account</li>
                        <li className="p-2">Verify your student status if not already verified</li>
                        <li className="p-2">Click on "Get Student Discount" button below</li>
                        <li className="p-2">Follow the instructions on {brand.name}'s website</li>
                        <li className="p-2">Enjoy your student discount!</li>
                      </ol>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button
                  type="button"
                  className="px-8 h-12 text-white rounded-xl bg-[#5B48D9] hover:bg-[#4a3ac0]"
                  onClick={handleRedeem}
                >
                  Get Student Discount
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Related deals */}
            {relatedDeals.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">Related Deals from {brand.name}</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {relatedDeals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              </div>
            )}

            {/* Similar brands */}
            {similarBrands.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">Similar Brands in {brand.category}</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {similarBrands.map((similarBrand) => (
                    <Link
                      key={similarBrand.id}
                      href={`/brands/$similarBrand.slug`}
                      className="flex flex-col items-center p-4 transition-all bg-white rounded-lg shadow-sm hover:shadow-md"
                    >
                      <div className="relative w-16 h-16 mb-3 overflow-hidden bg-white rounded-lg">
                        <Image
                          src={
                            similarBrand.logo ||
                            `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(similarBrand.name) || "/placeholder.svg"}`
                          }
                          alt={similarBrand.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <h3 className="mb-1 text-sm font-medium text-center">{similarBrand.name}</h3>
                      <span className="text-xs text-center text-[#5B48D9]">{similarBrand.discount}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="p-6 mb-6 bg-white rounded-2xl shadow-sm">
                <h3 className="mb-4 text-lg font-medium">About {brand.name}</h3>
                {brand.parentCompany && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-[#666]">Parent Company</div>
                    <div className="text-[#333]">{brand.parentCompany || "Google LLC"}</div>
                  </div>
                )}
                <div className="mb-4">
                  <div className="text-sm font-medium text-[#666]">Category</div>
                  <div className="text-[#333]">{brand.category}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-medium text-[#666]">Discount</div>
                  <div className="text-[#333]">{brand.discount}</div>
                </div>
                {/* No verification banner here */}
              </div>

              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="mb-4 text-lg font-medium">Verification Process</h3>
                <div className="p-4 mb-4 rounded-lg bg-[#f8faff]">
                  <p className="text-sm text-[#666]">
                    {brand.name} verifies student status through their official platform. You'll need to provide:
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-[#666]">
                    <li>• Valid .edu email address</li>
                    <li>• Student ID card</li>
                    <li>• Proof of enrollment</li>
                  </ul>
                </div>
                <p className="text-sm text-[#666]">
                  Verification is typically instant but may take up to 24 hours in some cases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
