import { LoginRequest ,LoginResponse, SignupRequest, SignupResponse, EmployeeSignupRequest, EmployeeSignupResponse } from "@/types/authTypes";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if(!BASE_URL) throw new Error("BASE_URL not set");

export async function login(data:LoginRequest): Promise<LoginResponse> {

    const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
        credentials: "include",
    })

    if(!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        const errorMessage = errorData.message || errorData.error || `Login failed with status ${res.statusText}`
        throw new Error(errorMessage)
    }
    
    return res.json();
}

export async function signup(data: SignupRequest): Promise<SignupResponse> {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    })

    if(!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        const errorMessage = errorData.message || errorData.error || `Signup failed with status ${res.statusText}`
        throw new Error(errorMessage)
    }
    
    return res.json();
}

export async function employeeSignup(data: EmployeeSignupRequest): Promise<EmployeeSignupResponse> {
    const res = await fetch(`${BASE_URL}/api/employee/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
        credentials: "include",
    })

    if(!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        const errorMessage = errorData.message || errorData.error || `Employee signup failed with status ${res.statusText}`
        throw new Error(errorMessage)
    }
    
    return res.json();
}