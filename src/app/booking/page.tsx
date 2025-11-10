import BookingForm from "@/components/booking/BookingForm"
import { Navigation } from "@/components/layout/Navigation"
import Link from "next/link"
import { Calendar, MapPin, Clock, CheckCircle2, Wrench, Shield } from "lucide-react"

export default function BookingPage() {
  return (
    <>
      {/* Navigation */}
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
              <span className="text-yellow-400 text-sm font-medium tracking-wide">Premium Service Booking</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Appointment Reservation
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
              Experience premium automobile service with NITROLINE. Book your appointment and let our expert team take care of your vehicle.
            </p>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <Calendar className="w-10 h-10 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2 text-lg">Flexible Scheduling</h3>
                <p className="text-white/80 text-sm">Choose your preferred date and time</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <Wrench className="w-10 h-10 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2 text-lg">Expert Technicians</h3>
                <p className="text-white/80 text-sm">Certified professionals at your service</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <Shield className="w-10 h-10 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-2 text-lg">Quality Guaranteed</h3>
                <p className="text-white/80 text-sm">Premium service with warranty</p>
              </div>
            </div>
          </div>
        </div>

      {/* Form Section */}
  <div className="max-w-6xl mx-auto px-4 py-16 -mt-8 md:-mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
          <BookingForm />
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gradient-to-br from-blue-50/50 via-white to-gray-50/50 py-20 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Locations & Hours</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* City Network */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-6">
                <div className="w-14 h-14 bg-[#020079]/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-[#020079]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-black mb-6 text-center">
                City Network
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3 text-black/80 font-normal text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Colombo</div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Kandy</div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Matara</div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-black/80 font-normal text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Galle</div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Badulla</div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Kalutara</div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-black/80 font-normal text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Gampaha</div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Negombo</div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Panadura</div>
                </div>
              </div>
            </div>

            {/* City Office */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-6">
                <div className="w-14 h-14 bg-yellow-400/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-black mb-6 text-center">
                Head Office
              </h3>
              <div className="text-center space-y-2">
                <p className="text-black/80 leading-relaxed font-normal">
                  66, Attidiya Road,<br />
                  Rathmalana,<br />
                  Sri Lanka 10390
                </p>
                <div className="pt-4 space-y-1 text-sm">
                  <p className="text-black/70 font-medium">Tel: +94 XX XXX XXXX</p>
                  <p className="text-black/70 font-medium">Email: info@nitroline.lk</p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-black mb-6 text-center">
                Opening Hours
              </h3>
              <div className="text-center space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-black/80 font-semibold mb-1">Weekdays</p>
                  <p className="text-black/70">Mon - Fri: 7 AM - 6 PM</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-black/80 font-semibold mb-1">Weekends</p>
                  <p className="text-black/70">Sat - Sun: 7 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#020079] to-[#000050] text-white py-16 px-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex flex-col gap-2 mb-6">
                <div className="text-4xl font-bold tracking-wider leading-none">
                  <span className="text-white">NITRO</span>
                  <span className="text-yellow-400">LINE</span>
                </div>
                <div className="w-20 h-1 bg-yellow-400 rounded-full"></div>
              </div>
              <p className="text-white/80 text-sm font-normal leading-relaxed mb-4">
                Your trusted automobile service center delivering excellence in every service.
              </p>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors cursor-pointer">
                  <span className="text-sm">ig</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-yellow-400">Quick Links</h4>
              <ul className="space-y-3 text-sm font-normal">
                <li><Link href="/" className="text-white/80 hover:text-yellow-400 hover:pl-2 inline-block transition-all">Home</Link></li>
                <li><Link href="/about" className="text-white/80 hover:text-yellow-400 hover:pl-2 inline-block transition-all">About Us</Link></li>
                <li><Link href="/services" className="text-white/80 hover:text-yellow-400 hover:pl-2 inline-block transition-all">Services</Link></li>
                <li><Link href="/projects" className="text-white/80 hover:text-yellow-400 hover:pl-2 inline-block transition-all">Projects</Link></li>
                <li><Link href="/booking" className="text-white/80 hover:text-yellow-400 hover:pl-2 inline-block transition-all">Book Now</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-yellow-400">Our Services</h4>
              <ul className="space-y-3 text-sm font-normal">
                <li className="text-white/80 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Full Service</span>
                </li>
                <li className="text-white/80 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Oil Change</span>
                </li>
                <li className="text-white/80 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Brake Service</span>
                </li>
                <li className="text-white/80 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Engine Diagnostics</span>
                </li>
                <li className="text-white/80 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Wheel Alignment</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-yellow-400">Contact Info</h4>
              <ul className="space-y-4 text-sm font-normal">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">66, Attidiya Road<br />Rathmalana, Sri Lanka 10390</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-white/80">+94 XX XXX XXXX</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-white/80">info@nitroline.lk</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/60 text-sm font-normal">
              © {new Date().getFullYear()} NITROLINE Automobile Service Center. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}
