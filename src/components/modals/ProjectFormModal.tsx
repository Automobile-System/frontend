"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

type ValidationErrors = Record<string, string | undefined>;

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

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  // Validation rules
  const validate = (name: string, value: any): string | undefined => {
    switch (name) {
      case "customerName":
        if (!value || !value.trim()) return "Customer name is required";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters and spaces allowed";
        if (value.trim().length < 2) return "Minimum 2 characters required";
        if (value.length > 50) return "Maximum 50 characters allowed";
        return undefined;

      case "contactNumber":
        if (!value || !value.trim()) return "Contact number is required";
        // Sri Lankan format: 0xxxxxxxxx (10 digits starting with 0)
        const cleanNum = value.replace(/[\s\-]/g, '');
        if (!/^0\d{9}$/.test(cleanNum)) return "Format: 0xxxxxxxxx (10 digits starting with 0)";
        return undefined;

      case "vehicleRegistration":
        if (!value || !value.trim()) return "Vehicle registration is required";
        // Format: ABC-1234 or ABC 1234 (3 uppercase letters, hyphen/space, 4 digits)
        if (!/^[A-Z]{3}[\s\- ]\d{4}$/.test(value.trim())) return "Format: ABC-1234 or ABC 1234 (3 uppercase letters, space/hyphen, 4 digits)";
        return undefined;

      case "vehicleModel":
        if (!value || !value.trim()) return "Vehicle model is required";
        if (!/^[a-zA-Z][a-zA-Z0-9\s]*$/.test(value.trim())) return "Must start with a letter, then letters/numbers/spaces";
        if (value.trim().length < 2) return "Minimum 2 characters required";
        return undefined;

      case "projectTitle":
        if (!value || !value.trim()) return "Project title is required";
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return "Only letters and spaces allowed";
        if (value.trim().length < 2) return "Minimum 2 characters required";
        if (value.length > 100) return "Maximum 100 characters allowed";
        return undefined;

      case "projectDescription":
        if (!value || !value.trim()) return "Project description is required";
        if (value.trim().length < 1) return "Minimum 1 character required";
        if (value.length > 200) return "Maximum 200 characters allowed";
        return undefined;

      case "startDate":
        if (!value) return "Start date is required";
        return undefined;

      case "estimatedCompletionDate":
        if (!value) return "Completion date is required";
        if (formData.startDate && value < formData.startDate) return "Completion date must be after start date";
        return undefined;

      case "totalCost":
        if (!value || value === "0") return "Total cost is required";
        const cost = Number(value);
        if (isNaN(cost) || cost <= 0) return "Cost must be a positive number";
        if (cost > 9000000) return "Maximum cost is Rs. 900,0000";
        return undefined;

      default:
        // Sub-task name validation
        if (name.startsWith("subTask-") && name.endsWith("-name")) {
          if (!value || !value.trim()) return "Sub-task name is required";
          if (!/^[a-zA-Z\s]+$/.test(value.trim())) return "Only letters and spaces allowed";
          if (value.trim().length < 2) return "Minimum 2 characters required";
          return undefined;
        }
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Mark as touched
    setTouched(prev => new Set(prev).add(name));
    
    // Validate on change
    const error = validate(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (name: string) => {
    setTouched(prev => new Set(prev).add(name));
    const value = (formData as any)[name];
    const error = validate(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const addSubTask = () => {
    setFormData(prev => ({
      ...prev,
      subTasks: [...prev.subTasks, { name: "", hours: 0 }]
    }));
  };

  const deleteSubTask = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subTasks: prev.subTasks.filter((_, i) => i !== index)
    }));
    
    // Clear errors for this sub-task
    const nameKey = `subTask-${index}-name`;
    const hoursKey = `subTask-${index}-hours`;
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[nameKey];
      delete newErrors[hoursKey];
      return newErrors;
    });
    setTouched(prev => {
      const newTouched = new Set(prev);
      newTouched.delete(nameKey);
      newTouched.delete(hoursKey);
      return newTouched;
    });
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
    
    // Validate sub-task name
    if (field === 'name') {
      const key = `subTask-${index}-name`;
      setTouched(prev => new Set(prev).add(key));
      const error = validate(key, value);
      setErrors(prev => ({
        ...prev,
        [key]: error
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: ValidationErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'subTasks') {
        const error = validate(key, (formData as any)[key]);
        if (error) newErrors[key as keyof ProjectFormData] = error;
      }
    });
    
    // Validate sub-tasks
    formData.subTasks.forEach((task, idx) => {
      const nameError = validate(`subTask-${idx}-name`, task.name);
      if (nameError) newErrors[`subTask-${idx}-name`] = nameError;
      if (!task.hours || task.hours <= 0) {
        newErrors[`subTask-${idx}-hours`] = "Hours required";
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Mark all as touched
      const allFields = new Set([
        ...Object.keys(formData).filter(k => k !== 'subTasks'),
        ...formData.subTasks.map((_, i) => `subTask-${i}-name`)
      ]);
      setTouched(allFields);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
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
                  onBlur={() => handleBlur("customerName")}
                  required
                  title={errors.customerName || "Letters and spaces only, 2-50 characters"}
                  className={cn(
                    "h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20",
                    touched.has("customerName") && errors.customerName && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                {touched.has("customerName") && errors.customerName && (
                  <p className="text-xs text-red-600 font-roboto">{errors.customerName}</p>
                )}
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
                  onBlur={() => handleBlur("contactNumber")}
                  required
                  title={errors.contactNumber || "Format: 0xxxxxxxxx (10 digits starting with 0)"}
                  className={cn(
                    "h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20",
                    touched.has("contactNumber") && errors.contactNumber && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                {touched.has("contactNumber") && errors.contactNumber && (
                  <p className="text-xs text-red-600 font-roboto">{errors.contactNumber}</p>
                )}
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
                  placeholder="e.g., ABC-1234 or ABC 1234"
                  value={formData.vehicleRegistration}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("vehicleRegistration")}
                  required
                  title={errors.vehicleRegistration || "Format: ABC-1234 or ABC 1234 (3 uppercase letters, space/hyphen, 4 digits)"}
                  className={cn(
                    "h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20",
                    touched.has("vehicleRegistration") && errors.vehicleRegistration && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                {touched.has("vehicleRegistration") && errors.vehicleRegistration && (
                  <p className="text-xs text-red-600 font-roboto">{errors.vehicleRegistration}</p>
                )}
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
                  onBlur={() => handleBlur("vehicleModel")}
                  required
                  title={errors.vehicleModel || "Start with letter, then letters/numbers/spaces, min 2 chars"}
                  className={cn(
                    "h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20",
                    touched.has("vehicleModel") && errors.vehicleModel && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                {touched.has("vehicleModel") && errors.vehicleModel && (
                  <p className="text-xs text-red-600 font-roboto">{errors.vehicleModel}</p>
                )}
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
                  onBlur={() => handleBlur("projectTitle")}
                  required
                  title={errors.projectTitle || "Letters and spaces only, 2-100 characters"}
                  className={cn(
                    "h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20",
                    touched.has("projectTitle") && errors.projectTitle && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                {touched.has("projectTitle") && errors.projectTitle && (
                  <p className="text-xs text-red-600 font-roboto">{errors.projectTitle}</p>
                )}
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
                  onBlur={() => handleBlur("projectDescription")}
                  rows={4}
                  title={errors.projectDescription || "Any characters, 1-200 characters"}
                  className={cn(
                    "flex w-full rounded-md border border-[#020079]/20 bg-white px-4 py-3 font-roboto text-[#020079] placeholder:text-[#020079]/40",
                    "focus:outline-none focus:ring-2 focus:ring-[#020079]/20 focus:border-[#020079]",
                    "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                    touched.has("projectDescription") && errors.projectDescription && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                  required
                />
                {touched.has("projectDescription") && errors.projectDescription && (
                  <p className="text-xs text-red-600 font-roboto">{errors.projectDescription}</p>
                )}
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
                    onBlur={() => handleBlur("startDate")}
                    onFocus={(e) => e.target.showPicker?.()}
                    required
                    title={errors.startDate || "Select a start date"}
                    className={cn(
                      "h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] focus:border-[#020079] focus:ring-[#020079]/20",
                      touched.has("startDate") && errors.startDate && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    )}
                  />
                  {touched.has("startDate") && errors.startDate && (
                    <p className="text-xs text-red-600 font-roboto">{errors.startDate}</p>
                  )}
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
                    onBlur={() => handleBlur("estimatedCompletionDate")}
                    onFocus={(e) => e.target.showPicker?.()}
                    required
                    title={errors.estimatedCompletionDate || "Select completion date (after start date)"}
                    className={cn(
                      "h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] focus:border-[#020079] focus:ring-[#020079]/20",
                      touched.has("estimatedCompletionDate") && errors.estimatedCompletionDate && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    )}
                  />
                  {touched.has("estimatedCompletionDate") && errors.estimatedCompletionDate && (
                    <p className="text-xs text-red-600 font-roboto">{errors.estimatedCompletionDate}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="totalCost" className="text-sm font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide">
                  Total Project Cost (Rs.) <span className="text-[#FFD700]">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#020079]/60 font-roboto">Rs.</span>
                  <Input
                    id="totalCost"
                    name="totalCost"
                    type="text"
                    inputMode="numeric"
                    value={formData.totalCost ? Number(formData.totalCost).toLocaleString('en-IN') : ''}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      handleInputChange({ ...e, target: { ...e.target, name: 'totalCost', value: raw } });
                    }}
                    onBlur={() => handleBlur("totalCost")}
                    required
                    placeholder="e.g., 1,50,000"
                    title={errors.totalCost || "Enter cost (max Rs. 90,00,000)"}
                    className={cn(
                      "h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] pl-14 focus:border-[#020079] focus:ring-[#020079]/20",
                      touched.has("totalCost") && errors.totalCost && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    )}
                  />
                </div>
                {touched.has("totalCost") && errors.totalCost && (
                  <p className="text-xs text-red-600 font-roboto">{errors.totalCost}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sub-Tasks Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bebas text-[#020079] mb-4 pb-2 border-b-2 border-[#020079]/20">
              SUB-TASKS (ADD MULTIPLE TASKS)
            </h3>
            <div className="space-y-4">
              {formData.subTasks.map((task, index) => {
                const nameKey = `subTask-${index}-name`;
                const hoursKey = `subTask-${index}-hours`;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-3 items-start">
                      <div className="grid grid-cols-5 gap-4 flex-1">
                        <div className="col-span-4">
                          <Input
                            placeholder="Sub-task name (e.g., Engine Disassembly)"
                            value={task.name}
                            onChange={(e) => updateSubTask(index, 'name', e.target.value)}
                            onBlur={() => {
                              setTouched(prev => new Set(prev).add(nameKey));
                            }}
                            required
                            title={errors[nameKey] || "Letters and spaces only, min 2 chars"}
                            className={cn(
                              "h-12 border-[#020079]/20 bg-white font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:border-[#020079] focus:ring-[#020079]/20",
                              touched.has(nameKey) && errors[nameKey] && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            )}
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
                      <Button
                        type="button"
                        onClick={() => deleteSubTask(index)}
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete sub-task"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    {touched.has(nameKey) && errors[nameKey] && (
                      <p className="text-xs text-red-600 font-roboto">{errors[nameKey]}</p>
                    )}
                  </div>
                );
              })}

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