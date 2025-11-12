"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Clock,
  MessageCircle,
  LineChart,
  UserCircle,
  LogOut,
} from "lucide-react";

export default function EmployeeSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = () => {
    // Clear any auth tokens/data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login
    router.push('/login');
  };

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
    <aside className="w-[270px] bg-[#0200791F] border-r border-[#020079]/20 min-h-screen">
      <div className="p-6 flex flex-col h-screen">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-[#020079] text-white font-semibold"
                    : "text-[#020079] hover:bg-[#020079]/10 bg-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Logout Button */}
        <div className="mt-auto px-0 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:shadow-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
