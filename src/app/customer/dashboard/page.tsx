"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      setIsLoading(true);
      const data = await getCustomerProfile();
      setCustomerData(data);
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookService = () => {
    router.push("/customer/book-service");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const isNewUser = (customer: CustomerProfile) => {
    const createdAt = new Date(customer.createdAt);
    const lastLoginAt = new Date(customer.lastLoginAt);
    const timeDiff = lastLoginAt.getTime() - createdAt.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    return hoursDiff < 24;
  };

  if (isLoading) {
    return (
      <CustomerLayout>
        <LoadingSpinner size="large" message="Loading your dashboard..." />
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Header with Welcome Message */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "1.5rem",
            borderBottom: "2px solid rgba(3, 0, 155, 0.1)",
          }}
        >
          <div>
            {customerData && (
              <h2
                style={{
                  fontSize: "1.125rem",
                  color: "#6b7280",
                  margin: "0 0 0.5rem 0",
                  fontWeight: "400",
                }}
              >
                {getGreeting()}, {customerData.firstName}! 👋
              </h2>
            )}
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#03009B",
                margin: "0 0 0.5rem 0",
                fontFamily: "var(--font-bebas, sans-serif)",
              }}
            >
              {customerData && isNewUser(customerData)
                ? "Welcome to NitroLine"
                : "Welcome Back"}
            </h1>
            <p style={{ color: "#6b7280", margin: 0, fontSize: "0.95rem" }}>
              {customerData && isNewUser(customerData)
                ? "We're excited to have you here! Let's get started with your vehicle services"
                : "Here's your vehicle service summary and recommendations"}
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
              whiteSpace: "nowrap",
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
            + Book Service / Project
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
