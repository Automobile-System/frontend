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
