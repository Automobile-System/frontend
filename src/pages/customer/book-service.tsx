import CustomerLayout from '../../components/customer/layout/CustomerLayout';
import BookingStepper from '../../components/customer/booking/BookingStepper';
import VehicleSelection from '../../components/customer/booking/VehicleSelection';
import ServiceType from '../../components/customer/booking/ServiceType';
import EmployeeSelection from '../../components/customer/booking/EmployeeSelection';
import DateTimeSelection from '../../components/customer/booking/DateTimeSelection';
import Confirmation from '../../components/customer/booking/Confirmation';
import { useState } from 'react';
import { BookingData } from '../../types/booking';

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
                } } onUpdate={function (data: Partial<BookingData>): void {
                    throw new Error('Function not implemented.');
                } }          />
        );
      default:
        return null;
    }
  };

  return (
    <CustomerLayout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#111827', 
            margin: 0 
          }}>
            Book Service / Project
          </h1>
          <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>
            Schedule your vehicle service in 5 simple steps
          </p>
        </div>

        <BookingStepper currentStep={currentStep} />

        <div style={{ 
          background: 'white', 
          borderRadius: '0.75rem', 
          border: '1px solid #e5e7eb',
          padding: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginTop: '2rem'
        }}>
          {renderStep()}
        </div>
      </div>
    </CustomerLayout>
  );
}