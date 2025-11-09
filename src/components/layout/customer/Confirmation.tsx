'use client';

import { BookingData, Vehicle, Service, Employee } from "@/types/booking";
import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { showToast } from "@/lib/toast";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

interface ConfirmationProps {
  data: BookingData;
  vehicles: Vehicle[];
  services: Service[];
  employees: Employee[];
  onBack: () => void;
  onUpdate: (data: Partial<BookingData>) => void;
}

// API call to book service
async function bookService(bookingData: BookingData): Promise<{success: boolean; message: string; data?: unknown}> {
  try {
    const selectedDateTime = new Date(`${bookingData.date}T${bookingData.time}:00`);
    
    const requestBody = {
      serviceId: bookingData.serviceTypeId,
      vehicleId: bookingData.vehicleId,
      arrivingDate: selectedDateTime.toISOString(),
      employeeId: bookingData.employeeId || undefined, // Optional
    };

    const response = await fetch(`${BASE_URL}/api/booking/service`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to book service');
    }

    return {
      success: true,
      message: 'Service booked successfully!',
      data,
    };
  } catch (error) {
    console.error('Booking error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to book service',
    };
  }
}

export default function Confirmation({
  data,
  vehicles,
  services,
  employees,
  onBack,
}: ConfirmationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const selectedVehicle = vehicles.find(v => v.vehicleId === data.vehicleId);
  const selectedService = services.find(s => s.serviceId === data.serviceTypeId);
  const selectedEmployee = employees.find(e => e.id === data.employeeId);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    const result = await bookService(data);
    
    if (result.success) {
      showToast.success(result.message);
      // Redirect to bookings page
      setTimeout(() => {
        router.push('/customer/bookings');
      }, 1500);
    } else {
      showToast.error(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Step 5: Review & Confirm
        </h2>
        <p className="text-gray-600">
          Please review your booking details before confirming
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-6">
        {/* Vehicle Details */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Vehicle</h3>
          {selectedVehicle ? (
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-gray-900">
                {selectedVehicle.brandName} {selectedVehicle.model}
              </p>
              <p className="text-gray-600 text-sm">
                {selectedVehicle.registrationNo} • {selectedVehicle.capacity} cc
              </p>
            </div>
          ) : (
            <p className="text-red-600">Vehicle not found</p>
          )}
        </div>

        {/* Service Details */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Service</h3>
          {selectedService ? (
            <div className="bg-white p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-gray-900">{selectedService.title}</p>
                <p className="text-[#FFD700] font-bold">Rs. {selectedService.cost.toLocaleString()}</p>
              </div>
              <p className="text-gray-600 text-sm mb-1">{selectedService.description}</p>
              <p className="text-gray-500 text-xs">
                Category: {selectedService.category} • Est. {selectedService.estimatedHours} hours
              </p>
            </div>
          ) : (
            <p className="text-red-600">Service not found</p>
          )}
        </div>

        {/* Employee Details */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Technician</h3>
          {selectedEmployee ? (
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-gray-900">{selectedEmployee.fullName}</p>
              <p className="text-gray-600 text-sm">{selectedEmployee.specialty}</p>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-600 text-sm">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Manager will assign a technician
              </p>
            </div>
          )}
        </div>

        {/* DateTime Details */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Appointment</h3>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold text-gray-900">
              {new Date(data.date).toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-gray-600">Time: {data.time}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900">Please Note:</p>
            <ul className="text-sm text-blue-800 mt-1 space-y-1">
              <li>• Arrive 10 minutes before your appointment</li>
              <li>• Bring your vehicle registration documents</li>
              <li>• Payment can be made after service completion</li>
              <li>• You&apos;ll receive a confirmation email shortly</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="px-8 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="px-8 py-3 rounded-lg font-medium bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] transition-all shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Booking...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Confirm Booking
            </>
          )}
        </button>
      </div>
    </div>
  );
}
