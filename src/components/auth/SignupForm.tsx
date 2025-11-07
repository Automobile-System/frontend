"use client"

import { useSignupForm } from "@/hooks/useSignupForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Eye, EyeOff, Mail, Lock, User, Phone, CreditCard, Car, ShieldCheck } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function SignupForm() {
    const { formData, loading, fieldErrors, handleChange, handleSubmit } = useSignupForm()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020079] via-[#03009B] to-black p-4 py-12">
            <div className="w-full max-w-2xl">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#020079] mb-4 shadow-lg border-2 border-[#FFD700]">
                        <Car className="h-8 w-8 text-[#FFD700]" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-wider">NITROLINE</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-3"></div>
                    <p className="text-white/80">Create Your Account</p>
                </div>

                <Card className="shadow-2xl border border-[#FFD700]/30 bg-white/95 backdrop-blur-md">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-[#020079] text-center">
                            Sign Up
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600">
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Fields - Side by Side */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* First Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                                        First Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className={`pl-11 h-12 bg-white border-gray-300 focus:border-[#020079] focus:ring-[#020079] text-gray-900 text-base placeholder:text-gray-400 ${
                                                fieldErrors.firstName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                            }`}
                                            autoComplete="given-name"
                                            required
                                        />
                                    </div>
                                    {fieldErrors.firstName && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <span className="font-medium">⚠</span> {fieldErrors.firstName}
                                        </p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                                        Last Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className={`pl-11 h-12 bg-white border-gray-300 focus:border-[#020079] focus:ring-[#020079] text-gray-900 text-base placeholder:text-gray-400 ${
                                                fieldErrors.lastName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                            }`}
                                            autoComplete="family-name"
                                            required
                                        />
                                    </div>
                                    {fieldErrors.lastName && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <span className="font-medium">⚠</span> {fieldErrors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className={`pl-11 h-12 bg-white border-gray-300 focus:border-[#020079] focus:ring-[#020079] text-gray-900 text-base placeholder:text-gray-400 ${
                                            fieldErrors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                        }`}
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="font-medium">⚠</span> {fieldErrors.email}
                                    </p>
                                )}
                            </div>

                            {/* Contact Fields - Side by Side */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* National ID */}
                                <div className="space-y-2">
                                    <Label htmlFor="nationalId" className="text-sm font-semibold text-gray-700">
                                        National ID (NIC)
                                    </Label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="nationalId"
                                            name="nationalId"
                                            type="text"
                                            placeholder="200203601188"
                                            value={formData.nationalId}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className={`pl-11 h-12 bg-white border-gray-300 focus:border-[#020079] focus:ring-[#020079] text-gray-900 text-base placeholder:text-gray-400 ${
                                                fieldErrors.nationalId ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                            }`}
                                            required
                                        />
                                    </div>
                                    {fieldErrors.nationalId && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <span className="font-medium">⚠</span> {fieldErrors.nationalId}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">
                                        Phone Number
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            placeholder="+94712345678"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className={`pl-11 h-12 bg-white border-gray-300 focus:border-[#020079] focus:ring-[#020079] text-gray-900 text-base placeholder:text-gray-400 ${
                                                fieldErrors.phoneNumber ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                            }`}
                                            autoComplete="tel"
                                            required
                                        />
                                    </div>
                                    {fieldErrors.phoneNumber && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <span className="font-medium">⚠</span> {fieldErrors.phoneNumber}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Minimum 8 characters"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className={`pl-11 pr-12 h-12 bg-white border-gray-300 focus:border-[#020079] focus:ring-[#020079] text-gray-900 text-base placeholder:text-gray-400 ${
                                            fieldErrors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                        }`}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 px-3 hover:bg-gray-100"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-500" />
                                        )}
                                    </Button>
                                </div>
                                {fieldErrors.password && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <span className="font-medium">⚠</span> {fieldErrors.password}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-[#020079] hover:bg-[#FFD700] hover:text-[#020079] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner className="mr-2" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="mr-2 h-5 w-5" />
                                        Create Account
                                    </>
                                )}
                            </Button>
                        </form>

                        <Separator className="bg-gray-200" />

                        {/* Login Link */}
                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link 
                                href="/login"
                                className="text-[#020079] hover:text-[#FFD700] font-semibold transition-colors"
                            >
                                Sign In
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-white/60 flex items-center justify-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        Secure connection • Your data is protected
                    </p>
                </div>
            </div>
        </div>
    )
}
