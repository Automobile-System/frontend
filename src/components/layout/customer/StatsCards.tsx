"use client";

import { Activity, CheckCircle2, CalendarDays, Hammer } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      title: "Active Services",
      value: "3",
      status: "Ongoing",
      color: "#020079",
      icon: <Activity size={28} />,
    },
    {
      title: "Completed Services",
      value: "12",
      status: "Total",
      color: "#10b981",
      icon: <CheckCircle2 size={28} />,
    },
    {
      title: "Upcoming Appointments",
      value: "2",
      status: "Scheduled",
      color: "#E6C200",
      icon: <CalendarDays size={28} />,
    },
    {
      title: "Active Projects",
      value: "1",
      status: "Custom project",
      color: "#03009B",
      icon: <Hammer size={28} />,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            background: "white",
            borderRadius: "1rem",
            border: `2px solid ${stat.color}20`,
            padding: "2rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.borderColor = stat.color;
            e.currentTarget.style.boxShadow = `0 8px 24px ${stat.color}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = `${stat.color}20`;
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Text Section */}
            <div>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#6b7280",
                  margin: "0 0 0.75rem 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: "var(--font-roboto, sans-serif)",
                }}
              >
                {stat.title}
              </p>
              <p
                style={{
                  fontSize: "3rem",
                  fontWeight: "700",
                  color: stat.color,
                  margin: "0 0 0.5rem 0",
                  fontFamily: "var(--font-bebas, sans-serif)",
                  lineHeight: "1",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "#6b7280",
                  margin: 0,
                  fontFamily: "var(--font-roboto, sans-serif)",
                }}
              >
                {stat.status}
              </p>
            </div>

            {/* Icon Section */}
            <div
              style={{
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                background: `${stat.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                color: stat.color,
                border: `2px solid ${stat.color}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15) rotate(5deg)";
                e.currentTarget.style.background = `${stat.color}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                e.currentTarget.style.background = `${stat.color}15`;
              }}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
