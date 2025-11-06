"use client";

"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function EmployeeDashboard() {
  // Sample data for the summary cards
  const summaryData = {
    name: "John Doe",
    tasksToday: 4,
    completedTasks: 21,
    totalHours: 72,
    rating: 4.8,
  };

  // Sample data for the bar chart
  const dailyHoursData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Hours Worked",
        data: [8, 7.5, 8.2, 6.5, 8],
        backgroundColor: "#FF6B6B",
      },
    ],
  };

  // Sample data for the line chart
  const ratingData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Customer Ratings",
        data: [4.5, 4.7, 4.6, 4.8],
        borderColor: "#4CAF50",
        tension: 0.4,
      },
    ],
  };

  return (
    <EmployeeLayout>
      <div className="space-y-8">
        {/* Dashboard Header */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back, {summaryData.name || "Employee"}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Track your daily performance metrics and task progress at a glance.
            Your dashboard shows today is assigned tasks, monthly completion
            rates, total hours logged, and customer satisfaction ratings. Stay
            organized and maintain high service quality.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-gray-100/50 hover:border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Tasks Today
            </h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-[#FF6B6B]">
                {summaryData.tasksToday}
              </p>
              <p className="text-sm text-gray-500 mb-1">Assigned</p>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-gray-100/50 hover:border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Completed Tasks
            </h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-emerald-500">
                {summaryData.completedTasks}
              </p>
              <p className="text-sm text-gray-500 mb-1">This Month</p>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-gray-100/50 hover:border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Hours Logged
            </h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-blue-500">
                {summaryData.totalHours}
              </p>
              <p className="text-sm text-gray-500 mb-1">This Month</p>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-gray-100/50 hover:border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Rating</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-yellow-500">
                {summaryData.rating}
              </p>
              <p className="text-sm text-gray-500 mb-1">Out of 5</p>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-gray-100/50 hover:border-gray-200">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Daily Work Hours
            </h3>
            <Bar
              data={{
                ...dailyHoursData,
                datasets: [
                  {
                    ...dailyHoursData.datasets[0],
                    backgroundColor: "#1a1a1a",
                    borderRadius: 6,
                    hoverBackgroundColor: "#333333",
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 10,
                    grid: {
                      color: "#f0f0f0",
                    },
                    ticks: {
                      font: {
                        family: "Inter, system-ui, sans-serif",
                      },
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      font: {
                        family: "Inter, system-ui, sans-serif",
                      },
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </Card>

          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-gray-100/50 hover:border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Customer Ratings Over Time
              </h3>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 hover:bg-green-200"
              >
                Last 30 Days
              </Badge>
            </div>
            <Line
              data={{
                ...ratingData,
                datasets: [
                  {
                    ...ratingData.datasets[0],
                    borderColor: "#10B981",
                    backgroundColor: "#10B981",
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5,
                    grid: {
                      color: "#f0f0f0",
                    },
                    ticks: {
                      font: {
                        family: "Inter, system-ui, sans-serif",
                      },
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      font: {
                        family: "Inter, system-ui, sans-serif",
                      },
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </Card>
        </div>
      </div>
    </EmployeeLayout>
  );
}
