"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Employee {
  name: string;
  role: string;
  rating: number;
  status: "Available" | "Nearly Full" | "Unavailable";
  workload: string;
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
    workload: "3/5"
  },
  {
    name: "Nimal Fernando",
    role: "Bodywork & Paint",
    rating: 4.9,
    status: "Available",
    workload: "2/5"
  },
  {
    name: "Kasun Mendis",
    role: "Brake Systems",
    rating: 4.4,
    status: "Available",
    workload: "1/5"
  },
  {
    name: "Amal Wickramasinghe",
    role: "Transmission Specialist",
    rating: 4.7,
    status: "Nearly Full",
    workload: "4/5"
  },
  {
    name: "Kamal Perera",
    role: "Electrical Systems",
    rating: 4.5,
    status: "Unavailable",
    workload: "5/5"
  },
  {
    name: "Sunil Jayasinghe",
    role: "Engine Specialist",
    rating: 4.5,
    status: "Unavailable",
    workload: "0/5"
  }
];

export default function EmployeeAssignmentModal({
  isOpen,
  onClose,
  task,
  onAssign
}: EmployeeAssignmentModalProps) {
  const [, setSelectedEmployee] = useState<string | null>(null);

  const handleEmployeeSelect = (name: string) => {
    const employee = EMPLOYEES.find(e => e.name === name);
    if (employee && employee.status !== "Unavailable") {
      setSelectedEmployee(name);
      toast.success(`${name} has been assigned to the task`);
      onAssign(name);
      onClose();
    }
  };

  const getWorkloadColor = (workload: string) => {
    const [current, total] = workload.split("/").map(Number);
    if (current/total >= 0.8) return "text-[#020079]";
    if (current/total >= 0.6) return "text-[#FFD700]";
    return "text-[#020079]";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        {/* Header Section */}
        <div className="-mx-6 -mt-6 px-8 py-6 bg-[#020079] border-b-4 border-[#FFD700]">
          <DialogTitle className="text-3xl font-bebas text-white tracking-wide mb-2">
            ASSIGN EMPLOYEE - TASK {task.id}
          </DialogTitle>
          <DialogDescription className="text-white/90 font-roboto text-base">
            Vehicle: {task.vehicle} | Service: {task.service}
          </DialogDescription>
        </div>

        <div className="px-2 pt-6">
          {/* Employee Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {EMPLOYEES.map((employee) => (
              <div
                key={employee.name}
                onClick={() => handleEmployeeSelect(employee.name)}
                className={`
                  border rounded-lg transition-all duration-200
                  ${employee.status === "Unavailable" 
                    ? "bg-gray-50 cursor-not-allowed opacity-60 border-[#020079]/10" 
                    : "bg-white hover:border-[#020079] hover:shadow-md cursor-pointer border-[#020079]/20"
                  }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bebas text-xl text-[#020079]">{employee.name}</h4>
                      <p className="text-sm font-roboto text-[#020079]/70">{employee.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-roboto text-[#020079]/60">Rating</span>
                      <span className="text-sm font-roboto font-semibold text-[#FFD700]">{employee.rating}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-roboto text-[#020079]/60">Workload</span>
                      <span className={`text-sm font-roboto font-semibold ${getWorkloadColor(employee.workload)}`}>
                        {employee.workload} Tasks
                      </span>
                    </div>
                    
                    <div className="pt-2">
                      <Badge className={`font-roboto text-xs
                        ${employee.status === "Available" 
                          ? "bg-[#FFD700]/20 text-[#020079] border-[#FFD700]/30" 
                          : employee.status === "Nearly Full"
                          ? "bg-[#FFD700]/40 text-[#020079] border-[#FFD700]/50"
                          : "bg-[#020079]/20 text-[#020079] border-[#020079]/30"
                        }`}>
                        {employee.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Banner */}
          <div className="bg-[#FFD700]/10 border-l-4 border-[#FFD700] p-4">
            <p className="text-[#020079] font-roboto text-sm">
              <strong>Click on an available employee</strong> to assign this task
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}