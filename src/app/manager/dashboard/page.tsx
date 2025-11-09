"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import type { TooltipProps } from "recharts/types/component/Tooltip";

import {
  getOverview,
  getEmployeeEfficiency,
  getCompletionRateTrend,
} from "@/services/api";
import {
  ManagerDashboardOverview,
  PieChartData,
  ReportsResponse,
  CompletionRateTrendResponse,
} from "@/types/authTypes";
import dynamic from "next/dynamic";

// Dynamically import Recharts components to reduce initial bundle size
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), {
  ssr: false,
  loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg" />,
});

const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), {
  ssr: false,
});
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false }
);
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

interface CompletionRateChartPoint {
  month: string;
  rate: number;
  completedTasks: number;
  totalTasks: number;
}

type CompletionTooltipProps = TooltipProps<ValueType, NameType>;

const completionTooltipFormatter: CompletionTooltipProps["formatter"] = (
  value,
  name
) => {
  if (name === "rate" && typeof value === "number") {
    return [`${value.toFixed(1)}%`, "Completion Rate"];
  }

  if (Array.isArray(value)) {
    return [value.join(", "), String(name ?? "")];
  }

  return [String(value ?? ""), String(name ?? "")];
};

const completionTooltipLabelFormatter: CompletionTooltipProps["labelFormatter"] =
  (label, payload) => {
    const firstPoint = (
      payload?.[0] as Payload<ValueType, NameType> | undefined
    )?.payload as CompletionRateChartPoint | undefined;
    if (firstPoint) {
      return `${label} • ${firstPoint.completedTasks}/${firstPoint.totalTasks} jobs completed`;
    }
    return label;
  };

export default function ManagerDashboardPage() {
  const [dashboardData, setDashboardData] =
    useState<ManagerDashboardOverview | null>(null);
  const [taskDistributionData, setTaskDistributionData] = useState<
    PieChartData[]
  >([]);
  const [completionRateData, setCompletionRateData] = useState<
    CompletionRateChartPoint[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch both dashboard overview and task distribution
      const [overviewData, efficiencyReport, completionRateReport] =
        (await Promise.all([
          getOverview(),
          getEmployeeEfficiency(),
          getCompletionRateTrend(),
        ])) as [
          ManagerDashboardOverview,
          ReportsResponse,
          CompletionRateTrendResponse
        ];

      setDashboardData(overviewData);

      // Transform efficiency report data for pie chart
      if (efficiencyReport && efficiencyReport.data) {
        const chartData: PieChartData[] = Object.entries(
          efficiencyReport.data
        ).map(([name, value]) => ({
          name,
          value: value as number,
        }));
        setTaskDistributionData(chartData);
      }

      if (completionRateReport && completionRateReport.data) {
        const normalized: CompletionRateChartPoint[] = completionRateReport.data
          .filter((point) => point && point.month)
          .map((point) => ({
            month: point.month,
            rate: Number(point.rate ?? 0),
            completedTasks: point.completedTasks ?? 0,
            totalTasks: point.totalTasks ?? 0,
          }));
        setCompletionRateData(normalized);
      } else {
        setCompletionRateData([]);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="p-8 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079]"></div>
          <p className="mt-4 text-[#020079] font-roboto">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-8 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 font-roboto mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-[#020079] text-white rounded hover:bg-[#03009B] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No Data State
  if (!dashboardData) {
    return (
      <div className="p-8 bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-roboto">
          No dashboard data available.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Active Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {dashboardData.activeEmployees.total}
              </div>
              <p className="text-sm font-roboto text-[#020079]/70">
                Available: {dashboardData.activeEmployees.available}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Ongoing Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {dashboardData.ongoingServices.total}
              </div>
              <p className="text-sm font-roboto text-[#020079]/70">
                {dashboardData.ongoingServices.status}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#020079]/20 hover:border-[#FFD700]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Projects Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {dashboardData.projectsPending.total}
              </div>
              <p className="text-sm font-roboto text-[#020079]/70">
                {dashboardData.projectsPending.status}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Avg Completion Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">
                {dashboardData.avgCompletionTime.value}
              </div>
              <p className="text-sm font-roboto text-[#020079]/70">
                {dashboardData.avgCompletionTime.unit}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 bg-white">
          <CardHeader className="border-b border-[#FFD700]/20">
            <CardTitle className="text-base font-roboto font-semibold text-[#020079]">
              Task Distribution by Employee
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80">
              {taskDistributionData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#020079"
                      label
                      dataKey="value"
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No task distribution data available
                </div>
              )}
            </div>
            <div className="text-xs font-roboto text-[#020079]/60 mt-2 text-center">
              Distribution of tasks across team members
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
          <CardHeader className="border-b border-[#020079]/10">
            <CardTitle className="text-base font-roboto font-semibold text-[#020079]">
              Completion Rate Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80">
              {completionRateData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={completionRateData}>
                    <XAxis dataKey="month" />
                    <YAxis
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      formatter={completionTooltipFormatter}
                      labelFormatter={completionTooltipLabelFormatter}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#020079"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No completion data available
                </div>
              )}
            </div>
            <div className="text-xs font-roboto text-[#020079]/60 mt-2 text-center">
              {completionRateData.length > 0
                ? completionRateData
                    .map(
                      (point) =>
                        `${point.month}: ${point.rate.toFixed(1)}% (${
                          point.completedTasks
                        }/${point.totalTasks})`
                    )
                    .join(" • ")
                : "Monthly service completion rate (%)"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Form Modal */}
      {/* {false && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <MockProjectForm onSuccess={() => setShowProjectForm(false)} />
          </div>
        </div>
      )} */}
    </div>
  );
}
