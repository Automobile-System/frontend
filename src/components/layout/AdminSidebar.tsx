"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  
  const handleLogout = () => {
    // Clear any auth tokens/data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to login
    router.push('/login');
  };

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
      href: "/admin/customerdetails",
      label: "Customers Overview",

      id: "customerdetails",
    },
    {
      href: "/admin/settings",
      label: "Settings",
     
      id: "settings",
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <aside className="w-[270px] bg-[#020079]/5 border-r border-[#020079]/20 min-h-screen">
      <div className="p-6 flex flex-col h-screen">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`block px-4 py-3 rounded-lg text-sm font-roboto transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-[#020079] text-white font-semibold"
                  : "text-[#020079] hover:bg-[#020079]/10 bg-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Logout Button */}
        <div className="mt-auto px-0 pb-6">
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
  )
}
