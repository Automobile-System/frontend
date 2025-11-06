import { StepProps } from '../../../types/booking';

export default function DateTimeSelection({ data, onUpdate, onNext, onBack }: StepProps) {
    const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

    const handleDateSelect = (date: string) => {
        onUpdate({ date });
    };

    const handleTimeSelect = (time: string) => {
        onUpdate({ time });
    };

    // Generate next 7 days
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.toISOString().split('T')[0];
    });

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', margin: '0 0 0.5rem 0' }}>
                    Step 4: Select Date & Time
                </h2>
                <p style={{ color: '#6b7280', margin: 0 }}>
                    Choose when you want to schedule your service
                </p>
            </div>

            {/* Date Selection */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: '0 0 1rem 0' }}>
                    Select Date
                </h3>
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                    {dates.map(date => {
                        const dateObj = new Date(date);
                        const isSelected = data.date === date;

                        return (
                            <div
                                key={date}
                                onClick={() => handleDateSelect(date)}
                                style={{
                                    padding: '1rem',
                                    border: `2px solid ${isSelected ? '#2563eb' : '#e5e7eb'}`,
                                    borderRadius: '0.75rem',
                                    background: isSelected ? '#f0f7ff' : 'white',
                                    cursor: 'pointer',
                                    minWidth: '100px',
                                    textAlign: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                    {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                                </div>
                                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
                                    {dateObj.getDate()}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                    {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Time Selection */}
            <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: '0 0 1rem 0' }}>
                    Select Time
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.75rem' }}>
                    {timeSlots.map(time => (
                        <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            style={{
                                padding: '0.75rem',
                                border: `2px solid ${data.time === time ? '#2563eb' : '#e5e7eb'}`,
                                borderRadius: '0.5rem',
                                background: data.time === time ? '#f0f7ff' : 'white',
                                color: data.time === time ? '#2563eb' : '#374151',
                                cursor: 'pointer',
                                fontWeight: '500',
                                transition: 'all 0.2s'
                            }}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'white',
                        color: '#374151',
                        padding: '0.75rem 2rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}
                >
                    ← Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!data.date || !data.time}
                    style={{
                        background: (data.date && data.time) ? '#2563eb' : '#9ca3af',
                        color: 'white',
                        padding: '0.75rem 2rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        fontWeight: '500',
                        cursor: (data.date && data.time) ? 'pointer' : 'not-allowed'
                    }}
                >
                    Next Step →
                </button>
            </div>
        </div>
    );
}