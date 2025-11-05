"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Employee {
  name: string;
  role: string;
  rating: number;
  status: "Available" | "Nearly Full" | "Unavailable";
  workload: string;
  avatar: string;
}

interface TaskDetails {
  id: string;
  vehicle: string;
  service: string;
}

interface EmployeeAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskDetails;
  onAssign: (employeeId: string) => void;
}

const EMPLOYEES: Employee[] = [
  {
    name: "Ruwan Silva",
    role: "Engine Specialist",
    rating: 4.8,
    status: "Available",
    workload: "3/5",
    avatar: "👨‍🔧"
  },
  {
    name: "Nimal Fernando",
    role: "Bodywork & Paint",
    rating: 4.9,
    status: "Available",
    workload: "2/5",
    avatar: "👨‍🔧"
  },
  {
    name: "Kasun Mendis",
    role: "Brake Systems",
    rating: 4.4,
    status: "Available",
    workload: "1/5",
    avatar: "👨‍🔧"
  },
  {
    name: "Amal Wickramasinghe",
    role: "Transmission Specialist",
    rating: 4.7,
    status: "Nearly Full",
    workload: "4/5",
    avatar: "👨‍🔧"
  },
  {
    name: "Kamal Perera",
    role: "Electrical Systems",
    rating: 4.5,
    status: "Unavailable",
    workload: "5/5",
    avatar: "👨‍🔧"
  },
  {
    name: "Sunil Jayasinghe",
    role: "Engine Specialist",
    rating: 4.5,
    status: "Unavailable",
    workload: "0/5",
    avatar: "👨‍🔧"
  }
];

export default function EmployeeAssignmentModal({
  isOpen,
  onClose,
  task,
  onAssign
}: EmployeeAssignmentModalProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const handleEmployeeSelect = (name: string) => {
    const employee = EMPLOYEES.find(e => e.name === name);
    if (employee && employee.status !== "Unavailable") {
      setSelectedEmployee(name);
      toast.success(`${name} has been assigned to the task`);
      onAssign(name);
      onClose();
    }
  };

  const getStatusColor = (status: Employee["status"]) => {
    switch (status) {
      case "Available":
        return "text-green-600";
      case "Nearly Full":
        return "text-orange-500";
      case "Unavailable":
        return "text-red-500";
    }
  };

  const getWorkloadColor = (workload: string) => {
    const [current, total] = workload.split("/").map(Number);
    if (current/total >= 0.8) return "text-red-500";
    if (current/total >= 0.6) return "text-orange-500";
    return "text-green-600";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            Assign Employee - Task #{task.id}
          </DialogTitle>
        </DialogHeader>

        <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm">
          <p className="text-gray-600">Vehicle: {task.vehicle}</p>
          <p className="text-gray-600">Service: {task.service}</p>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-3">
            {EMPLOYEES.map((employee) => (
              <div
                key={employee.name}
                onClick={() => handleEmployeeSelect(employee.name)}
                className={`
                  p-3 rounded-lg border transition-all
                  ${employee.status === "Unavailable" 
                    ? "bg-gray-50 cursor-not-allowed opacity-60" 
                    : "bg-white hover:border-emerald-500 cursor-pointer"
                  }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{employee.avatar}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{employee.name}</h4>
                    <p className="text-xs text-gray-600">{employee.role}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-yellow-400 text-xs">⭐</span>
                      <span className="text-xs text-gray-700">{employee.rating}</span>
                    </div>
                    <div className={`text-xs font-medium mt-1 ${getStatusColor(employee.status)}`}>
                      {employee.status === "Available" && "✓ Available"}
                      {employee.status === "Nearly Full" && "⚠ Nearly Full"}
                      {employee.status === "Unavailable" && "✕ Unavailable"}
                    </div>
                    <div className={`text-xs font-medium ${getWorkloadColor(employee.workload)}`}>
                      {employee.workload} Tasks
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-blue-50 p-2 rounded text-xs">
            <p className="flex items-center gap-1.5 text-blue-700">
              <span>💡</span>
              <span>Click on an available employee to assign this task</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}