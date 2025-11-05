import { StepProps, Service } from '../../../types/booking';

export default function ServiceType({ data, onUpdate, onNext, onBack }: StepProps) {
 const services: Service[] = [
  { id: 1, name: 'Oil Change', duration: '45 min', price: 'Rs. 12,000', description: 'Complete oil and filter change' },
  { id: 2, name: 'Brake Service', duration: '90 min', price: 'Rs. 28,000', description: 'Brake inspection and pad replacement' },
  { id: 3, name: 'Engine Diagnosis', duration: '60 min', price: 'Rs. 18,000', description: 'Complete engine diagnostic check' },
  { id: 4, name: 'Battery Check', duration: '30 min', price: 'Rs. 7,000', description: 'Battery health and charging system check' },
  { id: 5, name: 'Tire Rotation', duration: '40 min', price: 'Rs. 9,000', description: 'Tire rotation and pressure check' },
  { id: 6, name: 'Custom Project', duration: 'Varies', price: 'Custom Quote', description: 'Request custom service or modification' }
];


  const handleSelect = (serviceTypeId: number) => {
    onUpdate({ serviceTypeId });
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', margin: '0 0 0.5rem 0' }}>
          Step 2: Choose Service Type
        </h2>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Select the type of service you need
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {services.map(service => (
          <div
            key={service.id}
            onClick={() => handleSelect(service.id)}
            style={{
              padding: '1.5rem',
              border: `2px solid ${data.serviceTypeId === service.id ? '#2563eb' : '#e5e7eb'}`,
              borderRadius: '0.75rem',
              background: data.serviceTypeId === service.id ? '#f0f7ff' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                {service.name}
              </h3>
              <span style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                color: '#2563eb' 
              }}>
                {service.price}
              </span>
            </div>
            <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
              {service.description}
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              <span>Duration: {service.duration}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '2rem', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'white',
            color: '#374151',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: '1px solid #d1d5db',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
        

        <button
          onClick={onNext}
          disabled={!data.serviceTypeId}
          style={{
            background: data.serviceTypeId ? '#2563eb' : '#9ca3af',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontWeight: '500',
            cursor: data.serviceTypeId ? 'pointer' : 'not-allowed'
          }}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}