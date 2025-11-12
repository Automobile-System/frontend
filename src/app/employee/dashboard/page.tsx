"use client";

import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [employeeName, setEmployeeName] = useState("Employee");
  const [summaryData, setSummaryData] = useState({
    tasksToday: 0,
    completedTasks: 0,
    totalHours: 0,
    rating: 0,
  });
  const [dailyHoursData, setDailyHoursData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Hours Worked",
        data: [] as number[],
        backgroundColor: "#020079",
      },
    ],
  });
  const [ratingData, setRatingData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Customer Ratings",
        data: [] as number[],
        borderColor: "#E6C200",
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const { getMyProfile, getDashboardSummary, getChartsData } = await import("@/services/employeeService");
        
        // Load all data in parallel
        const [profile, summary, charts] = await Promise.all([
          getMyProfile(),
          getDashboardSummary(),
          getChartsData(),
        ]);

        // Set employee name
        const name = profile.name || `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Employee";
        setEmployeeName(name);

        // Set summary data
        setSummaryData({
          tasksToday: summary.tasksToday || 0,
          completedTasks: summary.tasksCompletedThisMonth || 0,
          totalHours: Math.round(summary.totalHoursLoggedThisMonth || 0),
          rating: summary.averageRating || 0,
        });

        // Transform daily hours data for chart
        if (charts.dailyHoursData && charts.dailyHoursData.length > 0) {
          // Get last 5 days or available days
          const recentDays = charts.dailyHoursData.slice(-5);
          const labels = recentDays.map((item: Record<string, unknown>) => {
            // Format date to show day name (Mon, Tue, etc.)
            const date = new Date(String(item.date));
            return date.toLocaleDateString("en-US", { weekday: "short" });
          });
          const hours = recentDays.map((item: Record<string, unknown>) => Number(item.hours || 0));

          setDailyHoursData({
            labels,
            datasets: [
              {
                label: "Hours Worked",
                data: hours,
                backgroundColor: "#020079",
              },
            ],
          });
        }

        // Transform rating trend data for chart
        if (charts.ratingTrendData && charts.ratingTrendData.length > 0) {
          // Get recent rating data (last 4 weeks or available data)
          const recentRatings = charts.ratingTrendData.slice(-4);
          const labels = recentRatings.map((item: Record<string, unknown>, index: number) => {
            // Format as "Week X" or use date
            if (item.date) {
              return `Week ${index + 1}`;
            }
            return `Week ${index + 1}`;
          });
          const ratings = recentRatings.map((item: Record<string, unknown>) => Number(item.rating || 0));

          setRatingData({
            labels,
            datasets: [
              {
                label: "Customer Ratings",
                data: ratings,
                borderColor: "#E6C200",
                tension: 0.4,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <EmployeeLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading dashboard...</p>
          </div>
        </div>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <div className="space-y-8">
        {/* Dashboard Header */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#020079]/20">
          <h2 className="text-2xl font-bold text-[#020079] mb-2">
            Welcome Back, {employeeName}
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
          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-[#FFD700]/30 hover:border-[#E6C200]">
            <h3 className="text-sm font-medium text-[#020079] mb-2">
              Tasks Today
            </h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-[#020079]">
                {summaryData.tasksToday}
              </p>
              <p className="text-sm text-gray-500 mb-1">Assigned</p>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-[#FFD700]/30 hover:border-[#E6C200]">
            <h3 className="text-sm font-medium text-[#020079] mb-2">
              Completed Tasks
            </h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-[#020079]">
                {summaryData.completedTasks}
              </p>
              <p className="text-sm text-gray-500 mb-1">This Month</p>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-[#FFD700]/30 hover:border-[#E6C200]">
            <h3 className="text-sm font-medium text-[#020079] mb-2">
              Total Hours Logged
            </h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-[#020079]">
                {summaryData.totalHours}
              </p>
              <p className="text-sm text-gray-500 mb-1">This Month</p>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-[#FFD700]/30 hover:border-[#E6C200]">
            <h3 className="text-sm font-medium text-[#020079] mb-2">Rating</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-[#E6C200]">
                {summaryData.rating}
              </p>
              <p className="text-sm text-gray-500 mb-1">Out of 5</p>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-[#020079]/20 hover:border-[#020079]">
            <h3 className="text-xl font-semibold mb-6 text-[#020079]">
              Daily Work Hours
            </h3>
            {dailyHoursData.labels.length > 0 ? (
              <Bar
                data={{
                  labels: dailyHoursData.labels,
                  datasets: [
                    {
                      ...dailyHoursData.datasets[0],
                      backgroundColor: "#020079",
                      borderRadius: 6,
                      hoverBackgroundColor: "#03009B",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: dailyHoursData.datasets[0].data.length > 0
                        ? Math.max(10, Math.ceil(Math.max(...dailyHoursData.datasets[0].data) + 2))
                        : 10,
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
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <p>No daily hours data available</p>
              </div>
            )}
          </Card>

          <Card className="p-6 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-[#020079]/20 hover:border-[#020079]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#020079]">
                Customer Ratings Over Time
              </h3>
              <Badge
                variant="secondary"
                className="bg-[#FFD70029] text-[#020079] hover:bg-[#E6C200]/30 border border-[#E6C200]"
              >
                Last 30 Days
              </Badge>
            </div>
            {ratingData.labels.length > 0 ? (
              <Line
                data={{
                  labels: ratingData.labels,
                  datasets: [
                    {
                      ...ratingData.datasets[0],
                      borderColor: "#E6C200",
                      backgroundColor: "rgba(230, 194, 0, 0.1)",
                      tension: 0.4,
                      pointRadius: 5,
                      pointHoverRadius: 7,
                      pointBackgroundColor: "#ffffff",
                      pointBorderColor: "#E6C200",
                      pointBorderWidth: 2,
                      pointHoverBackgroundColor: "#E6C200",
                      pointHoverBorderColor: "#020079",
                      fill: true,
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
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <p>No rating data available</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </EmployeeLayout>
  );
}
