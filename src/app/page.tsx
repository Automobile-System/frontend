"use client"

import AppLayout from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Car, 
  Users, 
  Wrench, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  DollarSign
} from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Vehicles",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Active Customers",
      value: "892",
      change: "+8%",
      trend: "up", 
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Pending Maintenance",
      value: "23",
      change: "-5%",
      trend: "down",
      icon: Wrench,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
    {
      title: "Revenue This Month",
      value: "$54,239",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
    },
  ]

  const recentActivities = [
    {
      type: "maintenance",
      message: "Honda Civic (ABC-123) completed oil change",
      time: "2 hours ago",
      status: "completed",
    },
    {
      type: "customer",
      message: "New customer John Smith registered",
      time: "4 hours ago", 
      status: "new",
    },
    {
      type: "appointment",
      message: "Appointment scheduled for Toyota Camry (XYZ-456)",
      time: "6 hours ago",
      status: "scheduled",
    },
    {
      type: "alert",
      message: "Vehicle inspection due for BMW X5 (DEF-789)",
      time: "8 hours ago",
      status: "warning",
    },
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your automobile business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-md p-2 ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className={`mr-1 h-3 w-3 ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-4 md:grid-cols-7">
          {/* Recent Activities */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest updates from your automobile management system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {activity.type === 'maintenance' && <Wrench className="h-4 w-4 text-orange-500" />}
                      {activity.type === 'customer' && <Users className="h-4 w-4 text-green-500" />}
                      {activity.type === 'appointment' && <Calendar className="h-4 w-4 text-blue-500" />}
                      {activity.type === 'alert' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {activity.message}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                    <div>
                      <Badge 
                        variant={
                          activity.status === 'completed' ? 'default' :
                          activity.status === 'new' ? 'secondary' :
                          activity.status === 'scheduled' ? 'outline' :
                          'destructive'
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Frequently used actions for faster workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button className="w-full justify-start" variant="outline">
                <Car className="mr-2 h-4 w-4" />
                Add New Vehicle
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Register Customer
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Wrench className="mr-2 h-4 w-4" />
                Create Service Record
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Generate Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}