'use client'

import { Suspense, lazy } from 'react'
import CustomerLayout from "@/components/layout/customer/CustomerLayout"
import { Loader } from 'lucide-react'

// Lazy load dashboard components for better performance
const CustomerDashboardContent = lazy(() => import('@/components/customer/CustomerDashboardContent'))

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-12 w-48 bg-gray-200 rounded-xl animate-pulse" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm h-32">
            <div className="flex items-center justify-between h-full">
              <div className="space-y-2 flex-1">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md h-96 flex items-center justify-center">
          <Loader className="w-8 h-8 text-[#03009B] animate-spin" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md h-96 flex items-center justify-center">
          <Loader className="w-8 h-8 text-[#03009B] animate-spin" />
        </div>
      </div>
    </div>
  )
}

export default function CustomerDashboard() {
  return (
    <CustomerLayout>
      <Suspense fallback={<DashboardSkeleton />}>
        <CustomerDashboardContent />
      </Suspense>
    </CustomerLayout>
  )
}
