"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiHome,
  FiSettings,
  FiMessageSquare,
  FiBook,
  FiTruck,
  FiDollarSign,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export default function CustomerSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/customer/dashboard" },
    { name: "My Vehicles", icon: <FiTruck />, path: "/customer/vehicles" },
    {
      name: "Book Service / Project",
      icon: <FiBook />,
      path: "/customer/book-service",
    },
    { name: "My Services", icon: <FiSettings />, path: "/customer/services" },
    {
      name: "Preferred Employees",
      icon: <FiUsers />,
      path: "/customer/preferred-employees",
    },
    { name: "Messages", icon: <FiMessageSquare />, path: "/customer/messages" },
    {
      name: "Payment History",
      icon: <FiDollarSign />,
      path: "/customer/payments",
    },
  ];

  const sidebarStyle = {
    backgroundColor: "rgba(2, 0, 121, 0.05)", // #020079 with 5% opacity - matching admin sidebar
    color: "#020079", // Matching admin sidebar text color
    width: isCollapsed ? "80px" : "250px",
    height: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    padding: "1rem",
    transition: "width 0.3s ease",
    borderRight: "1px solid rgba(2, 0, 121, 0.2)", // Matching admin sidebar border
  };

  // Using admin sidebar color scheme
  const activeColor = "#020079"; // Matching admin sidebar active background
  const hoverBg = "rgba(2, 0, 121, 0.1)"; // 10% opacity hover - matching admin sidebar
  const activeTextColor = "white";
  const inactiveTextColor = "#020079"; // Matching admin sidebar inactive text

  return (
    <div style={sidebarStyle}>
      {/* === Top Section === */}
      <div>
        {/* Header */}
        <div
          style={{
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(2, 0, 121, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!isCollapsed && (
            <div>
              <h1
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  margin: 0,
                  color: "#020079",
                  fontFamily: "var(--font-bebas, sans-serif)",
                }}
              >
                AutoService
              </h1>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  margin: "0.25rem 0 0 0",
                  fontFamily: "var(--font-roboto, sans-serif)",
                  fontWeight: "400",
                }}
              >
                Customer Portal
              </p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              padding: "0.4rem",
              borderRadius: "50%",
              background: "white",
              border: "1px solid rgba(2, 0, 121, 0.2)",
              color: "#020079",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(2, 0, 121, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            {isCollapsed ? (
              <FiChevronRight size={18} />
            ) : (
              <FiChevronLeft size={18} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ marginTop: "1rem" }}>
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              style={{
                width: "100%",
                textAlign: "left" as const,
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: isCollapsed ? "0" : "0.75rem",
                background: pathname === item.path ? activeColor : "white",
                color:
                  pathname === item.path ? activeTextColor : inactiveTextColor,
                border: "none",
                cursor: "pointer",
                marginBottom: "0.5rem",
                transition: "all 0.2s ease",
                fontSize: "0.875rem",
                fontFamily: "var(--font-roboto, sans-serif)",
                fontWeight: pathname === item.path ? "600" : "400",
              }}
              onMouseEnter={(e) => {
                if (pathname !== item.path) {
                  e.currentTarget.style.background = hoverBg;
                  e.currentTarget.style.color = "#020079";
                } else {
                  e.currentTarget.style.background = activeColor;
                  e.currentTarget.style.color = activeTextColor;
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== item.path) {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = inactiveTextColor;
                } else {
                  e.currentTarget.style.background = activeColor;
                  e.currentTarget.style.color = activeTextColor;
                }
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* === Bottom Section (User Profile) === */}
      <div
        onClick={() => router.push("/customer/profile")}
        style={{
          paddingTop: "1rem",
          borderTop: "1px solid rgba(2, 0, 121, 0.2)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          cursor: "pointer",
          transition: "background 0.2s ease",
          padding: "0.75rem",
          borderRadius: "0.5rem",
          backgroundColor: "white",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = hoverBg;
          e.currentTarget.style.borderRadius = "0.5rem";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "white";
          e.currentTarget.style.borderRadius = "0.5rem";
        }}
      >
        <div
          style={{
            width: "2.2rem",
            height: "2.2rem",
            background: "#020079",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{ fontSize: "0.875rem", fontWeight: "600", color: "white" }}
          >
            KP
          </span>
        </div>
        {!isCollapsed && (
          <div>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                margin: 0,
                color: "#020079",
                fontFamily: "var(--font-roboto, sans-serif)",
              }}
            >
              Kethmi Pujani
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#6b7280",
                margin: 0,
                fontFamily: "var(--font-roboto, sans-serif)",
                fontWeight: "400",
              }}
            >
              Customer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
