import { Navigation } from "@/components/layout/Navigation"
import Link from "next/link"
import { Check, Star, Sparkles, Crown, Zap } from "lucide-react"

// Package data with service combinations
const packages = [
  {
    id: 1,
    name: "Basic Care",
    icon: Sparkles,
    price: "LKR 4,500",
    duration: "1-2 hours",
    popular: false,
    description: "Essential maintenance for your vehicle",
    services: [
      "Wash and Grooming",
      "Lube Services",
      "Basic Inspection Report",
      "Windscreen Treatments",
      "Undercarriage Degreasing"
    ],
    color: "blue",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    name: "Premium Plus",
    icon: Star,
    price: "LKR 12,500",
    duration: "3-4 hours",
    popular: true,
    description: "Comprehensive care package for optimal performance",
    services: [
      "Exterior & Interior Detailing",
      "Engine Tune ups",
      "Wheel Alignment",
      "Battery Services",
      "Brake Service & Inspection",
      "Full Inspection Report",
      "Wash and Grooming",
      "Windscreen Treatments"
    ],
    color: "yellow",
    gradient: "from-yellow-500 to-yellow-600"
  },
  {
    id: 3,
    name: "Ultimate Luxury",
    icon: Crown,
    price: "LKR 25,000",
    duration: "Full Day",
    popular: false,
    description: "Premium treatment for luxury and high-end vehicles",
    services: [
      "Nano Treatments",
      "Full Paints",
      "Complete Detailing (Exterior & Interior)",
      "Engine Tune ups & Diagnostics",
      "Wheel Alignment & Balancing",
      "Battery Services",
      "Hybrid Services",
      "Insurance Claims Assistance",
      "Part Replacements",
      "Full Inspection Report"
    ],
    color: "purple",
    gradient: "from-purple-500 to-purple-700"
  },
  {
    id: 4,
    name: "Express Service",
    icon: Zap,
    price: "LKR 2,500",
    duration: "30-45 mins",
    popular: false,
    description: "Quick service for busy schedules",
    services: [
      "Wash and Grooming",
      "Basic Inspection",
      "Windscreen Cleaning",
      "Tire Pressure Check"
    ],
    color: "green",
    gradient: "from-green-500 to-green-600"
  },
  {
    id: 5,
    name: "Maintenance Pro",
    icon: Star,
    price: "LKR 18,500",
    duration: "4-6 hours",
    popular: false,
    description: "Complete maintenance and mechanical services",
    services: [
      "Periodic Maintenances",
      "Mechanical Services",
      "Engine Tune ups",
      "Lube Services",
      "Battery Services",
      "Wheel Alignment",
      "Brake Service",
      "Part Replacements",
      "Full Diagnostic Report"
    ],
    color: "red",
    gradient: "from-red-500 to-red-600"
  },
  {
    id: 6,
    name: "Body & Paint",
    icon: Sparkles,
    price: "LKR 35,000",
    duration: "2-3 Days",
    popular: false,
    description: "Complete body work and painting services",
    services: [
      "Body Shop Services",
      "Full Paints",
      "Dent Removal",
      "Scratch Repair",
      "Nano Treatments",
      "Complete Detailing",
      "Insurance Claims Assistance",
      "Quality Warranty"
    ],
    color: "orange",
    gradient: "from-orange-500 to-orange-600"
  }
]

const colorClasses = {
  blue: {
    badge: "bg-blue-100 text-blue-800",
    icon: "bg-blue-100 text-blue-600",
    button: "bg-[#020079] hover:bg-[#020079]/90 text-white"
  },
  yellow: {
    badge: "bg-yellow-100 text-yellow-800",
    icon: "bg-yellow-100 text-yellow-600",
    button: "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold"
  },
  purple: {
    badge: "bg-purple-100 text-purple-800",
    icon: "bg-purple-100 text-purple-600",
    button: "bg-purple-600 hover:bg-purple-700 text-white"
  },
  green: {
    badge: "bg-green-100 text-green-800",
    icon: "bg-green-100 text-green-600",
    button: "bg-green-600 hover:bg-green-700 text-white"
  },
  red: {
    badge: "bg-blue-100 text-blue-800",
    icon: "bg-blue-100 text-blue-600",
    button: "bg-[#020079] hover:bg-[#020079]/90 text-white"
  },
  orange: {
    badge: "bg-orange-100 text-orange-800",
    icon: "bg-orange-100 text-orange-600",
    button: "bg-orange-600 hover:bg-orange-700 text-white"
  }
}

export default function PackagesPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-roboto">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#020079] via-[#020079] to-[#0300a8] py-20 px-4 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse delay-700"></div>
          </div>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-block mb-4 px-6 py-2 bg-yellow-400/20 backdrop-blur-sm rounded-full border border-yellow-400/30">
              <span className="text-yellow-400 text-sm font-medium tracking-wide">Service Packages</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
              Choose Your Perfect Package
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
              We&apos;ve combined our best services into convenient packages designed to keep your vehicle in top condition. Save time and money with our expertly curated service bundles.
            </p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const Icon = pkg.icon
              const colors = colorClasses[pkg.color as keyof typeof colorClasses]
              
              return (
                <div
                  key={pkg.id}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                    pkg.popular ? 'border-yellow-400 scale-105' : 'border-gray-100'
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                      MOST POPULAR
                    </div>
                  )}

                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${pkg.gradient} p-6 text-white`}>
                    <div className={`w-14 h-14 ${colors.icon} rounded-full flex items-center justify-center mb-4`}>
                      <Icon className={`w-7 h-7 text-${pkg.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-white/90 text-sm mb-4">{pkg.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{pkg.price}</span>
                    </div>
                    <p className="text-white/80 text-sm mt-2">Duration: {pkg.duration}</p>
                  </div>

                  {/* Services List */}
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-black mb-4">Included Services:</h4>
                    <ul className="space-y-3 mb-6">
                      {pkg.services.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{service}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Book Button */}
                    <Link
                      href="/booking"
                      className={`block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg ${colors.button}`}
                    >
                      Book This Package
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Custom Package Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Need a Custom Package?</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Can&apos;t find exactly what you&apos;re looking for? We can create a personalized service package tailored to your vehicle&apos;s specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-[#020079] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#020079]/90 transition-all hover:scale-105 shadow-lg"
              >
                Contact Us
              </Link>
              <Link
                href="/booking"
                className="inline-block border-2 border-[#020079] text-[#020079] px-8 py-4 rounded-xl font-semibold hover:bg-[#020079]/5 transition-all"
              >
                Book Individual Services
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
            Why Choose Our Packages?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Save Money</h3>
              <p className="text-gray-600 text-sm">Packages offer better value than individual services</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⏱️</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Save Time</h3>
              <p className="text-gray-600 text-sm">Everything done in one convenient visit</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Expert Care</h3>
              <p className="text-gray-600 text-sm">Curated by our automotive professionals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-sm">All packages come with our service warranty</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-[#020079] to-[#000050] text-white py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-white/80 mb-6">Book your package today and experience the NITROLINE difference</p>
            <Link
              href="/booking"
              className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-10 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-yellow-500/50"
            >
              Book Now
            </Link>
          </div>
        </footer>
      </div>
    </>
  )
}
