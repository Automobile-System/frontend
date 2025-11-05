"use client"
import React, { useState } from 'react'
import { SignupRequest } from "@/types/authTypes"
import { signup } from "@/services/authService"
import { signupSchema } from "@/utils/validation"
import { showToast } from "@/lib/toast"
import { useRouter } from 'next/navigation'

export function useSignupForm() {
    const [formData, setFormData] = useState<SignupRequest>({ 
        email: "", 
        password: "",
        firstName: "",
        lastName: "",
        nationalId: "",
        phoneNumber: ""
    })
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
            const validatedData = signupSchema.parse(formData)
            console.log("Validated Data:", validatedData)
            
            // Call signup API
            const response = await signup(validatedData)
            
            // Show success toast
            showToast.success("Account created successfully!", `Welcome, ${response.firstName}! Your Customer ID is ${response.customerId}`)
            
            // Redirect to login page
            setTimeout(() => {
                router.push('/login')
            }, 1500)

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
                showToast.error("Signup failed", errorMessage)
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
