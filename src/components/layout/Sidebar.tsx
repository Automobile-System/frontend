"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Briefcase,
  Calendar,
  BarChartHorizontal,
  MessageSquare,
} from "lucide-react";

type PageType = 'dashboard' | 'employees' | 'assign' | 'projects' | 'scheduler' | 'reports' | 'communication';

interface SidebarProps {
  activePage?: PageType;
  className?: string;
}

/**
 * The Sidebar component, styled to match AdminSidebar.
 */
export function Sidebar({ activePage, className = '' }: SidebarProps) {
  const pathname = usePathname();
  
  // Automatically determine active page from pathname if not explicitly provided
  const getActivePage = (): PageType => {
    if (activePage) return activePage;
    
    if (pathname.includes('/employees')) return 'employees';
    if (pathname.includes('/task-scheduler')) return 'assign';
    if (pathname.includes('/projects')) return 'projects';
    if (pathname.includes('/scheduler')) return 'scheduler';
    if (pathname.includes('/reports')) return 'reports';
    if (pathname.includes('/communication')) return 'communication';
    return 'dashboard';
  };

  const currentActivePage = getActivePage();

  return (
    <aside className={`w-[270px] bg-gradient-to-b from-teal-600 to-teal-700 text-white min-h-screen shadow-2xl ${className}`}>
      <div className="p-6">
        <nav className="space-y-2">
          <Link
            href="/manager/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:translate-x-1 ${
              currentActivePage === 'dashboard'
                ? "bg-white/25 font-semibold shadow-lg"
                : ""
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/manager/employees"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:translate-x-1 ${
              currentActivePage === 'employees'
                ? "bg-white/25 font-semibold shadow-lg"
                : ""
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Manage Employees</span>
          </Link>
          <Link
            href="/manager/task-scheduler"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:translate-x-1 ${
              currentActivePage === 'assign'
                ? "bg-white/25 font-semibold shadow-lg"
                : ""
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span>Assign Tasks</span>
          </Link>
          <Link
            href="/manager/projects"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:translate-x-1 ${
              currentActivePage === 'projects'
                ? "bg-white/25 font-semibold shadow-lg"
                : ""
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>Projects</span>
          </Link>
          <Link
            href="/manager/scheduler"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:translate-x-1 ${
              currentActivePage === 'scheduler'
                ? "bg-white/25 font-semibold shadow-lg"
                : ""
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Scheduler</span>
          </Link>
          <Link
            href="/manager/reports"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:translate-x-1 ${
              currentActivePage === 'reports'
                ? "bg-white/25 font-semibold shadow-lg"
                : ""
            }`}
          >
            <BarChartHorizontal className="w-5 h-5" />
            <span>Reports</span>
          </Link>
          <Link
            href="/manager/communication"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:translate-x-1 ${
              currentActivePage === 'communication'
                ? "bg-white/25 font-semibold shadow-lg"
                : ""
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Communication</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  activePage?: PageType;
}

/**
 * The main Layout component that wraps your page content.
 */
export default function Layout({ children, activePage }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage={activePage} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
