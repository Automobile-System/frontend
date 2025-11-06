import { CustomerVehicle } from '@/types/authTypes';

interface VehicleDetailsModalProps {
  vehicle: CustomerVehicle;
  onClose: () => void;
}

export default function VehicleDetailsModal({
  vehicle,
  onClose,
}: VehicleDetailsModalProps) {

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "1rem",
          padding: "2rem",
          maxWidth: "500px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#111827",
                margin: "0 0 0.5rem 0",
              }}
            >
              {vehicle.brandName} {vehicle.model}
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  borderRadius: "1rem",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                }}
              >
                {vehicle.registrationNo}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              color: "#6b7280",
              cursor: "pointer",
              padding: "0.25rem",
            }}
          >
            ×
          </button>
        </div>

        {/* Vehicle Details */}
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#111827",
              margin: "0 0 1rem 0",
            }}
          >
            Vehicle Information
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Brand & Model
              </span>
              <span style={{ color: "#111827", fontWeight: "500" }}>
                {vehicle.brandName} {vehicle.model}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Registration Number
              </span>
              <span style={{ color: "#111827", fontWeight: "500" }}>
                {vehicle.registrationNo}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Engine Capacity
              </span>
              <span style={{ color: "#111827", fontWeight: "500" }}>
                {vehicle.capacity} CC
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Vehicle ID
              </span>
              <span
                style={{
                  color: "#111827",
                  fontWeight: "500",
                  fontSize: "0.75rem",
                }}
              >
                {vehicle.vehicleId}
              </span>
            </div>
          </div>
        </div>

        {/* Service Information Placeholder */}
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#111827",
              margin: "0 0 1rem 0",
            }}
          >
            Service History
          </h3>

          <div
            style={{
              padding: "1.5rem",
              backgroundColor: "#f9fafb",
              borderRadius: "0.5rem",
              textAlign: "center",
              border: "1px solid #e5e7eb",
            }}
          >
            <p style={{ color: "#6b7280", margin: 0, fontSize: "0.875rem" }}>
              No service history available yet
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            paddingTop: "1.5rem",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "0.75rem 1.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              backgroundColor: "white",
              color: "#374151",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <button
            onClick={() => {
              // Handle book service logic
              console.log("Book service for:", vehicle.vehicleId);
              onClose();
            }}
            style={{
              padding: "0.75rem 1.5rem",
              border: "1px solid #03009B",
              borderRadius: "0.5rem",
              backgroundColor: "#03009B",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#020079";
              e.currentTarget.style.borderColor = "#020079";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#03009B";
              e.currentTarget.style.borderColor = "#03009B";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = "#01024D";
              e.currentTarget.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = "#020079";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
}
