import { useState } from 'react';
import CustomerLayout from '@/components/customer/layout/CustomerLayout';
import ServiceList from '@/components/customer/services/ServiceList';
import ServiceDetails from '@/components/customer/services/ServiceDetails';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <CustomerLayout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#1f2937',
            marginBottom: '8px'
          }}>
            My Services / Projects
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Track and manage all your vehicle services
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: selectedService ? '1fr 400px' : '1fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          <ServiceList onServiceSelect={setSelectedService} />
          
          {selectedService && (
            <ServiceDetails 
              serviceId={selectedService} 
              onClose={() => setSelectedService(null)}
            />
          )}
        </div>
      </div>
    </CustomerLayout>
  );
}