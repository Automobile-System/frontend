'use client';

import { useRouter } from 'next/router';

export default function CustomerHeader() {
  const router = useRouter();

  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
          Welcome back, Kethmi!
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
          Here&apos;s your service overview
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Notification Button */}
        <button
          onClick={() => router.push('/customer/messages')}
          style={{
            padding: '0.5rem',
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <span style={{ fontSize: '1.125rem' }}>🔔</span>
          <span style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '0.5rem',
            height: '0.5rem',
            background: '#ef4444',
            borderRadius: '50%'
          }}></span>
        </button>

        {/* Profile Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'white' }}>KP</span>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', margin: 0 }}>
                Kethmi Pujani
            </p>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
              Premium Member
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
