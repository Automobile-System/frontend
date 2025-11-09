'use client';

import { useEffect, useState } from 'react';
import { Activity, CheckCircle2, CalendarDays, Hammer } from 'lucide-react';
import { useCustomerDashboard } from '@/hooks/websockets/useCustomerDashboard';

interface DashboardOverview {
    activeServices: number;
    completedServices: number;
    upcomingAppointments: number;
    activeProjects: number;
    completedProjects: number;
}

interface StatsCardsWebSocketProps {
    initialData: DashboardOverview | null;
    username: string | null;
}

export default function StatsCardsWebSocket({ initialData, username }: StatsCardsWebSocketProps) {
    // Start with initial data from REST API (enterprise best practice)
    const [data, setData] = useState<DashboardOverview | null>(initialData);
    
    // Then enable WebSocket for real-time updates
    const { dashboardData } = useCustomerDashboard(username);

    // Update data when WebSocket sends new data
    useEffect(() => {
        if (dashboardData) {
            setData(dashboardData);
        }
    }, [dashboardData]);

    const stats = [
        { title: 'Active Services', value: data?.activeServices?.toString() || '0', status: 'Ongoing', color: 'blue', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500', icon: <Activity size={22} /> },
        { title: 'Completed Services', value: data?.completedServices?.toString() || '0', status: 'Total', color: 'green', bgColor: 'bg-green-500/10', textColor: 'text-green-500', icon: <CheckCircle2 size={22} /> },
        { title: 'Upcoming Appointments', value: data?.upcomingAppointments?.toString() || '0', status: 'Scheduled', color: 'amber', bgColor: 'bg-amber-500/10', textColor: 'text-amber-500', icon: <CalendarDays size={22} /> },
        { title: 'Active Projects', value: data?.activeProjects?.toString() || '0', status: 'Custom project', color: 'purple', bgColor: 'bg-purple-500/10', textColor: 'text-purple-500', icon: <Hammer size={22} /> }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-250 cursor-pointer group"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-2">
                                {stat.title}
                            </p>
                            <p className="text-4xl font-bold text-gray-900 my-2">
                                {stat.value}
                            </p>
                            <p className="text-sm text-gray-500">
                                {stat.status}
                            </p>
                        </div>

                        <div className={`w-14 h-14 rounded-full ${stat.bgColor} flex items-center justify-center ${stat.textColor} transition-transform duration-250 group-hover:scale-110`}>
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
