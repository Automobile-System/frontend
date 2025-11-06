'use client';

import { useState } from 'react';
import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import ServiceList from '@/components/layout/customer/ServiceList';
import ServiceDetails from '@/components/layout/customer/ServiceDetails';

export default function ServicesPage() {
    const [selectedService, setSelectedService] = useState<string | null>(null);

    return (
        <CustomerLayout>
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ marginBottom: '30px' }}>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#111827',
                        margin: 0
                    }}>
                        My Services / Projects
                    </h1>
                    <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                        Track and manage all your vehicle services
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: selectedService ? '1fr 400px' : '1fr',
                    gap: '24px',
                    alignItems: 'start'
                }}>
                    <ServiceList onServiceSelect={setSelectedService} />

                    {selectedService && (
                        <ServiceDetails
                            serviceId={selectedService}
                            onClose={() => setSelectedService(null)}
                        />
                    )}
                </div>
            </div>
        </CustomerLayout>
    );
}