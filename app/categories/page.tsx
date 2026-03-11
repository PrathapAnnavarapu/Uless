"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { mockCategories, mockBrands } from "@/data/mock-data"
import { PageSEO } from "@/components/seo/page-seo"
import { SchemaMarkup } from "@/components/seo/schema-markup"

export default function CategoriesPage() {
  const router = useRouter()

  // Count brands per category
  const brandCountByCategory = mockCategories.reduce(
    (acc, category) => {
      const count = mockBrands.filter((brand) => brand.category === category.name).length
      acc[category.name] = count
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f8faff]">
      <PageSEO pageName="categories" />

      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://uless.co",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Student Discount Categories",
              item: "https://uless.co/categories",
            },
          ],
        }}
      />

      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-[#333] md:text-4xl">Browse by Category</h1>
            <p className="max-w-2xl mx-auto text-lg text-[#666]">
              Explore student discounts across various categories. Find deals that match your interests and needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="block overflow-hidden transition-all rounded-xl hover:shadow-md group"
              >
                <Card className="h-full border-0 overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={
                        category.image ||
                        `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(category.name) || "/placeholder.svg"}`
                      }
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="mb-2 text-2xl font-bold text-white">{category.name}</h2>
                      <p className="text-white/80">{brandCountByCategory[category.name] || 0} brands</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-[#666] line-clamp-2">
                      {category.description || `Explore exclusive student discounts on ${category.name}.`}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
