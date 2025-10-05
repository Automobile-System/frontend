"use client"

import { useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { cn } from "@/lib/utils"
import {
  Car,
  Users,
  FileText,
  Wrench,
  Calendar,
  CreditCard,
  BarChart3,
  Package,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode
  className?: string
}

const navigationItems = [
  {
    title: "Vehicles",
    items: [
      {
        title: "All Vehicles",
        href: "/vehicles",
        description: "View and manage all vehicles in the system",
        icon: Car,
      },
      {
        title: "Add Vehicle",
        href: "/vehicles/add",
        description: "Register a new vehicle",
        icon: Package,
      },
      {
        title: "Vehicle Types",
        href: "/vehicles/types",
        description: "Manage vehicle categories and specifications",
        icon: Package,
      },
    ],
  },
  {
    title: "Customers",
    items: [
      {
        title: "All Customers",
        href: "/customers",
        description: "View and manage customer information",
        icon: Users,
      },
      {
        title: "Add Customer",
        href: "/customers/add",
        description: "Register a new customer",
        icon: UserCheck,
      },
    ],
  },
  {
    title: "Services",
    items: [
      {
        title: "Maintenance",
        href: "/maintenance",
        description: "Track vehicle maintenance and repairs",
        icon: Wrench,
      },
      {
        title: "Appointments",
        href: "/appointments",
        description: "Schedule and manage appointments",
        icon: Calendar,
      },
      {
        title: "Invoices",
        href: "/invoices",
        description: "Billing and payment management",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Reports",
    items: [
      {
        title: "Dashboard",
        href: "/",
        description: "Overview of key metrics and statistics",
        icon: BarChart3,
      },
      {
        title: "Analytics",
        href: "/reports",
        description: "Detailed reports and analytics",
        icon: FileText,
      },
      {
        title: "Alerts",
        href: "/alerts",
        description: "System alerts and notifications",
        icon: AlertTriangle,
      },
    ],
  },
];

export default function AppLayout({ children, className }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Navbar data={navigationItems} />
        
        {/* Page content */}
        <main className={cn("flex-1 overflow-auto", className)}>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}