"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

// Dynamically import Recharts components to reduce initial bundle size
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), {
  ssr: false,
  loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg" />
});

const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

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
};
//   employees: [
//     { id: '1', name: 'John Doe', role: 'Mechanic', status: 'active', assignedTasks: 2 },
//     { id: '2', name: 'Jane Smith', role: 'Electrician', status: 'busy', assignedTasks: 3 },
//     { id: '3', name: 'Mike Johnson', role: 'Painter', status: 'active', assignedTasks: 1 }
//   ],
//   // No schedule data needed
// };

// // Mock components will be added here when needed

// const MockProjectForm = ({ onSuccess }: { onSuccess: () => void }) => (
//   <Card className="w-[500px] p-6">
//     <CardHeader>
//       <CardTitle>New Project</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <form className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Project Name</label>
//           <input type="text" className="w-full border rounded p-2" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <textarea className="w-full border rounded p-2" rows={3} />
//         </div>
//         <div className="flex justify-end space-x-2">
//           <Button variant="outline" onClick={onSuccess}>Cancel</Button>
//           <Button onClick={onSuccess}>Create Project</Button>
//         </div>
//       </form>
//     </CardContent>
//   </Card>
// );

export default function ManagerDashboardPage() {

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
              <div className="text-4xl font-bebas text-[#020079] mb-2">{MOCK_DATA.stats.activeEmployees.total}</div>
              <p className="text-sm font-roboto text-[#020079]/70">
                 Available: {MOCK_DATA.stats.activeEmployees.available}
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
              <div className="text-4xl font-bebas text-[#020079] mb-2">{MOCK_DATA.stats.ongoingServices}</div>
              <p className="text-sm font-roboto text-[#020079]/70">Currently Active</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#020079]/20 hover:border-[#FFD700]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Projects Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">{MOCK_DATA.stats.projectsPending}</div>
              <p className="text-sm font-roboto text-[#020079]/70">Awaiting Assignment</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#020079]/20 hover:border-[#020079]/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-roboto text-[#020079]/60">
                Avg Completion Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bebas text-[#020079] mb-2">{MOCK_DATA.stats.avgCompletionTime}</div>
              <p className="text-sm font-roboto text-[#020079]/70">Hours per Service</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="border border-[#FFD700]/30 hover:border-[#FFD700] transition-all duration-300 bg-white">
          <CardHeader className="border-b border-[#FFD700]/20">
            <CardTitle className="text-base font-roboto font-semibold text-[#020079]">Task Distribution by Employee</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
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
                    fill="#020079"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs font-roboto text-[#020079]/60 mt-2 text-center">
              Distribution of tasks across team members
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#020079]/20 hover:border-[#020079] transition-all duration-300 bg-white">
          <CardHeader className="border-b border-[#020079]/10">
            <CardTitle className="text-base font-roboto font-semibold text-[#020079]">Completion Rate Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
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
                  <Line type="monotone" dataKey="rate" stroke="#020079" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs font-roboto text-[#020079]/60 mt-2 text-center">
              Monthly service completion rate (%)
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
