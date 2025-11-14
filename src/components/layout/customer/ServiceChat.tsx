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
            <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-gray-200">
                <div className="w-10 h-10 rounded-full bg-[#03009B] flex items-center justify-center text-white font-semibold text-base">
                    {employeeName.charAt(0)}
                </div>
                <div>
                    <h4 className="text-lg font-bold text-[#020079] mb-1 mt-0">
                        Chat with {employeeName}
                    </h4>
                    <p className="text-xs text-gray-500 m-0">
                        Usually replies within minutes
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto mb-4 p-4 bg-white rounded-lg border border-gray-200">
                {messages.map((msg) => (
                    <div key={msg.id} className={`mb-3 flex ${msg.sender === 'customer' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`max-w-[70%] px-3.5 py-2.5 ${
                            msg.sender === 'customer'
                                ? 'rounded-[12px_12px_4px_12px] bg-[#03009B] text-white shadow-[0_2px_8px_rgba(3,0,155,0.2)]'
                                : 'rounded-[12px_12px_12px_4px] bg-gray-100 text-gray-800 shadow-sm'
                        }`}>
                            <p className="m-0 mb-1 text-sm">{msg.text}</p>
                            <p className={`m-0 text-[11px] ${
                                msg.sender === 'customer' 
                                    ? 'text-blue-200 text-right' 
                                    : 'text-gray-500 text-left'
                            }`}>
                                {msg.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2 p-3 bg-white rounded-xl border-2 border-gray-200 transition-colors duration-200 focus-within:border-[#03009B]">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-1 px-3.5 py-2.5 border-none rounded-lg text-sm bg-gray-50 outline-none transition-colors duration-200 focus:bg-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`px-5 py-2.5 border-none rounded-lg text-white text-sm font-semibold transition-all duration-200 outline-none min-w-[80px] ${
                        message.trim()
                            ? 'bg-[#03009B] cursor-pointer hover:bg-[#020079] hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(3,0,155,0.3)] active:scale-[0.98]'
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Send
                </button>
            </div>
        </div>
    );
}