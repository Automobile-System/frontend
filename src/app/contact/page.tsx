import ContactForm from "@/components/forms/ContactForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/layout/Navigation"
import { Mail, Phone, MapPin, Clock, Headphones, Shield, Zap } from "lucide-react"

export const metadata = {
  title: "Contact Us | CarVeo",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#020079]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Header */}
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD700]/10 to-[#FFD700]/5 border border-[#FFD700]/30 px-6 py-2 rounded-full mb-6">
            <Headphones className="h-4 w-4 text-[#020079]" />
            <span className="text-[#020079] font-semibold text-sm tracking-wide uppercase">Available 24/7</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[#020079] to-[#03009B]">
            Get in Touch
          </h1>
          <p className="text-gray-600 mt-4 text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions? We&apos;re here to help. Our team is ready to assist you with your automotive needs.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="border-b border-gray-100 pb-4">
                <CardTitle className="text-[#020079] text-2xl flex items-center gap-2">
                  <Mail className="h-6 w-6 text-[#FFD700]" />
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-start gap-4 group cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-all duration-300">
                  <div className="bg-[#FFD700]/10 p-3 rounded-lg group-hover:bg-[#FFD700]/20 transition-colors">
                    <Mail className="h-6 w-6 text-[#020079]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#020079] mb-1">Email Us</p>
                    <a href="mailto:support@carveo.example" className="text-gray-600 hover:text-[#020079] transition-colors text-sm">
                      support@carveo.example
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-all duration-300">
                  <div className="bg-[#FFD700]/10 p-3 rounded-lg group-hover:bg-[#FFD700]/20 transition-colors">
                    <Phone className="h-6 w-6 text-[#020079]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#020079] mb-1">Call Us</p>
                    <a href="tel:+94112345678" className="text-gray-600 hover:text-[#020079] transition-colors text-sm">
                      +94 11 234 5678
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-all duration-300">
                  <div className="bg-[#FFD700]/10 p-3 rounded-lg group-hover:bg-[#FFD700]/20 transition-colors">
                    <MapPin className="h-6 w-6 text-[#020079]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#020079] mb-1">Visit Us</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      123 Service Avenue<br />
                      Colombo, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:bg-gray-50 p-4 rounded-xl transition-all duration-300">
                  <div className="bg-[#FFD700]/10 p-3 rounded-lg group-hover:bg-[#FFD700]/20 transition-colors">
                    <Clock className="h-6 w-6 text-[#020079]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#020079] mb-1">Business Hours</p>
                    <p className="text-gray-600 text-sm">
                      Monday - Saturday<br />
                      9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us Card */}
            <Card className="bg-gradient-to-br from-[#020079] to-[#03009B] border-[#020079] shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-white font-bold text-lg mb-4">Why Choose Us?</h3>
                
                <div className="flex items-start gap-3">
                  <div className="bg-[#FFD700]/20 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-[#FFD700]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Fast Response</p>
                    <p className="text-gray-300 text-xs">Quick turnaround on inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#FFD700]/20 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-[#FFD700]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Trusted Service</p>
                    <p className="text-gray-300 text-xs">Industry-leading expertise</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#FFD700]/20 p-2 rounded-lg">
                    <Headphones className="h-5 w-5 text-[#FFD700]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">24/7 Support</p>
                    <p className="text-gray-300 text-xs">Always here when you need us</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="bg-white border-gray-200 shadow-lg overflow-hidden">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-[#020079] text-2xl flex items-center gap-2">
              <MapPin className="h-6 w-6 text-[#FFD700]" />
              Find Our Location
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-[21/9] w-full relative bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="bg-[#020079]/5 p-6 rounded-full inline-flex">
                  <MapPin className="h-16 w-16 text-[#020079]" />
                </div>
                <p className="text-gray-500 text-sm">Interactive map integration coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
