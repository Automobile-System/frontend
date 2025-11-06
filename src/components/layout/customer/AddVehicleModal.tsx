"use client";

import { useState } from "react";
import { addCustomerVehicle } from "@/services/api";

interface AddVehicleModalProps {
  onClose: () => void;
  onVehicleAdded?: () => void;
}

export default function AddVehicleModal({ onClose, onVehicleAdded }: AddVehicleModalProps) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    plateNumber: "",
    capacity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await addCustomerVehicle({
        registrationNo: formData.plateNumber.toUpperCase(),
        brandName: formData.make,
        model: formData.model,
        capacity: parseInt(formData.capacity)
      });
      
      // Call the callback to refresh the vehicle list
      if (onVehicleAdded) {
        onVehicleAdded();
      }
      onClose();
    } catch (err: unknown) {
      console.error("Failed to add vehicle:", err);
      setError(err instanceof Error ? err.message : "Failed to add vehicle. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: "0.75rem",
          padding: "2rem",
          width: "90%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#111827",
              margin: "0 0 0.5rem 0",
            }}
          >
            Add New Vehicle
          </h2>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Enter your vehicle details
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <p style={{ color: '#991b1b', margin: 0, fontSize: '0.875rem' }}>
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Vehicle Make */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Vehicle Make *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Toyota"
              value={formData.make}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, make: e.target.value }))
              }
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#03009B";
                e.target.style.boxShadow = "0 0 0 3px rgba(3, 0, 155, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Vehicle Model */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Vehicle Model *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Corolla"
              value={formData.model}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, model: e.target.value }))
              }
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#03009B";
                e.target.style.boxShadow = "0 0 0 3px rgba(3, 0, 155, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Capacity */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Engine Capacity (CC) *
            </label>
            <input
              type="number"
              required
              placeholder="e.g., 1500"
              min="1"
              value={formData.capacity}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, capacity: e.target.value }))
              }
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#03009B";
                e.target.style.boxShadow = "0 0 0 3px rgba(3, 0, 155, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Plate Number */}
          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Registration/Plate Number *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., KA-1234"
              value={formData.plateNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  plateNumber: e.target.value.toUpperCase(),
                }))
              }
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                outline: "none",
                transition: "border-color 0.2s",
                textTransform: "uppercase",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#03009B";
                e.target.style.boxShadow = "0 0 0 3px rgba(3, 0, 155, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Buttons */}
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.75rem 1.5rem",
                border: "1px solid #d1d5db",
                background: "white",
                color: "#374151",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb";
                e.currentTarget.style.borderColor = "#9ca3af";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.borderColor = "#d1d5db";
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "0.75rem 1.5rem",
                background: isSubmitting ? "#9ca3af" : "#03009B",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontSize: "0.875rem",
                fontWeight: "600",
                transition: "all 0.2s ease",
                outline: "none",
                boxShadow: "0 2px 8px rgba(3, 0, 155, 0.2)",
                opacity: isSubmitting ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = "#020079";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(3, 0, 155, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = "#03009B";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(3, 0, 155, 0.2)";
                }
              }}
              onMouseDown={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = "#01024D";
                  e.currentTarget.style.transform = "scale(0.98)";
                }
              }}
              onMouseUp={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = "#020079";
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
              onFocus={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(3, 0, 155, 0.3)";
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(3, 0, 155, 0.2)";
              }}
            >
              {isSubmitting ? "Adding Vehicle..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
