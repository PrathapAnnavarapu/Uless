"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Eye, EyeOff, Sparkles } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") || "/"

  const { signInWithGoogle, signInWithMicrosoft, signIn, signUp, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Animation states
  const [showContainer, setShowContainer] = useState(false)
  const [showTabs, setShowTabs] = useState(false)
  const [showFields, setShowFields] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showSocialButtons, setShowSocialButtons] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Signup form state
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // If already authenticated, redirect to the return path
      router.push(returnTo)
    }
  }, [isAuthenticated, router, returnTo])

  // Trigger animations sequentially
  useEffect(() => {
    setIsLoaded(true)

    const timer1 = setTimeout(() => setShowContainer(true), 100)
    const timer2 = setTimeout(() => setShowTabs(true), 600)
    const timer3 = setTimeout(() => setShowFields(true), 1100)
    const timer4 = setTimeout(() => setShowButton(true), 1600)
    const timer5 = setTimeout(() => setShowSocialButtons(true), 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [])

  // Update the handleLogin function to use the auth context properly
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields")
      return
    }

    // Use the signIn function from auth context with returnTo path
    await signIn(loginEmail, loginPassword, returnTo)
  }

  // Update the handleGoogleSignIn function
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(returnTo)
    } catch (error) {
      toast.error("Google sign-in failed")
    }
  }

  // Update the handleMicrosoftSignIn function
  const handleMicrosoftSignIn = async () => {
    try {
      await signInWithMicrosoft(returnTo)
    } catch (error) {
      toast.error("Microsoft sign-in failed")
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
      toast.error("Please fill in all fields")
      return
    }

    if (!signupEmail.endsWith(".edu")) {
      toast.error("Please use a valid .edu email address")
      return
    }

    if (signupPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    if (signupPassword !== signupConfirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    // Use the signUp function from auth context with returnTo path, including the name field
    await signUp(signupEmail, signupPassword, signupName, returnTo)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#f8faff] overflow-auto">
      <style jsx global>{`
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromBottom {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes revealBox {
          0% {
            width: 0%;
            left: 0;
          }
          50% {
            width: 100%;
            left: 0;
          }
          100% {
            width: 100%;
            left: 100%;
          }
        }
        
        .reveal-container {
          position: relative;
          overflow: hidden;
        }
        
        .reveal-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #5B48D9;
          animation: revealBox 1.2s cubic-bezier(0.77, 0, 0.18, 1) forwards;
          z-index: 10;
        }
        
        .slide-in-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }
        
        .slide-in-right {
          animation: slideInFromRight 0.8s ease-out forwards;
        }
        
        .slide-in-bottom {
          animation: slideInFromBottom 0.8s ease-out forwards;
        }
        
        .hidden-element {
          opacity: 0;
        }
        
        .visible-element {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>

      <div className={`w-full max-w-md ${isLoaded ? "reveal-container" : "hidden-element"}`}>
        <div className={`p-6 bg-white rounded-2xl shadow-sm ${showContainer ? "visible-element" : "hidden-element"}`}>
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-2xl font-bold text-center text-[#333]">
              Uless <span className="text-[#5B48D9]">Student Deals</span>
            </h1>
          </div>

          <div className={showTabs ? "slide-in-bottom" : "hidden-element"}>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <div className="max-h-[60vh] overflow-y-auto px-1 -mx-1">
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className={`space-y-2 ${showFields ? "slide-in-left" : "hidden-element"}`}>
                      <label htmlFor="email" className="text-sm font-medium text-[#333]">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@university.edu"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className={`space-y-2 ${showFields ? "slide-in-right" : "hidden-element"}`}>
                      <label htmlFor="password" className="text-sm font-medium text-[#333]">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="h-12 rounded-xl pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className={showFields ? "slide-in-left" : "hidden-element"}>
                      <Button
                        type="button"
                        variant="link"
                        className="p-0 text-[#5B48D9]"
                        onClick={() => router.push("/forgot-password")}
                      >
                        Forgot Password?
                      </Button>
                    </div>

                    <div className={showButton ? "slide-in-bottom" : "hidden-element"}>
                      <Button
                        type="submit"
                        className="w-full h-12 text-white rounded-xl bg-[#5B48D9] hover:bg-[#4a3ac0] flex items-center justify-center gap-2"
                      >
                        <Sparkles size={18} />
                        Login for Student Deals
                      </Button>
                    </div>

                    {/* Social login options */}
                    <div className={showSocialButtons ? "slide-in-bottom space-y-4" : "hidden-element"}>
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative px-4 text-sm text-gray-500 bg-white">Or continue with</div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                          onClick={handleGoogleSignIn}
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                          Google
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                          onClick={handleMicrosoftSignIn}
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 23 23">
                            <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                            <path fill="#f35325" d="M1 1h10v10H1z" />
                            <path fill="#81bc06" d="M12 1h10v10H12z" />
                            <path fill="#05a6f0" d="M1 12h10v10H1z" />
                            <path fill="#ffba08" d="M12 12h10v10H12z" />
                          </svg>
                          Microsoft
                        </Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className={`space-y-2 ${showFields ? "slide-in-left" : "hidden-element"}`}>
                      <label htmlFor="signup-name" className="text-sm font-medium text-[#333]">
                        Full Name
                      </label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className={`space-y-2 ${showFields ? "slide-in-right" : "hidden-element"}`}>
                      <label htmlFor="signup-email" className="text-sm font-medium text-[#333]">
                        Student Email (.edu required)
                      </label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.email@university.edu"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className={`space-y-2 ${showFields ? "slide-in-left" : "hidden-element"}`}>
                      <label htmlFor="signup-password" className="text-sm font-medium text-[#333]">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="h-12 rounded-xl pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className={`space-y-2 ${showFields ? "slide-in-right" : "hidden-element"}`}>
                      <label htmlFor="signup-confirm-password" className="text-sm font-medium text-[#333]">
                        Confirm Password
                      </label>
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className={showButton ? "slide-in-bottom" : "hidden-element"}>
                      <Button
                        type="submit"
                        className="w-full h-12 text-white rounded-xl bg-[#5B48D9] hover:bg-[#4a3ac0] flex items-center justify-center gap-2"
                      >
                        <Sparkles size={18} />
                        Create Student Account
                      </Button>
                    </div>

                    {/* Social signup options */}
                    <div className={showSocialButtons ? "slide-in-bottom space-y-4" : "hidden-element"}>
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative px-4 text-sm text-gray-500 bg-white">Or sign up with</div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                          onClick={handleGoogleSignIn}
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                          Google
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                          onClick={handleMicrosoftSignIn}
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 23 23">
                            <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                            <path fill="#f35325" d="M1 1h10v10H1z" />
                            <path fill="#81bc06" d="M12 1h10v10H12z" />
                            <path fill="#05a6f0" d="M1 12h10v10H1z" />
                            <path fill="#ffba08" d="M12 12h10v10H12z" />
                          </svg>
                          Microsoft
                        </Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
