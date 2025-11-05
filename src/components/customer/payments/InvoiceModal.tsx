import { Payment } from '@/pages/customer/payments';

interface InvoiceModalProps {
  payment: Payment;
  onClose: () => void;
}

export default function InvoiceModal({ payment, onClose }: InvoiceModalProps) {
  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'credit_card': return 'Credit Card ending in 4242';
      case 'debit_card': return 'Debit Card ending in 1234';
      case 'bank_transfer': return 'Bank Transfer';
      case 'cash': return 'Cash Payment';
      default: return method;
    }
  };

  // Format as Rs with commas
  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.5rem 0' }}>
              Invoice #{payment.invoiceNumber}
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
              Issued on {payment.date}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: '#6b7280',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
          >
            ×
          </button>
        </div>

        {/* Invoice Details */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', margin: '0 0 0.5rem 0' }}>
                SERVICE DETAILS
              </h3>
              <p style={{ color: '#1f2937', margin: '0 0 0.25rem 0' }}>{payment.service}</p>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>{payment.vehicle}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', margin: '0 0 0.5rem 0' }}>
                PAYMENT DETAILS
              </h3>
              <p style={{ color: '#1f2937', margin: '0 0 0.25rem 0' }}>
                {formatCurrency(payment.amount)}
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                {getPaymentMethodText(payment.paymentMethod)}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', margin: '0 0 1rem 0' }}>
              BREAKDOWN
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Service Cost</span>
              <span style={{ color: '#1f2937', fontSize: '0.875rem' }}>
                {formatCurrency(payment.amount)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Tax</span>
              <span style={{ color: '#1f2937', fontSize: '0.875rem' }}>Rs. 0.00</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              paddingTop: '0.5rem',
              borderTop: '1px solid #e5e7eb',
              marginTop: '0.5rem'
            }}>
              <span style={{ color: '#1f2937', fontWeight: '600', fontSize: '0.875rem' }}>Total</span>
              <span style={{ color: '#1f2937', fontWeight: '600', fontSize: '0.875rem' }}>
                {formatCurrency(payment.amount)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '1.5rem'
        }}>
          <button
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              backgroundColor: 'white',
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Download PDF
          </button>
          <button
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid #3b82f6',
              borderRadius: '0.375rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
