"use client";

import Link from "next/link";
import { mockRecommendations } from "../../../utils/mockData";

export default function Recommendations() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Service Recommendations
        </h2>
        <span className="text-sm text-gray-500">
          {mockRecommendations.length} recommendations
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {mockRecommendations.map((rec) => (
          <div
            key={rec.id}
            className={`p-4 rounded-lg ${
              rec.priority === 'high' 
                ? 'bg-red-50 border-l-4 border-red-500' 
                : rec.priority === 'medium'
                  ? 'bg-amber-50 border-l-4 border-amber-500'
                  : 'bg-[#03009B]/5 border-l-4 border-[#03009B]'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                <span className="text-lg">{rec.icon}</span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {rec.type}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rec.priority === 'high'
                      ? 'bg-red-200 text-red-900'
                      : rec.priority === 'medium'
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-blue-200 text-[#03009B]'
                  }`}>
                    {rec.priority === 'high'
                      ? 'High Priority'
                      : rec.priority === 'medium'
                        ? 'Medium Priority'
                        : 'Low Priority'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-2">
                  {rec.message}
                </p>
                <p className="text-xs text-gray-500">
                  {rec.vehicle}
                </p>
              </div>

              {/* Book Service Button */}
              <Link
                href="/customer/book-service"
                className="bg-[#03009B] hover:bg-[#020079] active:bg-[#01024D] text-white text-sm font-medium px-4 py-2 rounded-lg border-none cursor-pointer whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#03009B]/30 active:translate-y-0 active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#03009B]/20 flex-shrink-0 flex items-center justify-center"
              >
                Book Service
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
