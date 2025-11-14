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
  "Other"
]

const services = [
  "Wash and Grooming",
  "Lube Services",
  "Exterior & Interior Detailing",
  "Engine Tune ups",
  "Undercarriage Degreasing",
  "Windscreean Treatments",
  "Inspection Reports",
  "Insurance Claims",
  "Part Replacements",
  "Hybrid Services",
  "Wheel Alignment",
  "Battery Services",
  "Nano Treatments",
  "Full Paints",
  "Mechanical",
  "Detailing",
  "Body Shop",
  "Periodic Maintenances",
  "Other"
]

type Variant = "default" | "blur"

interface Props {
  variant?: Variant
}

export default function BookingForm({ variant = "default" }: Props) {
  const isBlur = variant === "blur"

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
    console.log({ ...formData, services: selectedServices })
    // After successful submission (replace with API call), navigate to success page
    router.push('/booking/success')
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-8 ${isBlur ? 'text-white' : ''}`}>
      {/* Form Header */}
      <div className="text-center mb-8">
        <h2 className={`text-3xl md:text-4xl font-bold ${isBlur ? 'text-white' : 'text-black'} mb-3`}>Complete Your Booking</h2>
        <p className={`${isBlur ? 'text-white/90' : 'text-gray-600'} max-w-2xl mx-auto`}>Fill in the details below to schedule your vehicle service appointment</p>
        <div className="w-20 h-1 bg-[#020079] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Name Section */}
      <Card className={`border ${isBlur ? 'border-blue-300/30 bg-white/10 backdrop-blur-sm shadow-none' : 'border-black shadow-sm'} hover:shadow-md transition-shadow`}>
        <CardHeader className={`${isBlur ? 'bg-blue-900/20' : 'bg-gray-50/50'}`}>
          <CardTitle className={`text-xl font-semibold ${isBlur ? 'text-white' : 'text-black'} flex items-center gap-2`}>
            <div className="w-8 h-8 bg-[#020079] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className={`${isBlur ? 'text-white' : 'text-black'} font-normal`}>
                First Name <span className="text-yellow-500">*</span>
              </Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={`${isBlur ? 'border-blue-300/40 bg-white/15 text-white placeholder-white/70 focus:border-yellow-400 focus:bg-white/20' : 'border-black focus:border-[#020079]'} `}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className={`${isBlur ? 'text-white' : 'text-black'} font-normal`}>
                Last Name <span className="text-yellow-500">*</span>
              </Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={`${isBlur ? 'border-blue-300/40 bg-white/15 text-white placeholder-white/70 focus:border-yellow-400 focus:bg-white/20' : 'border-black focus:border-[#020079]'} `}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className={`${isBlur ? 'text-white' : 'text-black'} font-normal`}>
              Phone <span className="text-yellow-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`${isBlur ? 'border-blue-300/40 bg-white/15 text-white placeholder-white/70 focus:border-yellow-400 focus:bg-white/20' : 'border-black focus:border-[#020079]'} `}
              placeholder="+94 XX XXX XXXX"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      <Card className={`border ${isBlur ? 'border-blue-300/30 bg-white/10 backdrop-blur-sm shadow-none' : 'border-black shadow-sm'} hover:shadow-md transition-shadow`}>
        <CardHeader className={`${isBlur ? 'bg-blue-900/20' : 'bg-gray-50/50'}`}>
          <CardTitle className={`text-xl font-semibold ${isBlur ? 'text-white' : 'text-black'} flex items-center gap-2`}>
            <div className="w-8 h-8 bg-[#020079] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
            Vehicle Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleType" className={`${isBlur ? 'text-white' : 'text-black'} font-normal`}>
              Vehicle Type <span className="text-yellow-500">*</span>
            </Label>
            <select
              id="vehicleType"
              required
              value={formData.vehicleType}
              onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
              className={`w-full h-10 px-3 rounded-md border ${isBlur ? 'border-blue-300/40 bg-blue-900/60 text-white placeholder-white/70 focus:border-yellow-400 focus:ring-yellow-400/20 focus:bg-blue-900/70 [&>option]:bg-blue-900 [&>option]:text-white' : 'border-black focus:border-[#020079] focus:outline-none focus:ring-2 focus:ring-[#020079]/20'}`}
              aria-label="Select Vehicle Type"
            >
              <option value="" className={isBlur ? 'bg-blue-900 text-white' : ''}>Select Vehicle Type</option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type} className={isBlur ? 'bg-blue-900 text-white' : ''}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleNumber" className={`${isBlur ? 'text-white' : 'text-black'} font-normal`}>
              Vehicle Number <span className="text-yellow-500">*</span>
            </Label>
            <Input
              id="vehicleNumber"
              required
              value={formData.vehicleNumber}
              onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
              className={`${isBlur ? 'border-blue-300/40 bg-white/15 text-white placeholder-white/70 focus:border-yellow-400 focus:bg-white/20' : 'border-black focus:border-[#020079]'} `}
              placeholder="ABC-1234"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Selection */}
      <Card className={`border ${isBlur ? 'border-blue-300/30 bg-white/10 backdrop-blur-sm shadow-none' : 'border-black shadow-sm'} hover:shadow-md transition-shadow`}>
        <CardHeader className={`${isBlur ? 'bg-blue-900/20' : 'bg-gray-50/50'}`}>
          <CardTitle className={`text-xl font-semibold ${isBlur ? 'text-white' : 'text-black'} flex items-center gap-2`}>
            <div className="w-8 h-8 bg-[#020079] rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
            Select Services
          </CardTitle>
          <p className={`${isBlur ? 'text-white/90' : 'text-sm text-gray-600'} mt-2`}>Choose one or more services you need</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
            {services.map((service) => (
              <label
                key={service}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className={`w-4 h-4 border-2 ${isBlur ? 'border-blue-300/50 bg-white/15' : 'border-gray-400 bg-white'} rounded-sm checked:bg-white checked:border-gray-400 focus:ring-0 focus:ring-offset-0 appearance-none relative
                  checked:after:content-['✓'] checked:after:absolute checked:after:left-[1px] checked:after:top-[-2px] checked:after:text-black checked:after:text-xs checked:after:font-semibold`}
                />
                <span className={`text-sm font-normal ${isBlur ? 'text-white/90' : 'text-gray-600'}`}>{service}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Date/Time */}
      <Card className={`border ${isBlur ? 'border-blue-300/30 bg-white/10 backdrop-blur-sm shadow-none' : 'border-black shadow-sm'} hover:shadow-md transition-shadow`}>
        <CardHeader className={`${isBlur ? 'bg-blue-900/20' : 'bg-gray-50/50'}`}>
          <CardTitle className={`text-xl font-semibold ${isBlur ? 'text-white' : 'text-black'} flex items-center gap-2`}>
            <div className="w-8 h-8 bg-[#020079] rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
            Appointment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className={`${isBlur ? 'text-white' : 'text-black'} font-normal`}>
                Date <span className="text-yellow-500">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`${isBlur ? 'border-blue-300/40 bg-white/15 text-white placeholder-white/70 focus:border-yellow-400 focus:bg-white/20' : 'border-black focus:border-[#020079]'} `}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className={`${isBlur ? 'text-white' : 'text-black'} font-normal`}>
                Time <span className="text-yellow-500">*</span>
              </Label>
              <Input
                id="time"
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={`${isBlur ? 'border-blue-300/40 bg-white/15 text-white placeholder-white/70 focus:border-yellow-400 focus:bg-white/20' : 'border-black focus:border-[#020079]'} `}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card className={`border ${isBlur ? 'border-blue-300/30 bg-white/10 backdrop-blur-sm shadow-none' : 'border-black shadow-sm'} hover:shadow-md transition-shadow`}>
        <CardHeader className={`${isBlur ? 'bg-blue-900/20' : 'bg-gray-50/50'}`}>
          <CardTitle className={`text-xl font-semibold ${isBlur ? 'text-white' : 'text-black'} flex items-center gap-2`}>
            <div className="w-8 h-8 bg-[#020079] rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="additionalNotes" className={`${isBlur ? 'text-white' : 'text-black'} font-normal`}>
              Anything Else? <span className="text-gray-500 text-sm">(Optional)</span>
            </Label>
            <textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              rows={4}
              className={`${isBlur ? 'w-full px-3 py-2 rounded-md border border-blue-300/40 bg-white/15 text-white placeholder-white/70 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:bg-white/20 resize-none' : 'w-full px-3 py-2 rounded-md border border-black focus:border-[#020079] focus:outline-none focus:ring-2 focus:ring-[#020079]/20 resize-none'}`}
              placeholder="Any special requests or additional information..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-600 text-black px-12 py-6 text-lg font-bold rounded-xl shadow-lg shadow-yellow-500/50 hover:shadow-xl hover:shadow-yellow-600/60 transition-all hover:scale-105 min-w-[200px]"
        >
          Submit Booking
        </Button>
      </div>
    </form>
  )
}
