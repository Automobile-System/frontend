"use client"

import { useRouter } from "next/navigation"

/**
 * Client Component - Dashboard header with interactive book service button
 */
export function CustomerDashboardHeader() {
  const router = useRouter()

  const handleBookService = () => {
    router.push("/customer/book-service")
  }

  return (
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
          Welcome back! 👋
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
          e.currentTarget.style.backgroundColor = "#020079"
          e.currentTarget.style.transform = "scale(1.05)"
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(3, 0, 155, 0.4)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#03009B"
          e.currentTarget.style.transform = "scale(1)"
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(3, 0, 155, 0.2)"
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.backgroundColor = "#01024D"
          e.currentTarget.style.transform = "scale(0.98)"
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.backgroundColor = "#020079"
          e.currentTarget.style.transform = "scale(1.05)"
        }}
      >
        <span style={{ fontSize: "1.25rem" }}>+</span>
        Book Service / Project
      </button>
    </div>
  )
}
