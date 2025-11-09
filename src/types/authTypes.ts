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

// Manager Dashboard Types
export interface ManagerDashboardOverview {
    activeEmployees: {
        total: number;
        available: number;
    };
    ongoingServices: {
        total: number;
        status: string;
    };
    projectsPending: {
        total: number;
        status: string;
    };
    avgCompletionTime: {
        value: number;
        unit: string;
    };
    systemAlerts?: Array<{
        message: string;
        employee: string;
        reason: string;
    }>;
    taskDistribution?: Record<string, string>;
    completionRateTrend?: Record<string, string>;
}

// Reports Types
export interface ReportsResponse {
    data?: Record<string, number>; // Map of employee name -> task count
    dataList?: Array<{
        name: string;
        requests?: number;
        month?: string;
        delays?: number;
        type?: string;
        value?: number;
    }>;
    averageDelayDays?: number;
    mostCommonReason?: string;
    type?: string;
}

// Pie Chart Data Format (for recharts)
export interface PieChartData {
    name: string;
    value: number;
    [key: string]: string | number; // Allow additional properties for recharts
}

export interface CompletionRateTrendResponse {
    chartType: string;
    title: string;
    data: Array<{
        month: string;
        rate: number;
        completedTasks: number;
        totalTasks: number;
    }>;
}