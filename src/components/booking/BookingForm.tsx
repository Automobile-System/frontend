"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { BookingFormData } from "@/types/booking"

const vehicleTypes = [
  "Sedan",
  "SUV",
  "Truck",
  "Van",
  "Sports Car",
  "Luxury Car",
  "Other",
]

const services = [
  "Wash and Grooming",
  "Lube Services",
  "Exterior & Interior Detailing",
  "Engine Tune-ups",
  "Undercarriage Degreasing",
  "Windscreen Treatments",
  "Inspection Reports",
  "Insurance Claims",
  "Part Replacements",
  "Hybrid Services",
  "Wheel Alignment",
  "Battery Services",
  "Nano Treatments",
  "Full Paint",
  "Mechanical Service",
  "Detailing",
  "Body Shop",
  "Periodic Maintenance",
  "Other",
]

const branches = [
  "Head Office - Rathmalana",
  "Colombo Branch",
  "Kandy Branch",
  "Galle Branch",
]

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    vehicleType: "",
    vehicleNumber: "",
    services: [],
    branch: "",
    date: "",
    time: "",
    additionalNotes: ""
  })

  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service)
      }
      return [...prev, service]
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // basic client-side validation
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.vehicleType || !formData.vehicleNumber || !formData.date || !formData.time) {
      alert('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    const payload = { ...formData, services: selectedServices }
    console.log('Submitting booking', payload)

    // TODO: replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push('/booking/success')
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Form Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">Complete Your Booking</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Fill in the details below to schedule your vehicle service appointment</p>
        <div className="w-20 h-1 bg-[#020079] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Name Section */}
      <Card className="border border-black shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-gray-50/50">
          <CardTitle className="text-xl font-semibold text-black flex items-center gap-2">
            <div className="w-8 h-8 bg-[#020079] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-black font-normal">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="border-black focus:border-[#020079]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-black font-normal">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="border-black focus:border-[#020079]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-black font-normal">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-black focus:border-[#020079]"
              placeholder="+94 XX XXX XXXX"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      <Card className="border border-black shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-gray-50/50">
          <CardTitle className="text-xl font-semibold text-black flex items-center gap-2">
            <div className="w-8 h-8 bg-[#020079] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
            Vehicle Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleType" className="text-black font-normal">
              Vehicle Type <span className="text-red-500">*</span>
            </Label>
            <select
              id="vehicleType"
              required
              value={formData.vehicleType}
              onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-[#020079] focus:outline-none focus:ring-2 focus:ring-[#020079]/20 relative z-50 bg-white text-black"
              aria-label="Select Vehicle Type"
            >
              <option value="">Select Vehicle Type</option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type} className="text-black">
                  {type}
                </option>
              ))}
            </select>
          </div>
          {/* Branch selection */}
          <div className="space-y-2">
            <Label htmlFor="branch" className="text-black font-normal">
              Preferred Branch <span className="text-gray-500 text-sm">(Optional)</span>
            </Label>
            <select
              id="branch"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-gray-300 focus:border-[#020079] focus:outline-none focus:ring-2 focus:ring-[#020079]/20 bg-white text-black"
            >
              <option value="">Select Branch (optional)</option>
              {branches.map((b) => (
                <option key={b} value={b} className="text-black">{b}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleNumber" className="text-black font-normal">
              Vehicle Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="vehicleNumber"
              required
              value={formData.vehicleNumber}
              onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
              className="border-black focus:border-[#020079]"
              placeholder="ABC-1234"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Selection */}
      <Card className="border border-black shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-gray-50/50">
          <CardTitle className="text-xl font-semibold text-black flex items-center gap-2">
            <div className="w-8 h-8 bg-[#020079] rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
            Select Services
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">Choose one or more services you need</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-end">
              <div className="flex gap-2">
                <button type="button" onClick={() => { setSelectedServices(services.slice(0, 3)) }} className="text-sm text-[#020079] hover:underline">Quick pick</button>
                <button type="button" onClick={() => setSelectedServices([])} className="text-sm text-gray-500 hover:underline">Clear</button>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-auto p-2 border rounded-md bg-white">
                {services.map((service) => (
                  <label key={service} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="w-5 h-5 mt-1 text-[#020079] border-gray-300 rounded focus:ring-[#020079]"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-800">{service}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date/Time */}
      <Card className="border border-black shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-gray-50/50">
          <CardTitle className="text-xl font-semibold text-black flex items-center gap-2">
            <div className="w-8 h-8 bg-[#020079] rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
            Appointment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-black font-normal">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border-gray-300 focus:border-[#020079]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-black font-normal">
                Time <span className="text-red-500">*</span>
              </Label>
              <Input
                id="time"
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="border-gray-300 focus:border-[#020079]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card className="border border-black shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-gray-50/50">
          <CardTitle className="text-xl font-semibold text-black flex items-center gap-2">
            <div className="w-8 h-8 bg-[#020079] rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="additionalNotes" className="text-black font-normal">
              Anything Else? <span className="text-gray-500 text-sm">(Optional)</span>
            </Label>
            <textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-[#020079] focus:outline-none focus:ring-2 focus:ring-[#020079]/20 resize-none"
              placeholder="Any special requests or additional information..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`bg-[#020079] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#020079]/90'} text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all min-w-[200px]`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Booking'}
        </Button>
      </div>
    </form>
  )
}
