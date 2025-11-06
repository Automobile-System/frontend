'use client';

import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import { useRouter, useParams } from 'next/navigation';

export default function VehicleServiceHistory() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    // Mock data - in real app, fetch based on vehicle ID
    const serviceHistory = [
        {
            date: 'Dec 1, 2024',
            service: 'Tire Rotation',
            mechanic: 'Nimal Fernando',
            status: 'Completed'
        },
        {
            date: 'Oct 15, 2024',
            service: 'Oil Change',
            mechanic: 'Ruwan Silva',
            status: 'Completed'
        },
        {
            date: 'Aug 20, 2024',
            service: 'Brake Service',
            mechanic: 'Kamal Perera',
            status: 'Completed'
        }
    ];

    const vehicle = {
        id: id,
        name: 'Toyota Corolla',
        model: '2020',
        licensePlate: 'KA-1234',
        lastService: 'Dec 1, 2024',
        serviceCount: 12
    };

    return (
        <CustomerLayout>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Header */}
                <div>
                    <button
                        onClick={() => router.push('/customer/vehicles')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#2563eb',
                            cursor: 'pointer',
                            padding: 0,
                            marginBottom: '1rem',
                            fontSize: '0.875rem'
                        }}
                    >
                        ← Back to Vehicles
                    </button>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>
                        Service History - {vehicle.name} ({vehicle.licensePlate})
                    </h1>
                    <p style={{ color: '#6b7280', margin: 0 }}>View all service records for this vehicle</p>
                </div>

                {/* Service History List */}
                <div style={{
                    background: 'white',
                    borderRadius: '0.75rem',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    {serviceHistory.map((service, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '1.5rem',
                                borderBottom: index < serviceHistory.length - 1 ? '1px solid #f3f4f6' : 'none'
                            }}
                        >
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#111827',
                                margin: '0 0 0.5rem 0'
                            }}>
                                {service.service}
                            </h4>
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                margin: '0 0 0.25rem 0'
                            }}>
                                {service.date}
                            </p>
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                margin: 0
                            }}>
                                Completed by <strong>{service.mechanic}</strong>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </CustomerLayout>
    );
}