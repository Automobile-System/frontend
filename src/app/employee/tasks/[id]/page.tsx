"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  User,
  Car,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clipboard,
  AlertCircle,
  CheckCircle2,
  Timer,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TaskStatus = "not_started" | "in_progress" | "completed" | "paused";

interface Task {
  id: string;
  title: string;
  vehicle: string;
  plateNumber: string;
  deadline: string;
  customer?: string;
  status: TaskStatus;
  timeElapsedSeconds?: number;
  pauseReason?: string;
  needsCustomerApproval?: boolean;
  approvalRequestedAt?: number;
  awaitingCustomerApproval?: boolean;
  // Additional details for detail page
  description?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
  assignedDate?: string;
  priority?: "low" | "medium" | "high";
  vehicleModel?: string;
  vehicleYear?: number;
  vehicleMileage?: number;
  estimatedCost?: number;
  parts?: { name: string; cost: number; quantity: number }[];
  notes?: string[];
}


export default function TaskDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      setIsLoading(true);
      try {
        const { getTaskById } = await import("@/services/employeeService");
        const taskData = await getTaskById(params.id);
        
        // Transform API response to match Task interface
        // Note: Backend may return different structure, adjust as needed
        const transformedTask: Task = {
          id: taskData.id?.toString() || params.id,
          title: taskData.title || "",
          vehicle: taskData.vehicleRegNo || taskData.vehicle || "Unknown Vehicle",
          plateNumber: taskData.vehicleRegNo || taskData.plateNumber || "",
          deadline: taskData.deadline
            ? new Date(taskData.deadline).toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          customer: taskData.customerName || taskData.customer,
          status: (taskData.status?.toLowerCase() || "not_started") as TaskStatus,
          timeElapsedSeconds: taskData.timeSpent ? Math.round(taskData.timeSpent * 3600) : 0,
          description: taskData.description,
          customerPhone: taskData.customerPhone,
          customerEmail: taskData.customerEmail,
          customerAddress: taskData.customerAddress,
          assignedDate: taskData.assignedDate
            ? new Date(taskData.assignedDate).toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : undefined,
          priority: taskData.priority,
          vehicleModel: taskData.vehicleModel,
          vehicleYear: taskData.vehicleYear,
          vehicleMileage: taskData.vehicleMileage,
          estimatedCost: taskData.estimatedCost,
          parts: taskData.parts,
          notes: taskData.notes,
        };
        
        setTask(transformedTask);
      } catch (error) {
        console.error("Error loading task:", error);
        setTask(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTask();
  }, [params.id]);

  if (isLoading) {
    return (
      <EmployeeLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading task details...</p>
          </div>
        </div>
      </EmployeeLayout>
    );
  }

  if (!task) {
    return (
      <EmployeeLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Task Not Found</h2>
            <p className="text-gray-600 mb-4">
              The task you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button onClick={() => router.push("/employee/tasks")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tasks
            </Button>
          </Card>
        </div>
      </EmployeeLayout>
    );
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return "bg-[#E6C200]";
      case "in_progress":
        return "bg-[#020079]";
      case "paused":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "paused":
        return "Paused";
      default:
        return "Not Started";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-[#FFD70029] text-gray-900 border-[#E6C200]";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatTime = (seconds?: number) => {
    if (!seconds) return "00:00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <EmployeeLayout>
      <div className="min-h-screen bg-white p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.push("/employee/tasks")}
            className="mb-4 bg-white border-[#020079]/30 text-[#020079] hover:bg-[#0200791F] hover:border-[#020079] transition-all shadow-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tasks
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#020079] mb-2">
                {task.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge
                  className={`${getStatusColor(
                    task.status
                  )} text-white border-0`}
                >
                  {getStatusText(task.status)}
                </Badge>
                {task.priority && (
                  <Badge
                    className={getPriorityColor(task.priority)}
                    variant="outline"
                  >
                    {task.priority.toUpperCase()} PRIORITY
                  </Badge>
                )}
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Timer className="h-4 w-4" />
                  {formatTime(task.timeElapsedSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Description */}
            <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-[#0200791F] rounded-lg">
                  <Clipboard className="h-5 w-5 text-[#020079]" />
                </div>
                <h2 className="text-xl font-bold text-[#020079]">
                  Task Description
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {task.description}
              </p>
            </Card>

            {/* Vehicle Information */}
            <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-[#FFD70029] rounded-lg">
                  <Car className="h-5 w-5 text-[#020079]" />
                </div>
                <h2 className="text-xl font-bold text-[#020079]">
                  Vehicle Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#0200791F] rounded-xl border border-[#020079]/20">
                  <p className="text-sm text-gray-600 mb-1">Vehicle</p>
                  <p className="font-semibold text-gray-900">
                    {task.vehicleModel || task.vehicle}
                  </p>
                </div>
                <div className="p-4 bg-[#0200791F] rounded-xl border border-[#020079]/20">
                  <p className="text-sm text-gray-600 mb-1">Plate Number</p>
                  <p className="font-semibold text-gray-900">
                    {task.plateNumber}
                  </p>
                </div>
                {task.vehicleYear && (
                  <div className="p-4 bg-[#0200791F] rounded-xl border border-[#020079]/20">
                    <p className="text-sm text-gray-600 mb-1">Year</p>
                    <p className="font-semibold text-gray-900">
                      {task.vehicleYear}
                    </p>
                  </div>
                )}
                {task.vehicleMileage && (
                  <div className="p-4 bg-[#0200791F] rounded-xl border border-[#020079]/20">
                    <p className="text-sm text-gray-600 mb-1">Mileage</p>
                    <p className="font-semibold text-gray-900">
                      {task.vehicleMileage.toLocaleString()} miles
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Parts & Materials */}
            {task.parts && task.parts.length > 0 && (
              <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#FFD70029] rounded-lg">
                    <Wrench className="h-5 w-5 text-[#020079]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#020079]">
                    Parts & Materials
                  </h2>
                </div>
                <div className="space-y-3">
                  {task.parts.map((part, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-[#0200791F] rounded-xl border border-[#020079]/20 hover:border-[#E6C200] transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {part.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {part.quantity}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-[#020079]">
                        Rs {part.cost.toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900">Estimated Total</p>
                      <p className="text-2xl font-bold text-[#E6C200]">
                        Rs {task.estimatedCost?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Notes */}
            {task.notes && task.notes.length > 0 && (
              <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#FFD70029] rounded-lg">
                    <AlertCircle className="h-5 w-5 text-[#020079]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#020079]">
                    Notes & Remarks
                  </h2>
                </div>
                <ul className="space-y-2">
                  {task.notes.map((note, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-[#FFD70029] rounded-lg border border-[#E6C200]"
                    >
                      <div className="h-2 w-2 bg-[#E6C200] rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700">{note}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-[#0200791F] transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-[#020079] rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#020079]">
                  Customer Details
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Name</p>
                  <p className="font-semibold text-gray-900 text-lg">
                    {task.customer}
                  </p>
                </div>
                {task.customerPhone && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#020079]/20">
                    <Phone className="h-4 w-4 text-[#020079] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900 truncate">
                        {task.customerPhone}
                      </p>
                    </div>
                  </div>
                )}
                {task.customerEmail && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#020079]/20">
                    <Mail className="h-4 w-4 text-[#020079] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-medium text-gray-900 truncate">
                        {task.customerEmail}
                      </p>
                    </div>
                  </div>
                )}
                {task.customerAddress && (
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#020079]/20">
                    <MapPin className="h-4 w-4 text-[#020079] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-600">Address</p>
                      <p className="font-medium text-gray-900">
                        {task.customerAddress}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-[#0200791F] rounded-lg">
                  <Calendar className="h-5 w-5 text-[#020079]" />
                </div>
                <h2 className="text-xl font-bold text-[#020079]">Timeline</h2>
              </div>
              <div className="space-y-4">
                {task.assignedDate && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#0200791F] rounded-lg mt-1">
                      <Clock className="h-4 w-4 text-[#020079]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Assigned
                      </p>
                      <p className="text-sm text-gray-600">
                        {task.assignedDate}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg mt-1">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Deadline
                    </p>
                    <p className="text-sm text-gray-600">{task.deadline}</p>
                  </div>
                </div>
                {task.status === "completed" && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#FFD70029] rounded-lg mt-1">
                      <CheckCircle2 className="h-4 w-4 text-[#E6C200]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Completed
                      </p>
                      <p className="text-sm text-gray-600">
                        Task finished successfully
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white transition-all duration-300">
              <h3 className="font-bold text-[#020079] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {task.status === "not_started" && (
                  <Button className="w-full bg-gradient-to-r from-[#020079] to-[#01024D] hover:from-[#03009B] hover:to-[#020079] text-white">
                    Start Task
                  </Button>
                )}
                {task.status === "in_progress" && (
                  <>
                    <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white">
                      Pause Task
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-[#E6C200] to-[#E6C200] hover:from-[#E6C200]/90 hover:to-[#E6C200]/90 text-[#020079] font-semibold">
                      Mark as Complete
                    </Button>
                  </>
                )}
                {task.status === "paused" && (
                  <Button className="w-full bg-gradient-to-r from-[#020079] to-[#01024D] hover:from-[#03009B] hover:to-[#020079] text-white">
                    Resume Task
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full border-[#020079]/30 hover:bg-[#0200791F] hover:border-[#020079] text-[#020079]"
                >
                  Contact Customer
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#020079]/30 hover:bg-[#0200791F] hover:border-[#020079] text-[#020079]"
                >
                  Add Note
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}
