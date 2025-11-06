"use client"

import { useEffect, useState } from "react"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto"></div>
            <p className="mt-4 font-roboto text-[#020079]/70">Loading analytics data...</p>
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
            <div className="font-roboto text-[#020079] text-xl font-semibold mb-2">Error</div>
            <p className="font-roboto text-[#020079]/70">{error}</p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminDashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bebas text-[#020079] mb-2">
            Services Analytics
          </h1>
          <p className="font-roboto text-[#020079]/70">Track service performance, profitability, and customer satisfaction</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Most Profitable Service Card */}
          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Most Profitable Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mostProfitable ? (
                <>
                  <div className="text-2xl font-bebas text-[#020079] mb-2">
                    {mostProfitable.name}
                  </div>
                  <p className="text-sm font-roboto text-[#020079]/70">
                    LKR {mostProfitable.profit.toLocaleString()} profit ({mostProfitable.margin}% margin)
                  </p>
                </>
              ) : (
                <div className="text-sm font-roboto text-[#020079]/40">Loading...</div>
              )}
            </CardContent>
          </Card>

          {/* Total Services Card */}
          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Total Services (Month)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {totalServices ? (
                <>
                  <div className="text-4xl font-bebas text-[#020079] mb-2">
                    {totalServices.totalServicesMonth}
                  </div>
                  <p className={`text-sm font-roboto flex items-center gap-1 ${
                    totalServices.changeFromLastMonth >= 0 ? 'text-[#020079]' : 'text-[#020079]/50'
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
                <div className="text-sm font-roboto text-[#020079]/40">Loading...</div>
              )}
            </CardContent>
          </Card>

          {/* Parts Replaced Card */}
          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Parts Replaced
              </CardTitle>
            </CardHeader>
            <CardContent>
              {partsData ? (
                <>
                  <div className="text-4xl font-bebas text-[#020079] mb-2">
                    {partsData.partsReplaced}
                  </div>
                  <p className={`text-sm font-roboto flex items-center gap-1 ${
                    partsData.partsUsageRate >= 0 ? 'text-[#020079]' : 'text-[#020079]/50'
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
                <div className="text-sm font-roboto text-[#020079]/40">Loading...</div>
              )}
            </CardContent>
          </Card>

          {/* Customer Retention Card */}
          <Card className="bg-white border-[#020079]/20 hover:border-[#FFD700]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Customer Retention
              </CardTitle>
            </CardHeader>
            <CardContent>
              {retentionData ? (
                <>
                  <div className="text-4xl font-bebas text-[#020079] mb-2">
                    {retentionData.customerRetention}%
                  </div>
                  <p className={`text-sm font-roboto flex items-center gap-1 ${
                    retentionData.retentionImprovement >= 0 ? 'text-[#020079]' : 'text-[#020079]/50'
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
                <div className="text-sm font-roboto text-[#020079]/40">Loading...</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Service Performance Table */}
        <Card className="bg-white border-[#020079]/20">
          <CardHeader className="bg-[#020079] border-b border-[#020079]">
            <CardTitle className="text-xl font-bebas text-white">Service Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {performanceData && performanceData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[#020079]/20">
                      <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                        Service Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                        Total Bookings
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                        Avg Duration
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                        Profit/Service
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                        Customer Rating
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#020079]/10">
                    {performanceData.map((service) => (
                      <tr key={service.id} className="hover:bg-[#020079]/5 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-roboto font-semibold text-[#020079]">{service.name}</span>
                        </td>
                        <td className="px-6 py-4 font-roboto text-[#020079]/70">{service.totalBookings}</td>
                        <td className="px-6 py-4 font-roboto text-[#020079]/70">{service.avgDuration}</td>
                        <td className="px-6 py-4 font-roboto text-[#020079] font-semibold">
                          LKR {service.profitPerService.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-roboto text-[#020079]/70">
                            {service.customerRating}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant="secondary"
                            className={`${
                              service.trend >= 0 
                                ? "bg-[#FFD700]/20 text-[#020079] border-[#FFD700]/30" 
                                : "bg-[#020079]/10 text-[#020079]/60 border-[#020079]/20"
                            } font-roboto flex items-center gap-1 w-fit`}
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
              <div className="text-center py-8 font-roboto text-[#020079]/40">
                Loading service performance data...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  )
}
