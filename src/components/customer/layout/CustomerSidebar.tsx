import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CustomerSidebar() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/customer/dashboard' },
    { name: 'My Vehicles', icon: '🚗', path: '/customer/vehicles' },
    { name: 'Book Service / Project', icon: '🔧', path: '/customer/book-service' },
    { name: 'My Services', icon: '📋', path: '/customer/services' },
    { name: 'Preferred Employees', icon: '👨‍🔧', path: '/customer/preferred-employees' },
    { name: 'Messages', icon: '💬', path: '/customer/messages' },
    { name: 'Payment History', icon: '💰', path: '/customer/payments' }
  ];

  const sidebarStyle = {
    backgroundColor: '#1f2937',
    color: 'white',
    width: isCollapsed ? '80px' : '256px',
    minHeight: '100vh',
    padding: '1rem',
    transition: 'width 0.3s'
  };

  return (
    <div style={sidebarStyle}>
      {/* Header */}
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!isCollapsed && (
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>AutoService</h1>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Customer Portal</p>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ padding: '0.5rem', borderRadius: '0.25rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      {/* Navigation */}
      <nav style={{ marginTop: '1rem' }}>
        {menuItems.map((item) => (
          <button 
            key={item.name}
            onClick={() => router.push(item.path)}
            style={{
              width: '100%',
              textAlign: 'left' as const,
              padding: '0.75rem',
              borderRadius: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              background: router.pathname === item.path ? '#2563eb' : 'transparent',
              color: router.pathname === item.path ? 'white' : '#d1d5db',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '0.5rem'
            }}
          >
            <span style={{ marginRight: isCollapsed ? '0' : '0.75rem', fontSize: '1.125rem' }}>
              {item.icon}
            </span>
            {!isCollapsed && item.name}
          </button>
        ))}
      </nav>
      
      {/* User Profile */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #374151' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '2rem', height: '2rem', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'white' }}>KP</span>
          </div>
          {!isCollapsed && (
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', margin: 0 }}>Kethmi Pujani</p>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>Customer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}