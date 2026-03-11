"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, User, Mail, School, CheckCircle, Settings, BookmarkIcon, LogOut } from "lucide-react"
import Link from "next/link"
import type React from "react"

import { useState } from "react"
import { toast } from "sonner"
import { useDeals } from "@/hooks/use-deals"

export default function ProfilePage() {
  const { isAuthenticated, user, logout } = useAuth()
  const router = useRouter()

  const deals = useDeals()
  const [savedDeals, setSavedDeals] = useState<any[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([])

  useEffect(() => {
    if (deals.length) {
      setSavedDeals(deals.slice(0, 3))
      setRecentlyViewed(deals.slice(3, 6))
    }
  }, [deals])
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [dealAlerts, setDealAlerts] = useState(true)
  const [newsletterSubscription, setNewsletterSubscription] = useState(true)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    router.push("/")
  }

  const handleRemoveSavedDeal = (dealId: string) => {
    setSavedDeals(savedDeals.filter((deal) => deal.id !== dealId))
    toast.success("Deal removed from saved items")
  }

  const handleClearHistory = () => {
    setRecentlyViewed([])
    toast.success("Browsing history cleared")
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsChangingPassword(true)

    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false)
      setShowPasswordForm(false)
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast.success("Password updated successfully")
    }, 1500)
  }

  // If not authenticated, show loading or nothing
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="container max-w-6xl px-4 py-8 mx-auto">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card className="overflow-hidden">
            <CardHeader className="bg-[#5B48D9]/10 text-center">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 border-4 border-white">
                  <AvatarImage src={user?.avatar || "/placeholder.svg?height=96&width=96&text=U"} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{user?.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {user?.email}
                </CardDescription>
                {user?.isVerified ? (
                  <Badge className="mt-2 bg-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" /> Verified Student
                  </Badge>
                ) : (
                  <Badge variant="outline" className="mt-2 border-amber-500 text-amber-600">
                    Verification Pending
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-3 text-sm font-medium border-l-2 border-[#5B48D9] bg-[#5B48D9]/5"
                >
                  <User className="w-4 h-4 mr-3 text-[#5B48D9]" />
                  My Profile
                </Link>
                <Link href="/saved-deals" className="flex items-center px-4 py-3 text-sm font-medium hover:bg-gray-50">
                  <BookmarkIcon className="w-4 h-4 mr-3 text-gray-500" />
                  Saved Deals
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-3 text-sm font-medium hover:bg-gray-50">
                  <Settings className="w-4 h-4 mr-3 text-gray-500" />
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-3 text-sm font-medium text-left text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Manage your account information and student verification</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Personal Info</TabsTrigger>
                  <TabsTrigger value="verification">Student Verification</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Full Name</h3>
                      <div className="p-3 bg-gray-50 rounded-md">{user?.name}</div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Email Address</h3>
                      <div className="p-3 bg-gray-50 rounded-md">{user?.email}</div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-medium">University</h3>
                      <div className="p-3 bg-gray-50 rounded-md">{user?.university || "Not specified"}</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Link href="/profile/edit">
                      <Button variant="outline">Edit Profile</Button>
                    </Link>
                  </div>
                </TabsContent>
                <TabsContent value="verification" className="mt-6">
                  <div className="p-6 text-center bg-gray-50 rounded-lg">
                    {user?.isVerified ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-medium text-green-700">Verification Complete</h3>
                        <p className="text-gray-600">
                          Your student status has been verified. You now have access to all exclusive student deals.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-amber-100 rounded-full">
                          <School className="w-8 h-8 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-medium text-amber-700">Verification Required</h3>
                        <p className="text-gray-600">
                          Please verify your student status to access exclusive student deals.
                        </p>
                        <Link href="/student-verification">
                          <Button>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Verify Student Status
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent interactions with Uless</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Account Created</p>
                    <p className="text-sm text-gray-500">You created your Uless account</p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">Just now</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t">
              <Button variant="link">View All Activity</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
