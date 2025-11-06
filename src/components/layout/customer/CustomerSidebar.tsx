"use client";

import { useRouter, usePathname } from "next/navigation";

export default function CustomerSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/customer/dashboard" },
    { name: "My Vehicles", path: "/customer/vehicles" },
    {
      name: "Book Service / Project",
      path: "/customer/book-service",
    },
    { name: "My Services", path: "/customer/services" },
    {
      name: "Preferred Employees",
      path: "/customer/preferred-employees",
    },
    { name: "Messages", path: "/customer/messages" },
    {
      name: "Payment History",
      path: "/customer/payments",
    },
  ];

  const sidebarStyle = {
    backgroundColor: "rgba(2, 0, 121, 0.05)", // #020079 with 5% opacity - matching admin sidebar
    color: "#020079", // Matching admin sidebar text color
    width: "270px",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    padding: "1.5rem",
    borderRight: "1px solid rgba(2, 0, 121, 0.2)", // Matching admin sidebar border
    overflow: "auto",
  };

  // Using admin sidebar color scheme
  const activeColor = "#020079"; // Matching admin sidebar active background
  const hoverBg = "rgba(2, 0, 121, 0.1)"; // 10% opacity hover - matching admin sidebar
  const activeTextColor = "white";
  const inactiveTextColor = "#020079"; // Matching admin sidebar inactive text

  return (
    <div style={sidebarStyle}>
      {/* === Top Section === */}
      <div style={{ flex: 1 }}>
        {/* Navigation */}
        <nav
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
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
                justifyContent: "flex-start",
                background: pathname === item.path ? activeColor : "white",
                color:
                  pathname === item.path ? activeTextColor : inactiveTextColor,
                border: "none",
                cursor: "pointer",
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
              <span>{item.name}</span>
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
      </div>
    </div>
  );
}
