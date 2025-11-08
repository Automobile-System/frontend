import CustomerLayout from "@/components/layout/customer/CustomerLayout"
import CustomerDashboardContent from "@/components/customer/CustomerDashboardContent"

// Force dynamic rendering for authentication
export const dynamic = 'force-dynamic'

export default async function CustomerDashboard() {
  return (
    <CustomerLayout>
      <CustomerDashboardContent />
    </CustomerLayout>
  )
}
