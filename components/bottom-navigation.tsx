"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Search, Bookmark, User, LogOut, Settings, BadgeCheck } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, profile, logout, openAuthModal } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const profileButton = document.getElementById("mobile-profile-button")
      const profileMenu = document.getElementById("mobile-profile-menu")

      if (
        profileButton &&
        profileMenu &&
        !profileButton.contains(event.target as Node) &&
        !profileMenu.contains(event.target as Node)
      ) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setShowProfileMenu(false)
  }, [pathname])

  useEffect(() => {
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      const diff = touchStartY - touchY

      // If swiping up, hide profile menu
      if (diff > 50) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchmove", handleTouchMove)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  if (!mounted) return null

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setShowProfileMenu(!showProfileMenu)
    } else {
      openAuthModal()
    }
  }

  const navigateTo = (path: string) => {
    setShowProfileMenu(false)
    router.push(path)

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleLogout = () => {
    setShowProfileMenu(false)
    logout()
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between h-16 bg-white border-t border-[#e0e0e0] sm:h-20 md:hidden">
      <Button
        variant="ghost"
        className={`flex flex-col items-center justify-center h-full rounded-none w-1/4 ${
          isActive("/") ? "text-primary" : "text-muted-foreground"
        }`}
        onClick={() => navigateTo("/")}
      >
        <Home className="w-5 h-5 mb-1" />
        <span className="text-xs">Home</span>
      </Button>

      <Button
        variant="ghost"
        className={`flex flex-col items-center justify-center h-full rounded-none w-1/4 ${
          isActive("/search") ? "text-primary" : "text-muted-foreground"
        }`}
        onClick={() => navigateTo("/search")}
      >
        <Search className="w-5 h-5 mb-1" />
        <span className="text-xs">Search</span>
      </Button>

      <Button
        variant="ghost"
        className={`flex flex-col items-center justify-center h-full rounded-none w-1/4 ${
          isActive("/saved-deals") ? "text-primary" : "text-muted-foreground"
        }`}
        onClick={() => (isAuthenticated ? navigateTo("/saved-deals") : openAuthModal())}
      >
        <Bookmark className="w-5 h-5 mb-1" />
        <span className="text-xs">Saved</span>
      </Button>

      <div className="relative w-1/4">
        <Button
          id="mobile-profile-button"
          variant="ghost"
          className={`flex flex-col items-center justify-center h-full rounded-none w-full ${
            isActive("/profile") ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={handleProfileClick}
        >
          {isAuthenticated && profile.avatar ? (
            <div className="relative w-6 h-6 mb-1 overflow-hidden rounded-full">
              <Image
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name}
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
          ) : (
            <User className="w-5 h-5 mb-1" />
          )}
          <span className="text-xs">{isAuthenticated ? "Profile" : "Sign In"}</span>
        </Button>

        {showProfileMenu && isAuthenticated && (
          <div
            id="mobile-profile-menu"
            className="absolute bottom-full right-0 mb-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200"
          >
            <div className="py-1">
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => navigateTo("/profile")}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => navigateTo("/saved-deals")}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Saved Deals
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => navigateTo("/student-verification")}
              >
                <BadgeCheck className="w-4 h-4 mr-2" />
                Student Verification
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => navigateTo("/settings")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
