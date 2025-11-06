"use client"

import { useEffect, useState } from "react"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown,
  Award,
  Wrench,
  ShoppingCart,
  Target,
  Star,
  BarChart3,
  LineChart,
  PieChart
} from "lucide-react"
import {
  fetchMostProfitableService,
  fetchTotalServicesData,
  fetchPartsReplacedData,
  fetchCustomerRetentionData,
  fetchServicePerformance,
  type MostProfitableService,
  type TotalServicesData,
  type PartsReplacedData,
  type CustomerRetentionData,
  type ServicePerformance,
} from "@/services/adminService"

export default function ServicesAnalyticsPage() {
  // Individual state for each data section
  const [mostProfitable, setMostProfitable] = useState<MostProfitableService | null>(null)
  const [totalServices, setTotalServices] = useState<TotalServicesData | null>(null)
  const [partsData, setPartsData] = useState<PartsReplacedData | null>(null)
  const [retentionData, setRetentionData] = useState<CustomerRetentionData | null>(null)
  const [performanceData, setPerformanceData] = useState<ServicePerformance[] | null>(null)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Load all data in parallel for better performance
        const [
          profitableService,
          servicesData,
          parts,
          retention,
          performance
        ] = await Promise.all([
          fetchMostProfitableService(),
          fetchTotalServicesData(),
          fetchPartsReplacedData(),
          fetchCustomerRetentionData(),
          fetchServicePerformance()
        ])
        
        setMostProfitable(profitableService)
        setTotalServices(servicesData)
        setPartsData(parts)
        setRetentionData(retention)
        setPerformanceData(performance)
      } catch (error) {
        console.error('Error loading services analytics:', error)
        setError('Failed to load analytics data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  const getTrendIcon = (trend: number) => {
    return trend >= 0 ? (
      <TrendingUp className="w-4 h-4 text-emerald-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-rose-600" />
    )
  }

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading analytics data...</p>
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
            <div className="text-rose-600 text-xl font-semibold mb-2">Error</div>
            <p className="text-gray-600">{error}</p>
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
            Services Analytics
          </h1>
          <p className="text-slate-600">Track service performance, profitability, and customer satisfaction</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Most Profitable Service Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                Most Profitable Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mostProfitable ? (
                <>
                  <div className="text-2xl font-bold text-slate-800 mb-2">
                    {mostProfitable.name}
                  </div>
                  <p className="text-sm text-slate-600">
                    LKR {mostProfitable.profit.toLocaleString()} profit ({mostProfitable.margin}% margin)
                  </p>
                </>
              ) : (
                <div className="text-sm text-slate-400">Loading...</div>
              )}
            </CardContent>
          </Card>

          {/* Total Services Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Total Services (Month)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {totalServices ? (
                <>
                  <div className="text-4xl font-bold text-slate-800 mb-2">
                    {totalServices.totalServicesMonth}
                  </div>
                  <p className={`text-sm flex items-center gap-1 ${
                    totalServices.changeFromLastMonth >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {totalServices.changeFromLastMonth >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {totalServices.changeFromLastMonth >= 0 ? '+' : ''}{totalServices.changeFromLastMonth} from last month
                  </p>
                </>
              ) : (
                <div className="text-sm text-slate-400">Loading...</div>
              )}
            </CardContent>
          </Card>

          {/* Parts Replaced Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-indigo-600" />
                Parts Replaced
              </CardTitle>
            </CardHeader>
            <CardContent>
              {partsData ? (
                <>
                  <div className="text-4xl font-bold text-slate-800 mb-2">
                    {partsData.partsReplaced}
                  </div>
                  <p className={`text-sm flex items-center gap-1 ${
                    partsData.partsUsageRate >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {partsData.partsUsageRate >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {partsData.partsUsageRate >= 0 ? '+' : ''}{partsData.partsUsageRate}% usage rate
                  </p>
                </>
              ) : (
                <div className="text-sm text-slate-400">Loading...</div>
              )}
            </CardContent>
          </Card>

          {/* Customer Retention Card */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                Customer Retention
              </CardTitle>
            </CardHeader>
            <CardContent>
              {retentionData ? (
                <>
                  <div className="text-4xl font-bold text-slate-800 mb-2">
                    {retentionData.customerRetention}%
                  </div>
                  <p className={`text-sm flex items-center gap-1 ${
                    retentionData.retentionImprovement >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {retentionData.retentionImprovement >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {retentionData.retentionImprovement >= 0 ? '+' : ''}{retentionData.retentionImprovement}% improvement
                  </p>
                </>
              ) : (
                <div className="text-sm text-slate-400">Loading...</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-600" />
                Most Profitable Services
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-48 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Bar Chart</p>
                  <p className="text-xs text-slate-500">
                    Engine: 310K | Oil: 270K | Custom: 388K
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-blue-600" />
                Parts Replacement Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-48 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                <div className="text-center">
                  <LineChart className="w-16 h-16 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Line Chart</p>
                  <p className="text-xs text-slate-500">
                    6-month parts usage progression
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-600" />
                Customer Retention Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-48 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                <div className="text-center">
                  <PieChart className="w-16 h-16 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-600 mb-1">Area Chart</p>
                  <p className="text-xs text-slate-500">
                    Loyalty trend: 87% returning customers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Performance Table */}
        <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
            <CardTitle className="text-xl text-slate-800">Service Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {performanceData && performanceData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Service Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Total Bookings
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Avg Duration
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Profit/Service
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Customer Rating
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {performanceData.map((service) => (
                      <tr key={service.id} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4 text-indigo-600" />
                            <span className="font-semibold text-slate-800">{service.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-700">{service.totalBookings}</td>
                        <td className="px-6 py-4 text-slate-700">{service.avgDuration}</td>
                        <td className="px-6 py-4 text-slate-700 font-semibold">
                          LKR {service.profitPerService.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-slate-700">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            {service.customerRating}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant="secondary"
                            className={`${
                              service.trend >= 0 
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" 
                                : "bg-rose-100 text-rose-700 hover:bg-rose-200"
                            } flex items-center gap-1 w-fit`}
                          >
                            {getTrendIcon(service.trend)}
                            {service.trend >= 0 ? '+' : ''}{service.trend}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                Loading service performance data...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  )
}
