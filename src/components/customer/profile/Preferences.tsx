interface Preferences {
  notifications: boolean;
  emailUpdates: boolean;
  smsAlerts: boolean;
  preferredContact: string;
}

interface PreferencesProps {
  preferences: Preferences;
}

export default function Preferences({ preferences }: PreferencesProps) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#111827',
        margin: '0 0 1.5rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        ⚙️ Preferences
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#374151', fontSize: '0.875rem' }}>Push Notifications</span>
          <div style={{
            width: '3rem',
            height: '1.5rem',
            backgroundColor: preferences.notifications ? '#10b981' : '#d1d5db',
            borderRadius: '0.75rem',
            position: 'relative',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}>
            <div style={{
              position: 'absolute',
              top: '0.125rem',
              left: preferences.notifications ? '1.625rem' : '0.125rem',
              width: '1.25rem',
              height: '1.25rem',
              backgroundColor: 'white',
              borderRadius: '50%',
              transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#374151', fontSize: '0.875rem' }}>Email Updates</span>
          <div style={{
            width: '3rem',
            height: '1.5rem',
            backgroundColor: preferences.emailUpdates ? '#10b981' : '#d1d5db',
            borderRadius: '0.75rem',
            position: 'relative',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}>
            <div style={{
              position: 'absolute',
              top: '0.125rem',
              left: preferences.emailUpdates ? '1.625rem' : '0.125rem',
              width: '1.25rem',
              height: '1.25rem',
              backgroundColor: 'white',
              borderRadius: '50%',
              transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#374151', fontSize: '0.875rem' }}>SMS Alerts</span>
          <div style={{
            width: '3rem',
            height: '1.5rem',
            backgroundColor: preferences.smsAlerts ? '#10b981' : '#d1d5db',
            borderRadius: '0.75rem',
            position: 'relative',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}>
            <div style={{
              position: 'absolute',
              top: '0.125rem',
              left: preferences.smsAlerts ? '1.625rem' : '0.125rem',
              width: '1.25rem',
              height: '1.25rem',
              backgroundColor: 'white',
              borderRadius: '50%',
              transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }} />
          </div>
        </div>

        <div style={{ 
          height: '1px', 
          backgroundColor: '#f3f4f6',
          margin: '0.5rem 0'
        }} />

        <div>
          <span style={{ color: '#6b7280', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
            Preferred Contact Method
          </span>
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {['email', 'phone', 'both'].map((method) => (
              <button
                key={method}
                style={{
                  padding: '0.5rem 1rem',
                  border: `1px solid ${preferences.preferredContact === method ? '#3b82f6' : '#d1d5db'}`,
                  borderRadius: '0.5rem',
                  backgroundColor: preferences.preferredContact === method ? '#eff6ff' : 'white',
                  color: preferences.preferredContact === method ? '#3b82f6' : '#374151',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize'
                }}
                onMouseEnter={(e) => {
                  if (preferences.preferredContact !== method) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.borderColor = '#9ca3af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (preferences.preferredContact !== method) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }
                }}
              >
                {method}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}