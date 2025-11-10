"use client"

import { useRouter } from "next/navigation"

export function CustomerDashboardHeader() {
  const router = useRouter()

  const handleBookService = () => {
    router.push("/customer/book-service")
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 m-0">
          Welcome back! 👋
        </h1>
        <p className="text-gray-500 mt-2 text-base">
          Your vehicle service summary and recommendations
        </p>
      </div>
      <button
        onClick={handleBookService}
        className="bg-[#03009B] hover:bg-[#020079] active:bg-[#01024D] text-white px-6 py-3 rounded-xl border-none font-semibold text-base cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 active:scale-98 flex items-center gap-2"
      >
        <span className="text-xl">+</span>
        Book Service / Project
      </button>
    </div>
  )
}
