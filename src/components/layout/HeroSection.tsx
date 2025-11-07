"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HeroAuthButtons } from "@/components/layout/HeroAuthButtons"
import { User } from "@/hooks/useAuth"
import { ChevronLeft, ChevronRight, Play, Zap, Award, Globe2 } from "lucide-react"

export interface HeroSlide {
  id: number
  title: string
  subtitle: string
  description: string
  backgroundImage: string
  stats: {
    label: string
    value: string
    sublabel: string
    icon?: React.ReactNode
  }[]
}

interface HeroSectionProps {
  slides?: HeroSlide[]
  autoPlayInterval?: number
  className?: string
  initialUser?: User | null
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: "NITROLINE COLOMBO",
    subtitle: "NOW YOU CAN FIND US AT THE COMMERCIAL CAPITAL OF COLOMBO",
    description: "Learn more",
    backgroundImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop",
    stats: [
      { 
        label: "GUARANTEED", 
        value: "100%", 
        sublabel: "SATISFACTION",
        icon: <Award className="h-6 w-6" />
      },
      { 
        label: "UNMATCHED EXCELLENCE OF", 
        value: "28 YEARS", 
        sublabel: "SINCE 1994",
        icon: <Zap className="h-6 w-6" />
      },
      { 
        label: "ISLAND WIDE", 
        value: "40 CENTRES", 
        sublabel: "IN SRI LANKA",
        icon: <Globe2 className="h-6 w-6" />
      }
    ]
  },
  {
    id: 2,
    title: "PREMIUM AUTO CARE",
    subtitle: "EXCELLENCE IN AUTOMOTIVE SERVICE INDUSTRY",
    description: "Discover more",
    backgroundImage: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2000&auto=format&fit=crop",
    stats: [
      { 
        label: "CERTIFIED", 
        value: "100%", 
        sublabel: "TECHNICIANS",
        icon: <Award className="h-6 w-6" />
      },
      { 
        label: "TRUSTED BY", 
        value: "10K+", 
        sublabel: "CUSTOMERS",
        icon: <Zap className="h-6 w-6" />
      },
      { 
        label: "NATIONWIDE", 
        value: "24/7", 
        sublabel: "SUPPORT",
        icon: <Globe2 className="h-6 w-6" />
      }
    ]
  },
  {
    id: 3,
    title: "ROADSIDE ASSISTANCE",
    subtitle: "EMERGENCY AUTOMOTIVE SERVICES AVAILABLE 24/7",
    description: "Contact us",
    backgroundImage: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2000&auto=format&fit=crop",
    stats: [
      { 
        label: "HOTLINE", 
        value: "0755004004", 
        sublabel: "CALL NOW",
        icon: <Award className="h-6 w-6" />
      },
      { 
        label: "RESPONSE TIME", 
        value: "< 30", 
        sublabel: "MINUTES",
        icon: <Zap className="h-6 w-6" />
      },
      { 
        label: "ISLAND WIDE", 
        value: "24/7", 
        sublabel: "SERVICE",
        icon: <Globe2 className="h-6 w-6" />
      }
    ]
  }
]

export function HeroSection({ 
  slides = defaultSlides, 
  autoPlayInterval = 7000,
  className = "",
  initialUser
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto-rotate slideshow
  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [slides.length, autoPlayInterval, isPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className={`relative h-screen overflow-hidden ${className}`}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background image */}
          <Image
            src={slide.backgroundImage}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover animate-kenburns ${
              index === currentSlide ? "opacity-100" : "opacity-90"
            }`}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />

          <div className="relative h-full flex items-center">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
              {/* Left Content */}
              <div className="text-white max-w-3xl">
                <Badge className="bg-brand-soft text-accent border-accent mb-4 font-roboto animate-fade-up delay-0">
                  Premium Automotive Services
                </Badge>
                
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold font-roboto mb-4 leading-tight animate-fade-up delay-150">
                  <span className="text-white drop-shadow-2xl">NITRO</span>{" "}
                  <span className="text-accent glow-accent drop-shadow-2xl">LINE</span>
                </h1>
                
                <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 text-accent font-inter drop-shadow-xl animate-fade-up delay-300">
                  COLOMBO
                </h2>
                
                <p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl leading-relaxed font-inter opacity-90 animate-fade-up delay-450">
                  {slide.subtitle}
                </p>
                
                <HeroAuthButtons user={initialUser ?? null} />
              </div>

              {/* Right Stats */}
              <div className="hidden lg:block space-y-8 animate-fade-right delay-600">
                {slide.stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="text-white text-right bg-brand-gradient rounded-lg p-6 border border-white/20 hover:brightness-110 transition-all duration-300 group shadow-lg"
                  >
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-sm text-accent mr-2 font-inter font-medium">
                        {stat.label}
                      </span>
                      {stat.icon && (
                        <div className="text-accent group-hover:scale-110 transition-transform">
                          {stat.icon}
                        </div>
                      )}
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-accent mb-1 font-roboto drop-shadow-lg">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/90 font-inter">
                      {stat.sublabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Mobile Stats */}
      <div className="absolute bottom-24 left-4 right-4 lg:hidden">
        <div className="grid grid-cols-3 gap-2">
          {slides[currentSlide].stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="text-center bg-brand-gradient rounded-lg p-3 border border-white/20 shadow-lg"
            >
              <div className="text-lg font-bold text-accent font-roboto drop-shadow">
                {stat.value}
              </div>
              <div className="text-xs text-white/90 font-inter">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlayPause}
          className="text-white hover:text-accent transition-colors"
        >
          <Play className={`h-4 w-4 ${isPlaying ? 'animate-pulse' : ''}`} />
        </Button>
        
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-accent scale-125" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="lg"
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-accent hover:bg-black/20 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="h-8 w-8 md:h-12 md:w-12" />
      </Button>
      
      <Button
        variant="ghost"
        size="lg"
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-accent hover:bg-black/20 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="h-8 w-8 md:h-12 md:w-12" />
      </Button>

      {/* Segmented Progress Bar (no inline styles) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/20 flex gap-1 px-1">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 rounded-sm transition-colors ${
              i <= currentSlide ? "bg-accent" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  )
}