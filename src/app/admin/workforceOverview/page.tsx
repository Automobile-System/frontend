"use client"

import { useEffect, useState, useCallback } from "react"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Building2, 
  AlertTriangle,
  Star,
  Briefcase,
  DollarSign,
  Award,
  TrendingUp,
  UserPlus,
  Edit,
  Lock,
  CheckCircle,
  Shield,
  Target,
  Rocket
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading workforce data...</p>
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
            Workforce Overview
          </h1>
          <p className="text-slate-600">Manage employees, track performance, and optimize workload</p>
        </div>

        

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Total Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-800 mb-2">
                {workforceData.stats.totalEmployees}
              </div>
              <p className="text-sm text-slate-600">
                {workforceData.stats.activeEmployees} Active | {workforceData.stats.onLeave} Leave | {workforceData.stats.frozen} Frozen
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-600" />
                Avg Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-800 mb-2">
                {workforceData.stats.avgRating}
              </div>
              <p className="text-sm text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {workforceData.stats.ratingChange} from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600" />
                Avg Workload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-800 mb-2">
                {workforceData.stats.avgWorkload}
              </div>
              <p className="text-sm text-slate-600">Tasks per employee</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-600 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Avg Salary + Bonus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-800 mb-2">
                {workforceData.stats.avgSalary}
              </div>
              <p className="text-sm text-slate-600">Base + Demand Bonus</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Employee Rankings */}
        <Card className="mb-8 bg-white shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Top Employee Rankings by Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {topEmployees.map((employee, index) => (
                <div 
                  key={employee.id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm font-bold text-lg text-slate-700">
                    {getRankIcon(index + 1)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">{employee.name}</div>
                    <div className="text-sm text-slate-600">{employee.specialization}</div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 font-medium">
                    <Star className="w-4 h-4 fill-amber-600" />
                    <span>{employee.rating}</span>
                  </div>
                  {employee.rewardEligible && (
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                      <Award className="w-3 h-3 mr-1" />
                      Reward Eligible
                    </Badge>
                  )}
                  {employee.overloaded && (
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      OVERLOADED
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Reward Suggestions */}
        <Card className="mb-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="w-5 h-5" />
              AI Reward Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Performance Bonus</p>
                  <p className="text-sm text-white/90">
                    Nimal Fernando completed 12 tasks this month with 100% customer satisfaction. Suggest LKR 15,000 bonus.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Consistency Award</p>
                  <p className="text-sm text-white/90">
                    Ruwan Silva maintained 4.8+ rating for 6 consecutive months. Consider promotion or salary increase.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Rocket className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">High-Demand Bonus</p>
                  <p className="text-sm text-white/90">
                    Electrical specialists handled 35% more workload. Recommend demand-based bonus for Kamal Perera.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manager Performance Summary */}
        <Card className="mb-8 bg-white shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Manager Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Manager Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Tasks Assigned
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Completion Rate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Avg Employee Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {managerPerformance.map((manager) => (
                    <tr key={manager.id} className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-800">{manager.name}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {manager.tasksAssigned} tasks
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          manager.completionRate >= 90 ? 'text-emerald-600' : 
                          manager.completionRate >= 80 ? 'text-amber-600' : 
                          'text-rose-600'
                        }`}>
                          {manager.completionRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-slate-700">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          {manager.avgEmployeeRating}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="secondary"
                          className={
                            manager.status === 'Active' 
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
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
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                          >
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Review Performance
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleViewManagerDetails(manager.id)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
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
        <Card className="mb-8 bg-white shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Manage All Managers
              </CardTitle>
              <Button
                onClick={handleAddManager}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Manager
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">
                <strong>Center Requirement:</strong> At least 1 manager is required for the service center. 
                Currently: {managers.filter(m => m.status === 'Active').length} active managers.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Manager ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Join Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {managers.map((manager) => (
                    <tr key={manager.id} className="hover:bg-purple-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-800">{manager.id}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{manager.name}</td>
                      <td className="px-6 py-4 text-slate-600">{manager.email}</td>
                      <td className="px-6 py-4 text-slate-600">{manager.phone}</td>
                      <td className="px-6 py-4 text-slate-600">{manager.joinDate}</td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="secondary"
                          className={
                            manager.status === 'Active' 
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
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
                            className="border-slate-300 text-slate-700 hover:bg-slate-50"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleFreezeManager(manager.id)}
                            size="sm"
                            className="bg-slate-600 hover:bg-slate-700 text-white"
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
        <Card className="mb-8 bg-white shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-600" />
                Manage All Employees
              </CardTitle>
              <Button
                onClick={handleAddEmployee}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Employee
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">
                <strong>Center Requirement:</strong> Multiple employees required for operations. 
                Currently: {workforceData.stats.totalEmployees} total employees 
                ({workforceData.stats.activeEmployees} active, {workforceData.stats.onLeave} on leave, {workforceData.stats.frozen} frozen).
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Employee ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Specialization
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-cyan-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-800">{employee.id}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{employee.name}</td>
                      <td className="px-6 py-4 text-slate-600">{employee.specialization}</td>
                      <td className="px-6 py-4 text-slate-600">{employee.email}</td>
                      <td className="px-6 py-4 text-slate-600">{employee.phone}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-slate-700">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          {employee.rating}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          variant="secondary"
                          className={
                            employee.status === 'Active' 
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                              : employee.status === 'On Leave'
                              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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
                            className="border-slate-300 text-slate-700 hover:bg-slate-50"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          {employee.status === 'On Leave' ? (
                            <Button
                              onClick={() => handleActivateEmployee(employee.id)}
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Activate
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleFreezeEmployee(employee.id)}
                              size="sm"
                              className="bg-slate-600 hover:bg-slate-700 text-white"
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
