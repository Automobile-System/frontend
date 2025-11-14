interface ServiceTimelineProps {
    serviceId?: string;
}

export default function ServiceTimeline({ }: ServiceTimelineProps) {
    const timelineEvents = [
        {
            time: '10:35 AM',
            description: 'Work in progress - Oil draining completed',
            status: 'in-progress'
        },
        {
            time: '10:30 AM',
            description: 'Service started by Ruwan Silva',
            status: 'completed'
        },
        {
            time: '10:00 AM',
            description: 'Vehicle checked in',
            status: 'completed'
        }
    ];

    return (
        <div>
            <h4 className="text-base font-semibold text-gray-800 mb-4">
                Updates Timeline
            </h4>

            <div className="relative">
                {timelineEvents.map((event, index) => (
                    <div key={index} className="flex mb-5 relative">
                        {/* Timeline line */}
                        {index < timelineEvents.length - 1 && (
                            <div className="absolute left-3 top-6 bottom-[-20px] w-0.5 bg-gray-200" />
                        )}

                        {/* Timeline dot */}
                        <div className={`w-6 h-6 rounded-full mr-4 shrink-0 relative z-[1] ${
                            event.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'
                        }`} />

                        {/* Event content */}
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800 mb-1 mt-0 text-sm">
                                {event.time}
                            </p>
                            <p className="text-gray-500 m-0 text-sm">
                                {event.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}