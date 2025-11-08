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
        { title: 'Active Services', value: data?.activeServices?.toString() || '0', status: 'Ongoing', color: '#3b82f6', icon: <Activity size={22} /> },
        { title: 'Completed Services', value: data?.completedServices?.toString() || '0', status: 'Total', color: '#10b981', icon: <CheckCircle2 size={22} /> },
        { title: 'Upcoming Appointments', value: data?.upcomingAppointments?.toString() || '0', status: 'Scheduled', color: '#f59e0b', icon: <CalendarDays size={22} /> },
        { title: 'Active Projects', value: data?.activeProjects?.toString() || '0', status: 'Custom project', color: '#8b5cf6', icon: <Hammer size={22} /> }
    ];

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem',
            }}
        >
            {stats.map((stat, index) => (
                <div
                    key={index}
                    style={{
                        background: 'white',
                        borderRadius: '1rem',
                        border: '1px solid #e5e7eb',
                        padding: '1.75rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        transition: 'all 0.25s ease',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.boxShadow = `0 6px 20px ${stat.color}30`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Text Section */}
                        <div>
                            <p
                                style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#6b7280',
                                    margin: 0,
                                }}
                            >
                                {stat.title}
                            </p>
                            <p
                                style={{
                                    fontSize: '2.25rem',
                                    fontWeight: '700',
                                    color: '#111827',
                                    margin: '0.5rem 0 0.25rem 0',
                                }}
                            >
                                {stat.value}
                            </p>
                            <p
                                style={{
                                    fontSize: '0.875rem',
                                    color: '#6b7280',
                                    margin: 0,
                                }}
                            >
                                {stat.status}
                            </p>
                        </div>

                        {/* Icon Section */}
                        <div
                            style={{
                                width: '3.25rem',
                                height: '3.25rem',
                                borderRadius: '50%',
                                background: `${stat.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.25s ease',
                                color: stat.color,
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
