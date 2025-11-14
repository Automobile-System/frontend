import CustomerSidebar from './CustomerSidebar';
import CustomerHeader from './CustomerHeader';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Top header spanning full width */}
            <CustomerHeader />

            {/* Content area with sidebar under the header */}
            <div className="flex flex-1 min-h-0">
                <CustomerSidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}