"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
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
} from "lucide-react"
import Link from "next/link"
import React from "react"

interface NavbarProps {
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
]

export default function Navbar({ className }: NavbarProps) {
  return (
    <div className={cn("hidden md:flex border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container flex items-center px-4">
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map((section) => (
              <NavigationMenuItem key={section.title}>
                <NavigationMenuTrigger className="h-10">
                  {section.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {section.items.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string
    icon: React.ComponentType<{ className?: string }>
    href: string
  }
>(({ className, title, children, href, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"