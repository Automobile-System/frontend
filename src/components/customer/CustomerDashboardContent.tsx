'use client'

import StatsCardsWebSocket from '@/components/customer/StatsCardsWebSocket'
import ServiceChart from '@/components/layout/customer/ServiceChart'
import Recommendations from '@/components/layout/customer/Recommendations'
import { CustomerDashboardHeader } from '@/components/customer/CustomerDashboardHeader'

/**
 * Client Component - Renders the customer dashboard with client-side data fetching
 */
export default function CustomerDashboardContent() {
  return (
    <div className="flex flex-col gap-6">
      <CustomerDashboardHeader />

      <StatsCardsWebSocket />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServiceChart />
        <Recommendations />
      </div>
    </div>
  )
}
