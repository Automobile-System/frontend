import { useRouter } from 'next/router';

interface Vehicle {
  id: number;
  name: string;
  model: string;
  licensePlate: string;
  lastService: string;
  serviceCount: number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const router = useRouter();

  const viewServiceHistory = () => {
    router.push(`/customer/vehicles/${vehicle.id}`);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      {/* Vehicle Header */}
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#111827',
          margin: '0 0 0.25rem 0'
        }}>
          {vehicle.name}
        </h3>
        <p style={{
          color: '#6b7280',
          fontSize: '0.875rem',
          margin: 0
        }}>
          {vehicle.model}
        </p>
      </div>

      {/* Vehicle Details */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ 
            fontWeight: '500', 
            color: '#374151',
            minWidth: '100px'
          }}>
            Plate:
          </span>
          <span style={{ color: '#111827' }}>{vehicle.licensePlate}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ 
            fontWeight: '500', 
            color: '#374151',
            minWidth: '100px'
          }}>
            Last Service:
          </span>
          <span style={{ color: '#111827' }}>{vehicle.lastService}</span>
        </div>
      </div>

      {/* Service Count */}
      <div style={{
        background: '#f3f4f6',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        marginBottom: '1rem'
      }}>
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#374151',
          margin: 0,
          textAlign: 'center'
        }}>
          <strong>{vehicle.serviceCount}</strong> Services
        </p>
      </div>

      {/* Action Button */}
      <button 
        onClick={viewServiceHistory}
        style={{
          width: '100%',
          background: 'transparent',
          border: '1px solid #d1d5db',
          color: '#374151',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f9fafb';
          e.currentTarget.style.borderColor = '#9ca3af';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = '#d1d5db';
        }}
      >
        Service History
      </button>
    </div>
  );
}