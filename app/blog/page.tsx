"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
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
    author: "Pavan Kumar Pudhota",
    date: "2023-09-15",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    tags: ["student discounts", "savings", "college life", "student deals"],
  },
  {
    slug: "how-to-verify-student-status",
    title: "How to Verify Your Student Status for Exclusive Discounts",
    description:
      "Learn the different methods to verify your student status online and unlock hundreds of exclusive student discounts and deals.",
    author: "Pavan Kumar Pudhota",
    date: "2023-08-22",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    tags: ["student verification", "student ID", "student discounts"],
  },
  {
    slug: "save-money-college-student",
    title: "10 Ways to Save Money as a College Student in 2023",
    description:
      "Practical tips and strategies to help college students save money on everyday expenses, from textbooks to groceries and entertainment.",
    author: "Pavan Kumar Pudhota",
    date: "2023-07-18",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
    tags: ["money saving", "college budget", "student finance", "student tips"],
  },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="bg-[#f8faff]">
      <PageSEO
        title="Student Discount Blog | Money-Saving Tips for Students"
        description="Discover the latest student discount news, money-saving tips, and guides to maximize your student benefits and save on premium brands."
        keywords="student discount blog, student savings tips, college money saving, student deals blog"
        url="https://uless.co/blog"
      />

      <SchemaMarkup
        type="WebSite"
        data={{
          name: "Uless Student Discount Blog",
          url: "https://uless.co/blog",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://uless.co/blog?search={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Uless Student Discount Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the latest student discount news, money-saving tips, and guides to maximize your student
              benefits.
            </p>

            <div className="mt-8 max-w-md mx-auto">
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>

                      <h2 className="text-xl font-bold mb-2 group-hover:text-[#5B48D9] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>

                      <div className="flex items-center text-[#5B48D9] font-medium">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">No articles found</h2>
              <p className="text-gray-600 mb-6">Try adjusting your search query or browse our latest articles.</p>
              <Button onClick={() => setSearchQuery("")}>View All Articles</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
