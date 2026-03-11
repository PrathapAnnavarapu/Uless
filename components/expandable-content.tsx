"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react"

interface ExpandableContentProps {
  children: React.ReactNode
  maxHeight?: number
  expandText?: string
  collapseText?: string
  className?: string
  title?: string
  variant?: "default" | "premium"
  icon?: "chevron" | "plus"
}

export function ExpandableContent({
  children,
  maxHeight = 300,
  expandText = "Read More",
  collapseText = "Show Less",
  className = "",
  title,
  variant = "default",
  icon = "chevron",
}: ExpandableContentProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // If title is provided, render as collapsible section with title
  if (title) {
    return (
      <div className={`border rounded-lg overflow-hidden ${className}`}>
        <button
          type="button"
          onClick={toggleExpand}
          className={`flex items-center justify-between w-full p-4 text-left transition-colors ${
            variant === "premium"
              ? "bg-[#5B48D9]/10 hover:bg-[#5B48D9]/15 text-[#333]"
              : "bg-gray-50 hover:bg-gray-100 text-gray-900"
          }`}
        >
          <span className="font-medium">{title}</span>
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-full ${
              variant === "premium" ? "bg-[#5B48D9] text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {icon === "plus" ? (
              isExpanded ? (
                <Minus className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )
            ) : (
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "transform rotate-180" : ""}`} />
            )}
          </div>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="p-4 bg-white">{children}</div>
        </div>
      </div>
    )
  }

  // Original expandable content with gradient and button
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[2000px]" : `max-h-[${maxHeight}px]`
        }`}
        style={{ maxHeight: isExpanded ? "2000px" : `${maxHeight}px` }}
      >
        {children}
      </div>

      {!isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      )}

      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleExpand}
          className="flex items-center gap-1 text-[#5B48D9] border-[#5B48D9]"
        >
          {isExpanded ? (
            <>
              {collapseText}
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              {expandText}
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
