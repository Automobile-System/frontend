"use client"
import React, { useState } from 'react'
import { LoginRequest } from "@/types/authTypes"
import { login } from "@/services/authService"
import { loginSchema } from "@/utils/validation"
import { showToast } from "@/lib/toast"
import { useRouter } from 'next/navigation'

export function useLoginForm() {
    const [formData, setFormData] = useState<LoginRequest>({ email: "", password: "" })
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFieldErrors({})
        
        try {
            setLoading(true)
            
            // Validate form data
            const validatedData = loginSchema.parse(formData)
            
            // Show loading toast
            const loginPromise = login(validatedData)
            
            showToast.promise(loginPromise, {
                loading: "Signing you in...",
                success: () => {
                    // Redirect to dashboard or home page on success
                    router.push('/')
                    return "Login successful! Welcome back."
                },
                error: (error: any) => {
                    return error?.message || "Login failed. Please try again."
                }
            })
            
            await loginPromise

        } catch (error: any) {
            if (error?.issues) {
                // Handle Zod validation errors
                const errors: Record<string, string> = {}
                error.issues.forEach((issue: any) => {
                    const path = issue.path[0]
                    if (path) {
                        errors[path] = issue.message
                    }
                })
                setFieldErrors(errors)
            } else {
                showToast.error("Login failed", error?.message || "Something went wrong")
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
        handleSubmit 
    }
}