
import { User } from 'lucide-react'

interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

interface Customer {
    name: string;
    email: string;
    phone: string;
    address: Address;
}

interface PersonalInfoProps {
    customer: Customer;
}

export default function PersonalInfo({ customer }: PersonalInfoProps) {
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
                <User size={20} /> Personal Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Full Name</span>
                    <span style={{ color: '#111827', fontWeight: '500' }}>{customer.name}</span>
                </div>

                <div style={{
                    height: '1px',
                    backgroundColor: '#f3f4f6'
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Email Address</span>
                    <span style={{ color: '#111827', fontWeight: '500' }}>{customer.email}</span>
                </div>

                <div style={{
                    height: '1px',
                    backgroundColor: '#f3f4f6'
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Phone Number</span>
                    <span style={{ color: '#111827', fontWeight: '500' }}>{customer.phone}</span>
                </div>

                <div style={{
                    height: '1px',
                    backgroundColor: '#f3f4f6'
                }} />

                <div>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Address
                    </span>
                    <div style={{ color: '#111827', fontWeight: '500', lineHeight: '1.4' }}>
                        <div>{customer.address.street}</div>
                        <div>{customer.address.city}, {customer.address.state} {customer.address.zipCode}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}