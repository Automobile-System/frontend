"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    return <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">Available</span>;
  if (status === "Busy (Max Load)")
    return <span className="px-3 py-1 rounded-full bg-orange-200 text-orange-800 text-sm font-semibold whitespace-nowrap">Busy (Max Load)</span>;
  if (status === "Busy")
    return <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">Busy</span>;
  if (status === "Unavailable")
    return <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">Unavailable</span>;
  return <span>{status}</span>;
}

export default function EmployeesPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<typeof EMPLOYEES[0] | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedEmployeeForTask, setSelectedEmployeeForTask] = useState<typeof EMPLOYEES[0] | null>(null);

  const handleTaskAssignment = (formData: any) => {
    // Here you would typically send this data to your backend
    console.log('Task Assignment Data:', formData);
    // TODO: Implement the API call to save the task
    setShowAssignModal(false);
    setSelectedEmployeeForTask(null);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">🧑‍🔧</span>
        <h1 className="text-3xl font-bold text-gray-800">Manage Employees</h1>
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
      <Card className="p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">Employee Roster</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-emerald-600 text-white">
                <th className="px-4 py-3 rounded-tl-lg">Name</th>
                <th className="px-4 py-3">Skill</th>
                <th className="px-4 py-3">Current Tasks</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {EMPLOYEES.map((emp, idx) => (
                <tr key={emp.name}>
                  <td className="px-4 py-3 font-semibold text-gray-800 bg-white shadow-sm rounded-l-lg">
                    {emp.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700 bg-white shadow-sm">
                    {emp.skill}
                  </td>
                  <td className="px-4 py-3 text-gray-700 bg-white shadow-sm">
                    {emp.tasks}
                  </td>
                  <td className="px-4 py-3 text-yellow-600 font-semibold bg-white shadow-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                      {emp.rating}
                    </div>
                  </td>
                  <td className="px-4 py-3 bg-white shadow-sm">
                    {getStatusBadge(emp.status)}
                  </td>
                  <td className="px-4 py-3 bg-white shadow-sm rounded-r-lg">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-blue-100 text-blue-700 font-semibold"
                        onClick={() => setSelectedEmployee(emp)}
                      >
                        View History
                      </Button>
                      {emp.status === "Unavailable" ? (
                        <Button size="sm" variant="outline" className="bg-green-100 text-green-700 font-semibold">Make Available</Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-green-100 text-green-700 font-semibold"
                          onClick={() => {
                            setSelectedEmployeeForTask(emp);
                            setShowAssignModal(true);
                          }}
                        >
                          Assign
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="bg-orange-100 text-orange-700 font-semibold">Mark Unavailable</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}