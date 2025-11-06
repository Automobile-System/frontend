import { LoginRequest ,LoginResponse, SignupRequest, SignupResponse, EmployeeSignupRequest, EmployeeSignupResponse } from "@/types/authTypes";

// Lazily resolve base URL to avoid build-time crashes during prerender
// If NEXT_PUBLIC_BASE_URL is not set, default to relative URLs (same-origin)
const getBaseUrl = () => (process.env.NEXT_PUBLIC_BASE_URL ?? "");

export async function login(data:LoginRequest): Promise<LoginResponse> {
    const base = getBaseUrl();
    const res = await fetch(`${base}/api/auth/login`, {
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
    const base = getBaseUrl();
    const res = await fetch(`${base}/api/auth/signup`, {
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
    const base = getBaseUrl();
    const res = await fetch(`${base}/api/employee/auth/signup`, {
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