"use client"

import { useEffect, useState } from "react"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Users, Wrench, Calendar, DollarSign, AlertCircle, Plus, Edit, Trash2, CheckCircle2 } from "lucide-react"
import { 
  fetchRolesPermissions, 
  fetchServicesPricing, 
  fetchTaskLimits,
  fetchCompensationRules,
  type RolePermission,
  type ServicePricing,
  type TaskLimits,
  type CompensationRules
} from "@/services/adminService"

export default function SettingsPage() {
  const [roles, setRoles] = useState<RolePermission[]>([])
  const [services, setServices] = useState<ServicePricing[]>([])
  const [taskLimits, setTaskLimits] = useState<TaskLimits | null>(null)
  const [compensation, setCompensation] = useState<CompensationRules | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSettingsData = async () => {
      try {
        setLoading(true)
        const [rolesData, servicesData, limitsData, compensationData] = await Promise.all([
          fetchRolesPermissions(),
          fetchServicesPricing(),
          fetchTaskLimits(),
          fetchCompensationRules()
        ])
        setRoles(rolesData)
        setServices(servicesData)
        setTaskLimits(limitsData)
        setCompensation(compensationData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load settings data")
      } finally {
        setLoading(false)
      }
    }
    loadSettingsData()
  }, [])

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-600">Loading settings...</span>
        </div>
      </AdminDashboardLayout>
    )
  }

  if (error) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <AlertCircle className="w-12 h-12 text-rose-600 mr-3" />
          <span className="text-rose-600">{error}</span>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminDashboardLayout>
      <div className="p-8 space-y-6 bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Settings & Configuration</h1>
            <p className="text-slate-600">Manage roles, services, limits, and compensation policies</p>
          </div>
        </div>

        {/* Roles & Permissions */}
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <Users className="w-6 h-6" />
              Manage Roles & Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Role</th>
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Users</th>
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Permissions</th>
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-slate-600">
                        No roles configured.
                      </td>
                    </tr>
                  ) : (
                    roles.map((role) => (
                      <tr key={role.roleId} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-800 font-semibold">{role.roleName}</td>
                        <td className="py-3 px-4 text-slate-800">{role.userCount}</td>
                        <td className="py-3 px-4 text-slate-600 text-sm">{role.permissions}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                            {role.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit Permissions
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Services & Pricing */}
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-100">
            <CardTitle className="flex items-center gap-2 text-cyan-700">
              <Wrench className="w-6 h-6" />
              Manage Services & Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Service Name</th>
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Base Price (LKR)</th>
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Duration</th>
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Required Skill</th>
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-slate-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-600">
                        No services configured.
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <tr key={service.serviceId} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-800 font-semibold">{service.serviceName}</td>
                        <td className="py-3 px-4 text-slate-800">{service.basePrice.toLocaleString()}</td>
                        <td className="py-3 px-4 text-slate-800">{service.duration} mins</td>
                        <td className="py-3 px-4 text-slate-600 text-sm">{service.requiredSkill}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${
                            service.status === "Active" 
                              ? "bg-emerald-100 text-emerald-700 border-emerald-300" 
                              : "bg-slate-100 text-slate-700 border-slate-300"
                          }`}>
                            {service.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" className="bg-rose-500 hover:bg-rose-600 text-white">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Disable
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white">
              <Plus className="w-4 h-4 mr-1" />
              Add New Service
            </Button>
          </CardContent>
        </Card>

        {/* Employee Task Limits */}
        {taskLimits && (
          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <Calendar className="w-6 h-6" />
                Employee Task Limits
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">Maximum Tasks Per Employee Per Day:</Label>
                  <Input 
                    type="number" 
                    value={taskLimits.maxTasksPerDay} 
                    className="border-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">Overload Warning Threshold:</Label>
                  <Input 
                    type="number" 
                    value={taskLimits.overloadThreshold} 
                    className="border-slate-300"
                  />
                </div>
              </div>
              <Button className="mt-6 bg-amber-500 hover:bg-amber-600 text-white">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Compensation Rules */}
        {compensation && (
          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
              <CardTitle className="flex items-center gap-2 text-emerald-700">
                <DollarSign className="w-6 h-6" />
                Compensation Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">Base Salary (LKR/month):</Label>
                  <Input 
                    type="number" 
                    value={compensation.baseSalary} 
                    className="border-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">Demand-Based Bonus (% of base):</Label>
                  <Input 
                    type="number" 
                    value={compensation.demandBonusPercentage} 
                    className="border-slate-300"
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <p className="text-slate-800">
                    <span className="font-semibold">Example Calculation:</span> Base (LKR {compensation.baseSalary.toLocaleString()}) + {compensation.demandBonusPercentage}% Bonus (LKR {compensation.exampleBonus.toLocaleString()}) = Total LKR {compensation.exampleTotal.toLocaleString()}/month for high-demand employees.
                  </p>
                </div>
              </div>

              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Update Compensation Policy
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminDashboardLayout>
  )
}