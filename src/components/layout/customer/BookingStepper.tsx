interface BookingStepperProps {
  currentStep: number;
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
  const steps = [
    { number: 1, title: "Choose Vehicle" },
    { number: 2, title: "Select Service" },
    { number: 3, title: "Choose Employee" },
    { number: 4, title: "Date & Time" },
    { number: 5, title: "Confirm" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {steps.map((step, index) => (
        <div
          key={step.number}
          style={{ display: "flex", alignItems: "center", flex: 1 }}
        >
          {/* Step Circle */}
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              background: currentStep >= step.number ? "#03009B" : "#e5e7eb",
              color: currentStep >= step.number ? "white" : "#6b7280",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: "0.875rem",
              position: "relative",
              zIndex: 2,
              transition: "all 0.3s ease",
              border:
                currentStep >= step.number
                  ? "2px solid #03009B"
                  : "2px solid #d1d5db",
              boxShadow:
                currentStep >= step.number
                  ? "0 2px 8px rgba(3, 0, 155, 0.3)"
                  : "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            {step.number}
          </div>

          {/* Step Title */}
          <div
            style={{
              marginLeft: "0.75rem",
              display: currentStep === step.number ? "block" : "none",
            }}
          >
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#03009B",
              }}
            >
              {step.title}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: "2px",
                background: currentStep > step.number ? "#03009B" : "#e5e7eb",
                margin: "0 0.75rem",
                transition: "background-color 0.3s ease",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
