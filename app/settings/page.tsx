"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bell, Moon, Shield, Globe, CreditCard, HelpCircle, Smartphone, Key } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  const pathname = usePathname()

  const handleChangePassword = () => {
    router.push("/settings/change-password")
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f8faff]">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button type="button" variant="ghost" className="p-0 mr-4" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-[#333]">Settings</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left font-medium ${activeTab === "general" ? "bg-[#5B48D9]/10 text-[#5B48D9]" : "text-gray-700"}`}
                    onClick={() => setActiveTab("general")}
                  >
                    <Globe className="w-5 h-5 mr-3" />
                    General
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left font-medium ${activeTab === "notifications" ? "bg-[#5B48D9]/10 text-[#5B48D9]" : "text-gray-700"}`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="w-5 h-5 mr-3" />
                    Notifications
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left font-medium ${activeTab === "appearance" ? "bg-[#5B48D9]/10 text-[#5B48D9]" : "text-gray-700"}`}
                    onClick={() => setActiveTab("appearance")}
                  >
                    <Moon className="w-5 h-5 mr-3" />
                    Appearance
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left font-medium ${activeTab === "security" ? "bg-[#5B48D9]/10 text-[#5B48D9]" : "text-gray-700"}`}
                    onClick={() => setActiveTab("security")}
                  >
                    <Shield className="w-5 h-5 mr-3" />
                    Security
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left font-medium ${activeTab === "billing" ? "bg-[#5B48D9]/10 text-[#5B48D9]" : "text-gray-700"}`}
                    onClick={() => setActiveTab("billing")}
                  >
                    <CreditCard className="w-5 h-5 mr-3" />
                    Billing
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left font-medium ${activeTab === "help" ? "bg-[#5B48D9]/10 text-[#5B48D9]" : "text-gray-700"}`}
                    onClick={() => setActiveTab("help")}
                  >
                    <HelpCircle className="w-5 h-5 mr-3" />
                    Help & Support
                  </Button>
                  <Link
                    href="/settings/api-keys"
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent",
                      pathname === "/settings/api-keys" && "bg-accent",
                    )}
                  >
                    <Key className="w-4 h-4" />
                    <span>API Keys</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="general" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Manage your general account settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Language & Region</h3>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 mr-3 text-[#5B48D9]" />
                          <div>
                            <p className="font-medium">Language</p>
                            <p className="text-sm text-gray-500">Select your preferred language</p>
                          </div>
                        </div>
                        <Button variant="outline">English (US)</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-3 text-[#5B48D9]" />
                          <div>
                            <p className="font-medium">Currency</p>
                            <p className="text-sm text-gray-500">Select your preferred currency</p>
                          </div>
                        </div>
                        <Button variant="outline">USD ($)</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Device Settings</h3>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <Smartphone className="w-5 h-5 mr-3 text-[#5B48D9]" />
                          <div>
                            <p className="font-medium">Connected Devices</p>
                            <p className="text-sm text-gray-500">Manage your connected devices</p>
                          </div>
                        </div>
                        <Button variant="outline">Manage</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Control how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Deal Alerts</p>
                          <p className="text-sm text-gray-500">Get notified about new student deals</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Expiring Deals</p>
                          <p className="text-sm text-gray-500">Get notified about deals that are about to expire</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Personalized Recommendations</p>
                          <p className="text-sm text-gray-500">Get deals based on your interests</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Push Notifications</h3>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Browser Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Mobile Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications on your mobile device</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>Customize how Uless looks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme</h3>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:border-[#5B48D9]">
                          <div className="w-full h-24 mb-2 bg-white border rounded-md"></div>
                          <span className="text-sm font-medium">Light</span>
                        </div>

                        <div className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:border-[#5B48D9]">
                          <div className="w-full h-24 mb-2 bg-gray-900 border rounded-md"></div>
                          <span className="text-sm font-medium">Dark</span>
                        </div>

                        <div className="flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:border-[#5B48D9]">
                          <div className="w-full h-24 mb-2 bg-gradient-to-b from-white to-gray-900 border rounded-md"></div>
                          <span className="text-sm font-medium">System</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Display Options</h3>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-gray-500">Switch between light and dark mode</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Reduced Motion</p>
                          <p className="text-sm text-gray-500">Minimize animations</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">High Contrast</p>
                          <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Security</h3>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 mr-3 text-[#5B48D9]" />
                          <div>
                            <p className="font-medium">Change Password</p>
                            <p className="text-sm text-gray-500">Update your password regularly for better security</p>
                          </div>
                        </div>
                        <Button variant="outline" onClick={handleChangePassword}>
                          Change
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 mr-3 text-[#5B48D9]" />
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          </div>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Login Sessions</h3>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-gray-500">Chrome on Windows • New York, USA</p>
                          </div>
                          <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                            Active Now
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">Previous Session</p>
                            <p className="text-sm text-gray-500">Safari on iPhone • New York, USA</p>
                          </div>
                          <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">
                            2 days ago
                          </span>
                        </div>

                        <Button variant="outline" className="w-full mt-2">
                          Sign Out All Other Devices
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Settings</CardTitle>
                    <CardDescription>Manage your payment methods and billing information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 text-center bg-gray-50 rounded-lg">
                      <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="mb-2 text-lg font-medium">No Payment Methods</h3>
                      <p className="mb-4 text-gray-500">You haven't added any payment methods yet.</p>
                      <Button className="bg-[#5B48D9] hover:bg-[#4a3ac0] text-white">Add Payment Method</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="help" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Help & Support</CardTitle>
                    <CardDescription>Get help with your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Support Resources</h3>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="p-4 border rounded-lg">
                          <h4 className="mb-2 font-medium">Help Center</h4>
                          <p className="mb-4 text-sm text-gray-500">
                            Browse our knowledge base for answers to common questions
                          </p>
                          <Button variant="outline" className="w-full">
                            Visit Help Center
                          </Button>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h4 className="mb-2 font-medium">Contact Support</h4>
                          <p className="mb-4 text-sm text-gray-500">
                            Get in touch with our support team for personalized help
                          </p>
                          <Button variant="outline" className="w-full">
                            Contact Support
                          </Button>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h4 className="mb-2 font-medium">FAQs</h4>
                          <p className="mb-4 text-sm text-gray-500">Find answers to frequently asked questions</p>
                          <Button variant="outline" className="w-full">
                            View FAQs
                          </Button>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <h4 className="mb-2 font-medium">Feedback</h4>
                          <p className="mb-4 text-sm text-gray-500">Share your thoughts and suggestions with us</p>
                          <Button variant="outline" className="w-full">
                            Provide Feedback
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
