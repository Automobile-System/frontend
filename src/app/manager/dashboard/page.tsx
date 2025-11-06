"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

// Mock data for static UI development
const MOCK_DATA = {
  alerts: [
    { type: 'warning', message: '2 services paused due to part delay' },
    { type: 'warning', message: 'Employee "Kamal Perera" at maximum workload capacity' }
  ],
  stats: {
    activeEmployees: {
      total: 25,
      available: 18
    },
    ongoingServices: 18,
    projectsPending: 5,
    avgCompletionTime: 3.2
  },
  employees: [
    { id: '1', name: 'John Doe', role: 'Mechanic', status: 'active', assignedTasks: 2 },
    { id: '2', name: 'Jane Smith', role: 'Electrician', status: 'busy', assignedTasks: 3 },
    { id: '3', name: 'Mike Johnson', role: 'Painter', status: 'active', assignedTasks: 1 }
  ],
  // No schedule data needed
};

// Mock components will be added here when needed

const MockProjectForm = ({ onSuccess }: { onSuccess: () => void }) => (
  <Card className="w-[500px] p-6">
    <CardHeader>
      <CardTitle>New Project</CardTitle>
    </CardHeader>
    <CardContent>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input type="text" className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea className="w-full border rounded p-2" rows={3} />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onSuccess}>Cancel</Button>
          <Button onClick={onSuccess}>Create Project</Button>
        </div>
      </form>
    </CardContent>
  </Card>
);

export default function ManagerDashboardPage() {
  const [showProjectForm, setShowProjectForm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        
        
       

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] cursor-pointer border-l-4 border-l-emerald-500">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">ACTIVE EMPLOYEES</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{MOCK_DATA.stats.activeEmployees.total}</div>
              <div className="text-sm text-green-600 mt-1">
                ✓ Available: {MOCK_DATA.stats.activeEmployees.available}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] cursor-pointer border-l-4 border-l-emerald-500">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">ONGOING SERVICES</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{MOCK_DATA.stats.ongoingServices}</div>
              <div className="text-sm text-blue-600 mt-1">Currently Active</div>
            </CardContent>
          </Card>

          <Card className="bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] cursor-pointer border-l-4 border-l-emerald-500">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">PROJECTS PENDING</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{MOCK_DATA.stats.projectsPending}</div>
              <div className="text-sm text-orange-600 mt-1">Awaiting Assignment</div>
            </CardContent>
          </Card>

          <Card className="bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] cursor-pointer border-l-4 border-l-emerald-500">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">AVG COMPLETION TIME</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{MOCK_DATA.stats.avgCompletionTime}</div>
              <div className="text-sm text-emerald-600 mt-1">Hours per Service</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] cursor-pointer border-l-4 border-l-emerald-500">
          <CardHeader>
            <CardTitle className="font-medium text-gray-700">Task Distribution by Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Kuwan", value: 18 },
                      { name: "Kamal", value: 25 },
                      { name: "Nimal", value: 15 },
                      { name: "Amal", value: 22 },
                      { name: "Others", value: 20 }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#10b981"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Distribution of tasks across team members
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] cursor-pointer border-l-4 border-l-emerald-500">
          <CardHeader>
            <CardTitle className="font-medium text-gray-700">Completion Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: 'Jan', rate: 83 },
                    { month: 'Feb', rate: 88 },
                    { month: 'Mar', rate: 92 },
                    { month: 'Apr', rate: 90 },
                    { month: 'May', rate: 94 }
                  ]}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Monthly service completion rate (%)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <MockProjectForm onSuccess={() => setShowProjectForm(false)} />
          </div>
        </div>
      )}

    </div>
  );
}
