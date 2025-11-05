'use client';

import { useRouter } from 'next/router';
import { Bell } from 'lucide-react';

export default function CustomerHeader() {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/customer/profile');
  };

  const handleNotificationsClick = () => {
    router.push('/customer/messages');
  };

  return (
    <header
      style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Left: Welcome Text */}
      <div>
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0,
          }}
        >
          Welcome back, Kethmi!
        </h2>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0,
          }}
        >
          Here&apos;s your service overview
        </p>
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Notification Button */}
        <button
          onClick={handleNotificationsClick}
          style={{
            position: 'relative',
            padding: '0.5rem',
            color: '#4b5563',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            borderRadius: '0.5rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#2563eb';
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#4b5563';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Bell size={22} strokeWidth={1.8} />
          {/* Notification Dot */}
          <span
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              background: '#ef4444',
              borderRadius: '50%',
              border: '1px solid white',
            }}
          ></span>
        </button>

        {/* Profile Section - Clickable */}
        <button
          onClick={handleProfileClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.75rem',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {/* Profile Circle */}
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
              }}
            >
              KP
            </span>
          </div>

          {/* Profile Info */}
          <div style={{ textAlign: 'left' }}>
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                margin: 0,
              }}
            >
              Kethmi Pujani
            </p>
            <p
              style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0,
              }}
            >
              Premium Member
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}