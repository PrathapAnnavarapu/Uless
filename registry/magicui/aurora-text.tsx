"use client"

import type React from "react"
import { motion } from "framer-motion"

interface AuroraTextProps {
  children: React.ReactNode
  className?: string
  baseColor?: string
  glowColor?: string
  duration?: number
}

export function AuroraText({
  children,
  className = "",
  baseColor = "#5B48D9",
  glowColor = "#6366F1",
  duration = 2.5,
}: AuroraTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={{
        color: baseColor,
        textShadow: `0 0 8px ${glowColor}`,
      }}
      transition={{ duration }}
      style={{
        color: baseColor,
      }}
    >
      {children}
    </motion.span>
  )
}
