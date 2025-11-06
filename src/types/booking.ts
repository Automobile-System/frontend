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
    vehicleId: number | null;
    serviceTypeId: number | null;
    employeeId: number | null;
    date: string;
    time: string;
    notes: string;
}

export interface Vehicle {
    id: number;
    name: string;
    licensePlate: string;
    model: string;
}

export interface Service {
    id: number;
    name: string;
    duration: string;
    price: string;
    description: string;
}

export interface Employee {
    id: number;
    name: string;
    specialization: string;
    rating: number | null;
    experience: string;
}

export interface StepProps {
    data: BookingData;
    onUpdate: (data: Partial<BookingData>) => void;
    onNext: () => void;
    onBack?: () => void;
    onConfirm?: () => void;
}
