"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CustomerLayout from "@/components/layout/customer/CustomerLayout";
import StatsCards from "@/components/layout/customer/StatsCards";
import Recommendations from "@/components/layout/customer/Recommendations";
import ServiceChart from "@/components/layout/customer/ServiceChart";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getCustomerProfile } from "@/services/api";
import { CustomerProfile } from "@/types/authTypes";

export default function CustomerDashboard() {
  const router = useRouter();
  const [customerData, setCustomerData] = useState<CustomerProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await getCustomerProfile();
        setCustomerData(data);
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  const handleBookService = () => {
    router.push("/customer/book-service");
  };

  if (isLoading) {
    return (
      <CustomerLayout>
        <LoadingSpinner size="large" message="Loading dashboard..." />
      </CustomerLayout>
    );
  }

  const customerName = customerData
    ? `${customerData.firstName} ${customerData.lastName}`
    : "Guest";

  return (
    <CustomerLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#111827",
                margin: 0,
              }}
            >
              Welcome back, {customerName}! 👋
            </h1>
            <p
              style={{
                color: "#6b7280",
                margin: "0.5rem 0 0 0",
                fontSize: "1rem",
              }}
            >
              Your vehicle service summary and recommendations
            </p>
          </div>
          <button
            onClick={handleBookService}
            style={{
              background: "#03009B",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              border: "none",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              transform: "scale(1)",
              boxShadow: "0 2px 8px rgba(3, 0, 155, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#020079";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(3, 0, 155, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#03009B";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(3, 0, 155, 0.2)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = "#01024D";
              e.currentTarget.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = "#020079";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
          >
            <span style={{ fontSize: "1.25rem" }}>+</span>
            Book Service / Project
          </button>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Charts and Recommendations */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          <ServiceChart />
          <Recommendations />
        </div>
      </div>
    </CustomerLayout>
  );
}
