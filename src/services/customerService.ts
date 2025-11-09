import { cookies } from 'next/headers'

interface DashboardOverview {
  activeServices: number
  completedServices: number
  upcomingAppointments: number
  activeProjects: number
  completedProjects: number
}

interface ServiceFrequency {
  month: string
  jobs: number
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'

/**
 * Server-side function to fetch customer dashboard overview
 */
export async function getDashboardOverview(): Promise<DashboardOverview | null> {
  try {

    const response = await fetch(`${BASE_URL}/api/customer/dashboard/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Failed to fetch dashboard overview:', response.status)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching dashboard overview:', error)
    return null
  }
}

/**
 * Server-side function to fetch service frequency data
 */
export async function getServiceFrequency(period: string = '1year'): Promise<ServiceFrequency[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/customer/dashboard/service-frequency?period=${period}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Failed to fetch service frequency:', response.status)
      return []
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching service frequency:', error)
    return []
  }
}
