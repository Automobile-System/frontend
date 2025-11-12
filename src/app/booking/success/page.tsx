import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Navigation } from "@/components/layout/Navigation"

export default function BookingSuccessPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-20">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Booking Successful</h1>
          <p className="text-gray-600 mb-6">Thank you! Your appointment has been scheduled. We will contact you with a confirmation shortly.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/customer/dashboard" className="inline-block bg-[#020079] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-95 transition">Go to Dashboard</Link>
            <Link href="/booking" className="inline-block border border-[#020079] text-[#020079] px-6 py-3 rounded-lg font-semibold hover:bg-[#020079]/5 transition">Book Another Service</Link>
          </div>
        </div>
      </main>
    </>
  )
}
