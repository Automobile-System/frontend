"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogTitle className="sr-only">Create Sub-Tasks for {project.title}</DialogTitle>
        <DialogDescription className="sr-only">Define sub-tasks and assign team members for project {project.id}</DialogDescription>
        
        {/* Header */}
        <div className="bg-[#020079] text-white -mx-6 -mt-6 px-6 py-6 mb-6 border-b-4 border-[#FFD700]">
          <h2 className="text-2xl font-bebas tracking-wide">CREATE SUB-TASKS FOR PROJECT</h2>
        </div>

        {/* Project Info Section */}
        <div className="border-l-4 border-[#020079] bg-white pl-4 py-3 mb-6">
          <h3 className="text-lg font-bebas text-[#020079] tracking-wide mb-2">{project.title}</h3>
          <div className="space-y-1 text-sm font-roboto">
            <p className="text-[#020079]/60">
              Project ID: <span className="text-[#020079] font-semibold">{project.id}</span>
            </p>
            <p className="text-[#020079]/60">
              Customer: <span className="text-[#020079] font-semibold">{project.customer}</span>
            </p>
            <p className="text-[#FFD700] flex items-center gap-1 font-semibold">
              <span>Requirements Gathering Complete</span>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bebas text-[#020079] tracking-wide border-b-2 border-[#020079]/20 pb-2 mb-4">
            DEFINE SUB-TASKS & ASSIGN TEAM
          </h4>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="subTaskName" className="font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide text-sm">
                Sub-Task Name <span className="text-[#FFD700]">*</span>
              </Label>
              <Input
                id="subTaskName"
                placeholder="e.g., Engine Disassembly, Parts Inspection, Reassembly"
                value={currentSubTask.name}
                onChange={(e) => setCurrentSubTask({ ...currentSubTask, name: e.target.value })}
                className="h-12 border-[#020079]/20 focus:border-[#020079]/40 font-roboto"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="estimatedDuration" className="font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide text-sm">
                Estimated Duration (hours) <span className="text-[#FFD700]">*</span>
              </Label>
              <Input
                id="estimatedDuration"
                type="number"
                min="1"
                value={currentSubTask.duration || ""}
                onChange={(e) => setCurrentSubTask({ ...currentSubTask, duration: parseInt(e.target.value) })}
                className="h-12 border-[#020079]/20 focus:border-[#020079]/40 font-roboto"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="assignEmployee" className="font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide text-sm">
                Assign Employee <span className="text-[#FFD700]">*</span>
              </Label>
              <select
                id="assignEmployee"
                className={cn(
                  "flex h-12 w-full rounded-md border border-[#020079]/20 bg-white px-4 py-2 font-roboto text-[#020079]",
                  "focus:outline-none focus:ring-2 focus:ring-[#020079]/20 focus:border-[#020079]",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
                value={currentSubTask.assignedTo}
                onChange={(e) => setCurrentSubTask({ ...currentSubTask, assignedTo: e.target.value })}
              >
                <option value="" className="text-[#020079]/40">Select Employee...</option>
                {EMPLOYEES.map((emp) => (
                  <option key={emp.name} value={emp.name}>
                    {emp.name} - {emp.role}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority" className="font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide text-sm">Priority</Label>
              <select
                id="priority"
                className={cn(
                  "flex h-12 w-full rounded-md border border-[#020079]/20 bg-white px-4 py-2 font-roboto text-[#020079]",
                  "focus:outline-none focus:ring-2 focus:ring-[#020079]/20 focus:border-[#020079]",
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
              className="w-full h-12 bg-[#020079] hover:bg-[#03009B] text-white font-roboto font-semibold tracking-wide mt-2"
              onClick={handleAddSubTask}
            >
              ADD SUB-TASK TO LIST
            </Button>
          </div>



          <div className="mt-6">
            <h4 className="text-lg font-bebas text-[#020079] tracking-wide border-b-2 border-[#020079]/20 pb-2 mb-3">SUB-TASKS LIST</h4>
            <div className="bg-white rounded-lg p-4 min-h-[120px] border-2 border-[#020079]/10">
              {subTasks.length === 0 ? (
                <p className="text-[#020079]/60 font-roboto text-center py-6">No sub-tasks created yet. Add sub-tasks above.</p>
              ) : (
                <div className="space-y-3">
                  {subTasks.map((task, index) => (
                    <div key={index} className="bg-white border-2 border-[#020079]/20 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h5 className="text-[#020079] font-bebas text-lg tracking-wide mb-1">{task.name}</h5>
                          <p className="text-sm text-[#020079]/60 font-roboto">Assigned to: {task.assignedTo}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#020079] font-roboto font-semibold">{task.duration} hours</span>
                          <Badge className={cn(
                            "font-roboto font-semibold",
                            task.priority === "High" && "bg-[#020079] text-white",
                            task.priority === "Medium" && "bg-[#FFD700] text-[#020079]",
                            task.priority === "Low" && "bg-[#020079]/20 text-[#020079]"
                          )}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-l-4 border-[#FFD700] bg-white pl-4 py-4 rounded-lg mt-6">
              <p className="flex items-center gap-2 text-[#020079] text-sm font-roboto">
                <span>
                  <strong>Auto-Balance:</strong> System prevents overlapping employee assignments and ensures fair workload distribution
                </span>
              </p>
            </div>

            <Button
              type="button"
              className="w-full h-12 bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold tracking-wide mt-6"
              onClick={handleFinalize}
              disabled={subTasks.length === 0}
            >
              FINALIZE & MOVE PROJECT TO IN PROGRESS
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}