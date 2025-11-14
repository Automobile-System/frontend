"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import {
  fetchDashboardStats,
  type DashboardStats,
} from "@/services/adminService"
import { 
  Users, 
  Briefcase, 
  TrendingUp,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Wrench,
  FolderOpen
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const COLORS = {
  primary: '#020079',
  gold: '#FFD700',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  purple: '#a855f7'
}

const CHART_COLORS = ['#020079', '#FFD700', '#3b82f6', '#10b981', '#a855f7', '#f59e0b']

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)
        const statsData = await fetchDashboardStats()
        setStats(statsData)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        setError('Failed to load dashboard data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
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

  if (error) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bebas text-slate-800 mb-2">Error Loading Dashboard</h2>
            <p className="font-roboto text-slate-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#020079] text-white font-roboto rounded-lg hover:bg-[#010058] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  if (!stats) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="font-roboto text-slate-600">No data available</p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const profitTrendData = stats?.profitTrend?.labels ? stats.profitTrend.labels.map((month, index) => ({
    month,
    revenue: stats.profitTrend.revenue[index],
    cost: stats.profitTrend.cost[index],
    profit: stats.profitTrend.profit[index]
  })).filter(item => item.revenue > 0) : []

  const jobProjectData = stats?.jobProjectCompletion ? [
    { name: 'Completed', jobs: stats.jobProjectCompletion.jobs.completed, projects: stats.jobProjectCompletion.projects.completed },
    { name: 'In Progress', jobs: stats.jobProjectCompletion.jobs.in_progress, projects: stats.jobProjectCompletion.projects.in_progress },
    { name: 'On Hold', jobs: stats.jobProjectCompletion.jobs.on_hold, projects: stats.jobProjectCompletion.projects.on_hold },
    { name: 'Pending', jobs: stats.jobProjectCompletion.jobs.pending, projects: stats.jobProjectCompletion.projects.pending },
  ] : []

  const serviceCategoryData = stats?.serviceCategoryDistribution?.labels ? stats.serviceCategoryDistribution.labels.map((label, index) => ({
    name: label,
    value: stats.serviceCategoryDistribution.data[index]
  })) : []

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200 text-red-700'
      case 'medium': return 'bg-amber-50 border-amber-200 text-amber-700'
      case 'low': return 'bg-blue-50 border-blue-200 text-blue-700'
      default: return 'bg-slate-50 border-slate-200 text-slate-700'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'medium': return <Clock className="h-4 w-4 text-amber-600" />
      default: return <CheckCircle className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <AdminDashboardLayout>
      <div className="p-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="mb-8">
          <h1 className="text-4xl font-bebas text-[#020079] mb-2">
            Business Overview
          </h1>
          <p className="font-roboto text-slate-500">Comprehensive analytics and performance metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-[#020079]/20 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-roboto font-medium text-[#020079]">
                Total Customers
              </CardTitle>
              <div className="p-2 bg-[#020079]/10 rounded-full">
                <Users className="h-4 w-4 text-[#020079]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bebas text-[#020079]">
                {stats?.kpis?.totalCustomers || 0}
              </div>
              <p className="text-xs font-roboto text-slate-500 mt-1">Active accounts</p>
            </CardContent>
          </Card>

          <Card className="border border-[#020079]/20 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-indigo-50">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-roboto font-medium text-[#020079]">
                Workforce
              </CardTitle>
              <div className="p-2 bg-indigo-100 rounded-full">
                <Briefcase className="h-4 w-4 text-indigo-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bebas text-[#020079]">
                {(stats?.kpis?.totalEmployees || 0) + (stats?.kpis?.totalManagers || 0)}
              </div>
              <p className="text-xs font-roboto text-slate-500 mt-1">
                {stats?.kpis?.totalEmployees || 0} Employees • {stats?.kpis?.totalManagers || 0} Managers
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#FFD700]/30 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-amber-50">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-roboto font-medium text-[#020079]">
                Ongoing Work
              </CardTitle>
              <div className="p-2 bg-amber-100 rounded-full">
                <Wrench className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bebas text-[#020079]">
                {(stats?.kpis?.ongoingJobs || 0) + (stats?.kpis?.ongoingProjects || 0)}
              </div>
              <p className="text-xs font-roboto text-slate-500 mt-1">
                {stats?.kpis?.ongoingJobs || 0} Jobs • {stats?.kpis?.ongoingProjects || 0} Projects
              </p>
            </CardContent>
          </Card>

          <Card className="border border-green-200 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-roboto font-medium text-[#020079]">
                Monthly Revenue
              </CardTitle>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bebas text-[#020079]">
                {formatCurrency(stats?.kpis?.monthlyRevenue || 0)}
              </div>
              <p className="text-xs font-roboto text-slate-500 mt-1">Current month</p>
            </CardContent>
          </Card>

          <Card className="border border-[#020079]/20 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-roboto font-medium text-[#020079]">
                Completed Services
              </CardTitle>
              <div className="p-2 bg-purple-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bebas text-[#020079]">
                {stats?.kpis?.completedServices || 0}
              </div>
              <p className="text-xs font-roboto text-slate-500 mt-1">All-time total</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Profit Trends */}
          <Card className="lg:col-span-2 border border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#020079]" />
                <CardTitle className="text-lg font-roboto font-semibold text-[#020079]">
                  Monthly Profit Trends
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={profitTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke={COLORS.info} strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="cost" stroke={COLORS.warning} strokeWidth={2} name="Cost" />
                  <Line type="monotone" dataKey="profit" stroke={COLORS.success} strokeWidth={2} name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Category Distribution */}
          <Card className="border border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-[#020079]" />
                <CardTitle className="text-lg font-roboto font-semibold text-[#020079]">
                  Service Categories
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Job/Project Completion & Top Employees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Job & Project Completion */}
          <Card className="border border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-roboto font-semibold text-[#020079]">
                Job & Project Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jobProjectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#64748b" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                  <Legend />
                  <Bar dataKey="jobs" fill={COLORS.primary} name="Jobs" />
                  <Bar dataKey="projects" fill={COLORS.gold} name="Projects" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Employees by Hours */}
          <Card className="border border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg font-roboto font-semibold text-[#020079]">
                Top Performers (Hours Worked)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {stats?.topEmployees?.map((employee, index) => (
                  <div key={employee.employeeId} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bebas text-white ${
                        index === 0 ? 'bg-[#FFD700]' : index === 1 ? 'bg-[#C0C0C0]' : index === 2 ? 'bg-[#CD7F32]' : 'bg-[#020079]'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-roboto font-medium text-slate-800">{employee.name}</p>
                        <p className="text-xs font-roboto text-slate-500">{employee.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bebas text-xl text-[#020079]">{employee.totalHours}h</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Alerts */}
        <Card className="border border-slate-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#020079]" />
                <CardTitle className="text-lg font-roboto font-semibold text-[#020079]">
                  Business Alerts
                </CardTitle>
              </div>
              <Badge variant="outline" className="font-roboto">
                {stats?.alerts?.filter(a => !a.isRead).length || 0} Unread
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {stats?.alerts?.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} transition-all duration-200 hover:shadow-md`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="text-xs font-roboto">
                          {alert.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-xs font-roboto text-slate-500">
                          {new Date(alert.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm font-roboto leading-relaxed">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {(!stats?.alerts || stats.alerts.length === 0) && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <p className="font-roboto text-slate-600">No alerts at the moment</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  )
}
