import CustomerSidebar from './CustomerSidebar';
import CustomerHeader from './CustomerHeader';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f9fafb', fontFamily: 'sans-serif' }}>
      <CustomerSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <CustomerHeader />
        <main style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
}