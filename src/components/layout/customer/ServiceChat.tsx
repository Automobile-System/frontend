'use client'

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
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '2px solid #e5e7eb'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#03009B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '16px'
                }}>
                    {employeeName.charAt(0)}
                </div>
                <div>
                    <h4 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#020079',
                        margin: '0 0 4px 0'
                    }}>
                        Chat with {employeeName}
                    </h4>
                    <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        margin: 0
                    }}>
                        Usually replies within minutes
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div style={{
                height: '350px',
                overflowY: 'auto',
                marginBottom: '16px',
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
            }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{
                        marginBottom: '12px',
                        display: 'flex',
                        flexDirection: msg.sender === 'customer' ? 'row-reverse' : 'row'
                    }}>
                        <div style={{
                            maxWidth: '70%',
                            padding: '10px 14px',
                            borderRadius: msg.sender === 'customer' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                            backgroundColor: msg.sender === 'customer' ? '#03009B' : '#f3f4f6',
                            color: msg.sender === 'customer' ? 'white' : '#1f2937',
                            boxShadow: msg.sender === 'customer' 
                                ? '0 2px 8px rgba(3, 0, 155, 0.2)' 
                                : '0 1px 3px rgba(0, 0, 0, 0.1)'
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
            <div style={{ 
                display: 'flex', 
                gap: '8px',
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                transition: 'border-color 0.2s ease'
            }} id="chat-input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    style={{
                        flex: 1,
                        padding: '10px 14px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        backgroundColor: '#f9fafb',
                        outline: 'none',
                        transition: 'background-color 0.2s ease'
                    }}
                    onFocus={(e) => {
                        e.target.style.backgroundColor = 'white';
                        const container = document.getElementById('chat-input-container');
                        if (container) container.style.borderColor = '#03009B';
                    }}
                    onBlur={(e) => {
                        e.target.style.backgroundColor = '#f9fafb';
                        const container = document.getElementById('chat-input-container');
                        if (container) container.style.borderColor = '#e5e7eb';
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '8px',
                        backgroundColor: message.trim() ? '#03009B' : '#9ca3af',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: message.trim() ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s ease',
                        outline: 'none',
                        minWidth: '80px'
                    }}
                    onMouseEnter={(e) => {
                        if (message.trim()) {
                            e.currentTarget.style.backgroundColor = '#020079';
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(3, 0, 155, 0.3)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (message.trim()) {
                            e.currentTarget.style.backgroundColor = '#03009B';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }
                    }}
                    onMouseDown={(e) => {
                        if (message.trim()) {
                            e.currentTarget.style.transform = 'scale(0.98)';
                        }
                    }}
                    onMouseUp={(e) => {
                        if (message.trim()) {
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}