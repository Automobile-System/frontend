import ContactForm from "@/components/forms/ContactForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/layout/Navigation"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata = {
  title: "Contact Us | CarVeo",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <Navigation />
      
      <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Get in touch</h1>
        <p className="text-muted-foreground mt-2">We’d love to hear from you. Reach out with any questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ContactForm />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">support@carveo.example</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+94 11 234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">123 Service Ave, Colombo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">Hours</p>
                  <p className="text-muted-foreground">Mon–Sat: 9:00–18:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Find us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full overflow-hidden rounded-xl border bg-muted" />
              <p className="text-xs text-muted-foreground mt-2">Map placeholder</p>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  )
}
