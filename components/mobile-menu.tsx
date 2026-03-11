"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { mockCategories } from "@/data/mock-data"
import { Menu, User, LogOut, Sparkles, Settings, BadgeCheck, Bookmark } from "lucide-react"
import { SearchBar } from "./search-bar"

export function MobileMenu() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, logout, openAuthModal } = useAuth()
  const [buttonHover, setButtonHover] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  const handleAuthModal = () => {
    openAuthModal(pathname)
    setIsOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 header-search-button flex items-center justify-center"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 header-icon" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] z-50">
        <div className="flex flex-col h-full py-6">
          <div className="flex items-center mb-6">
            <span className="text-xl font-bold text-[#5B48D9]">Uless</span>
          </div>

          <div className="mb-6">
            <SearchBar />
          </div>

          <div className="flex-1 space-y-4">
            <button
              className={cn(
                "flex items-center py-2 text-base font-medium w-full text-left",
                pathname === "/" ? "text-[#5B48D9]" : "text-[#333]",
              )}
              onClick={() => handleNavigation("/")}
            >
              Home
            </button>

            <div className="py-2">
              <div className="mb-2 text-base font-medium text-[#333]">Categories</div>
              <div className="grid grid-cols-2 gap-2">
                {mockCategories.slice(0, 6).map((category) => (
                  <button
                    key={category.id}
                    className="text-sm text-left text-[#666] hover:text-[#5B48D9]"
                    onClick={() => handleNavigation(`/categories/${category.slug}`)}
                  >
                    {category.name}
                  </button>
                ))}
                <button
                  className="text-sm font-medium text-[#5B48D9] text-left"
                  onClick={() => handleNavigation("/categories")}
                >
                  View All
                </button>
              </div>
            </div>

            <button
              className={cn(
                "flex items-center py-2 text-base font-medium w-full text-left",
                pathname.startsWith("/brands") ? "text-[#5B48D9]" : "text-[#333]",
              )}
              onClick={() => handleNavigation("/brands")}
            >
              Brands
            </button>

            <button
              className={cn(
                "flex items-center py-2 text-base font-medium w-full text-left",
                pathname.startsWith("/deals") ? "text-[#5B48D9]" : "text-[#333]",
              )}
              onClick={() => handleNavigation("/deals")}
            >
              All Deals
            </button>

            <button
              className={cn(
                "flex items-center py-2 text-base font-medium w-full text-left",
                pathname.startsWith("/help") ? "text-[#5B48D9]" : "text-[#333]",
              )}
              onClick={() => handleNavigation("/help")}
            >
              Help
            </button>
          </div>

          <div className="pt-6 mt-6 border-t border-[#e0e0e0]">
            {isAuthenticated ? (
              <div className="space-y-4">
                <button
                  className="flex items-center justify-start w-full py-2 text-base font-medium text-[#333]"
                  onClick={() => handleNavigation("/profile")}
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </button>
                <button
                  className="flex items-center justify-start w-full py-2 text-base font-medium text-[#333]"
                  onClick={() => handleNavigation("/saved-deals")}
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Saved Deals
                </button>
                <button
                  className="flex items-center justify-start w-full py-2 text-base font-medium text-[#333]"
                  onClick={() => handleNavigation("/student-verification")}
                >
                  <BadgeCheck className="w-4 h-4 mr-2" />
                  Student Verification
                </button>
                <button
                  className="flex items-center justify-start w-full py-2 text-base font-medium text-[#333]"
                  onClick={() => handleNavigation("/settings")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <Button variant="outline" className="flex items-center justify-center w-full" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                className={`w-full bg-[#5B48D9] hover:bg-[#4a3ac0] text-white signin-button ${buttonHover ? "signin-button-animated" : ""}`}
                onClick={() => handleAuthModal()}
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
              >
                <Sparkles size={18} className="mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
