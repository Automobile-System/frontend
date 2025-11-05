"use client"

import React from "react"
import { 
  Snowflake, 
  Car, 
  Wrench, 
  Sparkles,
  Droplet,
  CarFront,
  FileCheck,
  Wand2,
  Wind,
  ShieldCheck,
  Battery,
  CircleDot,
  PaintBucket,
  Hammer,
  Cog,
  Zap
} from "lucide-react"

interface ServiceItem {
  icon: React.ReactNode
  label: string
}

interface ServiceCategory {
  title: string
  color: string
  items: ServiceItem[]
}

const servicesData: ServiceCategory[] = [
  {
    title: "PERIODIC MAINTENANCE",
    color: "bg-red-600",
    items: [
      { icon: <Snowflake className="h-5 w-5" />, label: "Washing Packages" },
      { icon: <Droplet className="h-5 w-5" />, label: "Lube Services" },
      { icon: <Sparkles className="h-5 w-5" />, label: "Exterior & Interior Detailing" },
      { icon: <Cog className="h-5 w-5" />, label: "Engine Tune ups" },
      { icon: <FileCheck className="h-5 w-5" />, label: "Inspection Reports" },
      { icon: <Wand2 className="h-5 w-5" />, label: "Waxing" },
      { icon: <Wind className="h-5 w-5" />, label: "Undercarriage Degreasing" },
      { icon: <Car className="h-5 w-5" />, label: "Windscreean Treatments" }
    ]
  },
  {
    title: "NANO COATING",
    color: "bg-red-600",
    items: [
      { icon: <Car className="h-5 w-5" />, label: "Packages" },
      { icon: <CarFront className="h-5 w-5" />, label: "Treatments" }
    ]
  },
  {
    title: "COLLISION REPAIRS",
    color: "bg-red-600",
    items: [
      { icon: <ShieldCheck className="h-5 w-5" />, label: "Insurance Claims" },
      { icon: <CircleDot className="h-5 w-5" />, label: "Wheel Alignment" },
      { icon: <PaintBucket className="h-5 w-5" />, label: "Full Paints" },
      { icon: <Hammer className="h-5 w-5" />, label: "Part Replacements" }
    ]
  },
  {
    title: "TYRE SERVICES",
    color: "bg-red-600",
    items: [
      { icon: <Battery className="h-5 w-5" />, label: "Battery Services" },
      { icon: <CircleDot className="h-5 w-5" />, label: "Tyre Replacements" }
    ]
  },
  {
    title: "MECHANICAL REPAIR",
    color: "bg-red-600",
    items: [
      { icon: <Wrench className="h-5 w-5" />, label: "Spare Parts Replacements" },
      { icon: <Zap className="h-5 w-5" />, label: "Hybrid Services" }
    ]
  }
]

export function ServicesGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((category, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Category Header */}
              <div className={`${category.color} px-6 py-4 relative service-header`}>
                <h3 className="text-white font-bold text-lg tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* Service Items */}
              <div className="p-6 space-y-4">
                {category.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx}
                    className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors px-2 py-2 rounded cursor-pointer"
                  >
                    <div className="text-gray-700">
                      {item.icon}
                    </div>
                    <span className="text-gray-900 font-medium text-base">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
