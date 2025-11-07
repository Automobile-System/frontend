import React from "react"
import Link from "next/link"
import Image from "next/image"
import { getCurrentUser } from "@/lib/auth"
import { Navigation } from "@/components/layout/Navigation"
import { HeroSection } from "@/components/layout/HeroSection"
import { ContactBar } from "@/components/layout/ContactBar" 
import { ServicesGrid } from "@/components/layout/ServicesGrid"
import { ClientWidgets } from "@/components/layout/ClientWidgets"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  ArrowRight,
  Globe2
} from "lucide-react"

const LandingPage = async () => {
  const user = await getCurrentUser()
  
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Navigation Header */}
      <Navigation initialUser={user} />

      <ClientWidgets />

      {/* Hero Section */}
      <HeroSection initialUser={user} />

      {/* Contact Bar */}
  <ContactBar />

  {/* About Us Section */}
  <section id="about" className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <Badge className="bg-accent-soft text-accent border-accent mb-4 font-inter">
                  <Award className="mr-1 h-4 w-4" />
                  Our Story
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4 font-roboto">ABOUT US</h2>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 font-roboto leading-tight">
                  Over <span className="text-accent">28 Years</span> of Excellence in the automotive service industry
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed font-inter text-lg">
                  NitroLine is a premium automotive services and solutions provider. We deliver end‑to‑end maintenance, repairs, and detailing with a focus on quality and customer trust.
                  <strong className="text-accent"> Our culture is built on three pillars: Promptness, Respect & Oneness.</strong>
                </p>
              </div>

              {/* Values */}
              <div className="space-y-6">
                <div className="flex items-center space-x-6 group">
                  <div className="w-44 h-28 bg-brand text-white flex items-center justify-center text-lg font-bold transform -skew-x-12 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
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
                  <div className="w-44 h-28 bg-brand text-white flex items-center justify-center text-lg font-bold transform -skew-x-12 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Users className="mr-2 h-5 w-5" />
                    ONENESS
                  </div>
                  <div className="relative w-36 h-24">
                    <Image src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=150&h=100&fit=crop" alt="Oneness" fill className="object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content -> Projects Preview */}
            <div className="space-y-8">
              <div id="projects-preview">
                <Badge className="bg-blue-100 text-blue-600 border-blue-200 mb-4 font-inter">
                  <Globe2 className="mr-1 h-4 w-4" />
                  Our Projects
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4 font-roboto">PROJECTS</h2>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 font-roboto leading-tight">
                  Featured client work and case studies
                </h3>
                <p className="text-gray-600 mb-8 font-inter text-lg leading-relaxed">
                  A snapshot of solutions we’ve delivered across maintenance, diagnostics, and operations.
                </p>
              </div>

              {/* Projects list */}
              <div className="space-y-4">
                {[
                  { name: "Fleet Maintenance Platform", desc: "Digital service scheduling and reporting for enterprise fleets." },
                  { name: "Express Detailing Kiosks", desc: "High‑throughput detailing with standardized quality." },
                  { name: "EV Readiness Program", desc: "Diagnostics and training for hybrid/EV service bays." },
                  { name: "4x4 Custom Builds", desc: "Specialized off‑road kits and performance tuning." },
                  { name: "Service Management Suite", desc: "Unified intake to delivery with customer messaging." },
                  { name: "Supply Chain Portal", desc: "Parts tracking and vendor coordination for workshops." }
                ].map((proj, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className={`bg-brand-gradient text-white px-4 py-3 font-bold rounded font-roboto text-sm flex items-center group-hover:scale-105 transition-transform border border-white/20`}>
                      <Building2 className="mr-2 h-4 w-4" />
                      {proj.name}
                    </div>
                    <span className="text-gray-600 font-inter group-hover:text-gray-800 transition-colors">{proj.desc}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild className="btn-accent text-black px-8 py-3 font-roboto font-medium transition-all duration-300 hover:scale-105 group">
                  <Link href="#about">
                    About us
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-800 hover:text-white px-8 py-3 font-roboto font-medium transition-all duration-300">
                  <Link href="#projects">
                    <MapPin className="mr-2 h-4 w-4" />
                    View Projects
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadside Assistance Section */}
  <section id="roadside" className="py-20 bg-gradient-to-br from-brand via-[#0c337d] to-black text-white relative overflow-hidden">
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
                  <div className="text-4xl md:text-6xl font-bold transform -skew-x-6 inline-block bg-white text-brand px-6 py-3 rounded font-roboto shadow-2xl">
                    ROADSIDE
                  </div>
                  <div className="text-4xl md:text-6xl font-bold transform -skew-x-6 inline-block bg-white text-brand px-6 py-3 rounded font-roboto shadow-2xl ml-4">
                    ASSISTANCE
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                  <a href="tel:0755004004" className="block">
                    <div className="text-3xl md:text-4xl font-bold font-roboto text-center">
                      📞 0755004004
                    </div>
                    <p className="text-center text-white/80 mt-2 font-inter">Available 24/7</p>
                  </a>
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
                    <service.icon className="h-6 w-6 text-accent group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    <span className="text-lg font-inter group-hover:text-white transition-colors">{service.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button asChild size="lg" className="bg-white text-brand hover:bg-gray-100 font-roboto font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 group">
                  <a href="tel:0755004004">
                    <Shield className="mr-2 h-5 w-5" />
                    Request Emergency Service
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
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
      <div id="services">
        <ServicesGrid />
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-600 border-blue-200 mb-4 font-inter">
              Our Work
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 font-roboto">Projects</h2>
            <p className="text-gray-600 font-inter max-w-2xl mx-auto">
              A curated selection of recent NitroLine initiatives across service, technology, and operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Enterprise Fleet Service", img: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=600&h=400&fit=crop" },
              { title: "Hybrid/EV Diagnostics", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop" },
              { title: "Express Detailing", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop" },
              { title: "4x4 Custom Builds", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop" },
              { title: "Service Management Suite", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop" },
              { title: "Parts & Supply Portal", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop" }
            ].map((p, idx) => (
              <Card key={idx} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative w-full h-44">
                  <Image src={p.img} alt={p.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-brand font-roboto">{p.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button className="btn-accent text-black font-roboto font-medium px-8">View All Projects</Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
  <section className="py-12 bg-gradient-to-r from-black via-gray-900 to-black border-y border-brand">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <div className="text-white">
              <h3 className="text-xl font-bold font-roboto">PREMIUM AUTOCARE SERVICE PROVIDER</h3>
            </div>
            <div className="flex items-center space-x-8 overflow-x-auto">
              {["LUKOIL", "3M", "CASTROL", "CAUSEWAY PAINTS", "DEBEER", "GYEON", "Mobil 1"].map((brand, index) => (
                <div key={index} className={`font-bold whitespace-nowrap transition-all duration-300 hover:scale-110 ${
                  ["3M", "Mobil 1"].includes(brand) ? "text-accent" : 
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
  <footer className="bg-brand text-white py-16">
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
                  All Rights Reserved by NitroLine (Pvt) Ltd.
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