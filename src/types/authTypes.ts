export interface LoginRequest{
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginResponse{
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    expiresIn: number;
    lastLoginAt: string;
    rememberMe: boolean;
    message: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    nationalId: string;
    phoneNumber: string;
}

export interface SignupResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    nic: string;
    phoneNumber: string;
    roles: string[];
    createdAt: string;
    customerId: string;
}

export interface EmployeeSignupRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    nationalId: string;
    phoneNumber: string;
    speciality: string;
    employeeType: "STAFF" | "MANAGER" | "ADMIN";
}

export interface EmployeeSignupResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    nic: string;
    phoneNumber: string;
    roles: string[];
    createdAt: string;
    employeeId: string;
    specialty: string;
}

export interface CustomerProfile {
    id: string;
    customerId: string;
    email: string;
    firstName: string;
    lastName: string;
    nationalId: string;
    phoneNumber: string;
    profileImageUrl: string | null;
    roles: string[];
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string;
}

export interface UpdateCustomerProfileRequest {
    email?: string;
    firstName?: string;
    lastName?: string;
    nationalId?: string;
    phoneNumber?: string;
    profileImageUrl?: string;
}

export interface CustomerVehicle {
    vehicleId: string;
    registrationNo: string;
    brandName: string;
    model: string;
    capacity: number;
    createdBy: string | null;
    customerId: string;
}

export interface AddVehicleRequest {
    registrationNo: string;
    brandName: string;
    model: string;
    capacity: number;
}