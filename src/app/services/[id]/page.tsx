"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getServiceById } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  ArrowLeft, 
  Calendar, 
  Wrench, 
  FileText, 
  CheckCircle2, 
  Star, 
  Shield, 
  Phone, 
  Info, 
  DollarSign, 
  Clock, 
  FolderOpen, 
  Tag 
} from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { useAuth } from "@/hooks/useAuth";

interface ServiceDetail {
  id: string;
  name: string;
  description?: string;
  basePrice?: number;
  category?: string;
  durationMinutes?: number;
  imageUrl?: string;
}

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth();
  const router = useRouter();
  const unwrappedParams = use(params);
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadService = async () => {
      setIsLoading(true);
      try {
        const response = await getServiceById(unwrappedParams.id);
        if (!isMounted) return;
        
        // Map backend response (serviceId, title, cost) to frontend interface
        const mappedService: ServiceDetail = {
          id: response.serviceId?.toString() || unwrappedParams.id,
          name: response.title || "Untitled Service",
          description: response.description,
          basePrice: response.cost,
          category: response.category,
          durationMinutes: response.estimatedHours ? Math.round(response.estimatedHours * 60) : undefined,
          imageUrl: response.imageUrl
        };
        
        setService(mappedService);
        setError(null);
      } catch (err) {
        console.error("Failed to load service", err);
        if (isMounted) {
          setService(null);
          setError("We couldn’t load this service right now.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadService();
    return () => {
      isMounted = false;
    };
  }, [unwrappedParams.id]);

  const handleBook = () => {
    if (!service) return;
    router.push(`/booking?serviceId=${service.id}&serviceName=${encodeURIComponent(service.name)}`);
  };

  const pageTitle = service?.name ?? "Service Details";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation initialUser={user} />
      
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#020079] via-[#020079]/95 to-[#020079]/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6C200]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E6C200]/10 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-6 py-10">
          <button
            onClick={() => router.push("/services")}
            className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
            <span>Back to services</span>
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20">
                <Wrench className="w-5 h-5" />
                {service?.category && (
                  <span className="text-sm font-semibold">{service.category}</span>
                )}
              </div>
              <h1 className="text-5xl font-bold font-bebas tracking-wide mb-3">
                {pageTitle}
              </h1>
              <p className="text-lg text-white/80 font-roboto max-w-2xl">
                Professional automotive service with quality guarantee
              </p>
            </div>
            
            {service && (
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {typeof service.basePrice === "number" && (
                  <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl px-6 py-4 text-center">
                    <p className="text-sm text-white/70 mb-1">Starting at</p>
                    <p className="text-3xl font-bold text-[#E6C200]">
                      LKR {service.basePrice.toFixed(2)}
                    </p>
                  </div>
                )}
                <Button 
                  onClick={handleBook}
                  className="bg-[#E6C200] hover:bg-[#E6C200]/90 text-black font-bold px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
                >
                  <Calendar className="mr-2 h-5 w-5" /> 
                  Book this service
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="mt-3 text-sm">Loading service details…</p>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-semibold">{error}</p>
            <p className="text-sm mt-1">Please try again or contact support.</p>
            <div className="mt-4">
              <Button variant="outline" onClick={() => router.refresh()}>
                Retry
              </Button>
            </div>
          </div>
        ) : !service ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#020079]">Service not found</h2>
            <p className="text-gray-600 mt-2">
              We couldn’t find that service. It may have been removed.
            </p>
            <Button className="mt-6" onClick={() => router.push("/services")}>Browse services</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Description Card */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-8 border-2 border-[#020079]/10 shadow-xl hover:shadow-2xl transition-shadow bg-white rounded-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#020079]/10">
                  <div className="p-2 bg-[#020079]/5 rounded-lg">
                    <FileText className="w-8 h-8 text-[#020079]" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#020079] font-bebas tracking-wide">Description</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {service.description || "No description provided."}
                  </p>
                </div>
              </Card>

              {/* What's Included */}
              <Card className="p-8 border-2 border-[#020079]/10 shadow-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#020079]/10">
                  <div className="p-2 bg-[#020079]/5 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-[#020079]" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#020079] font-bebas tracking-wide">What's Included</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#020079]/30 hover:shadow-md transition-all">
                    <div className="p-1.5 bg-[#020079]/5 rounded-lg">
                      <Wrench className="w-5 h-5 text-[#020079]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#020079]">Professional Service</p>
                      <p className="text-sm text-gray-600">Expert technicians</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#020079]/30 hover:shadow-md transition-all">
                    <div className="p-1.5 bg-[#020079]/5 rounded-lg">
                      <Star className="w-5 h-5 text-[#E6C200]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#020079]">Quality Parts</p>
                      <p className="text-sm text-gray-600">Genuine components</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#020079]/30 hover:shadow-md transition-all">
                    <div className="p-1.5 bg-[#020079]/5 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#020079]">Warranty</p>
                      <p className="text-sm text-gray-600">Service guarantee</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#020079]/30 hover:shadow-md transition-all">
                    <div className="p-1.5 bg-[#020079]/5 rounded-lg">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#020079]">Support</p>
                      <p className="text-sm text-gray-600">Post-service care</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6">
              <Card className="p-8 border-2 border-[#020079]/20 shadow-xl bg-gradient-to-br from-[#020079]/5 to-white rounded-2xl sticky top-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#020079]/10">
                  <div className="p-2 bg-[#020079]/5 rounded-lg">
                    <Info className="w-6 h-6 text-[#020079]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#020079] font-bebas tracking-wide">Details</h2>
                </div>
                
                <div className="space-y-4 mb-8">
                  {typeof service.basePrice === "number" && (
                    <div className="p-4 bg-white rounded-xl border-l-4 border-[#E6C200] shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-5 h-5 text-[#E6C200]" />
                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Base Price</span>
                      </div>
                      <p className="text-2xl font-bold text-[#020079] ml-7">
                        LKR {service.basePrice.toFixed(2)}
                      </p>
                    </div>
                  )}
                  
                  {service.durationMinutes && (
                    <div className="p-4 bg-white rounded-xl border-l-4 border-[#020079] shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-5 h-5 text-[#020079]" />
                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Typical Duration</span>
                      </div>
                      <p className="text-2xl font-bold text-[#020079] ml-7">
                        {service.durationMinutes} minutes
                      </p>
                    </div>
                  )}
                  
                  {service.category && (
                    <div className="p-4 bg-white rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-1">
                        <FolderOpen className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Category</span>
                      </div>
                      <p className="text-xl font-bold text-[#020079] ml-7">
                        {service.category}
                      </p>
                    </div>
                  )}
                  
                  <div className="p-4 bg-white rounded-xl border-l-4 border-gray-400 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <Tag className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Service ID</span>
                    </div>
                    <p className="text-lg font-mono text-gray-700 ml-7">
                      {service.id}
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleBook}
                  className="w-full bg-gradient-to-r from-[#E6C200] to-[#E6C200]/90 hover:from-[#E6C200]/90 hover:to-[#E6C200] text-black font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <Calendar className="mr-2 h-5 w-5" /> 
                  Book this service
                </Button>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600">
                    🌟 Professional service guaranteed
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
