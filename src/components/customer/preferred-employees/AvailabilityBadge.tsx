import { EmployeeStatus } from './EmployeeList';

interface AvailabilityBadgeProps {
  status: EmployeeStatus;
}

export default function AvailabilityBadge({ status }: AvailabilityBadgeProps) {
  const getStatusConfig = (status: EmployeeStatus) => {
    switch (status) {
      case 'available':
        return {
          color: '#059669',
          backgroundColor: '#d1fae5',
          text: 'Available',
          icon: '●'
        };
      case 'busy':
        return {
          color: '#dc2626',
          backgroundColor: '#fecaca',
          text: 'Busy',
          icon: '●'
        };
      case 'offline':
        return {
          color: '#6b7280',
          backgroundColor: '#f3f4f6',
          text: 'Offline',
          icon: '●'
        };
      default:
        return {
          color: '#6b7280',
          backgroundColor: '#f3f4f6',
          text: 'Unknown',
          icon: '●'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.75rem',
      backgroundColor: config.backgroundColor,
      color: config.color,
      fontSize: '0.75rem',
      fontWeight: '500'
    }}>
      <span style={{ fontSize: '0.5rem' }}>{config.icon}</span>
      {config.text}
    </div>
  );
}