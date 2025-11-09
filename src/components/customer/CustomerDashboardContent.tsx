import { getCurrentUser } from '@/lib/auth'
import StatsCardsWebSocket from '@/components/customer/StatsCardsWebSocket'
import ServiceChart from '@/components/layout/customer/ServiceChart'
import Recommendations from '@/components/layout/customer/Recommendations'
import { CustomerDashboardHeader } from '@/components/customer/CustomerDashboardHeader'


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


const getDashboardOverview = async (): Promise<DashboardOverview | null> => {
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')

    if (!accessToken) {
      console.error('No access token found')
      return null
    }

    const response = await fetch(`${BASE_URL}/api/customer/dashboard/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `accessToken=${accessToken.value}`,
      },
      credentials: 'include',
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Failed to fetch dashboard overview:', response.status, response.statusText)
      return null
    }

    const data = await response.json()
    console.log('Dashboard overview data:', data)
    return data
  } catch (error) {
    console.error('Error fetching dashboard overview:', error)
    return null
  }
}

/**
 * Server-side function to fetch service frequency data
 */
const getServiceFrequency = async (period: string = '1year'): Promise<ServiceFrequency[]> => {
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')

    if (!accessToken) {
      console.error('No access token found')
      return []
    }

    const response = await fetch(`${BASE_URL}/api/customer/dashboard/service-frequency?period=${period}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `accessToken=${accessToken.value}`,
      },
      credentials: 'include',
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Failed to fetch service frequency:', response.status, response.statusText)
      return []
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching service frequency:', error)
    return []
  }
}
/**
 * Server Component - Fetches dashboard data and renders the customer dashboard
 */
export default async function CustomerDashboardContent() {
  // Fetch data on the server
  const [dashboardData, serviceFrequency, user] = await Promise.all([
    getDashboardOverview(),
    getServiceFrequency('1year'),
    getCurrentUser()
  ])

  const username = user?.email || null

  return (
    <div className="flex flex-col gap-6">
      <CustomerDashboardHeader />

      <StatsCardsWebSocket initialData={dashboardData} username={username} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServiceChart data={serviceFrequency} />
        <Recommendations />
      </div>
    </div>
  )
}
