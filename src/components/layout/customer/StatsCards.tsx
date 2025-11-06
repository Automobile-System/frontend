import { Activity, CheckCircle2, CalendarDays, Hammer, FolderCheck } from 'lucide-react';

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
        { 
            title: 'Active Services', 
            value: data?.activeServices?.toString() || '0', 
            status: 'Ongoing', 
            color: '#3b82f6', 
            icon: <Activity size={22} /> 
        },
        { 
            title: 'Completed Services', 
            value: data?.completedServices?.toString() || '0', 
            status: 'Total', 
            color: '#10b981', 
            icon: <CheckCircle2 size={22} /> 
        },
        { 
            title: 'Upcoming Appointments', 
            value: data?.upcomingAppointments?.toString() || '0', 
            status: 'Scheduled', 
            color: '#f59e0b', 
            icon: <CalendarDays size={22} /> 
        },
        { 
            title: 'Active Projects', 
            value: data?.activeProjects?.toString() || '0', 
            status: 'Custom project', 
            color: '#8b5cf6', 
            icon: <Hammer size={22} /> 
        },
        { 
            title: 'Completed Projects', 
            value: data?.completedProjects?.toString() || '0', 
            status: 'Finished', 
            color: '#059669', 
            icon: <FolderCheck size={22} /> 
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-lg transition-all duration-250 cursor-pointer hover:-translate-y-1.5 group"
                    style={{
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                >
                    <div className="flex items-center justify-between">
                        {/* Text Section */}
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-0">
                                {stat.title}
                            </p>
                            <p className="text-4xl font-bold text-gray-900 my-2">
                                {stat.value}
                            </p>
                            <p className="text-sm text-gray-600 mb-0">
                                {stat.status}
                            </p>
                        </div>

                        {/* Icon Section */}
                        <div 
                            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-250 group-hover:scale-110"
                            style={{
                                background: `${stat.color}15`,
                                color: stat.color,
                            }}
                        >
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}