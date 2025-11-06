"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminSidebar() {
  const pathname = usePathname()

  const navigationItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      
      id: "overview",
    },
    {
      href: "/admin/finacialReports",
      label: "Financial Reports",
    
      id: "finance",
    },
    {
      href: "/admin/workforceOverview",
      label: "Workforce Overview",
     
      id: "workforce",
    },
    {
      href: "/admin/servicesAnalytics",
      label: "Services Analytics",
    
      id: "analytics",
    },
    {
      href: "/admin/aiInsights",
      label: "AI Insights",
     
      id: "ai",
    },
    {
      href: "/admin/settings",
      label: "Settings",
     
      id: "settings",
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <aside className="w-[270px] bg-white border-r border-[#020079]/10 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`block px-4 py-3 rounded-lg text-sm font-roboto transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-[#020079] text-white font-semibold"
                  : "text-[#020079] hover:bg-[#020079]/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
