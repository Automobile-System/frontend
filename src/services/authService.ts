import { LoginRequest ,LoginResponse, SignupRequest, SignupResponse, EmployeeSignupRequest, EmployeeSignupResponse } from "@/types/authTypes";

// Prefer explicit env base URLs but fall back to relative paths during build/prerender
// to avoid crashing when env vars are not defined at import time.
// This lets client-side calls work with relative /api routes in dev.
const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE ||
    ""; // empty => use relative URLs like /api/...

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