'use client';

import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import VehicleCard from '@/components/layout/customer/VehicleCard';
import AddVehicleModal from '@/components/layout/customer/AddVehicleModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getCustomerVehicles } from '@/services/api';
import { CustomerVehicle } from '@/types/authTypes';

import { useState, useEffect } from 'react';

export default function Vehicles() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [vehicles, setVehicles] = useState<CustomerVehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getCustomerVehicles();
            setVehicles(data);
        } catch (err: any) {
            console.error('Failed to fetch vehicles:', err);
            setError(err.message || 'Failed to load vehicles');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVehicleAdded = () => {
        setShowAddForm(false);
        fetchVehicles(); // Refresh the list
    };

    return (
        <CustomerLayout>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    maxWidth: "1400px",
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                        paddingBottom: "1.5rem",
                        borderBottom: "2px solid rgba(2, 0, 121, 0.1)",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                fontSize: "2.5rem",
                                fontWeight: "700",
                                color: "#020079",
                                margin: "0 0 0.5rem 0",
                                fontFamily: "var(--font-bebas, sans-serif)",
                                letterSpacing: "0.5px",
                            }}
                        >
                            My Vehicles
                        </h1>
                        <p
                            style={{
                                color: "#6b7280",
                                margin: 0,
                                fontSize: "1rem",
                                fontFamily: "var(--font-roboto, sans-serif)",
                            }}
                        >
                            Manage your vehicles and view service history
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        style={{
                            background: "#03009B",
                            color: "white",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.75rem",
                            border: "none",
                            fontWeight: "600",
                            fontSize: "1rem",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            transform: "scale(1)",
                            outline: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            boxShadow: "0 2px 8px rgba(3, 0, 155, 0.2)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#020079";
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow =
                                "0 6px 20px rgba(3, 0, 155, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#03009B";
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow =
                                "0 2px 8px rgba(3, 0, 155, 0.2)";
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.backgroundColor = "#01024D";
                            e.currentTarget.style.transform = "scale(0.98)";
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.backgroundColor = "#020079";
                            e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.boxShadow =
                                "0 0 0 3px rgba(3, 0, 155, 0.3)";
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.boxShadow =
                                "0 2px 8px rgba(3, 0, 155, 0.2)";
                        }}
                    >
                        <span style={{ fontSize: "1.25rem" }}>+</span>
                        Add New Vehicle
                    </button>
                </div>

                {/* Vehicles Grid */}
                {isLoading ? (
                    <LoadingSpinner 
                        size="large" 
                        message="Loading your vehicles..." 
                    />
                ) : error ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        backgroundColor: '#fee2e2',
                        borderRadius: '0.75rem',
                        border: '1px solid #fecaca'
                    }}>
                        <p style={{ fontSize: '1.125rem', color: '#991b1b', marginBottom: '1rem', fontWeight: '600' }}>
                            Failed to load vehicles
                        </p>
                        <p style={{ color: '#7f1d1d', marginBottom: '1.5rem' }}>{error}</p>
                        <button
                            onClick={fetchVehicles}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                ) : vehicles.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.75rem',
                        border: '2px dashed #d1d5db'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚗</div>
                        <h3 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '600', 
                            color: '#111827', 
                            margin: '0 0 0.5rem 0' 
                        }}>
                            No Vehicles Yet
                        </h3>
                        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                            Get started by adding your first vehicle
                        </p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#03009B',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 8px rgba(3, 0, 155, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#020079';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#03009B';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            + Add Your First Vehicle
                        </button>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {vehicles.map(vehicle => (
                            <VehicleCard 
                                key={vehicle.vehicleId} 
                                vehicle={vehicle}
                                onDelete={fetchVehicles}
                                onUpdate={fetchVehicles}
                            />
                        ))}
                    </div>
                )}

                {/* Add Vehicle Form Modal */}
                {showAddForm && (
                    <AddVehicleModal 
                        onClose={() => setShowAddForm(false)}
                        onVehicleAdded={handleVehicleAdded}
                    />
                )}
            </div>
        </CustomerLayout>
    );
}