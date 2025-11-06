"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Phone, Facebook, Youtube, Instagram, Twitter, Mail, Clock } from "lucide-react"

interface ContactBarProps {
  hotline?: string
  className?: string
}

export function ContactBar({ hotline = "011 2 640 640", className = "" }: ContactBarProps) {
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },  
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ]

  return (
    <div className={`bg-black text-white py-4 border-t border-brand ${className}`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left Side - Hotline */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-brand-soft px-4 py-2 rounded-lg border border-brand">
              <Phone className="h-5 w-5 text-accent animate-pulse" />
              <span className="font-bold font-roboto text-lg">
                HOTLINE: <span className="text-accent">{hotline}</span>
              </span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-2 text-gray-300">
              <Clock className="h-4 w-4" />
              <span className="font-inter text-sm">24/7 Emergency Service</span>
            </div>
          </div>

          {/* Right Side - Social Media */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 font-inter text-sm hidden md:block">
              Follow us:
            </span>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 rounded-full bg-white/5 hover:bg-accent text-white hover:text-black transition-all duration-300 hover:scale-110 border border-white/10 hover:border-accent"
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                )
              })}
            </div>
            
            <div className="hidden md:flex items-center space-x-2 ml-4">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="font-inter text-sm text-gray-300">
                info@automiraj.lk
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}