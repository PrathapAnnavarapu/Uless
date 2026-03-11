"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Share2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageSEO } from "@/components/seo/page-seo"
import { SchemaMarkup } from "@/components/seo/schema-markup"

// Mock blog posts data - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    slug: "best-student-discounts-2023",
    title: "The Best Student Discounts in 2023: Ultimate Guide",
    description:
      "Discover the top student discounts available in 2023 across tech, entertainment, fashion, and more. Save big with these exclusive student deals.",
    content: `
      <p>As a student, managing your finances can be challenging. Fortunately, many companies offer exclusive student discounts to help you save money while still enjoying products and services you love.</p>
      
      <h2>Tech Discounts for Students</h2>
      <p>Technology is essential for modern education, but it doesn't have to break the bank. Here are some of the best tech discounts available to students:</p>
      <ul>
        <li><strong>Apple:</strong> Save up to 10% on MacBooks, iPads, and other Apple products through their Education Store.</li>
        <li><strong>Microsoft:</strong> Get Office 365 for free with your school email and save on Surface devices.</li>
        <li><strong>Adobe:</strong> Access the entire Creative Cloud suite at a 60% discount.</li>
        <li><strong>Samsung:</strong> Enjoy up to 30% off smartphones, tablets, and accessories.</li>
      </ul>
      
      <h2>Entertainment Discounts</h2>
      <p>All work and no play isn't good for anyone. These entertainment services offer special student pricing:</p>
      <ul>
        <li><strong>Spotify Premium:</strong> Get 50% off the regular subscription price.</li>
        <li><strong>YouTube Premium:</strong> Student plans at half the regular cost.</li>
        <li><strong>Amazon Prime:</strong> Six-month free trial followed by 50% off regular Prime membership.</li>
        <li><strong>Hulu:</strong> Enjoy the ad-supported plan for just $1.99/month.</li>
      </ul>
      
      <h2>Food and Delivery Discounts</h2>
      <p>Eating well on a student budget is possible with these discounts:</p>
      <ul>
        <li><strong>UberEats:</strong> Regular promotions and discounts specifically for students.</li>
        <li><strong>DoorDash:</strong> Free delivery on first orders and ongoing student promotions.</li>
        <li><strong>Chipotle:</strong> Free drinks with student ID at participating locations.</li>
        <li><strong>Burger King:</strong> 10% discount with valid student ID.</li>
      </ul>
      
      <h2>Fashion and Retail Discounts</h2>
      <p>Look your best without spending a fortune:</p>
      <ul>
        <li><strong>ASOS:</strong> 10% off all purchases year-round for students.</li>
        <li><strong>Nike:</strong> 10% discount on regular-priced items.</li>
        <li><strong>Adidas:</strong> 15-30% off with verified student status.</li>
        <li><strong>H&M:</strong> 15% discount for students on all purchases.</li>
      </ul>
      
      <h2>Travel and Transportation Discounts</h2>
      <p>Explore more for less with these travel discounts:</p>
      <ul>
        <li><strong>Amtrak:</strong> 15% discount on train tickets for students.</li>
        <li><strong>Greyhound:</strong> 10% off bus fares with student ID.</li>
        <li><strong>Hotels.com:</strong> Special rates and promotions for students.</li>
        <li><strong>Uber:</strong> Occasional student promotions and campus ride discounts.</li>
      </ul>
      
      <h2>How to Verify Your Student Status</h2>
      <p>Most companies require verification of your student status before you can access these discounts. Common verification methods include:</p>
      <ul>
        <li>Using your .edu email address</li>
        <li>Uploading your student ID</li>
        <li>Verifying through platforms like SheerID or UNiDAYS</li>
        <li>Providing enrollment documentation</li>
      </ul>
      
      <p>Remember to always check the terms and conditions of each discount, as some may have limitations or expiration dates. With Uless, you can easily find and access all these discounts in one place, saving you both time and money throughout your academic journey.</p>
    `,
    author: "Pavan Kumar Pudhota",
    date: "2023-09-15",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    tags: ["student discounts", "savings", "college life", "student deals"],
  },
]

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundPost = blogPosts.find((p) => p.slug === slug)
    setPost(foundPost)
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-12"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/blog">View All Blog Posts</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <PageSEO
        title={post.title}
        description={post.description}
        keywords={post.tags.join(", ")}
        image={post.image}
        url={`https://uless.co/blog/${post.slug}`}
        type="article"
      />

      <SchemaMarkup
        type="Product"
        data={{
          name: post.title,
          description: post.description,
          image: post.image,
          author: {
            "@type": "Person",
            name: post.author,
          },
          datePublished: post.date,
          publisher: {
            "@type": "Organization",
            name: "Uless",
            logo: {
              "@type": "ImageObject",
              url: "https://uless.co/logo.png",
            },
          },
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-[#5B48D9] hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }}></div>

          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
                <Tag className="h-4 w-4 text-gray-600" />
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.replace(/\s+/g, "-").toLowerCase()}`}
                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert("Link copied to clipboard!")
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
