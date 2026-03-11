"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { mockBrands } from "@/data/mock-data"
import { ArrowLeft, ExternalLink, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DoorDashAboutPage() {
  const router = useRouter()
  const [brand, setBrand] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const [imageError, setImageError] = useState(false)
  const slug = "doordash"

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Safely scroll to top on page load
  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      window.scrollTo(0, 0)
    }
  }, [isMounted])

  useEffect(() => {
    if (!isMounted) return

    // Find the brand by slug
    const foundBrand = mockBrands.find((b) => b.slug === slug) || null
    setBrand(foundBrand)
  }, [isMounted])

  const handleImageError = () => {
    setImageError(true)
  }

  if (!brand) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Brand not found</h1>
          <p className="mb-6 text-gray-600">The brand you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/brands")}>Browse All Brands</Button>
        </div>
      </div>
    )
  }

  // Brand-specific content for DoorDash
  const additionalContent = {
    history:
      "DoorDash was founded in 2013 by Stanford students Tony Xu, Stanley Tang, Andy Fang, and Evan Moore. The company began as PaloAltoDelivery.com, a small delivery service in Palo Alto, California. After seeing initial success, they rebranded to DoorDash and expanded to other cities. The company has since grown to become one of the largest food delivery services in North America.",
    mission:
      "DoorDash's mission is to grow and empower local economies. By connecting customers with their favorite local businesses, empowering merchants with tools and technology, and providing earnings opportunities for Dashers (delivery drivers), DoorDash aims to create a marketplace that serves all its stakeholders.",
    impact:
      "DoorDash has revolutionized food delivery by making it accessible in areas that were previously underserved. The platform has helped local restaurants reach new customers and increase sales, especially during the COVID-19 pandemic. DoorDash has also created flexible earning opportunities for millions of Dashers worldwide.",
    studentProgram:
      "DoorDash offers students 50% off DashPass, their premium membership program. With Student DashPass, students get $0 delivery fees on eligible orders, reduced service fees, and exclusive offers from local and national restaurants. To qualify, students must verify their student status using their university email address.",
  }

  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* Brand Hero Section */}
      <section className="relative py-16 bg-[#f8faff]">
        <div className="container px-4 mx-auto">
          <Link href={`/brands/${slug}`} className="inline-flex items-center mb-6 text-[#5B48D9] hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {brand.name} Deals
          </Link>

          <div className="flex items-center mb-8">
            <div className="relative w-20 h-20 mr-6 overflow-hidden rounded-xl shadow-md bg-white p-2 flex items-center justify-center">
              {!imageError ? (
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={60}
                  height={60}
                  className="object-contain"
                  priority
                  onError={handleImageError}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-lg font-bold text-[#5B48D9]">
                  {brand.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#333]">About {brand.name}</h1>
              <p className="text-[#666]">{brand.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand About Content */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="p-6 mb-8 rounded-xl bg-white shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-[#333]">Company Overview</h2>
                <p className="mb-6 text-[#666] leading-relaxed">{brand.description}</p>

                <h3 className="mb-3 text-xl font-bold text-[#333]">History</h3>
                <p className="mb-6 text-[#666] leading-relaxed">{additionalContent.history}</p>

                <h3 className="mb-3 text-xl font-bold text-[#333]">Mission</h3>
                <p className="mb-6 text-[#666] leading-relaxed">{additionalContent.mission}</p>

                <h3 className="mb-3 text-xl font-bold text-[#333]">Impact</h3>
                <p className="text-[#666] leading-relaxed">{additionalContent.impact}</p>
              </div>

              <div className="p-6 rounded-xl bg-white shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-[#333]">Student Program Details</h2>
                <p className="mb-6 text-[#666] leading-relaxed">{additionalContent.studentProgram}</p>

                <h3 className="mb-3 text-xl font-bold text-[#333]">Student Benefits</h3>
                <ul className="space-y-3 mb-6">
                  {brand.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 mr-2 text-[#5B48D9] shrink-0 mt-0.5" />
                      <span className="text-[#666]">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <Button
                    className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white"
                    onClick={() => window.open("https://www.doordash.com/student-discount/", "_blank")}
                  >
                    Visit Official Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#5B48D9] text-[#5B48D9] hover:bg-[#5B48D9]/10"
                    onClick={() => router.push(`/brands/${slug}`)}
                  >
                    View Student Discount
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-24">
                <div className="p-6 mb-6 rounded-xl bg-white shadow-sm">
                  <h2 className="mb-4 text-xl font-bold text-[#333]">Quick Facts</h2>
                  <div className="space-y-4">
                    {brand.parentCompany && (
                      <div>
                        <p className="text-sm text-[#666]">Parent Company</p>
                        <p className="font-medium text-[#333]">{brand.parentCompany}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-[#666]">Category</p>
                      <p className="font-medium text-[#333]">{brand.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Student Discount</p>
                      <p className="font-medium text-[#333]">{brand.discount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Regular Price</p>
                      <p className="font-medium text-[#333]">{brand.originalPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Student Price</p>
                      <p className="font-medium text-[#5B48D9]">{brand.studentPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="relative w-full h-60 overflow-hidden rounded-xl shadow-sm">
                  {brand.productImage ? (
                    <Image
                      src={brand.productImage || "/placeholder.svg"}
                      alt={`${brand.name} product`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                      <span className="text-xl text-gray-500">{brand.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
