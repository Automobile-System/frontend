"use client";

import { useState, useEffect } from "react";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Clock,
  Award,
  DollarSign,
  Target,
  Activity,
  Zap,
  TrendingDown,
  CheckCircle2,
} from "lucide-react";

// Types
interface EarningsBreakdown {
  baseSalary: number;
  performanceBonus: number;
  demandBonus: number;
  overtimeHours: number;
  overtimeAmount: number;
  totalEarnings: number;
}

interface MonthlyData {
  month: string;
  tasksCompleted: number;
  avgCompletionTime: number;
  rating: number;
}

interface ServiceTypeData {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

export default function PerformancePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("November 2025");

  const [earnings, setEarnings] = useState<EarningsBreakdown>({
    baseSalary: 75000,
    performanceBonus: 12500,
    demandBonus: 8200,
    overtimeHours: 12,
    overtimeAmount: 5400,
    totalEarnings: 101100,
  });

  const [demandPercentage, setDemandPercentage] = useState(78);

  // Mock data for charts
  const monthlyTaskData: MonthlyData[] = [
    { month: "May", tasksCompleted: 18, avgCompletionTime: 2.5, rating: 4.6 },
    { month: "Jun", tasksCompleted: 22, avgCompletionTime: 2.3, rating: 4.7 },
    { month: "Jul", tasksCompleted: 25, avgCompletionTime: 2.1, rating: 4.8 },
    { month: "Aug", tasksCompleted: 28, avgCompletionTime: 2.0, rating: 4.8 },
    { month: "Sep", tasksCompleted: 24, avgCompletionTime: 2.2, rating: 4.7 },
    { month: "Oct", tasksCompleted: 30, avgCompletionTime: 1.9, rating: 4.9 },
    { month: "Nov", tasksCompleted: 32, avgCompletionTime: 1.8, rating: 4.8 },
  ];

  const serviceTypeData: ServiceTypeData[] = [
    { type: "Engine Repair", count: 45, percentage: 35, color: "bg-blue-500" },
    {
      type: "Brake Service",
      count: 32,
      percentage: 25,
      color: "bg-emerald-500",
    },
    { type: "Oil Change", count: 25, percentage: 20, color: "bg-purple-500" },
    {
      type: "Tire Rotation",
      count: 18,
      percentage: 14,
      color: "bg-orange-500",
    },
    { type: "Others", count: 8, percentage: 6, color: "bg-gray-400" },
  ];

