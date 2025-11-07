import { cookies } from 'next/headers'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  roles?: string[]  // Backend returns roles array
  avatar?: string
}

/**
 * Server-side function to get the current user from the backend
 * Uses cookies to authenticate the request
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')

    if (!accessToken) {
      return null
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `accessToken=${accessToken.value}`,
      },
      credentials: 'include',
      cache: 'no-store', // Don't cache authentication data
    })

    if (!response.ok) {
      return null
    }

    const userData = await response.json()
    
    // Backend returns 'roles' as an array, convert to single 'role' string
    // Take the first role from the roles array
    if (userData.roles && Array.isArray(userData.roles) && userData.roles.length > 0) {
      userData.role = userData.roles[0]
    }
    
    // Map userId to id for consistency
    if (userData.userId && !userData.id) {
      userData.id = userData.userId
    }
    
    console.log('getCurrentUser - Raw data:', userData)
    console.log('getCurrentUser - Mapped role:', userData.role)
    
    return userData
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

/**
 * Get the dashboard URL based on user role
 */
export function getDashboardUrl(role: string): string {
  switch (role?.toLowerCase()) {
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

/**
 * Check if user is authenticated (server-side)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}
