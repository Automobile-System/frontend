import { cookies } from 'next/headers';
import StatsCards from '@/components/layout/customer/StatsCards';
import ServiceChart from '@/components/layout/customer/ServiceChart';
import Recommendations from '@/components/layout/customer/Recommendations';

interface DashboardOverview {
    activeServices: number;
    completedServices: number;
    upcomingAppointments: number;
    activeProjects: number;
    completedProjects: number;
}

async function getDashboardData(): Promise<DashboardOverview | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return null;
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/dashboard/overview`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            return null;
        }

        return response.json();
    } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        return null;
    }
}

export default async function DashboardContent() {
    const dashboardData = await getDashboardData();

    return (
        <>
            {/* Stats Cards */}
            <StatsCards data={dashboardData} />

            {/* Charts and Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ServiceChart />
                <Recommendations />
            </div>
        </>
    );
}
