"use client"

import { useLoginForm } from "@/hooks/useLoginForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react"
import { useState } from "react"

export default function LoginForm() {
    const { formData, loading, fieldErrors, handleChange, handleCheckboxChange, handleSubmit } = useLoginForm()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020079] via-[#03009B] to-black p-4">
            <div className="w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex flex-col items-center mb-4">
                        <div className="text-5xl font-bold font-roboto mb-2">
                            <span className="text-white">NITRO</span>
                            <span className="text-[#FFD700] glow-accent">LINE</span>
                        </div>
                        <div className="w-24 h-1 bg-[#FFD700]"></div>
                    </div>
                    <p className="text-white/80 font-inter">Premium Automotive Services</p>
                </div>

                <Card className="shadow-2xl border-[#FFD700]/20 bg-white/95 backdrop-blur-sm">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-[#020079] text-center font-roboto">
                            Sign In
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
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
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className={`pl-11 pr-12 h-12 bg-white border-gray-300 focus:border-[#020079] focus:ring-[#020079] text-gray-900 text-base placeholder:text-gray-400 ${
                                            fieldErrors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                                        }`}
                                        autoComplete="current-password"
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

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2.5">
                                    <Checkbox
                                        id="rememberMe"
                                        checked={formData.rememberMe}
                                        onCheckedChange={(checked) => {
                                            handleCheckboxChange({
                                                target: {
                                                    name: 'rememberMe',
                                                    checked: checked === true
                                                }
                                            } as React.ChangeEvent<HTMLInputElement>)
                                        }}
                                    />
                                    <label
                                        htmlFor="rememberMe"
                                        className="text-sm font-medium text-gray-700 cursor-pointer select-none hover:text-gray-900"
                                    >
                                        Remember me for 30 days
                                    </label>
                                </div>
                                <Button 
                                    type="button"
                                    variant="link" 
                                    className="p-0 h-auto text-[#020079] hover:text-[#FFD700] text-sm font-semibold"
                                >
                                    Forgot password?
                                </Button>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-[#020079] hover:bg-[#03009B] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 font-roboto uppercase tracking-wider" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner className="mr-2" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="mr-2 h-5 w-5" />
                                        Sign In
                                    </>
                                )}
                            </Button>
                        </form>

                        <Separator className="bg-gray-200" />

                        {/* Sign Up Link */}
                        <div className="text-center text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <a href="/signup" className="text-[#020079] hover:text-[#FFD700] font-semibold transition-colors">
                                Sign Up
                            </a>
                        </div>

                        {/* Help Section */}
                        <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg border-t border-gray-200">
                            <div className="text-center text-sm text-gray-600">
                                Need assistance?{" "}
                                <Button 
                                    type="button"
                                    variant="link" 
                                    className="p-0 h-auto text-[#020079] hover:text-[#FFD700] font-semibold"
                                >
                                    Contact Support
                                </Button>
                            </div>
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