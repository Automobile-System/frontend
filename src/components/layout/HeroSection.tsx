"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, ArrowRight, Zap, Award, Globe2 } from "lucide-react"

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
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: "AUTO MiRAJ KURUNEGALA",
    subtitle: "NOW YOU CAN FIND US AT THE HISTORICAL CITY OF KURUNEGALA",
    description: "Learn more",
    backgroundImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
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
    backgroundImage: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=800&fit=crop",
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
    backgroundImage: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&h=800&fit=crop",
    stats: [
      { 
        label: "HOTLINE", 
        value: "0755", 
        sublabel: "004004",
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
  autoPlayInterval = 5000,
  className = ""
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
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            background: `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('${slide.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative h-full flex items-center">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
              {/* Left Content */}
              <div className="text-white max-w-3xl animate-in slide-in-from-left duration-1000">
                <Badge className="bg-red-600/20 text-red-200 border-red-400/30 mb-4 font-roboto">
                  Premium Automotive Services
                </Badge>
                
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold font-roboto mb-4 leading-tight">
                  <span className="text-white drop-shadow-2xl">AUTO</span>{" "}
                  <span className="text-red-100 animate-pulse drop-shadow-2xl">MiRAJ</span>
                </h1>
                
                <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 text-red-100 font-inter drop-shadow-xl">
                  KURUNEGALA
                </h2>
                
                <p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl leading-relaxed font-inter opacity-90">
                  {slide.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                  >
                    {slide.description}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-medium transition-all duration-300"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Video
                  </Button>
                </div>
              </div>

              {/* Right Stats */}
              <div className="hidden lg:block space-y-8 animate-in slide-in-from-right duration-1000">
                {slide.stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="text-white text-right bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/30 hover:bg-white/20 transition-all duration-300 group shadow-lg"
                  >
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-sm text-red-200 mr-2 font-inter font-medium">
                        {stat.label}
                      </span>
                      {stat.icon && (
                        <div className="text-red-200 group-hover:scale-110 transition-transform">
                          {stat.icon}
                        </div>
                      )}
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-red-100 mb-1 font-roboto drop-shadow-lg">
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
              className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/30 shadow-lg"
            >
              <div className="text-lg font-bold text-red-100 font-roboto drop-shadow">
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
          className="text-white hover:text-red-400 transition-colors"
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
                  ? "bg-red-600 scale-125" 
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
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-red-400 hover:bg-black/20 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="h-8 w-8 md:h-12 md:w-12" />
      </Button>
      
      <Button
        variant="ghost"
        size="lg"
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-red-400 hover:bg-black/20 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="h-8 w-8 md:h-12 md:w-12" />
      </Button>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/20">
        <div 
          className="h-full bg-red-600 transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        />
      </div>
    </section>
  )
}