"use client";

import React from "react";
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

// Mock data - in production, this would come from API
const mockTasks: Record<string, Task> = {
  "1": {
    id: "1",
    title: "Oil Change",
    vehicle: "Toyota Corolla",
    plateNumber: "KA-1234",
    deadline: "2024-12-10 17:00",
    customer: "John Doe",
    status: "in_progress",
    timeElapsedSeconds: 5025,
    description:
      "Complete oil change service including oil filter replacement. Check all fluid levels and perform basic inspection.",
    customerPhone: "+1 (555) 123-4567",
    customerEmail: "john.doe@email.com",
    customerAddress: "123 Main Street, Springfield, IL 62701",
    assignedDate: "2024-12-08 09:00",
    priority: "high",
    vehicleModel: "Toyota Corolla LE",
    vehicleYear: 2020,
    vehicleMileage: 45230,
    estimatedCost: 75.0,
    parts: [
      { name: "Synthetic Oil (5W-30)", cost: 45.0, quantity: 5 },
      { name: "Oil Filter", cost: 15.0, quantity: 1 },
      { name: "Drain Plug Gasket", cost: 5.0, quantity: 1 },
    ],
    notes: [
      "Customer mentioned slight engine noise - investigate during oil change",
      "Previous service: 6 months ago at 38,500 miles",
      "Customer prefers synthetic oil",
    ],
  },
  "2": {
    id: "2",
    title: "Brake Check",
    vehicle: "Honda Civic",
    plateNumber: "KA-5678",
    deadline: "2024-12-11 12:00",
    customer: "Jane Smith",
    status: "not_started",
    timeElapsedSeconds: 0,
    description:
      "Comprehensive brake system inspection. Check brake pads, rotors, calipers, and brake fluid condition.",
    customerPhone: "+1 (555) 234-5678",
    customerEmail: "jane.smith@email.com",
    customerAddress: "456 Oak Avenue, Springfield, IL 62702",
    assignedDate: "2024-12-09 14:00",
    priority: "medium",
    vehicleModel: "Honda Civic EX",
    vehicleYear: 2019,
    vehicleMileage: 62100,
    estimatedCost: 120.0,
    parts: [
      { name: "Brake Pads (Front)", cost: 80.0, quantity: 1 },
      { name: "Brake Fluid", cost: 25.0, quantity: 1 },
    ],
    notes: [
      "Customer reports squeaking noise when braking",
      "Schedule for test drive after service",
    ],
  },
  "3": {
    id: "3",
    title: "Tire Rotation",
    vehicle: "Ford F-150",
    plateNumber: "KA-9012",
    deadline: "2024-12-09 15:00",
    customer: "Mike Johnson",
    status: "completed",
    timeElapsedSeconds: 7200,
    description:
      "Rotate all four tires and check tire pressure. Inspect for unusual wear patterns.",
    customerPhone: "+1 (555) 345-6789",
    customerEmail: "mike.johnson@email.com",
    customerAddress: "789 Pine Road, Springfield, IL 62703",
    assignedDate: "2024-12-07 10:00",
    priority: "low",
    vehicleModel: "Ford F-150 XLT",
    vehicleYear: 2021,
    vehicleMileage: 28450,
    estimatedCost: 50.0,
    notes: [
      "Service completed successfully",
      "All tires in good condition",
      "Recommended next rotation at 35,000 miles",
    ],
  },
};

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const task = mockTasks[params.id];

  if (!task) {
    return (
      <EmployeeLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Task Not Found</h2>
            <p className="text-gray-600 mb-4">
              The task you're looking for doesn't exist.
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
        return "bg-emerald-500";
      case "in_progress":
        return "bg-blue-500";
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
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.push("/employee/tasks")}
            className="mb-4 bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all shadow-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tasks
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
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
            <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clipboard className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Task Description
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {task.description}
              </p>
            </Card>

            {/* Vehicle Information */}
            <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Car className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Vehicle Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Vehicle</p>
                  <p className="font-semibold text-gray-900">
                    {task.vehicleModel || task.vehicle}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Plate Number</p>
                  <p className="font-semibold text-gray-900">
                    {task.plateNumber}
                  </p>
                </div>
                {task.vehicleYear && (
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Year</p>
                    <p className="font-semibold text-gray-900">
                      {task.vehicleYear}
                    </p>
                  </div>
                )}
                {task.vehicleMileage && (
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
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
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Wrench className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Parts & Materials
                  </h2>
                </div>
                <div className="space-y-3">
                  {task.parts.map((part, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-200 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {part.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {part.quantity}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        Rs {part.cost.toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900">Estimated Total</p>
                      <p className="text-2xl font-bold text-green-600">
                        Rs {task.estimatedCost?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Notes */}
            {task.notes && task.notes.length > 0 && (
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Notes & Remarks
                  </h2>
                </div>
                <ul className="space-y-2">
                  {task.notes.map((note, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100"
                    >
                      <div className="h-2 w-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
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
            <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
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
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-200">
                    <Phone className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900 truncate">
                        {task.customerPhone}
                      </p>
                    </div>
                  </div>
                )}
                {task.customerEmail && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-200">
                    <Mail className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-medium text-gray-900 truncate">
                        {task.customerEmail}
                      </p>
                    </div>
                  </div>
                )}
                {task.customerAddress && (
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-blue-200">
                    <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0 mt-1" />
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
            <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Timeline</h2>
              </div>
              <div className="space-y-4">
                {task.assignedDate && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg mt-1">
                      <Clock className="h-4 w-4 text-gray-600" />
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
                    <div className="p-2 bg-green-100 rounded-lg mt-1">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
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
            <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {task.status === "not_started" && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Start Task
                  </Button>
                )}
                {task.status === "in_progress" && (
                  <>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                      Pause Task
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Mark as Complete
                    </Button>
                  </>
                )}
                {task.status === "paused" && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Resume Task
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
                >
                  Contact Customer
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
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
