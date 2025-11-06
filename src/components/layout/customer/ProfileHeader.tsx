"use client";

import { User } from "lucide-react";

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    joinDate: string;
    avatar: string | null;
}

interface ProfileHeaderProps {
    customer: Customer;
    onEditProfile: () => void;
}

export default function ProfileHeader({ customer, onEditProfile }: ProfileHeaderProps) {
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {/* Avatar */}
                <div style={{
                    width: '5rem',
                    height: '5rem',
                    borderRadius: '50%',
                    backgroundColor: '#03009B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                }}>
                    <User size={40} strokeWidth={2} />
                </div>

                {/* Customer Info */}
                <div style={{ flex: 1 }}>
                    <h1 style={{
                        fontSize: '1.875rem',
                        fontWeight: 'bold',
                        color: '#111827',
                        margin: '0 0 0.5rem 0'
                    }}>
                        {customer.name}
                    </h1>
                    <p style={{
                        color: '#6b7280',
                        margin: '0 0 0.25rem 0',
                        fontSize: '1rem'
                    }}>
                        📧 {customer.email}
                    </p>
                    <p style={{
                        color: '#6b7280',
                        margin: '0 0 0.25rem 0',
                        fontSize: '1rem'
                    }}>
                        📞 {customer.phone}
                    </p>
                    <p style={{
                        color: '#9ca3af',
                        margin: '0',
                        fontSize: '0.875rem'
                    }}>
                        Customer since {customer.joinDate}
                    </p>
                </div>

                {/* Edit Button */}
                <button
                    onClick={onEditProfile}
                    style={{
                        padding: '0.75rem 1.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.75rem',
                        backgroundColor: 'white',
                        color: '#374151',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        alignSelf: 'flex-start'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#d1d5db';
                    }}
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
}