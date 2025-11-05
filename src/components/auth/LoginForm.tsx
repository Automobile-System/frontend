"use client"

import { useLoginForm } from "@/hooks/useLoginForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Eye, EyeOff, Mail, Lock, Car, ShieldCheck } from "lucide-react"
import { useState } from "react"

export default function LoginForm() {
    const { formData, loading, fieldErrors, handleChange, handleCheckboxChange, handleSubmit } = useLoginForm()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 p-4">
            <div className="w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 mb-4 shadow-lg">
                        <Car className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">CarVeo</h1>
                    <p className="text-gray-600">Automobile Service</p>
                </div>

                <Card className="shadow-2xl border-gray-200">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-gray-900 text-center">
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
                                        className={`pl-11 h-12 bg-white border-gray-300 focus:border-red-600 focus:ring-red-600 text-gray-900 text-base placeholder:text-gray-400 ${
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
                                        className={`pl-11 pr-12 h-12 bg-white border-gray-300 focus:border-red-600 focus:ring-red-600 text-gray-900 text-base placeholder:text-gray-400 ${
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
                                    className="p-0 h-auto text-red-600 hover:text-red-700 text-sm font-semibold"
                                >
                                    Forgot password?
                                </Button>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200" 
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

                        {/* Help Section */}
                        <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg border-t border-gray-200">
                            <div className="text-center text-sm text-gray-600">
                                Need assistance?{" "}
                                <Button 
                                    type="button"
                                    variant="link" 
                                    className="p-0 h-auto text-red-600 hover:text-red-700 font-semibold"
                                >
                                    Contact Support
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        Secure connection • Your data is protected
                    </p>
                </div>
            </div>
        </div>
    )
}