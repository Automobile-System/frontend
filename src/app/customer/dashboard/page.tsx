import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import DashboardContent from '@/components/layout/customer/DashboardContent';
import DashboardHeader from '@/components/customer/dashboard/DashboardHeader';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function CustomerDashboard() {
    return (
        <CustomerLayout>
            <div className="flex flex-col gap-6">
                {/* Header with Book Service Button (Client Component) */}
                <DashboardHeader />

                {/* Dashboard Content (Server Component with API calls) */}
                <DashboardContent />
            </div>
        </CustomerLayout>
    );
}