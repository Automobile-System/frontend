import ContactForm from "@/components/forms/ContactForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/layout/Navigation"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata = {
  title: "Contact Us | CarVeo",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020079] to-[#01024D]">
      {/* Navigation Header */}
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-10 text-center">
        <div className="inline-block bg-[#FFD70029] px-4 py-1.5 rounded-full mb-4">
          <span className="text-[#FFD700] font-semibold text-sm tracking-wide">GET IN TOUCH</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">Contact Us</h1>
        <p className="text-gray-200 mt-2 text-lg">We'd love to hear from you. Reach out with any questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ContactForm />
        </div>

        <div className="space-y-4">
          <Card className="bg-white/95 backdrop-blur border-[#0200791F] shadow-xl">
            <CardHeader className="bg-[#0200791F]">
              <CardTitle className="text-[#020079] text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm pt-6">
              <div className="flex items-start gap-3 group hover:bg-[#FFD70029] p-3 rounded-lg transition-colors">
                <Mail className="h-5 w-5 text-[#FFD700] mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-[#020079]">Email</p>
                  <p className="text-gray-600">support@carveo.example</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group hover:bg-[#FFD70029] p-3 rounded-lg transition-colors">
                <Phone className="h-5 w-5 text-[#FFD700] mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-[#020079]">Phone</p>
                  <p className="text-gray-600">+94 11 234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group hover:bg-[#FFD70029] p-3 rounded-lg transition-colors">
                <MapPin className="h-5 w-5 text-[#FFD700] mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-[#020079]">Address</p>
                  <p className="text-gray-600">123 Service Ave, Colombo</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group hover:bg-[#FFD70029] p-3 rounded-lg transition-colors">
                <Clock className="h-5 w-5 text-[#FFD700] mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-[#020079]">Hours</p>
                  <p className="text-gray-600">Mon–Sat: 9:00–18:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur border-[#0200791F] shadow-xl">
            <CardHeader className="bg-[#0200791F]">
              <CardTitle className="text-[#020079] text-xl">Find Us</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="aspect-video w-full overflow-hidden rounded-xl border-2 border-[#FFD700]/30 bg-gradient-to-br from-[#0200791F] to-[#FFD70029] flex items-center justify-center">
                <MapPin className="h-12 w-12 text-[#FFD700]/50" />
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">Map integration coming soon</p>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  )
}
