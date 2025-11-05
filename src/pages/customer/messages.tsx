import { useState } from 'react';
import CustomerLayout from '@/components/customer/layout/CustomerLayout';
import ConversationList from '@/components/customer/messages/ConversationList';
import ChatWindow from '@/components/customer/messages/ChatWindow';

export type Message = {
  id: string;
  text: string;
  timestamp: string;
  sender: 'customer' | 'employee';
  read: boolean;
};

export type Conversation = {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  vehicle?: string;
  service?: string;
  messages: Message[];
};

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const mockConversations: Conversation[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'Ruwan Silva',
      employeeRole: 'Mechanic',
      lastMessage: 'Oil change is 65% complete...',
      lastMessageTime: '2 min ago',
      unreadCount: 0,
      vehicle: 'Toyota Corolla',
      service: 'Oil Change',
      messages: [
        {
          id: '1',
          text: "Hello! I've started working on your oil change.",
          timestamp: '10:25 AM',
          sender: 'employee',
          read: true
        },
        {
          id: '2',
          text: "Great! How long will it take?",
          timestamp: '10:32 AM',
          sender: 'customer',
          read: true
        },
        {
          id: '3',
          text: "About 30 more minutes. Everything looks good!",
          timestamp: '10:35 AM',
          sender: 'employee',
          read: true
        }
      ]
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'Kamal Perera',
      employeeRole: 'Mechanic',
      lastMessage: 'Waiting for brake pads...',
      lastMessageTime: '1 hour ago',
      unreadCount: 1,
      vehicle: 'Honda Civic',
      service: 'Brake Service',
      messages: [
        {
          id: '1',
          text: "We're waiting for the brake pads to arrive.",
          timestamp: '9:15 AM',
          sender: 'employee',
          read: true
        },
        {
          id: '2',
          text: "When do you expect them?",
          timestamp: '9:20 AM',
          sender: 'customer',
          read: true
        },
        {
          id: '3',
          text: "Should be here by tomorrow morning.",
          timestamp: '9:25 AM',
          sender: 'employee',
          read: false
        }
      ]
    },
    {
      id: '3',
      employeeId: '3',
      employeeName: 'Manager - Service Dept',
      employeeRole: 'Manager',
      lastMessage: 'Your service appointment is confirmed',
      lastMessageTime: '3 hours ago',
      unreadCount: 0,
      messages: [
        {
          id: '1',
          text: "Your service appointment for next week is confirmed.",
          timestamp: '8:00 AM',
          sender: 'employee',
          read: true
        }
      ]
    }
  ];

  const selectedConv = mockConversations.find(conv => conv.id === selectedConversation);

  return (
    <CustomerLayout>
      <div
        style={{
          display: 'flex',
          height: 'calc(100vh - 120px)',
          backgroundColor: '#ffffff',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Conversation List */}
        <div
          style={{
            width: '380px',
            borderRight: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f9fafb',
          }}
        >
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: '#f3f4f6',
            }}
          >
            <h1
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#111827',
                margin: 0,
              }}
            >
              Messages
            </h1>
            <p
              style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                margin: '0.25rem 0 0 0',
              }}
            >
              Chat with employees and managers
            </p>
          </div>
          <ConversationList
            conversations={mockConversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
          />
        </div>

        {/* Chat Window */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedConv ? (
            <ChatWindow conversation={selectedConv} />
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9fafb',
              }}
            >
              <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                <div
                  style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    opacity: 0.3,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: '3rem', height: '3rem', color: '#9ca3af' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3.75h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#4b5563',
                    margin: '0 0 0.5rem 0',
                  }}
                >
                  Select a conversation
                </h3>
                <p
                  style={{
                    color: '#9ca3af',
                    margin: 0,
                    fontSize: '0.9rem',
                  }}
                >
                  Choose a chat from the list to start messaging.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
}
