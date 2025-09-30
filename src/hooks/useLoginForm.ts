"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoginRequest } from "@/types/authTypes";
import { login } from "@/services/authService";
import { loginSchema } from "@/utils/validation";
import { toast } from "sonner";

export function useLoginForm() {
    const [formData, setFormData] = useState<LoginRequest>({ email: "", password: "" });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(""); // Clear error when user starts typing
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            
            // Validate form data
            loginSchema.parse(formData);
            
            // Attempt login
            const response = await login(formData);
            
            // Store token if needed (you might want to use a proper auth state management)
            if (response.token) {
                localStorage.setItem('auth_token', response.token);
                localStorage.setItem('user_id', response.userId);
                
                toast.success("Login successful! Redirecting to dashboard...");
                
                // Redirect to dashboard
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            }

        } catch (error: unknown) {
            console.error('Login error:', error);
            
            // Type guard for Zod validation error
            if (error && typeof error === 'object' && 'issues' in error) {
                const zodError = error as { issues: Array<{ message: string }> };
                const errorMessage = zodError.issues[0]?.message || "Invalid form data";
                toast.error(errorMessage);
                setError(errorMessage);
            } else if (error && typeof error === 'object' && 'message' in error) {
                const errorMessage = (error as { message: string }).message;
                toast.error(errorMessage || "Login failed. Please check your credentials.");
                setError(errorMessage || "Login failed. Please check your credentials.");
            } else {
                const fallbackMessage = "Login failed. Please check your credentials.";
                toast.error(fallbackMessage);
                setError(fallbackMessage);
            }
        } finally {
            setLoading(false);
        }
    }

    return { formData, loading, error, handleChange, handleSubmit }
}