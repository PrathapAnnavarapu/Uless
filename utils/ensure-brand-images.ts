import type { Brand } from "@/types/types"
import { brandLogos, studentImages } from "@/data/images"

export function ensureBrandImages(brand: Brand): Brand {
  // Create a copy of the brand to avoid mutating the original
  const updatedBrand = { ...brand }

  // Ensure logo is set
  if (!updatedBrand.logo) {
    // Check if we have a predefined logo for this brand
    const brandKey = Object.keys(brandLogos).find(
      (key) => key.toLowerCase() === brand.slug.toLowerCase() || key.toLowerCase() === brand.name.toLowerCase(),
    )

    if (brandKey) {
      updatedBrand.logo = brandLogos[brandKey]
    } else {
      // If no predefined logo, use a placeholder with the brand name
      updatedBrand.logo = `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(brand.name)}`
    }
  }

  // Ensure product image is set
  if (!updatedBrand.productImage) {
    // Check if we have a predefined product image for this brand
    const brandKey = Object.keys(studentImages).find(
      (key) => key.toLowerCase() === brand.slug.toLowerCase() || key.toLowerCase() === brand.name.toLowerCase(),
    )

    if (brandKey) {
      updatedBrand.productImage = studentImages[brandKey]
    } else {
      // If no predefined product image, use a placeholder with the brand name
      updatedBrand.productImage = `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(brand.name)}`
    }
  }

  // Special handling for Walmart+ and DoorDash to ensure their logos are properly loaded
  if (brand.slug === "walmart-plus" || brand.name.toLowerCase().includes("walmart")) {
    updatedBrand.logo = "/images/brands/walmart-plus-logo.png"
  }

  if (brand.slug === "doordash" || brand.name.toLowerCase().includes("doordash")) {
    updatedBrand.logo = "/images/brands/doordash-logo.png"
  }

  if (brand.slug === "costco" || brand.name.toLowerCase().includes("costco")) {
    updatedBrand.logo = "/images/brands/costco-logo.png"
  }

  return updatedBrand
}
