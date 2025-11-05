import { useRouter } from 'next/router';
import { useState } from 'react';
import { 
  FiHome, FiSettings, FiMessageSquare, FiUser, FiBook, FiTruck, FiDollarSign, FiUsers, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

export default function CustomerSidebar() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/customer/dashboard' },
    { name: 'My Vehicles', icon: <FiTruck />, path: '/customer/vehicles' },
    { name: 'Book Service / Project', icon: <FiBook />, path: '/customer/book-service' },
    { name: 'My Services', icon: <FiSettings />, path: '/customer/services' },
    { name: 'Preferred Employees', icon: <FiUsers />, path: '/customer/preferred-employees' },
    { name: 'Messages', icon: <FiMessageSquare />, path: '/customer/messages' },
    { name: 'Payment History', icon: <FiDollarSign />, path: '/customer/payments' }
  ];

  const sidebarStyle = {
    backgroundColor: '#111827',
    color: 'white',
    width: isCollapsed ? '80px' : '250px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    padding: '1rem',
    transition: 'width 0.3s ease'
  };

  const activeColor = '#2563eb';
  const hoverBg = '#1e3a8a';

  return (
    <div style={sidebarStyle}>
      {/* === Top Section === */}
      <div>
        {/* Header */}
        <div style={{ 
          paddingBottom: '1rem', 
          borderBottom: '1px solid #1f2937', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          {!isCollapsed && (
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: 'white' }}>AutoService</h1>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Customer Portal</p>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              background: '#1f2937',
              border: '1px solid #374151',
              color: '#9ca3af',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
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
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                gap: isCollapsed ? '0' : '0.75rem',
                background: router.pathname === item.path ? activeColor : 'transparent',
                color: router.pathname === item.path ? 'white' : '#d1d5db',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '0.5rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (router.pathname !== item.path) e.currentTarget.style.background = hoverBg;
              }}
              onMouseLeave={(e) => {
                if (router.pathname !== item.path) e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* === Bottom Section (User Profile) === */}
      <div 
        onClick={() => router.push('/customer/profile')}
        style={{ 
          paddingTop: '1rem', 
          borderTop: '1px solid #1f2937', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          cursor: 'pointer',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = hoverBg}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{ 
          width: '2.2rem', 
          height: '2.2rem', 
          background: '#2563eb', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
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
  );
}
