import { useState } from 'react';
import CustomerLayout from '@/components/customer/layout/CustomerLayout';
import EmployeeList from '@/components/customer/preferred-employees/EmployeeList';

export default function PreferredEmployeesPage() {
  const [preferredEmployees, setPreferredEmployees] = useState<string[]>([]);

  const handleTogglePreferred = (employeeId: string) => {
    setPreferredEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  return (
    <CustomerLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            Preferred Employees
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem',
            lineHeight: '1.5'
          }}>
            Select your preferred employees for future services. This is optional - managers will automatically assign available mechanics if you do not choose.
          </p>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          marginBottom: '2rem',
          padding: '1rem 1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '0.75rem',
              height: '0.75rem',
              borderRadius: '50%',
              backgroundColor: '#10b981'
            }} />
            <span style={{ fontSize: '0.875rem', color: '#374151' }}>
              Available: <strong style={{ color: '#1f2937' }}>3 employees</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '0.75rem',
              height: '0.75rem',
              borderRadius: '50%',
              backgroundColor: '#ef4444'
            }} />
            <span style={{ fontSize: '0.875rem', color: '#374151' }}>
              Busy: <strong style={{ color: '#1f2937' }}>1 employee</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '0.75rem',
              height: '0.75rem',
              borderRadius: '50%',
              backgroundColor: '#3b82f6'
            }} />
            <span style={{ fontSize: '0.875rem', color: '#374151' }}>
              Selected: <strong style={{ color: '#1f2937' }}>{preferredEmployees.length} employees</strong>
            </span>
          </div>
        </div>

        {/* Employee List */}
        <EmployeeList 
          preferredEmployees={preferredEmployees}
          onTogglePreferred={handleTogglePreferred}
        />

        {/* Footer Note */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem 1.5rem',
          backgroundColor: '#fffbeb',
          border: '1px solid #f59e0b',
          borderRadius: '0.5rem'
        }}>
          <p style={{ 
            color: '#92400e',
            fontSize: '0.875rem',
            margin: 0,
            textAlign: 'center'
          }}>
            💡 <strong>Note:</strong> Your preferred employees will be prioritized for future service bookings. 
            If they are unavailable, we will assign the next best available mechanic.
          </p>
        </div>
      </div>
    </CustomerLayout>
  );
}