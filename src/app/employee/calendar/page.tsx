"use client";

/**
 * BACKEND INTEGRATION GUIDE:
 *
 * To connect this calendar to your backend API, update the `loadWeekData` function (line ~180):
 *
 * Replace:
 *   const tasks = generateMockTasks(weekStart);
 *
 * With:
 *   const weekEnd = new Date(weekStart);
 *   weekEnd.setDate(weekStart.getDate() + 6);
 *
 *   const response = await fetch(`/api/employee/tasks?startDate=${weekStart.toISOString()}&endDate=${weekEnd.toISOString()}`, {
 *     method: 'GET',
 *     headers: {
 *       'Content-Type': 'application/json',
 *       'Authorization': `Bearer ${yourAuthToken}`
 *     }
 *   });
 *   const tasks = await response.json();
 *
 * Expected API Response Format:
 * [
 *   {
 *     id: "string",
 *     title: "string",
 *     time: "HH:MM AM/PM",
 *     deadline: "ISO date string (e.g., 2024-12-10T00:00:00.000Z)",
 *     type: "normal" | "urgent" | "completed",
 *     customer: "string (optional)",
 *     vehicle: "string (optional)",
 *     status: "pending" | "in_progress" | "completed"
 *   }
 * ]
 */

import { useState, useEffect } from "react";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Clock,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Wrench,
  Car,
  User,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  time: string;
  deadline: string; // ISO date string for backend compatibility
  type: "normal" | "urgent" | "completed";
  customer?: string;
  vehicle?: string;
  status: "pending" | "in_progress" | "completed";
}

interface DaySchedule {
  date: Date;
  day: string;
  tasks: Task[];
  isWeekend: boolean;
  isToday: boolean;
}

// Mock data generator function - simulates backend response
const generateMockTasks = (weekStart: Date): Task[] => {
  // This simulates fetching tasks from backend API
  // In production: await fetch(`/api/tasks?startDate=${weekStart.toISOString()}&endDate=${weekEnd.toISOString()}`)

  const tasks: Task[] = [
    {
      id: "1",
      title: "Oil Change",
      time: "09:00 AM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate()
      ).toISOString(),
      type: "normal",
      customer: "John Doe",
      vehicle: "Toyota Corolla",
      status: "completed",
    },
    {
      id: "2",
      title: "Brake Inspection",
      time: "11:30 AM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate()
      ).toISOString(),
      type: "normal",
      customer: "Jane Smith",
      vehicle: "Honda Civic",
      status: "completed",
    },
    {
      id: "3",
      title: "Engine Diagnosis",
      time: "02:00 PM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate()
      ).toISOString(),
      type: "urgent",
      customer: "Mike Johnson",
      vehicle: "Ford F-150",
      status: "completed",
    },
    {
      id: "4",
      title: "Tire Rotation",
      time: "10:00 AM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 1
      ).toISOString(),
      type: "normal",
      customer: "Sarah Williams",
      vehicle: "Mazda CX-5",
      status: "in_progress",
    },
    {
      id: "5",
      title: "Transmission Check",
      time: "01:00 PM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 1
      ).toISOString(),
      type: "urgent",
      customer: "David Brown",
      vehicle: "BMW 3 Series",
      status: "pending",
    },
    {
      id: "6",
      title: "AC Service",
      time: "03:30 PM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 1
      ).toISOString(),
      type: "normal",
      customer: "Emily Davis",
      vehicle: "Audi A4",
      status: "pending",
    },
    {
      id: "7",
      title: "Battery Replacement",
      time: "09:30 AM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 2
      ).toISOString(),
      type: "normal",
      customer: "Robert Taylor",
      vehicle: "Tesla Model 3",
      status: "pending",
    },
    {
      id: "8",
      title: "Full Service",
      time: "02:00 PM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 2
      ).toISOString(),
      type: "urgent",
      customer: "Lisa Anderson",
      vehicle: "Mercedes E-Class",
      status: "pending",
    },
    {
      id: "9",
      title: "Wheel Alignment",
      time: "10:00 AM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 3
      ).toISOString(),
      type: "normal",
      customer: "James Wilson",
      vehicle: "Volkswagen Golf",
      status: "pending",
    },
    {
      id: "10",
      title: "Coolant Flush",
      time: "12:00 PM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 3
      ).toISOString(),
      type: "normal",
      customer: "Maria Garcia",
      vehicle: "Hyundai Tucson",
      status: "pending",
    },
    {
      id: "11",
      title: "Suspension Repair",
      time: "03:00 PM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 3
      ).toISOString(),
      type: "urgent",
      customer: "Christopher Lee",
      vehicle: "Jeep Wrangler",
      status: "pending",
    },
    {
      id: "12",
      title: "Headlight Replacement",
      time: "09:00 AM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 4
      ).toISOString(),
      type: "normal",
      customer: "Patricia Martinez",
      vehicle: "Nissan Altima",
      status: "pending",
    },
    {
      id: "13",
      title: "Exhaust System Check",
      time: "11:00 AM",
      deadline: new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + 4
      ).toISOString(),
      type: "normal",
      customer: "Daniel Rodriguez",
      vehicle: "Chevrolet Silverado",
      status: "pending",
    },
  ];

  return tasks;
};

