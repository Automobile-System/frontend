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

// Mock data generator - simulates backend response
const generateMockTimeLogs = (): TimeLog[] => {
  return [
    {
      id: "log-1",
      date: "2024-12-04",
      taskId: "1",
      taskName: "Oil Change",
      vehicle: "Toyota Corolla",
      plateNumber: "KA-1234",
      customer: "John Doe",
      startTime: "09:00 AM",
      endTime: "10:30 AM",
      totalHours: 1.5,
      remarks: "Completed on time. Customer satisfied.",
      status: "completed",
    },
    {
      id: "log-2",
      date: "2024-12-04",
      taskId: "2",
      taskName: "Brake Inspection",
      vehicle: "Honda Civic",
      plateNumber: "KA-5678",
      customer: "Jane Smith",
      startTime: "11:00 AM",
      endTime: "12:45 PM",
      totalHours: 1.75,
      remarks: "Found worn brake pads, recommended replacement.",
      status: "completed",
    },
    {
      id: "log-3",
      date: "2024-12-05",
      taskId: "3",
      taskName: "Engine Diagnosis",
      vehicle: "Ford F-150",
      plateNumber: "KA-9012",
      customer: "Mike Johnson",
      startTime: "09:30 AM",
      endTime: "11:30 AM",
      totalHours: 2.0,
      remarks: "Identified faulty spark plugs. Replaced all four.",
      status: "completed",
    },
    {
      id: "log-4",
      date: "2024-12-05",
      taskId: "4",
      taskName: "Tire Rotation",
      vehicle: "Mazda CX-5",
      plateNumber: "KA-3456",
      customer: "Sarah Williams",
      startTime: "01:00 PM",
      endTime: "02:00 PM",
      totalHours: 1.0,
      remarks: "Standard rotation completed.",
      status: "completed",
    },
    {
      id: "log-5",
      date: "2024-12-06",
      taskId: "5",
      taskName: "Transmission Check",
      vehicle: "BMW 3 Series",
      plateNumber: "KA-7890",
      customer: "David Brown",
      startTime: "10:00 AM",
      endTime: "12:30 PM",
      totalHours: 2.5,
      remarks: "Transmission fluid changed. Test drive successful.",
      status: "completed",
    },
    {
      id: "log-6",
      date: "2024-12-06",
      taskId: "6",
      taskName: "AC Service",
      vehicle: "Audi A4",
      plateNumber: "KA-2468",
      customer: "Emily Davis",
      startTime: "02:00 PM",
      endTime: "03:30 PM",
      totalHours: 1.5,
      remarks: "AC refrigerant recharged. Working perfectly.",
      status: "completed",
    },
    {
      id: "log-7",
      date: "2024-12-07",
      taskId: "7",
      taskName: "Battery Replacement",
      vehicle: "Tesla Model 3",
      plateNumber: "KA-1357",
      customer: "Robert Taylor",
      startTime: "09:00 AM",
      endTime: "10:15 AM",
      totalHours: 1.25,
      remarks: "12V battery replaced. All systems functional.",
      status: "completed",
    },
    {
      id: "log-8",
      date: "2024-12-07",
      taskId: "8",
      taskName: "Full Service",
      vehicle: "Mercedes E-Class",
      plateNumber: "KA-9753",
      customer: "Lisa Anderson",
      startTime: "11:00 AM",
      endTime: "02:30 PM",
      totalHours: 3.5,
      remarks: "Complete service including oil, filters, and inspection.",
      status: "completed",
    },
    {
      id: "log-9",
      date: "2024-12-08",
      taskId: "9",
      taskName: "Wheel Alignment",
      vehicle: "Volkswagen Golf",
      plateNumber: "KA-8642",
      customer: "James Wilson",
      startTime: "09:30 AM",
      endTime: "11:00 AM",
      totalHours: 1.5,
      remarks: "Four-wheel alignment completed. Adjusted camber.",
      status: "completed",
    },
    {
      id: "log-10",
      date: "2024-12-08",
      taskId: "10",
      taskName: "Coolant Flush",
      vehicle: "Hyundai Tucson",
      plateNumber: "KA-5791",
      customer: "Maria Garcia",
      startTime: "12:00 PM",
      endTime: "01:15 PM",
      totalHours: 1.25,
      remarks: "Coolant system flushed and refilled.",
      status: "completed",
    },
  ];
};

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

    // Simulate API call
    // In production:
    // const response = await fetch(`/api/employee/time-logs?startDate=${startDate}&endDate=${endDate}`);
    // const data = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 300));
    const mockData = generateMockTimeLogs();
    setTimeLogs(mockData);
    setIsLoading(false);
  };

  useEffect(() => {
    loadTimeLogs();
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

    // In production:
    // await fetch(`/api/employee/time-logs/${editingLog.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ remarks: editRemarks })
    // });

    setTimeLogs((prevLogs) =>
      prevLogs.map((log) =>
        log.id === editingLog.id ? { ...log, remarks: editRemarks } : log
      )
    );
    setShowEditModal(false);
    setEditingLog(null);
    setEditRemarks("");
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingLog(null);
    setEditRemarks("");
  };

  return (
    <EmployeeLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Time Logs</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Automatically recorded work sessions
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPreviousWeek}
              disabled={isLoading}
              className="hover:bg-blue-50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <button
              onClick={goToCurrentWeek}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-semibold text-gray-900 min-w-[220px] text-center hover:text-blue-600 transition-colors"
            >
              Week of {formatWeekRange()}
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextWeek}
              disabled={isLoading}
              className="hover:bg-blue-50 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">
                  Total Hours
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {totalHours.toFixed(1)}
                </p>
                <p className="text-xs text-blue-600 mt-1">This week</p>
              </div>
              <div className="p-3 bg-blue-600 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-gradient-to-br from-emerald-50 to-emerald-100/50 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-800 mb-1">
                  Tasks Completed
                </p>
                <p className="text-3xl font-bold text-emerald-900">
                  {totalLogs}
                </p>
                <p className="text-xs text-emerald-600 mt-1">This week</p>
              </div>
              <div className="p-3 bg-emerald-600 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800 mb-1">
                  Avg Hours/Task
                </p>
                <p className="text-3xl font-bold text-purple-900">
                  {avgHoursPerTask.toFixed(1)}
                </p>
                <p className="text-xs text-purple-600 mt-1">This week</p>
              </div>
              <div className="p-3 bg-purple-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 rounded-2xl shadow-lg border-gray-200 bg-white">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by task, vehicle, plate number, or customer..."
                className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
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
                className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900 [color-scheme:light]"
              />
            </div>
            {(searchQuery || dateFilter) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setDateFilter("");
                }}
                className="h-11"
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading time logs...</p>
            </div>
          </div>
        ) : filteredLogs.length === 0 ? (
          <Card className="p-12 rounded-2xl shadow-lg border-gray-200 bg-white text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
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
          <Card className="rounded-2xl shadow-lg border-gray-200 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-700 to-gray-800">
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
                      className={`hover:bg-blue-50 transition-colors ${
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
                          <Clock className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {log.endTime}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm font-bold leading-5 rounded-full bg-blue-100 text-blue-800">
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
                          className="hover:bg-blue-100 text-blue-600"
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
        <Card className="p-5 rounded-2xl shadow-lg border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-blue-900 mb-1">
                Automatic Time Tracking
              </p>
              <p className="text-sm text-blue-800">
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
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Edit Remarks
                    </h2>
                    <p className="text-blue-100 text-sm">
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
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Task</p>
                      <p className="font-bold text-gray-900">
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
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Remarks / Notes
                  </label>
                  <textarea
                    value={editRemarks}
                    onChange={(e) => setEditRemarks(e.target.value)}
                    className="w-full px-4 py-3 text-sm text-gray-900 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
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
                  className="h-11 px-6 border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveRemarks}
                  className="h-11 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
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
