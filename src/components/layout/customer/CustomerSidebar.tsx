"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
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
    { name: "My Projects & Services", path: "/customer/services" },
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
            <Link
              key={item.name}
              href={item.path}
              className={clsx(
                "w-full text-left px-4 py-3 rounded-lg flex items-center justify-start font-roboto text-sm transition-all duration-200",
                isActive
                  ? "bg-[#020079] text-white font-semibold"
                  : "bg-white text-[#020079] hover:bg-[#020079]/10"
              )}
            >
              {item.name}
            </Link>
          )})}
        </nav>

      {/* Logout Button */}
      <div className="pb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black border-none cursor-pointer transition-all duration-200 text-sm font-roboto font-medium hover:shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
      
    </aside>
  );
}
