export type BookingFormData = {
  firstName: string
  lastName: string
  phone: string
  vehicleType: string
  vehicleNumber: string
  services: string[]
  branch: string
  date: string
  time: string
  additionalNotes?: string
}

export type VehicleType = 
  | "Sedan"
  | "SUV"
  | "Truck"
  | "Van"
  | "Sports Car"
  | "Luxury Car"
  | "Other"

export type ServiceType = 
  | "Full Service"
  | "Oil Change"
  | "Brake Service"
  | "Tire Service"
  | "Engine Diagnostics"
  | "Transmission Service"
  | "Air Conditioning"
  | "Battery Service"
  | "Wheel Alignment"
  | "Paint Protection"
  | "Detailing"
  | "Custom Modification"

export type Branch = 
  | "Colombo"
  | "Kandy"
  | "Matara"
  | "Galle"
  | "Badulla"
  | "Kalutara"
  | "Gampaha"
  | "Negombo"
  | "Panadura"
export interface BookingData {
    vehicleId: string | null;
    serviceTypeId: number | null;
    employeeId: string | null; // Optional - if not selected, manager assigns
    date: string;
    time: string;
}

export interface Vehicle {
    vehicleId: string;
    registrationNo: string;
    brandName: string;
    model: string;
    capacity: number;
    customerId: string;
    customerEmail: string;
}

export interface Service {
    serviceId: number;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    estimatedHours: number;
    cost: number;
    createdAt: string;
    updatedAt: string;
}

export interface Employee {
    id: string;
    fullName: string;
    createdAt: string;
    specialty: string;
    empRating: number | null;
    profileImage: string | null;
}

export interface AvailableSlot {
    date: string;
    totalCapacity: number;
    bookedCount: number;
    availableCount: number;
    isAvailable: boolean;
}

export interface StepProps {
    data: BookingData;
    onUpdate: (data: Partial<BookingData>) => void;
    onNext: () => void;
    onBack?: () => void;
    onConfirm?: () => void;
}
