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
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        {/* Header Section */}
        <div className="-mx-6 -mt-6 px-8 py-6 bg-[#020079] border-b-4 border-[#FFD700]">
          <DialogTitle className="text-3xl font-bebas text-white tracking-wide mb-2">
            ADD NEW PROJECT (WALK-IN CUSTOMER)
          </DialogTitle>
          <DialogDescription className="text-white/90 font-roboto text-base">
            Create a custom project for customers visiting the center. Add multiple sub-tasks as needed.
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit} className="px-2 pt-6 space-y-1">
          {/* Customer Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bebas text-[#020079] mb-4 pb-2 border-b-2 border-[#020079]/20">
              CUSTOMER INFORMATION
            </h3>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="customerName" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                  Customer Name <span className="text-[#FFD700]">*</span>
                </Label>
                <Input
                  id="customerName"
                  name="customerName"
                  placeholder="e.g., John Smith"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contactNumber" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                  Contact Number <span className="text-[#FFD700]">*</span>
                </Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="e.g., 0771234567"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bebas text-[#020079] mb-4 pb-2 border-b-2 border-[#020079]/20">
              VEHICLE INFORMATION
            </h3>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="vehicleRegistration" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                  Vehicle Registration <span className="text-[#FFD700]">*</span>
                </Label>
                <Input
                  id="vehicleRegistration"
                  name="vehicleRegistration"
                  placeholder="e.g., KA-1234"
                  value={formData.vehicleRegistration}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="vehicleModel" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                  Vehicle Model <span className="text-[#FFD700]">*</span>
                </Label>
                <Input
                  id="vehicleModel"
                  name="vehicleModel"
                  placeholder="e.g., Toyota Corolla 2015"
                  value={formData.vehicleModel}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20"
                />
              </div>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bebas text-[#020079] mb-4 pb-2 border-b-2 border-[#020079]/20">
              PROJECT DETAILS
            </h3>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="projectTitle" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                  Project Title <span className="text-[#FFD700]">*</span>
                </Label>
                <Input
                  id="projectTitle"
                  name="projectTitle"
                  placeholder="e.g., Full Restoration, Custom Modification"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="projectDescription" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                  Project Description <span className="text-[#FFD700]">*</span>
                </Label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  placeholder="Detailed project scope, customer requirements, and work to be done..."
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className={cn(
                    "flex w-full rounded-md border border-[#020079]/20 bg-white px-4 py-3 font-roboto text-[#020079] placeholder:text-[#020079]/40",
                    "focus:outline-none focus:ring-2 focus:ring-[#020079]/20 focus:border-[#020079]",
                    "disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  )}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                    Start Date <span className="text-[#FFD700]">*</span>
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] focus:border-[#020079] focus:ring-[#020079]/20"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="estimatedCompletionDate" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                    Est. Completion Date <span className="text-[#FFD700]">*</span>
                  </Label>
                  <Input
                    id="estimatedCompletionDate"
                    name="estimatedCompletionDate"
                    type="date"
                    value={formData.estimatedCompletionDate}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] focus:border-[#020079] focus:ring-[#020079]/20"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="totalCost" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                  Total Project Cost (Rs.) <span className="text-[#FFD700]">*</span>
                </Label>
                <Input
                  id="totalCost"
                  name="totalCost"
                  type="number"
                  min="0"
                  value={formData.totalCost}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] focus:border-[#020079] focus:ring-[#020079]/20"
                />
              </div>
            </div>
          </div>

          {/* Sub-Tasks Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bebas text-[#020079] mb-4 pb-2 border-b-2 border-[#020079]/20">
              SUB-TASKS (ADD MULTIPLE TASKS)
            </h3>
            <div className="space-y-4">
              {formData.subTasks.map((task, index) => (
                <div key={index} className="grid grid-cols-5 gap-4">
                  <div className="col-span-4">
                    <Input
                      placeholder="Sub-task name (e.g., Engine Disassembly)"
                      value={task.name}
                      onChange={(e) => updateSubTask(index, 'name', e.target.value)}
                      required
                      className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20"
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
                      className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={addSubTask}
                className="w-full h-12 bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold"
              >
                + Add Another Sub-Task
              </Button>

              <p className="text-xs font-roboto text-[#020079]/60 mt-1 flex items-center gap-1">
                <span className="text-[#FFD700]"></span>
                You can assign employees to each sub-task later from the Projects board
              </p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-[#FFD700]/10 border-l-4 border-[#FFD700] p-4 mb-6">
            <p className="text-[#020079] font-roboto text-sm flex items-start gap-2">
              <span className="text-[#FFD700] font-bold text-lg"></span>
              <span><strong>Direct Creation:</strong> Project will be created immediately and added to the Discussion board. You can then assign employees to sub-tasks.</span>
            </p>
          </div>

          {/* Action Button */}
          <Button
            type="submit"
            className="w-full h-14 bg-[#020079] hover:bg-[#03009B] text-white font-bebas text-xl tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl"
          >
             Create Project & Add to Board
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}