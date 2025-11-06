"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubTask {
  name: string;
  duration: number;
  assignedTo: string;
  priority: "High" | "Medium" | "Low";
}

interface SubTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    customer: string;
    requirements?: boolean;
  };
  onFinalize: (subTasks: SubTask[]) => void;
}

export default function SubTaskModal({
  isOpen,
  onClose,
  project,
  onFinalize
}: SubTaskModalProps) {
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [currentSubTask, setCurrentSubTask] = useState<SubTask>({
    name: "",
    duration: 0,
    assignedTo: "",
    priority: "High"
  });

  const EMPLOYEES = [
    { name: "Ruwan Silva", role: "Engine Specialist" },
    { name: "Nimal Fernando", role: "Bodywork & Paint" },
    { name: "Kasun Mendis", role: "Brake Systems" },
    { name: "Amal Wickramasinghe", role: "Transmission Specialist" },
    { name: "Kamal Perera", role: "Electrical Systems" }
  ];

  const handleAddSubTask = () => {
    if (currentSubTask.name && currentSubTask.assignedTo && currentSubTask.duration > 0) {
      setSubTasks([...subTasks, currentSubTask]);
      setCurrentSubTask({
        name: "",
        duration: 0,
        assignedTo: "",
        priority: "High"
      });
    }
  };

  const handleFinalize = () => {
    onFinalize(subTasks);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-emerald-600 -mx-6 -mt-6 px-6 py-4 mb-4">
          <DialogTitle className="text-2xl font-bold text-white">
            Create Sub-Tasks for Project
          </DialogTitle>
        </DialogHeader>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600">
              Project ID: <span className="text-gray-900 font-medium">{project.id}</span>
            </p>
            <p className="text-gray-600">
              Customer: <span className="text-gray-900 font-medium">{project.customer}</span>
            </p>
            <p className="text-emerald-600 flex items-center gap-1 font-medium">
              <span>✓</span>
              <span>Requirements Gathering Complete</span>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white-800 mb-4">Define Sub-Tasks & Assign Team</h4>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="subTaskName">
                Sub-Task Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subTaskName"
                placeholder="e.g., Engine Disassembly, Parts Inspection, Reassembly"
                value={currentSubTask.name}
                onChange={(e) => setCurrentSubTask({ ...currentSubTask, name: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="estimatedDuration">
                Estimated Duration (hours) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="estimatedDuration"
                type="number"
                min="1"
                value={currentSubTask.duration || ""}
                onChange={(e) => setCurrentSubTask({ ...currentSubTask, duration: parseInt(e.target.value) })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="assignEmployee">
                Assign Employee <span className="text-red-500">*</span>
              </Label>
              <select
                id="assignEmployee"
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
                value={currentSubTask.assignedTo}
                onChange={(e) => setCurrentSubTask({ ...currentSubTask, assignedTo: e.target.value })}
              >
                <option value="">Select Employee...</option>
                {EMPLOYEES.map((emp) => (
                  <option key={emp.name} value={emp.name}>
                    {emp.name} - {emp.role}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
                value={currentSubTask.priority}
                onChange={(e) => setCurrentSubTask({ 
                  ...currentSubTask, 
                  priority: e.target.value as "High" | "Medium" | "Low" 
                })}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <Button
              type="button"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base h-11 mt-2"
              onClick={handleAddSubTask}
            >
              + Add Sub-Task to List
            </Button>
          </div>



          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Sub-Tasks List:</h4>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[120px] border border-gray-200">
              {subTasks.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No sub-tasks created yet. Add sub-tasks above.</p>
              ) : (
                <div className="space-y-3">
                  {subTasks.map((task, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h5 className="text-gray-900 font-medium mb-1">{task.name}</h5>
                          <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-700 font-medium">{task.duration} hours</span>
                          <span className={cn(
                            "px-3 py-1 rounded-full text-sm font-medium",
                            task.priority === "High" && "bg-red-100 text-red-700",
                            task.priority === "Medium" && "bg-yellow-100 text-yellow-700",
                            task.priority === "Low" && "bg-blue-100 text-blue-700"
                          )}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-6">
              <p className="flex items-center gap-2 text-emerald-700 text-sm">
                <span className="text-lg">✓</span>
                <span>
                  <strong>Auto-Balance:</strong> System prevents overlapping employee assignments and ensures fair workload distribution
                </span>
              </p>
            </div>

            <Button
              type="button"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base h-11 mt-6"
              onClick={handleFinalize}
              disabled={subTasks.length === 0}
            >
              ✓ Finalize & Move Project to &quot;In Progress&quot;
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}