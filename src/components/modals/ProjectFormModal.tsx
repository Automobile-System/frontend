"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubTask {
  name: string;
  hours: number;
}

interface ProjectFormData {
  customerName: string;
  contactNumber: string;
  vehicleRegistration: string;
  vehicleModel: string;
  projectTitle: string;
  projectDescription: string;
  startDate: string;
  estimatedCompletionDate: string;
  totalCost: string;
  subTasks: SubTask[];
}

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
}

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSubmit
}: ProjectFormModalProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    customerName: "",
    contactNumber: "",
    vehicleRegistration: "",
    vehicleModel: "",
    projectTitle: "",
    projectDescription: "",
    startDate: "",
    estimatedCompletionDate: "",
    totalCost: "150000",
    subTasks: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSubTask = () => {
    setFormData(prev => ({
      ...prev,
      subTasks: [...prev.subTasks, { name: "", hours: 0 }]
    }));
  };

  const updateSubTask = (index: number, field: keyof SubTask, value: string) => {
    setFormData(prev => ({
      ...prev,
      subTasks: prev.subTasks.map((task, i) => 
        i === index 
          ? { ...task, [field]: field === 'hours' ? Number(value) : value }
          : task
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-emerald-600 -mx-6 -mt-6 px-6 py-4 mb-4">
          <DialogTitle className="text-2xl font-bold text-white">
            Add New Project (Walk-in Customer)
          </DialogTitle>
          <DialogDescription className="text-white/90 mt-1">
            Create a custom project for customers visiting the center. Add multiple sub-tasks as needed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="customerName">
              Customer Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="customerName"
              name="customerName"
              placeholder="e.g., John Smith"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contactNumber">
              Contact Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              placeholder="e.g., 0771234567"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="vehicleRegistration">
              Vehicle Registration <span className="text-red-500">*</span>
            </Label>
            <Input
              id="vehicleRegistration"
              name="vehicleRegistration"
              placeholder="e.g., KA-1234"
              value={formData.vehicleRegistration}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="vehicleModel">
              Vehicle Model <span className="text-red-500">*</span>
            </Label>
            <Input
              id="vehicleModel"
              name="vehicleModel"
              placeholder="e.g., Toyota Corolla 2015"
              value={formData.vehicleModel}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="projectTitle">
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="projectTitle"
              name="projectTitle"
              placeholder="e.g., Full Restoration, Custom Modification"
              value={formData.projectTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="projectDescription">
              Project Description <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              placeholder="Detailed project scope, customer requirements, and work to be done..."
              value={formData.projectDescription}
              onChange={handleInputChange}
              className={cn(
                "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="estimatedCompletionDate">
                Estimated Completion Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="estimatedCompletionDate"
                name="estimatedCompletionDate"
                type="date"
                value={formData.estimatedCompletionDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="totalCost">
              Total Project Cost (Rs.) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="totalCost"
              name="totalCost"
              type="number"
              min="0"
              value={formData.totalCost}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">📋 Sub-Tasks (Add multiple tasks)</h3>
            </div>
            
            {formData.subTasks.map((task, index) => (
              <div key={index} className="grid grid-cols-5 gap-4">
                <div className="col-span-4">
                  <Input
                    placeholder="Sub-task name (e.g., Engine Disassembly)"
                    value={task.name}
                    onChange={(e) => updateSubTask(index, 'name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Hours"
                    value={task.hours || ''}
                    onChange={(e) => updateSubTask(index, 'hours', e.target.value)}
                    required
                    min="1"
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={addSubTask}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              + Add Another Sub-Task
            </Button>

            <p className="text-sm text-amber-600 flex items-center gap-2">
              💡 You can assign employees to each sub-task later from the Projects board
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="text-green-700 flex items-center gap-2">
              <span className="text-lg">✓</span>
              Direct Creation: Project will be created immediately and added to the Discussion board. You can then assign employees to sub-tasks.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3"
          >
            ✓ Create Project & Add to Board
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}