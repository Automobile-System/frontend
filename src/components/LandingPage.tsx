"use client"

import React from "react"
import Image from "next/image"
import { Navigation } from "@/components/layout/Navigation"
import { HeroSection } from "@/components/layout/HeroSection"
import { ContactBar } from "@/components/layout/ContactBar" 
import { ServicesOverview } from "@/components/layout/ServicesSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChatButton } from "@/components/chat/ChatButton"
import { AIChatWidget } from "@/components/chat/AIChatWidget"
import {
  Car,
  Wrench,
  Battery,
  Shield,
  Award,
  Users,
  MapPin,
  Building2,
  Zap,
  Heart,
  CheckCircle,
  ArrowRight,
  Globe2
} from "lucide-react"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Navigation Header */}
      <Navigation />

      <div className="fixed top-24 right-4 z-50 space-y-4">
        <ChatButton />
        <AIChatWidget />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Contact Bar */}
      <ContactBar />

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <Badge className="bg-red-100 text-red-600 border-red-200 mb-4 font-inter">
                  <Award className="mr-1 h-4 w-4" />
                  Our Story
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4 font-roboto">ABOUT US</h2>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 font-roboto leading-tight">
                  Over <span className="text-red-600">28 Years</span> of Excellence in the automotive service industry
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed font-inter text-lg">
                  Auto MiRAJ being Sri Lanka&apos;s largest and the best auto service network; has the most diverse service portfolio. 
                  Auto MiRAJ is your one stop station for all of your maintenance, repairs, and services. 
                  <strong className="text-red-600"> Auto MiRAJ Family drives to success based on three main pillars which are, Promptness, Respect & Oneness.</strong>
                </p>
              </div>

              {/* Values */}
              <div className="space-y-6">
                <div className="flex items-center space-x-6 group">
                  <div className="w-44 h-28 bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center text-lg font-bold transform -skew-x-12 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Zap className="mr-2 h-5 w-5" />
                    PROMPTNESS
                  </div>
                  <div className="relative w-36 h-24">
                    <Image src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=150&h=100&fit=crop" alt="Promptness" fill className="object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 group">
                  <div className="relative w-36 h-24">
                    <Image src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=150&h=100&fit=crop" alt="Respect" fill className="object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300" />
                  </div>
                  <div className="w-44 h-28 bg-gradient-to-r from-black to-gray-800 text-white flex items-center justify-center text-lg font-bold transform -skew-x-12 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Heart className="mr-2 h-5 w-5" />
                    RESPECT
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 group">
                  <div className="w-44 h-28 bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center text-lg font-bold transform -skew-x-12 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Users className="mr-2 h-5 w-5" />
                    ONENESS
                  </div>
                  <div className="relative w-36 h-24">
                    <Image src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=150&h=100&fit=crop" alt="Oneness" fill className="object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <div>
                <Badge className="bg-blue-100 text-blue-600 border-blue-200 mb-4 font-inter">
                  <Globe2 className="mr-1 h-4 w-4" />
                  Our Reach
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4 font-roboto">OUR NETWORK</h2>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 font-roboto leading-tight">
                  Over <span className="text-red-600">40 State of the Art</span> Facilities to serve across the country
                </h3>
                <p className="text-gray-600 mb-8 font-inter text-lg leading-relaxed">
                  Our island wide network covers a vast range of services empowered by modern and latest technologies.
                </p>
              </div>

              {/* Service Brands */}
              <div className="space-y-4">
                {[
                  { name: "AUTO MiRAJ PREMIER", desc: "Located in Colombo to offer your vehicle a VIP Service.", bg: "bg-black" },
                  { name: "AUTO MiRAJ GRAND", desc: "From car wash to body shop & workshop, all under one roof.", bg: "bg-gray-800" },
                  { name: "RAMDI", desc: "European/other Manufacturer Repairs & Maintenance.", bg: "bg-red-600" },
                  { name: "AUTO MiRAJ EXPRESS", desc: "Quick detailing services with latest steam wash facilities.", bg: "bg-black" },
                  { name: "AUTO MiRAJ 4X4 EXPERIENCE", desc: "Extreme off-roading experience in Auto MiRAJ's sports rigs.", bg: "bg-red-600" },
                  { name: "VROOM", desc: "Your trusted partner in all automotive repair materials.", bg: "bg-gray-800" }
                ].map((brand, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className={`${brand.bg} text-white px-4 py-3 font-bold rounded font-roboto text-sm flex items-center group-hover:scale-105 transition-transform`}>
                      <Building2 className="mr-2 h-4 w-4" />
                      {brand.name}
                    </div>
                    <span className="text-gray-600 font-inter group-hover:text-gray-800 transition-colors">{brand.desc}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-roboto font-medium transition-all duration-300 hover:scale-105 group">
                  About us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-800 hover:text-white px-8 py-3 font-roboto font-medium transition-all duration-300">
                  <MapPin className="mr-2 h-4 w-4" />
                  Branch Network
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadside Assistance Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-black/20 opacity-20"></div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <Badge className="bg-white/20 text-white border-white/30 mb-6 font-inter">
                  <Shield className="mr-1 h-4 w-4" />
                  Emergency Services
                </Badge>
                
                <div className="space-y-4 mb-8">
                  <div className="text-4xl md:text-6xl font-bold transform -skew-x-6 inline-block bg-white text-red-600 px-6 py-3 rounded font-roboto shadow-2xl">
                    ROADSIDE
                  </div>
                  <div className="text-4xl md:text-6xl font-bold transform -skew-x-6 inline-block bg-white text-red-600 px-6 py-3 rounded font-roboto shadow-2xl ml-4">
                    ASSISTANCE
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                  <div className="text-3xl md:text-4xl font-bold font-roboto text-center">
                    📞 0755004004
                  </div>
                  <p className="text-center text-white/80 mt-2 font-inter">Available 24/7</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Car, text: "Vehicle Breakdown Service" },
                  { icon: Shield, text: "Flat Tires (Tire punctures)" },
                  { icon: Battery, text: "Battery Jump Start" },
                  { icon: Wrench, text: "Roadside Repair Assistance" },
                  { icon: Car, text: "Towing Services" }
                ].map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group">
                    <service.icon className="h-6 w-6 text-red-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    <span className="text-lg font-inter group-hover:text-white transition-colors">{service.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-roboto font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 group">
                  <Shield className="mr-2 h-5 w-5" />
                  Request Emergency Service
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Right Images */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="relative w-full h-48">
                  <Image src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=300&h=200&fit=crop" alt="Tow Truck Service" fill className="object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300" />
                </div>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-center font-roboto">&lt; 30 min</div>
                    <div className="text-center text-white/80 font-inter">Response Time</div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6 mt-8">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-center font-roboto">24/7</div>
                    <div className="text-center text-white/80 font-inter">Available</div>
                  </CardContent>
                </Card>
                <div className="relative w-full h-48">
                  <Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop" alt="Mechanic at work" fill className="object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesOverview />

      {/* Promotions and News Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Promos */}
            <div>
              <Badge className="bg-green-100 text-green-600 border-green-200 mb-6 font-inter">
                <Award className="mr-1 h-4 w-4" />
                Special Offers
              </Badge>
              <h2 className="text-4xl font-bold text-black mb-8 font-roboto">Promos</h2>
              <div className="space-y-6">
                {[
                  { image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=80&h=80&fit=crop", title: "Membership Offers for Members of Airforce" },
                  { image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=80&h=80&fit=crop", title: "Membership Offers for Members of Defense Forces" },
                  { image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop", title: "Membership Offers for GMOA Members" }
                ].map((promo, index) => (
                  <div key={index} className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className="relative w-20 h-20">
                      <Image src={promo.image} alt={promo.title} fill className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-red-600 font-roboto group-hover:text-red-700 transition-colors">{promo.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest News */}
            <div>
              <Badge className="bg-blue-100 text-blue-600 border-blue-200 mb-6 font-inter">
                <CheckCircle className="mr-1 h-4 w-4" />
                Latest Updates
              </Badge>
              <h2 className="text-4xl font-bold text-black mb-8 font-roboto">Latest News</h2>
              
              {/* Featured News */}
              <div className="mb-8">
                <div className="relative w-full h-48 mb-4">
                  <Image src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=200&fit=crop" alt="Toyota Award" fill className="object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2 font-roboto">
                  Auto MiRAJ wins the award for &apos;Toyota TGMO Best Service Chain&apos;
                </h3>
              </div>

              {/* Other News */}
              <div className="space-y-4">
                {[
                  { image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=80&h=80&fit=crop", title: "North Western Insurers' Eve" },
                  { image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=80&h=80&fit=crop", title: "Launch of Auto MiRAJ Fast Fit" },
                  { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop", title: "Car Clinic by Auto MiRAJ Thalawathugoda Branch" }
                ].map((news, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className="relative w-20 h-20">
                      <Image src={news.image} alt={news.title} fill className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-red-600 font-roboto group-hover:text-red-700 transition-colors">{news.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 bg-gradient-to-r from-black via-gray-900 to-black border-y border-red-600/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <div className="text-white">
              <h3 className="text-xl font-bold font-roboto">PREMIUM AUTOCARE SERVICE PROVIDER</h3>
            </div>
            <div className="flex items-center space-x-8 overflow-x-auto">
              {["LUKOIL", "3M", "CASTROL", "CAUSEWAY PAINTS", "DEBEER", "GYEON", "Mobil 1"].map((brand, index) => (
                <div key={index} className={`font-bold whitespace-nowrap transition-all duration-300 hover:scale-110 ${
                  ["3M", "Mobil 1"].includes(brand) ? "text-red-400" : 
                  brand === "CAUSEWAY PAINTS" ? "text-blue-400" : "text-white"
                }`}>
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* City Network */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-roboto">CITY NETWORK</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-400 font-inter">
                <div className="space-y-2">
                  <div className="hover:text-red-400 transition-colors cursor-pointer">Colombo</div>
                  <div className="hover:text-red-400 transition-colors cursor-pointer">Kandy</div>
                  <div className="hover:text-red-400 transition-colors cursor-pointer">Matara</div>
                </div>
                <div className="space-y-2">
                  <div className="hover:text-red-400 transition-colors cursor-pointer">Galle</div>
                  <div className="hover:text-red-400 transition-colors cursor-pointer">Badulla</div>
                  <div className="hover:text-red-400 transition-colors cursor-pointer">Kalutara</div>
                </div>
                <div className="space-y-2">
                  <div className="hover:text-red-400 transition-colors cursor-pointer">Gampaha</div>
                  <div className="hover:text-red-400 transition-colors cursor-pointer">Kadana</div>
                  <div className="hover:text-red-400 transition-colors cursor-pointer">Panadura</div>
                </div>
              </div>
            </div>

            {/* City Office */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-roboto">CITY OFFICE</h3>
              <div className="text-gray-400 space-y-2 font-inter">
                <div>66, Attidiya Road,</div>
                <div>Ratmalana,</div>
                <div>Sri Lanka 10390</div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-roboto">OPENING HOURS</h3>
              <div className="text-gray-400 space-y-2 font-inter">
                <div>Mon - Fri: 7 AM - 6 PM</div>
                <div>Sat - Sun: 7 AM - 6 PM</div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-roboto">CONTACT US</h3>
              <div className="text-gray-400 font-inter space-y-2">
                <div>📞 011 2 640 640</div>
                <div>📧 info@automiraj.lk</div>
                <div className="pt-4 text-xs">
                  All Rights Reserved by Auto MiRAJ (Pvt) Ltd.
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage