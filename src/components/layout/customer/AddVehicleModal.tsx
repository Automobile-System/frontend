"use client";

import { useState } from "react";

interface AddVehicleModalProps {
  onClose: () => void;
}

export default function AddVehicleModal({ onClose }: AddVehicleModalProps) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    plateNumber: "",
    photo: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Vehicle data:", formData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files![0] }));
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

          {/* Year */}
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
              Year *
            </label>
            <input
              type="number"
              required
              placeholder="e.g., 2020"
              min="1990"
              max="2024"
              value={formData.year}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, year: e.target.value }))
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
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Plate Number *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., KA-1234"
              value={formData.plateNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  plateNumber: e.target.value,
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

          {/* Vehicle Photo */}
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
              Vehicle Photo (Optional)
            </label>
            <div
              style={{
                border: "2px dashed #d1d5db",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                textAlign: "center" as const,
                backgroundColor: "#f9fafb",
                transition: "all 0.2s ease",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#03009B";
                e.currentTarget.style.backgroundColor = "rgba(3, 0, 155, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.backgroundColor = "#f9fafb";
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                  zIndex: 1,
                }}
              />
              {formData.photo ? (
                <div style={{ zIndex: 0, position: "relative" }}>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#03009B",
                      margin: "0 0 0.5rem 0",
                      fontWeight: "600",
                    }}
                  >
                    ✓ {formData.photo.name}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      margin: 0,
                    }}
                  >
                    Click to change file
                  </p>
                </div>
              ) : (
                <div style={{ zIndex: 0, position: "relative" }}>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#374151",
                      margin: "0 0 0.5rem 0",
                      fontWeight: "500",
                    }}
                  >
                    📷 Upload Photo
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      margin: 0,
                    }}
                  >
                    Click to browse or drag and drop
                  </p>
                </div>
              )}
            </div>
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
              style={{
                padding: "0.75rem 1.5rem",
                background: "#03009B",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "600",
                transition: "all 0.2s ease",
                outline: "none",
                boxShadow: "0 2px 8px rgba(3, 0, 155, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#020079";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(3, 0, 155, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#03009B";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(3, 0, 155, 0.2)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.background = "#01024D";
                e.currentTarget.style.transform = "scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.background = "#020079";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(3, 0, 155, 0.3)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(3, 0, 155, 0.2)";
              }}
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
