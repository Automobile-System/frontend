"use client";

import EmployeeHeader from "./EmployeeHeader";
import EmployeeSidebar from "./EmployeeSidebar";

interface EmployeeLayoutProps {
  children: React.ReactNode;
}

export default function EmployeeLayout({ children }: EmployeeLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <EmployeeHeader />

      {/* Main Container with Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        <EmployeeSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
