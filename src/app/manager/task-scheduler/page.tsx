"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import AddTaskModal from "@/components/modals/AddTaskModal";
import ProjectFormModal from "@/components/modals/ProjectFormModal";
import EmployeeAssignmentModal from "@/components/modals/EmployeeAssignmentModal";
import TaskDetailsModal from "@/components/modals/TaskDetailsModal";

interface PendingTask {
  id: string;
  vehicle: string;
  serviceType: string;
  dateTime: string;
  customer: string;
}

const PENDING_TASKS: PendingTask[] = [
  {
    id: "1247",
    vehicle: "PQ-7890 (Toyota Prius)",
    serviceType: "Brake System Service",
    dateTime: "2025-11-06 09:00 AM",
    customer: "Robert Chen"
  },
  {
    id: "1248",
    vehicle: "RS-4321 (Honda CR-V)",
    serviceType: "Engine Diagnostics",
    dateTime: "2025-11-06 02:00 PM",
    customer: "Jessica Taylor"
  },
  {
    id: "1249",
    vehicle: "TU-9876 (Mazda CX-5)",
    serviceType: "Full Service Package",
    dateTime: "2025-11-07 10:30 AM",
    customer: "William Martinez"
  }
];

interface HeldTask {
  id: string;
  reason: string;
  duration: string;
}

interface ScheduledTask {
  id: string;
  customer: string;
  vehicle: string;
  serviceType: string;
  assignedTo: string;
  dateTime: string;
  status: "Scheduled" | "In Progress" | "On Hold";
}

interface EmployeeAvailability {
  name: string;
  schedule: {
    [key: string]: "Available" | "Booked";
  };
}

const HELD_TASKS: HeldTask[] = [
  {
    id: "1245",
    reason: "missing parts",
    duration: "24 hours"
  }
];

const SCHEDULED_TASKS: ScheduledTask[] = [
  {
    id: "1243",
    customer: "Michael Chen",
    vehicle: "KA-1234 (Toyota Corolla)",
    serviceType: "Engine Oil Change",
    assignedTo: "Ruwan Silva",
    dateTime: "2025-11-05 10:00 AM",
    status: "Scheduled"
  },
  {
    id: "1244",
    customer: "Sarah Williams",
    vehicle: "BC-5678 (Honda Civic)",
    serviceType: "Brake Inspection",
    assignedTo: "Kasun Mendis",
    dateTime: "2025-11-05 02:00 PM",
    status: "In Progress"
  },
  {
    id: "1245",
    customer: "David Kumar",
    vehicle: "XY-9012 (Nissan Altima)",
    serviceType: "Transmission Repair",
    assignedTo: "Amal Wickramasinghe",
    dateTime: "2025-11-04 09:00 AM",
    status: "On Hold"
  },
  {
    id: "1246",
    customer: "Emma Johnson",
    vehicle: "LM-3456 (Mazda 3)",
    serviceType: "Full Service",
    assignedTo: "Nimal Fernando",
    dateTime: "2025-11-06 11:00 AM",
    status: "Scheduled"
  }
];

const EMPLOYEE_AVAILABILITY: EmployeeAvailability[] = [
  {
    name: "Ruwan Silva",
    schedule: {
      "Mon 11/4": "Booked",
      "Tue 11/5": "Available",
      "Wed 11/6": "Booked",
      "Thu 11/7": "Available",
      "Fri 11/8": "Available"
    }
  },
  {
    name: "Kamal Perera",
    schedule: {
      "Mon 11/4": "Booked",
      "Tue 11/5": "Booked",
      "Wed 11/6": "Booked",
      "Thu 11/7": "Booked",
      "Fri 11/8": "Booked"
    }
  },
  {
    name: "Nimal Fernando",
    schedule: {
      "Mon 11/4": "Available",
      "Tue 11/5": "Booked",
      "Wed 11/6": "Available",
      "Thu 11/7": "Available",
      "Fri 11/8": "Available"
    }
  }
];

