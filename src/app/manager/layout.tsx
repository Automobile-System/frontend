"use client";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TopNavBar from "@/components/layout/TopNavBar";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white">
      <div className="md:block fixed left-0 top-0 h-screen z-30">
        <Sidebar>{null}</Sidebar>
      </div>
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-64">
        <Header />
        <TopNavBar />
        <main className="flex-1 overflow-auto p-6 bg-white">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}