"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function StudentVerificationPage() {
  // const router = useRouter()
  // const { profile, setProfile } = useContext(ProfileContext)
  // const { isAuthenticated, verifyEmail } = useAuth()
  // const [currentStep, setCurrentStep] = useState(1)
  // const [verificationCode, setVerificationCode] = useState("")
  // const [emailSent, setEmailSent] = useState(false)
  // const [emailVerified, setEmailVerified] = useState(false)
  // const [studentIdFront, setStudentIdFront] = useState<File | null>(null)
  // const [studentIdBack, setStudentIdBack] = useState<File | null>(null)
  // const [studentNumber, setStudentNumber] = useState("")
  // const [expirationDate, setExpirationDate] = useState("")
  // const [isSubmitting, setIsSubmitting] = useState(false)
  // const [isVerified, setIsVerified] = useState(false)
  // const [frontPreview, setFrontPreview] = useState<string | null>(null)
  // const [backPreview, setBackPreview] = useState<string | null>(null)

  // // Check if user is already verified
  // useEffect(() => {
  //   if (profile.isVerified) {
  //     setIsVerified(true)
  //   }
  // }, [profile.isVerified])

  // // Redirect to login if not authenticated
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     toast.error("Please log in to verify your student status")
  //     router.push("/auth")
  //   }
  // }, [isAuthenticated, router])

  // const handleSendVerificationEmail = () => {
  //   // Check if email is a valid .edu email
  //   if (!verifyEmail(profile.email)) {
  //     toast.error("Please use a valid .edu email address for verification")
  //     return
  //   }

  //   // Mock sending verification email
  //   setEmailSent(true)
  //   toast.success(`Verification code sent to ${profile.email}`)
  // }

  // const handleVerifyCode = () => {
  //   if (!verificationCode || verificationCode.length < 6) {
  //     toast.error("Please enter a valid verification code")
  //     return
  //   }

  //   // Mock verification code check - in a real app, this would validate against a server
  //   if (verificationCode === "123456") {
  //     setEmailVerified(true)
  //     setCurrentStep(2)
  //     toast.success("Email verified successfully")
  //   } else {
  //     toast.error("Invalid verification code. Please try again.")
  //   }
  // }

  // const handleFrontIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     setStudentIdFront(file)
  //     // Create preview URL
  //     const previewUrl = URL.createObjectURL(file)
  //     setFrontPreview(previewUrl)
  //   }
  // }

  // const handleBackIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     setStudentIdBack(file)
  //     // Create preview URL
  //     const previewUrl = URL.createObjectURL(file)
  //     setBackPreview(previewUrl)
  //   }
  // }

  // const handleNextStep = () => {
  //   if (currentStep === 2) {
  //     // Validate ID uploads before proceeding
  //     if (!studentIdFront || !studentIdBack) {
  //       toast.error("Please upload both sides of your student ID")
  //       return
  //     }
  //     setCurrentStep(3)
  //   }
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)

  //   if (!studentNumber) {
  //     toast.error("Please enter your student ID number")
  //     setIsSubmitting(false)
  //     return
  //   }

  //   if (!expirationDate) {
  //     toast.error("Please enter your ID expiration date")
  //     setIsSubmitting(false)
  //     return
  //   }

  //   // Mock verification process
  //   setTimeout(() => {
  //     setIsSubmitting(false)
  //     setIsVerified(true)

  //     // Update profile context
  //     setProfile({
  //       ...profile,
  //       isVerified: true,
  //     })

  //     toast.success("Verification submitted successfully")
  //   }, 2000)
  // }

  // // Clean up object URLs when component unmounts
  // useEffect(() => {
  //   return () => {
  //     if (frontPreview) URL.revokeObjectURL(frontPreview)
  //     if (backPreview) URL.revokeObjectURL(backPreview)
  //   }
  // }, [frontPreview, backPreview])

  // if (!isAuthenticated) {
  //   return null // Will redirect to auth page via useEffect
  // }

  const [verificationMethod, setVerificationMethod] = useState<"email" | "id">("email")
  const [isUploading, setIsUploading] = useState(false)
  const { verifyStudent } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      // In a real app, we would upload the file or verify the email
      // For now, we'll just simulate a delay and then verify the user
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await verifyStudent()
    } catch (error) {
      toast.error("Verification failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#f8faff] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Student Verification</CardTitle>
          <CardDescription className="text-center">
            Verify your student status to access exclusive student deals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <RadioGroup
              value={verificationMethod}
              onValueChange={(value) => setVerificationMethod(value as "email" | "id")}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email" className="flex-1 cursor-pointer">
                  Verify with university email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="id" id="id" />
                <Label htmlFor="id" className="flex-1 cursor-pointer">
                  Upload student ID
                </Label>
              </div>
            </RadioGroup>

            {verificationMethod === "email" ? (
              <div className="space-y-2">
                <Label htmlFor="university-email">University Email</Label>
                <Input id="university-email" type="email" placeholder="your.name@university.edu" required />
                <p className="text-xs text-gray-500">
                  We'll send a verification link to your university email address.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="student-id">Student ID Card</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50">
                  <p className="text-sm text-gray-500">Click to upload or drag and drop your student ID</p>
                  <Input id="student-id" type="file" className="hidden" accept="image/*" required />
                </div>
                <p className="text-xs text-gray-500">
                  Please upload a clear image of your student ID card. We'll verify your student status within 24 hours.
                </p>
              </div>
            )}

            <Button type="submit" className="w-full bg-[#5B48D9] hover:bg-[#4a3ac0]" disabled={isUploading}>
              {isUploading ? "Verifying..." : "Verify Student Status"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => router.push("/")}>
            I'll do this later
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
