"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  Car,
  Wrench,
  AlertTriangle,
  DollarSign,
  Clock,
  Users,
  Calendar,
  BarChart3,
  Plus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
    const stats = [
        {
            title: "Total Vehicles",
            value: "248",
            change: "+12%",
            changeType: "positive" as const,
            icon: Car,
            description: "Active fleet vehicles"
        },
        {
            title: "Maintenance Due",
            value: "23",
            change: "+3",
            changeType: "negative" as const,
            icon: Wrench,
            description: "Scheduled this week"
        },
        {
            title: "Active Alerts",
            value: "8",
            change: "-2",
            changeType: "positive" as const,
            icon: AlertTriangle,
            description: "Critical issues"
        },
        {
            title: "Monthly Cost",
            value: "$45,231",
            change: "-8%",
            changeType: "positive" as const,
            icon: DollarSign,
            description: "Maintenance expenses"
        }
    ];

    const recentActivities = [
        { vehicle: "BMW X5 - ABC123", action: "Oil Change Completed", time: "2 hours ago", status: "completed" },
        { vehicle: "Toyota Camry - DEF456", action: "Brake Inspection", time: "4 hours ago", status: "in-progress" },
        { vehicle: "Honda Accord - GHI789", action: "Tire Rotation Scheduled", time: "6 hours ago", status: "scheduled" },
        { vehicle: "Ford F-150 - JKL012", action: "Engine Diagnostic", time: "1 day ago", status: "completed" }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header />

                {/* Dashboard Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Page Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                                <p className="text-gray-600 mt-2">
                                    Welcome back! Here&apos;s what&apos;s happening with your fleet today.
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <Button 
                                    variant="outline"
                                    onClick={() => toast.info("Reports feature coming soon!")}
                                >
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    View Reports
                                </Button>
                                <Button onClick={() => toast.success("Vehicle added successfully!")}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Vehicle
                                </Button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <Card key={index} className="hover:shadow-md transition-shadow">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-600">
                                            {stat.title}
                                        </CardTitle>
                                        <stat.icon className="h-4 w-4 text-gray-600" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                        <div className="flex items-center mt-1">
                                            <span className={`text-xs font-medium ${
                                                stat.changeType === 'positive' 
                                                    ? 'text-green-600' 
                                                    : stat.changeType === 'negative'
                                                    ? 'text-red-600'
                                                    : 'text-gray-600'
                                            }`}>
                                                {stat.change}
                                            </span>
                                            <span className="text-xs text-gray-500 ml-1">from last month</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Recent Activities */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Clock className="mr-2 h-5 w-5" />
                                        Recent Activities
                                    </CardTitle>
                                    <CardDescription>
                                        Latest maintenance and fleet activities
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentActivities.map((activity, index) => (
                                            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                                <div className={`w-2 h-2 rounded-full ${
                                                    activity.status === 'completed' 
                                                        ? 'bg-green-500'
                                                        : activity.status === 'in-progress'
                                                        ? 'bg-yellow-500'
                                                        : 'bg-blue-500'
                                                }`} />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {activity.vehicle}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{activity.action}</p>
                                                </div>
                                                <span className="text-xs text-gray-400">{activity.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="outline" className="w-full mt-4">
                                        View All Activities
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <BarChart3 className="mr-2 h-5 w-5" />
                                        Quick Actions
                                    </CardTitle>
                                    <CardDescription>
                                        Frequently used operations
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                                            <Car className="h-6 w-6" />
                                            <span className="text-sm">Add Vehicle</span>
                                        </Button>
                                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                                            <Wrench className="h-6 w-6" />
                                            <span className="text-sm">Schedule Maintenance</span>
                                        </Button>
                                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                                            <Users className="h-6 w-6" />
                                            <span className="text-sm">Assign Driver</span>
                                        </Button>
                                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                                            <Calendar className="h-6 w-6" />
                                            <span className="text-sm">View Calendar</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Maintenance Calendar Preview */}
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Upcoming Maintenance
                                </CardTitle>
                                <CardDescription>
                                    Scheduled maintenance for the next 7 days
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <div>
                                                <p className="font-medium">BMW X5 - ABC123</p>
                                                <p className="text-sm text-gray-600">Annual Inspection</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">Tomorrow, 9:00 AM</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div>
                                                <p className="font-medium">Toyota Camry - DEF456</p>
                                                <p className="text-sm text-gray-600">Oil Change</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">Dec 4, 2:00 PM</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <div>
                                                <p className="font-medium">Honda Accord - GHI789</p>
                                                <p className="text-sm text-gray-600">Tire Rotation</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">Dec 6, 10:30 AM</span>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full mt-4">
                                    View Full Calendar
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}