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

export default function PackagesPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-br from-[#020079]/95 via-[#020079]/90 to-[#0300a8]/95 font-roboto relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/10 rounded-full filter blur-3xl"></div>
        </div>
        
        {/* Hero Section */}
        <div className="relative py-20 px-4 backdrop-blur-sm">
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
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const Icon = pkg.icon
              
              return (
                <div
                  key={pkg.id}
                  className={`relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 hover:border-yellow-400/50 ${
                    pkg.popular ? 'ring-2 ring-yellow-400/50 scale-105' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg z-10 backdrop-blur-sm">
                      MOST POPULAR
                    </div>
                  )}

                  {/* Frosted Glass Header */}
                  <div className="bg-gradient-to-r from-[#020079]/80 to-[#0300a8]/80 backdrop-blur-sm p-6 text-white border-b border-white/20">
                    <div className="w-14 h-14 bg-yellow-400/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-yellow-400/30">
                      <Icon className="w-7 h-7 text-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-white/90 text-sm mb-4">{pkg.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-yellow-400">{pkg.price}</span>
                    </div>
                    <p className="text-white/80 text-sm mt-2">Duration: {pkg.duration}</p>
                  </div>

                  {/* Services List */}
                  <div className="p-6 bg-white/5 backdrop-blur-sm">
                    <h4 className="text-lg font-semibold text-white mb-4">Included Services:</h4>
                    <ul className="space-y-3 mb-6">
                      {pkg.services.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/90 text-sm">{service}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Book Button */}
                    <Link
                      href="/booking"
                      className="block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:shadow-yellow-400/25"
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
        <div className="py-16 px-4 relative">
          <div className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need a Custom Package?</h2>
            <p className="text-white/90 mb-8 text-lg">
              Can&apos;t find exactly what you&apos;re looking for? We can create a personalized service package tailored to your vehicle&apos;s specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 shadow-md"
              >
                Contact Us
              </Link>
              <Link
                href="/booking"
                className="inline-block border-2 border-yellow-400/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400/10 transition-all backdrop-blur-sm"
              >
                Book Individual Services
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Why Choose Our Packages?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Save Money</h3>
                <p className="text-white/80 text-sm">Packages offer better value than individual services</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
                  <span className="text-3xl">⏱️</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Save Time</h3>
                <p className="text-white/80 text-sm">Everything done in one convenient visit</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Expert Care</h3>
                <p className="text-white/80 text-sm">Curated by our automotive professionals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Quality Guarantee</h3>
                <p className="text-white/80 text-sm">All packages come with our service warranty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 px-4 relative">
          <div className="max-w-7xl mx-auto text-center bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to Get Started?</h3>
            <p className="text-white/80 mb-6">Book your package today and experience the NITROLINE difference</p>
            <Link
              href="/booking"
              className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-10 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-lg hover:shadow-yellow-400/25"
            >
              Book Now
            </Link>
          </div>
        </footer>
      </div>
    </>
  )
}
