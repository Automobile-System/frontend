"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { EmployeeHistoryModal } from "@/components/modals/EmployeeHistoryModal";
import AddTaskModal from "@/components/modals/AddTaskModal";
import { useState } from "react";

const EMPLOYEES = [
  {
    name: "Ruwan Silva",
    skill: "Engine Specialist",
    tasks: "3 / 5",
    rating: 4.8,
    status: "Available",
    serviceHistory: [
      {
        vehicleNumber: "KA-1234",
        vehicleModel: "Toyota Corolla",
        serviceType: "Engine Oil Change",
        date: "Oct 28, 2025",
        rating: 5
      },
      {
        vehicleNumber: "LM-7890",
        vehicleModel: "Honda Accord",
        serviceType: "Engine Diagnostics",
        date: "Oct 25, 2025",
        rating: 5
      },
      {
        vehicleNumber: "XY-4567",
        vehicleModel: "Toyota Camry",
        serviceType: "Full Engine Service",
        date: "Oct 20, 2025",
        rating: 4
      }
    ]
  },
  {
    name: "Kamal Perera",
    skill: "Electrical Systems",
    tasks: "5 / 5",
    rating: 4.6,
    status: "Busy (Max Load)",
    serviceHistory: [
      {
        vehicleNumber: "BC-4321",
        vehicleModel: "Honda Civic",
        serviceType: "Battery Replacement",
        date: "Oct 27, 2025",
        rating: 5
      }
    ]
  },
  {
    name: "Nimal Fernando",
    skill: "Bodywork & Paint",
    tasks: "2 / 5",
    rating: 4.9,
    status: "Available",
    serviceHistory: []
  },
  {
    name: "Sunil Jayasinghe",
    skill: "Engine Specialist",
    tasks: "0 / 5",
    rating: 4.5,
    status: "Unavailable",
    serviceHistory: []
  },
  {
    name: "Amal Wickramasinghe",
    skill: "Transmission Specialist",
    tasks: "4 / 5",
    rating: 4.7,
    status: "Busy",
    serviceHistory: []
  },
  {
    name: "Kasun Mendis",
    skill: "Brake Systems",
    tasks: "1 / 5",
    rating: 4.4,
    status: "Available",
    serviceHistory: []
  },
];

function getStatusBadge(status: string) {
  if (status === "Available")
    return <Badge className="bg-[#FFD700]/20 text-[#020079] hover:bg-[#FFD700]/30 border-0 font-roboto">Available</Badge>;
  if (status === "Busy (Max Load)")
    return <Badge className="bg-[#020079]/20 text-[#020079] hover:bg-[#020079]/30 border-0 font-roboto whitespace-nowrap">Busy (Max Load)</Badge>;
  if (status === "Busy")
    return <Badge className="bg-[#020079]/10 text-[#020079] hover:bg-[#020079]/20 border-0 font-roboto">Busy</Badge>;
  if (status === "Unavailable")
    return <Badge className="bg-[#020079]/10 text-[#020079]/70 hover:bg-[#020079]/20 border-0 font-roboto">Unavailable</Badge>;
  return <span>{status}</span>;
}

export default function EmployeesPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<typeof EMPLOYEES[0] | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedEmployeeForTask, setSelectedEmployeeForTask] = useState<typeof EMPLOYEES[0] | null>(null);

  const handleTaskAssignment = (formData: Record<string, string>) => {
    
    console.log('Task Assignment Data:', formData);
    setShowAssignModal(false);
    setSelectedEmployeeForTask(null);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bebas text-[#020079] mb-2">
          Manage Employees
        </h1>
        <p className="font-roboto text-[#020079]/70">View and manage employee roster, assignments, and availability</p>
      </div>

      {selectedEmployee && (
        <EmployeeHistoryModal
          employee={selectedEmployee}
          isOpen={!!selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
      
      {selectedEmployeeForTask && (
        <AddTaskModal
          isOpen={showAssignModal}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedEmployeeForTask(null);
          }}
          onSubmit={handleTaskAssignment}
        />
      )}
      <Card className="bg-white border-[#020079]/20">
        <CardHeader className="border-b border-[#020079]/20">
          <CardTitle className="text-xl font-bebas text-[#020079]">
            Employee Roster
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#020079]/20">
                <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                  Skill
                </th>
                <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                  Current Tasks
                </th>
                <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-roboto font-semibold uppercase tracking-wider text-[#020079]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#020079]/10">
              {EMPLOYEES.map((emp) => (
                <tr key={emp.name} className="hover:bg-[#020079]/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-roboto font-semibold text-[#020079]">{emp.name}</span>
                  </td>
                  <td className="px-6 py-4 font-roboto text-[#020079]/70">
                    {emp.skill}
                  </td>
                  <td className="px-6 py-4 font-roboto text-[#020079]/70">
                    {emp.tasks}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 font-roboto text-[#020079] font-semibold">
                      <Star className="w-4 h-4 fill-[#FFD700] stroke-[#FFD700]" />
                      {emp.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(emp.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-[#020079]/30 text-[#020079] hover:bg-[#020079]/5 font-roboto"
                        onClick={() => setSelectedEmployee(emp)}
                      >
                        View History
                      </Button>
                      {emp.status === "Unavailable" ? (
                        <Button size="sm" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold">Make Available</Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                          onClick={() => {
                            setSelectedEmployeeForTask(emp);
                            setShowAssignModal(true);
                          }}
                        >
                          Assign
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-[#020079]/30 text-[#020079] hover:bg-[#020079]/5 font-roboto">Mark Unavailable</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}