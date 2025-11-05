import { useState } from 'react';

interface ServiceChatProps {
  employeeName: string;
  serviceId: string;
}

export default function ServiceChat({ employeeName }: ServiceChatProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi John, I\'ve started working on your oil change. The vehicle is in good condition.',
      sender: 'employee',
      time: '10:32 AM'
    },
    {
      id: 2,
      text: 'Thanks Ruwan! Let me know if you find any issues.',
      sender: 'customer',
      time: '10:33 AM'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: message,
        sender: 'customer',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessage('');
    }
  };

  return (
    <div>
      <h4 style={{ 
        fontSize: '16px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '16px'
      }}>
        Chat with {employeeName}
      </h4>
      
      {/* Messages */}
      <div style={{ 
        height: '300px',
        overflowY: 'auto',
        marginBottom: '16px',
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px'
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            marginBottom: '12px',
            display: 'flex',
            flexDirection: msg.sender === 'customer' ? 'row-reverse' : 'row'
          }}>
            <div style={{
              maxWidth: '70%',
              padding: '8px 12px',
              borderRadius: '12px',
              backgroundColor: msg.sender === 'customer' ? '#3b82f6' : 'white',
              color: msg.sender === 'customer' ? 'white' : '#1f2937',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>{msg.text}</p>
              <p style={{ 
                margin: 0, 
                fontSize: '11px', 
                color: msg.sender === 'customer' ? '#bfdbfe' : '#6b7280',
                textAlign: msg.sender === 'customer' ? 'right' : 'left'
              }}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message Input */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px'
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}