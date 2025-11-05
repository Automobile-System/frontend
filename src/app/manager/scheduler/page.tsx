"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddTaskModal from "@/components/modals/AddTaskModal";
import AutoBalanceModal from "@/components/modals/AutoBalanceModal";

interface Task {
  id: string;
  employeeName: string;
  taskType: string;
  taskId: string;
  color: string;
}

interface DaySchedule {
  date: number;
  dayName: string;
  tasks: Task[];
  closed?: boolean;
}

export default function SchedulerPage() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAutoBalanceModal, setShowAutoBalanceModal] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(2025, 10, 4)); // November 4, 2025

  const INITIAL_SCHEDULE: DaySchedule[] = [
    {
      date: 4,
      dayName: "Monday",
      tasks: [
        { id: "1", employeeName: "Ruwan", taskType: "Oil Change", taskId: "#1243", color: "bg-teal-600" },
        { id: "2", employeeName: "Kamal", taskType: "Electrical", taskId: "#1250", color: "bg-blue-600" }
      ]
    },
    {
      date: 5,
      dayName: "Tuesday",
      tasks: [
        { id: "3", employeeName: "Kasun", taskType: "Brake Check", taskId: "#1244", color: "bg-orange-500" }
      ]
    },
    {
      date: 6,
      dayName: "Wednesday",
      tasks: [
        { id: "4", employeeName: "Nimal", taskType: "Body Paint", taskId: "#1246", color: "bg-teal-600" },
        { id: "5", employeeName: "Amal", taskType: "Transmission", taskId: "#1251", color: "bg-purple-600" }
      ]
    },
    {
      date: 7,
      dayName: "Thursday",
      tasks: [
        { id: "6", employeeName: "Ruwan", taskType: "Engine Diag", taskId: "#1252", color: "bg-teal-600" }
      ]
    },
    {
      date: 8,
      dayName: "Friday",
      tasks: [
        { id: "7", employeeName: "Kasun", taskType: "Full Service", taskId: "#1253", color: "bg-green-600" }
      ]
    },
    {
      date: 9,
      dayName: "Saturday",
      tasks: []
    },
    {
      date: 10,
      dayName: "Sunday",
      tasks: [],
      closed: true
    }
  ];

  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);

  const handlePreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const getWeekRange = () => {
    const endDate = new Date(currentWeekStart);
    endDate.setDate(endDate.getDate() + 6);
    
    const startMonth = currentWeekStart.toLocaleDateString('en-US', { month: 'long' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'long' });
    const year = currentWeekStart.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${currentWeekStart.getDate()}-${endDate.getDate()}, ${year}`;
    } else {
      return `${startMonth} ${currentWeekStart.getDate()}-${endMonth} ${endDate.getDate()}, ${year}`;
    }
  };

  const handleAutoBalance = () => {
    setShowAutoBalanceModal(true);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">📅</span>
        <h1 className="text-3xl font-bold text-gray-800">Workload Scheduler</h1>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6"
          onClick={() => setShowTaskModal(true)}
        >
          + Schedule New Task
        </Button>
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6"
          onClick={handleAutoBalance}
        >
          ⚖️ Auto-Balance Workload
        </Button>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold"
          onClick={handlePreviousWeek}
        >
          ← Previous Week
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">
          Week of {getWeekRange()}
        </h2>
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold"
          onClick={handleNextWeek}
        >
          Next Week →
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 mb-8">
        {schedule.map((day) => (
          <div
            key={day.date}
            className={`bg-white rounded-lg border shadow-sm p-4 min-h-[200px] ${
              day.closed ? "bg-red-50" : ""
            }`}
          >
            <div className="mb-3">
              <h3 className="font-semibold text-gray-700">{day.dayName}</h3>
              <p className="text-2xl font-bold text-gray-800">{day.date}</p>
            </div>
            
            {day.closed ? (
              <div className="text-center text-red-400 mt-8">
                <p className="font-medium">Closed</p>
              </div>
            ) : (
              <div className="space-y-2">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`${task.color} text-white rounded-md p-2.5 text-sm cursor-move hover:opacity-90 transition-opacity`}
                  >
                    <div className="flex items-start gap-1.5">
                      <span className="text-base">🔧</span>
                      <div className="flex-1">
                        <div className="font-medium leading-tight">
                          {task.employeeName} - {task.taskType}
                        </div>
                        <div className="text-xs mt-0.5">{task.taskId}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-2">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Drag & Drop Instructions:</h3>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Drag tasks to different days to reschedule</li>
              <li>• System automatically checks for conflicts</li>
              <li>• Employee notifications sent on schedule changes</li>
              <li>• Color coding: Blue=Engine, Orange=Brakes, Purple=Transmission, Green=General</li>
            </ul>
          </div>
        </div>
      </div>

      {/* System Protection */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <p className="text-green-800 flex items-center gap-2">
          <span className="text-lg">✓</span>
          <span>
            <strong>System Protection:</strong> Auto-balance prevents employee overwork | No duplicate bookings across customers
          </span>
        </p>
      </div>

      {/* Modals */}
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={(data) => {
          console.log("New task:", data);
          setShowTaskModal(false);
        }}
      />

      <AutoBalanceModal
        isOpen={showAutoBalanceModal}
        onClose={() => setShowAutoBalanceModal(false)}
      />
    </div>
  );
}
