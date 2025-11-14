'use client';

import { useState } from 'react';
import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import ServiceList from '@/components/layout/customer/ServiceList';
import ServiceDetails from '@/components/layout/customer/ServiceDetails';

export default function ServicesPage() {
    const [selectedService, setSelectedService] = useState<string | null>(null);

    return (
        <CustomerLayout>
            <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4 pb-6 border-b-2 border-[#020079]/10">
                    <div>
                        <h1 className="text-4xl font-bold text-[#020079] mb-2 font-bebas tracking-wide">
                            My Services / Projects
                        </h1>
                        <p className="text-gray-600 text-base font-roboto">
                            Track and manage all your vehicle services
                        </p>
                    </div>
                </div>

                <div className={`grid ${selectedService ? 'grid-cols-1 lg:grid-cols-[1fr_400px]' : 'grid-cols-1'} gap-6 items-start`}>
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