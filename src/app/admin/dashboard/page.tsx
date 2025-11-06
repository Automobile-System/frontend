"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import {
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Users,
  Activity,
  BarChart3,
  Briefcase,
  UserCheck,
} from "lucide-react"
import {
  fetchDashboardStats,
  fetchAIInsights,
  type DashboardStats,
  type AIInsight,
} from "@/services/adminService"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        const [statsData, insightsData] = await Promise.all([
          fetchDashboardStats(),
          fetchAIInsights()
        ])
        setStats(statsData)
        setInsights(insightsData)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading || !stats) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminDashboardLayout>
      <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-600">Monitor your business performance and insights</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-all duration-300 bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Profit This Month
                </CardTitle>
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {stats.profitThisMonth.value}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-emerald-600">
                  {stats.profitThisMonth.change}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Active Customers
                </CardTitle>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {stats.activeCustomers.value}
              </div>
              <p className="text-sm text-slate-600">
                +{stats.activeCustomers.newThisMonth} new this month
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Ongoing Services
                </CardTitle>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {stats.ongoingServices.value}
              </div>
              <p className="text-sm text-slate-600">{stats.ongoingServices.status}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-all duration-300 bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Active Employees
                </CardTitle>
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <UserCheck className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {stats.activeEmployees.value}
              </div>
              <p className="text-sm text-slate-600">
                {stats.activeEmployees.onLeave} on leave, {stats.activeEmployees.frozen} frozen
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI-Powered Insights Section */}
        <Card className="mb-8 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 border-2 border-violet-200 overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-violet-100 to-indigo-100 border-b border-violet-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Activity className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-800">
                  AI-Powered Business Insights
                </CardTitle>
                <p className="text-sm text-slate-600 mt-1">
                  Based on machine learning analysis of 6 months of operational data
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className="bg-white border border-violet-200 p-5 rounded-lg hover:shadow-md transition-all duration-200 hover:border-violet-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {insight.category === 'forecast' && (
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                    {insight.category === 'projection' && (
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                      </div>
                    )}
                    {insight.category === 'warning' && (
                      <div className="p-2 bg-amber-50 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      </div>
                    )}
                    {insight.category === 'recommendation' && (
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 text-base mb-1">
                        {insight.title}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-xs capitalize mb-2 border-violet-200 text-violet-700"
                      >
                        {insight.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-emerald-200 hover:shadow-lg transition-all duration-300 bg-white">
            <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                Profit Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-emerald-200 rounded-lg bg-gradient-to-br from-emerald-50 to-white">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-emerald-300 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm font-medium">Monthly Profit Chart</p>
                  <p className="text-slate-400 text-xs mt-1">Connect to display data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-all duration-300 bg-white">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Service Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-white">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-blue-300 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm font-medium">Service Analytics Chart</p>
                  <p className="text-slate-400 text-xs mt-1">Connect to display data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 hover:shadow-lg transition-all duration-300 bg-white">
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Employee Demand
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-purple-200 rounded-lg bg-gradient-to-br from-purple-50 to-white">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-purple-300 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm font-medium">Workforce Analytics Chart</p>
                  <p className="text-slate-400 text-xs mt-1">Connect to display data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

     
      </div>
    </AdminDashboardLayout>
  )
}