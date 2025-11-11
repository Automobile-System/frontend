"use client";

import { useRouter } from "next/navigation";
import { Bell, User } from "lucide-react";

export default function CustomerHeader() {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/customer/profile");
  };

  const handleNotificationsClick = () => {
    router.push("/customer/messages");
  };

  return (
    <header
      style={{
        background: "rgba(2, 0, 121, 0.05)",
        borderBottom: "1px solid rgba(2, 0, 121, 0.2)",
        padding: "1.25rem 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Side - Title */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "400",
              color: "#020079",
              margin: 0,
              padding: 0,
              lineHeight: "1",
              fontFamily: "var(--font-bebas, sans-serif)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Dashboard
          </h1>
        </div>

        {/* Right Side - User Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {/* Notification Button */}
          <button
            onClick={handleNotificationsClick}
            style={{
              position: "relative",
              width: "2.5rem",
              height: "2.5rem",
              color: "#020079",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(2, 0, 121, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Bell size={20} strokeWidth={2} />
            {/* Notification Badge */}
            <span
              style={{
                position: "absolute",
                top: "-0.25rem",
                right: "-0.25rem",
                minWidth: "1.25rem",
                height: "1.25rem",
                background: "#E6C200",
                borderRadius: "50%",
                border: "2px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 4px",
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "#020079",
                fontFamily: "var(--font-roboto, sans-serif)",
              }}
            >
              2
            </span>
          </button>

          {/* Profile Button */}
          <button
            onClick={handleProfileClick}
            style={{
              width: "2.5rem",
              height: "2.5rem",
              color: "#020079",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(2, 0, 121, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <User size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
