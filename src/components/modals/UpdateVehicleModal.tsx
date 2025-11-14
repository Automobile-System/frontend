"use client";

import { useState } from "react";
import { showToast } from "@/lib/toast";
import { X, AlertCircle, Loader2 } from "lucide-react";
import { CustomerVehicle } from "@/types/authTypes";

interface UpdateVehicleModalProps {
  vehicle: CustomerVehicle;
  onClose: () => void;
  onVehicleUpdated?: () => void;
}

interface FormErrors {
  registrationNo?: string;
  brandName?: string;
  model?: string;
  capacity?: string;
}

export default function UpdateVehicleModal({ vehicle, onClose, onVehicleUpdated }: UpdateVehicleModalProps) {
  const [formData, setFormData] = useState({
    registrationNo: vehicle.registrationNo,
    brandName: vehicle.brandName,
    model: vehicle.model,
    capacity: vehicle.capacity,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.registrationNo.trim()) {
      newErrors.registrationNo = "Registration number is required";
    } else if (!/^[A-Z]{2,3}-\d{4}$/.test(formData.registrationNo.trim())) {
      newErrors.registrationNo = "Invalid format. Use format: XX-1234 or XXX-1234";
    }

    if (!formData.brandName.trim()) {
      newErrors.brandName = "Brand name is required";
    }

    if (!formData.model.trim()) {
      newErrors.model = "Model is required";
    }

    if (!formData.capacity || formData.capacity <= 0) {
      newErrors.capacity = "Valid capacity is required";
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/vehicles/${vehicle.vehicleId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registrationNo: formData.registrationNo.trim(),
            brandName: formData.brandName.trim(),
            model: formData.model.trim(),
            capacity: formData.capacity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update vehicle");
      }
      
      showToast.success("Vehicle updated successfully!");
      
      if (onVehicleUpdated) {
        onVehicleUpdated();
      }
      onClose();
    } catch (err: unknown) {
      console.error("Failed to update vehicle:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to update vehicle. Please try again.";
      showToast.error(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
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
              Update Vehicle
            </h2>
            <p className="text-gray-600 text-sm">
              Modify your vehicle information
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
              Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., KA-1234"
              value={formData.registrationNo}
              onChange={(e) => handleInputChange('registrationNo', e.target.value.toUpperCase())}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none transition-all ${
                errors.registrationNo
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200'
              }`}
            />
            {errors.registrationNo && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.registrationNo}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Toyota"
              value={formData.brandName}
              onChange={(e) => handleInputChange('brandName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none transition-all ${
                errors.brandName
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200'
              }`}
            />
            {errors.brandName && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.brandName}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Corolla"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none transition-all ${
                errors.model
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200'
              }`}
            />
            {errors.model && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.model}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Engine Capacity (CC) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 1500"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 0)}
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none transition-all ${
                errors.capacity
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200'
              }`}
            />
            {errors.capacity && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                <AlertCircle size={12} />
                <span>{errors.capacity}</span>
              </div>
            )}
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
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-semibold text-sm shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Vehicle"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
