"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    // Mock newsletter subscription
    toast.success("Thanks for subscribing!")
    setEmail("")
  }

  return (
    <div className="text-center text-white">
      <h2 className="mb-3 text-3xl font-bold">Stay Updated</h2>
      <p className="max-w-2xl mx-auto mb-8">
        Subscribe to our newsletter and be the first to know about new deals, exclusive offers, and student discounts.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-md mx-auto space-y-4 md:space-y-0 md:flex-row md:space-x-2"
      >
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 bg-white/20 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
        />
        <Button type="submit" className="h-12 bg-white text-[#5B48D9] hover:bg-white/90">
          Subscribe
        </Button>
      </form>

      <p className="mt-4 text-sm text-white/70">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  )
}
