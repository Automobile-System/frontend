"use client";

import { useState, useEffect } from "react";
import { showToast } from "@/lib/toast";
import { getCustomerVehicles } from "@/services/api";
import { CustomerVehicle } from "@/types/authTypes";
import { X, AlertCircle, Loader2, Calendar } from "lucide-react";

interface AddServiceModalProps {
  onClose: () => void;
  onServiceAdded?: () => void;
}

interface FormErrors {
  vehicleId?: string;
  serviceId?: string;
  arrivingDate?: string;
  employeeId?: string;
}

interface Service {
  serviceId: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string | null;
  estimatedHours: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
}

interface AvailableSlot {
  date: string;
  totalCapacity: number;
  bookedCount: number;
  availableCount: number;
  isAvailable: boolean;
}

interface Employee {
  id: string;
  fullName: string;
  createdAt: string;
  specialty: string;
  empRating: number | null;
  profileImage: string | null;
}

export default function AddServiceModal({ onClose, onServiceAdded }: AddServiceModalProps) {
  const [formData, setFormData] = useState({
    vehicleId: "",
    serviceId: "",
    arrivingDate: "",
    employeeId: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehicles, setVehicles] = useState<CustomerVehicle[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);

  useEffect(() => {
    fetchVehicles();
    fetchServices();
    fetchAvailableSlots();
    fetchEmployees();
  }, []);

  const fetchVehicles = async () => {
    try {
      setIsLoadingVehicles(true);
      const data = await getCustomerVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
      showToast.error('Failed to load vehicles');
    } finally {
      setIsLoadingVehicles(false);
    }
  };

  const fetchServices = async () => {
    try {
      setIsLoadingServices(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      showToast.error('Failed to load services');
    } finally {
      setIsLoadingServices(false);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      setIsLoadingSlots(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/available-slots`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableSlots(data.filter((slot: AvailableSlot) => slot.isAvailable));
      }
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      setIsLoadingEmployees(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/all-employees`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setIsLoadingEmployees(false);
    }
  };

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const selectedService = services.find(s => s.serviceId === parseInt(formData.serviceId));
  const selectedSlot = availableSlots.find(slot => slot.date === formData.arrivingDate);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.vehicleId) {
      newErrors.vehicleId = "Please select a vehicle";
    }

    if (!formData.serviceId) {
      newErrors.serviceId = "Please select a service";
    }

    if (!formData.arrivingDate) {
      newErrors.arrivingDate = "Please select a date";
    }

    if (!formData.employeeId) {
      newErrors.employeeId = "Please select an employee";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast.error("Please fix the form errors before submitting");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/service`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: parseInt(formData.serviceId),
          arrivingDate: new Date(formData.arrivingDate).toISOString(),
          vehicleId: formData.vehicleId,
          employeeId: formData.employeeId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to book service");
      }
      
      showToast.success("Service booked successfully!");
      
      if (onServiceAdded) {
        onServiceAdded();
      }
      onClose();
    } catch (err: unknown) {
      console.error("Failed to book service:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to book service. Please try again.";
      showToast.error(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Book a Service
            </h2>
            <p className="text-gray-600 text-sm">
              Schedule a service appointment for your vehicle
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.vehicleId}
              onChange={(e) => handleInputChange('vehicleId', e.target.value)}
              disabled={isLoadingVehicles}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 outline-none transition-all ${
                errors.vehicleId
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-[#020079] focus:ring-2 focus:ring-[#020079]/20'
              }`}
            >
              <option value="">{isLoadingVehicles ? 'Loading vehicles...' : 'Select a vehicle'}</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                  {vehicle.brandName} {vehicle.model} - {vehicle.registrationNo}
                </option>
              ))}
            </select>
            {errors.vehicleId && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.vehicleId}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.serviceId}
              onChange={(e) => handleInputChange('serviceId', e.target.value)}
              disabled={isLoadingServices}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 outline-none transition-all ${
                errors.serviceId
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-[#020079] focus:ring-2 focus:ring-[#020079]/20'
              }`}
            >
              <option value="">{isLoadingServices ? 'Loading services...' : 'Select a service'}</option>
              {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
                <optgroup key={category} label={category}>
                  {categoryServices.map((service) => (
                    <option key={service.serviceId} value={service.serviceId}>
                      {service.title} - LKR {service.cost.toLocaleString()} ({service.estimatedHours}h)
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {errors.serviceId && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.serviceId}</span>
              </div>
            )}
            {selectedService && (
              <p className="text-xs text-gray-600 mt-2">{selectedService.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arriving Date <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.arrivingDate}
              onChange={(e) => handleInputChange('arrivingDate', e.target.value)}
              disabled={isLoadingSlots}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 outline-none transition-all ${
                errors.arrivingDate
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-[#020079] focus:ring-2 focus:ring-[#020079]/20'
              }`}
            >
              <option value="">{isLoadingSlots ? 'Loading dates...' : 'Select a date'}</option>
              {availableSlots.map((slot) => (
                <option key={slot.date} value={slot.date}>
                  {new Date(slot.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })} - {slot.availableCount} slots available
                </option>
              ))}
            </select>
            {errors.arrivingDate && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.arrivingDate}</span>
              </div>
            )}
            {selectedSlot && (
              <div className="flex items-center gap-2 mt-2 text-xs">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-medium">
                  {selectedSlot.availableCount} of {selectedSlot.totalCapacity} slots available
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Employee <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.employeeId}
              onChange={(e) => handleInputChange('employeeId', e.target.value)}
              disabled={isLoadingEmployees}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 outline-none transition-all ${
                errors.employeeId
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-[#020079] focus:ring-2 focus:ring-[#020079]/20'
              }`}
            >
              <option value="">{isLoadingEmployees ? 'Loading employees...' : 'Select an employee'}</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.fullName} - {employee.specialty}
                </option>
              ))}
            </select>
            {errors.employeeId && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.employeeId}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-[#020079] text-white rounded-lg hover:bg-[#03009B] transition-all font-semibold text-sm shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Booking...
                </>
              ) : (
                "Book Service"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
