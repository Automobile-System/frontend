"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Loader } from "lucide-react";
import {
  EmployeeHistoryModal,
  type ServiceHistory,
} from "@/components/modals/EmployeeHistoryModal";
import AddTaskModal from "@/components/modals/AddTaskModal";
import { useState, useEffect } from "react";
import { getEmployeeHistory } from "@/services/api";
import { fetchEmployees, type EmployeeListItem } from "@/services/managerService";
import { showToast } from "@/lib/toast";

// Local view model after mapping
interface EmployeeRow {
  id?: string;
  name: string;
  skill: string;
  tasks: string; // formatted "x / y"
  rating: number;
  status: string;
  serviceHistory: ServiceHistory[]; // placeholder - real history loaded via modal call later
}

// Helper convert a backend record to a row with graceful fallbacks
function mapEmployee(e: EmployeeListItem): EmployeeRow {
  // Parse current/max from string format like "0/5"
  let current = 0;
  let max = 5;
  if (typeof e.currentTasks === "string") {
    const m = e.currentTasks.match(/(\d+)\s*\/\s*(\d+)/);
    if (m) {
      current = Number(m[1]);
      max = Number(m[2]) || max;
    }
  }

  // Normalize rating to number
  const ratingNum = typeof e.rating === "number" ? e.rating : Number(e.rating ?? 0);

  // Use status from backend, or derive from task load
  let status = (e.status || "").trim();
  if (!status) {
    const ratio = max > 0 ? current / max : 0;
    if (ratio >= 1) status = "Busy (Max Load)";
    else if (ratio >= 0.75) status = "Busy";
    else status = "Available";
  }

  return {
    id: e.id,
    name: e.name,
    skill: e.skill || "General",
    tasks: `${current} / ${max}`,
    rating: isNaN(ratingNum) ? 0 : ratingNum,
    status,
    serviceHistory: [],
  };
}

function getStatusBadge(status: string) {
  if (status === "Available")
    return (
      <Badge className="bg-[#FFD700]/20 text-[#020079] hover:bg-[#FFD700]/30 border-0 font-roboto">
        Available
      </Badge>
    );
  if (status === "Busy (Max Load)")
    return (
      <Badge className="bg-[#020079]/20 text-[#020079] hover:bg-[#020079]/30 border-0 font-roboto whitespace-nowrap">
        Busy (Max Load)
      </Badge>
    );
  if (status === "Busy")
    return (
      <Badge className="bg-[#020079]/10 text-[#020079] hover:bg-[#020079]/20 border-0 font-roboto">
        Busy
      </Badge>
    );
  if (status === "Unavailable")
    return (
      <Badge className="bg-[#020079]/10 text-[#020079]/70 hover:bg-[#020079]/20 border-0 font-roboto">
        Unavailable
      </Badge>
    );
  return <span>{status}</span>;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRow | null>(
    null
  );
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedEmployeeForTask, setSelectedEmployeeForTask] =
    useState<EmployeeRow | null>(null);
  const [loadingHistoryId, setLoadingHistoryId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchEmployees()
      .then((data: EmployeeListItem[]) => {
        const rows = Array.isArray(data) ? data.map(mapEmployee) : [];
        setEmployees(rows);
      })
      .catch((err: unknown) =>
        setError(
          err instanceof Error ? err.message : "Failed to load employees"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const handleTaskAssignment = (formData: Record<string, string>) => {
    // Here you would typically send this data to your backend
    console.log("Task Assignment Data:", formData);
    // TODO: Implement the API call to save the task
    setShowAssignModal(false);
    setSelectedEmployeeForTask(null);
  };

  const mapHistoryItem = (item: Record<string, unknown>): ServiceHistory => {
    const vehicleNumber = String(
      item?.registrationNo || item?.vehicleNumber || item?.vehicleRegNo || "-"
    );
    const vehicleModel = String(item?.vehicleModel || item?.model || "-");
    const serviceType = String(
      item?.serviceType || item?.type || item?.jobType || "-"
    );
    const date = String(
      item?.date || item?.completedAt || item?.endDate || "-"
    );
    const ratingRaw = item?.rating ?? item?.customerRating ?? 0;
    const rating = Number(ratingRaw) || 0;
    return { vehicleNumber, vehicleModel, serviceType, date, rating };
  };

  const handleViewHistory = async (emp: EmployeeRow) => {
    if (!emp.id) {
      showToast.warning("Employee id missing; cannot load history");
      return;
    }
    setLoadingHistoryId(emp.id);
    try {
      const list = await getEmployeeHistory(emp.id);
      const history: ServiceHistory[] = Array.isArray(list)
        ? list.map(mapHistoryItem)
        : [];
      setSelectedEmployee({ ...emp, serviceHistory: history });
    } catch (err: unknown) {
      showToast.error(
        err instanceof Error ? err.message : "Failed to load employee history"
      );
    } finally {
      setLoadingHistoryId(null);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bebas text-[#020079] mb-2">
          Manage Employees
        </h1>
        <p className="font-roboto text-[#020079]/70">
          View and manage employee roster, assignments, and availability
        </p>
      </div>
      {selectedEmployee && (
        <EmployeeHistoryModal
          employee={selectedEmployee}
          isOpen={!!selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
      {selectedEmployeeForTask && (
        <AddTaskModal
          isOpen={showAssignModal}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedEmployeeForTask(null);
          }}
          onSubmit={handleTaskAssignment}
        />
      )}
      <Card className="bg-white border-[#020079]/20">
        <CardHeader className="border-b border-[#020079]/20">
          <CardTitle className="text-xl font-bebas text-[#020079]">
            Employee Roster
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#020079]/20">
                  <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                    Skill
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                    Current Tasks
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
                {loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-6 text-center font-roboto text-[#020079]"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Loading employees…</span>
                      </div>
                    </td>
                  </tr>
                )}
                {!loading && error && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-6 text-center font-roboto text-red-600"
                    >
                      {error}
                    </td>
                  </tr>
                )}
                {!loading && !error && employees.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-6 text-center font-roboto text-[#020079]"
                    >
                      No employees found.
                    </td>
                  </tr>
                )}
                {!loading &&
                  !error &&
                  employees.map((emp) => (
                    <tr
                      key={emp.name}
                      className="hover:bg-[#020079]/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-roboto font-semibold text-[#020079]">
                          {emp.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-roboto text-[#020079]/70">
                        {emp.skill}
                      </td>
                      <td className="px-6 py-4 font-roboto text-[#020079]/70">
                        {emp.tasks}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-roboto text-[#020079] font-semibold">
                          <Star className="w-4 h-4 fill-[#FFD700] stroke-[#FFD700]" />
                          {emp.rating}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(emp.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#020079]/30 text-[#020079] hover:bg-[#020079]/5 font-roboto"
                            disabled={!!(emp.id && loadingHistoryId === emp.id)}
                            onClick={() => handleViewHistory(emp)}
                          >
                            {emp.id && loadingHistoryId === emp.id
                              ? "Loading…"
                              : "View History"}
                          </Button>
                          {emp.status === "Unavailable" ? (
                            <Button
                              size="sm"
                              className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
                            >
                              Make Available
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                              onClick={() => {
                                setSelectedEmployeeForTask(emp);
                                setShowAssignModal(true);
                              }}
                            >
                              Assign
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
  );
}
