"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Timer, AlertCircle } from "lucide-react";

type TaskStatus = "not_started" | "in_progress" | "completed" | "paused";

interface Task {
  id: string;
  title: string;
  vehicle: string;
  plateNumber: string;
  deadline: string;
  customer?: string;
  status: TaskStatus;
  // tracked time in seconds
  timeElapsedSeconds?: number;
  // pause metadata
  pauseReason?: string;
  needsCustomerApproval?: boolean;
  approvalRequestedAt?: number;
  awaitingCustomerApproval?: boolean;
}

export default function AssignedTasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Oil Change",
      vehicle: "Toyota Corolla",
      plateNumber: "KA-1234",
      deadline: "2024-12-10 17:00",
      customer: "John Doe",
      status: "in_progress",
      timeElapsedSeconds: 5025, // 01:23:45
    },
    {
      id: "2",
      title: "Brake Check",
      vehicle: "Honda Civic",
      plateNumber: "KA-5678",
      deadline: "2024-12-11 12:00",
      customer: "Jane Smith",
      status: "not_started",
      timeElapsedSeconds: 0,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");

  const [showPauseModal, setShowPauseModal] = useState(false);
  const [pauseTargetTask, setPauseTargetTask] = useState<Task | null>(null);
  const [pauseReasonSelect, setPauseReasonSelect] = useState(
    "Need Manager Assistance"
  );
  const [pauseReasonNotes, setPauseReasonNotes] = useState("");
  const [pauseRequiresApproval, setPauseRequiresApproval] = useState(false);

  const timersRef = useRef<Record<string, number | null>>({});
  const approvalTimeoutsRef = useRef<Record<string, number | null>>({});

  // 24h default; can override during testing with NEXT_PUBLIC_APPROVAL_TIMEOUT_MS
  const APPROVAL_TIMEOUT_MS =
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_APPROVAL_TIMEOUT_MS
      ? Number(process.env.NEXT_PUBLIC_APPROVAL_TIMEOUT_MS)
      : 24 * 60 * 60 * 1000;

  const formatSeconds = (s = 0) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return [hrs, mins, secs].map((n) => String(n).padStart(2, "0")).join(":");
  };

  const startTimer = (taskId: string) => {
    if (timersRef.current[taskId]) return; // already running

    // ensure status is in_progress when starting
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "in_progress" } : t))
    );

    const intervalId = window.setInterval(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, timeElapsedSeconds: (t.timeElapsedSeconds || 0) + 1 }
            : t
        )
      );
    }, 1000);

    timersRef.current[taskId] = intervalId;
  };

  const stopTimer = (taskId: string) => {
    const id = timersRef.current[taskId];
    if (id) {
      clearInterval(id);
      timersRef.current[taskId] = null;
    }
  };

  const handleStart = (taskId: string) => {
    startTimer(taskId);
  };

  const handleComplete = (taskId: string) => {
    stopTimer(taskId);
    // mark completed and clear any pending approval wait
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: "completed", awaitingCustomerApproval: false }
          : t
      )
    );

    const timeoutId = approvalTimeoutsRef.current[taskId];
    if (timeoutId) {
      clearTimeout(timeoutId);
      approvalTimeoutsRef.current[taskId] = null;
    }
  };

  const openPauseModal = (task: Task) => {
    setPauseTargetTask(task);
    setPauseReasonSelect("Need Manager Assistance");
    setPauseReasonNotes("");
    setPauseRequiresApproval(!!task.needsCustomerApproval);
    setShowPauseModal(true);
  };

  const notifyCustomer = (task: Task) => {
    // TODO: replace with backend API
    console.info(
      `Notify customer for task ${task.id} (${task.customer}) about pause reason: ${task.pauseReason}`
    );
  };

  const notifyAdmin = (task: Task) => {
    // TODO: replace with backend API
    console.info(`Notify admin: customer did not respond for task ${task.id}`);
  };

  const scheduleApprovalCheck = (taskId: string) => {
    const timeoutId = window.setTimeout(() => {
      // if still awaiting approval at timeout, clear the flag and notify admin
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId && t.awaitingCustomerApproval
            ? { ...t, awaitingCustomerApproval: false }
            : t
        )
      );

      const t = tasks.find((x) => x.id === taskId);
      if (t && t.awaitingCustomerApproval) notifyAdmin(t);

      approvalTimeoutsRef.current[taskId] = null;
    }, APPROVAL_TIMEOUT_MS);

    approvalTimeoutsRef.current[taskId] = timeoutId;
  };

  const confirmPause = () => {
    if (!pauseTargetTask) return;
    const id = pauseTargetTask.id;

    // stop timer and set paused with metadata
    stopTimer(id);

    const fullReason = pauseReasonNotes.trim()
      ? `${pauseReasonSelect}: ${pauseReasonNotes}`
      : pauseReasonSelect;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "paused",
              pauseReason: fullReason,
              needsCustomerApproval: pauseRequiresApproval,
              approvalRequestedAt: pauseRequiresApproval
                ? Date.now()
                : undefined,
              awaitingCustomerApproval: !!pauseRequiresApproval,
            }
          : t
      )
    );

    if (pauseRequiresApproval) {
      notifyCustomer({ ...pauseTargetTask, pauseReason: fullReason });
      scheduleApprovalCheck(id);
    }

    setShowPauseModal(false);
    setPauseTargetTask(null);
    setPauseReasonSelect("Need Manager Assistance");
    setPauseReasonNotes("");
    setPauseRequiresApproval(false);
  };

  useEffect(() => {
    const timers = timersRef.current;
    const approvalTimeouts = approvalTimeoutsRef.current;
    
    return () => {
      Object.values(timers).forEach((id) => id && clearInterval(id));
      Object.values(approvalTimeouts).forEach(
        (id) => id && clearTimeout(id)
      );
    };
  }, []);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "not_started":
        return "bg-gray-100 text-gray-800";
      case "in_progress":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "paused":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      task.title.toLowerCase().includes(q) ||
      task.vehicle.toLowerCase().includes(q) ||
      task.plateNumber.toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <EmployeeLayout>
      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">
            Manage your assigned tasks and track progress in real-time
          </p>
        </div>

        {/* Description box */}
        <div className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-6 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Task Management Guide
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                View and manage your assigned vehicle maintenance and repair
                tasks. Keep track of deadlines and update task status as you
                progress. If a pause requires customer approval the customer
                will be notified; if they do not respond within 24 hours the
                admin will be alerted.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter box */}
        <div className="mb-8 bg-white rounded-xl shadow-md border border-gray-200 p-5">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by task, vehicle, or plate number..."
                className="pl-12 h-12 text-base bg-gray-50 border-gray-200 text-gray-900 rounded-xl w-full placeholder:text-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="h-12 px-5 text-base bg-gray-50 border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer transition-all font-medium"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as TaskStatus | "all")
              }
            >
              <option value="all">All Status</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>

        {/* Tasks grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              onClick={() => router.push(`/employee/tasks/${task.id}`)}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="p-6 relative">
                {/* Status indicator line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    task.status === "in_progress"
                      ? "bg-blue-500"
                      : task.status === "completed"
                      ? "bg-green-500"
                      : task.status === "paused"
                      ? "bg-amber-500"
                      : "bg-gray-300"
                  }`}
                />

                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="font-medium">{task.vehicle}</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {task.plateNumber}
                      </span>
                    </div>
                    {task.customer && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="font-medium text-gray-800">
                          {task.customer}
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(
                      task.status
                    )} shadow-sm`}
                  >
                    {task.status.replace("_", " ")}
                  </div>
                </div>

                {task.status === "paused" && task.pauseReason && (
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 shadow-sm">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="flex-1">
                        <div className="font-semibold text-yellow-900 text-sm mb-1">
                          Paused: {task.pauseReason}
                        </div>
                        {task.awaitingCustomerApproval && (
                          <div className="text-xs text-yellow-800 flex items-center gap-1.5 mt-2">
                            <span className="animate-pulse">⏳</span>
                            <span>
                              Awaiting customer response. Admin will be notified
                              if no response within 24 hours.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats section */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                        <Timer className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">
                          Time
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatSeconds(task.timeElapsedSeconds)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center shadow-sm">
                        <AlertCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-red-600 font-medium uppercase tracking-wide">
                          Deadline
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                          {task.deadline}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-center gap-3 mt-6">
                  {task.status === "not_started" && (
                    <>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStart(task.id);
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 h-11 rounded-xl"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Start Task
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPauseModal(task);
                        }}
                        className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 h-11 rounded-xl border-0"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Pause
                      </Button>
                    </>
                  )}

                  {task.status === "in_progress" && (
                    <>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPauseModal(task);
                        }}
                        className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 h-11 rounded-xl border-0"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Pause
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComplete(task.id);
                        }}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 h-11 rounded-xl"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Complete
                      </Button>
                    </>
                  )}

                  {task.status === "paused" && (
                    <>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStart(task.id);
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 h-11 rounded-xl"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Resume
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComplete(task.id);
                        }}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 h-11 rounded-xl"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Complete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {showPauseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl transform transition-all">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-t-2xl">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Pause Task
                </h3>
                <p className="text-orange-100 text-sm mt-1">
                  Provide details about why this task needs to be paused
                </p>
              </div>

              <div className="p-6">
                <label className="block text-sm font-semibold mb-2 text-gray-900">
                  Reason for Pausing
                </label>
                <select
                  value={pauseReasonSelect}
                  onChange={(e) => setPauseReasonSelect(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 mb-4 text-gray-900 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all font-medium"
                >
                  <option value="Need Manager Assistance">
                    Need Manager Assistance
                  </option>
                  <option value="Waiting for Parts">Waiting for Parts</option>
                  <option value="Customer Approval Required">
                    Customer Approval Required
                  </option>
                  <option value="End of Day">End of Day</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Other">Other</option>
                </select>

                <label className="block text-sm font-semibold mb-2 text-gray-900">
                  Additional Notes
                </label>
                <textarea
                  value={pauseReasonNotes}
                  onChange={(e) => setPauseReasonNotes(e.target.value)}
                  rows={4}
                  placeholder="Add any additional details about why you're pausing this task..."
                  className="w-full border-2 border-gray-200 rounded-xl p-3 mb-4 text-gray-900 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                />

                <div className="flex items-start gap-3 mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <input
                    id="reqApproval"
                    type="checkbox"
                    checked={pauseRequiresApproval}
                    onChange={(e) => setPauseRequiresApproval(e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label
                    htmlFor="reqApproval"
                    className="text-sm text-gray-900 font-medium cursor-pointer"
                  >
                    Requires customer approval (notify customer)
                  </label>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl text-sm text-yellow-900 border-l-4 border-yellow-400 mb-6">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="font-medium">
                      If customer approval is requested and the customer does
                      not respond within 24 hours the admin will be notified.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowPauseModal(false)}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmPause}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Confirm Pause
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
}
