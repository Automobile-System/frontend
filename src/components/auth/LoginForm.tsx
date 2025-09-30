"use client"

import { useLoginForm } from "@/hooks/useLoginForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Eye, EyeOff, Mail, Lock, Car } from "lucide-react"
import { useState } from "react"

export default function LoginForm() {
    const { formData, loading, fieldErrors, handleChange, handleSubmit } = useLoginForm()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="rounded-full bg-primary p-3">
                            <Car className="h-6 w-6 text-primary-foreground" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription>
                        Sign in to your Automobile Management account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                className={fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                                autoComplete="email"
                                required
                            />
                            {fieldErrors.email && (
                                <p className="text-sm text-destructive">{fieldErrors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className={fieldErrors.password ? "border-destructive focus-visible:ring-destructive pr-10" : "pr-10"}
                                    autoComplete="current-password"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            {fieldErrors.password && (
                                <p className="text-sm text-destructive">{fieldErrors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 focus:ring-primary"
                                />
                                <span className="text-muted-foreground">Remember me</span>
                            </label>
                            <Button variant="link" size="sm" className="p-0 h-auto">
                                Forgot password?
                            </Button>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={loading}
                            size="lg"
                        >
                            {loading ? (
                                <>
                                    <Spinner className="mr-2" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>

                    <Separator />

                    <div className="text-center text-sm text-muted-foreground">
                        Need help? Contact{" "}
                        <Button variant="link" size="sm" className="p-0 h-auto">
                            system administrator
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}