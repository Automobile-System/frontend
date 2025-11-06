"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto"></div>
            <p className="mt-4 font-roboto text-slate-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminDashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        {/* Page Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bebas text-[#020079] mb-2">
            Dashboard Overview
          </h1>
          <p className="font-roboto text-slate-500">Monitor your business performance and insights</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto font-medium text-[#020079]">
                Profit This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {stats.profitThisMonth.value}
              </div>
              <p className="text-sm font-roboto text-[#020079]">
                {stats.profitThisMonth.change}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto font-medium text-[#020079]">
                Active Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {stats.activeCustomers.value}
              </div>
              <p className="text-sm font-roboto text-slate-500">
                +{stats.activeCustomers.newThisMonth} new this month
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto font-medium text-[#020079]">
                Ongoing Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {stats.ongoingServices.value}
              </div>
              <p className="text-sm font-roboto text-slate-500">{stats.ongoingServices.status}</p>
            </CardContent>
          </Card>

          <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto font-medium text-[#020079]">
                Active Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {stats.activeEmployees.value}
              </div>
              <p className="text-sm font-roboto text-slate-500">
                {stats.activeEmployees.onLeave} on leave, {stats.activeEmployees.frozen} frozen
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI-Powered Insights Section */}
        <Card className="mb-10 border border-[#020079]/20 bg-white">
          <CardHeader className="bg-gradient-to-r from-[#020079] to-[#01024D] py-6">
            <CardTitle className="text-2xl font-bebas text-white">
              AI-Powered Business Insights
            </CardTitle>
            <p className="text-sm font-roboto text-white/90 mt-1">
              Based on machine learning analysis of 6 months of operational data
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className="border border-[#020079]/10 p-6 rounded-lg hover:border-[#020079]/30 transition-all duration-200"
                >
                  <div className="mb-3">
                    <p className="font-roboto font-semibold text-[#020079] text-base mb-2">
                      {insight.title}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs font-roboto capitalize border-[#020079]/30 text-[#020079]"
                    >
                      {insight.category}
                    </Badge>
                  </div>
                  <p className="text-sm font-roboto text-slate-600 leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 bg-white">
            <CardHeader className="border-b border-[#FFD700]/20">
              <CardTitle className="text-base font-roboto font-semibold text-[#020079]">
                Profit Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center border border-dashed border-[#FFD700]/30 rounded-lg">
                <div className="text-center">
                  <p className="text-slate-400 text-sm font-roboto">Monthly Profit Chart</p>
                  <p className="text-slate-300 text-xs font-roboto mt-1">Connect to display data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
            <CardHeader className="border-b border-[#020079]/10">
              <CardTitle className="text-base font-roboto font-semibold text-[#020079]">
                Service Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center border border-dashed border-[#020079]/20 rounded-lg">
                <div className="text-center">
                  <p className="text-slate-400 text-sm font-roboto">Service Analytics Chart</p>
                  <p className="text-slate-300 text-xs font-roboto mt-1">Connect to display data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
            <CardHeader className="border-b border-[#020079]/10">
              <CardTitle className="text-base font-roboto font-semibold text-[#020079]">
                Employee Demand
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center border border-dashed border-[#020079]/20 rounded-lg">
                <div className="text-center">
                  <p className="text-slate-400 text-sm font-roboto">Workforce Analytics Chart</p>
                  <p className="text-slate-300 text-xs font-roboto mt-1">Connect to display data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

     
      </div>
    </AdminDashboardLayout>
  )
}