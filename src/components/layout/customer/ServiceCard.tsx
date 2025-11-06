interface Service {
  id: string;
  title: string;
  vehicle: string;
  status: "in-progress" | "completed" | "waiting-parts";
  type: "service" | "project";
  assignedTo?: string;
  completedBy?: string;
  completedOn?: string;
  expectedCompletion?: string;
  team?: string;
  progress?: number;
}

import { useState } from "react";
import LeaveReviewModal from "./LeaveReviewModal";

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  isSelected?: boolean;
}

export default function ServiceCard({
  service,
  onClick,
  isSelected = false,
}: ServiceCardProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleReviewSubmit = (rating: number, comment: string) => {
    console.log("Review submitted:", {
      rating,
      comment,
      serviceId: service.id,
    });
    // Here you would typically make an API call to submit the review
    alert(`Thank you for your review! Rating: ${rating} stars`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "var(--color-accent)";
      case "completed":
        return "#10b981";
      case "waiting-parts":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "waiting-parts":
        return "Waiting for Parts";
      default:
        return status;
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        padding: "20px 24px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        backgroundColor: isSelected ? "rgba(3, 0, 155, 0.05)" : "white",
        borderLeft: isSelected ? "4px solid #03009B" : "4px solid transparent",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = "#f9fafb";
        } else {
          e.currentTarget.style.backgroundColor = "rgba(3, 0, 155, 0.08)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isSelected
          ? "rgba(3, 0, 155, 0.05)"
          : "white";
      }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "4px",
            height: "100%",
            backgroundColor: "#03009B",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: isSelected ? "700" : "600",
                color: isSelected ? "#03009B" : "#1f2937",
                margin: 0,
                transition: "color 0.2s ease",
              }}
            >
              {service.title}
            </h3>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "500",
                backgroundColor: getStatusColor(service.status),
                color: "white",
              }}
            >
              {getStatusText(service.status)}
            </span>
          </div>

          <p
            style={{
              color: "#6b7280",
              margin: "4px 0",
              fontSize: "14px",
            }}
          >
            {service.vehicle}
          </p>

          {service.assignedTo && (
            <p
              style={{
                color: "#374151",
                margin: "4px 0",
                fontSize: "14px",
              }}
            >
              Assigned to: {service.assignedTo}
            </p>
          )}

          {service.completedBy && (
            <p
              style={{
                color: "#374151",
                margin: "4px 0",
                fontSize: "14px",
              }}
            >
              Completed by: {service.completedBy}
            </p>
          )}

          {service.team && (
            <p
              style={{
                color: "#374151",
                margin: "4px 0",
                fontSize: "14px",
              }}
            >
              Project Team: {service.team}
            </p>
          )}

          {service.expectedCompletion && (
            <p
              style={{
                color: service.status === "in-progress" ? "#d97706" : "#059669",
                margin: "4px 0",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Expected completion: {service.expectedCompletion}
            </p>
          )}

          {service.completedOn && (
            <p
              style={{
                color: "#059669",
                margin: "4px 0",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Completed on: {service.completedOn}
            </p>
          )}

          {service.progress !== undefined && (
            <div style={{ marginTop: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontSize: "14px", color: "#374151" }}>
                  Progress
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  {service.progress}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${service.progress}%`,
                    height: "100%",
                    backgroundColor: "#03009B",
                    borderRadius: "4px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {service.status === "completed" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReviewModal(true);
                }}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #03009B",
                  borderRadius: "6px",
                  backgroundColor: "white",
                  color: "#03009B",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#03009B";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(3, 0, 155, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#03009B";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.98)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Leave Review
              </button>
              <LeaveReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                serviceTitle={service.title}
                vehicleName={service.vehicle}
                onSubmit={handleReviewSubmit}
              />
            </>
          )}
          <button
            onClick={onClick}
            style={{
              padding: "8px 16px",
              border: "1px solid #03009B",
              borderRadius: "6px",
              backgroundColor: "#03009B",
              color: "white",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#03009B";
              e.currentTarget.style.borderColor = "#03009B";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(3, 0, 155, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#03009B";
              e.currentTarget.style.borderColor = "#03009B";
              e.currentTarget.style.boxShadow = "none";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = "#03009B";
              e.currentTarget.style.transform = "scale(0.98)";
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = "#03009B";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(3, 0, 155, 0.3)";
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(3, 0, 155, 0.2)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
