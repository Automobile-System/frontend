"use client";

import { useState, useEffect } from "react";
import { showToast } from "@/lib/toast";
import { getCustomerVehicles } from "@/services/api";
import { CustomerVehicle } from "@/types/authTypes";
import { X, AlertCircle, Loader2 } from "lucide-react";

interface AddProjectModalProps {
  onClose: () => void;
  onProjectAdded?: () => void;
}

interface FormErrors {
  vehicleId?: string;
  title?: string;
  description?: string;
}

export default function AddProjectModal({ onClose, onProjectAdded }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    vehicleId: "",
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehicles, setVehicles] = useState<CustomerVehicle[]>([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setIsLoadingVehicles(true);
      const data = await getCustomerVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
      showToast.error('Failed to load vehicles');
    } finally {
      setIsLoadingVehicles(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.vehicleId) {
      newErrors.vehicleId = "Please select a vehicle";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast.error("Please fix the form errors before submitting");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/projects`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleId: formData.vehicleId,
          title: formData.title.trim(),
          description: formData.description.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add project");
      }
      
      showToast.success("Project added successfully!");
      
      if (onProjectAdded) {
        onProjectAdded();
      }
      onClose();
    } catch (err: unknown) {
      console.error("Failed to add project:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to add project. Please try again.";
      showToast.error(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Add New Project
            </h2>
            <p className="text-gray-600 text-sm">
              Create a custom project for your vehicle
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.vehicleId}
              onChange={(e) => handleInputChange('vehicleId', e.target.value)}
              disabled={isLoadingVehicles}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 outline-none transition-all ${
                errors.vehicleId
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-[#020079] focus:ring-2 focus:ring-[#020079]/20'
              }`}
            >
              <option value="">{isLoadingVehicles ? 'Loading vehicles...' : 'Select a vehicle'}</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                  {vehicle.brandName} {vehicle.model} - {vehicle.registrationNo}
                </option>
              ))}
            </select>
            {errors.vehicleId && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.vehicleId}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter project title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none transition-all ${
                errors.title
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-[#020079] focus:ring-2 focus:ring-[#020079]/20'
              }`}
            />
            {errors.title && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Provide detailed description of the project requirements..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={5}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none ${
                errors.description
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-[#020079] focus:ring-2 focus:ring-[#020079]/20'
              }`}
            />
            {errors.description && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.description}</span>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Minimum 20 characters required
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-[#020079] text-white rounded-lg hover:bg-[#03009B] transition-all font-semibold text-sm shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