export default function TaskSchedulerPage() {
  const [tasks, setTasks] = useState<PendingTask[]>(PENDING_TASKS);
  const [heldTasks] = useState<HeldTask[]>(HELD_TASKS);
  const [scheduledTasks] = useState<ScheduledTask[]>(SCHEDULED_TASKS);
  const [employeeAvailability] = useState<EmployeeAvailability[]>(EMPLOYEE_AVAILABILITY);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<PendingTask | null>(null);
  const [selectedScheduledTask, setSelectedScheduledTask] = useState<ScheduledTask | null>(null);
  const [taskToReassign, setTaskToReassign] = useState<ScheduledTask | null>(null);

  const handleViewDetails = (task: ScheduledTask) => {
    setSelectedScheduledTask(task);
    setShowDetailsModal(true);
  };

  const handleReassign = (task: ScheduledTask) => {
    setTaskToReassign(task);
    setShowAddTaskModal(true);
  };

  const handleProjectSubmit = (formData: {
    customerName: string;
    contactNumber: string;
    vehicleRegistration: string;
    vehicleModel: string;
    projectTitle: string;
    projectDescription: string;
    startDate: string;
    estimatedCompletionDate: string;
    totalCost: string;
    subTasks: Array<{ name: string; hours: number }>;
  }) => {
    console.log('New Project Data:', formData);
    // TODO: Implement API call to save the project
    setShowProjectModal(false);
  };

  const handleTaskSubmit = (formData: Record<string, string>) => {
    // Create a new pending task from the form data
    const newTask: PendingTask = {
      id: `${Math.floor(1000 + Math.random() * 9000)}`, // Generate a random 4-digit ID
      vehicle: `${formData.vehicleRegistration} (${formData.vehicleModel})`,
      serviceType: formData.serviceType,
      dateTime: `${formData.preferredDate} ${formData.preferredTime}`,
      customer: formData.customerName
    };

    // Add the new task to the tasks list
    setTasks([...tasks, newTask]);
    
    // Close the modal
    setShowAddTaskModal(false);
  };

  const handleAssignEmployee = (task: PendingTask) => {
    setSelectedTask(task);
    setShowEmployeeModal(true);
  };

  const handleEmployeeAssigned = () => {
    if (selectedTask) {
      // Remove the task from pending tasks after assignment
      setTasks(tasks.filter(task => task.id !== selectedTask.id));
      setSelectedTask(null);
      setShowEmployeeModal(false);
      // TODO: Add task to assigned tasks list or make API call
    }
  };

  return (
    <div className="p-8 min-h-screen bg-white">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bebas text-[#020079] mb-2">
          Task Assignment & Scheduler
        </h1>
        <p className="font-roboto text-[#020079]/70">
          Manage pending tasks, assign employees, and view scheduling calendar
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <Button 
          size="lg"
          className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto font-semibold"
          onClick={() => setShowAddTaskModal(true)}
        >
          + Add Task (Predefined Service)
        </Button>
        <Button 
          size="lg"
          className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
          onClick={() => setShowProjectModal(true)}
        >
          + Create New Project
        </Button>
      </div>

      {/* Pending Tasks Section */}
      <Card className="border-[#020079]/20 mb-6">
        <CardHeader className="border-b border-[#020079]/20">
          <div className="flex items-center justify-between">
            <CardTitle className="font-bebas text-xl text-[#020079]">
              Tasks Pending Employee Assignment
            </CardTitle>
            <Badge className="bg-[#FFD700] text-[#020079] font-roboto font-semibold px-3 py-1">
              {tasks.length} Tasks
            </Badge>
          </div>
          <p className="font-roboto text-[#020079]/70 mt-2">
            These tasks were created without employee selection. Please assign available employees.
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#020079]/20">
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Task ID</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Vehicle</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Service Type</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Date/Time</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-[#020079]/10 hover:bg-[#020079]/5">
                    <td className="px-4 py-4 font-roboto text-[#020079] font-semibold">{task.id}</td>
                    <td className="px-4 py-4 font-roboto text-[#020079]">{task.vehicle}</td>
                    <td className="px-4 py-4 font-roboto text-[#020079]">{task.serviceType}</td>
                    <td className="px-4 py-4 font-roboto text-[#020079]">{task.dateTime}</td>
                    <td className="px-4 py-4 font-roboto text-[#020079]">{task.customer}</td>
                    <td className="px-4 py-4">
                      <Button 
                        size="sm"
                        className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto font-semibold"
                        onClick={() => handleAssignEmployee(task)}
                      >
                        Assign Employee
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Held Tasks Section */}
      <Card className="border-[#020079]/20 mb-6">
        <CardHeader className="border-b border-[#020079]/20">
          <CardTitle className="font-bebas text-xl text-[#020079]">
            Held Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {heldTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg">
                <span className="font-roboto text-[#020079]">
                  <span className="font-semibold">Task {task.id}</span> on hold for {task.duration} ({task.reason})
                </span>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto">
                    Contact Customer
                  </Button>
                  <Button size="sm" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto">
                    Reassign Task
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Scheduled Tasks Section */}
      <Card className="border-[#020079]/20 mb-6">
        <CardHeader className="border-b border-[#020079]/20">
          <CardTitle className="font-bebas text-xl text-[#020079]">
            All Scheduled Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#020079]/20">
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Task ID</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Vehicle</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Service Type</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Assigned To</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Date/Time</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scheduledTasks.map((task) => (
                  <tr key={task.id} className="border-b border-[#020079]/10 hover:bg-[#020079]/5">
                    <td className="px-4 py-3 font-roboto text-[#020079] font-semibold">{task.id}</td>
                    <td className="px-4 py-3 font-roboto text-[#020079]">{task.customer}</td>
                    <td className="px-4 py-3 font-roboto text-[#020079]">{task.vehicle}</td>
                    <td className="px-4 py-3 font-roboto text-[#020079]">{task.serviceType}</td>
                    <td className="px-4 py-3 font-roboto text-[#020079]">{task.assignedTo}</td>
                    <td className="px-4 py-3 font-roboto text-[#020079]">{task.dateTime}</td>
                    <td className="px-4 py-3">
                      <Badge className={`font-roboto
                        ${task.status === "Scheduled" ? "bg-[#FFD700]/20 text-[#020079] border-[#FFD700]/30" : 
                          task.status === "In Progress" ? "bg-[#020079]/20 text-[#020079] border-[#020079]/30" :
                          "bg-[#FFD700]/30 text-[#020079] border-[#FFD700]/40"}`}>
                        {task.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto"
                          onClick={() => handleViewDetails(task)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto"
                          onClick={() => handleReassign(task)}
                        >
                          Reassign
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Employee Availability Calendar */}
      <Card className="border-[#020079]/20">
        <CardHeader className="border-b border-[#020079]/20">
          <CardTitle className="font-bebas text-xl text-[#020079]">
            Employee Availability Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#020079]/20">
                  <th className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">Employee</th>
                  {Object.keys(employeeAvailability[0].schedule).map((day) => (
                    <th key={day} className="px-4 py-3 text-left font-roboto text-[#020079] font-semibold">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employeeAvailability.map((employee) => (
                  <tr key={employee.name} className="border-b border-[#020079]/10 hover:bg-[#020079]/5">
                    <td className="px-4 py-3 font-roboto text-[#020079] font-semibold">{employee.name}</td>
                    {Object.entries(employee.schedule).map(([day, status]) => (
                      <td key={day} className="px-4 py-3">
                        <Badge className={`font-roboto
                          ${status === "Available" ? "bg-[#FFD700]/20 text-[#020079] border-[#FFD700]/30" : 
                          "bg-[#020079]/20 text-[#020079] border-[#020079]/30"}`}>
                          {status}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Task Details Modal */}
      {selectedScheduledTask && (
        <TaskDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedScheduledTask(null);
          }}
          task={selectedScheduledTask}
        />
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => {
          setShowAddTaskModal(false);
          setTaskToReassign(null);
        }}
        onSubmit={handleTaskSubmit}
        initialData={taskToReassign ? {
          customerName: taskToReassign.customer,
          vehicleRegistration: taskToReassign.vehicle.split(' ')[0],
          vehicleModel: taskToReassign.vehicle.split(' ')[1]?.replace(/[()]/g, ''),
          serviceType: taskToReassign.serviceType
        } : undefined}
      />

      <ProjectFormModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSubmit={handleProjectSubmit}
      />

      {selectedTask && (
        <EmployeeAssignmentModal
          isOpen={showEmployeeModal}
          onClose={() => setShowEmployeeModal(false)}
          task={{
            id: selectedTask.id,
            vehicle: selectedTask.vehicle,
            service: selectedTask.serviceType
          }}
          onAssign={handleEmployeeAssigned}
        />
      )}
    </div>
  )
};