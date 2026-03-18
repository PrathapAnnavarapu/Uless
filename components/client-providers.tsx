"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import { AuthProvider } from "@/contexts/auth-context"
import { DealsProvider } from "@/contexts/deals-context"
import { SavedDealsProvider } from "@/contexts/saved-deals-context"
import { BrandsProvider } from "@/contexts/brand-context"

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <DealsProvider>
          <SavedDealsProvider>
            <BrandsProvider>
            {children}
            </BrandsProvider>
            <Toaster position="top-center" />
          </SavedDealsProvider>
        </DealsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
