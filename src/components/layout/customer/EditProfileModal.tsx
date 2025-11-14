"use client";

import { useState } from "react";
import { CustomerProfile } from "@/types/authTypes";

interface EditProfileModalProps {
  customer: CustomerProfile;
  onClose: () => void;
  onSave: (updatedData: Partial<CustomerProfile>) => void;
}

export default function EditProfileModal({
  customer,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    nationalId: customer.nationalId,
    profileImageUrl: customer.profileImageUrl || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-500 rounded hover:bg-gray-100 hover:text-[#020079] transition"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {/* First + Last */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                  className="w-full px-3 py-3 border text-[#020079] border-gray-300 rounded-lg text-sm focus:border-[#03009B] focus:ring-4 focus:ring-[#03009B]/20 outline-none transition"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                  className="w-full px-3 py-3 border text-[#020079] border-gray-300 rounded-lg text-sm focus:border-[#03009B] focus:ring-4 focus:ring-[#03009B]/20 outline-none transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="w-full px-3 py-3 border text-[#020079] border-gray-300 rounded-lg text-sm focus:border-[#03009B] focus:ring-4 focus:ring-[#03009B]/20 outline-none transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                required
                className="w-full px-3 py-3 border text-[#020079] border-gray-300 rounded-lg text-sm focus:border-[#03009B] focus:ring-4 focus:ring-[#03009B]/20 outline-none transition"
              />
            </div>

            {/* NIC */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                National ID
              </label>
              <input
                type="text"
                value={formData.nationalId}
                onChange={(e) => handleChange("nationalId", e.target.value)}
                required
                className="w-full px-3 py-3 border text-[#020079] border-gray-300 rounded-lg text-sm focus:border-[#03009B] focus:ring-4 focus:ring-[#03009B]/20 outline-none transition"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image URL (Optional)
              </label>
              <input
                type="url"
                value={formData.profileImageUrl}
                onChange={(e) =>
                  handleChange("profileImageUrl", e.target.value)
                }
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-3 border text-[#020079] border-gray-300 rounded-lg text-sm focus:border-[#03009B] focus:ring-4 focus:ring-[#03009B]/20 outline-none transition"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 border  border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-3 rounded-lg text-sm font-medium text-white border transition
                ${
                  isSubmitting
                    ? "bg-gray-400 border-gray-400 cursor-not-allowed opacity-60"
                    : "bg-[#03009B] border-[#03009B] hover:bg-[#020079] hover:border-[#020079] focus:ring-4 focus:ring-[#03009B]/30"
                }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
