"use client"

import { useEffect, useState } from "react"

export function ColorSchemeObserver() {
  const [isDarkSection, setIsDarkSection] = useState(false)

  useEffect(() => {
    // Function to check if the category section is fully visible
    const checkCategorySection = () => {
      const categorySection = document.getElementById("category-section")
      if (!categorySection) return

      const rect = categorySection.getBoundingClientRect()
      const isFullyVisible =
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.top < window.innerHeight * 0.5 &&
        rect.bottom > window.innerHeight * 0.2

      // Add a small buffer to prevent flickering
      if (isFullyVisible && !isDarkSection) {
        setIsDarkSection(true)
        document.documentElement.classList.add("dark-section-visible")
      } else if (!isFullyVisible && isDarkSection) {
        setIsDarkSection(false)
        document.documentElement.classList.remove("dark-section-visible")
      }
    }

    // Check on scroll and initial load
    window.addEventListener("scroll", checkCategorySection)
    checkCategorySection()

    return () => {
      window.removeEventListener("scroll", checkCategorySection)
    }
  }, [isDarkSection])

  return null
}
