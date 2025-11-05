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

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
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
    onSubmit(formData);
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="bg-emerald-600 -mx-6 -mt-6 px-6 py-4 mb-4">
          <DialogTitle className="text-2xl font-bold text-white">
            Add New Task (Walk-in Customer Service)
          </DialogTitle>
          <DialogDescription className="text-white/90">
            Create a service task for customers who visit the center physically.
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
            <Label htmlFor="serviceType">
              Service Type <span className="text-red-500">*</span>
            </Label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              required
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              <option value="">Select service type...</option>
              {SERVICE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="serviceNotes">Service Notes / Requirements</Label>
            <textarea
              id="serviceNotes"
              name="serviceNotes"
              placeholder="Any specific requirements or issues reported by customer..."
              value={formData.serviceNotes}
              onChange={handleInputChange}
              className={cn(
                "flex min-h-[100px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="estimatedDuration">
                Estimated Duration (hours) <span className="text-red-500">*</span>
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
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="estimatedPrice">
                Estimated Price (Rs.) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="estimatedPrice"
                name="estimatedPrice"
                type="number"
                min="0"
                value={formData.estimatedPrice}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="preferredDate">
                Preferred Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="preferredTime">
                Preferred Time <span className="text-red-500">*</span>
              </Label>
              <Input
                id="preferredTime"
                name="preferredTime"
                type="time"
                value={formData.preferredTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="assignedEmployee">
              Assign Employee (Optional)
            </Label>
            <select
              id="assignedEmployee"
              name="assignedEmployee"
              value={formData.assignedEmployee}
              onChange={handleInputChange}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              )}
            >
              <option value="">Auto-assign available employee</option>
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
            <p className="text-sm text-amber-600 mt-1">
              💡 Leave blank to auto-assign based on availability and skill match
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="text-green-700 flex items-center gap-2">
              <span className="text-lg">✓</span>
              Direct Creation: Task will be created immediately and added to schedule. No approval needed.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3"
          >
            ✓ Create Task & Add to Schedule
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}