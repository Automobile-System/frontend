interface ServiceTimelineProps {
    serviceId?: string;
}

export default function ServiceTimeline({ }: ServiceTimelineProps) {
    const timelineEvents = [
        {
            time: '10:35 AM',
            description: 'Work in progress - Oil draining completed',
            status: 'in-progress'
        },
        {
            time: '10:30 AM',
            description: 'Service started by Ruwan Silva',
            status: 'completed'
        },
        {
            time: '10:00 AM',
            description: 'Vehicle checked in',
            status: 'completed'
        }
    ];

    return (
        <div>
            <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '16px'
            }}>
                Updates Timeline
            </h4>

            <div style={{ position: 'relative' }}>
                {timelineEvents.map((event, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        marginBottom: '20px',
                        position: 'relative'
                    }}>
                        {/* Timeline line */}
                        {index < timelineEvents.length - 1 && (
                            <div style={{
                                position: 'absolute',
                                left: '12px',
                                top: '24px',
                                bottom: '-20px',
                                width: '2px',
                                backgroundColor: '#e5e7eb'
                            }} />
                        )}

                        {/* Timeline dot */}
                        <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: event.status === 'completed' ? '#10b981' : '#f59e0b',
                            marginRight: '16px',
                            flexShrink: 0,
                            position: 'relative',
                            zIndex: 1
                        }} />

                        {/* Event content */}
                        <div style={{ flex: 1 }}>
                            <p style={{
                                fontWeight: '600',
                                color: '#1f2937',
                                margin: '0 0 4px 0',
                                fontSize: '14px'
                            }}>
                                {event.time}
                            </p>
                            <p style={{
                                color: '#6b7280',
                                margin: 0,
                                fontSize: '14px'
                            }}>
                                {event.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}