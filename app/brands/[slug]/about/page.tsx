"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { mockBrands } from "@/data/mock-data"
import { ArrowLeft, ExternalLink, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { ensureBrandImages } from "@/utils/ensure-brand-images"

interface BrandAboutPageProps {
  params: { slug: string }
}

export default function BrandAboutPage({ params }: BrandAboutPageProps) {
  const router = useRouter()
  const [brand, setBrand] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { isAuthenticated, profile, openAuthModal } = useAuth()

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
  }, [params.slug, isMounted])

  useEffect(() => {
    if (!isMounted) return

    // Find the brand by slug and ensure it has images
    const foundBrand = mockBrands.find((b) => b.slug === params.slug) || null
    setBrand(foundBrand ? ensureBrandImages(foundBrand) : null)
  }, [params.slug, isMounted])

  const handleImageError = () => {
    setImageError(true)
  }

  const handleRedeem = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in with your student email to access this discount")
      openAuthModal()
      return
    }

    if (!profile.isVerified) {
      toast.error("This discount requires a verified student email (.edu)")
      return
    }

    window.open(brand.link || `https://${brand.slug}.com`, "_blank")
    toast.success(`Redirecting to ${brand.name} student discount`)
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

  // Brand-specific additional content based on the brand slug
  const getBrandAdditionalContent = (slug) => {
    const contentMap = {
      spotify: {
        history:
          "Spotify was founded in 2006 by Daniel Ek and Martin Lorentzon in Stockholm, Sweden. The company was created as a response to the growing problem of music piracy, with the goal of providing a better, legal alternative to music services that were available at the time. Spotify officially launched in 2008 as an invite-only service in select European countries before expanding globally.",
        mission:
          "Spotify's mission is to unlock the potential of human creativity by giving a million creative artists the opportunity to live off their art and billions of fans the opportunity to enjoy and be inspired by it.",
        impact:
          "Spotify has revolutionized the music industry by pioneering the music streaming subscription model. With over 456 million monthly active users including 195 million subscribers across 183 markets, Spotify has become the world's most popular audio streaming subscription service.",
        studentProgram:
          "Spotify Premium Student offers all the benefits of Premium at a 50% discount. The plan includes ad-free music listening, offline downloads, and access to millions of songs and podcasts. In some markets, the student plan also includes access to Hulu and SHOWTIME.",
      },
      "amazon-prime": {
        history:
          "Amazon Prime was launched in 2005 as a membership service offering free two-day shipping on eligible purchases. Over the years, it has expanded to include streaming media, exclusive shopping deals, and many other benefits. Amazon Prime Student was introduced as a specialized offering for college students with the same benefits at a reduced price.",
        mission:
          "Amazon's mission is to be Earth's most customer-centric company, where customers can find and discover anything they might want to buy online, and endeavors to offer its customers the lowest possible prices.",
        impact:
          "Amazon Prime has transformed online shopping expectations with its fast, free shipping model. Prime Student specifically helps college students access essential services and products at affordable prices, with over 200 million Prime members worldwide.",
        studentProgram:
          "Amazon Prime Student offers a 6-month free trial followed by a 50% discount on Prime membership. Benefits include free shipping, Prime Video, Prime Music, exclusive student deals, and unlimited photo storage. Students can also get special discounts on textbooks and college essentials.",
      },
      microsoft: {
        history:
          "Microsoft was founded by Bill Gates and Paul Allen in 1975. The company began by developing and selling BASIC interpreters for the Altair 8800 microcomputer. Microsoft rose to dominate the personal computer operating system market with MS-DOS in the mid-1980s, followed by Microsoft Windows. The company has since diversified into cloud computing, software development, and hardware.",
        mission: "Microsoft's mission is to empower every person and every organization on the planet to achieve more.",
        impact:
          "Microsoft has transformed how people work, learn, and communicate through its software and services. Microsoft's education initiatives have equipped millions of students and educators with essential digital tools and skills.",
        studentProgram:
          "Microsoft offers students free access to Microsoft 365 Education, which includes Word, Excel, PowerPoint, OneNote, and Microsoft Teams. Students also receive 1TB of OneDrive cloud storage and can access special education pricing on Surface devices and other Microsoft hardware.",
      },
      github: {
        history:
          "GitHub was founded by Tom Preston-Werner, Chris Wanstrath, and PJ Hyett in 2008. It was created to facilitate collaborative software development using Git, a distributed version control system. GitHub was acquired by Microsoft in 2018 for $7.5 billion but continues to operate independently.",
        mission: "GitHub's mission is to make it easy for developers to work together to solve challenging problems.",
        impact:
          "GitHub has become the world's largest code hosting platform with over 100 million developers using the service. It has transformed how software is built, enabling open-source collaboration on an unprecedented scale.",
        studentProgram:
          "GitHub Student Developer Pack provides students with free access to GitHub Pro and dozens of developer tools and services from GitHub partners. This includes access to GitHub Copilot, unlimited private repositories, and resources valued at thousands of dollars.",
      },
      "walmart-plus": {
        history:
          "Walmart+ was launched in September 2020 as Walmart's answer to Amazon Prime. It builds on Walmart's extensive physical retail network to offer a combination of online and in-store benefits. The service was designed to leverage Walmart's strengths in grocery and everyday essentials.",
        mission:
          "Walmart's mission is to save people money so they can live better. Walmart+ extends this mission by providing additional convenience and value to frequent Walmart shoppers.",
        impact:
          "Walmart+ has helped transform retail by combining digital convenience with Walmart's extensive physical store network, serving millions of customers with same-day delivery and other benefits.",
        studentProgram:
          "Walmart+ offers students a 50% discount on the monthly membership fee. Benefits include free same-day delivery from local stores, free shipping with no minimum purchase requirement, fuel discounts at participating stations, and mobile scan & go for in-store shopping.",
      },
      adobe: {
        history:
          "Adobe was founded in December 1982 by John Warnock and Charles Geschke, who established the company after leaving Xerox PARC to develop and sell the PostScript page description language. In 1987, Adobe introduced Illustrator, followed by Photoshop in 1989, revolutionizing digital graphic design and photo editing.",
        mission:
          "Adobe's mission is to change the world through digital experiences, helping everyone — from emerging artists to global brands — bring digital creations to life and deliver them to the right person at the right moment.",
        impact:
          "Adobe has transformed creative industries by providing the tools that power digital media creation worldwide. Their software is the industry standard for graphic design, video editing, web development, photography, and more.",
        studentProgram:
          "Adobe offers students and educators a 60% discount on Creative Cloud, which includes over 20 apps like Photoshop, Illustrator, and Premiere Pro. The student plan provides access to all Creative Cloud apps, 100GB of cloud storage, Adobe Portfolio, Adobe Fonts, and the latest software updates.",
      },
      apple: {
        history:
          "Apple was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in April 1976. The company began with the Apple I personal computer and rose to prominence with the Macintosh in 1984. Under Jobs' leadership after his return in 1997, Apple introduced revolutionary products like the iPod, iPhone, and iPad that transformed multiple industries.",
        mission:
          "Apple's mission is to bring the best user experience to customers through innovative hardware, software, and services.",
        impact:
          "Apple has revolutionized multiple industries including personal computing, music, mobile phones, and tablets. Their products have set the standard for design and user experience, influencing how people interact with technology worldwide.",
        studentProgram:
          "Apple Education Pricing offers students discounts on Mac computers, iPads, AppleCare+, and select accessories. Students can save up to $200 on Mac and up to $50 on iPad. Apple also offers seasonal promotions like free AirPods with eligible purchases and provides the Apple Music student plan at a reduced monthly rate.",
      },
      "best-buy": {
        history:
          "Best Buy was founded as Sound of Music in 1966 by Richard M. Schulze and James Wheeler in Saint Paul, Minnesota. The company was rebranded as Best Buy in 1983 and expanded to become a leading consumer electronics retailer in North America.",
        mission:
          "Best Buy's purpose is to enrich lives through technology, helping customers learn about and choose products that meet their needs.",
        impact:
          "Best Buy has made technology more accessible to consumers through its extensive retail network and knowledgeable staff. Their Geek Squad service has helped millions of customers set up and troubleshoot their technology.",
        studentProgram:
          "Best Buy offers exclusive student deals on laptops, tablets, small appliances, and other tech essentials. Students can sign up for the Best Buy Student Deals program to receive coupon offers throughout the year, with significant savings during back-to-school season. The program also includes special pricing on Geek Squad services.",
      },
      "under-armour": {
        history:
          "Under Armour was founded in 1996 by Kevin Plank, a former University of Maryland football player. The company began in Plank's grandmother's basement, where he developed the first moisture-wicking shirt made of synthetic fabric to keep athletes cool and dry during workouts.",
        mission:
          "Under Armour's mission is to make all athletes better through passion, design, and the relentless pursuit of innovation.",
        impact:
          "Under Armour has revolutionized athletic apparel with its performance-enhancing fabrics and designs. The brand has expanded from its initial moisture-wicking shirts to a full range of sportswear, footwear, and accessories used by athletes at all levels.",
        studentProgram:
          "Under Armour offers students a 10% discount on all purchases with verification through ID.me or SheerID. The discount applies to athletic wear, shoes, and accessories both online and in Under Armour stores. Students can also participate in the UA rewards program to earn additional benefits.",
      },
      costco: {
        history:
          "Costco began operations in 1983 in Seattle, Washington, but its roots trace back to Price Club, which was founded in 1976. The two companies merged in 1993 to form Price/Costco, eventually becoming Costco Wholesale Corporation. The company pioneered the warehouse club model, offering members access to bulk products at discounted prices.",
        mission:
          "Costco's mission is to continually provide members with quality goods and services at the lowest possible prices while being respectful of their employees, suppliers, and the environment.",
        impact:
          "Costco has transformed retail with its membership warehouse model, offering significant savings on bulk purchases. The company is known for treating employees well with higher wages and benefits compared to other retailers.",
        studentProgram:
          "Costco offers college students a special membership deal that includes a $20 Costco Shop Card for new members. Students pay the standard $60 annual fee for a Gold Star membership but receive the shop card as a bonus. The membership provides access to wholesale pricing on groceries, electronics, dorm essentials, and more.",
      },
    }

    return (
      contentMap[slug] || {
        history: `${brand.name} has established itself as a leader in the ${brand.category} industry, providing quality products and services to customers worldwide.`,
        mission: `${brand.name} is committed to delivering exceptional value and experiences to its customers.`,
        impact: `${brand.name} has made significant contributions to the ${brand.category} sector, innovating and setting standards in the industry.`,
        studentProgram: `${brand.name} offers special discounts and benefits for students, making their products and services more accessible to those pursuing education.`,
      }
    )
  }

  const additionalContent = getBrandAdditionalContent(params.slug)

  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* Brand Hero Section */}
      <section className="relative py-16 bg-[#f8faff]">
        <div className="container px-4 mx-auto">
          <Link
            href={`/brands/${params.slug}`}
            className="inline-flex items-center mb-6 text-[#5B48D9] hover:underline"
          >
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
                  <Button className="px-8 bg-[#5B48D9] hover:bg-[#4a3ac0] text-white" onClick={handleRedeem}>
                    Get Student Discount
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#5B48D9] text-[#5B48D9] hover:bg-[#5B48D9]/10"
                    onClick={() => router.push(`/brands/${params.slug}`)}
                  >
                    View Details
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
