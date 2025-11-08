import { StepProps, Employee } from "../../../types/booking";

export default function EmployeeSelection({
  data,
  onUpdate,
  onNext,
  onBack,
}: StepProps) {
  const employees: Employee[] = [
    {
      id: 1,
      name: "Mike Johnson",
      specialization: "Engine Specialist",
      rating: 4.8,
      experience: "5 years",
    },
    {
      id: 2,
      name: "Sarah Williams",
      specialization: "Brake Systems",
      rating: 4.9,
      experience: "7 years",
    },
    {
      id: 3,
      name: "David Chen",
      specialization: "Electrical Systems",
      rating: 4.7,
      experience: "4 years",
    },
    {
      id: 4,
      name: "Any Available Mechanic",
      specialization: "General Service",
      rating: null,
      experience: "Best Match",
    },
  ];

  const handleSelect = (employeeId: number) => {
    onUpdate({ employeeId });
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 0.5rem 0",
          }}
        >
          Step 3: Choose Employee (Optional)
        </h2>
        <p style={{ color: "#6b7280", margin: 0 }}>
          Select a preferred mechanic or let us assign the best available.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {employees.map((employee) => (
          <div
            key={employee.id}
            onClick={() => handleSelect(employee.id)}
            style={{
              padding: "1.5rem",
              border: `2px solid ${
                data.employeeId === employee.id ? "#03009B" : "#e5e7eb"
              }`,
              borderRadius: "0.75rem",
              background:
                data.employeeId === employee.id
                  ? "var(--color-tint-primary)"
                  : "white",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  {employee.name}
                </h3>
                <p style={{ color: "#6b7280", margin: "0 0 0.5rem 0" }}>
                  {employee.specialization}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    fontSize: "0.875rem",
                    color: "#6b7280",
                  }}
                >
                  <span>Exp: {employee.experience}</span>
                  {employee.rating && <span>Rating: ⭐ {employee.rating}</span>}
                </div>
              </div>
              {employee.id === 4 && (
                <span
                  style={{
                    background: "var(--color-accent)",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                >
                  Recommended
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "white",
            color: "#374151",
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <div style={{ textAlign: "center", flex: 1 }}>
          <p style={{ color: "#6b7280", margin: 5, fontSize: "0.875rem" }}>
            Employee selection is optional. If you don’t select an employee, our
            manager will assign the best available mechanic.
          </p>
        </div>

        <button
          onClick={onNext}
          style={{
            background: "#03009B",
            color: "white",
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            border: "none",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            outline: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#03009B";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(3, 0, 155, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#03009B";
            e.currentTarget.style.boxShadow = "none";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = "#03009B";
            e.currentTarget.style.transform = "scale(0.98)";
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.backgroundColor = "#03009B";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(3, 0, 155, 0.3)";
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(3, 0, 155, 0.2)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
