"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  ArrowLeft,
  Heart,
  Share2,
  ExternalLink,
  Check,
  Calendar,
  Info,
  Copy,
  Eye,
  EyeOff,
  Smartphone,
  Fuel,
  ShoppingBag,
  CreditCard,
  Gift,
} from "lucide-react"
import { mockBrands, mockDeals } from "@/data/mock-data"
import { useAuth } from "@/contexts/auth-context"
import { DealCard } from "@/components/deal-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ensureBrandImages } from "@/utils/ensure-brand-images"
import Link from "next/link"

export default function UpsideBrandPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [isSaved, setIsSaved] = useState(false)
  const { isAuthenticated, openAuthModal, profile } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showPromoCode, setShowPromoCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Find the Upside brand from mock data
  const foundBrand = mockBrands.find((b) => b.slug === "upside")
  const brand = foundBrand ? ensureBrandImages(foundBrand) : null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!brand) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="mb-4 text-2xl font-bold">Brand not found</h1>
        <Button onClick={() => router.push("/brands")}>View All Brands</Button>
      </div>
    )
  }

  // Find related deals from this brand
  const relatedDeals = mockDeals.filter((deal) => deal.brand === brand.name).slice(0, 3)

  // Find similar brands in the same category
  const similarBrands = mockBrands.filter((b) => b.category === brand.category && b.id !== brand.id).slice(0, 4)

  const handleSave = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to save brands")
      openAuthModal(pathname)
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
      openAuthModal(pathname)
      return
    }

    if (!profile.isVerified) {
      toast.error("This discount requires a verified student email (.edu)")
      return
    }

    window.open(brand.link || "https://www.upside.com/", "_blank")
    toast.success(`Redirecting to ${brand.name} website`)
  }

  const togglePromoCode = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to view the promo code")
      openAuthModal(pathname)
      return
    }

    setShowPromoCode(!showPromoCode)
  }

  const copyPromoCode = () => {
    if (!brand.promoCode) return

    navigator.clipboard.writeText(brand.promoCode)
    setCopied(true)
    toast.success("Promo code copied to clipboard!")

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const copyReferralLink = () => {
    if (!brand.referralLink) return

    navigator.clipboard.writeText(brand.referralLink)
    setCopiedLink(true)
    toast.success("Referral link copied to clipboard!")

    setTimeout(() => {
      setCopiedLink(false)
    }, 2000)
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
        <Link href="/brands" className="inline-block mb-6">
          <Button type="button" variant="ghost" className="p-0 flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Brands
          </Button>
        </Link>

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

                {/* Enhanced Premium Promo Code Section */}
                {brand.promoCode && (
                  <div className="mb-8 overflow-hidden border rounded-xl bg-gradient-to-br from-white via-[#f8faff] to-[#f0f4ff] border-[#5B48D9]/20">
                    <div className="px-6 py-4 border-b border-[#5B48D9]/10 bg-[#5B48D9]/5 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-[#333] flex items-center">
                        <Gift className="w-5 h-5 mr-2 text-[#5B48D9]" />
                        Exclusive Student Offer
                      </h3>
                      <Badge variant="outline" className="bg-white text-[#5B48D9] border-[#5B48D9]/20">
                        Student Exclusive
                      </Badge>
                    </div>

                    <div className="p-6">
                      <div className="mb-5">
                        <div className="flex items-center mb-3">
                          <div className="w-6 h-6 mr-3 rounded-full bg-[#5B48D9] flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-white">1</span>
                          </div>
                          <p className="text-sm font-medium text-[#333]">Use this promo code when signing up</p>
                        </div>

                        <div className="relative">
                          <div className="flex items-center p-5 bg-white border rounded-lg shadow-sm border-[#5B48D9]/20">
                            <div className="flex-1">
                              {isAuthenticated ? (
                                <div className="flex items-center justify-between">
                                  <div className="font-mono text-xl font-medium tracking-wide text-[#333]">
                                    {showPromoCode ? brand.promoCode : "••••••"}
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={togglePromoCode}
                                    className="ml-2 text-[#5B48D9] hover:bg-[#5B48D9]/10"
                                  >
                                    {showPromoCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    <span className="ml-1 text-xs">{showPromoCode ? "Hide" : "Show"}</span>
                                  </Button>
                                </div>
                              ) : (
                                <div className="font-mono text-xl font-medium tracking-wide text-[#333]">••••••</div>
                              )}
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={copyPromoCode}
                              disabled={!isAuthenticated || !showPromoCode}
                              className={`ml-2 transition-all h-10 px-4 ${
                                copied
                                  ? "bg-green-50 text-green-600 border-green-200"
                                  : "border-[#5B48D9] text-[#5B48D9] hover:bg-[#5B48D9]/10"
                              }`}
                            >
                              {copied ? (
                                <>
                                  <Check className="w-4 h-4 mr-2" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 mr-2" /> Copy Code
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {isAuthenticated && showPromoCode && brand.referralLink && (
                        <div className="mt-6">
                          <div className="flex items-center mb-3">
                            <div className="w-6 h-6 mr-3 rounded-full bg-[#5B48D9] flex items-center justify-center shadow-sm">
                              <span className="text-xs font-bold text-white">2</span>
                            </div>
                            <p className="text-sm font-medium text-[#333]">Or use this referral link</p>
                          </div>

                          <div className="p-5 text-sm bg-white border rounded-lg shadow-sm border-[#5B48D9]/20">
                            <div className="flex items-center justify-between">
                              <div className="overflow-hidden font-mono text-sm text-[#333] truncate max-w-[70%]">
                                {brand.referralLink}
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={copyReferralLink}
                                className={`ml-2 shrink-0 transition-all h-10 px-4 ${
                                  copiedLink
                                    ? "bg-green-50 text-green-600 border-green-200"
                                    : "border-[#5B48D9] text-[#5B48D9] hover:bg-[#5B48D9]/10"
                                }`}
                              >
                                {copiedLink ? (
                                  <>
                                    <Check className="w-4 h-4 mr-2" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4 mr-2" /> Copy Link
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {!isAuthenticated && (
                        <div className="mt-5 p-5 bg-gradient-to-r from-[#5B48D9]/10 to-[#5B48D9]/5 rounded-lg border border-[#5B48D9]/20">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#5B48D9]/20 flex items-center justify-center mr-4">
                              <Info className="w-5 h-5 text-[#5B48D9]" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-[#333] mb-1">Student Verification Required</h4>
                              <p className="text-sm text-[#555] mb-3">
                                Sign in with your student account to reveal your exclusive promo code and get cash back
                                on gas, groceries, and more.
                              </p>
                              <Button
                                type="button"
                                className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white shadow-sm"
                                onClick={() => openAuthModal(pathname)}
                              >
                                Sign in to Reveal Code
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-5 pt-4 border-t border-[#5B48D9]/10">
                        <p className="text-xs text-[#666] italic">
                          *This exclusive promo code gives you an additional 5% cash back on your first month of
                          purchases through the Upside app.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Tabs defaultValue="details" className="mb-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Discount Details</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    <TabsTrigger value="how-to">How to Redeem</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="p-4 mt-4 rounded-xl bg-[#f8faff]">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <Fuel className="w-10 h-10 p-2 mr-4 text-[#5B48D9] bg-[#f0f0ff] rounded-full" />
                        <div>
                          <div className="text-sm font-medium text-[#666]">Gas Savings</div>
                          <div className="text-lg font-medium text-[#333]">Up to 25¢/gal</div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <ShoppingBag className="w-10 h-10 p-2 mr-4 text-[#5B48D9] bg-[#f0f0ff] rounded-full" />
                        <div>
                          <div className="text-sm font-medium text-[#666]">Grocery Cashback</div>
                          <div className="text-lg font-medium text-[#333]">Up to 10%</div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <Calendar className="w-10 h-10 p-2 mr-4 text-[#5B48D9] bg-[#f0f0ff] rounded-full" />
                        <div>
                          <div className="text-sm font-medium text-[#666]">Valid Until</div>
                          <div className="text-base font-medium text-[#333]">Ongoing</div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                        <CreditCard className="w-10 h-10 p-2 mr-4 text-[#5B48D9] bg-[#f0f0ff] rounded-full" />
                        <div>
                          <div className="text-sm font-medium text-[#666]">Payout Method</div>
                          <div className="text-base font-medium text-[#333]">Direct to Bank/PayPal</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="benefits" className="mt-4">
                    <ul className="space-y-3">
                      <li className="flex items-start p-3 transition-colors bg-white rounded-lg shadow-sm hover:bg-[#f8faff]">
                        <Check className="w-5 h-5 mr-3 text-[#5B48D9] shrink-0" />
                        <span className="text-[#666]">Cash back on gas purchases at participating stations</span>
                      </li>
                      <li className="flex items-start p-3 transition-colors bg-white rounded-lg shadow-sm hover:bg-[#f8faff]">
                        <Check className="w-5 h-5 mr-3 text-[#5B48D9] shrink-0" />
                        <span className="text-[#666]">Savings on groceries and restaurant purchases</span>
                      </li>
                      <li className="flex items-start p-3 transition-colors bg-white rounded-lg shadow-sm hover:bg-[#f8faff]">
                        <Check className="w-5 h-5 mr-3 text-[#5B48D9] shrink-0" />
                        <span className="text-[#666]">No minimum cash out amount for students</span>
                      </li>
                      <li className="flex items-start p-3 transition-colors bg-white rounded-lg shadow-sm hover:bg-[#f8faff]">
                        <Check className="w-5 h-5 mr-3 text-[#5B48D9] shrink-0" />
                        <span className="text-[#666]">Exclusive student bonus offers throughout the year</span>
                      </li>
                      <li className="flex items-start p-3 transition-colors bg-white rounded-lg shadow-sm hover:bg-[#f8faff]">
                        <Check className="w-5 h-5 mr-3 text-[#5B48D9] shrink-0" />
                        <span className="text-[#666]">Easy-to-use mobile app with location services</span>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="how-to" className="mt-4">
                    <div className="p-5 bg-white rounded-lg shadow-sm">
                      <ol className="space-y-4">
                        <li className="flex">
                          <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#5B48D9] text-white font-medium text-sm mr-3">
                            1
                          </div>
                          <div className="text-[#666]">
                            <span className="font-medium text-[#333]">Sign in</span> to your Uless account to reveal
                            your exclusive promo code
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#5B48D9] text-white font-medium text-sm mr-3">
                            2
                          </div>
                          <div className="text-[#666]">
                            <span className="font-medium text-[#333]">Download</span> the Upside app from the App Store
                            or Google Play
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#5B48D9] text-white font-medium text-sm mr-3">
                            3
                          </div>
                          <div className="text-[#666]">
                            <span className="font-medium text-[#333]">Create an account</span> and enter your promo code{" "}
                            <span className="font-mono">
                              {isAuthenticated && showPromoCode ? brand.promoCode : "ZHWXB"}
                            </span>{" "}
                            during signup
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#5B48D9] text-white font-medium text-sm mr-3">
                            4
                          </div>
                          <div className="text-[#666]">
                            <span className="font-medium text-[#333]">Claim offers</span> at participating gas stations,
                            grocery stores, and restaurants
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#5B48D9] text-white font-medium text-sm mr-3">
                            5
                          </div>
                          <div className="text-[#666]">
                            <span className="font-medium text-[#333]">Upload receipts</span> through the app to earn
                            your cash back
                          </div>
                        </li>
                      </ol>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    className="px-8 h-12 text-white rounded-xl bg-[#5B48D9] hover:bg-[#4a3ac0] flex-1 shadow-sm"
                    onClick={handleRedeem}
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    Download Upside App
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="px-8 h-12 rounded-xl border-[#5B48D9] text-[#5B48D9] hover:bg-[#5B48D9]/5 flex-1"
                    onClick={() => window.open("https://www.upside.com/student", "_blank")}
                  >
                    Learn More
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
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
                      onClick={() => openAuthModal(pathname)}
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

              {/* App Features */}
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Upside App Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-8 h-8 mr-3 rounded-full bg-[#5B48D9]/10 flex items-center justify-center">
                      <Fuel className="w-4 h-4 text-[#5B48D9]" />
                    </div>
                    <span className="text-sm text-[#666]">Find gas stations with cashback</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 mr-3 rounded-full bg-[#5B48D9]/10 flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 text-[#5B48D9]" />
                    </div>
                    <span className="text-sm text-[#666]">Grocery and restaurant offers</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 mr-3 rounded-full bg-[#5B48D9]/10 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-[#5B48D9]" />
                    </div>
                    <span className="text-sm text-[#666]">Easy cashout to bank or PayPal</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 mr-3 rounded-full bg-[#5B48D9]/10 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-[#5B48D9]" />
                    </div>
                    <span className="text-sm text-[#666]">Available on iOS and Android</span>
                  </li>
                </ul>
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
