"use client"

import { createContext, type ReactNode } from "react"

// Create a context to provide the Uless typography functionality
const UlessTypographyContext = createContext<boolean>(true)

// Replace the entire UlessTypography component with this minimal version
export function UlessTypography({ children }: { children: ReactNode }) {
  return <>{children}</>
}

// Replace the useUlessTypography hook with a dummy function
export const useUlessTypography = () => true
