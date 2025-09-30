"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Car,
  Users,
  Settings,
  Calendar,
  FileText,
  Wrench,
  CreditCard,
  Bell,
  ChevronLeft,
  ChevronRight,
  Home,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
    description: "Overview & Analytics"
  },
  {
    title: "Fleet Management",
    icon: Car,
    href: "/fleet",
    description: "Manage Vehicles"
  },
  {
    title: "Maintenance",
    icon: Wrench,
    href: "/maintenance",
    description: "Service & Repairs"
  },
  {
    title: "Drivers",
    icon: Users,
    href: "/drivers",
    description: "Driver Management"
  },
  {
    title: "Scheduling",
    icon: Calendar,
    href: "/scheduling",
    description: "Trip Planning"
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/reports",
    description: "Analytics & Reports"
  },
  {
    title: "Billing",
    icon: CreditCard,
    href: "/billing",
    description: "Financial Management"
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/notifications",
    description: "Alerts & Messages"
  },
];

export default function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-white shadow-sm transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">AutoManager</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {/* Quick Action */}
        <div className="pb-4">
          <Button
            className={cn(
              "w-full justify-start bg-blue-600 hover:bg-blue-700",
              collapsed && "px-2"
            )}
          >
            <PlusCircle className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Add Vehicle</span>}
          </Button>
        </div>

        {/* Menu Items */}
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-left",
                  collapsed ? "px-2" : "px-3",
                  isActive && "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <Link href="/settings">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              collapsed && "px-2"
            )}
          >
            <Settings className="h-4 w-4" />
            {!collapsed && <span className="ml-3">Settings</span>}
          </Button>
        </Link>
      </div>
    </div>
  );
}