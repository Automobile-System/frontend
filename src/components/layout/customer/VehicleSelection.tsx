import { StepProps, Vehicle } from '../../../types/booking';

export default function VehicleSelection({ data, onUpdate, onNext }: StepProps) {
    const vehicles: Vehicle[] = [
        { id: 1, name: 'Toyota Corolla', licensePlate: 'KA-1234', model: 'Corolla 2020' },
        { id: 2, name: 'Honda Civic', licensePlate: 'KB-5678', model: 'Civic 2019' },
        { id: 3, name: 'Ford Explorer', licensePlate: 'KC-9012', model: 'Explorer 2021' }
    ];

    const handleSelect = (vehicleId: number) => {
        onUpdate({ vehicleId });
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#111827',
                    margin: '0 0 0.5rem 0'
                }}>
                    Step 1: Choose Your Vehicle
                </h2>
                <p style={{ color: '#6b7280', margin: 0 }}>
                    Select the vehicle you want to service
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {vehicles.map(vehicle => (
                    <div
                        key={vehicle.id}
                        onClick={() => handleSelect(vehicle.id)}
                        style={{
                            padding: '1.5rem',
                            border: `2px solid ${data.vehicleId === vehicle.id ? '#2563eb' : '#e5e7eb'}`,
                            borderRadius: '0.75rem',
                            background: data.vehicleId === vehicle.id ? '#f0f7ff' : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            color: '#111827',
                            margin: '0 0 0.5rem 0'
                        }}>
                            {vehicle.name}
                        </h3>
                        <p style={{ color: '#6b7280', margin: '0 0 0.25rem 0' }}>
                            {vehicle.model}
                        </p>
                        <p style={{ color: '#6b7280', margin: 0, fontSize: '0.875rem' }}>
                            Plate: {vehicle.licensePlate}
                        </p>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={onNext}
                    disabled={!data.vehicleId}
                    style={{
                        background: data.vehicleId ? '#2563eb' : '#9ca3af',
                        color: 'white',
                        padding: '0.75rem 2rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        fontWeight: '500',
                        cursor: data.vehicleId ? 'pointer' : 'not-allowed',
                        fontSize: '1rem'
                    }}
                >
                    Next Step →
                </button>
            </div>
        </div>
    );
}