interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  lastService: string;
  nextService: string;
  mileage?: number;
  color?: string;
  vin?: string;
}

interface VehicleDetailsModalProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export default function VehicleDetailsModal({
  vehicle,
  onClose,
}: VehicleDetailsModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getServiceStatus = (nextService: string) => {
    const today = new Date();
    const nextServiceDate = new Date(nextService);
    const diffTime = nextServiceDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: "Overdue", color: "#ef4444" };
    if (diffDays <= 7) return { status: "Due Soon", color: "#f59e0b" };
    if (diffDays <= 30)
      return { status: "Upcoming", color: "var(--color-primary)" };
    return { status: "Scheduled", color: "#10b981" };
  };

  const serviceStatus = getServiceStatus(vehicle.nextService);

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
              {vehicle.year} {vehicle.make} {vehicle.model}
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
                {vehicle.licensePlate}
              </span>
              {vehicle.color && (
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
                  {vehicle.color}
                </span>
              )}
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
                Make & Model
              </span>
              <span style={{ color: "#111827", fontWeight: "500" }}>
                {vehicle.make} {vehicle.model}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Year
              </span>
              <span style={{ color: "#111827", fontWeight: "500" }}>
                {vehicle.year}
              </span>
            </div>

            {vehicle.vin && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                  VIN
                </span>
                <span
                  style={{
                    color: "#111827",
                    fontWeight: "500",
                    fontSize: "0.75rem",
                  }}
                >
                  {vehicle.vin}
                </span>
              </div>
            )}

            {vehicle.mileage && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                  Mileage
                </span>
                <span style={{ color: "#111827", fontWeight: "500" }}>
                  {vehicle.mileage.toLocaleString()} miles
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Service Information */}
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#111827",
              margin: "0 0 1rem 0",
            }}
          >
            Service Information
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Last Service
              </span>
              <span style={{ color: "#111827", fontWeight: "500" }}>
                {formatDate(vehicle.lastService)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Next Service
              </span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span style={{ color: "#111827", fontWeight: "500" }}>
                  {formatDate(vehicle.nextService)}
                </span>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    backgroundColor: serviceStatus.color + "20",
                    color: serviceStatus.color,
                    borderRadius: "0.375rem",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                >
                  {serviceStatus.status}
                </span>
              </div>
            </div>
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
              console.log("Book service for:", vehicle.id);
              onClose();
            }}
            style={{
              padding: "0.75rem 1.5rem",
              border: "1px solid var(--color-primary)",
              borderRadius: "0.5rem",
              backgroundColor: "var(--color-primary)",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-primary-hover)";
              e.currentTarget.style.borderColor = "var(--color-primary-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary)";
              e.currentTarget.style.borderColor = "var(--color-primary)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary)";
              e.currentTarget.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-primary-hover)";
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
