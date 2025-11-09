'use client';

import { StepProps, AvailableSlot } from "../../../types/booking";
import { useState, useEffect } from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

// API call function
async function fetchAvailableSlots(employeeId: string | null): Promise<AvailableSlot[]> {
  try {
    const url = new URL(`${BASE_URL}/api/booking/available-slots`);
    if (employeeId) {
      url.searchParams.append('employeeId', employeeId);
    }
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    
    url.searchParams.append('startDate', startDate.toISOString().split('T')[0]);
    url.searchParams.append('endDate', endDate.toISOString().split('T')[0]);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch available slots');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return [];
  }
}

export default function DateTimeSelection({
  data,
  onUpdate,
  onNext,
  onBack,
}: StepProps) {
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  useEffect(() => {
    setLoading(true);
    fetchAvailableSlots(data.employeeId).then(slots => {
      setAvailableSlots(slots);
      setLoading(false);
    });
  }, [data.employeeId]);

  const handleDateSelect = (date: string) => {
    onUpdate({ date, time: '' });
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onUpdate({ time });
  };

  const selectedSlot = availableSlots.find(slot => slot.date === data.date);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Step 4: Select Date & Time
        </h2>
        <p className="text-gray-600">
          Choose your preferred appointment date and time
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#020079]"></div>
          <p className="mt-4 text-gray-600">Loading available slots...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Date Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[#020079]" />
              <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
              {availableSlots.map((slot) => (
                <div
                  key={slot.date}
                  onClick={() => slot.isAvailable && handleDateSelect(slot.date)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    !slot.isAvailable
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                      : data.date === slot.date
                      ? 'border-[#020079] bg-[#020079]/5'
                      : 'border-gray-200 hover:border-[#020079]/50'
                  }`}
                >
                  <div className="text-sm font-semibold text-gray-900">
                    {new Date(slot.date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {slot.isAvailable ? (
                      <span className="text-green-600">{slot.availableCount} slots available</span>
                    ) : (
                      <span className="text-red-600">Fully booked</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#020079]" />
              <h3 className="text-lg font-semibold text-gray-900">Select Time</h3>
            </div>
            {!data.date ? (
              <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-blue-800">Please select a date first</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      selectedTime === time
                        ? 'border-[#020079] bg-[#020079]/5'
                        : 'border-gray-200 hover:border-[#020079]/50'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{time}</div>
                  </div>
                ))}
              </div>
            )}
            {selectedSlot && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>{selectedSlot.availableCount}</strong> of <strong>{selectedSlot.totalCapacity}</strong> slots available
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!data.date || !data.time}
          className={`px-8 py-3 rounded-lg font-medium transition-all ${
            data.date && data.time
              ? 'bg-[#020079] hover:bg-[#03009B] text-white cursor-pointer shadow-sm hover:shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Review Booking →
        </button>
      </div>
    </div>
  );
}
