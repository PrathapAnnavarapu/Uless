"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ArrowLeft, User, Camera } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function EditProfilePage() {
  const router = useRouter()
  const { user, updateProfile, loading, isAuthenticated } = useAuth()

  const [name, setName] = useState("")
  const [university, setUniversity] = useState("")
  const [avatar, setAvatar] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, loading, router])

  useEffect(() => {
    // Initialize form with current user data
    if (user) {
      setName(user.name || "")
      setUniversity(user.university || "")
      setAvatar(user.avatar || null)
    }
  }, [user])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file)
      setAvatar(imageUrl)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      toast.error("Please enter your name")
      return
    }

    // Update profile context
    updateProfile({
      name,
      university,
      avatar,
    })

    toast.success("Profile updated successfully")
    router.push("/profile")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-[#5B48D9] border-b-[#5B48D9] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null // Will redirect in the useEffect
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f8faff]">
      <div className="container max-w-4xl px-6 py-8 mx-auto">
        <Button type="button" variant="ghost" className="p-0 mb-4" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Profile
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#333]">Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>

            {/* Tab buttons that match the website's color scheme */}
            <div className="mt-4 grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-lg w-full max-w-xs">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className={`py-2 ${
                  activeTab === "overview"
                    ? "bg-[#5B48D9] text-white hover:bg-[#4a3ac0]"
                    : "bg-transparent text-gray-600 hover:text-[#5B48D9]"
                }`}
                onClick={() => {
                  setActiveTab("overview")
                  router.push("/profile")
                }}
              >
                Overview
              </Button>
              <Button
                variant={activeTab === "saved" ? "default" : "ghost"}
                className={`py-2 ${
                  activeTab === "saved"
                    ? "bg-[#5B48D9] text-white hover:bg-[#4a3ac0]"
                    : "bg-transparent text-gray-600 hover:text-[#5B48D9]"
                }`}
                onClick={() => {
                  setActiveTab("saved")
                  router.push("/profile?tab=saved")
                }}
              >
                Saved
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className={`py-2 ${
                  activeTab === "settings"
                    ? "bg-[#5B48D9] text-white hover:bg-[#4a3ac0]"
                    : "bg-transparent text-gray-600 hover:text-[#5B48D9]"
                }`}
                onClick={() => {
                  setActiveTab("settings")
                  router.push("/profile?tab=settings")
                }}
              >
                Settings
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center">
                {/* Properly styled circular profile photo container */}
                <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full bg-[#f8faff] group">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    {avatar ? (
                      <Image
                        src={avatar || "/placeholder.svg"}
                        alt="Profile"
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-[#5B48D9] rounded-full">
                        <User size={48} />
                      </div>
                    )}
                  </div>

                  {/* Centered upload overlay that appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <label htmlFor="avatar-upload" className="flex flex-col items-center text-white cursor-pointer">
                      <Camera className="w-8 h-8 mb-1" />
                      <span className="text-xs">Change Photo</span>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4">Click on the image to change your profile picture</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#333]">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#333]">
                    Email
                  </label>
                  <Input id="email" type="email" value={user.email} disabled className="h-12 rounded-xl bg-[#f8faff]" />
                  <p className="text-xs text-[#666]">Email cannot be changed</p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="university" className="text-sm font-medium text-[#333]">
                    University
                  </label>
                  <Input
                    id="university"
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="h-12 rounded-xl"
                    placeholder="Enter your university name"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => router.push("/profile")}>
                  Cancel
                </Button>
                <Button type="submit" className="text-white bg-[#5B48D9] hover:bg-[#4a3ac0]">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
