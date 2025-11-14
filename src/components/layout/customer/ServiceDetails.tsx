"use client";

import { useState } from "react";
import ServiceTimeline from "./ServiceTimeline";
import ServiceChat from "./ServiceChat";

interface ServiceDetailsProps {
  serviceId: string;
  onClose: () => void;
}

export default function ServiceDetails({
  serviceId,
  onClose,
}: ServiceDetailsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "timeline" | "chat">(
    "details"
  );

  // Mock data - replace with actual API call
  const serviceDetails = {
    id: "1",
    title: "Oil Change",
    vehicle: "Toyota Corolla (KA-1234)",
    serviceType: "Oil Change",
    status: "in-progress",
    assignedEmployee: "Ruwan Silva",
    expectedCompletion: "Today, 4:00 PM",
    startedDate: "Nov 14, 2025 - 10:00 AM",
    estimatedCost: "LKR 5,000.00",
    notes: "Regular maintenance service. Customer requested synthetic oil.",
    parts: [
      { name: "Engine Oil (5L)", price: "LKR 3,500" },
      { name: "Oil Filter", price: "LKR 800" },
    ],
    laborCost: "LKR 700",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-fit sticky top-5 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b-2 border-gray-200 bg-gradient-to-br from-[#020079] via-[#020079]/95 to-[#020079]/90 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6C200]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#E6C200]/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">📋</span>
              <h3 className="text-2xl font-bold font-bebas tracking-wide">
                Service Details
              </h3>
            </div>
            <p className="text-sm text-gray-200 font-roboto">
              Track every aspect of your service
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-3xl text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200 hover:rotate-90"
          >
            ×
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-gray-200 bg-gray-50">
        {(["details", "timeline", "chat"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 px-4 text-sm font-semibold capitalize transition-all duration-200 border-b-3 relative -mb-[2px] ${
              activeTab === tab
                ? "text-[#020079] border-b-[3px] border-[#020079] bg-white shadow-sm"
                : "text-gray-600 border-b-[3px] border-transparent hover:text-[#020079] hover:bg-white/50"
            }`}
          >
            {tab === "chat" ? "💬 Chat" : tab === "timeline" ? "📅 Timeline" : "ℹ️ Info"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 min-h-[500px] max-h-[calc(100vh-300px)] overflow-y-auto">{activeTab === "details" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gradient-to-br from-[#020079]/5 to-[#020079]/10 rounded-xl border-l-4 border-[#020079] hover:shadow-md transition-shadow">
                <div className="text-2xl mb-1">⏱️</div>
                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">
                  Started
                </p>
                <p className="text-sm font-bold text-[#020079]">
                  {serviceDetails.startedDate}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl border-l-4 border-green-500 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-1">✅</div>
                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">
                  Due By
                </p>
                <p className="text-sm font-bold text-green-600">
                  {serviceDetails.expectedCompletion}
                </p>
              </div>
            </div>

            {/* Main Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-[#020079] flex items-center gap-2 pb-3 border-b-2 border-[#020079]/10">
                <span>🔧</span>
                Service Information
              </h4>

              <div className="space-y-3">
                <div className="p-4 bg-gradient-to-r from-[#020079]/5 to-transparent rounded-lg border border-[#020079]/10 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🚗</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">
                        Vehicle
                      </p>
                      <p className="text-base font-bold text-[#020079]">
                        {serviceDetails.vehicle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-[#020079]/5 to-transparent rounded-lg border border-[#020079]/10 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚙️</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">
                        Service Type
                      </p>
                      <p className="text-base font-bold text-[#020079]">
                        {serviceDetails.serviceType}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-[#E6C200]/5 to-transparent rounded-lg border border-[#E6C200]/20 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📊</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">
                        Current Status
                      </p>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#E6C200]/10 text-[#E6C200] font-bold rounded-lg text-sm border-2 border-[#E6C200]/30">
                        <span>⚙️</span>
                        In Progress
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-[#020079]/5 to-transparent rounded-lg border border-[#020079]/10 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">👨‍🔧</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">
                        Assigned Technician
                      </p>
                      <p className="text-base font-bold text-[#020079]">
                        {serviceDetails.assignedEmployee}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-[#020079] flex items-center gap-2 pb-3 border-b-2 border-[#020079]/10">
                <span>💰</span>
                Cost Breakdown
              </h4>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                    <span className="text-sm font-semibold text-gray-700">Parts & Materials</span>
                  </div>
                  {serviceDetails.parts.map((part, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{part.name}</span>
                      <span className="font-semibold text-gray-900">{part.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Labor Cost</span>
                    <span className="font-semibold text-gray-900">{serviceDetails.laborCost}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                    <span className="text-base font-bold text-[#020079]">Estimated Total</span>
                    <span className="text-lg font-bold text-[#020079]">{serviceDetails.estimatedCost}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {serviceDetails.notes && (
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-[#020079] flex items-center gap-2 pb-3 border-b-2 border-[#020079]/10">
                  <span>📝</span>
                  Notes
                </h4>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {serviceDetails.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "timeline" && <ServiceTimeline serviceId={serviceId} />}
        {activeTab === "chat" && (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <ServiceChat serviceId={serviceId} employeeName="Ruwan Silva" />
          </div>
        )}
      </div>
    </div>
  );
}
