"use client"

import { useAuth } from '@/hooks/useAuth'

export function CustomerDashboardHeader() {
  const { user } = useAuth()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 m-0">
          Welcome {user?.firstName}
        </h1>
        <p className="text-gray-500 mt-2 text-base">
          Your vehicle service summary and recommendations
        </p>
      </div>
      {/* <Link
        href="/customer/book-service"
        className="bg-[#03009B] hover:bg-[#020079] active:bg-[#01024D] text-white px-6 py-3 rounded-xl border-none font-semibold text-base cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 active:scale-98 flex items-center gap-2"
      >
        <span className="text-xl">+</span>
        Book Service / Project
      </Link> */}
    </div>
  )
}
