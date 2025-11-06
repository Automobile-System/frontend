"use client";

import { User } from "lucide-react";
import { CustomerProfile } from "@/types/authTypes";

interface ProfileHeaderProps {
  customer: CustomerProfile;
  onEditProfile: () => void;
}

export default function ProfileHeader({
  customer,
  onEditProfile,
}: ProfileHeaderProps) {
  // Format the date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isNewUser = () => {
    const createdAt = new Date(customer.createdAt);
    const lastLoginAt = new Date(customer.lastLoginAt);
    const diffInHours =
      (lastLoginAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    // If last login is within 24 hours of account creation, consider as new user
    return diffInHours < 24;
  };

  const fullName = `${customer.firstName} ${customer.lastName}`;

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {/* Avatar */}
        <div
          style={{
            width: "5rem",
            height: "5rem",
            borderRadius: "50%",
            backgroundColor: "#03009B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0,
          }}
        >
          {customer.profileImageUrl ? (
            <img
              src={customer.profileImageUrl}
              alt={fullName}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <User size={40} strokeWidth={2} />
          )}
        </div>

        {/* Customer Info */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#111827",
              margin: "0 0 0.5rem 0",
            }}
          >
            {isNewUser()
              ? `Welcome, ${fullName}!`
              : `Welcome back, ${fullName}!`}
          </h1>
          <p
            style={{
              color: "#6b7280",
              margin: "0 0 0.25rem 0",
              fontSize: "1rem",
            }}
          >
            📧 {customer.email}
          </p>
          <p
            style={{
              color: "#6b7280",
              margin: "0 0 0.25rem 0",
              fontSize: "1rem",
            }}
          >
            📞 {customer.phoneNumber}
          </p>
          <p
            style={{
              color: "#9ca3af",
              margin: "0",
              fontSize: "0.875rem",
            }}
          >
            Customer ID: {customer.customerId} • Member since{" "}
            {formatDate(customer.createdAt)}
          </p>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEditProfile}
          style={{
            padding: "0.75rem 1.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.75rem",
            backgroundColor: "white",
            color: "#374151",
            fontSize: "0.875rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s",
            alignSelf: "flex-start",
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
          Edit Profile
        </button>
      </div>
    </div>
  );
}
