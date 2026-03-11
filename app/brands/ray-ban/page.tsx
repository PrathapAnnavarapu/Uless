import { PageSEO } from "@/components/seo/page-seo"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockBrands, mockDeals } from "@/data/mock-data"
import { Star, Check, Award, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function RayBanBrandPage() {
  const brand = mockBrands.find((b) => b.slug === "ray-ban")
  const deals = mockDeals.filter((d) => d.brand === "ray-ban")

  if (!brand) {
    return <div>Brand not found</div>
  }

  const productSchema = {
    name: "Ray-Ban Student Discount",
    description: "Premium student discount on iconic eyewear with free case and cleaning cloth",
    brand: {
      "@type": "Brand",
      name: "Ray-Ban",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Uless",
      },
      discount: "50% off for students",
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
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1156",
      bestRating: "5",
    },
  }

  return (
    <main className="flex-1 py-12 bg-gradient-to-b from-white to-gray-50">
      <PageSEO
        title={`${brand.name} Student Discount - 50% Off Premium Eyewear`}
        description="Exclusive Ray-Ban student discount - Get 50% off iconic sunglasses and optical frames with verified student status. Free case and cleaning cloth included."
      />

      <SchemaMarkup type="Product" data={productSchema} />

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
              <Award className="w-3 h-3 mr-1" /> PREMIUM PARTNER
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{brand.name} Student Discount</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(brand.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {brand.rating} ({brand.reviewCount} reviews)
              </span>
            </div>
            <p className="mb-6 text-xl text-gray-600">
              Get exclusive 50% off on iconic Ray-Ban sunglasses and optical frames with verified student status.
            </p>
            <div className="p-4 mb-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">What's Included:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>50% discount on all Ray-Ban products</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>Free authentic Ray-Ban case with every purchase</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>Complimentary microfiber cleaning cloth</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>Free shipping on all orders</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>1-year warranty on all products</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-[#5B48D9] hover:bg-[#4A3ABA]">
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
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Ray-Ban Student Discount"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4 flex items-center px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-full">
              50% OFF
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
              <h2 className="mb-4 text-2xl font-bold">About Ray-Ban Student Discount</h2>
              <p className="mb-4 text-gray-700">
                Ray-Ban offers an exclusive student discount program that allows verified students to save 50% on their
                iconic eyewear collection. From classic Wayfarers to trendy Aviators, students can enjoy premium quality
                sunglasses and optical frames at half the regular price.
              </p>
              <p className="mb-4 text-gray-700">
                Founded in 1936, Ray-Ban has been a symbol of style and quality for decades. Their student program aims
                to make their premium products more accessible to students while maintaining the same high standards of
                craftsmanship and design that have made the brand famous worldwide.
              </p>
              <h3 className="mt-6 mb-3 text-xl font-semibold">Popular Ray-Ban Collections</h3>
              <ul className="pl-5 mb-6 space-y-2 list-disc text-gray-700">
                <li>Wayfarer - Iconic square frames with a timeless design</li>
                <li>Aviator - Classic teardrop shape originally designed for pilots</li>
                <li>Clubmaster - Retro browline style with a sophisticated look</li>
                <li>Round - Circular frames inspired by vintage designs</li>
                <li>Justin - Modern rectangular frames with a bold look</li>
              </ul>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="mb-2 text-lg font-medium">Why Choose Ray-Ban?</h4>
                <p className="text-gray-700">
                  Ray-Ban sunglasses are made with high-quality materials, including premium lenses that provide 100% UV
                  protection. Their frames are designed to be durable and comfortable for all-day wear, making them a
                  worthwhile investment for students looking for eyewear that will last.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="how-it-works" className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-2xl font-bold">How to Get Your Ray-Ban Student Discount</h2>
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Step 1: Verify Your Student Status</h3>
                <p className="mb-2 text-gray-700">
                  To access the Ray-Ban student discount, you'll need to verify your student status through Uless. This
                  can be done using your .edu email address or by uploading your student ID.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Verify Now
                </Button>
              </div>
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Step 2: Get Your Discount Code</h3>
                <p className="mb-2 text-gray-700">
                  Once verified, you'll receive a unique discount code that can be used on the Ray-Ban website. This
                  code will automatically apply the 50% student discount to your order.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Step 3: Shop Ray-Ban Products</h3>
                <p className="mb-2 text-gray-700">
                  Browse the Ray-Ban website and select the sunglasses or optical frames you want to purchase. Add them
                  to your cart and proceed to checkout.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-semibold">Step 4: Apply Your Discount</h3>
                <p className="mb-2 text-gray-700">
                  Enter your student discount code in the promo code field during checkout. The 50% discount will be
                  applied to your order, and you'll receive free shipping along with your authentic Ray-Ban case and
                  cleaning cloth.
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
                      I couldn't believe I could get authentic Ray-Bans for half price! I ordered the classic Wayfarer
                      and they arrived quickly with a nice case and cleaning cloth. The quality is amazing and they look
                      exactly like the ones in the store. This student discount is incredible!
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
