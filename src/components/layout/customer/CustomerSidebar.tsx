"use client";

import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import { LogOut } from "lucide-react";

export default function CustomerSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleLogout = () => {
    // Clear any auth tokens/data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login
    router.push('/login');
  };

  const menuItems = [
    { name: "Dashboard", path: "/customer/dashboard" },
    { name: "My Vehicles", path: "/customer/vehicles" },
    { name: "Book Service / Project", path: "/customer/book-service" },
    { name: "My Services", path: "/customer/services" },
  ];

  return (
    <aside
      className={`
        w-[270px] h-full flex flex-col justify-between p-6
        border-r border-[#020079]/20 bg-[#020079]/[0.05] text-[#020079]
        overflow-auto
      `}
    >
      {/* === Navigation === */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={clsx(
                "w-full text-left px-4 py-3 rounded-lg flex items-center justify-start font-roboto text-sm transition-all duration-200",
                isActive
                  ? "bg-[#020079] text-white font-semibold"
                  : "bg-white text-[#020079] hover:bg-[#020079]/10"
              )}
            >
              {item.name}
            </button>
          )})}
        </nav>

      {/* Logout Button */}
      <div style={{ paddingBottom: "1.5rem" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            background: "linear-gradient(to right, #eab308, #facc15)", // yellow-500 to yellow-400
            color: "black",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontSize: "0.875rem",
            fontFamily: "var(--font-roboto, sans-serif)",
            fontWeight: "500",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <LogOut style={{ width: "1.25rem", height: "1.25rem" }} />
          <span>Log Out</span>
        </button>
      </div>
      
    </aside>
  );
}
