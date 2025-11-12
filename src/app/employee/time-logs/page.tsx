"use client";

/**
 * TIME LOGS PAGE - BACKEND INTEGRATION GUIDE
 *
 * This page automatically records time logs when tasks are started/completed in the tasks page.
 *
 * Backend API Endpoints Needed:
 *
 * 1. GET /api/employee/time-logs?startDate=XXX&endDate=XXX
 *    - Fetches time logs for a date range
 *
 * 2. PUT /api/employee/time-logs/:id
 *    - Updates remarks for a specific time log
 *    - Body: { remarks: string }
 *
 * 3. POST /api/employee/time-logs (Auto-triggered from task page)
 *    - Creates time log when task starts
 *    - Body: { taskId, startTime }
 *
 * 4. PATCH /api/employee/time-logs/:id/complete (Auto-triggered from task page)
 *    - Updates endTime when task completes
 *    - Body: { endTime }
 *
 * Time logs are automatically created from the tasks page when:
 * - User clicks "Start Task" -> Creates log with startTime
 * - User clicks "Complete Task" -> Updates log with endTime
 */

import { useState, useEffect } from "react";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Edit2,
  Save,
  X,
  Clock,
  Calendar,
  TrendingUp,
  CheckCircle2,
  FileText,
  Car,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TimeLog {
  id: string;
  date: string; // YYYY-MM-DD format
  taskId: string;
  taskName: string;
  vehicle: string;
  plateNumber: string;
  customer?: string;
  startTime: string; // HH:MM AM/PM format
  endTime: string; // HH:MM AM/PM format
  totalHours: number; // Calculated in hours (decimal)
  remarks: string;
  status: "completed" | "in_progress";
}


