"use client"

import React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Car, 
  Settings, 
  Palette, 
  Battery, 
  ArrowRight,
  CheckCircle,
  Zap,
  Shield
} from "lucide-react"

export interface Service {
  id: string
  title: string
  description: string
  image: string
  icon: React.ReactNode
  services: string[]
  highlighted?: string[]
  href?: string
}

interface ServiceCardProps {
  service: Service
  className?: string
}

interface ServicesOverviewProps {
  services?: Service[]
  className?: string
}

const defaultServices: Service[] = [
  {
    id: "maintenance",
    title: "Periodic Maintenance",
    description: "Regular vehicle inspections and comprehensive care services",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop",
    icon: <Settings className="h-6 w-6" />,
    services: [
      "Inspection Reports",
      "Wash & Grooming",
      "Waxing",
      "Undercarriage Degreasing",
      "Lube Services",
      "Interior/Exterior Detailing"
    ],
    highlighted: ["Wash & Grooming", "Interior/Exterior Detailing"],
    href: "/services/maintenance"
  },
  {
    id: "paints",
    title: "Paints & Repairs", 
    description: "Professional paint jobs and comprehensive repair solutions",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop",
    icon: <Palette className="h-6 w-6" />,
    services: [
      "Insurance Claims",
      "Nano Coating", 
      "Spare Parts Replacement",
      "Mechanical Repair",
      "Full Paints",
      "Hybrid Services",
      "4X4 Maintenances"
    ],
    highlighted: ["Nano Coating", "Hybrid Services"],
    href: "/services/paints"
  },
  {
    id: "terminal",
    title: "Terminal Services",
    description: "Advanced diagnostic and technical automotive services",
    image: "https://images.unsplash.com/photo-1572046442516-3d137ea0ec8f?w=400&h=300&fit=crop", 
    icon: <Battery className="h-6 w-6" />,
    services: [
      "Battery Services",
      "Engine Tune-up",
      "Lube Services", 
      "Windscreen Treatments",
      "Tyre Replacements",
      "Wheel Alignment"
    ],
    highlighted: ["Engine Tune-up", "Wheel Alignment"],
    href: "/services/terminal"
  }
]

export function ServiceCard({ service, className = "" }: ServiceCardProps) {
  return (
    <Card className={`overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 ${className}`}>
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <Image 
            src={service.image} 
            alt={service.title} 
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Badge className="absolute top-4 left-4 bg-accent text-black border-none">
            <span className="mr-1">{service.icon}</span>
            Premium Service
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <CardTitle className="text-2xl font-bold text-brand mb-3 font-roboto flex items-center">
          <span className="mr-3 p-2 bg-accent-soft rounded-lg text-accent">
            {service.icon}
          </span>
          {service.title}
        </CardTitle>
        
        <p className="text-gray-600 mb-6 font-inter leading-relaxed">
          {service.description}
        </p>

        <div className="space-y-3">
          {service.services.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 group/item">
              <div className="flex-shrink-0">
                {service.highlighted?.includes(item) ? (
                  <Zap className="h-4 w-4 text-accent" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </div>
              <span className={`font-inter transition-colors group-hover/item:text-brand ${
                service.highlighted?.includes(item) 
                  ? "font-semibold text-accent" 
                  : "text-gray-700"
              }`}>
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <Button 
            className="w-full btn-accent text-black font-medium transition-all duration-300 group/btn"
            size="lg"
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ServicesOverview({ services = defaultServices, className = "" }: ServicesOverviewProps) {
  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-accent-soft text-accent border-accent mb-4 font-inter">
            <Shield className="mr-1 h-4 w-4" />
            Our Expertise
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-brand mb-6 font-roboto">
            OUR SERVICES
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto font-inter leading-relaxed">
            Committed to provide{" "}
            <span className="text-accent font-semibold">the best care</span>{" "}
            with supervision and trust.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-brand rounded-full"></div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="animate-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-roboto">
              Need a Custom Service Package?
            </h3>
            <p className="text-gray-600 mb-6 font-inter max-w-2xl mx-auto">
              Our expert team can create a tailored maintenance and repair plan 
              that fits your specific vehicle needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-accent text-black font-medium px-8 transition-all duration-300 hover:scale-105"
              >
                <Car className="mr-2 h-5 w-5" />
                Book Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8 transition-all duration-300"
              >
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}