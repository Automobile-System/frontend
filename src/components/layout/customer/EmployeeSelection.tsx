import { StepProps, Employee } from "../../../types/booking";
import { Star } from "lucide-react";

interface EmployeeSelectionProps extends StepProps {
  employees: Employee[];
}

export default function EmployeeSelection({
  data,
  employees,
  onUpdate,
  onNext,
  onBack,
}: EmployeeSelectionProps) {
  const handleSelect = (employeeId: string | null) => {
    onUpdate({ employeeId });
  };

  const handleSkip = () => {
    onUpdate({ employeeId: null });
    onNext();
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Step 3: Select Technician (Optional)
        </h2>
        <p className="text-gray-600">
          Choose your preferred technician or skip to let the manager assign one
        </p>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No employees available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {employees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => handleSelect(employee.id)}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                data.employeeId === employee.id
                  ? 'border-[#020079] bg-[#020079]/5'
                  : 'border-gray-200 hover:border-[#020079]/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#020079]/10 flex items-center justify-center text-[#020079] font-bold text-lg">
                  {employee.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {employee.fullName}
                  </h4>
                  {employee.empRating && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-[#FFD700] stroke-[#FFD700]" />
                      <span className="text-gray-600">{employee.empRating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {employee.specialty || 'General Service'}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-all"
        >
          ← Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="px-8 py-3 rounded-lg font-medium border-2 border-[#FFD700] text-[#020079] hover:bg-[#FFD700]/10 transition-all"
          >
            Skip (Manager Assigns)
          </button>
          <button
            onClick={onNext}
            disabled={!data.employeeId}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              data.employeeId
                ? 'bg-[#020079] hover:bg-[#03009B] text-white cursor-pointer shadow-sm hover:shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next Step →
          </button>
        </div>
      </div>
    </div>
  );
}
