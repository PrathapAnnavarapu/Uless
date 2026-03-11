"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    if (!email.endsWith(".edu")) {
      toast.error("Please use a valid .edu email address")
      return
    }

    // Mock password reset
    setIsSubmitted(true)
    toast.success("Password reset instructions sent to your email")
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#f8faff]">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-sm">
        <Button type="button" variant="ghost" className="p-0 mb-6" onClick={() => router.push("/auth")}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Login
        </Button>

        <h1 className="mb-2 text-2xl font-bold text-[#333]">Forgot Password</h1>
        <p className="mb-6 text-[#666]">
          Enter your .edu email address and we'll send you instructions to reset your password.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#333]">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-white rounded-xl bg-[#5B48D9] hover:bg-[#4a3ac0]">
              Send Reset Instructions
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-6 text-[#333]">
              We've sent password reset instructions to <strong>{email}</strong>. Please check your inbox and follow the
              instructions.
            </p>

            <Button
              type="button"
              className="w-full h-12 text-white rounded-xl bg-[#5B48D9] hover:bg-[#4a3ac0]"
              onClick={() => router.push("/auth")}
            >
              Return to Login
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
