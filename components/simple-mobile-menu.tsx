"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, Sparkles, Settings, BadgeCheck, Bookmark, ChevronRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { mockCategories, mockBrands } from "@/data/mock-data"
import { SearchBar } from "./search-bar"

export function SimpleMobileMenu() {
  const router = useRouter()
  const { isAuthenticated, profile, logout, openAuthModal } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    // Only add the event listener if the menu is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setActiveSection(null)
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsOpen(false)
    setActiveSection(null)
  }

  const handleAuthModal = () => {
    openAuthModal(window.location.pathname)
    setIsOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="outline"
        size="icon"
        className="h-12 w-12 flex items-center justify-center"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden"
          style={{
            animation: "slideIn 0.3s ease-out forwards",
          }}
        >
          <style jsx global>{`
            @keyframes slideIn {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            
            .menu-item {
              transition: all 0.2s ease;
            }
            
            .menu-item:active {
              transform: scale(0.98);
            }
            
            .section-content {
              animation: fadeIn 0.3s ease-out forwards;
            }
          `}</style>

          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
              <span className="text-3xl font-bold tracking-tight text-[#5B48D9]">Uless</span>
            </Link>
            <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-4 border-b">
            <SearchBar />
          </div>

          {activeSection ? (
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 border-b flex items-center">
                <Button variant="ghost" className="mr-2 p-2" onClick={() => setActiveSection(null)}>
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </Button>
                <h2 className="text-lg font-semibold">{activeSection}</h2>
              </div>

              <div className="p-4 section-content">
                {activeSection === "Categories" && (
                  <div className="grid grid-cols-2 gap-4">
                    {mockCategories.map((category) => (
                      <div
                        key={category.id}
                        className="rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleNavigation(`/categories/${category.slug}`)}
                      >
                        <div className="relative h-24 w-full">
                          <Image
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm">{category.name}</h3>
                          <p className="text-xs text-gray-500">
                            {mockBrands.filter((b) => b.category === category.name)?.length || 0} brands
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSection === "Brands" && (
                  <div className="space-y-4">
                    <h3 className="font-medium mb-2">Featured Brands</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {mockBrands
                        .filter((b) => b.featured)
                        .slice(0, 6)
                        .map((brand) => (
                          <div
                            key={brand.id}
                            className="flex items-center p-3 space-x-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => handleNavigation(`/brands/${brand.slug}`)}
                          >
                            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-white border flex-shrink-0">
                              <Image
                                src={brand.logo || "/placeholder.svg"}
                                alt={brand.name}
                                width={40}
                                height={40}
                                className="object-contain p-1"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium leading-none">{brand.name}</div>
                              <p className="text-xs leading-snug line-clamp-1 text-gray-500">
                                {brand.tagline || "Student exclusive"}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>

                    <h3 className="font-medium mt-6 mb-2">Popular Categories</h3>
                    <div className="space-y-2">
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
                          <div
                            key={category}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() =>
                              handleNavigation(
                                `/categories/${mockCategories.find((c) => c.name === category)?.slug || "#"}`,
                              )
                            }
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5B48D9]/10 text-[#5B48D9]">
                                <span className="text-lg">{category.charAt(0).toUpperCase()}</span>
                              </div>
                              <div className="text-sm font-medium">{category}</div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {mockBrands.filter((b) => b.category === category).length} brands
                            </span>
                          </div>
                        ))}
                    </div>

                    <Button
                      className="w-full mt-4 bg-[#5B48D9]/10 text-[#5B48D9] hover:bg-[#5B48D9]/20"
                      onClick={() => handleNavigation("/brands")}
                    >
                      View All Brands
                    </Button>
                  </div>
                )}

                {activeSection === "Deals" && (
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden border shadow-sm">
                      <div className="relative h-32 w-full">
                        <Image src="/placeholder.svg?key=xmcsv" alt="Featured Deals" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-white font-bold text-lg">Featured Deals</h3>
                          <p className="text-white/80 text-sm">Exclusive student discounts</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleNavigation("/deals?category=tech")}
                      >
                        <h3 className="font-medium text-sm">Tech Deals</h3>
                        <p className="text-xs text-gray-500">Laptops, phones & more</p>
                      </div>
                      <div
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleNavigation("/deals?category=fashion")}
                      >
                        <h3 className="font-medium text-sm">Fashion</h3>
                        <p className="text-xs text-gray-500">Clothing & accessories</p>
                      </div>
                      <div
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleNavigation("/deals?category=food")}
                      >
                        <h3 className="font-medium text-sm">Food & Drink</h3>
                        <p className="text-xs text-gray-500">Restaurants & delivery</p>
                      </div>
                      <div
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleNavigation("/deals?category=entertainment")}
                      >
                        <h3 className="font-medium text-sm">Entertainment</h3>
                        <p className="text-xs text-gray-500">Streaming & events</p>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4 bg-[#5B48D9]/10 text-[#5B48D9] hover:bg-[#5B48D9]/20"
                      onClick={() => handleNavigation("/deals")}
                    >
                      Browse All Deals
                    </Button>
                  </div>
                )}

                {activeSection === "Help" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-[#5B48D9]/5 rounded-lg">
                      <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Find answers to common questions about student deals and verification.
                      </p>
                      <Button variant="outline" className="w-full" onClick={() => handleNavigation("/faq")}>
                        View FAQs
                      </Button>
                    </div>

                    <div className="space-y-3 mt-4">
                      <div
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center"
                        onClick={() => handleNavigation("/help/verification")}
                      >
                        <BadgeCheck className="w-5 h-5 mr-3 text-[#5B48D9]" />
                        <div>
                          <h3 className="font-medium text-sm">Verification Help</h3>
                          <p className="text-xs text-gray-500">How to verify your student status</p>
                        </div>
                      </div>
                      <div
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center"
                        onClick={() => handleNavigation("/help/redeeming")}
                      >
                        <Sparkles className="w-5 h-5 mr-3 text-[#5B48D9]" />
                        <div>
                          <h3 className="font-medium text-sm">Redeeming Deals</h3>
                          <p className="text-xs text-gray-500">How to use your student discounts</p>
                        </div>
                      </div>
                      <div
                        className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center"
                        onClick={() => handleNavigation("/contact")}
                      >
                        <User className="w-5 h-5 mr-3 text-[#5B48D9]" />
                        <div>
                          <h3 className="font-medium text-sm">Contact Support</h3>
                          <p className="text-xs text-gray-500">Get help from our team</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                <button
                  className="flex items-center justify-between w-full py-3 text-base font-medium border-b menu-item"
                  onClick={() => handleNavigation("/")}
                >
                  <span>Home</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  className="flex items-center justify-between w-full py-3 text-base font-medium border-b menu-item"
                  onClick={() => toggleSection("Categories")}
                >
                  <span>Categories</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  className="flex items-center justify-between w-full py-3 text-base font-medium border-b menu-item"
                  onClick={() => toggleSection("Brands")}
                >
                  <span>Brands</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  className="flex items-center justify-between w-full py-3 text-base font-medium border-b menu-item"
                  onClick={() => toggleSection("Deals")}
                >
                  <span>All Deals</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  className="flex items-center justify-between w-full py-3 text-base font-medium border-b menu-item"
                  onClick={() => toggleSection("Help")}
                >
                  <span>Help</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          )}

          <div className="p-4 border-t bg-gray-50">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-white rounded-lg border">
                  <div className="relative w-10 h-10 overflow-hidden rounded-full bg-[#f8faff] flex items-center justify-center mr-3">
                    {profile.avatar ? (
                      <Image
                        src={profile.avatar || "/placeholder.svg"}
                        alt={profile.name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User size={16} className="text-[#5B48D9]" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{profile.name}</p>
                    <p className="text-xs text-gray-500">{profile.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center"
                    onClick={() => handleNavigation("/profile")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center"
                    onClick={() => handleNavigation("/saved-deals")}
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Saved Deals
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center"
                    onClick={() => handleNavigation("/student-verification")}
                  >
                    <BadgeCheck className="w-4 h-4 mr-2" />
                    Verification
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center"
                    onClick={() => handleNavigation("/settings")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button className="w-full bg-[#5B48D9] hover:bg-[#4a3ac0] text-white" onClick={handleAuthModal}>
                <Sparkles size={18} className="mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
