import CustomerLayout from '../../components/customer/layout/CustomerLayout';
import VehicleCard from '../../components/customer/vehicles/VehicleCard';
import AddVehicleModal from '../../components/customer/vehicles/AddVehicleModal';

import { useState } from 'react';

export default function Vehicles() {
  const [showAddForm, setShowAddForm] = useState(false);
  
  const vehicles = [
    {
      id: 1,
      name: 'Toyota Corolla',
      model: 'Corolla 2020',
      licensePlate: 'KA-1234',
      lastService: 'Dec 1, 2024',
      serviceCount: 12
    },
    {
      id: 2,
      name: 'Honda Civic', 
      model: 'Civic 2019',
      licensePlate: 'KB-5678',
      lastService: 'Nov 15, 2024',
      serviceCount: 8
    },
    {
      id: 3,
      name: 'Ford Explorer',
      model: 'Explorer 2021', 
      licensePlate: 'KC-9012',
      lastService: 'Oct 20, 2024',
      serviceCount: 5
    }
  ];

  return (
    <CustomerLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>My Vehicles</h1>
            <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>Manage your vehicles and view service history</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            style={{
              background: '#2563eb',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            + Add New Vehicle
          </button>
        </div>

        {/* Vehicles Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {vehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Add Vehicle Form Modal */}
        {showAddForm && (
          <AddVehicleModal onClose={() => setShowAddForm(false)} />
        )}
      </div>
    </CustomerLayout>
  );
}