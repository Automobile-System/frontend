'use client';

import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import BookingStepper from '@/components/layout/customer/BookingStepper';
import VehicleSelection from '@/components/layout/customer/VehicleSelection';
import ServiceType from '@/components/layout/customer/ServiceType';
import EmployeeSelection from '@/components/layout/customer/EmployeeSelection';
import DateTimeSelection from '@/components/layout/customer/DateTimeSelection';
import Confirmation from '@/components/layout/customer/Confirmation';
import { useState } from 'react';
import { BookingData } from '@/types/booking';

export default function BookService() {
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>({
        vehicleId: null,
        serviceTypeId: null,
        employeeId: null,
        date: '',
        time: '',
        notes: ''
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
                        onUpdate={updateBookingData}
                        onNext={nextStep}
                    />
                );
            case 2:
                return (
                    <ServiceType
                        data={bookingData}
                        onUpdate={updateBookingData}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                );
            case 3:
                return (
                    <EmployeeSelection
                        data={bookingData}
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
                        onBack={prevStep}
                        onConfirm={() => {
                            console.log('Booking confirmed:', bookingData);
                            alert('Service booked successfully!');
                        }} onUpdate={function (): void {
                            throw new Error('Function not implemented.');
                        }} />
                );
            default:
                return null;
        }
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
                            Book Service / Project
                        </h1>
                        <p
                            style={{
                                color: "#6b7280",
                                margin: 0,
                                fontSize: "1rem",
                                fontFamily: "var(--font-roboto, sans-serif)",
                            }}
                        >
                            Schedule your vehicle service in 5 simple steps
                        </p>
                    </div>
                </div>

                <BookingStepper currentStep={currentStep} />

                <div
                    style={{
                        background: "white",
                        borderRadius: "1rem",
                        border: "1px solid #e5e7eb",
                        padding: "2rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                >
                    {renderStep()}
                </div>
            </div>
        </CustomerLayout>
    );
}