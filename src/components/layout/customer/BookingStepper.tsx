interface BookingStepperProps {
    currentStep: number;
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
    const steps = [
        { number: 1, title: 'Choose Vehicle' },
        { number: 2, title: 'Select Service' },
        { number: 3, title: 'Choose Employee' },
        { number: 4, title: 'Date & Time' },
        { number: 5, title: 'Confirm' }
    ];

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {steps.map((step, index) => (
                <div key={step.number} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    {/* Step Circle */}
                    <div style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        background: currentStep >= step.number ? '#2563eb' : '#e5e7eb',
                        color: currentStep >= step.number ? 'white' : '#9ca3af',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        {step.number}
                    </div>

                    {/* Step Title */}
                    <div style={{
                        marginLeft: '0.75rem',
                        display: currentStep === step.number ? 'block' : 'none'
                    }}>
                        <span style={{
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#2563eb'
                        }}>
                            {step.title}
                        </span>
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                        <div style={{
                            flex: 1,
                            height: '2px',
                            background: currentStep > step.number ? '#2563eb' : '#e5e7eb',
                            margin: '0 0.75rem'
                        }} />
                    )}
                </div>
            ))}
        </div>
    );
}