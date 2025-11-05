import { PaymentStatus } from '@/pages/customer/payments';

interface PaymentFiltersProps {
  filterStatus: PaymentStatus | 'all';
  onFilterChange: (status: PaymentStatus | 'all') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function PaymentFilters({
  filterStatus,
  onFilterChange,
  searchTerm,
  onSearchChange
}: PaymentFiltersProps) {
  const statusOptions: { value: PaymentStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All Payments' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      alignItems: 'center'
    }}>
      {/* Search Input */}
      <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
        <input
          type="text"
          placeholder="Search services or vehicles..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '80%',
            padding: '0.75rem 1rem 0.75rem 2.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            backgroundColor: 'white'
          }}
        />
        <span style={{
          position: 'absolute',
          left: '0.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#9ca3af'
        }}>
          🔍
        </span>
      </div>

      {/* Status Filter */}
      <select
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value as PaymentStatus | 'all')}
        style={{
          padding: '0.75rem 1rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          backgroundColor: 'white',
          color: '#374151',
          minWidth: '150px'
        }}
      >
        {statusOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Export Button */}
      <button
        style={{
          padding: '0.75rem 1rem',
          border: '1px solid #10b981',
          borderRadius: '0.5rem',
          backgroundColor: 'transparent',
          color: '#10b981',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#10b981';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#10b981';
        }}
      >
        📥 Export CSV
      </button>
    </div>
  );
}