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
  TrendingDown
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto"></div>
            <p className="mt-4 font-roboto text-slate-600">Loading financial reports...</p>
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
            Financial Reports
          </h1>
          <p className="font-roboto text-slate-500">Analyze revenue, costs, and profitability by service type</p>
        </div>

        {/* Filter Section */}
        <Card className="mb-10 border border-[#020079]/20 bg-white">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-roboto font-medium text-[#020079] ml-1">Service Type</label>
                <select 
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="px-4 py-2 border border-[#020079]/20 rounded-lg focus:border-[#020079] focus:outline-none bg-white text-[#020079] font-roboto hover:border-[#020079]/40 transition-colors cursor-pointer"
                >
                  <option value="all">All Services</option>
                  <option value="predefined">Predefined Services Only</option>
                  <option value="custom">Custom Projects Only</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="startDate" className="text-xs font-roboto font-medium text-[#020079] ml-1">Start Date</label>
                <input 
                  id="startDate"
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-2 border border-[#020079]/20 rounded-lg focus:border-[#020079] focus:outline-none bg-white text-[#020079] font-roboto hover:border-[#020079]/40 transition-colors cursor-pointer"
                  style={{ colorScheme: 'light' }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="endDate" className="text-xs font-roboto font-medium text-[#020079] ml-1">End Date</label>
                <input 
                  id="endDate"
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="px-4 py-2 border border-[#020079]/20 rounded-lg focus:border-[#020079] focus:outline-none bg-white text-[#020079] font-roboto hover:border-[#020079]/40 transition-colors cursor-pointer"
                  style={{ colorScheme: 'light' }}
                />
              </div>

              <div className="flex gap-2 items-end">
                <Button 
                  onClick={handleDownloadPDF}
                  variant="outline" 
                  className="border-[#020079]/30 text-[#020079] font-roboto hover:bg-[#020079]/5 hover:border-[#020079] h-[42px]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  onClick={handleExportExcel}
                  className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto h-[42px]"
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Breakdown Table */}
        <Card className="mb-10 border border-[#020079]/20 bg-white">
          <CardHeader className="border-b border-[#020079]/20">
            <CardTitle className="text-xl font-bebas text-[#020079]">
              Service Type Financial Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#020079]/10">
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Service Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Revenue (LKR)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Cost (LKR)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Profit (LKR)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Margin %
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#020079]/10">
                  {financialData.breakdown.map((service: ServiceTypeBreakdown, index: number) => (
                    <tr 
                      key={index} 
                      className="hover:bg-[#020079]/5 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <span className="font-roboto font-semibold text-[#020079]">{service.serviceType}</span>
                      </td>
                      <td className="px-6 py-4 font-roboto text-slate-600">
                        {formatCurrency(service.revenue)}
                      </td>
                      <td className="px-6 py-4 font-roboto text-slate-600">
                        {formatCurrency(service.cost)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-roboto font-semibold text-[#020079]">
                          {formatCurrency(service.profit)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="secondary" 
                          className="font-roboto border border-[#020079]/20 text-[#020079] bg-white hover:bg-[#020079]/5"
                        >
                          {service.margin}%
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {service.trend > 0 ? (
                            <>
                              <TrendingUp className="w-4 h-4 text-[#020079]" />
                              <span className="font-roboto text-[#020079] font-medium">
                                {service.trend}%
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-4 h-4 text-red-600" />
                              <span className="font-roboto text-red-600 font-medium">
                                {Math.abs(service.trend)}%
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="border-t-2 border-[#020079]/20 bg-[#020079]/5">
                    <td className="px-6 py-4 font-bebas text-lg text-[#020079]">TOTAL</td>
                    <td className="px-6 py-4 font-roboto font-semibold text-[#020079]">
                      {formatCurrency(financialData.totals.totalRevenue)}
                    </td>
                    <td className="px-6 py-4 font-roboto font-semibold text-[#020079]">
                      {formatCurrency(financialData.totals.totalCost)}
                    </td>
                    <td className="px-6 py-4 font-bebas text-xl text-[#020079]">
                      {formatCurrency(financialData.totals.totalProfit)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-[#020079] text-white font-roboto hover:bg-[#03009B]">
                        {financialData.totals.overallMargin}%
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-[#020079]" />
                        <span className="font-roboto text-[#020079] font-medium">
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
          <Card className="border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 bg-white">
            <CardHeader className="border-b border-[#FFD700]/20">
              <CardTitle className="text-base font-roboto font-semibold text-[#020079]">
                Revenue Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center border border-dashed border-[#FFD700]/30 rounded-lg">
                <div className="text-center">
                  <p className="text-slate-400 text-sm font-roboto">Revenue by Service Type</p>
                  <p className="text-slate-300 text-xs font-roboto mt-1">Chart will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Profit Trend Chart */}
          <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
            <CardHeader className="border-b border-[#020079]/10">
              <CardTitle className="text-base font-roboto font-semibold text-[#020079]">
                Monthly Profit Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center border border-dashed border-[#020079]/20 rounded-lg">
                <div className="text-center">
                  <p className="text-slate-400 text-sm font-roboto">Profit Trend Over Time</p>
                  <p className="text-slate-300 text-xs font-roboto mt-1">Chart will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Analysis Chart */}
          <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
            <CardHeader className="border-b border-[#020079]/10">
              <CardTitle className="text-base font-roboto font-semibold text-[#020079]">
                Cost Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center border border-dashed border-[#020079]/20 rounded-lg">
                <div className="text-center">
                  <p className="text-slate-400 text-sm font-roboto">Cost Breakdown</p>
                  <p className="text-slate-300 text-xs font-roboto mt-1">Chart will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}

