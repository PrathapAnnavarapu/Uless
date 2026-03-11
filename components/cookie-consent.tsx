"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookie-consent")

    // If no choice has been made, show the banner
    if (!cookieConsent) {
      // Small delay to prevent the banner from flashing on page load
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    setIsVisible(false)
    // Here you would initialize all cookies/tracking
  }

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary")
    setIsVisible(false)
    // Here you would only initialize essential cookies
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pr-8">
            <h3 className="text-lg font-semibold mb-2">We value your privacy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
              traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Read our{" "}
              <Link href="/cookies" className="text-[#5B48D9] hover:underline">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#5B48D9] hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={acceptNecessary} className="whitespace-nowrap">
              Necessary Only
            </Button>
            <Button onClick={acceptAll} className="bg-[#5B48D9] hover:bg-[#4a3ac0] whitespace-nowrap">
              Accept All
            </Button>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close cookie consent"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
