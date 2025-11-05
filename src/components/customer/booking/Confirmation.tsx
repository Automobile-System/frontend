import { StepProps } from '../../../types/booking';

interface ConfirmationProps extends Omit<StepProps, 'onNext'> {
  onConfirm: () => void;
}

export default function Confirmation({ data, onBack, onConfirm }: ConfirmationProps) {
  const getVehicleName = (): string => {
    const vehicles: Record<number, string> = {
      1: 'Toyota Corolla (KA-1234)',
      2: 'Honda Civic (KB-5678)', 
      3: 'Ford Explorer (KC-9012)'
    };
    return vehicles[data.vehicleId as number] || 'Unknown Vehicle';
  };

  const getServiceName = (): string => {
    const services: Record<number, string> = {
      1: 'Oil Change - Rs. 4,999',
      2: 'Brake Service - Rs. 12,999',
      3: 'Engine Diagnosis - Rs. 8,999',
      4: 'Battery Check - Rs. 2,999',
      5: 'Tire Rotation - Rs. 3,999',
      6: 'Custom Project - Custom Quote'
    };
    return services[data.serviceTypeId as number] || 'Unknown Service';
  };

  const getEmployeeName = (): string => {
    const employees: Record<number, string> = {
      1: 'Mike Johnson (Engine Specialist)',
      2: 'Sarah Williams (Brake Systems)',
      3: 'David Chen (Electrical Systems)',
      4: 'Any Available Mechanic'
    };
    return employees[data.employeeId as number] || 'Best Available Mechanic';
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', margin: '0 0 0.5rem 0' }}>
          Step 5: Confirm Booking
        </h2>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Please review your service booking details
        </p>
      </div>

      <div style={{ 
        background: '#f8fafc', 
        borderRadius: '0.75rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: '0 0 1.5rem 0' }}>
          Booking Summary
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#6b7280' }}>Vehicle:</span>
            <span style={{ fontWeight: '500', color: '#111827' }}>{getVehicleName()}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#6b7280' }}>Service:</span>
            <span style={{ fontWeight: '500', color: '#111827' }}>{getServiceName()}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#6b7280' }}>Mechanic:</span>
            <span style={{ fontWeight: '500', color: '#111827' }}>{getEmployeeName()}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#6b7280' }}>Date & Time:</span>
            <span style={{ fontWeight: '500', color: '#111827' }}>
              {data.date ? new Date(data.date).toLocaleDateString() : 'Not set'} at {data.time || 'Not set'}
            </span>
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#f0f7ff', 
        borderRadius: '0.75rem', 
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e40af', margin: '0 0 0.5rem 0' }}>
          📍 Service Center Location
        </h4>
        <p style={{ color: '#374151', margin: '0 0 0.5rem 0' }}>
          123 Auto Service Lane, Colombo 05
        </p>
        <p style={{ color: '#6b7280', margin: 0, fontSize: '0.875rem' }}>
          Please arrive 15 minutes before your scheduled time
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
        <button
          onClick={onBack}
          style={{
            background: 'white',
            color: '#374151',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: '1px solid #d1d5db',
            fontWeight: '500',
            cursor: 'pointer',
            flex: 1
          }}
        >
          ← Back
        </button>
        <button
          onClick={onConfirm}
          style={{
            background: '#10b981',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontWeight: '500',
            cursor: 'pointer',
            flex: 1
          }}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
