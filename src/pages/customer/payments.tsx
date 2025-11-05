import { useState } from 'react';
import CustomerLayout from '@/components/customer/layout/CustomerLayout';
import PaymentTable from '@/components/customer/payments/PaymentTable';
import PaymentFilters from '@/components/customer/payments/PaymentFilters';
import InvoiceModal from '@/components/customer/payments/InvoiceModal';

export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash';

export interface Payment {
  id: string;
  date: string;
  service: string;
  vehicle: string;
  amount: number;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  invoiceNumber: string;
}

export default function PaymentHistoryPage() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [filterStatus, setFilterStatus] = useState<PaymentStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data in LKR
  const mockPayments: Payment[] = [
    {
      id: '1',
      date: 'Dec 1, 2024',
      service: 'Tire Rotation',
      vehicle: 'Toyota Corolla (KA-1234)',
      amount: 4500.00,
      status: 'paid',
      paymentMethod: 'credit_card',
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: '2',
      date: 'Nov 15, 2024',
      service: 'Battery Check',
      vehicle: 'Honda Civic (KB-5678)',
      amount: 2500.00,
      status: 'paid',
      paymentMethod: 'debit_card',
      invoiceNumber: 'INV-2024-002'
    },
    {
      id: '3',
      date: 'Oct 20, 2024',
      service: 'Engine Diagnosis',
      vehicle: 'Ford Explorer (KC-9012)',
      amount: 8000.00,
      status: 'paid',
      paymentMethod: 'credit_card',
      invoiceNumber: 'INV-2024-003'
    },
    {
      id: '4',
      date: 'Sep 5, 2024',
      service: 'Oil Change',
      vehicle: 'Toyota Corolla (KA-1234)',
      amount: 3500.00,
      status: 'paid',
      paymentMethod: 'bank_transfer',
      invoiceNumber: 'INV-2024-004'
    },
    {
      id: '5',
      date: 'Aug 12, 2024',
      service: 'Brake Service',
      vehicle: 'Honda Civic (KB-5678)',
      amount: 12000.00,
      status: 'paid',
      paymentMethod: 'credit_card',
      invoiceNumber: 'INV-2024-005'
    }
  ];

  const filteredPayments = mockPayments.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesSearch =
      payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalSpent = mockPayments.reduce((sum, payment) => sum + payment.amount, 0);

  // Format LKR amount with Rs symbol and commas
  const formatLKR = (amount: number) =>
    `Rs ${amount.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;

  return (
    <CustomerLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            Payment History
          </h1>
          <p style={{
            color: '#6b7280',
            margin: '0.25rem 0 0 0'
          }}>
            View and manage all your payment transactions
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #10b981'
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
              Total Spent
            </p>
            <p style={{ color: '#1f2937', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              {formatLKR(totalSpent)}
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #3b82f6'
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
              Total Payments
            </p>
            <p style={{ color: '#1f2937', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              {mockPayments.length}
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #f59e0b'
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
              This Month
            </p>
            <p style={{ color: '#1f2937', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              {formatLKR(4500)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <PaymentFilters
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Payment Table */}
        <PaymentTable
          payments={filteredPayments}
          onViewInvoice={setSelectedPayment}
        />

        {/* Invoice Modal */}
        {selectedPayment && (
          <InvoiceModal
            payment={selectedPayment}
            onClose={() => setSelectedPayment(null)}
          />
        )}
      </div>
    </CustomerLayout>
  );
}
