'use client';

import { useState } from 'react';
import ServiceTimeline from './ServiceTimeline';
import ServiceChat from './ServiceChat';

interface ServiceDetailsProps {
    serviceId: string;
    onClose: () => void;
}

export default function ServiceDetails({ serviceId, onClose }: ServiceDetailsProps) {
    const [activeTab, setActiveTab] = useState<'details' | 'timeline' | 'chat'>('details');

    // Mock data - replace with actual API call
    const serviceDetails = {
        id: '1',
        title: 'Oil Change',
        vehicle: 'Toyota Corolla (KA-1234)',
        serviceType: 'Oil Change',
        status: 'in-progress',
        assignedEmployee: 'Ruwan Silva',
        expectedCompletion: 'Today, 4:00 PM'
    };

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            height: 'fit-content',
            position: 'sticky',
            top: '20px'
        }}>
            {/* Header */}
            <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: 0
                }}>
                    Service Details
                </h3>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '18px',
                        color: '#6b7280',
                        cursor: 'pointer',
                        padding: '4px'
                    }}
                >
                    ×
                </button>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                borderBottom: '1px solid #e5e7eb'
            }}>
                {(['details', 'timeline', 'chat'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            flex: 1,
                            padding: '12px 16px',
                            border: 'none',
                            backgroundColor: activeTab === tab ? '#f3f4f6' : 'white',
                            color: activeTab === tab ? '#3b82f6' : '#6b7280',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
                {activeTab === 'details' && (
                    <div>
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#1f2937',
                                marginBottom: '16px'
                            }}>
                                Service Information
                            </h4>

                            <div style={{ display: 'grid', gap: '12px' }}>
                                <div>
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>Vehicle:</span>
                                    <p style={{ color: '#1f2937', margin: '4px 0', fontWeight: '500' }}>
                                        {serviceDetails.vehicle}
                                    </p>
                                </div>

                                <div>
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>Service Type:</span>
                                    <p style={{ color: '#1f2937', margin: '4px 0', fontWeight: '500' }}>
                                        {serviceDetails.serviceType}
                                    </p>
                                </div>

                                <div>
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>Current Status:</span>
                                    <p style={{
                                        color: '#d97706',
                                        margin: '4px 0',
                                        fontWeight: '500',
                                        padding: '4px 8px',
                                        backgroundColor: '#fffbeb',
                                        borderRadius: '4px',
                                        display: 'inline-block'
                                    }}>
                                        In Progress
                                    </p>
                                </div>

                                <div>
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>Assigned Employee:</span>
                                    <p style={{ color: '#1f2937', margin: '4px 0', fontWeight: '500' }}>
                                        {serviceDetails.assignedEmployee}
                                    </p>
                                </div>

                                <div>
                                    <span style={{ color: '#6b7280', fontSize: '14px' }}>Expected Completion:</span>
                                    <p style={{ color: '#1f2937', margin: '4px 0', fontWeight: '500' }}>
                                        {serviceDetails.expectedCompletion}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'timeline' && <ServiceTimeline serviceId={serviceId} />}
                {activeTab === 'chat' && <ServiceChat serviceId={serviceId} employeeName="Ruwan Silva" />}
            </div>
        </div>
    );
}