export default function Calendar() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    // Get Monday of current week
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Sunday
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  });

  const [selectedView, setSelectedView] = useState<"week" | "month">("week");
  const [calendarData, setCalendarData] = useState<DaySchedule[]>([]);
  const [workloadStatus, setWorkloadStatus] = useState(75);
  const [isLoading, setIsLoading] = useState(false);

  // Function to load tasks for a given week
  const loadWeekData = async (weekStart: Date) => {
    setIsLoading(true);

    // Simulate API call delay
    // In production: const response = await fetch(`/api/employee/tasks?startDate=${weekStart.toISOString()}`);
    // In production: const tasks = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

    const tasks = generateMockTasks(weekStart);

    // Generate 7 days of the week
    const weekData: DaySchedule[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);

      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isToday = date.getTime() === today.getTime();

      // Filter tasks for this specific day
      const dayTasks = tasks.filter((task) => {
        const taskDate = new Date(task.deadline);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === date.getTime();
      });

      weekData.push({
        date: date,
        day: date.toLocaleDateString("en-US", { weekday: "long" }),
        tasks: dayTasks,
        isWeekend,
        isToday,
      });
    }

    setCalendarData(weekData);

    // Calculate workload based on tasks
    const totalTasks = tasks.length;
    const calculatedWorkload = Math.min(
      100,
      Math.round((totalTasks / 15) * 100)
    );
    setWorkloadStatus(calculatedWorkload);

    setIsLoading(false);
  };

  // Load data when component mounts or week changes
  useEffect(() => {
    loadWeekData(currentWeekStart);
  }, [currentWeekStart]);

  // Navigation functions
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

  // Calculate week end date for display
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

  const totalTasks = calendarData.reduce(
    (sum, day) => sum + day.tasks.length,
    0
  );
  const completedTasks = calendarData.reduce(
    (sum, day) =>
      sum + day.tasks.filter((t) => t.status === "completed").length,
    0
  );
  const urgentTasks = calendarData.reduce(
    (sum, day) => sum + day.tasks.filter((t) => t.type === "urgent").length,
    0
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 border-emerald-300 text-emerald-800";
      case "in_progress":
        return "bg-blue-100 border-blue-300 text-blue-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-3 w-3" />;
      case "in_progress":
        return <Clock className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  return (
    <EmployeeLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My Schedule
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {currentWeekStart.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
              <Button
                variant={selectedView === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("week")}
                className={
                  selectedView === "week" ? "bg-blue-600 hover:bg-blue-700" : ""
                }
              >
                Week
              </Button>
              <Button
                variant={selectedView === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("month")}
                className={
                  selectedView === "month"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : ""
                }
              >
                Month
              </Button>
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">
                  Total Tasks
                </p>
                <p className="text-3xl font-bold text-blue-900">{totalTasks}</p>
              </div>
              <div className="p-3 bg-blue-600 rounded-xl">
                <Wrench className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-gradient-to-br from-emerald-50 to-emerald-100/50 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-800 mb-1">
                  Completed
                </p>
                <p className="text-3xl font-bold text-emerald-900">
                  {completedTasks}
                </p>
              </div>
              <div className="p-3 bg-emerald-600 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-gradient-to-br from-orange-50 to-orange-100/50 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800 mb-1">
                  Urgent Tasks
                </p>
                <p className="text-3xl font-bold text-orange-900">
                  {urgentTasks}
                </p>
              </div>
              <div className="p-3 bg-orange-600 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800 mb-1">
                  Workload
                </p>
                <p className="text-3xl font-bold text-purple-900">
                  {workloadStatus}%
                </p>
              </div>
              <div className="p-3 bg-purple-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Workload Alert */}
        {workloadStatus >= 75 && (
          <Card className="p-5 rounded-2xl shadow-lg border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-orange-900 mb-1">
                  High Workload Alert: {workloadStatus}% Capacity
                </p>
                <p className="text-sm text-orange-800">
                  You are currently operating at {workloadStatus}% capacity.
                  {workloadStatus >= 80 &&
                    " New assignments are paused until workload decreases."}
                  {workloadStatus < 80 &&
                    " Consider managing your schedule to avoid overload."}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Calendar Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading schedule...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {calendarData.map((dayData, index) => (
              <Card
                key={`${dayData.date.toISOString()}-${index}`}
                className={`rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden ${
                  dayData.isToday
                    ? "ring-2 ring-blue-500 shadow-blue-200"
                    : "border-gray-200"
                } ${dayData.isWeekend ? "bg-gray-50" : "bg-white"}`}
              >
                {/* Day Header */}
                <div
                  className={`p-4 ${
                    dayData.isToday
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                      : dayData.isWeekend
                      ? "bg-gray-200"
                      : "bg-gradient-to-r from-gray-700 to-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          dayData.isToday || !dayData.isWeekend
                            ? "text-white/80"
                            : "text-gray-600"
                        }`}
                      >
                        {dayData.day}
                      </p>
                      <p
                        className={`text-2xl font-bold ${
                          dayData.isToday || !dayData.isWeekend
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                      >
                        {dayData.date.getDate()}
                      </p>
                    </div>
                    {dayData.isToday && (
                      <div className="px-2 py-1 bg-white/20 rounded-lg text-xs font-semibold text-white">
                        Today
                      </div>
                    )}
                  </div>
                </div>

                {/* Tasks List */}
                <div className="p-4 min-h-[300px] space-y-3">
                  {dayData.isWeekend ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <div className="p-4 bg-gray-200 rounded-full mb-3">
                        <CalendarIcon className="h-8 w-8 text-gray-500" />
                      </div>
                      <p className="text-gray-600 font-medium">Weekend</p>
                      <p className="text-sm text-gray-500">Day Off</p>
                    </div>
                  ) : dayData.tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <div className="p-4 bg-green-100 rounded-full mb-3">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-gray-600 font-medium">No Tasks</p>
                      <p className="text-sm text-gray-500">Free day</p>
                    </div>
                  ) : (
                    dayData.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
                          task.type === "urgent"
                            ? "bg-red-50 border-red-300 hover:border-red-400"
                            : getStatusColor(task.status)
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock
                              className={`h-4 w-4 ${
                                task.type === "urgent"
                                  ? "text-red-600"
                                  : "text-gray-600"
                              }`}
                            />
                            <span
                              className={`text-xs font-bold ${
                                task.type === "urgent"
                                  ? "text-red-800"
                                  : "text-gray-700"
                              }`}
                            >
                              {task.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(task.status)}
                          </div>
                        </div>

                        <h4
                          className={`font-bold text-sm mb-2 ${
                            task.type === "urgent"
                              ? "text-red-900"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </h4>

                        {task.customer && (
                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                            <User className="h-3 w-3" />
                            <span className="truncate">{task.customer}</span>
                          </div>
                        )}

                        {task.vehicle && (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Car className="h-3 w-3" />
                            <span className="truncate">{task.vehicle}</span>
                          </div>
                        )}

                        {task.type === "urgent" && (
                          <div className="mt-2 px-2 py-1 bg-red-200 rounded-md flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-red-800" />
                            <span className="text-xs font-semibold text-red-800">
                              URGENT
                            </span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
}
