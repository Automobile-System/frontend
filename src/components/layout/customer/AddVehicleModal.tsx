"use client";

import { useState } from "react";
import { addCustomerVehicle } from "@/services/api";
import { showToast } from "@/lib/toast";
import { X, AlertCircle, Loader2 } from "lucide-react";

interface AddVehicleModalProps {
  onClose: () => void;
  onVehicleAdded?: () => void;
}

interface FormErrors {
  brandName?: string;
  model?: string;
  capacity?: string;
  registrationNo?: string;
}

export default function AddVehicleModal({ onClose, onVehicleAdded }: AddVehicleModalProps) {
  const [formData, setFormData] = useState({
    brandName: "",
    model: "",
    registrationNo: "",
    capacity: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Brand Name validation
    if (!formData.brandName.trim()) {
      newErrors.brandName = "Brand name is required";
    } else if (formData.brandName.trim().length < 2) {
      newErrors.brandName = "Brand name must be at least 2 characters";
    }

    // Model validation
    if (!formData.model.trim()) {
      newErrors.model = "Model is required";
    } else if (formData.model.trim().length < 1) {
      newErrors.model = "Model must be at least 1 character";
    }

    // Capacity validation
    if (!formData.capacity) {
      newErrors.capacity = "Engine capacity is required";
    } else {
      const capacityNum = parseInt(formData.capacity);
      if (isNaN(capacityNum)) {
        newErrors.capacity = "Capacity must be a number";
      } else if (capacityNum < 50) {
        newErrors.capacity = "Capacity must be at least 50 CC";
      } else if (capacityNum > 10000) {
        newErrors.capacity = "Capacity seems too high (max 10000 CC)";
      }
    }

    // Registration Number validation
    if (!formData.registrationNo.trim()) {
      newErrors.registrationNo = "Registration number is required";
    } else if (formData.registrationNo.trim().length < 3) {
      newErrors.registrationNo = "Registration number must be at least 3 characters";
    } else if (!/^[A-Z0-9-]+$/.test(formData.registrationNo.trim())) {
      newErrors.registrationNo = "Registration number can only contain letters, numbers, and hyphens";
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
      await addCustomerVehicle({
        registrationNo: formData.registrationNo.toUpperCase().trim(),
        brandName: formData.brandName.trim(),
        model: formData.model.trim(),
        capacity: parseInt(formData.capacity)
      });
      
      showToast.success("Vehicle added successfully!");
      
      if (onVehicleAdded) {
        onVehicleAdded();
      }
      onClose();
    } catch (err: unknown) {
      console.error("Failed to add vehicle:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to add vehicle. Please try again.";
      showToast.error(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
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
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Add New Vehicle
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your vehicle details
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Vehicle Make/Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Toyota, Honda, Bajaj"
              value={formData.brandName}
              onChange={(e) => handleInputChange('brandName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none transition-all ${
                errors.brandName
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-[#020079] focus:ring-2 focus:ring-[#020079]/20'
              }`}
            />
            {errors.brandName && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.brandName}</span>
              </div>
            )}
          </div>

          {/* Vehicle Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Corolla, Civic, Discover"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none transition-all ${
                errors.model
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-[#020079] focus:ring-2 focus:ring-[#020079]/20'
              }`}
            />
            {errors.model && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.model}</span>
              </div>
            )}
          </div>

          {/* Engine Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Engine Capacity (CC) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 100, 1500, 2000"
              min="50"
              max="10000"
              step="1"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none transition-all ${
                errors.capacity
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-[#020079] focus:ring-2 focus:ring-[#020079]/20'
              }`}
            />
            {errors.capacity && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.capacity}</span>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Enter the engine capacity in cubic centimeters (50-10000)
            </p>
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., KA-1234, BCI-3276"
              value={formData.registrationNo}
              onChange={(e) => handleInputChange('registrationNo', e.target.value.toUpperCase())}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none transition-all uppercase ${
                errors.registrationNo
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-[#020079] focus:ring-2 focus:ring-[#020079]/20'
              }`}
            />
            {errors.registrationNo && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.registrationNo}</span>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Enter your vehicle&apos;s registration/plate number
            </p>
          </div>

          {/* Buttons */}
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
                "Add Vehicle"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
