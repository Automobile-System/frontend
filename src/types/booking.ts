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