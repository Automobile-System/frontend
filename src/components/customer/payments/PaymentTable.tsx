import { Payment } from '@/pages/customer/payments';

interface PaymentTableProps {
  payments: Payment[];
  onViewInvoice: (payment: Payment) => void;
}

export default function PaymentTable({ payments, onViewInvoice }: PaymentTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'failed': return '#ef4444';
      case 'refunded': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'pending': return 'Pending';
      case 'failed': return 'Failed';
      case 'refunded': return 'Refunded';
      default: return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'credit_card': return 'Credit Card';
      case 'debit_card': return 'Debit Card';
      case 'bank_transfer': return 'Bank Transfer';
      case 'cash': return 'Cash';
      default: return method;
    }
  };

  // Helper to format amounts in LKR
  const formatLKR = (amount: number) => `Rs ${amount.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;

  if (payments.length === 0) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        padding: '3rem',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <p style={{ color: '#6b7280', fontSize: '1.125rem', margin: '0 0 1rem 0' }}>
          No payments found
        </p>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gap: '1rem',
        padding: '1rem 1.5rem',
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        fontWeight: '600',
        color: '#374151',
        fontSize: '0.875rem'
      }}>
        <div>Date</div>
        <div>Service</div>
        <div>Vehicle</div>
        <div>Amount</div>
        <div>Payment Method</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {/* Table Rows */}
      <div>
        {payments.map((payment, index) => (
          <div
            key={payment.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
              gap: '1rem',
              padding: '1rem 1.5rem',
              borderBottom: index < payments.length - 1 ? '1px solid #f3f4f6' : 'none',
              alignItems: 'center',
              fontSize: '0.875rem'
            }}
          >
            {/* Date */}
            <div style={{ color: '#1f2937', fontWeight: '500' }}>
              {payment.date}
            </div>

            {/* Service */}
            <div style={{ color: '#1f2937' }}>
              {payment.service}
            </div>

            {/* Vehicle */}
            <div style={{ color: '#6b7280' }}>
              {payment.vehicle}
            </div>

            {/* Amount (formatted in LKR) */}
            <div style={{ color: '#1f2937', fontWeight: '600' }}>
              {formatLKR(payment.amount)}
            </div>

            {/* Payment Method */}
            <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>
              {getPaymentMethodText(payment.paymentMethod)}
            </div>

            {/* Status */}
            <div>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                backgroundColor: getStatusColor(payment.status) + '20',
                color: getStatusColor(payment.status),
                border: `1px solid ${getStatusColor(payment.status)}`
              }}>
                {getStatusText(payment.status)}
              </span>
            </div>

            {/* Action */}
            <div>
              <button
                onClick={() => onViewInvoice(payment)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #3b82f6',
                  borderRadius: '0.375rem',
                  backgroundColor: 'transparent',
                  color: '#3b82f6',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  cursor: 'pointer',
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
                View Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
