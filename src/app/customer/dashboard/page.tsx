"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomerLayout from "@/components/layout/customer/CustomerLayout";
import StatsCards from "@/components/layout/customer/StatsCards";
import Recommendations from "@/components/layout/customer/Recommendations";
import ServiceChart from "@/components/layout/customer/ServiceChart";
import { getCustomerProfile } from "@/services/api";
import { CustomerProfile } from "@/types/authTypes";

export default function CustomerDashboard() {
  const router = useRouter();
  const [customerData, setCustomerData] = useState<CustomerProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCustomerProfile();
  }, []);

  const fetchCustomerProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getCustomerProfile();
      setCustomerData(data);
    } catch (err) {
      console.error("Failed to fetch customer profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const isNewUser = (customer: CustomerProfile) => {
    const createdAt = new Date(customer.createdAt);
    const lastLoginAt = new Date(customer.lastLoginAt);
    const diffInHours =
      (lastLoginAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    // If last login is within 24 hours of account creation, consider as new user
    return diffInHours < 24;
  };

  const handleBookService = () => {
    router.push("/customer/book-service");
  };

  return (
    <CustomerLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            paddingTop: "0.5rem",
            paddingBottom: "1rem",
            borderBottom: "2px solid rgba(2, 0, 121, 0.1)",
          }}
        >
          <div>
            {isLoading ? (
              <>
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes pulse {
                      0%, 100% { opacity: 1; }
                      50% { opacity: 0.5; }
                    }
                    .loading-pulse {
                      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    }
                  `,
                  }}
                />
                <h1
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "#020079",
                    margin: "0 0 0.5rem 0",
                    fontFamily: "var(--font-bebas, sans-serif)",
                    letterSpacing: "0.5px",
                  }}
                >
                  Dashboard Overview
                </h1>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    className="loading-pulse"
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "3px solid #f3f4f6",
                      borderTop: "3px solid #03009B",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  >
                    <style
                      dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes spin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                        .loading-pulse {
                          animation: spin 1s linear infinite;
                        }
                      `,
                      }}
                    />
                  </div>
                  <p
                    style={{
                      color: "#6b7280",
                      margin: 0,
                      fontSize: "1rem",
                      fontFamily: "var(--font-roboto, sans-serif)",
                    }}
                  >
                    Loading your dashboard...
                  </p>
                </div>
              </>
            ) : customerData ? (
              <>
                <div style={{ marginBottom: "0.25rem" }}>
                  <span
                    style={{
                      fontSize: "1.125rem",
                      color: "#6b7280",
                      fontFamily: "var(--font-roboto, sans-serif)",
                      fontWeight: "400",
                    }}
                  >
                    {getGreeting()},{" "}
                  </span>
                  <span
                    style={{
                      fontSize: "1.125rem",
                      color: "#020079",
                      fontFamily: "var(--font-roboto, sans-serif)",
                      fontWeight: "600",
                    }}
                  >
                    {customerData.firstName}! 👋
                  </span>
                </div>
                <h1
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "#020079",
                    margin: "0 0 0.5rem 0",
                    fontFamily: "var(--font-bebas, sans-serif)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {isNewUser(customerData)
                    ? "Welcome to NitroLine"
                    : "Welcome Back"}
                </h1>
                <p
                  style={{
                    color: "#6b7280",
                    margin: 0,
                    fontSize: "1rem",
                    fontFamily: "var(--font-roboto, sans-serif)",
                  }}
                >
                  {isNewUser(customerData)
                    ? "We're excited to have you here! Let's get started with your vehicle services"
                    : "Here's your vehicle service summary and recommendations"}
                </p>
              </>
            ) : (
              <>
                <h1
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "#020079",
                    margin: "0 0 0.5rem 0",
                    fontFamily: "var(--font-bebas, sans-serif)",
                    letterSpacing: "0.5px",
                  }}
                >
                  Dashboard Overview
                </h1>
                <p
                  style={{
                    color: "#6b7280",
                    margin: 0,
                    fontSize: "1rem",
                    fontFamily: "var(--font-roboto, sans-serif)",
                  }}
                >
                  Your vehicle service summary and recommendations
                </p>
              </>
            )}
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
              outline: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 2px 8px rgba(3, 0, 155, 0.2)",
              marginTop: "0.75rem",
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
            onFocus={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(3, 0, 155, 0.3)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(3, 0, 155, 0.2)";
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
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          <ServiceChart />
          <Recommendations />
        </div>
      </div>
    </CustomerLayout>
  );
}
