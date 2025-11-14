"use client"

import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"

interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed at top */}
      <AdminHeader />

      {/* Main Container with Sidebar and Content */}
      <div className="flex pt-[65px]">
        {/* Sidebar - Fixed on left */}
        <AdminSidebar />

        {/* Main Content - Account for sidebar width */}
        <main className="flex-1 ml-[270px] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
