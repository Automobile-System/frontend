import {LoginRequest ,LoginResponse} from "@/types/authTypes";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if(!BASE_URL) throw new Error("BASE_URL not set");

export async function login(data:LoginRequest): Promise<LoginResponse> {

    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
        credentials: "include",
    })

    if(!res.ok) throw new Error(`Login failed with status ${res.statusText}`);
    return res.json();
}