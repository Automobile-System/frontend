import { getDashboardOverview, getServiceFrequency } from '@/services/customerService'
import StatsCards from '@/components/layout/customer/StatsCards'
import ServiceChart from '@/components/layout/customer/ServiceChart'
import Recommendations from '@/components/layout/customer/Recommendations'
import { CustomerDashboardHeader } from '@/components/customer/CustomerDashboardHeader'

/**
 * Server Component - Fetches dashboard data and renders the customer dashboard
 */
export default async function CustomerDashboardContent() {
  // Fetch data on the server
  const [dashboardData, serviceFrequency] = await Promise.all([
    getDashboardOverview(),
    getServiceFrequency('1year')
  ])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header - Client Component */}
      <CustomerDashboardHeader />

      {/* Stats Cards - Client Component with Server Data */}
      <StatsCards data={dashboardData} />

      {/* Charts and Recommendations */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        <ServiceChart data={serviceFrequency} />
        <Recommendations />
      </div>
    </div>
  )
}
