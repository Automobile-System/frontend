'use client';

import BookingStepper from '@/components/layout/customer/BookingStepper';
import VehicleSelection from '@/components/layout/customer/VehicleSelection';
import ServiceType from '@/components/layout/customer/ServiceType';
import EmployeeSelection from '@/components/layout/customer/EmployeeSelection';
import DateTimeSelection from '@/components/layout/customer/DateTimeSelection';
import Confirmation from '@/components/layout/customer/Confirmation';
import { useState } from 'react';
import { BookingData, Vehicle, Service, Employee } from '@/types/booking';

interface BookingClientProps {
    vehicles: Vehicle[];
    services: Service[];
    employees: Employee[];
}

export default function BookingClient({ vehicles, services, employees }: BookingClientProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>({
        vehicleId: null,
        serviceTypeId: null,
        employeeId: null, // Optional - can be null
        date: '',
        time: '',
    });

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const updateBookingData = (newData: Partial<BookingData>) => {
        setBookingData(prev => ({ ...prev, ...newData }));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <VehicleSelection
                        data={bookingData}
                        vehicles={vehicles}
                        onUpdate={updateBookingData}
                        onNext={nextStep}
                    />
                );
            case 2:
                return (
                    <ServiceType
                        data={bookingData}
                        services={services}
                        onUpdate={updateBookingData}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                );
            case 3:
                return (
                    <EmployeeSelection
                        data={bookingData}
                        employees={employees}
                        onUpdate={updateBookingData}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                );
            case 4:
                return (
                    <DateTimeSelection
                        data={bookingData}
                        onUpdate={updateBookingData}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                );
            case 5:
                return (
                    <Confirmation
                        data={bookingData}
                        vehicles={vehicles}
                        services={services}
                        employees={employees}
                        onBack={prevStep}
                        onUpdate={updateBookingData}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4 pb-6 border-b-2 border-[#020079]/10">
                <div>
                    <h1 className="text-4xl font-bold text-[#020079] mb-2 font-bebas tracking-wide">
                        Book Service / Project
                    </h1>
                    <p className="text-gray-600 text-base font-roboto">
                        Schedule your vehicle service in {currentStep === 3 ? '4' : '5'} simple steps
                    </p>
                </div>
            </div>

            <BookingStepper currentStep={currentStep} />

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                {renderStep()}
            </div>
        </div>
    );
}
