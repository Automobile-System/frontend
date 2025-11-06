export default function ServiceChart() {
    const serviceData = [
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

    const maxServices = Math.max(...serviceData.map(d => d.services));
    const currentMonth = 'Nov'; // You can make this dynamic
    const totalServices = serviceData.reduce((sum, item) => sum + item.services, 0);
    const avgPerMonth = (totalServices / serviceData.length).toFixed(1);
    const busiestMonth = serviceData.reduce((max, item) => 
        item.services > max.services ? item : max
    ).month;

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
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#020079',
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

            {/* Chart Container */}
            <div style={{
                height: '16rem',
                position: 'relative',
                paddingLeft: '2.5rem',
                paddingBottom: '2rem'
            }}>
                {/* Y-axis labels */}
                <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    bottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '2.5rem'
                }}>
                    {[maxServices, Math.floor(maxServices * 0.75), Math.floor(maxServices * 0.5), Math.floor(maxServices * 0.25), 0].map((value) => (
                        <span key={value} style={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            fontWeight: '500',
                            textAlign: 'right',
                            paddingRight: '0.5rem'
                        }}>
                            {value}
                        </span>
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

                    {serviceData.map((data) => {
                        const barHeight = `${(data.services / maxServices) * 100}%`;
                        const isCurrentMonth = data.month === currentMonth;
                        const isBusiest = data.services === maxServices;

                        // Color scheme based on color palette
                        let barColor = '#e5e7eb'; // Default gray
                        if (isCurrentMonth) {
                            barColor = '#03009B'; // Brand hover blue for current month
                        } else if (isBusiest) {
                            barColor = '#E6C200'; // Accent gold for busiest month
                        } else if (data.trend === 'up') {
                            barColor = '#10b981'; // Green for increase
                        } else {
                            barColor = '#ef4444'; // Red for decrease
                        }

                        return (
                            <div key={data.month} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flex: 1,
                                height: '100%',
                                justifyContent: 'flex-end',
                                position: 'relative'
                            }}>
                                {/* Bar */}
                                <div
                                    style={{
                                        width: '85%',
                                        height: barHeight,
                                        backgroundColor: barColor,
                                        borderRadius: '0.375rem 0.375rem 0 0',
                                        marginBottom: '0.75rem',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        boxShadow: isCurrentMonth ? '0 4px 12px rgba(3, 0, 155, 0.3)' :
                                            isBusiest ? '0 4px 12px rgba(230, 194, 0, 0.3)' :
                                            data.trend === 'up' ? '0 2px 8px rgba(16, 185, 129, 0.2)' :
                                                '0 2px 8px rgba(239, 68, 68, 0.2)',
                                        minHeight: '0.5rem',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scaleY(1.05)';
                                        e.currentTarget.style.boxShadow = isCurrentMonth ? '0 6px 16px rgba(3, 0, 155, 0.4)' :
                                            isBusiest ? '0 6px 16px rgba(230, 194, 0, 0.4)' :
                                            '0 4px 12px rgba(0, 0, 0, 0.15)';
                                        const tooltip = e.currentTarget.parentElement?.querySelector('.tooltip') as HTMLElement;
                                        const valueLabel = e.currentTarget.querySelector('.value-label') as HTMLElement;
                                        if (tooltip) tooltip.style.opacity = '1';
                                        if (valueLabel) valueLabel.style.opacity = '1';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scaleY(1)';
                                        e.currentTarget.style.boxShadow = isCurrentMonth ? '0 4px 12px rgba(3, 0, 155, 0.3)' :
                                            isBusiest ? '0 4px 12px rgba(230, 194, 0, 0.3)' :
                                            data.trend === 'up' ? '0 2px 8px rgba(16, 185, 129, 0.2)' :
                                                '0 2px 8px rgba(239, 68, 68, 0.2)';
                                        const tooltip = e.currentTarget.parentElement?.querySelector('.tooltip') as HTMLElement;
                                        const valueLabel = e.currentTarget.querySelector('.value-label') as HTMLElement;
                                        if (tooltip) tooltip.style.opacity = '0';
                                        if (valueLabel) valueLabel.style.opacity = '0';
                                    }}
                                >
                                    {/* Value label on bar */}
                                    {data.services > 0 && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '-1.5rem',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            color: isCurrentMonth ? '#03009B' : isBusiest ? '#E6C200' : '#374151',
                                            opacity: 0,
                                            transition: 'opacity 0.2s',
                                            pointerEvents: 'none',
                                            whiteSpace: 'nowrap'
                                        }} className="value-label">
                                            {data.services}
                                        </div>
                                    )}
                                </div>

                                {/* Tooltip */}
                                <div className="tooltip" style={{
                                    position: 'absolute',
                                    bottom: '2.5rem',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: '#020079',
                                    color: 'white',
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.8125rem',
                                    fontWeight: '600',
                                    whiteSpace: 'nowrap',
                                    opacity: 0,
                                    transition: 'opacity 0.2s ease',
                                    pointerEvents: 'none',
                                    zIndex: 10,
                                    boxShadow: '0 4px 12px rgba(2, 0, 121, 0.3)'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                                            {data.services} {data.services === 1 ? 'Service' : 'Services'}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                                            {data.month} {new Date().getFullYear()}
                                        </div>
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
                                    fontSize: '0.8125rem',
                                    color: isCurrentMonth ? '#03009B' : isBusiest ? '#E6C200' : '#6b7280',
                                    fontWeight: isCurrentMonth || isBusiest ? '700' : '500',
                                    transition: 'color 0.2s ease'
                                }}>
                                    {data.month}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Grid Lines */}
                <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    left: '2.5rem',
                    right: 0,
                    bottom: '1.5rem',
                    pointerEvents: 'none'
                }}>
                    {[0, 25, 50, 75, 100].map((percent) => (
                        <div
                            key={percent}
                            style={{
                                position: 'absolute',
                                top: `${percent}%`,
                                left: 0,
                                right: 0,
                                height: '1px',
                                backgroundColor: percent === 0 ? '#e5e7eb' : '#f3f4f6',
                                transform: 'translateY(-50%)'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #e5e7eb'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#03009B',
                        borderRadius: '0.25rem',
                        boxShadow: '0 2px 4px rgba(3, 0, 155, 0.2)'
                    }}></div>
                    <span style={{ fontSize: '0.8125rem', color: '#374151', fontWeight: '600' }}>Current Month</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#E6C200',
                        borderRadius: '0.25rem',
                        boxShadow: '0 2px 4px rgba(230, 194, 0, 0.2)'
                    }}></div>
                    <span style={{ fontSize: '0.8125rem', color: '#374151', fontWeight: '600' }}>Peak Month</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#10b981',
                        borderRadius: '0.25rem',
                        boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
                    }}></div>
                    <span style={{ fontSize: '0.8125rem', color: '#374151', fontWeight: '600' }}>Increase</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#ef4444',
                        borderRadius: '0.25rem',
                        boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)'
                    }}></div>
                    <span style={{ fontSize: '0.8125rem', color: '#374151', fontWeight: '600' }}>Decrease</span>
                </div>
            </div>

            {/* Summary Stats */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1.5rem',
                padding: '1.25rem',
                backgroundColor: 'rgba(2, 0, 121, 0.05)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(2, 0, 121, 0.1)'
            }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <p style={{
                        fontSize: '0.8125rem',
                        color: '#6b7280',
                        margin: '0 0 0.5rem 0',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Total Services
                    </p>
                    <p style={{
                        fontSize: '1.5rem',
                        color: '#020079',
                        margin: 0,
                        fontWeight: '700'
                    }}>
                        {totalServices}
                    </p>
                </div>
                <div style={{ 
                    textAlign: 'center', 
                    flex: 1,
                    borderLeft: '1px solid rgba(2, 0, 121, 0.1)',
                    borderRight: '1px solid rgba(2, 0, 121, 0.1)'
                }}>
                    <p style={{
                        fontSize: '0.8125rem',
                        color: '#6b7280',
                        margin: '0 0 0.5rem 0',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Avg/Month
                    </p>
                    <p style={{
                        fontSize: '1.5rem',
                        color: '#03009B',
                        margin: 0,
                        fontWeight: '700'
                    }}>
                        {avgPerMonth}
                    </p>
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <p style={{
                        fontSize: '0.8125rem',
                        color: '#6b7280',
                        margin: '0 0 0.5rem 0',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Peak Month
                    </p>
                    <p style={{
                        fontSize: '1.5rem',
                        color: '#E6C200',
                        margin: 0,
                        fontWeight: '700'
                    }}>
                        {busiestMonth}
                    </p>
                </div>
            </div>
        </div>
    );
}