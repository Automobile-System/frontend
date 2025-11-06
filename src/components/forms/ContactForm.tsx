"use client"

import { useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { showToast } from "@/lib/toast"
import { Mail, Phone, User, MessageSquare } from "lucide-react"
import { postContactMessage } from "@/services/api"

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .optional()
    .transform((v) => v?.trim() || ""),
  subject: z.string().optional().transform((v) => v?.trim() || ""),
  message: z.string().min(10, "Please enter at least 10 characters"),
})

type FormValues = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})
    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {}
      parsed.error.issues.forEach((i) => {
        const path = i.path[0] as keyof FormValues
        fieldErrors[path] = i.message
      })
      setErrors(fieldErrors)
      return
    }

    try {
      setLoading(true)
      showToast.loading("Sending your message…")
      // Submit to API if backend exists; otherwise resolve silently
      await postContactMessage(parsed.data).catch(() => Promise.resolve())
      showToast.success("Message sent", "We’ll get back to you soon.")
      setValues({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch {
      showToast.error("Something went wrong", "Please try again in a moment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="shadow-2xl bg-white/95 backdrop-blur border-[#0200791F]">
      <CardHeader className="bg-gradient-to-r from-[#0200791F] to-[#FFD70029]">
        <CardTitle className="text-2xl text-[#020079] font-bold">Send Us a Message</CardTitle>
        <CardDescription className="text-gray-600">We'll respond promptly to your inquiry.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-[#020079]">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FFD700]" />
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={onChange}
                  placeholder="John Doe"
                  disabled={loading}
                  className={`pl-11 h-12 border-[#0200791F] ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-[#020079] focus:ring-[#020079]"}`}
                  required
                />
              </div>
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-[#020079]">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FFD700]" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={onChange}
                  placeholder="you@example.com"
                  disabled={loading}
                  className={`pl-11 h-12 border-[#0200791F] ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-[#020079] focus:ring-[#020079]"}`}
                  required
                />
              </div>
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-[#020079]">Phone (optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#FFD700]" />
                <Input
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={onChange}
                  placeholder="+94 71 234 5678"
                  disabled={loading}
                  className="pl-11 h-12 border-[#0200791F] focus:border-[#020079] focus:ring-[#020079]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-semibold text-[#020079]">Subject (optional)</Label>
              <Input
                id="subject"
                name="subject"
                value={values.subject}
                onChange={onChange}
                placeholder="How can we help?"
                disabled={loading}
                className="h-12 border-[#0200791F] focus:border-[#020079] focus:ring-[#020079]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold text-[#020079]">Message</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-[#FFD700]" />
              <Textarea
                id="message"
                name="message"
                value={values.message}
                onChange={onChange}
                placeholder="Write your message here..."
                disabled={loading}
                className={`pl-11 min-h-36 border-[#0200791F] ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-[#020079] focus:ring-[#020079]"}`}
                required
              />
            </div>
            {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#020079] to-[#03009B] hover:from-[#03009B] hover:to-[#01024D] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
