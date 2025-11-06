"use client"

import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"

interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader />

      {/* Main Container with Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
