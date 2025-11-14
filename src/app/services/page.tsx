"use client";

import Link from "next/link";
import { useEffect, useState, MouseEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { getServicesList } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { normalizeServiceCollection, NormalizedService } from "@/lib/serviceMapper";
import { Navigation } from "@/components/layout/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { 
  Droplet, 
  Wrench, 
  Settings, 
  Paintbrush, 
  CircleDot, 
  Zap, 
  Search, 
  Car 
} from "lucide-react";

export default function ServicesCatalogPage() {
  const { user } = useAuth();
  const [services, setServices] = useState<NormalizedService[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const data = await getServicesList();
        setServices(normalizeServiceCollection(data));
      } catch (e) {
        console.error("Failed to load services", e);
        setServices([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCardClick = (serviceId: string) => {
    router.push(`/services/${serviceId}`);
  };

  const stopPropagation = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, serviceId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick(serviceId);
    }
  };

  // Group services by category
  const groupedServices = services.reduce<Record<string, NormalizedService[]>>((groups, service) => {
    const category = service.category?.toUpperCase() || "OTHER SERVICES";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(service);
    return groups;
  }, {});

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedServices).sort();

  // Category icons mapping
  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    const iconClass = "w-8 h-8 text-[#020079]";
    
    if (categoryLower.includes('wash') || categoryLower.includes('clean')) 
      return <Droplet className={iconClass} />;
    if (categoryLower.includes('repair') || categoryLower.includes('fix')) 
      return <Wrench className={iconClass} />;
    if (categoryLower.includes('maintenance') || categoryLower.includes('service')) 
      return <Settings className={iconClass} />;
    if (categoryLower.includes('paint') || categoryLower.includes('body')) 
      return <Paintbrush className={iconClass} />;
    if (categoryLower.includes('tire') || categoryLower.includes('wheel')) 
      return <CircleDot className={iconClass} />;
    if (categoryLower.includes('electric') || categoryLower.includes('battery')) 
      return <Zap className={iconClass} />;
    if (categoryLower.includes('diagnostic')) 
      return <Search className={iconClass} />;
    return <Car className={iconClass} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation initialUser={user} />
      <div className="container mx-auto px-6 py-10">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bebas tracking-wide text-[#020079] mb-3">Our Services</h1>
          <p className="text-gray-600 text-lg">Professional automobile care and maintenance solutions</p>
        </div>
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Loading services…</p>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No services available.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {sortedCategories.map((category) => (
            <div key={category} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center gap-3 border-b-2 border-[#020079]/20 pb-3">
                <div className="p-2 bg-[#020079]/5 rounded-lg">
                  {getCategoryIcon(category)}
                </div>
                <h2 className="text-3xl font-bebas tracking-wide text-[#020079]">{category}</h2>
                <span className="ml-auto text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {groupedServices[category].length} {groupedServices[category].length === 1 ? 'Service' : 'Services'}
                </span>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedServices[category].map((s) => (
                  <Card
                    key={s.id}
                    className="p-6 h-full flex flex-col justify-between border border-[#020079]/10 bg-white shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:scale-[1.02]"
                    onClick={() => handleCardClick(s.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => handleCardKeyDown(event, s.id)}
                        >
                    <div>
                      <Link
                        href={`/services/${s.id}`}
                        className="group block"
                        onClick={stopPropagation}
                      >
                        <h3 className="text-2xl font-bebas tracking-wide text-[#020079] group-hover:text-[#E6C200] transition-colors">
                          {s.name}
                        </h3>
                        {s.description && (
                          <p className="text-gray-600 mt-3 line-clamp-3 leading-relaxed">{s.description}</p>
                        )}
                        {typeof s.basePrice === "number" && (
                          <p className="mt-4 text-lg font-bebas tracking-wide text-[#020079]">
                            From LKR {s.basePrice.toFixed(2)}
                          </p>
                        )}
                      </Link>
                    </div>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <Link href={`/services/${s.id}`} className="flex-1" onClick={stopPropagation}>
                        <Button variant="outline" className="w-full text-[#020079] border-[#020079] hover:bg-[#020079] hover:text-white transition-all">
                          View Details
                        </Button>
                      </Link>
                      <Link
                        href={`/booking?serviceId=${s.id}&serviceName=${encodeURIComponent(s.name)}`}
                        className="flex-1"
                        onClick={stopPropagation}
                      >
                        <Button className="w-full bg-gradient-to-r from-[#E6C200] to-[#f5d43e] text-black font-bebas tracking-wide text-lg hover:scale-105 transition-transform">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
