"use client"

import { useState } from "react"
import CustomerLayout from "@/components/layout/customer/CustomerLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell, Lock, Eye, Mail, Shield } from "lucide-react"
import { toast } from "sonner"

export default function CustomerSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [serviceReminders, setServiceReminders] = useState(true)
  const [promotionalEmails, setPromotionalEmails] = useState(false)

  const handleSaveSettings = () => {
    // TODO: Implement API call to save settings
    toast.success("Settings saved successfully", {
      description: "Your preferences have been updated.",
    })
  }

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose how you want to receive updates and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates about your bookings via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-gray-500">
                  Get text messages for important updates
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="service-reminders">Service Reminders</Label>
                <p className="text-sm text-gray-500">
                  Receive reminders for upcoming vehicle maintenance
                </p>
              </div>
              <Switch
                id="service-reminders"
                checked={serviceReminders}
                onCheckedChange={setServiceReminders}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotional-emails">Promotional Emails</Label>
                <p className="text-sm text-gray-500">
                  Receive special offers and promotions
                </p>
              </div>
              <Switch
                id="promotional-emails"
                checked={promotionalEmails}
                onCheckedChange={setPromotionalEmails}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Manage your account security and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Eye className="mr-2 h-4 w-4" />
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Update Email Address
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveSettings}
            className="bg-brand hover:bg-brand/90"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </CustomerLayout>
  )
}
