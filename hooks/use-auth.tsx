"use client"

import { useContext } from "react"
import { AuthContext } from "@/contexts/auth-context"

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  // Add a convenience property to check if the user is verified
  const isVerified = context.isAuthenticated && context.user?.isVerified

  return {
    ...context,
    isVerified,
  }
}
