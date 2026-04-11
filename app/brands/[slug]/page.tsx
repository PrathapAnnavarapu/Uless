"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { ArrowLeft, Heart, Share2, ExternalLink, Check, Star, Calendar, Tag, Info } from "lucide-react"
import { useDeals } from "@/hooks/use-deals"
import { useBrandsContext } from "@/contexts/brand-context"
import { useAuth } from "@/contexts/auth-context"
import { DealCard } from "@/components/deal-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Import the ensureBrandImages utility
import { ensureBrandImages } from "@/utils/ensure-brand-images"
import { PromoCodeReveal } from "@/components/promo-code-reveal"

export default function BrandDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  const { isAuthenticated, openAuthModal, profile } = useAuth()
  const { brands, loading: brandsLoading } = useBrandsContext()
  const [isScrolled, setIsScrolled] = useState(false)

  // Find the brand by slug from dynamic data and ensure it has images
  const foundBrand = brands.find((b) => b.slug === params.slug)
  const brand = foundBrand ? ensureBrandImages(foundBrand) : null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (brandsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="mb-4 text-2xl font-bold">Loading brand details...</h1>
      </div>
    )
  }

  if (!brand) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="mb-4 text-2xl font-bold">Brand not found</h1>
        <Button onClick={() => router.push("/brands")}>View All Brands</Button>
      </div>
    )
  }

  const allDeals = useDeals()
  // Find related deals from this brand
  const relatedDeals = allDeals.filter((deal) => deal.brand === brand.name).slice(0, 3)

  // Find similar brands in the same category
  const similarBrands = brands.filter((b) => b.category === brand.category && b.id !== brand.id).slice(0, 4)

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

    if (!profile?.isVerified) {
      toast.error("This discount requires a verified student email (.edu)")
      router.push("/student-verification")
      return
    }

    window.open(brand.link || "#", "_blank")
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
                    unoptimized={true} // Add this to prevent image optimization issues
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
                  src={
                    brand.productImage || `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(brand.name)}`
                  }
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
                          unoptimized={true} // Add this to prevent image optimization issues
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

                {/* Promo Code Section */}
                {brand.promoCode && <PromoCodeReveal promoCode={brand.promoCode} referralLink={brand.referralLink} />}

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
                      href={`/brands/${similarBrand.slug}`}
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
                          unoptimized={true} // Add this to prevent image optimization issues
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
            <div className="sticky top-24 space-y-6">
              {/* Verification status */}
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Student Verification</h3>
                {isAuthenticated ? (
                  profile.isVerified ? (
                    <div className="flex items-center p-3 mb-4 bg-green-50 rounded-lg">
                      <Check className="w-5 h-5 mr-3 text-green-500" />
                      <span className="text-sm text-green-700">Verified Student</span>
                    </div>
                  ) : (
                    <div className="p-3 mb-4 bg-yellow-50 rounded-lg">
                      <p className="mb-2 text-sm text-yellow-700">
                        You need to verify your student status to access this discount.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full text-[#5B48D9] border-[#5B48D9]"
                        onClick={() => router.push("/student-verification")}
                      >
                        Verify Now
                      </Button>
                    </div>
                  )
                ) : (
                  <div className="p-3 mb-4 bg-blue-50 rounded-lg">
                    <p className="mb-2 text-sm text-blue-700">Sign in to access student discounts.</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-[#5B48D9] border-[#5B48D9]"
                      onClick={openAuthModal}
                    >
                      Sign In
                    </Button>
                  </div>
                )}

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <h4 className="mb-3 text-sm font-medium">How verification works:</h4>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 text-[#5B48D9] shrink-0" />
                      <span>Sign in with your .edu email</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 text-[#5B48D9] shrink-0" />
                      <span>Verify through our secure system</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 mr-2 text-[#5B48D9] shrink-0" />
                      <span>Access all student discounts instantly</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Popular brands */}
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Popular Brands</h3>
                <div className="space-y-3">
                  {brands
                    .filter((b) => b.premium && b.id !== brand.id)
                    .slice(0, 5)
                    .map((popularBrand) => (
                      <Link
                        key={popularBrand.id}
                        href={`/brands/${popularBrand.slug}`}
                        className="flex items-center p-2 transition-colors rounded-lg hover:bg-[#f8faff]"
                      >
                        <div className="relative w-10 h-10 mr-3 overflow-hidden bg-white rounded-lg">
                          <Image
                            src={
                              popularBrand.logo ||
                              `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(popularBrand.name) || "/placeholder.svg"}`
                            }
                            alt={popularBrand.name}
                            fill
                            className="object-contain p-1"
                            unoptimized={true} // Add this to prevent image optimization issues
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{popularBrand.name}</h4>
                          <span className="text-xs text-[#5B48D9]">{popularBrand.discount}</span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Help section */}
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Need Help?</h3>
                <p className="mb-4 text-sm text-[#666]">
                  Having trouble with this discount or have questions about how it works?
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-[#5B48D9] border-[#5B48D9]"
                  onClick={() => router.push("/help")}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
