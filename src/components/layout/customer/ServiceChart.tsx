'use client'

interface ServiceFrequency {
    month: string;
    jobs: number;
}

interface ServiceChartProps {
    data: ServiceFrequency[];
}

export default function ServiceChart({ data }: ServiceChartProps) {
    // Transform data to match component format and add trend
    const serviceData = data.map((item, index, arr) => ({
        month: item.month,
        services: item.jobs,
        trend: index > 0 && item.jobs > arr[index - 1].jobs ? 'up' : 'down'
    }));

    // Fallback to default data if no data provided
    const displayData = serviceData.length > 0 ? serviceData : [
        { month: 'Jan', services: 2, trend: 'down' },
        { month: 'Feb', services: 1, trend: 'down' },
        { month: 'Mar', services: 3, trend: 'up' },
        { month: 'Apr', services: 2, trend: 'down' },
        { month: 'May', services: 4, trend: 'up' },
        { month: 'Jun', services: 1, trend: 'down' },
        { month: 'Jul', services: 3, trend: 'up' },
        { month: 'Aug', services: 2, trend: 'down' },
        { month: 'Sep', services: 1, trend: 'down' },
        { month: 'Oct', services: 2, trend: 'up' },
        { month: 'Nov', services: 3, trend: 'up' },
        { month: 'Dec', services: 2, trend: 'down' }
    ];

    const maxServices = Math.max(...displayData.map(d => d.services));

    return (
        <div style={{
            background: 'white',
            borderRadius: '1rem',
            border: '1px solid #e5e7eb',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            height: 'fit-content'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#111827',
                    margin: '0 0 0.5rem 0'
                }}>
                    Service Frequency
                </h2>
                <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: 0
                }}>
                    Your service history over the past year
                </p>
            </div>

            <div className="h-64 relative pl-10 pb-8">
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between w-10">
                    {[maxServices, Math.floor(maxServices * 0.75), Math.floor(maxServices * 0.5), Math.floor(maxServices * 0.25), 0].map((value, index) => (
                        <span key={`y-axis-${index}`} className="text-xs text-gray-600 font-medium text-right pr-2">{value}</span>
                    ))}
                </div>

                {/* Chart Bars */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    height: 'calc(100% - 1.5rem)',
                    gap: '0.5rem',
                    paddingBottom: '0.5rem'
                }}>

                    {displayData.map((data) => {
                        const barHeight = `${(data.services / maxServices) * 100}%`;
                        const isCurrentMonth = data.month === 'Nov';

                        return (
                            <div key={data.month} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flex: 1,
                                height: '100%',
                                justifyContent: 'flex-end'
                            }}>
                                {/* Bar */}
                                <div
                                    style={{
                                        width: '80%',
                                        height: barHeight,
                                        backgroundColor: isCurrentMonth ? '#3b82f6' :
                                            data.trend === 'up' ? '#10b981' : '#ef4444',
                                        borderRadius: '0.25rem 0.25rem 0 0',
                                        marginBottom: '0.75rem',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        boxShadow: isCurrentMonth ? '0 4px 6px -1px rgba(59, 130, 246, 0.3)' :
                                            data.trend === 'up' ? '0 2px 4px rgba(16, 185, 129, 0.3)' :
                                                '0 2px 4px rgba(239, 68, 68, 0.3)',
                                        minHeight: '0.5rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                                        if (tooltip) tooltip.style.opacity = '1';
                                    }}
                                    onMouseLeave={(e) => {
                                        const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
                                        if (tooltip) tooltip.style.opacity = '0';
                                    }}
                                >
                                    {/* Tooltip */}
                                    <div className="tooltip" style={{
                                        position: 'absolute',
                                        top: '-2.5rem',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: '#1f2937',
                                        color: 'white',
                                        padding: '0.375rem 0.75rem',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '500',
                                        whiteSpace: 'nowrap',
                                        opacity: 0,
                                        transition: 'opacity 0.2s',
                                        pointerEvents: 'none',
                                        zIndex: 10
                                    }}>
                                        {data.services} service{data.services !== 1 ? 's' : ''}
                                    </div>
                                    {/* Tooltip arrow */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-0.25rem',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '0.5rem',
                                        height: '0.5rem',
                                        backgroundColor: '#020079',
                                        rotate: '45deg'
                                    }}></div>
                                </div>

                                {/* Month Label */}
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: isCurrentMonth ? '#3b82f6' : '#6b7280',
                                    fontWeight: isCurrentMonth ? '700' : '500'
                                }}>
                                    {data.month}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #f3f4f6'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#3b82f6',
                        borderRadius: '2px'
                    }}></div>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Current Month</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#10b981',
                        borderRadius: '2px'
                    }}></div>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Increase</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#ef4444',
                        borderRadius: '2px'
                    }}></div>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Decrease</span>
                </div>
            </div>

            {/* Summary Stats */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        margin: '0 0 0.25rem 0',
                        fontWeight: '500'
                    }}>
                        Total Services
                    </p>
                    <p style={{
                        fontSize: '1.125rem',
                        color: '#1f2937',
                        margin: 0,
                        fontWeight: '700'
                    }}>
                        {serviceData.reduce((sum, item) => sum + item.services, 0)}
                    </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        margin: '0 0 0.25rem 0',
                        fontWeight: '500'
                    }}>
                        Avg/Month
                    </p>
                    <p style={{
                        fontSize: '1.125rem',
                        color: '#1f2937',
                        margin: 0,
                        fontWeight: '700'
                    }}>
                        {(serviceData.reduce((sum, item) => sum + item.services, 0) / serviceData.length).toFixed(1)}
                    </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        margin: '0 0 0.25rem 0',
                        fontWeight: '500'
                    }}>
                        Busiest Month
                    </p>
                    <p style={{
                        fontSize: '1.125rem',
                        color: '#1f2937',
                        margin: 0,
                        fontWeight: '700'
                    }}>
                        May
                    </p>
                </div>
            </div>
        </div>
    );
}
