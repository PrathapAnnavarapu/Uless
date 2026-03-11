"use client"

import { createContext, useState, type ReactNode, useMemo } from "react"
import type { Profile } from "@/types/types"

interface ProfileContextType {
  profile: Profile
  setProfile: (profile: Profile) => void
}

// Default profile data
const defaultProfile: Profile = {
  name: "John Doe",
  email: "john.doe@university.edu",
  university: "University of Technology",
  avatar: null,
}

export const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  setProfile: () => {},
})

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile)

  // Prevent re-renders with memoized value
  const contextValue = useMemo(
    () => ({
      profile,
      setProfile,
    }),
    [profile],
  )

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>
}
