'use client';

import { useRouter } from 'next/navigation';
import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import StatsCards from '@/components/layout/customer/StatsCards';
import Recommendations from '@/components/layout/customer/Recommendations';
import ServiceChart from '@/components/layout/customer/ServiceChart';

export default function CustomerDashboard() {
    const router = useRouter();

    const handleBookService = () => {
        router.push('/customer/book-service');
    };

    return (
        <CustomerLayout>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Dashboard Overview</h1>
                        <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>Your vehicle service summary and recommendations</p>
                    </div>
                    <button
                        onClick={handleBookService}
                        style={{
                            background: '#2563eb',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            transform: 'scale(1)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#1d4ed8';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#2563eb';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        + Book Service / Project
                    </button>
                </div>

                {/* Stats Cards */}
                <StatsCards />

                {/* Charts and Recommendations */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem'
                }}>
                    <ServiceChart />
                    <Recommendations />
                </div>
            </div>
        </CustomerLayout>
    );
}
