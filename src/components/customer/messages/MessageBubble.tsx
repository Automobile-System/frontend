import { Message } from '@/pages/customer/messages';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isCustomer = message.sender === 'customer';

  return (
    <div style={{
      display: 'flex',
      justifyContent: isCustomer ? 'flex-end' : 'flex-start'
    }}>
      <div style={{
        maxWidth: '70%',
        padding: '0.75rem 1rem',
        borderRadius: '1rem',
        backgroundColor: isCustomer ? '#3b82f6' : 'white',
        color: isCustomer ? 'white' : '#1f2937',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>
        <p style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '0.875rem',
          lineHeight: '1.4'
        }}>
          {message.text}
        </p>
        <p style={{ 
          margin: 0, 
          fontSize: '0.75rem', 
          color: isCustomer ? '#bfdbfe' : '#6b7280',
          textAlign: 'right'
        }}>
          {message.timestamp}
        </p>
        
        {/* Read Status for Customer Messages */}
        {isCustomer && (
          <div style={{
            position: 'absolute',
            bottom: '0.25rem',
            left: '-1.25rem',
            fontSize: '0.75rem',
            color: message.read ? '#3b82f6' : '#9ca3af'
          }}>
            {message.read ? '✓✓' : '✓'}
          </div>
        )}
      </div>
    </div>
  );
}