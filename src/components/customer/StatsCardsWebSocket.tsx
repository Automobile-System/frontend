'use client';

import { useEffect, useState } from 'react';
import { Activity, CheckCircle2, CalendarDays, Hammer, Loader } from 'lucide-react';
import { useCustomerDashboard } from '@/hooks/websockets/useCustomerDashboard';
import { useAuth } from '@/hooks/useAuth';

interface DashboardOverview {
    activeServices: number;
    completedServices: number;
    upcomingAppointments: number;
    activeProjects: number;
    completedProjects: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

export default function StatsCardsWebSocket() {
    const { user } = useAuth();
    const [data, setData] = useState<DashboardOverview | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Enable WebSocket for real-time updates
    const { dashboardData } = useCustomerDashboard(user?.email || null);

    // Fetch initial data from REST API
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/api/customer/dashboard/overview`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                }
            } catch (error) {
                console.error('Error fetching dashboard overview:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Update data when WebSocket sends new data
    useEffect(() => {
        if (dashboardData) {
            setData(dashboardData);
        }
    }, [dashboardData]);

    const stats = [
        { title: 'Active Services', value: data?.activeServices?.toString() || '0', status: 'Ongoing', icon: <Activity size={22} /> },
        { title: 'Completed Services', value: data?.completedServices?.toString() || '0', status: 'Total', icon: <CheckCircle2 size={22} /> },
        { title: 'Upcoming Appointments', value: data?.upcomingAppointments?.toString() || '0', status: 'Scheduled', icon: <CalendarDays size={22} /> },
        { title: 'Active Projects', value: data?.activeProjects?.toString() || '0', status: 'Custom project', icon: <Hammer size={22} /> }
    ];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm h-32 flex items-center justify-center"
                    >
                        <Loader className="w-8 h-8 text-[#03009B] animate-spin" />
                    </div>
                ))}
            </div>
        );
    }

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

                        <div className="w-14 h-14 rounded-full bg-[#03009B]/10 flex items-center justify-center text-[#03009B] transition-transform duration-250 group-hover:scale-110">
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
