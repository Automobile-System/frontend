"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { User } from "@/hooks/useAuth"

interface HeroAuthButtonsProps {
  user: User | null
}

export function HeroAuthButtons({ user }: HeroAuthButtonsProps) {
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

  if (!user) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-600">
        <Button 
          size="lg"
          asChild
          className="btn-accent text-black px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-accent-glow group"
        >
          <Link href="/login">LOG IN</Link>
        </Button>
        
        <Button 
          variant="outline"
          size="lg"
          asChild
          className="btn-accent-outline backdrop-blur-sm px-8 py-4 text-lg font-medium transition-all duration-300"
        >
          <Link href="/signup">SIGN UP</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-600">
      <Button 
        size="lg"
        asChild
        className="btn-accent text-black px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-accent-glow group"
      >
        <Link href={getDashboardUrl()}>GO TO DASHBOARD</Link>
      </Button>
      
      <Button 
        variant="outline"
        size="lg"
        asChild
        className="btn-accent-outline backdrop-blur-sm px-8 py-4 text-lg font-medium transition-all duration-300"
      >
        <Link href="/booking">BOOK SERVICE</Link>
      </Button>
    </div>
  )
}
