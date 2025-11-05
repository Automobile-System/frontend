"use client";

import { useState } from "react";

export default function ReportsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">📊</span>
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Employee Efficiency Graph */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🏆</span>
            <h2 className="text-xl font-bold text-gray-800">Employee Efficiency Graph</h2>
          </div>
          
          <div className="bg-gray-50 h-80 rounded-lg flex flex-col items-center justify-center p-6">
            <p className="text-gray-400 mb-6">Bar Chart Visualization</p>
            <div className="w-full h-56 flex items-end justify-center gap-8 px-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 bg-teal-600 rounded-t flex items-end justify-center pb-2" style={{ height: '190px' }}>
                  <span className="text-white text-xs font-semibold">95%</span>
                </div>
                <span className="text-sm text-gray-700 font-medium">Ruwan</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 bg-blue-600 rounded-t flex items-end justify-center pb-2" style={{ height: '184px' }}>
                  <span className="text-white text-xs font-semibold">92%</span>
                </div>
                <span className="text-sm text-gray-700 font-medium">Kamal</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 bg-emerald-600 rounded-t flex items-end justify-center pb-2" style={{ height: '194px' }}>
                  <span className="text-white text-xs font-semibold">97%</span>
                </div>
                <span className="text-sm text-gray-700 font-medium">Nimal</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 bg-purple-600 rounded-t flex items-end justify-center pb-2" style={{ height: '180px' }}>
                  <span className="text-white text-xs font-semibold">90%</span>
                </div>
                <span className="text-sm text-gray-700 font-medium">Amal</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 bg-orange-500 rounded-t flex items-end justify-center pb-2" style={{ height: '176px' }}>
                  <span className="text-white text-xs font-semibold">88%</span>
                </div>
                <span className="text-sm text-gray-700 font-medium">Others</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 text-center mt-4">
            Ruwan: 95% | Kamal: 92% | Nimal: 97% | Amal: 90% | Others: 88%
          </p>
        </div>

        {/* Most Requested Employees */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">⭐</span>
            <h2 className="text-xl font-bold text-gray-800">Most Requested Employees</h2>
          </div>
          
          <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
            <div className="w-full px-8">
              <p className="text-gray-400 text-center mb-4">Horizontal Bar Chart</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Nimal Fernando</span>
                    <span className="text-gray-500">45 requests</span>
                  </div>
                  <div className="bg-gray-300 h-6 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Ruwan Silva</span>
                    <span className="text-gray-500">38 requests</span>
                  </div>
                  <div className="bg-gray-300 h-6 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">Kamal Perera</span>
                    <span className="text-gray-500">35 requests</span>
                  </div>
                  <div className="bg-gray-300 h-6 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parts Delay Analytics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔧</span>
            <h2 className="text-xl font-bold text-gray-800">Parts Delay Analytics</h2>
          </div>
          
          <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <p className="text-gray-400 mb-4">Line Chart Visualization</p>
              <div className="relative h-32 w-full px-8">
                <svg className="w-full h-full" viewBox="0 0 300 100">
                  <polyline
                    points="0,80 50,60 100,70 150,40 200,50 250,30 300,45"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="80" r="3" fill="#0d9488" />
                  <circle cx="50" cy="60" r="3" fill="#0d9488" />
                  <circle cx="100" cy="70" r="3" fill="#0d9488" />
                  <circle cx="150" cy="40" r="3" fill="#0d9488" />
                  <circle cx="200" cy="50" r="3" fill="#0d9488" />
                  <circle cx="250" cy="30" r="3" fill="#0d9488" />
                  <circle cx="300" cy="45" r="3" fill="#0d9488" />
                </svg>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            Average delay: 2.5 days | Most common: Transmission parts (8 cases)
          </p>
        </div>

        {/* Completed Projects by Type */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✅</span>
            <h2 className="text-xl font-bold text-gray-800">Completed Projects by Type</h2>
          </div>
          
          <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <p className="text-gray-400 mb-4">Donut Chart</p>
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Engine - 35% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#0d9488"
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
                    stroke="#3b82f6"
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
                    stroke="#10b981"
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
                    stroke="#f59e0b"
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
                    stroke="#8b5cf6"
                    strokeWidth="20"
                    strokeDasharray="9.42 219.91"
                    strokeDashoffset="-179.06"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">100</p>
                    <p className="text-xs text-gray-500">Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            Engine: 35% | Electrical: 20% | Bodywork: 25% | Custom: 15% | Other: 5%
          </p>
        </div>
      </div>
    </div>
  );
}
