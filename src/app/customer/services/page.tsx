'use client';

import { useState } from 'react';
import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import ServiceList from '@/components/layout/customer/ServiceList';
import ServiceDetails from '@/components/layout/customer/ServiceDetails';

export default function ServicesPage() {
    const [selectedService, setSelectedService] = useState<string | null>(null);

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
                            My Services / Projects
                        </h1>
                        <p
                            style={{
                                color: "#6b7280",
                                margin: 0,
                                fontSize: "1rem",
                                fontFamily: "var(--font-roboto, sans-serif)",
                            }}
                        >
                            Track and manage all your vehicle services
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: selectedService ? "1fr 400px" : "1fr",
                        gap: "2rem",
                        alignItems: "start",
                    }}
                >
                    <ServiceList 
                        onServiceSelect={setSelectedService} 
                        selectedServiceId={selectedService}
                    />

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