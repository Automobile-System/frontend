import { Conversation } from '@/pages/customer/messages';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export default function ConversationItem({ conversation, isSelected, onClick }: ConversationItemProps) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid #f3f4f6',
        backgroundColor: isSelected ? '#eff6ff' : 'white',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = '#f9fafb';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = 'white';
        }
      }}
    >
      {/* Unread Badge */}
      {conversation.unreadCount > 0 && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '0rem',
          backgroundColor: '#ef4444',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          {conversation.unreadCount}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        {/* Avatar */}
        <div style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          flexShrink: 0
        }}>
          {conversation.employeeName.split(' ').map(n => n[0]).join('')}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {conversation.employeeName}
            </h3>
            <span style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              flexShrink: 0,
              marginLeft: '0.5rem'
            }}>
              {conversation.lastMessageTime}
            </span>
          </div>

          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: '0 0 0.25rem 0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {conversation.employeeRole}
          </p>

          {conversation.vehicle && conversation.service && (
            <p style={{
              fontSize: '0.75rem',
              color: '#3b82f6',
              margin: '0 0 0.25rem 0',
              fontWeight: '500'
            }}>
              {conversation.vehicle} - {conversation.service}
            </p>
          )}

          <p style={{
            fontSize: '0.875rem',
            color: conversation.unreadCount > 0 ? '#1f2937' : '#6b7280',
            margin: 0,
            fontWeight: conversation.unreadCount > 0 ? '600' : '400',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {conversation.lastMessage}
          </p>
        </div>
      </div>
    </div>
  );
}