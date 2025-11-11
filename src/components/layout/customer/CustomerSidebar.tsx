"use client";

import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";

export default function CustomerSidebar() {
  const router = useRouter();
  const pathname = usePathname();

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
          );
        })}
      </nav>
    </aside>
  );
}
