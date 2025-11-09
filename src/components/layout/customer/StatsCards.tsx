'use client';

import { Activity, CheckCircle2, CalendarDays, Hammer } from 'lucide-react';

interface DashboardOverview {
    activeServices: number;
    completedServices: number;
    upcomingAppointments: number;
    activeProjects: number;
    completedProjects: number;
}

interface StatsCardsProps {
    data: DashboardOverview | null;
}

export default function StatsCards({ data }: StatsCardsProps) {
    const stats = [
        { title: 'Active Services', value: data?.activeServices?.toString() || '0', status: 'Ongoing', color: 'blue', bgColor: 'bg-blue-500/10', textColor: 'text-blue-500', shadowColor: 'shadow-blue-500/20', icon: <Activity size={22} /> },
        { title: 'Completed Services', value: data?.completedServices?.toString() || '0', status: 'Total', color: 'green', bgColor: 'bg-green-500/10', textColor: 'text-green-500', shadowColor: 'shadow-green-500/20', icon: <CheckCircle2 size={22} /> },
        { title: 'Upcoming Appointments', value: data?.upcomingAppointments?.toString() || '0', status: 'Scheduled', color: 'amber', bgColor: 'bg-amber-500/10', textColor: 'text-amber-500', shadowColor: 'shadow-amber-500/20', icon: <CalendarDays size={22} /> },
        { title: 'Active Projects', value: data?.activeProjects?.toString() || '0', status: 'Custom project', color: 'purple', bgColor: 'bg-purple-500/10', textColor: 'text-purple-500', shadowColor: 'shadow-purple-500/20', icon: <Hammer size={22} /> }
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
                            <p className="text-sm font-medium text-gray-500 m-0">
                                {stat.title}
                            </p>
                            <p className="text-4xl font-bold text-gray-900 my-2">
                                {stat.value}
                            </p>
                            <p className="text-sm text-gray-500 m-0">
                                {stat.status}
                            </p>
                        </div>

                        <div className={`w-14 h-14 rounded-full ${stat.bgColor} flex items-center justify-center transition-all duration-250 ${stat.textColor} group-hover:scale-110`}>
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
