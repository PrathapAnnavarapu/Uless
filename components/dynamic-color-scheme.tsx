"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

export function DynamicColorScheme() {
  const { isAuthenticated } = useAuth()

  // Function to apply color scheme based on viewport position
  const applyColorScheme = () => {
    // Elements we need to modify
    const header = document.querySelector("header")
    const headerLogo = document.querySelector(".header-logo")
    const headerLinks = document.querySelectorAll(".header-link")
    const headerDropdownTriggers = document.querySelectorAll(".header-dropdown-trigger")
    const headerIcons = document.querySelectorAll(".header-icon")
    const signInButton = document.querySelector(".signin-button")
    const profileButton = document.getElementById("profile-button")
    const profileButtonText = document.querySelector("#profile-button span")
    const profileButtonIcon = document.querySelector("#profile-button svg")
    const searchButton = document.querySelector(".header-search-button")
    const searchButtonText = document.querySelector(".header-search-button span")
    const navigationLinks = document.querySelectorAll(".navigation-menu-link")
    const navigationTriggers = document.querySelectorAll(".navigation-menu-trigger")
    const navigationMenus = document.querySelectorAll(".navigation-menu")

    // Function to check if an element is in viewport
    const isInViewport = (element: Element) => {
      if (!element) return false
      const rect = element.getBoundingClientRect()
      return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
    }

    const categorySection = document.getElementById("category-section")

    if (categorySection && isInViewport(categorySection)) {
      // Change header background to dark blue
      if (header)
        header.setAttribute("style", "background-color: #063970 !important; transition: background-color 0.5s ease;")

      // Change logo to white
      if (headerLogo) headerLogo.setAttribute("style", "color: white !important; transition: color 0.5s ease;")

      // Change navigation text colors to white and apply consistent styling with search bar
      headerLinks.forEach((link) => {
        link.setAttribute(
          "style",
          "color: white !important; background-color: transparent !important; border-color: rgba(255, 255, 255, 0.3) !important; transition: all 0.5s ease;",
        )
      })

      headerDropdownTriggers.forEach((trigger) => {
        trigger.setAttribute(
          "style",
          "color: white !important; background-color: transparent !important; border-color: rgba(255, 255, 255, 0.3) !important; transition: all 0.5s ease;",
        )
      })

      navigationLinks.forEach((link) => {
        link.setAttribute(
          "style",
          "color: white !important; background-color: transparent !important; border-color: rgba(255, 255, 255, 0.3) !important; transition: all 0.5s ease;",
        )
      })

      navigationTriggers.forEach((trigger) => {
        trigger.setAttribute(
          "style",
          "color: white !important; background-color: transparent !important; border-color: rgba(255, 255, 255, 0.3) !important; transition: all 0.5s ease;",
        )
      })

      // Apply styles to navigation menus
      navigationMenus.forEach((menu) => {
        menu.setAttribute(
          "style",
          "color: white !important; background-color: transparent !important; transition: all 0.5s ease;",
        )
      })

      // Get all navigation menu items
      const navigationMenuItems = document.querySelectorAll(".navigation-menu-item")
      navigationMenuItems.forEach((item) => {
        item.setAttribute(
          "style",
          "background-color: transparent !important; border-color: rgba(255, 255, 255, 0.3) !important; transition: all 0.5s ease;",
        )
      })

      headerIcons.forEach((icon) => {
        icon.setAttribute("style", "color: white !important; transition: color 0.5s ease;")
      })

      // Change search button text to white
      if (searchButtonText) {
        searchButtonText.setAttribute("style", "color: white !important; transition: color 0.5s ease;")
      }

      // Change sign-in button colors
      if (signInButton) {
        signInButton.setAttribute(
          "style",
          "background-color: white !important; color: #063970 !important; transition: all 0.5s ease;",
        )
      }

      // Change profile button colors if it exists (when user is signed in)
      if (profileButton) {
        profileButton.setAttribute(
          "style",
          "color: white !important; border-color: rgba(255, 255, 255, 0.3) !important; background-color: transparent !important; transition: all 0.5s ease;",
        )

        // Make sure the profile button text is white
        if (profileButtonText) {
          profileButtonText.setAttribute("style", "color: white !important; transition: color 0.5s ease;")
        }

        // Make sure the profile button icon (chevron) is white
        if (profileButtonIcon) {
          profileButtonIcon.setAttribute("style", "color: white !important; transition: color 0.5s ease;")
        }
      }

      // Change search button border color but keep background transparent
      if (searchButton) {
        searchButton.setAttribute(
          "style",
          "border-color: rgba(255, 255, 255, 0.3) !important; background-color: transparent !important; transition: all 0.5s ease;",
        )
      }

      // Change category section background
      categorySection.setAttribute(
        "style",
        "background-color: #063970 !important; transition: background-color 0.5s ease;",
      )

      // Change category section text colors - specifically target the heading and description
      const categoryHeading = document.getElementById("category-heading")
      if (categoryHeading) {
        const headingTitle = categoryHeading.querySelector("h2")
        const headingDescription = categoryHeading.querySelector("p")

        if (headingTitle) headingTitle.setAttribute("style", "color: white !important; transition: color 0.5s ease;")

        if (headingDescription)
          headingDescription.setAttribute(
            "style",
            "color: rgba(255, 255, 255, 0.8) !important; transition: color 0.5s ease;",
          )
      }

      // Style all cards in the category section
      const categoryCards = categorySection.querySelectorAll(".card")
      categoryCards.forEach((card) => {
        card.setAttribute("style", "border-color: rgba(255, 255, 255, 0.2) !important; transition: all 0.5s ease;")
      })
    } else {
      // Revert to light theme
      if (header) header.removeAttribute("style")
      if (headerLogo) headerLogo.removeAttribute("style")

      headerLinks.forEach((link) => {
        link.removeAttribute("style")
      })

      headerDropdownTriggers.forEach((trigger) => {
        trigger.removeAttribute("style")
      })

      navigationLinks.forEach((link) => {
        link.removeAttribute("style")
      })

      navigationTriggers.forEach((trigger) => {
        trigger.removeAttribute("style")
      })

      navigationMenus.forEach((menu) => {
        menu.removeAttribute("style")
      })

      const navigationMenuItems = document.querySelectorAll(".navigation-menu-item")
      navigationMenuItems.forEach((item) => {
        item.removeAttribute("style")
      })

      headerIcons.forEach((icon) => {
        icon.removeAttribute("style")
      })

      if (searchButtonText) {
        searchButtonText.removeAttribute("style")
      }

      if (signInButton) {
        signInButton.removeAttribute("style")
      }

      if (profileButton) {
        profileButton.removeAttribute("style")

        if (profileButtonText) {
          profileButtonText.removeAttribute("style")
        }

        if (profileButtonIcon) {
          profileButtonIcon.removeAttribute("style")
        }
      }

      if (searchButton) {
        searchButton.removeAttribute("style")
      }

      // Revert category section if it exists
      if (categorySection) {
        categorySection.removeAttribute("style")

        const categoryHeading = document.getElementById("category-heading")
        if (categoryHeading) {
          const headingTitle = categoryHeading.querySelector("h2")
          const headingDescription = categoryHeading.querySelector("p")

          if (headingTitle) headingTitle.removeAttribute("style")
          if (headingDescription) headingDescription.removeAttribute("style")
        }

        const categoryCards = categorySection.querySelectorAll(".card")
        categoryCards.forEach((card) => {
          card.removeAttribute("style")
        })
      }
    }
  }

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", applyColorScheme)

    // Initial check
    applyColorScheme()

    // Cleanup
    return () => {
      window.removeEventListener("scroll", applyColorScheme)
    }
  }, [])

  // Re-apply color scheme when authentication state changes
  useEffect(() => {
    // This will ensure the color scheme is updated when auth state changes
    applyColorScheme()
  }, [isAuthenticated])

  return null
}
