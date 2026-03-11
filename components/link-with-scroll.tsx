"use client"

import Link from "next/link"
import type { LinkProps } from "next/link"
import type { ReactNode } from "react"
import { scrollToTop } from "@/utils/scroll-utils"

interface LinkWithScrollProps extends LinkProps {
  children: ReactNode
  className?: string
}

export function LinkWithScroll({ href, children, className, ...props }: LinkWithScrollProps) {
  const handleClick = () => {
    // Scroll to top when navigating
    scrollToTop()
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
