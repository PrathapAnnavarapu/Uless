// Types
export type User = {
  id: string
  email: string
  name?: string
  avatar?: string
  isVerified?: boolean
}

// Mock user database
const MOCK_USERS = [
  {
    id: "user-1",
    email: "demo@student.edu",
    password: "password123",
    name: "Demo Student",
    avatar: "/placeholder.svg?height=40&width=40&text=DS",
    isVerified: true,
  },
]

const mockUser = {
  id: "mock-user",
  name: "John Doe",
  email: "john.doe@example.com",
  image: "/images/avatar.jpg",
  title: "Software Developer",
  company: "Acme Corp",
}

// Helper functions
const saveToStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

const getFromStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }
  return null
}

// Auth functions
export const mockAuth = {
  // Get current user
  getUser: (): User | null => {
    return getFromStorage("currentUser")
  },

  // Sign in
  signIn: (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

        if (user) {
          const { password, ...userWithoutPassword } = user
          saveToStorage("currentUser", userWithoutPassword)
          resolve({ user: userWithoutPassword, error: null })
        } else {
          resolve({ user: null, error: "Invalid email or password" })
        }
      }, 300) // Small delay for realism
    })
  },

  // Sign up
  signUp: (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (MOCK_USERS.some((u) => u.email === email)) {
          resolve({ user: null, error: "Email already in use" })
          return
        }

        const newUser = {
          id: `user-${Date.now()}`,
          email,
          password,
          name: email.split("@")[0],
          avatar: `/placeholder.svg?height=40&width=40&text=${email[0].toUpperCase()}`,
          isVerified: false,
        }

        MOCK_USERS.push(newUser)
        const { password: _, ...userWithoutPassword } = newUser
        saveToStorage("currentUser", userWithoutPassword)

        resolve({ user: userWithoutPassword, error: null })
      }, 300)
    })
  },

  // Sign out
  signOut: (): Promise<{ error: string | null }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("currentUser")
        }
        resolve({ error: null })
      }, 100)
    })
  },

  // OAuth sign in (mock)
  signInWithProvider: (provider: string): Promise<{ user: User | null; error: string | null }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: `${provider}-user-${Date.now()}`,
          email: `${provider.toLowerCase()}.user@student.edu`,
          name: `${provider} User`,
          avatar: `/placeholder.svg?height=40&width=40&text=${provider[0].toUpperCase()}`,
          isVerified: true,
        }

        saveToStorage("currentUser", newUser)
        resolve({ user: newUser, error: null })
      }, 300)
    })
  },

  // Reset password (mock)
  resetPassword: (email: string): Promise<{ error: string | null }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = MOCK_USERS.find((u) => u.email === email)
        if (user) {
          resolve({ error: null })
        } else {
          resolve({ error: "Email not found" })
        }
      }, 300)
    })
  },

  // Verify student status
  verifyStudent: (): Promise<{ success: boolean; error: string | null }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = getFromStorage("currentUser")
        if (user) {
          user.isVerified = true
          saveToStorage("currentUser", user)
          resolve({ success: true, error: null })
        } else {
          resolve({ success: false, error: "Not logged in" })
        }
      }, 300)
    })
  },

  // Check if user is verified
  isVerified: (): boolean => {
    const user = getFromStorage("currentUser")
    return user?.isVerified || false
  },
}

// Ensure the getUser function properly retrieves user data
export const getUser = () => {
  if (typeof window === "undefined") return null

  // Try to get from localStorage first
  const storedUser = localStorage.getItem("uless_auth_user")
  if (storedUser) {
    return JSON.parse(storedUser)
  }

  // Fall back to the mock user if needed
  return mockUser
}

// Update the signIn function to store user data
export const signIn = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  // For demo purposes, any email/password combination works
  const user = {
    ...mockUser,
    email: email,
    name: email
      .split("@")[0]
      .replace(/[.]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
  }

  // Store in localStorage
  localStorage.setItem("uless_auth_user", JSON.stringify(user))
  localStorage.setItem("uless_auth_status", "authenticated")

  return { user, error: null }
}

// Update the signOut function to clear localStorage
export const signOut = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  localStorage.removeItem("uless_auth_user")
  localStorage.removeItem("uless_auth_status")
  return { error: null }
}

// Add proper handling for Google and Microsoft sign-ins
const signInWithProvider = async (provider: string) => {
  // Create a mock user for the provider
  const user = {
    id: `${provider}-user-${Date.now()}`,
    name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
    email: `${provider}.user@student.edu`,
    avatar: `/placeholder.svg?height=40&width=40&text=${provider.charAt(0).toUpperCase()}`,
    isVerified: true,
  }

  // Store the user in localStorage
  localStorage.setItem("uless_auth_user", JSON.stringify(user))
  localStorage.setItem("uless_auth_status", "authenticated")

  return { user, error: null }
}
