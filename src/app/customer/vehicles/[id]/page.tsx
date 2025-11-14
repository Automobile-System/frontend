'use client';

import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, Calendar, User, Wrench } from 'lucide-react';

export default function VehicleServiceHistory() {
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
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                {/* Header */}
                <div>
                    <Link
                        href="/customer/vehicles"
                        className="inline-flex items-center gap-2 text-[#03009B] hover:text-[#020079] mb-4 text-sm font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Vehicles
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Service History - {vehicle.name} ({vehicle.licensePlate})
                    </h1>
                    <p className="text-gray-600">View all service records for this vehicle</p>
                </div>

                {/* Service History List */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {serviceHistory.map((service, index) => (
                        <div
                            key={index}
                            className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <Wrench className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {service.service}
                                            </h4>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {service.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    {service.mechanic}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    <CheckCircle className="w-4 h-4" />
                                    {service.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CustomerLayout>
    );
}