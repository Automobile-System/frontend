"use client";

import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
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

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  active?: boolean;
}

/**
 * A helper component to create styled navigation links.
 * It can show an 'active' state.
 */
function NavLink({ href, icon: Icon, children, active = false }: NavLinkProps): React.ReactElement {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-colors ${
          active
            ? "bg-emerald-800 text-white" // Style for the active link
            : "text-emerald-100 hover:bg-emerald-600" // Style for inactive links
        }`}
      >
        <Icon className="w-5 h-5" />
        {children}
      </Link>
    </li>
  );
}

/**
 * The Sidebar component, styled to match your target image.
 */
function Sidebar({ activePage = 'dashboard', className = '' }: SidebarProps) {

  return (
    <aside className={`w-64 bg-emerald-700 text-white p-6 flex flex-col min-h-screen ${className}`}>
      <h1 className="text-2xl font-bold mb-2 text-white">Navigation</h1>
      <hr className="border-t border-emerald-600 mb-6" />
      <nav>
        <ul className="flex flex-col gap-y-3">
          <NavLink
            href="/manager/dashboard"
            icon={LayoutDashboard}
            active={activePage === 'dashboard'}
          >
            Dashboard
          </NavLink>
          <NavLink
            href="/manager/employees"
            icon={Users}
            active={activePage === 'employees'}
          >
            Manage Employees
          </NavLink>
          <NavLink
            href="/manager/task-scheduler"
            icon={ClipboardList}
            active={activePage === 'assign'}
          >
            Assign Tasks
          </NavLink>
          <NavLink
            href="/manager/projects"
            icon={Briefcase}
            active={activePage === 'projects'}
          >
            Projects
          </NavLink>
          <NavLink
            href="/manager/scheduler"
            icon={Calendar}
            active={activePage === 'scheduler'}
          >
            Scheduler
          </NavLink>
          <NavLink
            href="/manager/reports"
            icon={BarChartHorizontal}
            active={activePage === 'reports'}
          >
            Reports
          </NavLink>
          <NavLink
            href="/manager/communication"
            icon={MessageSquare}
            active={activePage === 'communication'}
          >
            Communication
          </NavLink>
        </ul>
      </nav>
      {/* This div grows to fill the remaining vertical space,
          keeping your nav items neatly at the top. */}
      <div className="flex-1"></div>
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