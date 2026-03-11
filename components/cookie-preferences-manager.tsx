"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export function CookiePreferencesManager() {
  const [preferences, setPreferences] = useState({
    necessary: true, // Always enabled
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    // Load saved preferences
    const savedConsent = localStorage.getItem("cookie-consent")
    if (savedConsent === "all") {
      setPreferences({
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true,
      })
    }
  }, [])

  const handleSave = () => {
    // If all are enabled, save as "all"
    if (preferences.analytics && preferences.marketing && preferences.preferences) {
      localStorage.setItem("cookie-consent", "all")
    }
    // If only necessary is enabled, save as "necessary"
    else if (!preferences.analytics && !preferences.marketing && !preferences.preferences) {
      localStorage.setItem("cookie-consent", "necessary")
    }
    // Otherwise save as "custom"
    else {
      localStorage.setItem("cookie-consent", "custom")
      localStorage.setItem("cookie-preferences", JSON.stringify(preferences))
    }

    toast.success("Your cookie preferences have been saved")
  }

  const acceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    })
    localStorage.setItem("cookie-consent", "all")
    toast.success("All cookies accepted")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-medium">Necessary Cookies</h3>
          <p className="text-sm text-gray-500">
            These cookies are required for the website to function and cannot be disabled.
          </p>
        </div>
        <Switch checked disabled />
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-medium">Analytics Cookies</h3>
          <p className="text-sm text-gray-500">
            These cookies help us understand how visitors interact with our website.
          </p>
        </div>
        <Switch
          checked={preferences.analytics}
          onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
          id="analytics"
        />
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-medium">Marketing Cookies</h3>
          <p className="text-sm text-gray-500">
            These cookies are used to track visitors across websites to display relevant advertisements.
          </p>
        </div>
        <Switch
          checked={preferences.marketing}
          onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
          id="marketing"
        />
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-medium">Preference Cookies</h3>
          <p className="text-sm text-gray-500">These cookies enable personalized features and functionality.</p>
        </div>
        <Switch
          checked={preferences.preferences}
          onCheckedChange={(checked) => setPreferences({ ...preferences, preferences: checked })}
          id="preferences"
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={acceptAll}>
          Accept All
        </Button>
        <Button onClick={handleSave} className="bg-[#5B48D9] hover:bg-[#4a3ac0]">
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
