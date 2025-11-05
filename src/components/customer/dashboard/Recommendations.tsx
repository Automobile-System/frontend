'use client';

import { useRouter } from 'next/router';
import { mockRecommendations } from '../../../utils/mockData';

export default function Recommendations() {
  const router = useRouter();

  const priorityStyles = {
    high: { backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444' },
    medium: { backgroundColor: '#fefce8', borderLeft: '4px solid #eab308' },
    low: { backgroundColor: '#dbeafe', borderLeft: '4px solid #3b82f6' }
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#111827',
            margin: 0,
          }}
        >
          Service Recommendations
        </h2>
        <span
          style={{
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          {mockRecommendations.length} recommendations
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {mockRecommendations.map((rec) => (
          <div
            key={rec.id}
            style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              ...priorityStyles[rec.priority as keyof typeof priorityStyles],
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              {/* Icon */}
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                <span style={{ fontSize: '1.125rem' }}>{rec.icon}</span>
              </div>

              {/* Details */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.25rem',
                  }}
                >
                  <h3
                    style={{
                      fontWeight: '600',
                      color: '#111827',
                      fontSize: '0.875rem',
                      margin: 0,
                    }}
                  >
                    {rec.type}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      backgroundColor:
                        rec.priority === 'high'
                          ? '#fecaca'
                          : rec.priority === 'medium'
                          ? '#fef08a'
                          : '#bfdbfe',
                      color:
                        rec.priority === 'high'
                          ? '#991b1b'
                          : rec.priority === 'medium'
                          ? '#854d0e'
                          : '#1e40af',
                    }}
                  >
                    {rec.priority === 'high'
                      ? 'High Priority'
                      : rec.priority === 'medium'
                      ? 'Medium Priority'
                      : 'Low Priority'}
                  </span>
                </div>

                <p
                  style={{
                    color: '#4b5563',
                    fontSize: '0.875rem',
                    margin: '0 0 0.5rem 0',
                  }}
                >
                  {rec.message}
                </p>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    margin: 0,
                  }}
                >
                  {rec.vehicle}
                </p>
              </div>

              {/* Book Service Button */}
              <button
                onClick={() => router.push('/customer/book-service')}
                style={{
                  background: '#2563eb',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,99,235,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Book Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
