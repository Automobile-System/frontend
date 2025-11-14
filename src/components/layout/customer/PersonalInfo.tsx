import { User } from "lucide-react";
import { CustomerProfile } from "@/types/authTypes";

interface PersonalInfoProps {
  customer: CustomerProfile;
}

export default function PersonalInfo({ customer }: PersonalInfoProps) {
  const fullName = `${customer.firstName} ${customer.lastName}`;

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
        <User size={20} /> Personal Information
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Full Name
          </span>
          <span style={{ color: "#111827", fontWeight: "500" }}>
            {fullName}
          </span>
        </div>

        <div
          style={{
            height: "1px",
            backgroundColor: "#f3f4f6",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Email Address
          </span>
          <span style={{ color: "#111827", fontWeight: "500" }}>
            {customer.email}
          </span>
        </div>

        <div
          style={{
            height: "1px",
            backgroundColor: "#f3f4f6",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Phone Number
          </span>
          <span style={{ color: "#111827", fontWeight: "500" }}>
            {customer.phoneNumber}
          </span>
        </div>

        <div
          style={{
            height: "1px",
            backgroundColor: "#f3f4f6",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            National ID
          </span>
          <span style={{ color: "#111827", fontWeight: "500" }}>
            {customer.nationalId}
          </span>
        </div>

        <div
          style={{
            height: "1px",
            backgroundColor: "#f3f4f6",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Customer ID
          </span>
          <span style={{ color: "#111827", fontWeight: "500" }}>
            {customer.customerId}
          </span> */}
        </div>
      </div>
    </div>
  );
}
