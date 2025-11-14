"use client"

import { useEffect, useState } from "react"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import { 
  fetchCustomerAnalytics, 
  fetchCustomerList,
  addCustomer,
  deleteCustomer,
  activateCustomer,
  deactivateCustomer,
  type CustomerAnalytics,
  type Customer,
  type AddCustomerRequest
} from "@/services/adminService"
import { Users, UserPlus, TrendingUp, DollarSign, Car, Activity, Search, Plus, Trash2, UserCheck, UserX } from "lucide-react"
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
  ResponsiveContainer,
  PieLabelRenderProps
} from "recharts"

export default function CustomerDetailsPage() {
  const [analytics, setAnalytics] = useState<CustomerAnalytics | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "Active" | "Inactive">("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCustomer, setNewCustomer] = useState<AddCustomerRequest>({
    name: "",
    email: "",
    phone: ""
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [analyticsData, customerList] = await Promise.all([
        fetchCustomerAnalytics(),
        fetchCustomerList()
      ])
      setAnalytics(analyticsData)
      setCustomers(customerList)
    } catch (error) {
      console.error("Failed to load customer data:", error)
      alert("Failed to load customer data")
    } finally {
      setLoading(false)
    }
  }

  const handleAddCustomer = async () => {
    try {
      if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
        alert("Please fill in all fields")
        return
      }
      await addCustomer(newCustomer)
      alert("Customer added successfully")
      setShowAddModal(false)
      setNewCustomer({ name: "", email: "", phone: "" })
      loadData()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to add customer"
      alert(message)
    }
  }

  const handleActivate = async (customerId: string) => {
    try {
      await activateCustomer(customerId)
      alert("Customer activated successfully")
      loadData()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to activate customer"
      alert(message)
    }
  }

  const handleDeactivate = async (customerId: string) => {
    try {
      await deactivateCustomer(customerId)
      alert("Customer deactivated successfully")
      loadData()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to deactivate customer"
      alert(message)
    }
  }

  const handleDeleteCustomer = async (customerId: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) {
      return
    }
    try {
      await deleteCustomer(customerId)
      alert("Customer deleted successfully")
      loadData()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete customer"
      alert(message)
    }
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    const matchesFilter = filterStatus === "all" || customer.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079]"></div>
        </div>
      </AdminDashboardLayout>
    )
  }

  if (!analytics) {
    return (
      <AdminDashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Failed to load customer analytics</p>
        </div>
      </AdminDashboardLayout>
    )
  }

  const growthChartData = analytics.growthTrend.labels.map((label, i) => ({
    month: label,
    new: analytics.growthTrend.newCustomers[i],
    total: analytics.growthTrend.totalCustomers[i],
    active: analytics.growthTrend.activeCustomers[i]
  }))

  const brandChartData = analytics.vehicleBrandDistribution.brands.slice(0, 10).map((brand, i) => ({
    name: brand,
    vehicles: analytics.vehicleBrandDistribution.count[i],
    customers: analytics.vehicleBrandDistribution.customerCount[i]
  }))

  const engagementPieData = [
    { name: 'High (5+)', value: analytics.engagement.highEngagement, color: '#020079' },
    { name: 'Medium (2-4)', value: analytics.engagement.mediumEngagement, color: '#4040ff' },
    { name: 'Low (1)', value: analytics.engagement.lowEngagement, color: '#8080ff' },
    { name: 'None', value: analytics.engagement.noEngagement, color: '#c0c0ff' }
  ]

  const revenueChartData = analytics.revenueStats.monthlyRevenue.map(item => ({
    month: item.month,
    revenue: item.revenue,
    customers: item.customerCount
  }))

  return (
    <AdminDashboardLayout>
      <div className="p-6 bg-white/30">
        <div className="mb-6">
          <h1 className="text-3xl font-bebas tracking-wider text-[#020079] mb-2">
            CUSTOMER ANALYTICS DASHBOARD
          </h1>
          <p className="text-sm text-gray-600 font-roboto">
            Comprehensive insights into customer behavior, revenue, and engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#020079] to-[#4040ff] rounded-lg p-5 text-white">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8" />
              <span className="text-xs font-roboto bg-white/20 px-2 py-1 rounded">Total</span>
            </div>
            <div className="text-3xl font-bebas tracking-wider mb-1">
              {analytics.stats.totalCustomers}
            </div>
            <div className="text-sm font-roboto opacity-90">Total Customers</div>
            <div className="mt-2 text-xs font-roboto">
              {analytics.stats.activeCustomers} Active  {analytics.stats.inactiveCustomers} Inactive
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border-2 border-[#020079]/20">
            <div className="flex items-center justify-between mb-2">
              <UserPlus className="w-8 h-8 text-[#020079]" />
              <span className="text-xs font-roboto text-green-600 bg-green-100 px-2 py-1 rounded">
                This Month
              </span>
            </div>
            <div className="text-3xl font-bebas tracking-wider text-[#020079] mb-1">
              {analytics.stats.newThisMonth}
            </div>
            <div className="text-sm font-roboto text-gray-600">New Customers</div>
          </div>

          <div className="bg-white rounded-lg p-5 border-2 border-[#020079]/20">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-[#020079]" />
              <span className="text-xs font-roboto text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {analytics.stats.retentionRate.toFixed(1)}%
              </span>
            </div>
            <div className="text-3xl font-bebas tracking-wider text-[#020079] mb-1">
              {analytics.stats.retentionRate.toFixed(1)}%
            </div>
            <div className="text-sm font-roboto text-gray-600">Retention Rate</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-5 text-white">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8" />
              <span className="text-xs font-roboto bg-white/20 px-2 py-1 rounded">Total</span>
            </div>
            <div className="text-3xl font-bebas tracking-wider mb-1">
              LKR {(analytics.stats.totalRevenue / 1000000).toFixed(2)}M
            </div>
            <div className="text-sm font-roboto opacity-90">Total Revenue</div>
            <div className="mt-2 text-xs font-roboto">
              Avg: LKR {(analytics.stats.avgSpendPerCustomer / 1000).toFixed(1)}K
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border-2 border-[#020079]/20">
            <div className="flex items-center gap-3">
              <Car className="w-10 h-10 text-[#020079]" />
              <div>
                <div className="text-2xl font-bebas tracking-wider text-[#020079]">
                  {analytics.stats.totalVehicles}
                </div>
                <div className="text-sm font-roboto text-gray-600">Total Vehicles</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-[#020079]/20">
            <div className="flex items-center gap-3">
              <Activity className="w-10 h-10 text-[#020079]" />
              <div>
                <div className="text-2xl font-bebas tracking-wider text-[#020079]">
                  {analytics.stats.totalJobsCompleted}
                </div>
                <div className="text-sm font-roboto text-gray-600">Completed Jobs</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-[#020079]/20">
            <div className="flex items-center gap-3">
              <Users className="w-10 h-10 text-[#020079]" />
              <div>
                <div className="text-2xl font-bebas tracking-wider text-[#020079]">
                  {analytics.engagement.avgServicesPerCustomer.toFixed(1)}
                </div>
                <div className="text-sm font-roboto text-gray-600">Avg Services/Customer</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-5 border-2 border-[#020079]/20">
            <h3 className="text-xl font-bebas tracking-wider text-[#020079] mb-4">
              CUSTOMER GROWTH TREND
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" style={{ fontSize: '12px', fontFamily: 'Roboto' }} />
                <YAxis style={{ fontSize: '12px', fontFamily: 'Roboto' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Roboto' }} />
                <Line type="monotone" dataKey="new" stroke="#020079" strokeWidth={2} name="New" />
                <Line type="monotone" dataKey="active" stroke="#4040ff" strokeWidth={2} name="Active" />
                <Line type="monotone" dataKey="total" stroke="#8080ff" strokeWidth={2} name="Total" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg p-5 border-2 border-[#020079]/20">
            <h3 className="text-xl font-bebas tracking-wider text-[#020079] mb-4">
              VEHICLE BRANDS
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={brandChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" style={{ fontSize: '12px', fontFamily: 'Roboto' }} />
                <YAxis style={{ fontSize: '12px', fontFamily: 'Roboto' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Roboto' }} />
                <Bar dataKey="vehicles" fill="#020079" name="Vehicles" />
                <Bar dataKey="customers" fill="#4040ff" name="Customers" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg p-5 border-2 border-[#020079]/20">
            <h3 className="text-xl font-bebas tracking-wider text-[#020079] mb-4">
              CUSTOMER ENGAGEMENT
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg p-5 border-2 border-[#020079]/20">
            <h3 className="text-xl font-bebas tracking-wider text-[#020079] mb-4">
              MONTHLY REVENUE
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" style={{ fontSize: '12px', fontFamily: 'Roboto' }} />
                <YAxis style={{ fontSize: '12px', fontFamily: 'Roboto' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'Roboto' }} />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border-2 border-[#020079]/20 mb-6">
          <h3 className="text-xl font-bebas tracking-wider text-[#020079] mb-4">
            TOP 10 CUSTOMERS BY SPENDING
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {analytics.revenueStats.topSpenders.map((spender, index) => (
              <div key={spender.customerId} className="bg-gradient-to-br from-[#020079] to-[#4040ff] rounded-lg p-4 text-white">
                <div className="text-xs font-roboto mb-1 opacity-80">#{index + 1}</div>
                <div className="text-lg font-bebas tracking-wider truncate">{spender.name}</div>
                <div className="text-2xl font-bebas tracking-wider mt-1">
                  LKR {(spender.totalSpent / 1000).toFixed(1)}K
                </div>
                <div className="text-xs font-roboto mt-1 opacity-90">
                  {spender.servicesCount} services
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border-2 border-[#020079]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bebas tracking-wider text-[#020079]">
              CUSTOMER LIST ({filteredCustomers.length})
            </h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-[#020079] text-white px-4 py-2 rounded-lg hover:bg-[#020079]/90 transition-colors font-roboto text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Customer
            </button>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#020079] focus:outline-none font-roboto text-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "Active" | "Inactive")}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#020079] focus:outline-none font-roboto text-sm"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#020079]/5 border-b-2 border-[#020079]/20">
                  <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-[#020079]">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-[#020079]">Contact</th>
                  <th className="px-4 py-3 text-center text-sm font-bebas tracking-wider text-[#020079]">Vehicles</th>
                  <th className="px-4 py-3 text-right text-sm font-bebas tracking-wider text-[#020079]">Total Spent</th>
                  <th className="px-4 py-3 text-center text-sm font-bebas tracking-wider text-[#020079]">Last Service</th>
                  <th className="px-4 py-3 text-center text-sm font-bebas tracking-wider text-[#020079]">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-bebas tracking-wider text-[#020079]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-200 hover:bg-[#020079]/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-roboto text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="font-roboto text-xs text-gray-500">{customer.id}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-roboto text-sm text-gray-900">{customer.email}</div>
                      <div className="font-roboto text-xs text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-roboto text-sm font-medium text-[#020079]">{customer.vehicleCount}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-roboto text-sm font-medium text-green-600">
                        LKR {(customer.totalSpent / 1000).toFixed(1)}K
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-roboto text-xs text-gray-500">{customer.lastServiceDate}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-roboto font-medium ${
                        customer.status === "Active" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {customer.status === "Active" ? (
                          <button
                            onClick={() => handleDeactivate(customer.id)}
                            className="p-1 text-orange-600 hover:bg-orange-100 rounded transition-colors"
                            title="Deactivate"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivate(customer.id)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                            title="Activate"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-2xl font-bebas tracking-wider text-[#020079] mb-4">
              ADD NEW CUSTOMER
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-roboto font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#020079] focus:outline-none font-roboto text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-roboto font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#020079] focus:outline-none font-roboto text-sm"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-roboto font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#020079] focus:outline-none font-roboto text-sm"
                  placeholder="+94 77 123 4567"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-roboto text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomer}
                  className="flex-1 px-4 py-2 bg-[#020079] text-white rounded-lg hover:bg-[#020079]/90 transition-colors font-roboto text-sm"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminDashboardLayout>
  )
}
