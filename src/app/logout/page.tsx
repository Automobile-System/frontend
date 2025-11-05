"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { LogOut, Loader2 } from 'lucide-react'

const LogoutPage = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include HTTP-only cookies
      })

      if (response.ok) {
        toast.success('Logged out successfully!', {
          description: 'You have been signed out of your account.',
        })
        
        // Redirect to login page after successful logout
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else {
        const error = await response.json()
        toast.error('Logout failed', {
          description: error.message || 'Something went wrong. Please try again.',
        })
      }
    } catch {
      toast.error('Network error', {
        description: 'Unable to connect to the server. Please check your connection.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-red-100 p-4">
              <LogOut className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Logout
          </CardTitle>
          <CardDescription className="text-gray-600">
            Are you sure you want to sign out of your account?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleLogout}
            disabled={loading}
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </>
            )}
          </Button>
          
          <Button
            onClick={() => router.back()}
            disabled={loading}
            variant="outline"
            className="w-full h-12 border-gray-300"
            size="lg"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default LogoutPage