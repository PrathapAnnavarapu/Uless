"use client"

import { useContext } from "react"
import { ProfileContext } from "@/contexts/profile-context"

export function WelcomeBanner() {
  const { profile } = useContext(ProfileContext)

  // Get current time to display appropriate greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-[#5B48D9] to-[#6366F1] text-white">
      <h1 className="mb-2 text-2xl font-bold">
        {getGreeting()}, {profile.name.split(" ")[0] || "Student"}!
      </h1>
      <p className="text-white/90">Discover exclusive deals just for students</p>
    </div>
  )
}
