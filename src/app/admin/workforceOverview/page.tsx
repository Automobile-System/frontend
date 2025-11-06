"use client"

import { useEffect, useState, useCallback } from "react"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  UserPlus,
  Edit,
  Lock,
  CheckCircle
} from "lucide-react"
import {
  fetchWorkforceOverview,
  fetchTopEmployees,
  fetchManagerPerformance,
  fetchAllManagers,
  fetchAllEmployees,
  addManager,
  addEmployee,
  freezeManager as freezeManagerApi,
  freezeEmployee as freezeEmployeeApi,
  activateEmployee as activateEmployeeApi,
  type WorkforceOverview,
  type TopEmployee,
  type ManagerPerformance,
  type Manager,
  type Employee,
  type AddManagerRequest,
  type AddEmployeeRequest,
} from "@/services/adminService"
import { AddManagerModal, AddEmployeeModal } from "@/components/modals/WorkforceModals"
import { showToast } from "@/lib/toast"

export default function WorkforceOverviewPage() {
  const [workforceData, setWorkforceData] = useState<WorkforceOverview | null>(null)
  const [topEmployees, setTopEmployees] = useState<TopEmployee[]>([])
  const [managerPerformance, setManagerPerformance] = useState<ManagerPerformance[]>([])
  const [managers, setManagers] = useState<Manager[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddManagerModal, setShowAddManagerModal] = useState(false)
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false)

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true)
      const [overviewData, topEmps, managerPerf, managersData, employeesData] = await Promise.all([
        fetchWorkforceOverview(),
        fetchTopEmployees(),
        fetchManagerPerformance(),
        fetchAllManagers(),
        fetchAllEmployees()
      ])
      
      setWorkforceData(overviewData)
      setTopEmployees(topEmps)
      setManagerPerformance(managerPerf)
      setManagers(managersData)
      setEmployees(employeesData)
    } catch (error) {
      console.error('Error loading workforce data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAllData()
  }, [loadAllData])

  const handleAddManager = () => {
    setShowAddManagerModal(true)
  }

  const handleAddEmployee = () => {
    setShowAddEmployeeModal(true)
  }

  const handleSubmitAddManager = async (data: AddManagerRequest) => {
    try {
      const result = await addManager(data)
      setManagers([...managers, result.manager])
      setShowAddManagerModal(false)
      showToast.success('Manager Added', result.message)
      await loadAllData() // Reload all data
    } catch (error) {
      showToast.error('Error', 'Failed to add manager. Please try again.')
      console.error('Error adding manager:', error)
    }
  }

  const handleSubmitAddEmployee = async (data: AddEmployeeRequest) => {
    try {
      const result = await addEmployee(data)
      setEmployees([...employees, result.employee])
      setShowAddEmployeeModal(false)
      showToast.success('Employee Added', result.message)
      await loadAllData() // Reload all data
    } catch (error) {
      showToast.error('Error', 'Failed to add employee. Please try again.')
      console.error('Error adding employee:', error)
    }
  }

  const handleEditManager = (managerId: string) => {
    showToast.info('Edit Manager', `Opening edit form for Manager ${managerId}...`)
    // TODO: Open edit manager modal with prefilled data
  }

  const handleFreezeManager = async (managerId: string) => {
    if (window.confirm(`Are you sure you want to freeze Manager ${managerId}?\n\nThis will:\n- Revoke their access to the system\n- Prevent them from assigning tasks\n- Require admin approval to reactivate\n\nProceed?`)) {
      try {
        const result = await freezeManagerApi(managerId)
        showToast.success('Manager Frozen', result.message)
        await loadAllData() // Reload all data
      } catch (error) {
        showToast.error('Error', 'Failed to freeze manager. Please try again.')
        console.error('Error freezing manager:', error)
      }
    }
  }

  const handleEditEmployee = (employeeId: string) => {
    showToast.info('Edit Employee', `Opening edit form for Employee ${employeeId}...`)
    // TODO: Open edit employee modal with prefilled data
  }

  const handleFreezeEmployee = async (employeeId: string) => {
    if (window.confirm(`Are you sure you want to freeze Employee ${employeeId}?\n\nThis will:\n- Revoke their access to the system\n- Remove them from active task assignments\n- Require admin approval to reactivate\n\nProceed?`)) {
      try {
        const result = await freezeEmployeeApi(employeeId)
        showToast.success('Employee Frozen', result.message)
        await loadAllData() // Reload all data
      } catch (error) {
        showToast.error('Error', 'Failed to freeze employee. Please try again.')
        console.error('Error freezing employee:', error)
      }
    }
  }

  const handleActivateEmployee = async (employeeId: string) => {
    if (window.confirm(`Activate Employee ${employeeId} and return them to active duty?`)) {
      try {
        const result = await activateEmployeeApi(employeeId)
        showToast.success('Employee Activated', result.message)
        await loadAllData() // Reload all data
      } catch (error) {
        showToast.error('Error', 'Failed to activate employee. Please try again.')
        console.error('Error activating employee:', error)
      }
    }
  }

  const handleViewManagerDetails = (managerId: string) => {
    console.log('View manager details:', managerId)
    // TODO: Navigate to manager details page
  }

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return "🥇"
      case 2: return "🥈"
      case 3: return "🥉"
      default: return rank.toString()
    }
  }

  if (loading || !workforceData) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto"></div>
            <p className="mt-4 font-roboto text-[#020079]/70">Loading workforce data...</p>
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
            Workforce Overview
          </h1>
          <p className="font-roboto text-[#020079]/70">Manage employees, track performance, and optimize workload</p>
        </div>

        

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Total Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {workforceData.stats.totalEmployees}
              </div>
              <p className="text-sm font-roboto text-[#020079]/70">
                {workforceData.stats.activeEmployees} Active | {workforceData.stats.onLeave} Leave | {workforceData.stats.frozen} Frozen
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#020079]/20 hover:border-[#FFD700]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Avg Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {workforceData.stats.avgRating}
              </div>
              <p className="text-sm font-roboto text-[#020079]">
                {workforceData.stats.ratingChange} from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Avg Workload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {workforceData.stats.avgWorkload}
              </div>
              <p className="text-sm font-roboto text-[#020079]/70">Tasks per employee</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#020079]/20 hover:border-[#FFD700]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Avg Salary + Bonus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {workforceData.stats.avgSalary}
              </div>
              <p className="text-sm font-roboto text-[#020079]/70">Base + Demand Bonus</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Employee Rankings */}
        <Card className="mb-8 bg-white border-[#020079]/20">
          <CardHeader className="bg-[#020079] border-b border-[#020079]">
            <CardTitle className="text-xl font-bebas text-white">
              Top Employee Rankings by Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {topEmployees.map((employee, index) => (
                <div 
                  key={employee.id}
                  className="flex items-center gap-4 p-4 border border-[#020079]/10 rounded-lg hover:border-[#020079]/30 transition-colors bg-white"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#020079]/5 border border-[#020079]/20 rounded-full font-bebas text-2xl text-[#020079]">
                    {getRankIcon(index + 1)}
                  </div>
                  <div className="flex-1">
                    <div className="font-roboto font-semibold text-[#020079]">{employee.name}</div>
                    <div className="text-sm font-roboto text-[#020079]/60">{employee.specialization}</div>
                  </div>
                  <div className="flex items-center gap-1 text-[#020079] font-roboto font-medium">
                    <span className="text-xl">{employee.rating}</span>
                  </div>
                  {employee.rewardEligible && (
                    <Badge className="bg-[#FFD700]/20 text-[#020079] hover:bg-[#FFD700]/30 border-0 font-roboto">
                      Reward Eligible
                    </Badge>
                  )}
                  {employee.overloaded && (
                    <Badge className="bg-[#020079]/10 text-[#020079] hover:bg-[#020079]/20 border-0 font-roboto">
                      OVERLOADED
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Reward Suggestions */}
        <Card className="mb-8 bg-white border-[#FFD700]/40">
          <CardHeader className="bg-[#FFD700] border-b border-[#FFD700]">
            <CardTitle className="text-xl font-bebas text-[#020079]">
              AI Reward Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="border-l-4 border-[#FFD700] bg-white p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <div>
                  <p className="font-roboto font-semibold text-[#020079] mb-1">Performance Bonus</p>
                  <p className="text-sm font-roboto text-[#020079]/70">
                    Nimal Fernando completed 12 tasks this month with 100% customer satisfaction. Suggest LKR 15,000 bonus.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-[#FFD700] bg-white p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <div>
                  <p className="font-roboto font-semibold text-[#020079] mb-1">Consistency Award</p>
                  <p className="text-sm font-roboto text-[#020079]/70">
                    Ruwan Silva maintained 4.8+ rating for 6 consecutive months. Consider promotion or salary increase.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-[#FFD700] bg-white p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <div>
                  <p className="font-roboto font-semibold text-[#020079] mb-1">High-Demand Bonus</p>
                  <p className="text-sm font-roboto text-[#020079]/70">
                    Electrical specialists handled 35% more workload. Recommend demand-based bonus for Kamal Perera.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manager Performance Summary */}
        <Card className="mb-8 bg-white border-[#020079]/20">
          <CardHeader className="bg-[#020079] border-b border-[#020079]">
            <CardTitle className="text-xl font-bebas text-white">
              Manager Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#020079] border-b-2 border-[#020079]">
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Manager Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Tasks Assigned
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Completion Rate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Avg Employee Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#020079]/10">
                  {managerPerformance.map((manager) => (
                    <tr key={manager.id} className="hover:bg-[#020079]/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-roboto font-semibold text-[#020079]">{manager.name}</span>
                      </td>
                      <td className="px-6 py-4 font-roboto text-[#020079]/70">
                        {manager.tasksAssigned} tasks
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-roboto font-semibold ${
                          manager.completionRate >= 90 ? 'text-[#020079]' : 
                          manager.completionRate >= 80 ? 'text-[#020079]' : 
                          'text-[#020079]/60'
                        }`}>
                          {manager.completionRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-roboto text-[#020079] font-semibold">
                          {manager.avgEmployeeRating}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="secondary"
                          className={
                            manager.status === 'Active' 
                              ? "bg-[#FFD700]/20 text-[#020079] hover:bg-[#FFD700]/30 border-0 font-roboto"
                              : "bg-[#020079]/10 text-[#020079] hover:bg-[#020079]/20 border-0 font-roboto"
                          }
                        >
                          {manager.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {manager.status === 'Under Review' ? (
                          <Button
                            onClick={() => handleViewManagerDetails(manager.id)}
                            size="sm"
                            className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                          >
                            Review Performance
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleViewManagerDetails(manager.id)}
                            size="sm"
                            className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                          >
                            View Details
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Manage All Managers */}
        <Card className="mb-8 bg-white border-[#020079]/20">
          <CardHeader className="bg-[#020079] border-b border-[#020079]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bebas text-white">
                Manage All Managers
              </CardTitle>
              <Button
                onClick={handleAddManager}
                className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Manager
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="border-l-4 border-[#020079] bg-white p-4 mb-6 rounded-r-lg">
              <p className="text-sm font-roboto text-[#020079]/70">
                <strong className="text-[#020079]">Center Requirement:</strong> At least 1 manager is required for the service center. 
                Currently: {managers.filter(m => m.status === 'Active').length} active managers.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#020079] border-b-2 border-[#020079]">
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Manager ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Join Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#020079]/10">
                  {managers.map((manager) => (
                    <tr key={manager.id} className="hover:bg-[#020079]/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-roboto font-semibold text-[#020079]">{manager.id}</span>
                      </td>
                      <td className="px-6 py-4 font-roboto text-[#020079]/70">{manager.name}</td>
                      <td className="px-6 py-4 font-roboto text-[#020079]/60">{manager.email}</td>
                      <td className="px-6 py-4 font-roboto text-[#020079]/60">{manager.phone}</td>
                      <td className="px-6 py-4 font-roboto text-[#020079]/60">{manager.joinDate}</td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="secondary"
                          className={
                            manager.status === 'Active' 
                              ? "bg-[#FFD700]/20 text-[#020079] hover:bg-[#FFD700]/30 border-0 font-roboto"
                              : "bg-[#020079]/10 text-[#020079] hover:bg-[#020079]/20 border-0 font-roboto"
                          }
                        >
                          {manager.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditManager(manager.id)}
                            size="sm"
                            variant="outline"
                            className="border-[#020079]/30 text-[#020079] hover:bg-[#020079]/5 font-roboto"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleFreezeManager(manager.id)}
                            size="sm"
                            className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                          >
                            <Lock className="w-3 h-3 mr-1" />
                            Freeze
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Manage All Employees */}
        <Card className="mb-8 bg-white border-[#020079]/20">
          <CardHeader className="bg-[#020079] border-b border-[#020079]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bebas text-white">
                Manage All Employees
              </CardTitle>
              <Button
                onClick={handleAddEmployee}
                className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Employee
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="border-l-4 border-[#020079] bg-white p-4 mb-6 rounded-r-lg">
              <p className="text-sm font-roboto text-[#020079]/70">
                <strong className="text-[#020079]">Center Requirement:</strong> Multiple employees required for operations. 
                Currently: {workforceData.stats.totalEmployees} total employees 
                ({workforceData.stats.activeEmployees} active, {workforceData.stats.onLeave} on leave, {workforceData.stats.frozen} frozen).
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#020079] border-b-2 border-[#020079]">
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Employee ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Specialization
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#020079]/10">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-[#020079]/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-roboto font-semibold text-[#020079]">{employee.id}</span>
                      </td>
                      <td className="px-6 py-4 font-roboto text-[#020079]/70">{employee.name}</td>
                      <td className="px-6 py-4 font-roboto text-[#020079]/60">{employee.specialization}</td>
                      <td className="px-6 py-4 font-roboto text-[#020079]/60">{employee.email}</td>
                      <td className="px-6 py-4 font-roboto text-[#020079]/60">{employee.phone}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-roboto text-[#020079] font-semibold">
                          {employee.rating}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="secondary"
                          className={
                            employee.status === 'Active' 
                              ? "bg-[#FFD700]/20 text-[#020079] hover:bg-[#FFD700]/30 border-0 font-roboto"
                              : employee.status === 'On Leave'
                              ? "bg-[#020079]/10 text-[#020079] hover:bg-[#020079]/20 border-0 font-roboto"
                              : "bg-[#020079]/10 text-[#020079]/70 hover:bg-[#020079]/20 border-0 font-roboto"
                          }
                        >
                          {employee.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditEmployee(employee.id)}
                            size="sm"
                            variant="outline"
                            className="border-[#020079]/30 text-[#020079] hover:bg-[#020079]/5 font-roboto"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          {employee.status === 'On Leave' ? (
                            <Button
                              onClick={() => handleActivateEmployee(employee.id)}
                              size="sm"
                              className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Activate
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleFreezeEmployee(employee.id)}
                              size="sm"
                              className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                            >
                              <Lock className="w-3 h-3 mr-1" />
                              Freeze
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddManagerModal
        isOpen={showAddManagerModal}
        onClose={() => setShowAddManagerModal(false)}
        onSubmit={handleSubmitAddManager}
      />
      <AddEmployeeModal
        isOpen={showAddEmployeeModal}
        onClose={() => setShowAddEmployeeModal(false)}
        onSubmit={handleSubmitAddEmployee}
      />
    </AdminDashboardLayout>
  )
}
