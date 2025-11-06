interface ServiceFrequency {
    month: string;
    jobs: number;
}

interface ServiceChartProps {
    data: ServiceFrequency[];
}

export default function ServiceChart({ data }: ServiceChartProps) {
    const serviceData = data.length > 0 ? data : [
        { month: 'Jan', jobs: 0 }, { month: 'Feb', jobs: 0 }, { month: 'Mar', jobs: 0 },
        { month: 'Apr', jobs: 0 }, { month: 'May', jobs: 0 }, { month: 'Jun', jobs: 0 },
        { month: 'Jul', jobs: 0 }, { month: 'Aug', jobs: 0 }, { month: 'Sep', jobs: 0 },
        { month: 'Oct', jobs: 0 }, { month: 'Nov', jobs: 0 }, { month: 'Dec', jobs: 0 }
    ];

    const maxServices = Math.max(...serviceData.map(d => d.jobs), 1);
    const totalServices = serviceData.reduce((sum, item) => sum + item.jobs, 0);
    const avgServices = (totalServices / serviceData.length).toFixed(1);
    const busiestMonth = serviceData.reduce((prev, current) => 
        (current.jobs > prev.jobs) ? current : prev, serviceData[0]
    );
    const currentMonth = new Date().toLocaleString('en', { month: 'short' });

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Service Frequency</h2>
                <p className="text-sm text-gray-600">Your service history over the past year</p>
            </div>

            <div className="h-64 relative pl-10 pb-8">
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between w-10">
                    {[maxServices, Math.floor(maxServices * 0.75), Math.floor(maxServices * 0.5), Math.floor(maxServices * 0.25), 0].map((value, index) => (
                        <span key={`y-axis-${index}`} className="text-xs text-gray-600 font-medium text-right pr-2">{value}</span>
                    ))}
                </div>

                <div className="flex items-end justify-between h-full gap-2 pb-2">
                    {serviceData.map((dataPoint, idx) => {
                        const barHeight = `${(dataPoint.jobs / maxServices) * 100}%`;
                        const isCurrentMonth = dataPoint.month === currentMonth;
                        const prevJobs = idx > 0 ? serviceData[idx - 1].jobs : dataPoint.jobs;
                        const trend = dataPoint.jobs > prevJobs ? 'up' : dataPoint.jobs < prevJobs ? 'down' : 'same';

                        return (
                            <div key={dataPoint.month} className="flex flex-col items-center flex-1 h-full justify-end">
                                <div
                                    className="w-4/5 rounded-t transition-all duration-300 relative group min-h-2"
                                    style={{
                                        height: barHeight,
                                        backgroundColor: isCurrentMonth ? '#3b82f6' : trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#6b7280',
                                    }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        {dataPoint.jobs} service{dataPoint.jobs !== 1 ? 's' : ''}
                                    </div>
                                </div>
                                <span className={`text-xs mt-3 ${isCurrentMonth ? 'text-blue-600 font-bold' : 'text-gray-600 font-medium'}`}>
                                    {dataPoint.month}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                    <span className="text-xs text-gray-600 font-medium">Current Month</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                    <span className="text-xs text-gray-600 font-medium">Increase</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
                    <span className="text-xs text-gray-600 font-medium">Decrease</span>
                </div>
            </div>

            <div className="flex justify-between mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1 font-medium">Total Services</p>
                    <p className="text-lg text-gray-900 font-bold">{totalServices}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1 font-medium">Avg/Month</p>
                    <p className="text-lg text-gray-900 font-bold">{avgServices}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1 font-medium">Busiest Month</p>
                    <p className="text-lg text-gray-900 font-bold">{busiestMonth.month}</p>
                </div>
            </div>
        </div>
    );
}
