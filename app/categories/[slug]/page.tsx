"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BrandCard } from "@/components/brand-card"
import { useCategoryContext } from "@/contexts/category-context"
import { useBrandsContext } from "@/contexts/brand-context"
import { ArrowLeft } from "lucide-react"

interface CategoryPageProps {
  params: { slug: string }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter()
  const { categories, loading: categoriesLoading } = useCategoryContext()
  const { brands, loading: brandsLoading } = useBrandsContext()
  const [category, setCategory] = useState<any>(null)
  const [categoryBrands, setCategoryBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (categoriesLoading || brandsLoading) return

    // Find the category by slug
    const foundCategory = categories.find((c) => c.slug === params.slug)
    setCategory(foundCategory)

    if (foundCategory) {
      // Find brands in this category
      const brandsInCategory = brands.filter((brand) => brand.category === foundCategory.name)
      setCategoryBrands(brandsInCategory)
    }

    setLoading(false)
  }, [params.slug, categories, brands, categoriesLoading, brandsLoading])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-[#5B48D9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Category not found</h1>
          <p className="mb-6 text-gray-600">The category you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/categories")}>Browse All Categories</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f8faff]">
      {/* Hero Section */}
      <section className="relative py-16 bg-white">
        <div className="container px-4 mx-auto">
          <Button type="button" variant="ghost" className="p-0 mb-6" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h1 className="mb-4 text-3xl font-bold text-[#333] md:text-4xl">{category.name}</h1>
              <p className="mb-6 text-lg text-[#666]">
                {category.description || `Explore exclusive student discounts on ${category.name}.`}
              </p>
              <div className="flex items-center">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#5B48D9]/10 text-[#5B48D9]">
                  {categoryBrands.length} Brands
                </span>
              </div>
            </div>

            <div className="relative h-64 overflow-hidden rounded-xl">
              <Image
                src={
                  category.image || `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(category.name)}`
                }
                alt={category.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-[#333]">Popular {category.name} Brands</h2>

          {categoryBrands.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-xl shadow-sm">
              <p className="text-[#666]">No brands found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-[#333]">Explore Other Categories</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories
              .filter((c) => c.id !== category.id)
              .slice(0, 4)
              .map((otherCategory) => (
                <Link
                  key={otherCategory.id}
                  href={`/categories/${otherCategory.slug}`}
                  className="overflow-hidden transition-all rounded-xl hover:shadow-md group"
                >
                  <div className="relative h-32">
                    <Image
                      src={
                        otherCategory.image ||
                        `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(otherCategory.name)}`
                      }
                      alt={otherCategory.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-xl font-bold text-white">{otherCategory.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => router.push("/categories")}
              className="border-[#5B48D9] text-[#5B48D9] hover:bg-[#5B48D9]/10"
            >
              View All Categories
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
