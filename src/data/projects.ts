import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "porsche-911-turbo-custom",
    name: "Porsche 911 Turbo S Custom Build",
    cost: 45000,
    estimatedHours: 320,
    description:
      "Complete performance overhaul with Stage 3 turbo upgrade, carbon fiber body kit, custom exhaust system, and full interior restoration with Alcantara and leather.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    status: "Completed",
    startDate: "2025-06-15",
    endDate: "2025-09-20",
  },
  {
    id: "bmw-m4-wrap-performance",
    name: "BMW M4 Competition Wrap & Performance",
    cost: 18500,
    estimatedHours: 150,
    description:
      "Satin black wrap installation, M Performance carbon fiber aero kit, ECU Stage 2 tune, custom forged wheels, and Brembo brake system upgrade.",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1600&auto=format&fit=crop",
    status: "In Progress",
    startDate: "2025-10-01",
  },
  {
    id: "mercedes-amg-gt-restoration",
    name: "Mercedes-AMG GT R Paint Correction",
    cost: 12000,
    estimatedHours: 95,
    description:
      "Full paint correction and ceramic coating, carbon fiber diffuser installation, performance exhaust upgrade, and interior deep cleaning with leather conditioning.",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop",
    status: "Completed",
    startDate: "2025-08-10",
    endDate: "2025-09-05",
  },
  {
    id: "range-rover-luxury-upgrade",
    name: "Range Rover Sport SVR Luxury Package",
    cost: 28000,
    estimatedHours: 210,
    description:
      "Premium PPF installation, panoramic roof wrap, custom leather interior with contrast stitching, multimedia system upgrade, and suspension lowering kit.",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1600&auto=format&fit=crop",
    status: "In Progress",
    startDate: "2025-09-25",
  },
  {
    id: "lamborghini-huracan-detailing",
    name: "Lamborghini Huracán EVO Detailing",
    cost: 35000,
    estimatedHours: 180,
    description:
      "Premium nano-ceramic coating application, full exterior PPF protection, carbon fiber accent installation, wheel powder coating, and complete engine bay detailing.",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop",
    status: "Completed",
    startDate: "2025-07-01",
    endDate: "2025-08-15",
  },
]

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id)
}
