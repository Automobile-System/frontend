"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";

export default function TopNavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="bg-teal-700 text-white px-8 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-8">
        <Link
          href="/manager/task-scheduler"
          className={`text-lg font-semibold hover:text-teal-100 transition-colors ${
            isActive("/manager/task-scheduler") ? "text-white border-b-2 border-white pb-1" : ""
          }`}
        >
          Task Board
        </Link>
        <Link
          href="/manager/projects"
          className={`text-lg font-semibold hover:text-teal-100 transition-colors ${
            isActive("/manager/projects") ? "text-white border-b-2 border-white pb-1" : ""
          }`}
        >
          Projects
        </Link>
        <Link
          href="/manager/communication"
          className={`text-lg font-semibold hover:text-teal-100 transition-colors relative ${
            isActive("/manager/communication") ? "text-white border-b-2 border-white pb-1" : ""
          }`}
        >
          Messages
          {/* Notification Badge */}
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            5
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative hover:bg-teal-600 p-2 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="hover:bg-teal-600 p-2 rounded-full transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
