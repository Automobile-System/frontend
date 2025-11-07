"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User as UserType } from '@/hooks/useAuth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User as UserIcon, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  ChevronDown,
  Loader2 
} from 'lucide-react'
import { toast } from 'sonner'

interface UserMenuProps {
  className?: string
  initialUser: UserType
}

export function UserMenu({ className, initialUser }: UserMenuProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [user, setUser] = useState<UserType>(initialUser)

  useEffect(() => {
    setUser(initialUser)
  }, [initialUser])

  const getDashboardUrl = () => {
    if (!user) return '/'
    console.log("User role:", user.role)
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

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        toast.success('Logged out successfully', {
          description: 'You have been signed out of your account.',
        })
        router.push('/login')
        router.refresh() // Refresh to update server components
      } else {
        toast.error('Logout failed', {
          description: 'Please try again.',
        })
      }
    } catch {
      toast.error('Error', {
        description: 'An unexpected error occurred.',
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleDashboard = () => {
    const url = getDashboardUrl()
    console.log('UserMenu: Navigating to dashboard:', url, 'User:', user)
    router.push(url)
  }

  const handleProfile = () => {
    const role = user?.role?.toLowerCase()
    let url = '/profile'
    switch (role) {
      case 'customer':
        url = '/customer/profile'
        break
      case 'admin':
        url = '/admin/profile'
        break
      case 'manager':
        url = '/manager/profile'
        break
      case 'employee':
        url = '/employee/profile'
        break
    }
    console.log('UserMenu: Navigating to profile:', url, 'Role:', role)
    router.push(url)
  }

  if (!user) return null

  const userInitials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
  const userName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 transition-colors rounded-lg border border-transparent hover:border-gray-200"
          >
            <Avatar className="h-9 w-9 border-2 border-brand shadow-sm">
              <AvatarImage src={user.avatar} alt={userName} />
              <AvatarFallback className="bg-brand text-white font-semibold text-sm">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-900">
                {userName}
              </span>
              <span className="text-xs text-gray-500 capitalize font-medium">
                {user.role}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 shadow-xl border-gray-200 bg-white">
          <DropdownMenuLabel className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-brand">
                <AvatarImage src={user.avatar} alt={userName} />
                <AvatarFallback className="bg-brand text-white font-bold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-semibold leading-none text-gray-900">{userName}</p>
                <p className="text-xs leading-none text-gray-500 mt-1">
                  {user.email}
                </p>
                <span className="text-xs text-brand font-medium mt-1 capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem 
            onClick={handleDashboard}
            className="cursor-pointer py-3 hover:bg-gray-50 focus:bg-gray-50 text-gray-900"
          >
            <LayoutDashboard className="mr-3 h-5 w-5 text-brand" />
            <span className="font-medium text-gray-900">Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleProfile}
            className="cursor-pointer py-3 hover:bg-gray-50 focus:bg-gray-50 text-gray-900"
          >
            <UserIcon className="mr-3 h-5 w-5 text-brand" />
            <span className="font-medium text-gray-900">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => router.push(`/${user.role?.toLowerCase()}/settings`)}
            className="cursor-pointer py-3 hover:bg-gray-50 focus:bg-gray-50 text-gray-900"
          >
            <Settings className="mr-3 h-5 w-5 text-brand" />
            <span className="font-medium text-gray-900">Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="cursor-pointer py-3 text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 font-medium"
          >
            {isLoggingOut ? (
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            ) : (
              <LogOut className="mr-3 h-5 w-5" />
            )}
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
