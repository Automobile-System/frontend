import CustomerSidebar from './CustomerSidebar';
import CustomerHeader from './CustomerHeader';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f9fafb', fontFamily: 'sans-serif' }}>
            {/* Top header spanning full width */}
            <CustomerHeader />

            {/* Content area with sidebar under the header */}
            <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
                <CustomerSidebar />
                <main style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}