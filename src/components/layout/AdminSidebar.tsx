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
    <aside className="w-[270px] bg-gradient-to-b from-[#2c4ba5] to-[#1f3a93] text-white min-h-screen shadow-2xl">
      <div className="p-6">
      

        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:translate-x-1 ${
                isActive(item.href)
                  ? "bg-white/25 font-semibold shadow-lg"
                  : ""
              }`}
            >
            
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
