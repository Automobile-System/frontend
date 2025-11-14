import ServiceCard from "./ServiceCard";

type ServiceStatus = "completed" | "in-progress" | "waiting-parts";
type ServiceType = "service" | "project";

const mockServices: {
  id: string;
  title: string;
  vehicle: string;
  status: ServiceStatus;
  type: ServiceType;
  assignedTo?: string;
  completedBy?: string;
  completedOn?: string;
  team?: string;
  expectedCompletion?: string;
  progress?: number;
}[] = [
  {
    id: "1",
    title: "Oil Change",
    vehicle: "Toyota Corolla (KA-1234)",
    assignedTo: "Ruwan Silva",
    status: "in-progress",
    type: "service",
  },
  {
    id: "2",
    title: "Tire Rotation",
    vehicle: "Toyota Corolla (KA-1234)",
    completedBy: "Nimal Fernando",
    completedOn: "Dec 1, 2024",
    status: "completed",
    type: "service",
  },
  {
    id: "3",
    title: "Brake Service",
    vehicle: "Honda Civic (KB-5678)",
    assignedTo: "Kamal Perera",
    status: "waiting-parts",
    type: "service",
  },
  {
    id: "4",
    title: "Engine Overhaul",
    vehicle: "Ford Explorer (KC-9012)",
    team: "3 Mechanics",
    expectedCompletion: "Dec 15, 2024",
    status: "in-progress",
    type: "project",
    progress: 25,
  },
] as const;

interface ServiceListProps {
  onServiceSelect: (serviceId: string) => void;
  selectedServiceId?: string | null;
}

export default function ServiceList({
  onServiceSelect,
  selectedServiceId,
}: ServiceListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Active Services & Projects
        </h2>
      </div>

      <div>
        {mockServices.map((service, index) => (
          <div key={service.id}>
            <ServiceCard
              service={service}
              onClick={() => onServiceSelect(service.id)}
              isSelected={selectedServiceId === service.id}
            />
            {index < mockServices.length - 1 && (
              <div className="h-px bg-gray-200 mx-6" />
            )}
          </div>
        ))}
      </div>
      </div>

  );
}
