'use client';

import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
    const router = useRouter();

    const handleBookService = () => {
        router.push('/customer/book-service');
    };

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 m-0">Dashboard Overview</h1>
                <p className="text-gray-600 mt-1">Your vehicle service summary and recommendations</p>
            </div>
            <button
                onClick={handleBookService}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
            >
                + Book Service / Project
            </button>
        </div>
    );
}