  useEffect(() => {
    // Simulate data loading
    // TODO: Replace with actual API call
    // fetch('/api/employee/performance')
    //   .then(res => res.json())
    //   .then(data => setEarnings(data));

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const maxTasks = Math.max(...monthlyTaskData.map((d) => d.tasksCompleted));

  return (
    <EmployeeLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Performance & Earnings
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Track your performance metrics and earnings
            </p>
          </div>
          <Badge className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold">
            {selectedMonth}
          </Badge>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">
                Loading performance data...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Statistics Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Earnings Card */}
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Earnings
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  LKR {(earnings.totalEarnings / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-emerald-600 mt-2 font-semibold">
                  +12.5% from last month
                </p>
              </Card>

              {/* Tasks Completed Card */}
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Tasks This Month
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {monthlyTaskData[monthlyTaskData.length - 1].tasksCompleted}
                </p>
                <p className="text-xs text-blue-600 mt-2 font-semibold">
                  +6.7% completion rate
                </p>
              </Card>

              {/* Avg Completion Time Card */}
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <Clock className="h-6 w-6 text-gray-700" />
                  </div>
                  <TrendingDown className="h-5 w-5 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Avg Completion
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {
                    monthlyTaskData[monthlyTaskData.length - 1]
                      .avgCompletionTime
                  }
                  h
                </p>
                <p className="text-xs text-emerald-600 mt-2 font-semibold">
                  -15% faster than avg
                </p>
              </Card>

              {/* Customer Demand Card */}
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Demand Score
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {demandPercentage}%
                </p>
                <p className="text-xs text-blue-600 mt-2 font-semibold">
                  High customer demand
                </p>
              </Card>
            </div>

            {/* Earnings Breakdown Section */}
            <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Monthly Earnings Breakdown
                  </h2>
                  <p className="text-sm text-gray-600">
                    Detailed view of your compensation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Earnings Items */}
                <div className="space-y-4">
                  {/* Base Salary */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-12 bg-blue-600 rounded-full" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">
                          Base Salary
                        </p>
                        <p className="text-xs text-gray-500">
                          Fixed monthly income
                        </p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-blue-700">
                      LKR {earnings.baseSalary.toLocaleString()}
                    </p>
                  </div>

                  {/* Performance Bonus */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-12 bg-emerald-600 rounded-full" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">
                          Performance Bonus
                        </p>
                        <p className="text-xs text-gray-500">Rating: 4.8/5.0</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-emerald-700">
                      LKR {earnings.performanceBonus.toLocaleString()}
                    </p>
                  </div>

                  {/* Demand Bonus */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-12 bg-purple-600 rounded-full" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">
                          Demand Bonus
                        </p>
                        <p className="text-xs text-gray-500">
                          Popularity: {demandPercentage}%
                        </p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-purple-700">
                      LKR {earnings.demandBonus.toLocaleString()}
                    </p>
                  </div>

                  {/* Overtime */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-12 bg-orange-600 rounded-full" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">
                          Overtime Pay
                        </p>
                        <p className="text-xs text-gray-500">
                          {earnings.overtimeHours} hours
                        </p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-orange-700">
                      LKR {earnings.overtimeAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Right Column - Visual Breakdown & Total */}
                <div className="space-y-4">
                  {/* Visual Bar Chart */}
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-4">
                      Earnings Distribution
                    </p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Base</span>
                          <span className="text-xs font-semibold text-gray-700">
                            {(
                              (earnings.baseSalary / earnings.totalEarnings) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                            style={{
                              width: `${
                                (earnings.baseSalary / earnings.totalEarnings) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">
                            Performance
                          </span>
                          <span className="text-xs font-semibold text-gray-700">
                            {(
                              (earnings.performanceBonus /
                                earnings.totalEarnings) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                            style={{
                              width: `${
                                (earnings.performanceBonus /
                                  earnings.totalEarnings) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Demand</span>
                          <span className="text-xs font-semibold text-gray-700">
                            {(
                              (earnings.demandBonus / earnings.totalEarnings) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                            style={{
                              width: `${
                                (earnings.demandBonus /
                                  earnings.totalEarnings) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">
                            Overtime
                          </span>
                          <span className="text-xs font-semibold text-gray-700">
                            {(
                              (earnings.overtimeAmount /
                                earnings.totalEarnings) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                            style={{
                              width: `${
                                (earnings.overtimeAmount /
                                  earnings.totalEarnings) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Earnings Highlight */}
                  <div className="p-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                    <p className="text-sm font-medium text-white/90 mb-2">
                      Total Monthly Earnings
                    </p>
                    <p className="text-4xl font-bold text-white mb-2">
                      LKR {earnings.totalEarnings.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 text-white/90">
                      <TrendingUp className="h-4 w-4" />
                      <p className="text-sm">+12.5% from last month</p>
                    </div>
                  </div>

                  {/* Performance Message */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          Excellent Work!
                        </p>
                        <p className="text-xs text-gray-600">
                          Your high rating ({demandPercentage}% demand score) is
                          increasing customer requests and bonuses.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Performance Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tasks Completed - Bar Chart */}
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Tasks per Month
                    </h2>
                    <p className="text-xs text-gray-600">
                      Monthly completion trend
                    </p>
                  </div>
                </div>

                <div className="h-64">
                  <div className="flex items-end justify-between h-full gap-2 px-2">
                    {monthlyTaskData.map((data, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <div className="relative w-full group">
                          <div
                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500 cursor-pointer"
                            style={{
                              height: `${
                                (data.tasksCompleted / maxTasks) * 200
                              }px`,
                              minHeight: "20px",
                            }}
                          />
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-xl">
                              <p className="font-semibold">
                                {data.tasksCompleted} tasks
                              </p>
                              <p className="text-gray-300">{data.month} 2025</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-gray-600">
                          {data.month}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Peak:{" "}
                      <span className="font-bold text-gray-900">
                        {maxTasks} tasks
                      </span>
                    </span>
                    <span className="text-gray-600">
                      Average:{" "}
                      <span className="font-bold text-gray-900">
                        {(
                          monthlyTaskData.reduce(
                            (acc, d) => acc + d.tasksCompleted,
                            0
                          ) / monthlyTaskData.length
                        ).toFixed(1)}{" "}
                        tasks
                      </span>
                    </span>
                  </div>
                </div>
              </Card>

              {/* Completion Time Trend - Line Chart */}
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Average Completion Time
                    </h2>
                    <p className="text-xs text-gray-600">
                      Hours per task trend
                    </p>
                  </div>
                </div>

                <div className="h-64 relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="border-t border-gray-100" />
                    ))}
                  </div>

                  {/* Line chart */}
                  <svg
                    className="w-full h-full relative z-10"
                    viewBox="0 0 400 200"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="lineGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                      <linearGradient
                        id="areaGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#a855f7"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#a855f7"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    {/* Area under line */}
                    <path
                      d={`M 0 ${
                        200 - (monthlyTaskData[0].avgCompletionTime / 3) * 200
                      } ${monthlyTaskData
                        .map(
                          (d, i) =>
                            `L ${(i / (monthlyTaskData.length - 1)) * 400} ${
                              200 - (d.avgCompletionTime / 3) * 200
                            }`
                        )
                        .join(" ")} L 400 200 L 0 200 Z`}
                      fill="url(#areaGradient)"
                    />

                    {/* Line */}
                    <polyline
                      points={monthlyTaskData
                        .map(
                          (d, i) =>
                            `${(i / (monthlyTaskData.length - 1)) * 400},${
                              200 - (d.avgCompletionTime / 3) * 200
                            }`
                        )
                        .join(" ")}
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Points */}
                    {monthlyTaskData.map((d, i) => (
                      <circle
                        key={i}
                        cx={(i / (monthlyTaskData.length - 1)) * 400}
                        cy={200 - (d.avgCompletionTime / 3) * 200}
                        r="5"
                        fill="#ffffff"
                        stroke="#a855f7"
                        strokeWidth="3"
                        className="hover:r-7 transition-all cursor-pointer"
                      >
                        <title>
                          {d.month}: {d.avgCompletionTime}h
                        </title>
                      </circle>
                    ))}
                  </svg>

                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 mt-2">
                    {monthlyTaskData.map((data, index) => (
                      <span
                        key={index}
                        className="text-xs font-semibold text-gray-600"
                      >
                        {data.month}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Current:{" "}
                      <span className="font-bold text-purple-600">
                        {
                          monthlyTaskData[monthlyTaskData.length - 1]
                            .avgCompletionTime
                        }
                        h
                      </span>
                    </span>
                    <span className="text-gray-600 flex items-center gap-1">
                      <TrendingDown className="h-4 w-4 text-emerald-600" />
                      <span className="font-bold text-emerald-600">
                        -28% improvement
                      </span>
                    </span>
                  </div>
                </div>
              </Card>

              {/* Customer Rating Trend - Line Chart */}
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Customer Rating Trend
                    </h2>
                    <p className="text-xs text-gray-600">
                      Monthly rating performance
                    </p>
                  </div>
                </div>

                <div className="h-64 relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[5.0, 4.5, 4.0, 3.5, 3.0].map((rating, i) => (
                      <div key={i} className="flex items-center">
                        <span className="text-xs text-gray-400 w-8">
                          {rating}
                        </span>
                        <div className="flex-1 border-t border-gray-100" />
                      </div>
                    ))}
                  </div>

                  {/* Rating line chart */}
                  <svg
                    className="w-full h-full relative z-10 pl-8"
                    viewBox="0 0 400 200"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="ratingGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#dc2626" />
                      </linearGradient>
                    </defs>

                    {/* Line */}
                    <polyline
                      points={monthlyTaskData
                        .map(
                          (d, i) =>
                            `${(i / (monthlyTaskData.length - 1)) * 380},${
                              200 - ((d.rating - 3) / 2) * 200
                            }`
                        )
                        .join(" ")}
                      fill="none"
                      stroke="url(#ratingGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Points with stars */}
                    {monthlyTaskData.map((d, i) => (
                      <g key={i}>
                        <circle
                          cx={(i / (monthlyTaskData.length - 1)) * 380}
                          cy={200 - ((d.rating - 3) / 2) * 200}
                          r="6"
                          fill="#ffffff"
                          stroke="#f97316"
                          strokeWidth="3"
                        />
                        <title>
                          {d.month}: {d.rating}/5.0
                        </title>
                      </g>
                    ))}
                  </svg>

                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-8 right-0 flex justify-between px-2 mt-2">
                    {monthlyTaskData.map((data, index) => (
                      <span
                        key={index}
                        className="text-xs font-semibold text-gray-600"
                      >
                        {data.month}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Current:{" "}
                      <span className="font-bold text-orange-600">
                        {monthlyTaskData[monthlyTaskData.length - 1].rating}/5.0
                      </span>
                    </span>
                    <span className="text-gray-600">
                      Average:{" "}
                      <span className="font-bold text-gray-900">
                        {(
                          monthlyTaskData.reduce(
                            (acc, d) => acc + d.rating,
                            0
                          ) / monthlyTaskData.length
                        ).toFixed(2)}
                        /5.0
                      </span>
                    </span>
                  </div>
                </div>
              </Card>

              {/* Service Type Distribution - Horizontal Bar Chart */}
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Service Type Distribution
                    </h2>
                    <p className="text-xs text-gray-600">
                      Work category breakdown
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {serviceTypeData.map((service, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 ${service.color} rounded-full`}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {service.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">
                            {service.count} tasks
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            {service.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${service.color} rounded-full transition-all duration-500 group-hover:opacity-80`}
                          style={{ width: `${service.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Total Services:{" "}
                      <span className="font-bold text-gray-900">
                        {serviceTypeData.reduce((acc, s) => acc + s.count, 0)}{" "}
                        tasks
                      </span>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </EmployeeLayout>
  );
}
