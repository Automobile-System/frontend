'use client';

import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import VehicleCard from '@/components/layout/customer/VehicleCard';
import AddVehicleModal from '@/components/layout/customer/AddVehicleModal';

import { useState } from 'react';

export default function Vehicles() {
    const [showAddForm, setShowAddForm] = useState(false);

    const vehicles = [
        {
            id: 1,
            name: 'Toyota Corolla',
            model: 'Corolla 2020',
            licensePlate: 'KA-1234',
            lastService: 'Dec 1, 2024',
            serviceCount: 12
        },
        {
            id: 2,
            name: 'Honda Civic',
            model: 'Civic 2019',
            licensePlate: 'KB-5678',
            lastService: 'Nov 15, 2024',
            serviceCount: 8
        },
        {
            id: 3,
            name: 'Ford Explorer',
            model: 'Explorer 2021',
            licensePlate: 'KC-9012',
            lastService: 'Oct 20, 2024',
            serviceCount: 5
        }
    ];

    return (
        <CustomerLayout>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>My Vehicles</h1>
                        <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>Manage your vehicles and view service history</p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        style={{
                            background: '#2563eb',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transform: 'scale(1)',
                            transition: 'background-color 0.2s, transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#1d4ed8';
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#2563eb';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        + Add New Vehicle
                    </button>

                </div>

                {/* Vehicles Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {vehicles.map(vehicle => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>

                {/* Add Vehicle Form Modal */}
                {showAddForm && (
                    <AddVehicleModal onClose={() => setShowAddForm(false)} />
                )}
            </div>
        </CustomerLayout>
    );
}