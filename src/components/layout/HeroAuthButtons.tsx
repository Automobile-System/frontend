"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { User } from "@/hooks/useAuth"

interface HeroAuthButtonsProps {
  user: User | null
}

export function HeroAuthButtons({ user }: HeroAuthButtonsProps) {
  const router = useRouter()

  const getDashboardUrl = () => {
    if (!user) return '/'
    
    switch (user.role?.toLowerCase()) {
      case 'customer':
        return '/customer/dashboard'
      case 'admin':
        return '/admin/dashboard'
      case 'manager':
        return '/manager/dashboard'
      case 'employee':
        return '/employee/dashboard'
      default:
        return '/'
    }
  }

  const handleDashboard = () => {
    const url = getDashboardUrl()
    console.log('Navigating to:', url, 'User role:', user?.role)
    router.push(url)
  }

  const handleLogin = () => {
    router.push('/login')
  }

  const handleSignup = () => {
    router.push('/signup')
  }

  const handleBooking = () => {
    router.push('/booking')
  }

  if (!user) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-600">
        <Button 
          size="lg"
          onClick={handleLogin}
          className="btn-accent text-black px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-accent-glow group"
        >
          LOG IN
        </Button>
        
        <Button 
          variant="outline"
          size="lg"
          onClick={handleSignup}
          className="btn-accent-outline backdrop-blur-sm px-8 py-4 text-lg font-medium transition-all duration-300"
        >
          SIGN UP
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-600">
      <Button 
        size="lg"
        onClick={handleDashboard}
        className="btn-accent text-black px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-accent-glow group"
      >
        GO TO DASHBOARD
      </Button>
      
      <Button 
        variant="outline"
        size="lg"
        onClick={handleBooking}
        className="btn-accent-outline backdrop-blur-sm px-8 py-4 text-lg font-medium transition-all duration-300"
      >
        BOOK SERVICE
      </Button>
    </div>
  )
}
