"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { mockCategories } from "@/data/mock-data"

export function CategoryList() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("All")

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    // In a real app, this would filter deals by category
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#333]">Categories</h2>
        <Button variant="link" className="text-[#5B48D9]" onClick={() => router.push("/categories")}>
          See All
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex space-x-3 pb-2">
          <Button
            key="all"
            variant={activeCategory === "All" ? "default" : "outline"}
            className={`rounded-xl px-4 py-2 ${
              activeCategory === "All"
                ? "bg-[#5B48D9] text-white hover:bg-[#4a3ac0]"
                : "border-[#e0e0e0] text-[#666] hover:bg-[#f8faff]"
            }`}
            onClick={() => handleCategoryClick("All")}
          >
            All
          </Button>

          {mockCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.name ? "default" : "outline"}
              className={`rounded-xl px-4 py-2 whitespace-nowrap ${
                activeCategory === category.name
                  ? "bg-[#5B48D9] text-white hover:bg-[#4a3ac0]"
                  : "border-[#e0e0e0] text-[#666] hover:bg-[#f8faff]"
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
