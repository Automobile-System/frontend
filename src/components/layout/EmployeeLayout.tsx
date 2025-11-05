"use client";

"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Clock,
  MessageCircle,
  LineChart,
  UserCircle,
} from "lucide-react";

interface EmployeeLayoutProps {
  children: ReactNode;
}

export default function EmployeeLayout({ children }: EmployeeLayoutProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/employee/dashboard",
      description: "View your performance and tasks",
    },
    {
      title: "Assigned Tasks",
      icon: ClipboardList,
      path: "/employee/tasks",
    },
    {
      title: "Calendar",
      icon: Calendar,
      path: "/employee/calendar",
    },
    {
      title: "Time Logs",
      icon: Clock,
      path: "/employee/time-logs",
    },
    {
      title: "Chat",
      icon: MessageCircle,
      path: "/employee/chat",
    },
    {
      title: "Performance",
      icon: LineChart,
      path: "/employee/performance",
    },
    {
      title: "Profile",
      icon: UserCircle,
      path: "/employee/profile",
    },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa]">
      {/* Sidebar */}
      <div className="w-72 bg-[#1A0000] text-white shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight">Employee Portal</h1>
        </div>
        <nav className="mt-8 space-y-2 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center w-full px-4 py-3 text-[15px] font-medium relative group rounded-lg",
                pathname === item.path
                  ? "bg-[#3A0000] text-white"
                  : "hover:bg-[#2A0000] transition-all duration-300"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 mr-3 transition-transform duration-200",
                  pathname === item.path
                    ? "text-white"
                    : "text-gray-500 group-hover:text-white",
                  "group-hover:scale-105"
                )}
              />
              <span
                className={cn(
                  "transition-colors duration-200",
                  pathname === item.path
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                )}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="h-16 bg-gradient-to-r from-[#220000] to-[#2A0000] border-b border-[#300] shadow-md flex items-center px-8">
          <h2 className="text-xl font-semibold text-white/90">
            {menuItems.find((item) => pathname?.startsWith(item.path))?.title ||
              ""}
          </h2>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
