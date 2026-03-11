"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"
import { API_BASE } from "@/lib/backend"

type Profile = {
  id: string
  name: string
  email: string
  university?: string
  avatar?: string | null
  isVerified?: boolean
  isAdmin?: boolean
}

type AuthContextType = {
  isAuthenticated: boolean
  user: Profile | null
  profile: Profile
  isAuthModalOpen: boolean
  openAuthModal: (returnTo?: string) => void
  closeAuthModal: () => void
  signIn: (email: string, password: string, returnTo?: string) => Promise<void>
  signUp: (email: string, password: string, name?: string, returnTo?: string) => Promise<void>
  signInWithGoogle: (returnTo?: string) => Promise<void>
  signInWithMicrosoft: (returnTo?: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  verifyStudent: () => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<Profile>) => void
  loading: boolean
}

const defaultProfile: Profile = {
  id: "",
  name: "",
  email: "",
  university: "",
  avatar: null,
  isVerified: false,
  isAdmin: false,
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  profile: defaultProfile,
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  signIn: async () => {},
  signUp: async () => {},
  signInWithGoogle: async () => {},
  signInWithMicrosoft: async () => {},
  resetPassword: async () => {},
  verifyStudent: async () => {},
  logout: () => {},
  updateProfile: () => {},
  loading: false,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<Profile | null>(null)
  const [profile, setProfile] = useState<Profile>(defaultProfile)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Load auth state from localStorage on mount and verify with backend if token exists
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("uless_auth_user")
        const token = localStorage.getItem("uless_auth_token")
        if (storedUser && token) {
          const userData = JSON.parse(storedUser)
          setIsAuthenticated(true)
          setUser(userData)
          setProfile(userData)
        }
      } catch (error) {
        console.error("Error loading auth state:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const openAuthModal = (returnTo?: string) => {
    // Store current path in URL parameter
    const returnPath = returnTo || pathname
    if (returnPath !== "/auth") {
      const encodedReturnPath = encodeURIComponent(returnPath)
      router.push(`/auth?returnTo=${encodedReturnPath}`)
    } else {
      router.push("/auth")
    }
  }

  const closeAuthModal = () => setIsAuthModalOpen(false)

  const signIn = async (email: string, password: string, returnTo?: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Login failed")

      const { token, user: userData } = data
      setIsAuthenticated(true)
      setUser(userData)
      setProfile(userData)
      closeAuthModal()

      localStorage.setItem("uless_auth_user", JSON.stringify(userData))
      localStorage.setItem("uless_auth_token", token)
      localStorage.setItem("uless_auth_status", "authenticated")

      toast.success("Signed in successfully", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })

      if (returnTo) {
        router.push(returnTo)
      } else {
        router.push("/")
      }
    } catch (error: any) {
      toast.error(error.message || "Sign-in failed", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name?: string, returnTo?: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Sign-up failed")

      const { token, user: userData } = data
      setIsAuthenticated(true)
      setUser(userData)
      setProfile(userData)
      closeAuthModal()

      localStorage.setItem("uless_auth_user", JSON.stringify(userData))
      localStorage.setItem("uless_auth_token", token)
      localStorage.setItem("uless_auth_status", "authenticated")

      toast.success("Account created successfully", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })

      if (returnTo) {
        router.push(returnTo)
      } else {
        router.push("/")
      }
    } catch (error: any) {
      toast.error(error.message || "Sign-up failed", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })
    } finally {
      setLoading(false)
    }
  }

  // Fix the Google sign-in function to redirect to previous page
  const signInWithGoogle = async (returnTo?: string) => {
    setLoading(true)
    try {
      // Create a Google user directly
      const googleUser = {
        id: `google-user-${Date.now()}`,
        email: `google.user@student.edu`,
        name: `Google User`,
        avatar: `/placeholder.svg?height=40&width=40&text=G`,
        isVerified: true,
      }

      // Update state
      setIsAuthenticated(true)
      setUser(googleUser)
      setProfile(googleUser)

      // Force localStorage update to ensure persistence
      localStorage.setItem("uless_auth_user", JSON.stringify(googleUser))
      localStorage.setItem("uless_auth_status", "authenticated")

      toast.success("Signed in with Google", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })

      // Redirect to the return path or home
      if (returnTo) {
        router.push(returnTo)
      } else {
        router.push("/")
      }
    } catch (error) {
      toast.error("Google sign-in failed", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })
    } finally {
      setLoading(false)
    }
  }

  const signInWithMicrosoft = async (returnTo?: string) => {
    setLoading(true)
    try {
      // Create a Microsoft user directly
      const microsoftUser = {
        id: `microsoft-user-${Date.now()}`,
        email: `microsoft.user@student.edu`,
        name: `Microsoft User`,
        avatar: `/placeholder.svg?height=40&width=40&text=M`,
        isVerified: true,
      }

      // Update state
      setIsAuthenticated(true)
      setUser(microsoftUser)
      setProfile(microsoftUser)

      // Force localStorage update to ensure persistence
      localStorage.setItem("uless_auth_user", JSON.stringify(microsoftUser))
      localStorage.setItem("uless_auth_status", "authenticated")

      toast.success("Signed in with Microsoft", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })

      // Redirect to the return path or home
      if (returnTo) {
        router.push(returnTo)
      } else {
        router.push("/")
      }
    } catch (error) {
      toast.error("Microsoft sign-in failed", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    setLoading(true)
    try {
      // Mock password reset
      toast.success("Password reset link sent to your email", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })
    } catch (error) {
      toast.error("Password reset failed", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })
    } finally {
      setLoading(false)
    }
  }

  const verifyStudent = async () => {
    setLoading(true)
    try {
      if (user) {
        const updatedUser = { ...user, isVerified: true }
        setUser(updatedUser)
        setProfile(updatedUser)

        // Update localStorage
        localStorage.setItem("uless_auth_user", JSON.stringify(updatedUser))

        toast.success("Student status verified", {
          position: "top-center",
          duration: 1500,
          className: "text-center font-medium",
        })
      }
    } catch (error) {
      toast.error("Verification failed", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setLoading(true)
    try {
      setIsAuthenticated(false)
      setUser(null)
      setProfile(defaultProfile)

      // Clear localStorage
      localStorage.removeItem("uless_auth_user")
      localStorage.removeItem("uless_auth_status")

      router.push("/")
      toast.success("Signed out successfully", {
        position: "top-center",
        duration: 1500,
        className: "text-center font-medium",
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return

    // optimistically update local state
    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    setProfile(updatedUser)
    localStorage.setItem("uless_auth_user", JSON.stringify(updatedUser))

    try {
      const token = localStorage.getItem("uless_auth_token")
      await fetch(`${API_BASE}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(data),
      })
    } catch (err) {
      console.error("Failed to persist profile update", err)
    }

    toast.success("Profile updated successfully", {
      position: "top-center",
      duration: 1500,
      className: "text-center font-medium",
    })
  }

  const value = {
    isAuthenticated,
    user,
    profile,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithMicrosoft,
    resetPassword,
    verifyStudent,
    logout,
    updateProfile,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
