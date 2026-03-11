"use client"

import type React from "react"

interface VerificationRequiredProps {
  children: React.ReactNode
}

export function VerificationRequired({ children }: VerificationRequiredProps) {
  // This component now just passes through its children
  // The verification logic is handled directly in the buttons that use this component
  return <>{children}</>
}
