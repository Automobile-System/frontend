"use client"
import React, { useState } from 'react'
import { EmployeeSignupRequest } from "@/types/authTypes"
import { employeeSignup } from "@/services/authService"
import { employeeSignupSchema } from "@/utils/validation"
import { showToast } from "@/lib/toast"
import { useRouter } from 'next/navigation'

export function useEmployeeSignupForm() {
    const [formData, setFormData] = useState<EmployeeSignupRequest>({ 
        email: "", 
        password: "",
        firstName: "",
        lastName: "",
        nationalId: "",
        phoneNumber: "",
        speciality: "",
        employeeType: "STAFF"
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            const validatedData = employeeSignupSchema.parse(formData)
            console.log("Validated Data:", validatedData)
            
            // Call employee signup API
            const response = await employeeSignup(validatedData)
            
            // Show success toast
            showToast.success("Employee account created!", `Welcome, ${response.firstName}! Your Employee ID is ${response.employeeId}`)
            
            // Redirect to staff login page
            setTimeout(() => {
                router.push('/staff/login')
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
                showToast.error("Employee signup failed", errorMessage)
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
