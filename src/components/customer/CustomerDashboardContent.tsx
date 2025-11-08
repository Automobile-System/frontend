import { getDashboardOverview, getServiceFrequency } from '@/services/customerService'
import { getCurrentUser } from '@/lib/auth'
import StatsCardsWebSocket from '@/components/customer/StatsCardsWebSocket'
import ServiceChart from '@/components/layout/customer/ServiceChart'
import Recommendations from '@/components/layout/customer/Recommendations'
import { CustomerDashboardHeader } from '@/components/customer/CustomerDashboardHeader'

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
