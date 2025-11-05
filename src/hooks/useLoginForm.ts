"use client"
import React, { useState } from 'react'
import { LoginRequest } from "@/types/authTypes"
import { login } from "@/services/authService"
import { loginSchema } from "@/utils/validation"
import { showToast } from "@/lib/toast"
import { useRouter } from 'next/navigation'

export function useLoginForm() {
    const [formData, setFormData] = useState<LoginRequest>({ email: "", password: "", rememberMe: false })
    const [loading, setLoading] = useState<boolean>(false)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        
        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFormData(prev => ({ ...prev, [name]: checked }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFieldErrors({})
        
        try {
            setLoading(true)
            
            // Validate form data
            const validatedData = loginSchema.parse(formData)
            console.log("Validated Data:", validatedData)
            // Show loading toast
            const loginPromise = login(validatedData)
            
            showToast.promise(loginPromise, {
                loading: "Signing you in...",
                success: () => {
                    // Redirect to dashboard or home page on success
                    router.push('/')
                    return "Login successful! Welcome back."
                },
                error: (error: Error) => {
                    return error?.message || "Login failed. Please try again."
                }
            })
            
            await loginPromise

        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'issues' in error) {
                // Handle Zod validation errors
                const zodError = error as { issues: Array<{ path: (string | number)[]; message: string }> }
                const errors: Record<string, string> = {}
                zodError.issues.forEach((issue) => {
                    const path = issue.path[0]
                    if (path && typeof path === 'string') {
                        errors[path] = issue.message
                    }
                })
                setFieldErrors(errors)
            } else {
                const errorMessage = error instanceof Error ? error.message : "Something went wrong"
                showToast.error("Login failed", errorMessage)
            }
        } finally {
            setLoading(false)
        }
    }

    return { 
        formData, 
        loading, 
        fieldErrors, 
        handleChange,
        handleCheckboxChange, 
        handleSubmit 
    }
}