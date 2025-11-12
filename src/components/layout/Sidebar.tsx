"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

type PageType =
  | 'dashboard'
  | 'employees'
  | 'assign'
  | 'projects'
  | 'services'
  | 'scheduler'
  | 'reports'
  | 'communication'
  | 'customersdetails';

interface SidebarProps {
  activePage?: PageType;
  className?: string;
}

/**
 * The Sidebar component, styled to match AdminSidebar.
 */
export function Sidebar({ activePage, className = '' }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = () => {
    // Clear any auth tokens/data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login
    router.push('/login');
  };
  
  // Automatically determine active page from pathname if not explicitly provided
  const getActivePage = (): PageType => {
    if (activePage) return activePage;
    
    if (!pathname) return 'dashboard';
    
    if (pathname.includes('/employees')) return 'employees';
    if (pathname.includes('/task-scheduler')) return 'assign';
    if (pathname.includes('/projects')) return 'projects';
    if (pathname.includes('/services')) return 'services';
    if (pathname.includes('/scheduler')) return 'scheduler';
    if (pathname.includes('/reports')) return 'reports';
    if (pathname.includes('/communication')) return 'communication';
    if (pathname.includes('/customersdetails')) return 'customersdetails';
    return 'dashboard';
  };

  const currentActivePage = getActivePage();

  return (
    <aside className={`w-[270px] bg-[#020079]/5 border-r border-[#020079]/20 min-h-screen ${className}`}>
      <div className="p-6 flex flex-col h-screen">
        <nav className="space-y-2">
          <Link
            href="/manager/dashboard"
            className={`block px-4 py-3 rounded-lg text-sm font-roboto transition-all duration-200 ${
              currentActivePage === 'dashboard'
                ? "bg-[#020079] text-white font-semibold"
                : "text-[#020079] hover:bg-[#020079]/10 bg-white"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/manager/employees"
            className={`block px-4 py-3 rounded-lg text-sm font-roboto transition-all duration-200 ${
              currentActivePage === 'employees'
                ? "bg-[#020079] text-white font-semibold"
                : "text-[#020079] hover:bg-[#020079]/10 bg-white"
            }`}
          >
            Manage Employees
          </Link>
          <Link
            href="/manager/task-scheduler"
            className={`block px-4 py-3 rounded-lg text-sm font-roboto transition-all duration-200 ${
              currentActivePage === 'assign'
                ? "bg-[#020079] text-white font-semibold"
                : "text-[#020079] hover:bg-[#020079]/10 bg-white"
            }`}
          >
            Assign Tasks
          </Link>
          <Link
            href="/manager/projects"
            className={`block px-4 py-3 rounded-lg text-sm font-roboto transition-all duration-200 ${
              currentActivePage === 'projects'
                ? "bg-[#020079] text-white font-semibold"
                : "text-[#020079] hover:bg-[#020079]/10 bg-white"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/manager/services"
            className={`block px-4 py-3 rounded-lg text-sm font-roboto transition-all duration-200 ${
              currentActivePage === 'services'
                ? "bg-[#020079] text-white font-semibold"
                : "text-[#020079] hover:bg-[#020079]/10 bg-white"
            }`}
          >
            Services
          </Link>
          <Link
            href="/manager/scheduler"
            className={`block px-4 py-3 rounded-lg text-sm font-roboto transition-all duration-200 ${
              currentActivePage === 'scheduler'
                ? "bg-[#020079] text-white font-semibold"
                : "text-[#020079] hover:bg-[#020079]/10 bg-white"
            }`}
          >
            Scheduler
          </Link>
          <Link
            href="/manager/reports"
            className={`block px-4 py-3 rounded-lg text-sm font-roboto transition-all duration-200 ${
              currentActivePage === 'reports'
                ? "bg-[#020079] text-white font-semibold"
                : "text-[#020079] hover:bg-[#020079]/10 bg-white"
            }`}
          >
            Reports
          </Link>
          <Link
            href="/manager/communication"
            className={`block px-4 py-3 rounded-lg text-sm font-roboto transition-all duration-200 ${
              currentActivePage === 'communication'
                ? "bg-[#020079] text-white font-semibold"
                : "text-[#020079] hover:bg-[#020079]/10 bg-white"
            }`}
          >
            Communication
          </Link>
          <Link
            href="/manager/customersdetails"
            className={`block px-4 py-3 rounded-lg text-sm font-roboto transition-all duration-200 ${
              currentActivePage === 'customersdetails'
                ? "bg-[#020079] text-white font-semibold"
                : "text-[#020079] hover:bg-[#020079]/10 bg-white"
              }`}
          >
            Customers
          </Link>
        </nav>
        
        {/* Logout Button */}
        <div className="mt-auto px-4 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-roboto bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:shadow-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
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
