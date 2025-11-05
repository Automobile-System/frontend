export default function StatsCards() {
  const stats = [
    { title: 'Active Services', value: '3', status: 'Ongoing', color: '#3b82f6' },
    { title: 'Completed Services', value: '12', status: 'Total', color: '#10b981' },
    { title: 'Upcoming Appointments', value: '2', status: 'Scheduled', color: '#f59e0b' },
    { title: 'Active Projects', value: '1', status: 'Custom project', color: '#8b5cf6' }
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      {stats.map((stat, index) => (
        <div 
          key={index}
          style={{
            background: 'white',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', margin: 0 }}>{stat.title}</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: '0.5rem 0 0.25rem 0' }}>{stat.value}</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>{stat.status}</p>
            </div>
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              background: `${stat.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: stat.color, fontSize: '1.25rem' }}>
                {stat.title.includes('Active') ? '🔄' : 
                 stat.title.includes('Completed') ? '✅' :
                 stat.title.includes('Upcoming') ? '📅' : '🚧'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}