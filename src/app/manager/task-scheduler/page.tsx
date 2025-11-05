"use client";

import { Button } from "@/components/ui/button";
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
    id: "#1247",
    vehicle: "PQ-7890 (Toyota Prius)",
    serviceType: "Brake System Service",
    dateTime: "2025-11-06 09:00 AM",
    customer: "Robert Chen"
  },
  {
    id: "#1248",
    vehicle: "RS-4321 (Honda CR-V)",
    serviceType: "Engine Diagnostics",
    dateTime: "2025-11-06 02:00 PM",
    customer: "Jessica Taylor"
  },
  {
    id: "#1249",
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
    id: "#1245",
    reason: "missing parts",
    duration: "24 hours"
  }
];

const SCHEDULED_TASKS: ScheduledTask[] = [
  {
    id: "#1243",
    customer: "Michael Chen",
    vehicle: "KA-1234 (Toyota Corolla)",
    serviceType: "Engine Oil Change",
    assignedTo: "Ruwan Silva",
    dateTime: "2025-11-05 10:00 AM",
    status: "Scheduled"
  },
  {
    id: "#1244",
    customer: "Sarah Williams",
    vehicle: "BC-5678 (Honda Civic)",
    serviceType: "Brake Inspection",
    assignedTo: "Kasun Mendis",
    dateTime: "2025-11-05 02:00 PM",
    status: "In Progress"
  },
  {
    id: "#1245",
    customer: "David Kumar",
    vehicle: "XY-9012 (Nissan Altima)",
    serviceType: "Transmission Repair",
    assignedTo: "Amal Wickramasinghe",
    dateTime: "2025-11-04 09:00 AM",
    status: "On Hold"
  },
  {
    id: "#1246",
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

  const handleProjectSubmit = (formData: any) => {
    console.log('New Project Data:', formData);
    // TODO: Implement API call to save the project
    setShowProjectModal(false);
  };

  const handleTaskSubmit = (formData: any) => {
    // Create a new pending task from the form data
    const newTask: PendingTask = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`, // Generate a random 4-digit ID
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

  const handleEmployeeAssigned = (employeeId: string) => {
    if (selectedTask) {
      // Remove the task from pending tasks after assignment
      setTasks(tasks.filter(task => task.id !== selectedTask.id));
      setSelectedTask(null);
      setShowEmployeeModal(false);
      // TODO: Add task to assigned tasks list or make API call
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">📋</span>
          <h1 className="text-3xl font-bold text-gray-800">Task Assignment & Scheduler</h1>
        </div>
        <div className="flex gap-4">
          <Button 
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            onClick={() => setShowAddTaskModal(true)}
          >
            + Add Task (Predefined Service)
          </Button>
          <Button 
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            onClick={() => setShowProjectModal(true)}
          >
            + Create New Project
          </Button>
        </div>
      </div>

      {/* Pending Tasks Section */}
      <div className="bg-amber-50 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">⚠️</span>
          <h2 className="text-xl font-semibold text-amber-800">
            Tasks Pending Employee Assignment
            <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white text-sm rounded">
              {tasks.length} Tasks
            </span>
          </h2>
        </div>
        <p className="text-gray-700 mb-6">
          These tasks were created without employee selection. Please assign available employees:
        </p>
        
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-emerald-600 text-white">
                <th className="px-6 py-3 text-left font-medium">Task ID</th>
                <th className="px-6 py-3 text-left font-medium">Vehicle</th>
                <th className="px-6 py-3 text-left font-medium">Service Type</th>
                <th className="px-6 py-3 text-left font-medium">Date/Time</th>
                <th className="px-6 py-3 text-left font-medium">Customer</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{task.id}</td>
                  <td className="px-6 py-4 text-gray-700">{task.vehicle}</td>
                  <td className="px-6 py-4 text-gray-700">{task.serviceType}</td>
                  <td className="px-6 py-4 text-gray-700">{task.dateTime}</td>
                  <td className="px-6 py-4 text-gray-700">{task.customer}</td>
                  <td className="px-6 py-4">
                    <Button 
                      size="sm"
                      className="bg-emerald-500 text-white hover:bg-emerald-600 font-medium px-4"
                      onClick={() => handleAssignEmployee(task)}
                    >
                      👨‍🔧 Assign Employee
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Held Tasks Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">🕒</span>
          <h2 className="text-lg font-semibold text-gray-800">Held Tasks:</h2>
          {heldTasks.map((task) => (
            <div key={task.id} className="flex items-center gap-2">
              <span className="text-gray-600">
                Task {task.id} on hold for {task.duration} ({task.reason})
              </span>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
                  Contact Customer
                </Button>
                <Button size="sm" className="bg-amber-500 text-white hover:bg-amber-600">
                  Reassign Task
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Scheduled Tasks Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">⚡</span>
          <h2 className="text-xl font-semibold text-gray-800">All Scheduled Tasks</h2>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-emerald-600 text-white">
                <th className="px-4 py-3 text-left text-sm font-medium">Task ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Vehicle</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Service Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Assigned To</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Date/Time</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduledTasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{task.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{task.customer}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{task.vehicle}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{task.serviceType}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{task.assignedTo}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{task.dateTime}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium whitespace-nowrap
                      ${task.status === "Scheduled" ? "bg-emerald-100 text-emerald-700" : 
                        task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"}`}>
                      {task.status === "In Progress" ? "In Progress" : task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-blue-500 text-white hover:bg-blue-600 text-xs px-2"
                        onClick={() => handleViewDetails(task)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-emerald-500 text-white hover:bg-emerald-600 text-xs px-2"
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
      </div>

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

      {/* Employee Availability Calendar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📅</span>
          <h2 className="text-xl font-semibold text-gray-800">Employee Availability Calendar</h2>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-emerald-600 text-white">
                <th className="px-4 py-3 text-left text-sm font-medium">Employee</th>
                {Object.keys(employeeAvailability[0].schedule).map((day) => (
                  <th key={day} className="px-4 py-3 text-left text-sm font-medium">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employeeAvailability.map((employee) => (
                <tr key={employee.name} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{employee.name}</td>
                  {Object.entries(employee.schedule).map(([day, status]) => (
                    <td key={day} className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium 
                        ${status === "Available" ? "bg-emerald-100 text-emerald-700" : 
                        "bg-red-100 text-red-700"}`}>
                        {status}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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