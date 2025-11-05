import ServiceCard from './ServiceCard';

type ServiceStatus = 'completed' | 'in-progress' | 'waiting-parts';
type ServiceType = 'service' | 'project';

const mockServices: { id: string; title: string; vehicle: string; status: ServiceStatus; type: ServiceType; assignedTo?: string; completedBy?: string; completedOn?: string; team?: string; expectedCompletion?: string; progress?: number; }[] = [
  {
    id: '1',
    title: 'Oil Change',
    vehicle: 'Toyota Corolla (KA-1234)',
    assignedTo: 'Ruwan Silva',
    status: 'in-progress',
    type: 'service',
  },
  {
    id: '2',
    title: 'Tire Rotation',
    vehicle: 'Toyota Corolla (KA-1234)',
    completedBy: 'Nimal Fernando',
    completedOn: 'Dec 1, 2024',
    status: 'completed',
    type: 'service',
  },
  {
    id: '3',
    title: 'Brake Service',
    vehicle: 'Honda Civic (KB-5678)',
    assignedTo: 'Kamal Perera',
    status: 'waiting-parts',
    type: 'service',
  },
  {
    id: '4',
    title: 'Engine Overhaul',
    vehicle: 'Ford Explorer (KC-9012)',
    team: '3 Mechanics',
    expectedCompletion: 'Dec 15, 2024',
    status: 'in-progress',
    type: 'project',
    progress: 25,
  },
] as const;

interface ServiceListProps {
  onServiceSelect: (serviceId: string) => void;
}

export default function ServiceList({ onServiceSelect }: ServiceListProps) {
  return (
    <div style={{ 
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <div style={{ 
        padding: '24px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h2 style={{ 
          fontSize: '20px',
          fontWeight: '600',
          color: '#1f2937'
        }}>
          Active Services & Projects
        </h2>
      </div>
      
      <div>
        {mockServices.map((service, index) => (
          <div key={service.id}>
            <ServiceCard 
              service={service}
              onClick={() => onServiceSelect(service.id)}
            />
            {index < mockServices.length - 1 && (
              <div style={{ 
                height: '1px',
                backgroundColor: '#e5e7eb',
                margin: '0 24px'
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}