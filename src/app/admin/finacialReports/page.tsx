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
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function FinancialReportsPage() {
  const [financialData, setFinancialData] = useState<FinancialReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [serviceFilter, setServiceFilter] = useState("all")
  const [totalJobsInDB, setTotalJobsInDB] = useState<number | null>(null)
  
  // Set default date range to last 6 months for better data visibility
  const today = new Date()
  const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1)
  
  const [startDate, setStartDate] = useState(
    sixMonthsAgo.toISOString().split('T')[0]
  )
  const [endDate, setEndDate] = useState(
    today.toISOString().split('T')[0]
  )

  const loadFinancialData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchFinancialReports(serviceFilter, startDate, endDate)
      console.log('Financial data received:', data)
      console.log('Data check - breakdown length:', data.breakdown?.length, 'total revenue:', data.totals?.totalRevenue)
      setFinancialData(data)
      
      // If no data, check total jobs in database for diagnostics
      if (!data.breakdown || data.breakdown.length === 0 || data.totals.totalRevenue === 0) {
        checkTotalJobsInDatabase()
      }
    } catch (error) {
      console.error('Error loading financial data:', error)
      setError(error instanceof Error ? error.message : 'Failed to load financial data')
    } finally {
      setLoading(false)
    }
  }, [serviceFilter, startDate, endDate])

  const checkTotalJobsInDatabase = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
      const response = await fetch(`${baseUrl}/api/jobs`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      
      if (response.ok) {
        const jobs = await response.json()
        setTotalJobsInDB(Array.isArray(jobs) ? jobs.length : 0)
        console.log('Total jobs in database:', jobs.length)
      }
    } catch (error) {
      console.log('Could not fetch total jobs:', error)
    }
  }

  useEffect(() => {
    loadFinancialData()
  }, [loadFinancialData])

  const handleDownloadPDF = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
      
      const response = await fetch(`${baseUrl}/api/admin/financial-reports/export-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          serviceFilter,
          startDate,
          endDate,
          data: financialData
        })
      })
      
      if (!response.ok) {
        throw new Error('PDF download failed')
      }

      // Check if backend returns actual PDF blob or just a message
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/pdf')) {
        // Backend returns actual PDF file
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `financial-report-${startDate}-to-${endDate}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else {
        // Backend not yet implemented - use client-side PDF generation
        console.log('Backend PDF not available, generating client-side PDF...')
        generateClientSidePDF()
      }
    } catch (error) {
      console.error('PDF download error:', error)
      // Fallback to client-side generation
      generateClientSidePDF()
    }
  }

  const generateClientSidePDF = () => {
    // Client-side PDF generation using browser print
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Financial Report ${startDate} to ${endDate}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #020079; border-bottom: 3px solid #FFD700; padding-bottom: 10px; }
          h2 { color: #020079; margin-top: 30px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #020079; color: white; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .total-row { background-color: #020079 !important; color: white; font-weight: bold; }
          .summary { margin: 20px 0; padding: 20px; background-color: #f0f0f0; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1>Financial Report</h1>
        <div class="summary">
          <p><strong>Period:</strong> ${startDate} to ${endDate}</p>
          <p><strong>Filter:</strong> ${serviceFilter === 'all' ? 'All' : serviceFilter === 'predefined' ? 'Services' : 'Projects'}</p>
          <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <h2>Service Type Financial Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Service Type</th>
              <th>Revenue (LKR)</th>
              <th>Cost (LKR)</th>
              <th>Profit (LKR)</th>
              <th>Margin %</th>
             <tr>
          </thead>
          <tbody>
            ${financialData?.breakdown.map(service => `
              <tr>
                <td>${service.serviceType}</td>
                <td>${formatCurrency(service.revenue)}</td>
                <td>${formatCurrency(service.cost)}</td>
                <td>${formatCurrency(service.profit)}</td>
                <td>${service.margin}%</td>
             
              </tr>
            `).join('') || '<tr><td colspan="6">No data available</td></tr>'}
            <tr class="total-row">
              <td>TOTAL</td>
              <td>${formatCurrency(financialData?.totals.totalRevenue || 0)}</td>
              <td>${formatCurrency(financialData?.totals.totalCost || 0)}</td>
              <td>${formatCurrency(financialData?.totals.totalProfit || 0)}</td>
              <td>${financialData?.totals.overallMargin || 0}%</td>
              
            </tr>
          </tbody>
        </table>
      </body>
      </html>
    `
    
    printWindow.document.write(html)
    printWindow.document.close()
    
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  const handleExportExcel = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
      
      const response = await fetch(`${baseUrl}/api/admin/financial-reports/export-excel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          serviceFilter,
          startDate,
          endDate,
          data: financialData
        })
      })
      
      if (!response.ok) {
        throw new Error('Excel export failed')
      }

      // Check if backend returns actual Excel blob or just a message
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        // Backend returns actual Excel file
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `financial-report-${startDate}-to-${endDate}.xlsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else {
        // Backend not yet implemented - use client-side CSV generation
        console.log('Backend Excel not available, generating CSV...')
        generateClientSideCSV()
      }
    } catch (error) {
      console.error('Excel export error:', error)
      // Fallback to client-side CSV generation
      generateClientSideCSV()
    }
  }

  const generateClientSideCSV = () => {
    if (!financialData) return

    // Create CSV content
    let csv = 'Financial Report\n'
    csv += `Period:,${startDate} to ${endDate}\n`
    csv += `Filter:,${serviceFilter === 'all' ? 'All' : serviceFilter === 'predefined' ? 'Services' : 'Projects'}\n`
    csv += `Generated:,${new Date().toLocaleString()}\n\n`
    
    csv += 'Service Type,Revenue (LKR),Cost (LKR),Profit (LKR),Margin %,\n'
    
    financialData.breakdown.forEach(service => {
      csv += `${service.serviceType},${service.revenue},${service.cost},${service.profit},${service.margin}\n`
    })
    
    csv += `\nTOTAL,${financialData.totals.totalRevenue},${financialData.totals.totalCost},${financialData.totals.totalProfit},${financialData.totals.overallMargin},${financialData.totals.overallTrend}\n`
    
    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `financial-report-${startDate}-to-${endDate}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (loading) {
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

  if (error) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-red-600 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bebas text-[#020079] mb-2">Failed to Load Financial Reports</h2>
            <p className="font-roboto text-slate-600 mb-4">{error}</p>
            <Button 
              onClick={loadFinancialData}
              className="bg-[#020079] text-white font-roboto hover:bg-[#03009B]"
            >
              Try Again
            </Button>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  if (!financialData || !financialData.breakdown || financialData.breakdown.length === 0) {
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

          {/* Empty State */}
          <Card className="border border-[#020079]/20 bg-white">
            <CardContent className="py-20">
              <div className="text-center">
                <div className="text-slate-300 text-6xl mb-4">📊</div>
                <h3 className="text-xl font-bebas text-[#020079] mb-2">No Financial Data Available</h3>
                <p className="font-roboto text-slate-500 mb-4">
                  There are no jobs in the selected date range.
                  <br />
                  <span className="font-semibold text-slate-700">Date Range: {startDate} to {endDate}</span>
                </p>
                
                {totalJobsInDB !== null && (
                  <div className={`inline-block px-4 py-2 rounded-lg mb-4 ${
                    totalJobsInDB === 0 
                      ? 'bg-red-50 border border-red-200' 
                      : 'bg-green-50 border border-green-200'
                  }`}>
                    <p className="font-roboto text-sm">
                      <strong>Database Status:</strong>{' '}
                      {totalJobsInDB === 0 ? (
                        <span className="text-red-700">❌ No jobs found in database</span>
                      ) : (
                        <span className="text-green-700">✅ {totalJobsInDB} jobs exist in database</span>
                      )}
                    </p>
                  </div>
                )}
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto text-left">
                  <h4 className="font-roboto font-semibold text-[#020079] mb-2">💡 To see financial data:</h4>
                  <ol className="font-roboto text-sm text-slate-700 space-y-2 ml-4 list-decimal">
                    <li>
                      <strong>Check if jobs exist:</strong> Navigate to the jobs/bookings section to verify data exists
                    </li>
                    <li>
                      <strong>Adjust date range:</strong> Try selecting a wider date range or different dates
                    </li>
                    <li>
                      <strong>Add sample data:</strong> Create some test jobs with completed status
                    </li>
                  </ol>
                  
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
                    <p className="text-xs font-roboto text-amber-900">
                      <strong>Note:</strong> Financial reports calculate from the <code className="bg-amber-100 px-1 rounded">jobs</code> table 
                      where <code className="bg-amber-100 px-1 rounded">arriving_date</code> is within the selected range.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={loadFinancialData}
                    className="bg-[#020079] text-white font-roboto hover:bg-[#03009B]"
                  >
                    Refresh Data
                  </Button>
                  <Button 
                    onClick={() => {
                      setStartDate('2020-01-01')
                      setEndDate(new Date().toISOString().split('T')[0])
                    }}
                    variant="outline"
                    className="border-[#020079] text-[#020079] font-roboto hover:bg-[#020079]/5"
                  >
                    Try All Time
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
                  <option value="all">All</option>
                  <option value="predefined">Services</option>
                  <option value="custom">Projects</option>
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
            {financialData.breakdown && financialData.breakdown.length > 0 && financialData.totals.totalRevenue > 0 ? (
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
                      
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-20 text-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="text-slate-300 text-6xl mb-4">📋</div>
                <h3 className="text-xl font-bebas text-slate-700 mb-2">No Financial Data Found</h3>
                <p className="font-roboto text-sm text-slate-600 mb-6 max-w-md mx-auto">
                  No financial breakdown available for the selected date range.
                  <br />
                  <span className="text-xs text-slate-500 mt-2 inline-block">
                    ({startDate} to {endDate})
                  </span>
                </p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={loadFinancialData}
                    variant="outline"
                    className="border-[#020079] text-[#020079] font-roboto hover:bg-[#020079]/5"
                  >
                    Refresh
                  </Button>
                  <Button 
                    onClick={() => {
                      setStartDate('2020-01-01')
                      setEndDate(new Date().toISOString().split('T')[0])
                    }}
                    className="bg-[#020079] text-white font-roboto hover:bg-[#03009B]"
                  >
                    Load All Time Data
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Charts Section */}
        {financialData.breakdown && financialData.breakdown.length > 0 && financialData.totals.totalRevenue > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Distribution Chart - Pie Chart */}
            <Card className="border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 bg-white">
              <CardHeader className="border-b border-[#FFD700]/20">
                <CardTitle className="text-base font-roboto font-semibold text-[#020079]">
                  Revenue Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {financialData.revenueDistribution && financialData.revenueDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={financialData.revenueDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {financialData.revenueDistribution.map((entry, index) => {
                          const COLORS = ['#020079', '#FFD700', '#4CAF50', '#FF9800', '#E91E63', '#9C27B0']
                          return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        })}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => `LKR ${formatCurrency(value)}`}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #020079' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-slate-400 text-sm font-roboto">No distribution data</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Monthly Profit Trend Chart - Line Chart */}
            <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
              <CardHeader className="border-b border-[#020079]/10">
                <CardTitle className="text-base font-roboto font-semibold text-[#020079]">
                  Monthly Profit Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {financialData.monthlyTrend && financialData.monthlyTrend.labels && financialData.monthlyTrend.labels.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                      data={financialData.monthlyTrend.labels.map((label, index) => ({
                        month: label,
                        revenue: financialData.monthlyTrend.revenue[index],
                        cost: financialData.monthlyTrend.cost[index],
                        profit: financialData.monthlyTrend.profit[index]
                      }))}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 11, fill: '#666' }}
                        angle={-15}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        tick={{ fontSize: 11, fill: '#666' }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip 
                        formatter={(value: number) => `LKR ${formatCurrency(value)}`}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #020079' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Line type="monotone" dataKey="profit" stroke="#020079" strokeWidth={2} name="Profit" />
                      <Line type="monotone" dataKey="revenue" stroke="#FFD700" strokeWidth={2} name="Revenue" />
                      <Line type="monotone" dataKey="cost" stroke="#FF5722" strokeWidth={2} name="Cost" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-slate-400 text-sm font-roboto">No trend data</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cost Analysis Chart - Bar Chart */}
            <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
              <CardHeader className="border-b border-[#020079]/10">
                <CardTitle className="text-base font-roboto font-semibold text-[#020079]">
                  Cost Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {financialData.costAnalysis && financialData.costAnalysis.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={financialData.costAnalysis}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="category" 
                        tick={{ fontSize: 11, fill: '#666' }}
                        angle={-15}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        tick={{ fontSize: 11, fill: '#666' }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip 
                        formatter={(value: number) => `LKR ${formatCurrency(value)}`}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #020079' }}
                      />
                      <Bar dataKey="amount" fill="#020079" name="Cost" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-slate-400 text-sm font-roboto">No cost data</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="border border-amber-200 bg-amber-50">
            <CardContent className="py-16">
              <div className="text-center">
                <div className="text-amber-400 text-6xl mb-4">�</div>
                <h3 className="text-xl font-bebas text-amber-900 mb-2">No Data Available for Charts</h3>
                <p className="font-roboto text-sm text-amber-800 mb-4">
                  Revenue distribution, profit trends, and cost analysis charts require financial data to display.
                </p>
                <p className="font-roboto text-xs text-amber-700">
                  💡 Add jobs to the database or adjust the date range to see visualizations.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminDashboardLayout>
  )
}

