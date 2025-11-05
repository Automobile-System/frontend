import { useState } from 'react';
import AddVehicleModal from '../vehicles/AddVehicleModal';
import VehicleDetailsModal from './VehicleDetailsModal';
import { Car } from 'lucide-react'

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  lastService: string;
  nextService: string;
  mileage?: number;
  color?: string;
  vin?: string;
}

interface VehicleSummaryProps {
  vehicles: Vehicle[];
}

export default function VehicleSummary({ vehicles }: VehicleSummaryProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#111827',
        margin: '0 0 1.5rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    }}>
     <Car size={20} /> My Vehicles
</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {vehicles.map((vehicle, index) => (
          <div key={vehicle.id}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#111827',
                    margin: 0
                  }}>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    {vehicle.licensePlate}
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>Last Service:</span>
                    <span style={{ color: '#111827', fontSize: '0.75rem', fontWeight: '500' }}>
                      {formatDate(vehicle.lastService)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>Next Service:</span>
                    <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '500' }}>
                      {formatDate(vehicle.nextService)}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleViewDetails(vehicle)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #3b82f6',
                  borderRadius: '0.5rem',
                  backgroundColor: 'transparent',
                  color: '#3b82f6',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#3b82f6';
                }}
              >
                View Details
              </button>
            </div>

            {index < vehicles.length - 1 && (
              <div style={{ 
                height: '1px', 
                backgroundColor: '#f3f4f6',
                marginTop: '1rem'
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Add Vehicle Button */}
      <button 
        onClick={() => setIsAddModalOpen(true)}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '2px dashed #d1d5db',
          borderRadius: '0.75rem',
          backgroundColor: '#f9fafb',
          color: '#6b7280',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          marginTop: '1rem',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#9ca3af';
          e.currentTarget.style.backgroundColor = '#f3f4f6';
          e.currentTarget.style.color = '#374151';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#d1d5db';
          e.currentTarget.style.backgroundColor = '#f9fafb';
          e.currentTarget.style.color = '#6b7280';
        }}
      >
        + Add New Vehicle
      </button>

      {/* Modals */}
      {isAddModalOpen && (
        <AddVehicleModal
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {selectedVehicle && (
        <VehicleDetailsModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  );
}