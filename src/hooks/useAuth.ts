"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string | null
  avatar?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Fetch current user from backend
  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const userData = await response.json()

        const mappedUser: User = {
          id: userData.userId ?? userData.id ?? '',
          email: userData.email ?? '',
          firstName: userData.firstName ?? '',
          lastName: userData.lastName ?? '',
          role: Array.isArray(userData.roles)
            ? userData.roles[0] ?? null
            : userData.role ?? null,
          avatar: userData.profileImageUrl ?? userData.avatar ?? undefined,
        }

        if (!mappedUser.id) {
          setUser(null)
          setIsAuthenticated(false)
        } else {
          setUser(mappedUser)
          setIsAuthenticated(true)
        }
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Logout function
  const logout = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setUser(null)
        setIsAuthenticated(false)
        router.push('/login')
        return { success: true }
      } else {
        return { success: false, error: 'Logout failed' }
      }
    } catch (error) {
      console.error('Error during logout:', error)
      return { success: false, error: 'Network error' }
    }
  }, [router])

  // Get dashboard URL based on user role
  const getDashboardUrl = useCallback(() => {
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
  }, [user])

  // Initialize auth state on mount
  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return {
    user,
    isLoading,
    isAuthenticated,
    logout,
    getDashboardUrl,
    refreshUser: fetchUser,
  }
}
