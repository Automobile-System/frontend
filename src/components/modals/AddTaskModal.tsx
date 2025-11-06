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
  DialogTitle,
} from "@/components/ui/dialog";

interface Employee {
  name: string;
  skill: string;
  tasks: string;
}

const AVAILABLE_EMPLOYEES: Employee[] = [
  { name: "Ruwan Silva", skill: "Engine Specialist", tasks: "3/5 tasks" },
  { name: "Nimal Fernando", skill: "Bodywork & Paint", tasks: "2/5 tasks" },
  { name: "Kasun Mendis", skill: "Brake Systems", tasks: "1/5 tasks" },
  { name: "Amal Wickramasinghe", skill: "Transmission", tasks: "4/5 tasks" },
  { name: "Kamal Perera", skill: "Electrical", tasks: "5/5 - FULL" },
];

const SERVICE_TYPES = [
  "Engine Oil Change",
  "Brake Inspection & Service",
  "Transmission Service",
  "Electrical Diagnostics",
  "Bodywork & Paint",
  "Full Service Package",
  "Vehicle Diagnostics",
  "Tire Service",
  "AC Service",
  "Other (Specify in notes)"
];

interface TaskFormData {
  customerName: string;
  contactNumber: string;
  vehicleRegistration: string;
  vehicleModel: string;
  serviceType: string;
  serviceNote: string;
  preferredDate: string;
  preferredTime: string;
  estimatedDurationHours: string;
  estimatedPrice: string;
  [key: string]: string; // Allow additional properties
}

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  initialData?: {
    customerName: string;
    vehicleRegistration: string;
    vehicleModel: string;
    serviceType: string;
  };
}

export default function AddTaskModal({ isOpen, onClose, onSubmit, initialData }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    customerName: initialData?.customerName || "",
    contactNumber: "",
    vehicleRegistration: initialData?.vehicleRegistration || "",
    vehicleModel: initialData?.vehicleModel || "",
    serviceType: initialData?.serviceType || "",
    serviceNotes: "",
    estimatedDuration: "2",
    estimatedPrice: "5000",
    preferredDate: "",
    preferredTime: "",
    assignedEmployee: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as unknown as TaskFormData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        {/* Header Section */}
        <div className="-mx-6 -mt-6 px-8 py-6 bg-[#020079] border-b-4 border-[#FFD700]">
          <DialogTitle className="text-3xl font-bebas text-white tracking-wide mb-2">
            ADD NEW TASK (WALK-IN CUSTOMER SERVICE)
          </DialogTitle>
          <DialogDescription className="text-white/90 font-roboto text-base">
            Create a service task for customers who visit the center physically.
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

          {/* Service Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bebas text-[#020079] mb-4 pb-2 border-b-2 border-[#020079]/20">
              SERVICE DETAILS
            </h3>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="serviceType" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                  Service Type <span className="text-[#FFD700]">*</span>
                </Label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  required
                  className={cn(
                    "flex h-12 w-full rounded-md border border-[#020079]/20 bg-white px-4 py-2 font-roboto text-[#020079]",
                    "focus:outline-none focus:ring-2 focus:ring-[#020079]/20 focus:border-[#020079]",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                >
                  <option value="" className="text-[#020079]/40">Select service type...</option>
                  {SERVICE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="serviceNotes" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                  Service Notes / Requirements
                </Label>
                <textarea
                  id="serviceNotes"
                  name="serviceNotes"
                  placeholder="Any specific requirements or issues reported by customer..."
                  value={formData.serviceNotes}
                  onChange={handleInputChange}
                  rows={4}
                  className={cn(
                    "flex w-full rounded-md border border-[#020079]/20 bg-white px-4 py-3 font-roboto text-[#020079] placeholder:text-[#020079]/40",
                    "focus:outline-none focus:ring-2 focus:ring-[#020079]/20 focus:border-[#020079]",
                    "disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="estimatedDuration" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                    Est. Duration (hrs) <span className="text-[#FFD700]">*</span>
                  </Label>
                  <Input
                    id="estimatedDuration"
                    name="estimatedDuration"
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={formData.estimatedDuration}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] focus:border-[#020079] focus:ring-[#020079]/20"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="estimatedPrice" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                    Est. Price (Rs.) <span className="text-[#FFD700]">*</span>
                  </Label>
                  <Input
                    id="estimatedPrice"
                    name="estimatedPrice"
                    type="number"
                    min="0"
                    value={formData.estimatedPrice}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] focus:border-[#020079] focus:ring-[#020079]/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scheduling Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bebas text-[#020079] mb-4 pb-2 border-b-2 border-[#020079]/20">
              SCHEDULING
            </h3>
            <div className="grid gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="preferredDate" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                    Preferred Date <span className="text-[#FFD700]">*</span>
                  </Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] focus:border-[#020079] focus:ring-[#020079]/20"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="preferredTime" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                    Preferred Time <span className="text-[#FFD700]">*</span>
                  </Label>
                  <Input
                    id="preferredTime"
                    name="preferredTime"
                    type="time"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] focus:border-[#020079] focus:ring-[#020079]/20"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="assignedEmployee" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                  Assign Employee (Optional)
                </Label>
                <select
                  id="assignedEmployee"
                  name="assignedEmployee"
                  value={formData.assignedEmployee}
                  onChange={handleInputChange}
                  className={cn(
                    "flex h-12 w-full rounded-md border border-[#020079]/20 bg-white px-4 py-2 font-roboto text-[#020079]",
                    "focus:outline-none focus:ring-2 focus:ring-[#020079]/20 focus:border-[#020079]"
                  )}
                >
                  <option value="" className="text-[#020079]/60">Auto-assign available employee</option>
                  {AVAILABLE_EMPLOYEES.map(emp => (
                    <option 
                      key={emp.name} 
                      value={emp.name}
                      disabled={emp.tasks.includes("FULL")}
                    >
                      {emp.name} - {emp.skill} ({emp.tasks})
                    </option>
                  ))}
                </select>
                <p className="text-xs font-roboto text-[#020079]/60 mt-1 flex items-center gap-1">
                  Leave blank to auto-assign based on availability and skill match
                </p>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-[#FFD700]/10 border-l-4 border-[#FFD700] p-4 mb-6">
            <p className="text-[#020079] font-roboto text-sm flex items-start gap-2">
              <span><strong>Direct Creation:</strong> Task will be created immediately and added to schedule. No approval needed.</span>
            </p>
          </div>

          {/* Action Button */}
          <Button
            type="submit"
            className="w-full h-14 bg-[#020079] hover:bg-[#03009B] text-white font-bebas text-xl tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl"
          >
             Create Task & Add to Schedule
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}