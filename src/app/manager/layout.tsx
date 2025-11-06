"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import TopNavBar from "@/components/layout/TopNavBar";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <TopNavBar />

      {/* Main Container with Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}