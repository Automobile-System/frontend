"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Car,
  Users,
  FileText,
  Settings,
  BarChart3,
  Calendar,
  Wrench,
  CreditCard,
  Package,
  UserCheck,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    title: "Vehicles",
    icon: Car,
    children: [
      { title: "All Vehicles", href: "/vehicles", icon: Car },
      { title: "Add Vehicle", href: "/vehicles/add", icon: Car },
      { title: "Vehicle Types", href: "/vehicles/types", icon: Package },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    children: [
      { title: "All Customers", href: "/customers", icon: Users },
      { title: "Add Customer", href: "/customers/add", icon: UserCheck },
    ],
  },
  {
    title: "Maintenance",
    href: "/maintenance",
    icon: Wrench,
    badge: "3",
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
  },
  {
    title: "Invoices",
    icon: CreditCard,
    children: [
      { title: "All Invoices", href: "/invoices", icon: FileText },
      {
        title: "Pending",
        href: "/invoices/pending",
        icon: AlertTriangle,
        badge: "2",
      },
      { title: "Paid", href: "/invoices/paid", icon: CreditCard },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
];

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpand = (title: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const isExpanded = expandedItems.has(item.title);
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = item.href ? isActive(item.href) : false;

    if (hasChildren) {
      return (
        <div key={item.title}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 h-9",
              level > 0 && "ml-4 w-auto"
            )}
            onClick={() => toggleExpand(item.title)}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1 text-left">{item.title}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-auto">
                {item.badge}
              </Badge>
            )}
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {isExpanded && (
            <div className="mt-2 space-y-2">
              {item.children?.map((child) => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Button
        key={item.title}
        variant={isItemActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-2 h-9",
          level > 0 && "ml-4 w-auto",
          isItemActive && "bg-secondary"
        )}
        asChild
      >
        <Link href={item.href || "#"}>
          <item.icon className="h-4 w-4" />
          <span className="flex-1 text-left">{item.title}</span>
          {item.badge && (
            <Badge variant="destructive" className="ml-auto">
              {item.badge}
            </Badge>
          )}
        </Link>
      </Button>
    );
  };

  return (
    <div
      className={cn("flex h-full w-64 flex-col border-r bg-card", className)}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Carveo</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-6 px-4">
        <nav className="space-y-3">
          {navigationItems.map((item) => renderNavItem(item))}
        </nav>

        <Separator className="my-6" />

        {/* Settings section */}
        <div className="space-y-1">
          <Button
            variant={pathname === "/settings" ? "secondary" : "ghost"}
            className="w-full justify-start gap-2 h-11"
            asChild
          >
            <Link href="/settings">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground text-center">
          <div>Carveo v1.0</div>
          <div>© 2025 Team Nemmi</div>
        </div>
      </div>
    </div>
  );
}
