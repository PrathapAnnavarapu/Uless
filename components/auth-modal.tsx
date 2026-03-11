"use client"

import { useRouter } from "next/navigation"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter()

  // If modal is opened, redirect to auth page instead
  if (isOpen) {
    router.push("/auth")
    return null
  }

  return null // Modal is no longer used
}
