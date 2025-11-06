"use client";

import { useRouter } from "next/navigation";
import CustomerLayout from "@/components/layout/customer/CustomerLayout";
import StatsCards from "@/components/layout/customer/StatsCards";
import Recommendations from "@/components/layout/customer/Recommendations";
import ServiceChart from "@/components/layout/customer/ServiceChart";

export default function CustomerDashboard() {
  const router = useRouter();

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
            marginBottom: "1rem",
            paddingBottom: "1.5rem",
            borderBottom: "2px solid rgba(2, 0, 121, 0.1)",
          }}
        >
          <div>
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
