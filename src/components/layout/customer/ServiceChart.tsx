'use client'

import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

interface ServiceFrequency {
    month: string;
    jobs: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

export default function ServiceChart() {
    const [data, setData] = useState<ServiceFrequency[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServiceFrequency = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/api/customer/dashboard/service-frequency?period=1year`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                }
            } catch (error) {
                console.error('Error fetching service frequency:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServiceFrequency();
    }, []);

    // Transform data to match component format and add trend
    const serviceData = data.map((item, index, arr) => ({
        month: item.month,
        services: item.jobs,
        trend: index > 0 && item.jobs > arr[index - 1].jobs ? 'up' : 'down'
    }));

    // Fallback to default data if no data provided
    const displayData = serviceData.length > 0 ? serviceData : [
        { month: 'Jan', services: 2, trend: 'down' },
        { month: 'Feb', services: 1, trend: 'down' },
        { month: 'Mar', services: 3, trend: 'up' },
        { month: 'Apr', services: 2, trend: 'down' },
        { month: 'May', services: 4, trend: 'up' },
        { month: 'Jun', services: 1, trend: 'down' },
        { month: 'Jul', services: 3, trend: 'up' },
        { month: 'Aug', services: 2, trend: 'down' },
        { month: 'Sep', services: 1, trend: 'down' },
        { month: 'Oct', services: 2, trend: 'up' },
        { month: 'Nov', services: 3, trend: 'up' },
        { month: 'Dec', services: 2, trend: 'down' }
    ];

    const maxServices = Math.max(...displayData.map(d => d.services));

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md h-fit flex items-center justify-center min-h-[400px]">
                <Loader className="w-12 h-12 text-[#03009B] animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md h-fit">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Service Frequency
                </h2>
                <p className="text-sm text-gray-500">
                    Your service history over the past year
                </p>
            </div>

            <div className="h-64 relative pl-10 pb-8">
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between w-10">
                    {[maxServices, Math.floor(maxServices * 0.75), Math.floor(maxServices * 0.5), Math.floor(maxServices * 0.25), 0].map((value, index) => (
                        <span key={`y-axis-${index}`} className="text-xs text-gray-600 font-medium text-right pr-2">{value}</span>
                    ))}
                </div>

                {/* Chart Bars */}
                <div className="flex items-end justify-between h-[calc(100%-1.5rem)] gap-2 pb-2">

                    {displayData.map((data) => {
                        const barHeight = `${(data.services / maxServices) * 100}%`;
                        const isCurrentMonth = data.month === 'Nov';

                        return (
                            <div key={data.month} className="flex flex-col items-center flex-1 h-full justify-end">
                                {/* Bar */}
                                <div
                                    style={{
                                        width: '80%',
                                        height: barHeight,
                                        minHeight: '0.5rem'
                                    }}
                                    className={`rounded-t mb-3 transition-all duration-300 relative group ${
                                        isCurrentMonth 
                                            ? 'bg-[#03009B] shadow-[0_4px_6px_-1px_rgba(3,0,155,0.3)]' 
                                            : data.trend === 'up' 
                                                ? 'bg-gray-600 shadow-[0_2px_4px_rgba(107,114,128,0.3)]' 
                                                : 'bg-gray-400 shadow-[0_2px_4px_rgba(156,163,175,0.3)]'
                                    }`}
                                >
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        {data.services} service{data.services !== 1 ? 's' : ''}
                                    </div>
                                </div>

                                {/* Month Label */}
                                <span className={`text-xs ${isCurrentMonth ? 'text-[#03009B] font-bold' : 'text-gray-500 font-medium'}`}>
                                    {data.month}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#03009B] rounded-sm"></div>
                    <span className="text-xs text-gray-500 font-medium">Current Month</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-600 rounded-sm"></div>
                    <span className="text-xs text-gray-500 font-medium">Increase</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                    <span className="text-xs text-gray-500 font-medium">Decrease</span>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="flex justify-between mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1 font-medium">
                        Total Services
                    </p>
                    <p className="text-lg text-gray-900 font-bold">
                        {displayData.reduce((sum, item) => sum + item.services, 0)}
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1 font-medium">
                        Avg/Month
                    </p>
                    <p className="text-lg text-gray-900 font-bold">
                        {(displayData.reduce((sum, item) => sum + item.services, 0) / displayData.length).toFixed(1)}
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1 font-medium">
                        Busiest Month
                    </p>
                    <p className="text-lg text-gray-900 font-bold">
                        May
                    </p>
                </div>
            </div>
        </div>
    );
}
