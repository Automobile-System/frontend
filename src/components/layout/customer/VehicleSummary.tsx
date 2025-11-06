import { useState } from "react";
import AddVehicleModal from "./AddVehicleModal";
import VehicleDetailsModal from "./VehicleDetailsModal";
import EditVehicleModal from "./EditVehicleModal";
import { Car } from "lucide-react";
import { CustomerVehicle } from "@/types/authTypes";
import { deleteCustomerVehicle } from "@/services/api";

interface VehicleSummaryProps {
  vehicles: CustomerVehicle[];
  onVehicleAdded?: () => void;
}

export default function VehicleSummary({
  vehicles,
  onVehicleAdded,
}: VehicleSummaryProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] =
    useState<CustomerVehicle | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<CustomerVehicle | null>(
    null
  );
  const [deletingVehicleId, setDeletingVehicleId] = useState<string | null>(
    null
  );

  const handleViewDetails = (vehicle: CustomerVehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleVehicleAdded = () => {
    setIsAddModalOpen(false);
    if (onVehicleAdded) {
      onVehicleAdded();
    }
  };

  const handleVehicleUpdated = () => {
    setEditingVehicle(null);
    if (onVehicleAdded) {
      onVehicleAdded();
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) {
      return;
    }

    try {
      setDeletingVehicleId(vehicleId);
      await deleteCustomerVehicle(vehicleId);
      if (onVehicleAdded) {
        onVehicleAdded(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
      alert("Failed to delete vehicle. Please try again.");
    } finally {
      setDeletingVehicleId(null);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#111827",
          margin: "0 0 1.5rem 0",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Car size={20} /> My Vehicles
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {vehicles.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem 1rem",
              backgroundColor: "#f9fafb",
              borderRadius: "0.75rem",
              border: "2px dashed #d1d5db",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🚗</div>
            <p style={{ color: "#6b7280", margin: 0, fontSize: "0.875rem" }}>
              No vehicles added yet
            </p>
          </div>
        ) : (
          vehicles.map((vehicle, index) => (
            <div key={vehicle.vehicleId}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#111827",
                        margin: 0,
                      }}
                    >
                      {vehicle.brandName} {vehicle.model}
                    </h3>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        backgroundColor: "#f3f4f6",
                        color: "#374151",
                        borderRadius: "0.375rem",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                      }}
                    >
                      {vehicle.registrationNo}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                      Engine Capacity:
                    </span>
                    <span
                      style={{
                        color: "#111827",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                      }}
                    >
                      {vehicle.capacity} CC
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleViewDetails(vehicle)}
                    style={{
                      padding: "0.5rem 1rem",
                      border: "1px solid #03009B",
                      borderRadius: "0.5rem",
                      backgroundColor: "transparent",
                      color: "#03009B",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#03009B";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#03009B";
                    }}
                  >
                    View
                  </button>

                  <button
                    onClick={() => setEditingVehicle(vehicle)}
                    style={{
                      padding: "0.5rem",
                      border: "1px solid #03009B",
                      borderRadius: "0.5rem",
                      backgroundColor: "transparent",
                      color: "#03009B",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#03009B";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#03009B";
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => handleDeleteVehicle(vehicle.vehicleId)}
                    disabled={deletingVehicleId === vehicle.vehicleId}
                    style={{
                      padding: "0.5rem",
                      border: "1px solid #dc2626",
                      borderRadius: "0.5rem",
                      backgroundColor: "transparent",
                      color: "#dc2626",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      cursor:
                        deletingVehicleId === vehicle.vehicleId
                          ? "not-allowed"
                          : "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s",
                      opacity:
                        deletingVehicleId === vehicle.vehicleId ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (deletingVehicleId !== vehicle.vehicleId) {
                        e.currentTarget.style.backgroundColor = "#dc2626";
                        e.currentTarget.style.color = "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (deletingVehicleId !== vehicle.vehicleId) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#dc2626";
                      }
                    }}
                  >
                    {deletingVehicleId === vehicle.vehicleId ? "..." : "🗑️"}
                  </button>
                </div>
              </div>

              {index < vehicles.length - 1 && (
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#f3f4f6",
                    marginTop: "1rem",
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Vehicle Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        style={{
          width: "100%",
          padding: "0.75rem",
          border: "2px dashed #d1d5db",
          borderRadius: "0.75rem",
          backgroundColor: "#f9fafb",
          color: "#6b7280",
          fontSize: "0.875rem",
          fontWeight: "500",
          cursor: "pointer",
          marginTop: "1rem",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#9ca3af";
          e.currentTarget.style.backgroundColor = "#f3f4f6";
          e.currentTarget.style.color = "#374151";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#d1d5db";
          e.currentTarget.style.backgroundColor = "#f9fafb";
          e.currentTarget.style.color = "#6b7280";
        }}
      >
        + Add New Vehicle
      </button>

      {/* Modals */}
      {isAddModalOpen && (
        <AddVehicleModal
          onClose={() => setIsAddModalOpen(false)}
          onVehicleAdded={handleVehicleAdded}
        />
      )}

      {selectedVehicle && (
        <VehicleDetailsModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}

      {editingVehicle && (
        <EditVehicleModal
          vehicle={editingVehicle}
          onClose={() => setEditingVehicle(null)}
          onVehicleUpdated={handleVehicleUpdated}
        />
      )}
    </div>
  );
}
