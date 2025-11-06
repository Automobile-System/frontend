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