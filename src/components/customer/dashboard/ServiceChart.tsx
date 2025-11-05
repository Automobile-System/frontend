export default function ServiceChart() {
  const serviceData = [
    { month: 'Jan', services: 2, trend: 'up' },
    { month: 'Feb', services: 1, trend: 'down' },
    { month: 'Mar', services: 3, trend: 'up' },
    { month: 'Apr', services: 2, trend: 'down' },
    { month: 'May', services: 4, trend: 'up' },
    { month: 'Jun', services: 1, trend: 'down' },
    { month: 'Jul', services: 3, trend: 'up' },
    { month: 'Aug', services: 2, trend: 'down' },
    { month: 'Sep', services: 1, trend: 'down' },
    { month: 'Oct', services: 2, trend: 'up' },
    { month: 'Nov', services: 3, trend: 'up' },
    { month: 'Dec', services: 2, trend: 'down' }
  ];

  const maxServices = Math.max(...serviceData.map(d => d.services));

  return (
    <div style={{
      background: 'white',
      borderRadius: '1rem',
      border: '1px solid #e5e7eb',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      height: 'fit-content'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#111827',
          margin: '0 0 0.5rem 0'
        }}>
          Service Frequency
        </h2>
        <p style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          margin: 0
        }}>
          Your service history over the past year
        </p>
      </div>

      {/* Chart Container */}
      <div style={{ 
        height: '14rem', 
        position: 'relative',
        paddingLeft: '2.5rem',
        paddingBottom: '2rem'
      }}>
        {/* Y-axis labels */}
        <div style={{ 
          position: 'absolute', 
          left: '0', 
          top: '0', 
          bottom: '2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          width: '2.5rem'
        }}>
          {[maxServices, Math.floor(maxServices * 0.75), Math.floor(maxServices * 0.5), Math.floor(maxServices * 0.25), 0].map((value) => (
            <span key={value} style={{ 
              fontSize: '0.75rem', 
              color: '#6b7280',
              fontWeight: '500',
              textAlign: 'right',
              paddingRight: '0.5rem'
            }}>
              {value}
            </span>
          ))}
        </div>

        {/* Chart Bars */}
        <div style={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          height: '100%',
          gap: '0.5rem',
          paddingBottom: '1.5rem'
        }}>
          {serviceData.map((data, index) => {
            const height = `${(data.services / maxServices) * 85}%`;
            const isCurrentMonth = data.month === 'Nov'; // Assuming current month is Nov
            
            return (
              <div key={data.month} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1
              }}>
                {/* Bar */}
                <div
                  style={{
                    width: '100%',
                    height: height,
                    backgroundColor: isCurrentMonth ? '#3b82f6' : 
                                   data.trend === 'up' ? '#10b981' : '#ef4444',
                    borderRadius: '0.25rem 0.25rem 0 0',
                    marginBottom: '0.75rem',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    boxShadow: isCurrentMonth ? '0 4px 6px -1px rgba(59, 130, 246, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 15px -3px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = isCurrentMonth ? '0 4px 6px -1px rgba(59, 130, 246, 0.3)' : 'none';
                  }}
                >
                  {/* Tooltip on hover */}
                  <div style={{
                    position: 'absolute',
                    top: '-2.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#1f2937',
                    color: 'white',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    pointerEvents: 'none'
                  }}>
                    {data.services} service{data.services !== 1 ? 's' : ''}
                  </div>
                </div>
                
                {/* Month Label */}
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: isCurrentMonth ? '#3b82f6' : '#6b7280', 
                  fontWeight: isCurrentMonth ? '700' : '500',
                  transition: 'color 0.2s'
                }}>
                  {data.month}
                </span>
                
                {/* Service Count */}
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: isCurrentMonth ? '#3b82f6' : '#374151', 
                  fontWeight: '700', 
                  marginTop: '0.25rem' 
                }}>
                  {data.services}
                </span>
              </div>
            );
          })}
        </div>

        {/* Grid Lines */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '2.5rem',
          right: 0,
          bottom: '2rem',
          pointerEvents: 'none'
        }}>
          {[0, 25, 50, 75, 100].map((percent) => (
            <div
              key={percent}
              style={{
                position: 'absolute',
                top: `${percent}%`,
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: percent === 0 ? '#e5e7eb' : '#f3f4f6',
                transform: 'translateY(-50%)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '2rem',
        marginTop: '1rem',
        paddingTop: '1rem', 
        borderTop: '1px solid #f3f4f6'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: '#3b82f6', 
            borderRadius: '2px',
            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
          }}></div>
          <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Current</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: '#10b981', 
            borderRadius: '2px' 
          }}></div>
          <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Increase</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            backgroundColor: '#ef4444', 
            borderRadius: '2px' 
          }}></div>
          <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Decrease</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '0.75rem',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280', 
            margin: '0 0 0.25rem 0',
            fontWeight: '500'
          }}>
            Total Services
          </p>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#1f2937', 
            margin: 0,
            fontWeight: '700'
          }}>
            {serviceData.reduce((sum, item) => sum + item.services, 0)}
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280', 
            margin: '0 0 0.25rem 0',
            fontWeight: '500'
          }}>
            Avg/Month
          </p>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#1f2937', 
            margin: 0,
            fontWeight: '700'
          }}>
            {(serviceData.reduce((sum, item) => sum + item.services, 0) / serviceData.length).toFixed(1)}
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280', 
            margin: '0 0 0.25rem 0',
            fontWeight: '500'
          }}>
            Busiest
          </p>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#1f2937', 
            margin: 0,
            fontWeight: '700'
          }}>
            May
          </p>
        </div>
      </div>
    </div>
  );
}