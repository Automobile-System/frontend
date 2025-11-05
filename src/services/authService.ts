import { LoginRequest ,LoginResponse, SignupRequest, SignupResponse, EmployeeSignupRequest, EmployeeSignupResponse } from "@/types/authTypes";

// Helper function to get BASE_URL with validation
function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  
  // During build time (SSR), provide a placeholder to prevent build failures
  if (typeof window === 'undefined') {
    // Return the env var if set, otherwise return empty string for build time
    // This allows the build to complete, but API calls will fail at runtime if not set
    return url || '';
  }
  
  // Client-side: use env var or fallback to current origin
  if (!url) {
    // Fallback to current origin if not set
    return window.location.origin;
  }
  
  return url;
}

export async function login(data:LoginRequest): Promise<LoginResponse> {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/auth/login`, {
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
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/auth/signup`, {
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
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/employee/auth/signup`, {
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