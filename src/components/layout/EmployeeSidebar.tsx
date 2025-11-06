"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Clock,
  MessageCircle,
  LineChart,
  UserCircle,
} from "lucide-react";

export default function EmployeeSidebar() {
  const pathname = usePathname();

  const navigationItems = [
    {
      href: "/employee/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      id: "dashboard",
    },
    {
      href: "/employee/tasks",
      label: "Assigned Tasks",
      icon: ClipboardList,
      id: "tasks",
    },
    {
      href: "/employee/calendar",
      label: "Calendar",
      icon: Calendar,
      id: "calendar",
    },
    {
      href: "/employee/time-logs",
      label: "Time Logs",
      icon: Clock,
      id: "time-logs",
    },
    {
      href: "/employee/chat",
      label: "Chat",
      icon: MessageCircle,
      id: "chat",
    },
    {
      href: "/employee/performance",
      label: "Performance",
      icon: LineChart,
      id: "performance",
    },
    {
      href: "/employee/profile",
      label: "Profile",
      icon: UserCircle,
      id: "profile",
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-[270px] bg-gradient-to-b from-[#A52A2A] to-[#8B0000] text-white min-h-screen shadow-2xl">
      <div className="p-6">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:translate-x-1 ${
                  isActive(item.href)
                    ? "bg-white/25 font-semibold shadow-lg"
                    : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
