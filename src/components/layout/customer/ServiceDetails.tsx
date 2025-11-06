"use client";

import { useState } from "react";
import ServiceTimeline from "./ServiceTimeline";
import ServiceChat from "./ServiceChat";

interface ServiceDetailsProps {
  serviceId: string;
  onClose: () => void;
}

export default function ServiceDetails({
  serviceId,
  onClose,
}: ServiceDetailsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "timeline" | "chat">(
    "details"
  );

  // Mock data - replace with actual API call
  const serviceDetails = {
    id: "1",
    title: "Oil Change",
    vehicle: "Toyota Corolla (KA-1234)",
    serviceType: "Oil Change",
    status: "in-progress",
    assignedEmployee: "Ruwan Silva",
    expectedCompletion: "Today, 4:00 PM",
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        height: "fit-content",
        position: "sticky",
        top: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(2, 0, 121, 0.02)",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#020079",
            margin: 0,
          }}
        >
          Service Details
        </h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            color: "#6b7280",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "4px",
            transition: "all 0.2s ease",
            lineHeight: "1",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f3f4f6";
            e.currentTarget.style.color = "#020079";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#6b7280";
          }}
        >
          ×
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #e5e7eb",
          backgroundColor: "white",
        }}
      >
        {(["details", "timeline", "chat"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "14px 16px",
              border: "none",
              backgroundColor: "transparent",
              color: activeTab === tab ? "#03009B" : "#6b7280",
              fontSize: "14px",
              fontWeight: activeTab === tab ? "600" : "500",
              cursor: "pointer",
              textTransform: "capitalize",
              borderBottom:
                activeTab === tab
                  ? "3px solid #03009B"
                  : "3px solid transparent",
              transition: "all 0.2s ease",
              position: "relative",
              bottom: "-2px",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.color = "#03009B";
                e.currentTarget.style.backgroundColor = "rgba(3, 0, 155, 0.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.color = "#6b7280";
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {tab === "chat" ? "💬 Chat" : tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "24px", minHeight: "400px" }}>
        {activeTab === "details" && (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#020079",
                  marginBottom: "20px",
                  paddingBottom: "12px",
                  borderBottom: "2px solid rgba(2, 0, 121, 0.1)",
                }}
              >
                Service Information
              </h4>

              <div style={{ display: "grid", gap: "16px" }}>
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "rgba(2, 0, 121, 0.02)",
                    borderRadius: "8px",
                    borderLeft: "3px solid #03009B",
                  }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Vehicle:
                  </span>
                  <p
                    style={{
                      color: "#020079",
                      margin: "6px 0 0 0",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {serviceDetails.vehicle}
                  </p>
                </div>

                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "rgba(2, 0, 121, 0.02)",
                    borderRadius: "8px",
                    borderLeft: "3px solid #03009B",
                  }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Service Type:
                  </span>
                  <p
                    style={{
                      color: "#020079",
                      margin: "6px 0 0 0",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {serviceDetails.serviceType}
                  </p>
                </div>

                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "rgba(2, 0, 121, 0.02)",
                    borderRadius: "8px",
                    borderLeft: "3px solid #03009B",
                  }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Current Status:
                  </span>
                  <p
                    style={{
                      color: "#E6C200",
                      margin: "6px 0 0 0",
                      fontWeight: "600",
                      padding: "6px 12px",
                      backgroundColor: "rgba(230, 194, 0, 0.1)",
                      borderRadius: "6px",
                      display: "inline-block",
                      fontSize: "14px",
                    }}
                  >
                    In Progress
                  </p>
                </div>

                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "rgba(2, 0, 121, 0.02)",
                    borderRadius: "8px",
                    borderLeft: "3px solid #03009B",
                  }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Assigned Employee:
                  </span>
                  <p
                    style={{
                      color: "#020079",
                      margin: "6px 0 0 0",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {serviceDetails.assignedEmployee}
                  </p>
                </div>

                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "rgba(2, 0, 121, 0.02)",
                    borderRadius: "8px",
                    borderLeft: "3px solid #03009B",
                  }}
                >
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Expected Completion:
                  </span>
                  <p
                    style={{
                      color: "#020079",
                      margin: "6px 0 0 0",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {serviceDetails.expectedCompletion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "timeline" && <ServiceTimeline serviceId={serviceId} />}
        {activeTab === "chat" && (
          <div
            style={{
              backgroundColor: "#f9fafb",
              borderRadius: "12px",
              padding: "16px",
              border: "1px solid #e5e7eb",
            }}
          >
            <ServiceChat serviceId={serviceId} employeeName="Ruwan Silva" />
          </div>
        )}
      </div>
    </div>
  );
}
