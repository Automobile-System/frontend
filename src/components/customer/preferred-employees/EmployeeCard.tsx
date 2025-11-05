import { Employee } from './EmployeeList';
import AvailabilityBadge from './AvailabilityBadge';

interface EmployeeCardProps {
  employee: Employee;
  isPreferred: boolean;
  onTogglePreferred: () => void;
}

export default function EmployeeCard({ employee, isPreferred, onTogglePreferred }: EmployeeCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        style={{
          color: index < Math.floor(rating) ? '#f59e0b' : '#d1d5db',
          fontSize: '1rem'
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: isPreferred ? '2px solid #3b82f6' : '1px solid #e5e7eb',
      transition: 'all 0.2s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Preferred Badge */}
      {isPreferred && (
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.75rem',
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          Preferred ✓
        </div>
      )}

      {/* Employee Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
        {/* Avatar */}
        <div style={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          flexShrink: 0
        }}>
          {employee.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0
            }}>
              {employee.name}
            </h3>
            <AvailabilityBadge status={employee.status} />
          </div>
          
          <p style={{
            color: '#3b82f6',
            fontSize: '0.875rem',
            fontWeight: '500',
            margin: '0 0 0.5rem 0'
          }}>
            {employee.specialization}
          </p>

          <p style={{
            color: '#6b7280',
            fontSize: '0.8rem',
            margin: '0 0 0.5rem 0'
          }}>
            {employee.experience}
          </p>
        </div>
      </div>

      {/* Rating Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {renderStars(employee.rating)}
        </div>
        <span style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#1f2937'
        }}>
          {employee.rating}/5.0
        </span>
        <span style={{
          fontSize: '0.8rem',
          color: '#6b7280'
        }}>
          ({employee.reviewCount} reviews)
        </span>
      </div>

      {/* Action Button */}
      <button
        onClick={onTogglePreferred}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          border: isPreferred ? '1px solid #ef4444' : '1px solid #3b82f6',
          borderRadius: '0.5rem',
          backgroundColor: isPreferred ? '#fef2f2' : '#eff6ff',
          color: isPreferred ? '#dc2626' : '#3b82f6',
          fontSize: '0.875rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
        onMouseEnter={(e) => {
          if (isPreferred) {
            e.currentTarget.style.backgroundColor = '#fee2e2';
          } else {
            e.currentTarget.style.backgroundColor = '#dbeafe';
          }
        }}
        onMouseLeave={(e) => {
          if (isPreferred) {
            e.currentTarget.style.backgroundColor = '#fef2f2';
          } else {
            e.currentTarget.style.backgroundColor = '#eff6ff';
          }
        }}
      >
        {isPreferred ? (
          <>
            <span>✓</span>
            Remove from Preferred
          </>
        ) : (
          <>
            <span>+</span>
            Set as Preferred
          </>
        )}
      </button>

      {/* Specializations */}
      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
        <p style={{
          fontSize: '0.8rem',
          color: '#6b7280',
          margin: '0',
          lineHeight: '1.4'
        }}>
          <strong>Specializes in:</strong> {getSpecializations(employee.specialization)}
        </p>
      </div>
    </div>
  );
}

// Helper function to get detailed specializations
function getSpecializations(specialization: string): string {
  const specializations: { [key: string]: string } = {
    'Engine Specialist': 'engine diagnostics, oil changes, timing belts, engine repairs',
    'Electrical Expert': 'battery systems, wiring, alternators, electronic components',
    'Bodywork Specialist': 'paint jobs, dent removal, frame straightening, rust repair',
    'Transmission Expert': 'automatic/manual transmissions, clutch repairs, gearbox issues'
  };
  
  return specializations[specialization] || 'general automotive repairs';
}