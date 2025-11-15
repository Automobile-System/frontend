"use client";

import { useEffect, useState, useCallback } from "react";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Edit, Lock, CheckCircle, Loader, Trash2 } from "lucide-react";
import {
  fetchWorkforceOverview,
  fetchTopEmployees,
  fetchAllManagers,
  fetchAllEmployees,
  addManager,
  addEmployee,
  updateManager,
  updateEmployee,
  freezeManager as freezeManagerApi,
  freezeEmployee as freezeEmployeeApi,
  activateEmployee as activateEmployeeApi,
  activateManager as activateManagerApi,
  deleteManager as deleteManagerApi,
  deleteEmployee as deleteEmployeeApi,
  type WorkforceOverview,
  type TopEmployee,
  type Manager,
  type Employee,
  type AddManagerRequest,
  type AddEmployeeRequest,
} from "@/services/adminService";
import {
  AddManagerModal,
  AddEmployeeModal,
  EditManagerModal,
  EditEmployeeModal,
} from "@/components/modals/WorkforceModals";
import { showToast } from "@/lib/toast";

export default function WorkforceOverviewPage() {
  const [workforceData, setWorkforceData] = useState<WorkforceOverview | null>(
    null
  );
  const [topEmployees, setTopEmployees] = useState<TopEmployee[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingManagers, setLoadingManagers] = useState(false);
  const [managersError, setManagersError] = useState<string | null>(null);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [employeesError, setEmployeesError] = useState<string | null>(null);
  const [loadingTopEmployees, setLoadingTopEmployees] = useState(false);
  const [topEmployeesError, setTopEmployeesError] = useState<string | null>(
    null
  );
  const [showAddManagerModal, setShowAddManagerModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditManagerModal, setShowEditManagerModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      setLoadingManagers(true);
      setLoadingEmployees(true);
      setLoadingTopEmployees(true);
      setManagersError(null);
      setEmployeesError(null);
      setTopEmployeesError(null);

      const [overviewData, topEmps, managersData, employeesData] =
        await Promise.all([
          fetchWorkforceOverview().catch((err) => {
            console.error("Error loading workforce overview:", err);
            return {
              stats: {
                totalEmployees: 0,
                activeEmployees: 0,
                onLeave: 0,
                frozen: 0,
                avgRating: 0,
                ratingChange: 0,
                avgWorkload: 0,
                avgSalary: "0K",
              },
              centerInfo: {
                totalCenters: 0,
                activeManagers: 0,
                minimumManagers: 0,
                totalEmployees: 0,
              },
            };
          }),
          fetchTopEmployees().catch((err) => {
            setTopEmployeesError(
              err?.message || "Failed to load top employees"
            );
            return [] as TopEmployee[];
          }),
          fetchAllManagers().catch((err) => {
            setManagersError(err?.message || "Failed to load managers");
            return [] as Manager[];
          }),
          fetchAllEmployees().catch((err) => {
            setEmployeesError(err?.message || "Failed to load employees");
            return [] as Employee[];
          }),
        ]);

      setWorkforceData(overviewData);
      setTopEmployees(topEmps);
      setManagers(managersData);
      setEmployees(employeesData);
    } catch (error) {
      console.error("Error loading workforce data:", error);
    } finally {
      setLoading(false);
      setLoadingManagers(false);
      setLoadingEmployees(false);
      setLoadingTopEmployees(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const handleAddManager = () => {
    setShowAddManagerModal(true);
  };

  const handleAddEmployee = () => {
    setShowAddEmployeeModal(true);
  };

  const handleSubmitAddManager = async (data: AddManagerRequest) => {
    try {
      const result = await addManager(data);
      setManagers([...managers, result.manager]);
      setShowAddManagerModal(false);
      showToast.success("Manager Added", result.message);
      await loadAllData(); // Reload all data
    } catch (error) {
      showToast.error("Error", "Failed to add manager. Please try again.");
      console.error("Error adding manager:", error);
    }
  };

  const handleSubmitAddEmployee = async (data: AddEmployeeRequest) => {
    try {
      const result = await addEmployee(data);
      setEmployees([...employees, result.employee]);
      setShowAddEmployeeModal(false);
      showToast.success("Employee Added", result.message);
      await loadAllData(); // Reload all data
    } catch (error) {
      showToast.error("Error", "Failed to add employee. Please try again.");
      console.error("Error adding employee:", error);
    }
  };

  const handleEditManager = (managerId: string) => {
    const manager = managers.find(m => m.id === managerId);
    if (manager) {
      setSelectedManager(manager);
      setShowEditManagerModal(true);
    }
  };

  const handleSubmitEditManager = async (data: Partial<AddManagerRequest>) => {
    if (!selectedManager) return;
    
    try {
      const result = await updateManager(selectedManager.id, data);
      showToast.success("Manager Updated", result.message);
      setShowEditManagerModal(false);
      setSelectedManager(null);
      await loadAllData(); // Reload all data
    } catch (error) {
      showToast.error("Error", "Failed to update manager. Please try again.");
      console.error("Error updating manager:", error);
    }
  };

  const handleFreezeManager = async (managerId: string) => {
    try {
      const result = await freezeManagerApi(managerId);
      showToast.success("Manager Deactivated", result.message);
      await loadAllData(); // Reload all data
    } catch (error) {
      showToast.error("Error", "Failed to deactivate manager. Please try again.");
      console.error("Error deactivating manager:", error);
    }
  };

  const handleActivateManager = async (managerId: string) => {
    try {
      const result = await activateManagerApi(managerId);
      showToast.success("Manager Activated", result.message);
      await loadAllData(); // Reload all data
    } catch (error) {
      showToast.error(
        "Error",
        "Failed to activate manager. Please try again."
      );
      console.error("Error activating manager:", error);
    }
  };

  const handleEditEmployee = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      setShowEditEmployeeModal(true);
    }
  };

  const handleSubmitEditEmployee = async (data: Partial<AddEmployeeRequest>) => {
    if (!selectedEmployee) return;
    
    try {
      const result = await updateEmployee(selectedEmployee.id, data);
      showToast.success("Employee Updated", result.message);
      setShowEditEmployeeModal(false);
      setSelectedEmployee(null);
      await loadAllData(); // Reload all data
    } catch (error) {
      showToast.error("Error", "Failed to update employee. Please try again.");
      console.error("Error updating employee:", error);
    }
  };

  const handleFreezeEmployee = async (employeeId: string) => {
    try {
      const result = await freezeEmployeeApi(employeeId);
      showToast.success("Employee Deactivated", result.message);
      await loadAllData(); // Reload all data
    } catch (error) {
      showToast.error(
        "Error",
        "Failed to deactivate employee. Please try again."
      );
      console.error("Error deactivating employee:", error);
    }
  };

  const handleActivateEmployee = async (employeeId: string) => {
    try {
      const result = await activateEmployeeApi(employeeId);
      showToast.success("Employee Activated", result.message);
      await loadAllData(); // Reload all data
    } catch (error) {
      showToast.error(
        "Error",
        "Failed to activate employee. Please try again."
      );
      console.error("Error activating employee:", error);
    }
  };

  const handleDeleteManager = async (managerId: string) => {
    if (!confirm("Are you sure you want to permanently delete this manager? This action cannot be undone.")) {
      return;
    }
    
    try {
      const result = await deleteManagerApi(managerId);
      showToast.success("Manager Deleted", result.message);
      await loadAllData(); // Reload all data
    } catch (error) {
      showToast.error("Error", "Failed to delete manager. Please try again.");
      console.error("Error deleting manager:", error);
    }
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    if (!confirm("Are you sure you want to permanently delete this employee? This action cannot be undone.")) {
      return;
    }
    
    try {
      const result = await deleteEmployeeApi(employeeId);
      showToast.success("Employee Deleted", result.message);
      await loadAllData(); // Reload all data
    } catch (error) {
      showToast.error("Error", "Failed to delete employee. Please try again.");
      console.error("Error deleting employee:", error);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank.toString();
    }
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto"></div>
            <p className="mt-4 font-roboto text-[#020079]/70">
              Loading workforce data...
            </p>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bebas text-[#020079] mb-2">
            Workforce Overview
          </h1>
          <p className="font-roboto text-[#020079]/70">
            Manage employees, track performance, and optimize workload
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Total Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {workforceData?.stats?.totalEmployees || 0}
              </div>
              <p className="text-sm font-roboto text-[#020079]/70">
                {workforceData?.stats?.activeEmployees || 0} Active |{" "}
                {workforceData?.stats?.frozen || 0} Deactivated
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Total Managers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {managers.length}
              </div>
              <p className="text-sm font-roboto text-[#020079]/70">
                {managers.filter(m => m.status === 'Active').length} Active |{" "}
                {managers.filter(m => m.status === 'Deactivated').length} Deactivated
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Total Employees Only
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {employees.length}
              </div>
              <p className="text-sm font-roboto text-[#020079]/70">
                {employees.filter(e => e.status === 'Active').length} Active |{" "}
                {employees.filter(e => e.status === 'Deactivated').length} Deactivated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Employee Rankings */}
        <Card className="mb-8 bg-white border-[#020079]/20">
          <CardHeader className="border-b border-[#020079]/20">
            <CardTitle className="text-xl font-bebas text-[#020079]">
              Top Employee Rankings by Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {loadingTopEmployees && (
              <div className="flex items-center justify-center gap-2 py-8">
                <Loader className="w-5 h-5 animate-spin text-[#020079]" />
                <span className="font-roboto text-[#020079]">
                  Loading top employees…
                </span>
              </div>
            )}
            {!loadingTopEmployees && topEmployeesError && (
              <div className="py-8 text-center">
                <p className="font-roboto text-red-600">{topEmployeesError}</p>
              </div>
            )}
            {!loadingTopEmployees &&
              !topEmployeesError &&
              topEmployees.length === 0 && (
                <div className="py-8 text-center">
                  <p className="font-roboto text-[#020079]/60">
                    No top employees data available.
                  </p>
                </div>
              )}
            {!loadingTopEmployees &&
              !topEmployeesError &&
              topEmployees.filter(e => e.rating > 4.5).length > 0 && (
                <div className="space-y-4">
                  {topEmployees.filter(e => e.rating > 4.5).map((employee, index) => (
                    <div
                      key={employee.id}
                      className="flex items-center gap-4 p-4 border border-[#020079]/10 rounded-lg hover:border-[#020079]/30 transition-colors bg-white"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-[#020079]/5 border border-[#020079]/20 rounded-full font-bebas text-2xl text-[#020079]">
                        {getRankIcon(index + 1)}
                      </div>
                      <div className="flex-1">
                        <div className="font-roboto font-semibold text-[#020079]">
                          {employee.name}
                        </div>
                        <div className="text-sm font-roboto text-[#020079]/60">
                          {employee.specialization}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[#020079] font-roboto font-medium">
                        <span className="text-xl">{employee.rating}</span>
                      </div>
                      {employee.overloaded && (
                        <Badge className="bg-[#020079]/10 text-[#020079] hover:bg-[#020079]/20 border-0 font-roboto">
                          OVERLOADED
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
          </CardContent>
        </Card>

        

        {/* Manage All Managers */}
        <Card className="mb-8 bg-white border-[#020079]/20">
          <CardHeader className="border-b border-[#020079]/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bebas text-[#020079]">
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
                <strong className="text-[#020079]">Center Requirement:</strong>{" "}
                At least 1 manager is required for the service center.
                Currently:{" "}
                {managers.filter((m) => m.status === "Active").length} active
                managers.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#020079]/20">
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Manager ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Join Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#020079]/10">
                  {loadingManagers && (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Loader className="w-5 h-5 animate-spin text-[#020079]" />
                          <span className="font-roboto text-[#020079]">
                            Loading managers…
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!loadingManagers && managersError && (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center">
                        <p className="font-roboto text-red-600">
                          {managersError}
                        </p>
                      </td>
                    </tr>
                  )}
                  {!loadingManagers &&
                    !managersError &&
                    managers.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center">
                          <p className="font-roboto text-[#020079]/60">
                            No managers found.
                          </p>
                        </td>
                      </tr>
                    )}
                  {!loadingManagers &&
                    !managersError &&
                    managers.map((manager) => (
                      <tr
                        key={manager.id}
                        className="hover:bg-[#020079]/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-roboto font-semibold text-[#020079]">
                            {manager.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-roboto text-[#020079]/70">
                          {manager.name}
                        </td>
                        <td className="px-6 py-4 font-roboto text-[#020079]/60">
                          {manager.email}
                        </td>
                        <td className="px-6 py-4 font-roboto text-[#020079]/60">
                          {manager.phone}
                        </td>
                        <td className="px-6 py-4 font-roboto text-[#020079]/60">
                          {manager.joinDate}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="secondary"
                            className={
                              manager.status === "Active"
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
                            {manager.status === "Deactivated" ? (
                              <Button
                                onClick={() =>
                                  handleActivateManager(manager.id)
                                }
                                size="sm"
                                className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Activate
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handleFreezeManager(manager.id)}
                                size="sm"
                                className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                              >
                                <Lock className="w-3 h-3 mr-1" />
                                Deactivate
                              </Button>
                            )}
                            <Button
                              onClick={() => handleDeleteManager(manager.id)}
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-600 hover:bg-red-50 font-roboto"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
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
          <CardHeader className="border-b border-[#020079]/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bebas text-[#020079]">
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
                <strong className="text-[#020079]">Center Requirement:</strong>{" "}
                Multiple employees required for operations. Currently:{" "}
                {workforceData?.stats?.totalEmployees || 0} total employees (
                {workforceData?.stats?.activeEmployees || 0} active,{" "}
                {workforceData?.stats?.frozen || 0} deactivated).
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#020079]/20">
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Employee ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Specialization
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#020079]/10">
                  {loadingEmployees && (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Loader className="w-5 h-5 animate-spin text-[#020079]" />
                          <span className="font-roboto text-[#020079]">
                            Loading employees…
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!loadingEmployees && employeesError && (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center">
                        <p className="font-roboto text-red-600">
                          {employeesError}
                        </p>
                      </td>
                    </tr>
                  )}
                  {!loadingEmployees &&
                    !employeesError &&
                    employees.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-6 py-8 text-center">
                          <p className="font-roboto text-[#020079]/60">
                            No employees found.
                          </p>
                        </td>
                      </tr>
                    )}
                  {!loadingEmployees &&
                    !employeesError &&
                    employees.map((employee) => (
                      <tr
                        key={employee.id}
                        className="hover:bg-[#020079]/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-roboto font-semibold text-[#020079]">
                            {employee.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-roboto text-[#020079]/70">
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 font-roboto text-[#020079]/60">
                          {employee.specialization}
                        </td>
                        <td className="px-6 py-4 font-roboto text-[#020079]/60">
                          {employee.email}
                        </td>
                        <td className="px-6 py-4 font-roboto text-[#020079]/60">
                          {employee.phone}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 font-roboto text-[#020079] font-semibold">
                            {employee.rating}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="secondary"
                            className={
                              employee.status === "Active"
                                ? "bg-[#FFD700]/20 text-[#020079] hover:bg-[#FFD700]/30 border-0 font-roboto"
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
                            {employee.status === "Deactivated" ? (
                              <Button
                                onClick={() =>
                                  handleActivateEmployee(employee.id)
                                }
                                size="sm"
                                className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Activate
                              </Button>
                            ) : (
                              <Button
                                onClick={() =>
                                  handleFreezeEmployee(employee.id)
                                }
                                size="sm"
                                className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                              >
                                <Lock className="w-3 h-3 mr-1" />
                                Deactivate
                              </Button>
                            )}
                            <Button
                              onClick={() => handleDeleteEmployee(employee.id)}
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-600 hover:bg-red-50 font-roboto"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
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
      <EditManagerModal
        isOpen={showEditManagerModal}
        onClose={() => {
          setShowEditManagerModal(false);
          setSelectedManager(null);
        }}
        onSubmit={handleSubmitEditManager}
        managerData={selectedManager}
      />
      <EditEmployeeModal
        isOpen={showEditEmployeeModal}
        onClose={() => {
          setShowEditEmployeeModal(false);
          setSelectedEmployee(null);
        }}
        onSubmit={handleSubmitEditEmployee}
        employeeData={selectedEmployee}
      />
    </AdminDashboardLayout>
  );
}
