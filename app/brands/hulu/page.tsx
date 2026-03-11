"use client"

import { PageSEO } from "@/components/seo/page-seo"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockBrands, mockDeals } from "@/data/mock-data"
import { Star, Check, Award, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HuluBrandPage() {
  const brand = mockBrands.find((b) => b.slug === "hulu")
  const deals = mockDeals.filter((d) => d.brand === "Hulu")

  if (!brand) {
    return <div>Brand not found</div>
  }

  const productSchema = {
    name: "Hulu Student Plan",
    description: "Hulu streaming service with ads for students at 75% off regular price",
    brand: {
      "@type": "Brand",
      name: "Hulu",
    },
    offers: {
      "@type": "Offer",
      price: "1.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Uless",
      },
      discount: "75% off for students (normally $7.99/month)",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "4.8",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Student Review",
      },
      reviewBody: "Great value for students!",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1523",
      bestRating: "5",
    },
  }

  return (
    <main className="flex-1 py-12 bg-gradient-to-b from-white to-gray-50">
      <PageSEO
        title={`${brand.name} Student Plan - 75% Off Streaming Service`}
        description="Get Hulu for just $1.99/month with verified student status. Stream thousands of shows, movies, and Hulu Originals at a 75% discount off the regular price."
      />

      <SchemaMarkup type="Product" data={productSchema} />

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-green-800 bg-green-100 rounded-full">
              <Award className="w-3 h-3 mr-1" /> PREMIUM PARTNER
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{brand.name} Student Plan</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 4.8 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">4.8 (1,523 reviews)</span>
            </div>
            <p className="mb-6 text-xl text-gray-600">
              Get Hulu (With Ads) for just $1.99/month with verified student status - a 75% discount off the regular
              price.
            </p>
            <div className="p-4 mb-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">What's Included:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>Full Hulu streaming library with thousands of shows and movies</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>New episodes of current shows the day after they air</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>Exclusive Hulu Original content</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>Stream on your favorite devices</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>Create up to 6 user profiles</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-[#1CE783] hover:bg-[#19d176] text-black">
                Get This Deal
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
            <div className="flex items-center mt-6 text-sm text-gray-500">
              <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
              <span>Verified student status required</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl shadow-xl aspect-square">
            <Image src="/images/brands/hulu-cover.png" alt="Hulu Student Plan" fill className="object-cover" priority />
            <div className="absolute top-4 right-4 flex items-center px-3 py-1 text-sm font-bold text-white bg-green-500 rounded-full">
              75% OFF
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-2xl font-bold">About Hulu Student Plan</h2>
              <p className="mb-4 text-gray-700">
                The Hulu Student Plan offers verified college and university students access to Hulu's streaming library
                at a significantly discounted rate of just $1.99 per month - 75% off the regular price of $7.99 per
                month.
              </p>
              <p className="mb-4 text-gray-700">
                With Hulu, students can stream thousands of TV shows, movies, and Hulu Originals on their favorite
                devices. Whether you're looking to take a study break with your favorite show or unwind with friends
                watching the latest hit series, Hulu provides affordable entertainment for your college years.
              </p>
              <h3 className="mt-6 mb-3 text-xl font-semibold">Premium Features</h3>
              <ul className="pl-5 mb-6 space-y-2 list-disc text-gray-700">
                <li>Stream thousands of shows and movies</li>
                <li>Watch on your laptop, TV, phone, or tablet</li>
                <li>Access new episodes the day after they air</li>
                <li>Enjoy exclusive Hulu Original content</li>
                <li>Create up to 6 user profiles</li>
              </ul>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="mb-2 text-lg font-medium">Perfect for College Life</h4>
                <p className="text-gray-700">
                  The Hulu Student Plan is designed to fit into a student's budget while providing premium
                  entertainment. Take a break from studying with your favorite shows, host watch parties with friends,
                  or catch up on the latest episodes of current TV series - all at a price that won't break your budget.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="how-it-works" className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-2xl font-bold">How to Get Hulu Student Discount</h2>
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Step 1: Verify Your Student Status</h3>
                <p className="mb-2 text-gray-700">
                  To access the Hulu Student Plan, you'll need to verify your student status through SheerID. This can
                  be done using your .edu email address or by uploading your student ID.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Verify Now
                </Button>
              </div>
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Step 2: Create or Sign in to Your Hulu Account</h3>
                <p className="mb-2 text-gray-700">
                  Once verified, you'll need to create a Hulu account or sign in to your existing account. You'll be
                  guided through this process after verification.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Step 3: Choose the Student Plan</h3>
                <p className="mb-2 text-gray-700">
                  Select the Hulu (With Ads) Student Plan for $1.99/month. You'll need to provide payment information,
                  but you'll only be charged the student rate.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Student Reviews</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-600">5.0</span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">Best Student Deal Ever!</h3>
                    <p className="mb-4 text-gray-700">
                      I couldn't believe I could get Hulu for just $1.99 a month! I watch all my favorite shows and
                      movies without breaking the bank.
                    </p>
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 overflow-hidden bg-gray-200 rounded-full">
                        <div className="flex items-center justify-center w-full h-full text-gray-500">J</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Jessica M.</p>
                        <p className="text-xs text-gray-500">UCLA Student</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-600">5.0</span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">Smooth Verification Process</h3>
                    <p className="mb-4 text-gray-700">
                      The verification process was super easy and I got my discount code instantly. I saved over $100 on
                      my Ray-Ban Aviators! The free shipping was fast and the sunglasses came in a premium case. Highly
                      recommend taking advantage of this student deal.
                    </p>
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 overflow-hidden bg-gray-200 rounded-full">
                        <div className="flex items-center justify-center w-full h-full text-gray-500">T</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Tyler K.</p>
                        <p className="text-xs text-gray-500">NYU Student</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-600">4.0</span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">Great Value for Premium Eyewear</h3>
                    <p className="mb-4 text-gray-700">
                      I was skeptical at first, but this discount is legitimate. The Ray-Bans I received are authentic
                      and exactly what I wanted. The only reason I'm giving 4 stars instead of 5 is because the shipping
                      took a bit longer than expected, but the product quality is excellent.
                    </p>
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 overflow-hidden bg-gray-200 rounded-full">
                        <div className="flex items-center justify-center w-full h-full text-gray-500">A</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Alex P.</p>
                        <p className="text-xs text-gray-500">University of Michigan Student</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline">View All Reviews</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold text-center">Related Student Deals</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {deals.map((deal) => (
              <Link href={`/deals/${deal.id}`} key={deal.id}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                  <div className="relative h-48">
                    <Image
                      src={deal.image || "/placeholder.svg?height=200&width=400"}
                      alt={deal.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 flex items-center px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-full">
                      {deal.discount}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-2 text-lg font-semibold">{deal.title}</h3>
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">{deal.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(deal.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-xs text-gray-600">({deal.reviewCount})</span>
                      </div>
                      <span className="text-sm font-medium text-[#5B48D9]">Get Deal</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
