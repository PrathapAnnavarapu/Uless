import Link from "next/link"
import { PageSEO } from "@/components/seo/page-seo"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Check, Award, ShieldCheck, Zap } from "lucide-react"
import Image from "next/image"
import { API_BASE } from "@/lib/backend"

export default async function CanvaBrandPage() {
  // pull real data from backend instead of mocks
  const [brandsRes, dealsRes] = await Promise.all([
    fetch(`${API_BASE}/api/brands`),
    fetch(`${API_BASE}/api/deals`),
  ])
  const brandsData = await brandsRes.json()
  const dealsData = await dealsRes.json()

  const brand = brandsData.find((b: any) => b.slug === "canva")
  const deals = dealsData.filter((d: any) => d.brand === "Canva")

  if (!brand) {
    return <div>Brand not found</div>
  }

  // construct schema from first deal (if available)
  const representative = deals[0] || null
  const productSchema = representative
    ? {
        name: representative.title,
        description: representative.description,
        brand: { "@type": "Brand", name: representative.brand },
        offers: {
          "@type": "Offer",
          price: representative.studentPrice || representative.originalPrice || "",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: "Uless" },
          discount: representative.discount,
        },
      }
    : {
        name: brand.name,
        description: `${brand.name} student deal`,
        "@type": "Product",
      }

  return (
    <main className="flex-1 py-12 bg-gradient-to-b from-white to-gray-50">
      <PageSEO
        title={`${brand.name} Pro Student - Free Premium Design Platform`}
        description="Get Canva Pro free for students with verified status. Access premium templates, background remover, Magic Resize, and 100GB storage for your designs."
      />

      <SchemaMarkup type="Product" data={productSchema} />

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-purple-800 bg-purple-100 rounded-full">
              <Award className="w-3 h-3 mr-1" /> PREMIUM PARTNER
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{brand.name} Pro Student</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 4.9 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">4.9 (1,872 reviews)</span>
            </div>
            <p className="mb-6 text-xl text-gray-600">
              Get Canva Pro completely free with verified student status. Access premium templates, features, and 100GB
              storage.
            </p>
            <div className="p-4 mb-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">What's Included:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>Full access to Canva Pro (normally $12.99/month)</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>100+ million premium templates, photos, and graphics</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>Background Remover tool for professional-looking designs</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>Magic Resize to adapt designs for any platform</span>
                </li>
                <li className="flex items-start">
                  <Check className="flex-shrink-0 w-5 h-5 mr-2 text-green-500" />
                  <span>100GB cloud storage for all your designs</span>
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
              src="/placeholder.svg?height=600&width=600&text=Canva%20Pro%20Student"
              alt="Canva Pro Student"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4 flex items-center px-3 py-1 text-sm font-bold text-white bg-purple-500 rounded-full">
              FREE
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
              <h2 className="mb-4 text-2xl font-bold">About Canva Pro Student</h2>
              <p className="mb-4 text-gray-700">
                Canva Pro Student offers verified students free access to Canva's premium design platform. Normally
                priced at $12.99 per month, Canva Pro provides everything you need to create stunning designs for your
                academic projects, social media, presentations, and more.
              </p>
              <p className="mb-4 text-gray-700">
                With Canva Pro, students can access over 100 million premium templates, photos, graphics, and fonts. The
                platform is designed to be user-friendly, allowing anyone to create professional-looking designs without
                prior design experience.
              </p>
              <h3 className="mt-6 mb-3 text-xl font-semibold">Premium Features</h3>
              <ul className="pl-5 mb-6 space-y-2 list-disc text-gray-700">
                <li>Background Remover - Remove backgrounds from images with one click</li>
                <li>Magic Resize - Instantly resize designs for different platforms</li>
                <li>Brand Kit - Store your brand colors, logos, and fonts</li>
                <li>100GB Storage - Store all your designs and assets in the cloud</li>
                <li>Premium Content - Access millions of premium photos, templates, and elements</li>
              </ul>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="mb-2 text-lg font-medium">Perfect for Student Projects</h4>
                <p className="text-gray-700">
                  Canva Pro is an essential tool for students across all disciplines. Create professional presentations,
                  research posters, social media graphics, resumes, infographics, and more. The intuitive interface
                  makes it easy to produce high-quality designs that will impress your professors and peers.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="how-it-works" className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-2xl font-bold">How to Get Canva Pro for Free</h2>
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Step 1: Verify Your Student Status</h3>
                <p className="mb-2 text-gray-700">
                  To access Canva Pro for free, you'll need to verify your student status through Uless. This can be
                  done using your .edu email address or by uploading your student ID.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Verify Now
                </Button>
              </div>
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Step 2: Create or Sign in to Your Canva Account</h3>
                <p className="mb-2 text-gray-700">
                  Once verified, you'll need to create a Canva account or sign in to your existing account. You'll be
                  guided through this process after verification.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold">Step 3: Activate Your Free Canva Pro</h3>
                <p className="mb-2 text-gray-700">
                  After signing in, your account will be automatically upgraded to Canva Pro. You'll have immediate
                  access to all premium features and content.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-semibold">Step 4: Start Creating!</h3>
                <p className="mb-2 text-gray-700">
                  That's it! You now have full access to Canva Pro. Start creating amazing designs for your academic
                  projects, social media, presentations, and more.
                </p>
                <div className="flex items-center p-4 mt-4 bg-purple-50 rounded-lg">
                  <Zap className="flex-shrink-0 w-6 h-6 mr-3 text-purple-500" />
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Pro Tip:</span> Check out Canva's education templates section for
                    presentation templates, assignment layouts, and research poster designs specifically created for
                    students.
                  </p>
                </div>
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
                    <h3 className="mb-2 text-lg font-semibold">Game-Changer for My Projects!</h3>
                    <p className="mb-4 text-gray-700">
                      Getting Canva Pro for free as a student has completely transformed my academic work. The
                      background remover tool alone has saved me hours of work, and the premium templates make my
                      presentations stand out. I use it for everything from research posters to social media graphics
                      for student organizations.
                    </p>
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 overflow-hidden bg-gray-200 rounded-full">
                        <div className="flex items-center justify-center w-full h-full text-gray-500">M</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Maria L.</p>
                        <p className="text-xs text-gray-500">Stanford University Student</p>
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
                    <h3 className="mb-2 text-lg font-semibold">Essential Tool for Students</h3>
                    <p className="mb-4 text-gray-700">
                      I can't believe this is free for students! The Magic Resize feature is incredible for adapting my
                      designs for different platforms. I've used Canva Pro for creating my resume, presentation slides,
                      and even designing flyers for campus events. The verification process was super easy too.
                    </p>
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 overflow-hidden bg-gray-200 rounded-full">
                        <div className="flex items-center justify-center w-full h-full text-gray-500">D</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">David R.</p>
                        <p className="text-xs text-gray-500">University of Texas Student</p>
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
                    <h3 className="mb-2 text-lg font-semibold">Perfect for Non-Designers</h3>
                    <p className="mb-4 text-gray-700">
                      As a science major with zero design skills, Canva Pro has been a lifesaver. I've created
                      professional-looking research posters and presentations that have impressed my professors. The
                      templates are so easy to use, and having access to premium stock photos has elevated my work.
                      Highly recommend!
                    </p>
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 overflow-hidden bg-gray-200 rounded-full">
                        <div className="flex items-center justify-center w-full h-full text-gray-500">S</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Sarah K.</p>
                        <p className="text-xs text-gray-500">Boston University Student</p>
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
                    <div className="absolute top-4 right-4 flex items-center px-3 py-1 text-sm font-bold text-white bg-purple-500 rounded-full">
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
