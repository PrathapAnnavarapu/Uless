"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { mockCategories, mockBrands } from "@/data/mock-data"
import { Search, User, ChevronDown, LogOut, Sparkles, Settings, BadgeCheck, Bookmark } from "lucide-react"
import { SearchBar } from "./search-bar"
import { DynamicColorScheme } from "./dynamic-color-scheme"
import { SimpleMobileMenu } from "./simple-mobile-menu"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const { isAuthenticated, profile, logout, openAuthModal } = useAuth()
  const [buttonHover, setButtonHover] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const profileButton = document.getElementById("profile-button")
      const profileMenu = document.getElementById("profile-menu")

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

  const handleAuthModal = () => {
    // Pass the current path to the auth modal
    openAuthModal(pathname)
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setShowProfileMenu(!showProfileMenu)
    } else {
      handleAuthModal()
    }
  }

  const navigateTo = (path: string) => {
    setShowProfileMenu(false)
    router.push(path)
  }

  const handleLogout = () => {
    setShowProfileMenu(false)
    logout()
  }

  return (
    <>
      <DynamicColorScheme />
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500",
          isScrolled ? "bg-white shadow-sm" : "bg-transparent",
        )}
      >
        <style jsx global>{`
        @keyframes buttonPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(91, 72, 217, 0.7);
            transform: scale(1);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(91, 72, 217, 0);
            transform: scale(1.05);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(91, 72, 217, 0);
            transform: scale(1);
          }
        }
        
        .signin-button {
          position: relative;
          overflow: hidden;
        }
        
        .signin-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        
        .signin-button:hover::before {
          transform: translateX(0);
        }
        
        .signin-button-animated {
          animation: buttonPulse 2s infinite;
        }
      `}</style>

        <div className="container flex items-center justify-between h-20 px-4 mx-auto md:h-24">
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-8">
              <span className="text-3xl font-bold tracking-tight text-[#5B48D9] header-logo">Uless</span>
            </Link>

            {!isMobile && (
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="space-x-2">
                  <NavigationMenuItem className="navigation-menu-item">
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-base h-12 px-6 cursor-pointer header-link navigation-menu-link",
                        )}
                      >
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="navigation-menu-item">
                    <NavigationMenuTrigger className="text-base h-12 px-6 cursor-pointer header-dropdown-trigger navigation-menu-trigger">
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[800px] p-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h3 className="mb-3 text-lg font-medium">Browse Categories</h3>
                            <div className="grid grid-cols-2 gap-3">
                              {mockCategories.map((category) => (
                                <Link
                                  key={category.id}
                                  href={`/categories/${category.slug}`}
                                  className="flex items-center p-3 space-x-3 transition-colors rounded-md hover:bg-[#f8faff] group cursor-pointer"
                                >
                                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5B48D9]/10 text-[#5B48D9] group-hover:bg-[#5B48D9]/20">
                                    <span className="text-lg">{category.icon?.charAt(0).toUpperCase()}</span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium leading-none text-[#333] group-hover:text-[#5B48D9]">
                                      {category.name}
                                    </div>
                                    <p className="text-xs leading-snug line-clamp-1 text-[#666]">
                                      {mockBrands.filter((b) => b.category === category.name)?.length || 0} brands
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-4 text-center">
                              <Link
                                href="/categories"
                                className="inline-flex items-center text-sm font-medium text-[#5B48D9] hover:underline cursor-pointer"
                              >
                                View All Categories
                                <ChevronDown className="w-4 h-4 ml-1 rotate-270" />
                              </Link>
                            </div>
                          </div>
                          <div>
                            <h3 className="mb-3 text-lg font-medium">Popular Categories</h3>
                            <div className="grid grid-cols-1 gap-4">
                              {mockCategories.slice(0, 3).map((category) => (
                                <Link
                                  key={category.id}
                                  href={`/categories/${category.slug}`}
                                  className="relative overflow-hidden transition-transform rounded-lg hover:scale-[1.02] group cursor-pointer"
                                >
                                  <div className="relative w-full h-24">
                                    <Image
                                      src={category.image || "/placeholder.svg"}
                                      alt={category.name}
                                      fill
                                      className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                                  </div>
                                  <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-4">
                                    <h4 className="text-lg font-bold text-white">{category.name}</h4>
                                    <p className="text-sm text-white/80">
                                      {mockBrands.filter((b) => b.category === category.name)?.length || 0} brands
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="navigation-menu-item">
                    <NavigationMenuTrigger className="text-base h-12 px-6 cursor-pointer header-dropdown-trigger navigation-menu-trigger">
                      Brands
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[800px] p-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h3 className="mb-3 text-lg font-medium">Featured Brands</h3>
                            <div className="grid grid-cols-2 gap-4">
                              {mockBrands
                                .filter((b) => b.featured)
                                .slice(0, 5)
                                .map((brand) => (
                                  <Link
                                    key={brand.id}
                                    href={`/brands/${brand.slug}`}
                                    className="flex items-center p-3 space-x-3 transition-colors rounded-md hover:bg-[#f8faff] group cursor-pointer"
                                  >
                                    <div className="relative w-10 h-10 overflow-hidden rounded-full bg-white border">
                                      <Image
                                        src={brand.logo || "/placeholder.svg"}
                                        alt={brand.name}
                                        width={40}
                                        height={40}
                                        className="object-contain p-1"
                                      />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium leading-none text-[#333] group-hover:text-[#5B48D9]">
                                        {brand.name}
                                      </div>
                                      <p className="text-xs leading-snug line-clamp-1 text-[#666]">
                                        {brand.tagline || "Student exclusive"}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="mb-3 text-lg font-medium">Browse by Category</h3>
                            <div className="grid grid-cols-1 gap-3">
                              {Object.keys(
                                mockBrands.reduce(
                                  (acc, brand) => {
                                    if (!acc[brand.category]) acc[brand.category] = []
                                    acc[brand.category].push(brand)
                                    return acc
                                  },
                                  {} as Record<string, typeof mockBrands>,
                                ),
                              )
                                .slice(0, 5)
                                .map((category) => (
                                  <Link
                                    key={category}
                                    href={`/categories/${mockCategories.find((c) => c.name === category)?.slug || "#"}`}
                                    className="flex items-center justify-between p-3 transition-colors rounded-md hover:bg-[#f8faff] group cursor-pointer"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5B48D9]/10 text-[#5B48D9] group-hover:bg-[#5B48D9]/20">
                                        <span className="text-lg">{category.charAt(0).toUpperCase()}</span>
                                      </div>
                                      <div className="text-sm font-medium leading-none text-[#333] group-hover:text-[#5B48D9]">
                                        {category}
                                      </div>
                                    </div>
                                    <span className="text-xs text-[#666]">
                                      {mockBrands.filter((b) => b.category === category).length} brands
                                    </span>
                                  </Link>
                                ))}
                              <Link
                                href="/brands"
                                className="flex items-center justify-center p-3 mt-2 text-sm font-medium transition-colors rounded-md bg-[#5B48D9]/10 text-[#5B48D9] hover:bg-[#5B48D9]/20 cursor-pointer"
                              >
                                View All Brands
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="navigation-menu-item">
                    <Link
                      href="/deals"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-base h-12 px-6 cursor-pointer header-link navigation-menu-link",
                      )}
                    >
                      All Deals
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem className="navigation-menu-item">
                    <Link
                      href="/help"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-base h-12 px-6 cursor-pointer header-link navigation-menu-link",
                      )}
                    >
                      Help
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {!isMobile && (
              <>
                {showSearch ? (
                  <div className="w-64 transition-all duration-300 ease-in-out">
                    <SearchBar />
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-4 border-gray-200 header-search-button"
                    onClick={() => setShowSearch(true)}
                  >
                    <Search className="w-5 h-5 mr-2 header-icon" />
                    <span>Search Everything</span>
                  </Button>
                )}
              </>
            )}

            {!isAuthenticated ? (
              <Button
                className={`bg-[#5B48D9] hover:bg-[#4a3ac0] text-white h-12 px-6 signin-button ${buttonHover ? "signin-button-animated" : ""}`}
                size="lg"
                onClick={() => handleAuthModal()}
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
              >
                <Sparkles size={18} className="mr-2" />
                Sign In
              </Button>
            ) : (
              <div className="relative">
                <Button
                  id="profile-button"
                  variant="ghost"
                  size="lg"
                  className="h-12 flex items-center gap-2 px-4 header-dropdown-trigger profile-button"
                  onClick={handleProfileClick}
                >
                  <div className="relative w-8 h-8 overflow-hidden rounded-full bg-[#f8faff] flex items-center justify-center">
                    {profile.avatar ? (
                      <Image
                        src={profile.avatar || "/placeholder.svg"}
                        alt={profile.name}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User size={16} className="text-[#5B48D9] header-icon" />
                    )}
                  </div>
                  <span className="hidden font-medium md:block">{profile.name.split(" ")[0]}</span>
                  <ChevronDown className="hidden w-4 h-4 md:block header-icon" />
                </Button>

                {showProfileMenu && (
                  <div
                    id="profile-menu"
                    className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                  >
                    <div className="py-1 px-4 border-b border-gray-200">
                      <p className="text-sm font-medium">My Account</p>
                    </div>
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
                      {profile.isAdmin && (
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => navigateTo("/deals/admin")}
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Admin Panel
                        </button>
                      )}
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => navigateTo("/settings")}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Account Settings
                      </button>
                    </div>
                    <div className="py-1 border-t border-gray-200">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isMobile && <SimpleMobileMenu />}
          </div>
        </div>
      </header>
    </>
  )
}
