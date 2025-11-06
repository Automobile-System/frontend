interface Service {
    id: string;
    title: string;
    vehicle: string;
    status: 'in-progress' | 'completed' | 'waiting-parts';
    type: 'service' | 'project';
    assignedTo?: string;
    completedBy?: string;
    completedOn?: string;
    expectedCompletion?: string;
    team?: string;
    progress?: number;
}

interface ServiceCardProps {
    service: Service;
    onClick: () => void;
}

export default function ServiceCard({ service, onClick }: ServiceCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'in-progress': return '#f59e0b';
            case 'completed': return '#10b981';
            case 'waiting-parts': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'in-progress': return 'In Progress';
            case 'completed': return 'Completed';
            case 'waiting-parts': return 'Waiting for Parts';
            default: return status;
        }
    };

    return (
        <div
            onClick={onClick}
            style={{
                padding: '20px 24px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#1f2937',
                            margin: 0
                        }}>
                            {service.title}
                        </h3>
                        <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: getStatusColor(service.status),
                            color: 'white'
                        }}>
                            {getStatusText(service.status)}
                        </span>
                    </div>

                    <p style={{
                        color: '#6b7280',
                        margin: '4px 0',
                        fontSize: '14px'
                    }}>
                        {service.vehicle}
                    </p>

                    {service.assignedTo && (
                        <p style={{
                            color: '#374151',
                            margin: '4px 0',
                            fontSize: '14px'
                        }}>
                            Assigned to: {service.assignedTo}
                        </p>
                    )}

                    {service.completedBy && (
                        <p style={{
                            color: '#374151',
                            margin: '4px 0',
                            fontSize: '14px'
                        }}>
                            Completed by: {service.completedBy}
                        </p>
                    )}

                    {service.team && (
                        <p style={{
                            color: '#374151',
                            margin: '4px 0',
                            fontSize: '14px'
                        }}>
                            Project Team: {service.team}
                        </p>
                    )}

                    {service.expectedCompletion && (
                        <p style={{
                            color: service.status === 'in-progress' ? '#d97706' : '#059669',
                            margin: '4px 0',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            Expected completion: {service.expectedCompletion}
                        </p>
                    )}

                    {service.completedOn && (
                        <p style={{
                            color: '#059669',
                            margin: '4px 0',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            Completed on: {service.completedOn}
                        </p>
                    )}

                    {service.progress !== undefined && (
                        <div style={{ marginTop: '12px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '4px'
                            }}>
                                <span style={{ fontSize: '14px', color: '#374151' }}>Progress</span>
                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                                    {service.progress}%
                                </span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '8px',
                                backgroundColor: '#e5e7eb',
                                borderRadius: '4px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${service.progress}%`,
                                    height: '100%',
                                    backgroundColor: '#3b82f6',
                                    borderRadius: '4px',
                                    transition: 'width 0.3s ease'
                                }} />
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {service.status === 'completed' && (
                        <button style={{
                            padding: '8px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            color: '#374151',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}>
                            Leave Review
                        </button>
                    )}
                    <button style={{
                        padding: '8px 16px',
                        border: '1px solid #3b82f6',
                        borderRadius: '6px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}>
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}