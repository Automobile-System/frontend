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
  };

  return (
    <div className="bg-white rounded-xl shadow-md h-fit sticky top-5">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-[#020079]/[0.02]">
        <h3 className="text-xl font-bold text-[#020079] m-0">
          Service Details
        </h3>
        <button
          onClick={onClose}
          className="bg-none border-none text-2xl text-gray-500 cursor-pointer p-1 rounded transition-all duration-200 leading-none hover:bg-gray-100 hover:text-[#020079]"
        >
          ×
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-gray-200 bg-white">
        {(["details", "timeline", "chat"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-3.5 border-none bg-transparent text-sm font-medium cursor-pointer capitalize relative -bottom-0.5 transition-all duration-200 ${
              activeTab === tab
                ? "text-[#03009B] font-semibold border-b-[3px] border-[#03009B]"
                : "text-gray-500 border-b-[3px] border-transparent hover:text-[#03009B] hover:bg-[#03009B]/[0.05]"
            }`}
          >
            {tab === "chat" ? "💬 Chat" : tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 min-h-[400px]">
        {activeTab === "details" && (
          <div>
            <div className="mb-5">
              <h4 className="text-lg font-bold text-[#020079] mb-5 pb-3 border-b-2 border-[#020079]/10">
                Service Information
              </h4>

              <div className="grid gap-4">
                <div className="p-3 bg-[#020079]/[0.02] rounded-lg border-l-[3px] border-[#03009B]">
                  <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                    Vehicle:
                  </span>
                  <p className="text-[#020079] mt-1.5 mb-0 font-semibold text-[15px]">
                    {serviceDetails.vehicle}
                  </p>
                </div>

                <div className="p-3 bg-[#020079]/[0.02] rounded-lg border-l-[3px] border-[#03009B]">
                  <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                    Service Type:
                  </span>
                  <p className="text-[#020079] mt-1.5 mb-0 font-semibold text-[15px]">
                    {serviceDetails.serviceType}
                  </p>
                </div>

                <div className="p-3 bg-[#020079]/[0.02] rounded-lg border-l-[3px] border-[#03009B]">
                  <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                    Current Status:
                  </span>
                  <p className="text-[#E6C200] mt-1.5 mb-0 font-semibold px-3 py-1.5 bg-[#E6C200]/10 rounded-md inline-block text-sm">
                    In Progress
                  </p>
                </div>

                <div className="p-3 bg-[#020079]/[0.02] rounded-lg border-l-[3px] border-[#03009B]">
                  <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                    Assigned Employee:
                  </span>
                  <p className="text-[#020079] mt-1.5 mb-0 font-semibold text-[15px]">
                    {serviceDetails.assignedEmployee}
                  </p>
                </div>

                <div className="p-3 bg-[#020079]/[0.02] rounded-lg border-l-[3px] border-[#03009B]">
                  <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                    Expected Completion:
                  </span>
                  <p className="text-[#020079] mt-1.5 mb-0 font-semibold text-[15px]">
                    {serviceDetails.expectedCompletion}
                  </p>
                </div>
              </div>
            </div>
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
