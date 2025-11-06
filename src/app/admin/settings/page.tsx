"use client"

import { useEffect, useState } from "react"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, CheckCircle2 } from "lucide-react"
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079]"></div>
          <span className="ml-3 font-roboto text-[#020079]/70">Loading settings...</span>
        </div>
      </AdminDashboardLayout>
    )
  }

  if (error) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <span className="font-roboto text-[#020079]">{error}</span>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminDashboardLayout>
      <div className="p-8 space-y-6 bg-white min-h-screen">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bebas text-[#020079]">Settings & Configuration</h1>
          <p className="font-roboto text-[#020079]/70">Manage roles, services, limits, and compensation policies</p>
        </div>

        {/* Roles & Permissions */}
        <Card className="border-[#020079]/20">
          <CardHeader className="border-b border-[#020079]/20">
            <CardTitle className="font-bebas text-xl text-[#020079]">
              Manage Roles & Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#020079]/20">
                    <th className="text-left py-3 px-4 font-roboto text-[#020079] font-semibold">Role</th>
                    <th className="text-left py-3 px-4 font-roboto text-[#020079] font-semibold">Users</th>
                    <th className="text-left py-3 px-4 font-roboto text-[#020079] font-semibold">Permissions</th>
                    <th className="text-left py-3 px-4 font-roboto text-[#020079] font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-roboto text-[#020079] font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 font-roboto text-[#020079]/60">
                        No roles configured.
                      </td>
                    </tr>
                  ) : (
                    roles.map((role) => (
                      <tr key={role.roleId} className="border-b border-[#020079]/10 hover:bg-[#020079]/5">
                        <td className="py-3 px-4 font-roboto text-[#020079] font-semibold">{role.roleName}</td>
                        <td className="py-3 px-4 font-roboto text-[#020079]">{role.userCount}</td>
                        <td className="py-3 px-4 font-roboto text-[#020079]/60 text-sm">{role.permissions}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-[#FFD700]/20 text-[#020079] border-[#FFD700]/30">
                            {role.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto">
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
        <Card className="border-[#020079]/20">
          <CardHeader className="border-b border-[#020079]/20">
            <CardTitle className="font-bebas text-xl text-[#020079]">
              Manage Services & Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#020079]/20">
                    <th className="text-left py-3 px-4 font-roboto text-[#020079] font-semibold">Service Name</th>
                    <th className="text-left py-3 px-4 font-roboto text-[#020079] font-semibold">Base Price (LKR)</th>
                    <th className="text-left py-3 px-4 font-roboto text-[#020079] font-semibold">Duration</th>
                    <th className="text-left py-3 px-4 font-roboto text-[#020079] font-semibold">Required Skill</th>
                    <th className="text-left py-3 px-4 font-roboto text-[#020079] font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-roboto text-[#020079] font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 font-roboto text-[#020079]/60">
                        No services configured.
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <tr key={service.serviceId} className="border-b border-[#020079]/10 hover:bg-[#020079]/5">
                        <td className="py-3 px-4 font-roboto text-[#020079] font-semibold">{service.serviceName}</td>
                        <td className="py-3 px-4 font-roboto text-[#020079]">{service.basePrice.toLocaleString()}</td>
                        <td className="py-3 px-4 font-roboto text-[#020079]">{service.duration} mins</td>
                        <td className="py-3 px-4 font-roboto text-[#020079]/60 text-sm">{service.requiredSkill}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${
                            service.status === "Active" 
                              ? "bg-[#FFD700]/20 text-[#020079] border-[#FFD700]/30" 
                              : "bg-[#020079]/10 text-[#020079]/60 border-[#020079]/20"
                          }`}>
                            {service.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" className="bg-[#020079]/20 hover:bg-[#020079]/30 text-[#020079] font-roboto">
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
            <Button className="mt-4 bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold">
              <Plus className="w-4 h-4 mr-1" />
              Add New Service
            </Button>
          </CardContent>
        </Card>

        {/* Employee Task Limits */}
        {taskLimits && (
          <Card className="border-[#020079]/20">
            <CardHeader className="border-b border-[#020079]/20">
              <CardTitle className="font-bebas text-xl text-[#020079]">
                Employee Task Limits
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-roboto text-[#020079] font-semibold">Maximum Tasks Per Employee Per Day:</Label>
                  <Input 
                    type="number" 
                    value={taskLimits.maxTasksPerDay} 
                    onChange={() => {}}
                    className="border-[#020079]/20 font-roboto"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-roboto text-[#020079] font-semibold">Overload Warning Threshold:</Label>
                  <Input 
                    type="number" 
                    value={taskLimits.overloadThreshold}
                    onChange={() => {}}
                    className="border-[#020079]/20 font-roboto"
                  />
                </div>
              </div>
              <Button className="mt-6 bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Compensation Rules */}
        {compensation && (
          <Card className="border-[#020079]/20">
            <CardHeader className="border-b border-[#020079]/20">
              <CardTitle className="font-bebas text-xl text-[#020079]">
                Compensation Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label className="font-roboto text-[#020079] font-semibold">Base Salary (LKR/month):</Label>
                  <Input 
                    type="number" 
                    value={compensation.baseSalary}
                    onChange={() => {}}
                    className="border-[#020079]/20 font-roboto"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-roboto text-[#020079] font-semibold">Demand-Based Bonus (% of base):</Label>
                  <Input 
                    type="number" 
                    value={compensation.demandBonusPercentage}
                    onChange={() => {}}
                    className="border-[#020079]/20 font-roboto"
                  />
                </div>
              </div>
              
              <div className="bg-[#FFD700]/10 border-l-4 border-[#FFD700] p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#020079]" />
                  <p className="font-roboto text-[#020079]">
                    <span className="font-semibold">Example Calculation:</span> Base (LKR {compensation.baseSalary.toLocaleString()}) + {compensation.demandBonusPercentage}% Bonus (LKR {compensation.exampleBonus.toLocaleString()}) = Total LKR {compensation.exampleTotal.toLocaleString()}/month for high-demand employees.
                  </p>
                </div>
              </div>

              <Button className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold">
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