"use client"

import { useEffect, useState, useCallback } from "react"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  FileSpreadsheet, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  DollarSign
} from "lucide-react"
import {
  fetchFinancialReports,
  type FinancialReport,
  type ServiceTypeBreakdown,
} from "@/services/adminService"

export default function FinancialReportsPage() {
  const [financialData, setFinancialData] = useState<FinancialReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [serviceFilter, setServiceFilter] = useState("all")
  const [startDate, setStartDate] = useState("2025-01-01")
  const [endDate, setEndDate] = useState("2025-11-04")

  const loadFinancialData = useCallback(async () => {
    try {
      setLoading(true)
      const data = await fetchFinancialReports(serviceFilter, startDate, endDate)
      setFinancialData(data)
    } catch (error) {
      console.error('Error loading financial data:', error)
    } finally {
      setLoading(false)
    }
  }, [serviceFilter, startDate, endDate])

  useEffect(() => {
    loadFinancialData()
  }, [loadFinancialData])

  const handleDownloadPDF = async () => {
    try {
      console.log('Download PDF clicked')
      
      // TODO: Replace with actual backend API call
      // const response = await fetch('/api/financial-reports/export-pdf', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify({
      //     serviceFilter,
      //     startDate,
      //     endDate,
      //     data: financialData
      //   })
      // })
      // 
      // if (!response.ok) throw new Error('PDF download failed')
      // 
      // const blob = await response.blob()
      // const url = window.URL.createObjectURL(blob)
      // const link = document.createElement('a')
      // link.href = url
      // link.download = `financial-report-${startDate}-to-${endDate}.pdf`
      // document.body.appendChild(link)
      // link.click()
      // document.body.removeChild(link)
      // window.URL.revokeObjectURL(url)

      // Mock implementation - simulates PDF download
      console.log('PDF Export Data:', {
        serviceFilter,
        startDate,
        endDate,
        breakdown: financialData?.breakdown,
        totals: financialData?.totals
      })
      
      alert(`PDF download initiated!\n\nReport: ${startDate} to ${endDate}\nService Filter: ${serviceFilter}\n\nOnce backend is connected, the PDF will download automatically.`)
    } catch (error) {
      console.error('PDF download error:', error)
      alert('Failed to download PDF. Please try again.')
    }
  }

  const handleExportExcel = async () => {
    try {
      console.log('Export Excel clicked')
      
      // TODO: Replace with actual backend API call
      // const response = await fetch('/api/financial-reports/export-excel', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify({
      //     serviceFilter,
      //     startDate,
      //     endDate,
      //     data: financialData
      //   })
      // })
      // 
      // if (!response.ok) throw new Error('Excel export failed')
      // 
      // const blob = await response.blob()
      // const url = window.URL.createObjectURL(blob)
      // const link = document.createElement('a')
      // link.href = url
      // link.download = `financial-report-${startDate}-to-${endDate}.xlsx`
      // document.body.appendChild(link)
      // link.click()
      // document.body.removeChild(link)
      // window.URL.revokeObjectURL(url)

      // Mock implementation - simulates Excel export
      console.log('Excel Export Data:', {
        serviceFilter,
        startDate,
        endDate,
        breakdown: financialData?.breakdown,
        totals: financialData?.totals
      })
      
      alert(`Excel export initiated!\n\nReport: ${startDate} to ${endDate}\nService Filter: ${serviceFilter}\n\nOnce backend is connected, the Excel file will download automatically.`)
    } catch (error) {
      console.error('Excel export error:', error)
      alert('Failed to export Excel. Please try again.')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (loading || !financialData) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading financial reports...</p>
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
            Financial Reports
          </h1>
          <p className="text-slate-600">Analyze revenue, costs, and profitability by service type</p>
        </div>

        {/* Filter Section */}
        <Card className="mb-8 bg-white shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600 ml-1">Service Type</label>
                <select 
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none bg-white text-slate-700 hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <option value="all">All Services</option>
                  <option value="predefined">Predefined Services Only</option>
                  <option value="custom">Custom Projects Only</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="startDate" className="text-xs font-medium text-slate-600 ml-1">Start Date</label>
                <input 
                  id="startDate"
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none bg-white text-slate-700 hover:border-slate-300 transition-colors cursor-pointer"
                  style={{ colorScheme: 'light' }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="endDate" className="text-xs font-medium text-slate-600 ml-1">End Date</label>
                <input 
                  id="endDate"
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none bg-white text-slate-700 hover:border-slate-300 transition-colors cursor-pointer"
                  style={{ colorScheme: 'light' }}
                />
              </div>

              <div className="flex gap-2 items-end">
                
                <Button 
                  onClick={handleDownloadPDF}
                  variant="outline" 
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 h-[42px]"
                >
                  <Download className="w-4 h-2 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  onClick={handleExportExcel}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white h-[42px]"
                >
                  <FileSpreadsheet className="w-4 h-2 mr-2" />
                  Export Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Breakdown Table */}
        <Card className="mb-8 bg-white shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Service Type Financial Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Service Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Revenue (LKR)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Cost (LKR)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Profit (LKR)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Margin %
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {financialData.breakdown.map((service: ServiceTypeBreakdown, index: number) => (
                    <tr 
                      key={index} 
                      className="hover:bg-blue-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-800">{service.serviceType}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {formatCurrency(service.revenue)}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {formatCurrency(service.cost)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-emerald-600">
                          {formatCurrency(service.profit)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="secondary" 
                          className={
                            service.margin >= 50 
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" 
                              : service.margin >= 40 
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          }
                        >
                          {service.margin}%
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {service.trend > 0 ? (
                            <>
                              <TrendingUp className="w-4 h-4 text-emerald-600" />
                              <span className="text-emerald-600 font-medium">
                                {service.trend}%
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-4 h-4 text-rose-600" />
                              <span className="text-rose-600 font-medium">
                                {Math.abs(service.trend)}%
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 font-bold border-t-2 border-blue-200">
                    <td className="px-6 py-4 text-slate-800">TOTAL</td>
                    <td className="px-6 py-4 text-slate-800">
                      {formatCurrency(financialData.totals.totalRevenue)}
                    </td>
                    <td className="px-6 py-4 text-slate-800">
                      {formatCurrency(financialData.totals.totalCost)}
                    </td>
                    <td className="px-6 py-4 text-blue-700 text-lg">
                      {formatCurrency(financialData.totals.totalProfit)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                        {financialData.totals.overallMargin}%
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600 font-medium">
                          {financialData.totals.overallTrend}%
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Distribution Chart */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-600" />
                Revenue Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600">Pie Chart Placeholder</p>
                  <p className="text-xs text-slate-400 mt-1">Revenue by Service Type</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Profit Trend Chart */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Monthly Profit Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600">Line Chart Placeholder</p>
                  <p className="text-xs text-slate-400 mt-1">Profit Trend Over Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Analysis Chart */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Cost Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-emerald-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600">Bar Chart Placeholder</p>
                  <p className="text-xs text-slate-400 mt-1">Cost Breakdown</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}

