"use client"

import { useEffect, useState } from "react"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Line } from "recharts"
import { Pencil, Trash2, Plus, TrendingUp, DollarSign, Clock, Package, Activity, AlertCircle, CheckCircle, Wrench } from "lucide-react"
import { getAllServices, getDetailedServiceAnalytics, createService, updateService, deleteService } from "@/services/adminService"
import { ServiceAnalyticsDetailedResponse, ServiceInfoResponse } from "@/types/serviceAnalytics"
import { showToast } from "@/lib/toast"

export default function ServicesAnalyticsPage() {
  const [analytics, setAnalytics] = useState<ServiceAnalyticsDetailedResponse | null>(null)
  const [services, setServices] = useState<ServiceInfoResponse[]>([])
  const [loading, setLoading] = useState(true)
  
  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceInfoResponse | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    cost: 0,
    estimatedHours: 0,
    imageUrl: "",
  })

  const serviceCategories = [
    "Oil Change",
    "Brake Service",
    "Tire Service",
    "Engine Repair",
    "Transmission",
    "Electrical",
    "AC Service",
    "Inspection",
    "Detailing",
    "Other"
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [analyticsData, servicesData] = await Promise.all([
        getDetailedServiceAnalytics(),
        getAllServices()
      ])
      setAnalytics(analyticsData)
      setServices(servicesData)
    } catch (error) {
      console.error("Failed to load data:", error)
      showToast.error("Failed to load services data")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateService = async () => {
    try {
      await createService(formData)
      showToast.success("Service created successfully")
      setCreateModalOpen(false)
      resetForm()
      loadData()
    } catch (error) {
      console.error("Failed to create service:", error)
      showToast.error("Failed to create service")
    }
  }

  const handleUpdateService = async () => {
    if (!selectedService) return
    try {
      await updateService(selectedService.serviceId.toString(), formData)
      showToast.success("Service updated successfully")
      setEditModalOpen(false)
      resetForm()
      loadData()
    } catch (error) {
      console.error("Failed to update service:", error)
      showToast.error("Failed to update service")
    }
  }

  const handleDeleteService = async () => {
    if (!selectedService) return
    try {
      const result = await deleteService(selectedService.serviceId.toString())
      if (result.success) {
        showToast.success("Service deleted successfully")
        setDeleteModalOpen(false)
        setSelectedService(null)
        loadData()
      } else {
        showToast.error(result.message || "Failed to delete service")
      }
    } catch (error) {
      console.error("Failed to delete service:", error)
      showToast.error("Failed to delete service")
    }
  }

  const openCreateModal = () => {
    resetForm()
    setCreateModalOpen(true)
  }

  const openEditModal = (service: ServiceInfoResponse) => {
    setSelectedService(service)
    setFormData({
      title: service.title,
      description: service.description || "",
      category: service.category,
      cost: service.cost,
      estimatedHours: service.estimatedHours,
      imageUrl: service.imageUrl || "",
    })
    setEditModalOpen(true)
  }

  const openDeleteModal = (service: ServiceInfoResponse) => {
    setSelectedService(service)
    setDeleteModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      cost: 0,
      estimatedHours: 0,
      imageUrl: "",
    })
    setSelectedService(null)
  }

  // Transform data for charts
  const popularServicesData = analytics?.popularServices ? 
    analytics.popularServices.labels.map((label, i) => ({
      name: label,
      bookings: analytics.popularServices.data[i]
    })) : []


 

  const brandAnalyticsData = analytics?.brandAnalytics ?
    analytics.brandAnalytics.labels.map((label, i) => ({
      brand: label,
      count: analytics.brandAnalytics.data[i]
    })) : []

 

  

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto"></div>
            <p className="mt-4 font-roboto text-[#020079]/70">
              Loading services analytics...
            </p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminDashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        {/* Page Title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bebas text-[#020079] mb-2">
              Services Analytics
            </h1>
            <p className="font-roboto text-[#020079]/70">
              Comprehensive analytics and management for automotive services
            </p>
          </div>
          <Button 
            onClick={openCreateModal} 
            className="gap-2 bg-[#020079] hover:bg-[#020079]/90 text-white font-roboto"
          >
            <Plus className="h-4 w-4" />
            Add New Service
          </Button>
        </div>

        {/* Services Overview Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bebas text-[#020079] mb-4">SERVICES OVERVIEW</h2>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-[#020079]">
                  {analytics?.serviceSummary?.totalServices || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Services
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-green-600">
                  {analytics?.serviceSummary?.completed || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Finished
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-blue-600">
                  {analytics?.serviceSummary?.inProgress || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Active
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  Waiting Parts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-orange-600">
                  {analytics?.serviceSummary?.waitingParts || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  On Hold
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <Package className="h-4 w-4 text-purple-600" />
                  Scheduled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-purple-600">
                  {analytics?.serviceSummary?.scheduled || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Planned
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  Cancelled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-red-600">
                  {analytics?.serviceSummary?.cancelled || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Canceled
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Average Cost Card */}
          <div className="mt-4">
            <Card className="bg-gradient-to-r from-[#020079] to-[#020079]/80 border-0">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    
                    <div>
                      <p className="text-sm font-roboto text-white/80">Average Service Cost</p>
                      <p className="text-3xl font-bebas text-white">
                        LKR {analytics?.serviceSummary?.averageCost 
                          ? (analytics.serviceSummary.averageCost * 320).toLocaleString('en-US', { maximumFractionDigits: 0 })
                          : '0'}
                      </p>
                    </div>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Projects Overview Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bebas text-[#020079] mb-4">PROJECTS OVERVIEW</h2>
          <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-8">
            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-[#020079]">
                  {analytics?.projectAnalytics?.summary?.totalProjects || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Projects
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-gray-600" />
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-gray-600">
                  {analytics?.projectAnalytics?.summary?.pending || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Awaiting
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-teal-600" />
                  Approved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-teal-600">
                  {analytics?.projectAnalytics?.summary?.approved || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Ready
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-green-600">
                  {analytics?.projectAnalytics?.summary?.completed || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Done
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-blue-600">
                  {analytics?.projectAnalytics?.summary?.inProgress || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Active
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  Waiting Parts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-orange-600">
                  {analytics?.projectAnalytics?.summary?.waitingParts || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  On Hold
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <Package className="h-4 w-4 text-purple-600" />
                  Scheduled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-purple-600">
                  {analytics?.projectAnalytics?.summary?.scheduled || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Planned
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-roboto text-[#020079]/60 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  Cancelled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas text-red-600">
                  {analytics?.projectAnalytics?.summary?.cancelled || 0}
                </div>
                <p className="text-xs font-roboto text-[#020079]/70 mt-1">
                  Canceled
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Average Cost Card */}
          <div className="mt-4">
            <Card className="bg-gradient-to-r from-[#020079] to-[#020079]/80 border-0">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                  
                    <div>
                      <p className="text-sm font-roboto text-white/80">Average Project Cost</p>
                      <p className="text-3xl font-bebas text-white">
                        LKR {analytics?.projectAnalytics?.summary?.averageCost 
                          ? (analytics.projectAnalytics.summary.averageCost * 320).toLocaleString('en-US', { maximumFractionDigits: 0 })
                          : '0'}
                      </p>
                    </div>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* 1. Popular Services Chart */}
          <Card className="bg-white border-[#020079]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-bebas text-[#020079] text-2xl">
                <TrendingUp className="h-5 w-5" />
                Popular Services
              </CardTitle>
              <CardDescription className="font-roboto text-[#020079]/70">
                Top 10 most booked services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularServicesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#020079" opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100} 
                    fontSize={11}
                    stroke="#020079"
                  />
                  <YAxis stroke="#020079" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #020079', 
                      borderRadius: '8px',
                      fontFamily: 'Roboto'
                    }} 
                  />
                  <Bar dataKey="bookings" fill="#020079" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          
          
          {/* 5. Brand Analytics */}
          <Card className="bg-white border-[#020079]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-bebas text-[#020079] text-2xl">
                <Wrench className="h-5 w-5" />
                Vehicle Brand Distribution
              </CardTitle>
              <CardDescription className="font-roboto text-[#020079]/70">
                Top 10 brands serviced
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={brandAnalyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#020079" opacity={0.1} />
                  <XAxis 
                    dataKey="brand" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100} 
                    fontSize={11}
                    stroke="#020079"
                  />
                  <YAxis stroke="#020079" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #020079', 
                      borderRadius: '8px',
                      fontFamily: 'Roboto'
                    }} 
                  />
                  <Bar dataKey="count" fill="#82CA9D" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          

          {/* 7. Task Delays */}
          <Card className="bg-white border-[#020079]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-bebas text-[#020079] text-2xl">
                <AlertCircle className="h-5 w-5" />
                Task Delays
              </CardTitle>
              <CardDescription className="font-roboto text-[#020079]/70">
                Tasks on hold or waiting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[300px]">
                <div className="text-8xl font-bebas text-orange-600">
                  {analytics?.taskDelays?.totalDelayed || 0}
                </div>
                <p className="font-roboto text-[#020079]/70 mt-2 text-lg">Delayed Tasks</p>
              </div>
            </CardContent>
          </Card>

          
        </div>

        {/* Services Table */}
        <Card className="bg-white border-[#020079]/20">
          <CardHeader>
            <CardTitle className="font-bebas text-[#020079] text-2xl">All Services</CardTitle>
            <CardDescription className="font-roboto text-[#020079]/70">
              Manage predefined automotive services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#020079]/20">
                    <TableHead className="font-roboto text-[#020079]">Service</TableHead>
                    <TableHead className="font-roboto text-[#020079]">Category</TableHead>
                    <TableHead className="font-roboto text-[#020079]">Cost(LKR)</TableHead>
                    <TableHead className="font-roboto text-[#020079]">Est. Hours</TableHead>
                    <TableHead className="font-roboto text-[#020079]">Total Bookings</TableHead>
                    <TableHead className="text-right font-roboto text-[#020079]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.serviceId} className="border-[#020079]/10">
                      <TableCell>
                        <div>
                          <div className="font-medium font-roboto text-[#020079]">{service.title}</div>
                          <div className="text-sm font-roboto text-[#020079]/70">{service.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-[#020079]/10 text-[#020079] hover:bg-[#020079]/20 font-roboto">
                          {service.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-roboto text-[#020079]">{service.cost.toFixed(2)}</TableCell>
                      <TableCell className="font-roboto text-[#020079]">{service.estimatedHours}h</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-[#020079]/30 text-[#020079] font-roboto">
                          {service.totalBookings}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(service)}
                            className="text-[#020079] hover:bg-[#020079]/10"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteModal(service)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Create Service Modal */}
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white border-[#020079]/20">
            <DialogHeader>
              <DialogTitle className="font-bebas text-[#020079] text-2xl">Create New Service</DialogTitle>
              <DialogDescription className="font-roboto text-[#020079]/70">
                Add a new predefined service to the system
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="font-roboto text-[#020079]">Service Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Oil Change"
                  className="border-[#020079]/20 text-black focus:border-[#020079] font-roboto"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="font-roboto text-[#020079]">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Service description..."
                  className="border-[#020079]/20 text-black focus:border-[#020079] font-roboto"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category" className="font-roboto text-[#020079]">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="border-[#020079]/20 text-black focus:border-[#020079] font-roboto">
                    <SelectValue placeholder="Select category"  />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black border-[#020079]/20">
                    {serviceCategories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="font-roboto">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cost" className="font-roboto  text-[#020079]">Cost ($) *</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
                    placeholder="0.00"
                    className="border-[#020079]/20 text-black focus:border-[#020079] font-roboto"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hours" className="font-roboto text-[#020079]">Est. Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    value={formData.estimatedHours}
                    onChange={(e) => setFormData({ ...formData, estimatedHours: parseFloat(e.target.value) })}
                    placeholder="0.0"
                    className="border-[#020079]/20 text-black focus:border-[#020079] font-roboto"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl" className="font-roboto text-[#020079]">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="border-[#020079]/20 text-black focus:border-[#020079] font-roboto"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setCreateModalOpen(false)}
                className="border-[#020079]/20 text-[#020079] hover:bg-[#020079]/10 font-roboto"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateService}
                className="bg-[#020079] hover:bg-[#020079]/90 text-white font-roboto"
              >
                Create Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Service Modal */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white border-[#020079]/20">
            <DialogHeader>
              <DialogTitle className="font-bebas text-[#020079] text-2xl">Edit Service</DialogTitle>
              <DialogDescription className="font-roboto text-[#020079]/70">
                Update service information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title" className="font-roboto text-[#020079]">Service Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-[#020079]/20 text-black focus:border-[#020079] font-roboto"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description" className="font-roboto text-[#020079]">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border-[#020079]/20 text-black focus:border-[#020079] font-roboto"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category" className="font-roboto text-[#020079]">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                
                >
                  <SelectTrigger className="border-[#020079]/20 focus:border-[#020079] font-roboto text-black">
                    <SelectValue placeholder="Select category" className="text-black" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black border-[#020079]/20">
                    {serviceCategories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="font-roboto text-black">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-cost" className="font-roboto text-[#020079]">Cost ($) *</Label>
                  <Input
                    id="edit-cost"
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
                    className="border-[#020079]/20 text-black focus:border-[#020079] font-roboto"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-hours" className="font-roboto text-[#020079]">Est. Hours</Label>
                  <Input
                    id="edit-hours"
                    type="number"
                    value={formData.estimatedHours}
                    onChange={(e) => setFormData({ ...formData, estimatedHours: parseFloat(e.target.value) })}
                    className="border-[#020079]/20 text-black focus:border-[#020079] font-roboto"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-imageUrl" className="font-roboto text-[#020079]">Image URL</Label>
                <Input
                  id="edit-imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="border-[#020079]/20 text-black focus:border-[#020079] font-roboto"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setEditModalOpen(false)}
                className="border-[#020079]/20 text-[#020079] hover:bg-[#020079]/10 font-roboto"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateService}
                className="bg-[#020079] hover:bg-[#020079]/90 text-white font-roboto"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="bg-white border-[#020079]/20">
            <DialogHeader>
              <DialogTitle className="font-bebas text-[#020079] text-2xl">Delete Service</DialogTitle>
              <DialogDescription className="font-roboto text-[#020079]/70">
                Are you sure you want to delete &quot;{selectedService?.title}&quot;? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDeleteModalOpen(false)}
                className="border-[#020079]/20 text-[#020079] hover:bg-[#020079]/10 font-roboto"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteService}
                className="bg-red-600 hover:bg-red-700 font-roboto"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  )
}