export default function TimeLogs() {
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLog, setEditingLog] = useState<TimeLog | null>(null);
  const [editRemarks, setEditRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  });

  // Load time logs data
  const loadTimeLogs = async () => {
    setIsLoading(true);

    try {
      // Calculate date range for the week
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(currentWeekStart.getDate() + 6);
      const dateRange = `${currentWeekStart.toISOString().split('T')[0]},${weekEnd.toISOString().split('T')[0]}`;
      
      const { getTimeLogs } = await import("@/services/employeeService");
      const logs = await getTimeLogs(dateRange);
      
      // Transform API response to match TimeLog interface
      const transformedLogs: TimeLog[] = logs.map((log: Record<string, unknown>) => ({
        id: String(log.id || ""),
        date: log.date 
          ? new Date(String(log.date)).toISOString().split('T')[0]
          : (log.startTime ? new Date(String(log.startTime)).toISOString().split('T')[0] : ""),
        taskId: String(log.taskId || ""),
        taskName: String(log.taskTitle || log.taskName || ""),
        vehicle: String(log.vehicleRegNo || "Unknown Vehicle"),
        plateNumber: String(log.vehicleRegNo || ""),
        customer: String(log.customer || ""),
        startTime: log.startTime
          ? new Date(String(log.startTime)).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          : "",
        endTime: log.endTime
          ? new Date(String(log.endTime)).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          : "",
        totalHours: Number(log.durationHours || 0),
        remarks: String(log.remarks || ""),
        status: log.endTime ? "completed" : "in_progress",
      }));
      
      setTimeLogs(transformedLogs);
    } catch (error) {
      console.error("Error loading time logs:", error);
      setTimeLogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTimeLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeekStart]);

  // Filter logs
  const filteredLogs = timeLogs.filter((log) => {
    const matchesSearch =
      log.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.customer?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !dateFilter || log.date === dateFilter;
    return matchesSearch && matchesDate;
  });

  // Calculate statistics
  const totalHours = filteredLogs.reduce((sum, log) => sum + log.totalHours, 0);
  const totalLogs = filteredLogs.length;
  const avgHoursPerTask = totalLogs > 0 ? totalHours / totalLogs : 0;

  // Week navigation
  const goToPreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
  };

  const goToNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
  };

  const goToCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    setCurrentWeekStart(monday);
  };

  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(currentWeekStart.getDate() + 6);

  const formatWeekRange = () => {
    const startMonth = currentWeekStart.toLocaleDateString("en-US", {
      month: "short",
    });
    const endMonth = weekEnd.toLocaleDateString("en-US", { month: "short" });
    const startDay = currentWeekStart.getDate();
    const endDay = weekEnd.getDate();
    const year = weekEnd.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };

  // Handle edit
  const handleEdit = (log: TimeLog) => {
    setEditingLog(log);
    setEditRemarks(log.remarks);
    setShowEditModal(true);
  };

  const handleSaveRemarks = async () => {
    if (!editingLog) return;

    try {
      // Note: If backend doesn't have update endpoint, you may need to add it
      // For now, we'll update locally. Backend may need PUT /api/timelogs/{id} endpoint
      // const { updateTimeLogRemarks } = await import("@/services/employeeService");
      // await updateTimeLogRemarks(editingLog.id, editRemarks);
      
      // Update locally for now
      setTimeLogs((prevLogs) =>
        prevLogs.map((log) =>
          log.id === editingLog.id ? { ...log, remarks: editRemarks } : log
        )
      );
      setShowEditModal(false);
      setEditingLog(null);
      setEditRemarks("");
    } catch (error) {
      console.error("Error updating remarks:", error);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingLog(null);
    setEditRemarks("");
  };

  return (
    <EmployeeLayout>
      <div className="min-h-screen bg-white p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#020079] mb-2">
              Time Logs
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Automatically recorded work sessions
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-[#020079]/20">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPreviousWeek}
              disabled={isLoading}
              className="hover:bg-[#0200791F] transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-[#020079]" />
            </Button>
            <button
              onClick={goToCurrentWeek}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-semibold text-[#020079] min-w-[220px] text-center hover:text-[#03009B] transition-colors"
            >
              Week of {formatWeekRange()}
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextWeek}
              disabled={isLoading}
              className="hover:bg-[#0200791F] transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-[#020079]" />
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Hours
                </p>
                <p className="text-3xl font-bold text-[#020079]">
                  {totalHours.toFixed(1)}
                </p>
                <p className="text-xs text-gray-500 mt-1">This week</p>
              </div>
              <div className="p-3 bg-[#FFD70029] rounded-xl">
                <Clock className="h-6 w-6 text-[#020079]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Tasks Completed
                </p>
                <p className="text-3xl font-bold text-[#020079]">{totalLogs}</p>
                <p className="text-xs text-gray-500 mt-1">This week</p>
              </div>
              <div className="p-3 bg-[#FFD70029] rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-[#020079]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Avg Hours/Task
                </p>
                <p className="text-3xl font-bold text-[#020079]">
                  {avgHoursPerTask.toFixed(1)}
                </p>
                <p className="text-xs text-gray-500 mt-1">This week</p>
              </div>
              <div className="p-3 bg-[#FFD70029] rounded-xl">
                <TrendingUp className="h-6 w-6 text-[#020079]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 rounded-2xl shadow-lg border-[#020079]/20 hover:border-[#020079] bg-white hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by task, vehicle, plate number, or customer..."
                className="pl-10 h-11 border-[#020079]/20 focus:border-[#020079] focus:ring-[#020079] text-gray-900 placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-64">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 h-11 border-[#020079]/20 focus:border-[#020079] focus:ring-[#020079] text-gray-900 [color-scheme:light]"
              />
            </div>
            {(searchQuery || dateFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setDateFilter("");
                }}
                className="h-11 border-[#020079]/30 hover:bg-[#0200791F] text-[#020079]"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </Card>

        {/* Time Logs Table */}
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading time logs...</p>
            </div>
          </div>
        ) : filteredLogs.length === 0 ? (
          <Card className="p-12 rounded-2xl shadow-lg border-[#020079]/20 bg-white text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-[#0200791F] rounded-full mb-4">
                <FileText className="h-12 w-12 text-[#020079]" />
              </div>
              <h3 className="text-xl font-bold text-[#020079] mb-2">
                No Time Logs Found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || dateFilter
                  ? "Try adjusting your filters"
                  : "Time logs will appear here when you start and complete tasks"}
              </p>
            </div>
          </Card>
        ) : (
          <Card className="rounded-2xl shadow-lg border-[#020079]/20 hover:border-[#020079] bg-white overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#020079] to-[#01024D]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Task Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Start Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      End Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Total Hours
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Remarks
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider w-[120px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLogs.map((log, index) => (
                    <tr
                      key={log.id}
                      className={`hover:bg-[#0200791F] transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900">
                            {new Date(log.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-bold text-gray-900">
                            {log.taskName}
                          </div>
                          {log.customer && (
                            <div className="text-xs text-gray-600">
                              {log.customer}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {log.vehicle}
                            </div>
                            <div className="text-xs text-gray-600">
                              {log.plateNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {log.startTime}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#E6C200]" />
                          <span className="text-sm font-medium text-gray-900">
                            {log.endTime}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm font-bold leading-5 rounded-full bg-[#FFD70029] text-[#020079] border border-[#E6C200]">
                          {log.totalHours.toFixed(2)} hrs
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-xs">
                          {log.remarks || (
                            <span className="italic text-gray-400">
                              No remarks
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(log)}
                          className="hover:bg-[#0200791F] text-[#020079]"
                        >
                          <Edit2 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Info Note */}
        <Card className="p-5 rounded-2xl shadow-lg border-[#020079]/20 bg-[#0200791F]">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#020079] rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#020079] mb-1">
                Automatic Time Tracking
              </p>
              <p className="text-sm text-gray-700">
                Time logs are automatically recorded when you start and complete
                tasks in the Tasks page. You can add remarks to any log entry by
                clicking the Edit button.
              </p>
            </div>
          </div>
        </Card>

        {/* Edit Remarks Modal */}
        {showEditModal && editingLog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white overflow-hidden animate-in fade-in zoom-in duration-200">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#020079] to-[#01024D] px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Edit Remarks
                    </h2>
                    <p className="text-white/80 text-sm">
                      Update notes for this time log
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancelEdit}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Task Info */}
                <div className="bg-[#0200791F] rounded-xl p-4 border border-[#020079]/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Task</p>
                      <p className="font-bold text-[#020079]">
                        {editingLog.taskName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Vehicle</p>
                      <p className="font-medium text-gray-900">
                        {editingLog.vehicle} ({editingLog.plateNumber})
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(editingLog.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Duration</p>
                      <p className="font-medium text-gray-900">
                        {editingLog.startTime} - {editingLog.endTime} (
                        {editingLog.totalHours.toFixed(2)} hrs)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Remarks Input */}
                <div>
                  <label className="block text-sm font-bold text-[#020079] mb-2">
                    Remarks / Notes
                  </label>
                  <textarea
                    value={editRemarks}
                    onChange={(e) => setEditRemarks(e.target.value)}
                    className="w-full px-4 py-3 text-sm text-gray-900 border-2 border-[#020079]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#020079] focus:border-[#020079] transition-all resize-none"
                    rows={6}
                    placeholder="Add any notes, observations, or important details about this work session..."
                  />
                  <p className="text-xs text-gray-700 font-medium mt-2">
                    {editRemarks.length} characters
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="h-11 px-6 border-[#020079]/30 hover:bg-[#0200791F] text-[#020079] font-semibold"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveRemarks}
                  className="h-11 px-6 bg-gradient-to-r from-[#020079] to-[#01024D] hover:from-[#03009B] hover:to-[#020079] text-white font-semibold shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Remarks
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
}
