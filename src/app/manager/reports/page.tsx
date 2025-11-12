"use client";

import { useState, useEffect } from "react";
import { getServiceTypes } from "@/services/api";

export default function ReportsPage() {
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [selectedServiceType, setSelectedServiceType] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const fetchServiceTypes = async () => {
    try {
      setIsLoading(true);
      const types = await getServiceTypes();
      setServiceTypes(types);
    } catch (error) {
      console.error("Failed to fetch service types:", error);
      // Fallback to empty array if API fails
      setServiceTypes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-4xl font-bebas text-[#020079] mb-2">
          REPORTS & ANALYTICS
        </h1>
        <p className="font-roboto text-[#020079]/60">
          Monitor employee performance and project analytics
        </p>
      </div>

      {/* Filter Section - API #18 Integration */}
      <div className="mb-8 bg-white rounded-lg border-2 border-[#FFD700]/30 p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-roboto font-semibold text-[#020079]">
            Filter by Service Type:
          </label>
          {isLoading ? (
            <div className="text-sm text-[#020079]/60">
              Loading service types...
            </div>
          ) : (
            <select
              value={selectedServiceType}
              onChange={(e) => setSelectedServiceType(e.target.value)}
              className="px-4 py-2 border-2 border-[#020079]/20 rounded-lg focus:border-[#020079] focus:outline-none font-roboto text-[#020079] transition-colors hover:border-[#020079]/40"
            >
              <option value="All">All Services</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}
          {selectedServiceType !== "All" && (
            <button
              onClick={() => setSelectedServiceType("All")}
              className="px-3 py-1 bg-[#020079]/10 hover:bg-[#020079]/20 text-[#020079] text-sm font-roboto rounded-lg transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>
        {selectedServiceType !== "All" && (
          <div className="mt-2 text-sm text-[#020079]/60 font-roboto">
            Showing reports for:{" "}
            <span className="font-semibold text-[#020079]">
              {selectedServiceType}
            </span>
          </div>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Employee Efficiency Graph */}
        <div className="bg-white rounded-lg border-2 border-[#020079]/20 hover:border-[#020079]/40 transition-all shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#020079]/10 pb-3">
            <h2 className="text-xl font-bebas text-[#020079] tracking-wide">
              EMPLOYEE EFFICIENCY GRAPH
            </h2>
          </div>

          <div className="bg-[#020079]/5 h-80 rounded-lg flex flex-col items-center justify-center p-6">
            <p className="text-[#020079]/40 font-roboto mb-6">
              Bar Chart Visualization
            </p>
            <div className="w-full h-56 flex items-end justify-center gap-8 px-4">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-16 bg-[#020079] rounded-t flex items-end justify-center pb-2"
                  style={{ height: "190px" }}
                >
                  <span className="text-white text-xs font-semibold font-roboto">
                    95%
                  </span>
                </div>
                <span className="text-sm text-[#020079] font-roboto font-medium">
                  Ruwan
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-16 bg-[#03009B] rounded-t flex items-end justify-center pb-2"
                  style={{ height: "184px" }}
                >
                  <span className="text-white text-xs font-semibold font-roboto">
                    92%
                  </span>
                </div>
                <span className="text-sm text-[#020079] font-roboto font-medium">
                  Kamal
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-16 bg-[#FFD700] rounded-t flex items-end justify-center pb-2"
                  style={{ height: "194px" }}
                >
                  <span className="text-[#020079] text-xs font-semibold font-roboto">
                    97%
                  </span>
                </div>
                <span className="text-sm text-[#020079] font-roboto font-medium">
                  Nimal
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-16 bg-[#020079]/70 rounded-t flex items-end justify-center pb-2"
                  style={{ height: "180px" }}
                >
                  <span className="text-white text-xs font-semibold font-roboto">
                    90%
                  </span>
                </div>
                <span className="text-sm text-[#020079] font-roboto font-medium">
                  Amal
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-16 bg-[#E6C200] rounded-t flex items-end justify-center pb-2"
                  style={{ height: "176px" }}
                >
                  <span className="text-[#020079] text-xs font-semibold font-roboto">
                    88%
                  </span>
                </div>
                <span className="text-sm text-[#020079] font-roboto font-medium">
                  Others
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#020079]/60 font-roboto text-center mt-4">
            Ruwan: 95% | Kamal: 92% | Nimal: 97% | Amal: 90% | Others: 88%
          </p>
        </div>

        {/* Most Requested Employees */}
        <div className="bg-white rounded-lg border-2 border-[#020079]/20 hover:border-[#020079]/40 transition-all shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#020079]/10 pb-3">
            <h2 className="text-xl font-bebas text-[#020079] tracking-wide">
              MOST REQUESTED EMPLOYEES
            </h2>
          </div>

          <div className="bg-[#020079]/5 h-64 rounded-lg flex items-center justify-center mb-4">
            <div className="w-full px-8">
              <p className="text-[#020079]/40 font-roboto text-center mb-4">
                Horizontal Bar Chart
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1 font-roboto">
                    <span className="text-[#020079] font-medium">
                      Nimal Fernando
                    </span>
                    <span className="text-[#020079]/60">45 requests</span>
                  </div>
                  <div className="bg-[#020079]/10 h-6 rounded-full overflow-hidden">
                    <div
                      className="bg-[#020079] h-full rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1 font-roboto">
                    <span className="text-[#020079] font-medium">
                      Ruwan Silva
                    </span>
                    <span className="text-[#020079]/60">38 requests</span>
                  </div>
                  <div className="bg-[#020079]/10 h-6 rounded-full overflow-hidden">
                    <div
                      className="bg-[#FFD700] h-full rounded-full"
                      style={{ width: "76%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1 font-roboto">
                    <span className="text-[#020079] font-medium">
                      Kamal Perera
                    </span>
                    <span className="text-[#020079]/60">35 requests</span>
                  </div>
                  <div className="bg-[#020079]/10 h-6 rounded-full overflow-hidden">
                    <div
                      className="bg-[#03009B] h-full rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parts Delay Analytics */}
        <div className="bg-white rounded-lg border-2 border-[#020079]/20 hover:border-[#020079]/40 transition-all shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#020079]/10 pb-3">
            <h2 className="text-xl font-bebas text-[#020079] tracking-wide">
              PARTS DELAY ANALYTICS
            </h2>
          </div>

          <div className="bg-[#020079]/5 h-64 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <p className="text-[#020079]/40 font-roboto mb-4">
                Line Chart Visualization
              </p>
              <div className="relative h-32 w-full px-8">
                <svg className="w-full h-full" viewBox="0 0 300 100">
                  <polyline
                    points="0,80 50,60 100,70 150,40 200,50 250,30 300,45"
                    fill="none"
                    stroke="#020079"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="80" r="3" fill="#020079" />
                  <circle cx="50" cy="60" r="3" fill="#020079" />
                  <circle cx="100" cy="70" r="3" fill="#020079" />
                  <circle cx="150" cy="40" r="3" fill="#020079" />
                  <circle cx="200" cy="50" r="3" fill="#020079" />
                  <circle cx="250" cy="30" r="3" fill="#020079" />
                  <circle cx="300" cy="45" r="3" fill="#020079" />
                </svg>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#020079]/60 font-roboto text-center">
            Average delay: 2.5 days | Most common: Transmission parts (8 cases)
          </p>
        </div>

        {/* Completed Projects by Type */}
        <div className="bg-white rounded-lg border-2 border-[#020079]/20 hover:border-[#020079]/40 transition-all shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#020079]/10 pb-3">
            <h2 className="text-xl font-bebas text-[#020079] tracking-wide">
              COMPLETED PROJECTS BY TYPE
            </h2>
          </div>

          <div className="bg-[#020079]/5 h-64 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <p className="text-[#020079]/40 font-roboto mb-4">Donut Chart</p>
              <div className="relative w-48 h-48 mx-auto">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {/* Engine - 35% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#020079"
                    strokeWidth="20"
                    strokeDasharray="65.97 219.91"
                    strokeDashoffset="0"
                  />
                  {/* Electrical - 20% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#03009B"
                    strokeWidth="20"
                    strokeDasharray="37.70 219.91"
                    strokeDashoffset="-65.97"
                  />
                  {/* Bodywork - 25% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="20"
                    strokeDasharray="47.12 219.91"
                    strokeDashoffset="-103.67"
                  />
                  {/* Custom - 15% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#E6C200"
                    strokeWidth="20"
                    strokeDasharray="28.27 219.91"
                    strokeDashoffset="-150.79"
                  />
                  {/* Other - 5% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#020079"
                    strokeWidth="20"
                    strokeDasharray="9.42 219.91"
                    strokeDashoffset="-179.06"
                    opacity="0.4"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bebas text-[#020079]">100</p>
                    <p className="text-xs text-[#020079]/60 font-roboto">
                      Projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#020079]/60 font-roboto text-center">
            Engine: 35% | Electrical: 20% | Bodywork: 25% | Custom: 15% | Other:
            5%
          </p>
        </div>
      </div>
    </div>
  );
}
