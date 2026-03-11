"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface InteractiveHoverButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  bgColor?: string
  hoverColor?: string
  textColor?: string
}

export function InteractiveHoverButton({
  children,
  className = "",
  onClick,
  bgColor = "#5B48D9",
  hoverColor = "#4a3ac0",
  textColor = "white",
}: InteractiveHoverButtonProps) {
  return (
    <motion.button
      className={cn("relative overflow-hidden rounded-xl px-4 py-2 font-medium transition-colors", className)}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      whileHover={{ backgroundColor: hoverColor }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
