import { CustomerVehicle } from '@/types/authTypes';

interface VehicleDetailsModalProps {
  vehicle: CustomerVehicle;
  onClose: () => void;
}

export default function VehicleDetailsModal({
  vehicle,
  onClose,
}: VehicleDetailsModalProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Map CustomerVehicle fields to display format
  // Since CustomerVehicle doesn't have service dates, we'll use placeholders
  const nextService = 'N/A'; // TODO: Add service date from backend
  const lastService = 'N/A'; // TODO: Add last service date from backend

  const getServiceStatus = (nextService: string) => {
    if (nextService === 'N/A') return { status: "No Schedule", color: "#6b7280" };
    
    const today = new Date();
    const nextServiceDate = new Date(nextService);
    const diffTime = nextServiceDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: "Overdue", color: "#ef4444" };
    if (diffDays <= 7) return { status: "Due Soon", color: "#f59e0b" };
    if (diffDays <= 30)
      return { status: "Upcoming", color: "var(--color-primary)" };
    return { status: "Scheduled", color: "#10b981" };
  };

  const serviceStatus = getServiceStatus(nextService);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-2xl p-8 max-w-[500px] w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {vehicle.brandName} {vehicle.model}
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                {vehicle.registrationNo}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-none border-none text-2xl text-gray-500 cursor-pointer p-1 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Vehicle Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Vehicle Information
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">
                Make & Model
              </span>
              <span className="text-gray-900 font-medium">
                {vehicle.brandName} {vehicle.model}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">
                Capacity
              </span>
              <span className="text-gray-900 font-medium">
                {vehicle.capacity} passengers
              </span>
            </div>
          </div>
        </div>

        {/* Service Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Service Information
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                Last Service
              </span>
              <span className="text-gray-900 font-medium">
                {formatDate(lastService)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                Next Service
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">
                  {formatDate(nextService)}
                </span>
                <span
                  className="px-2 py-1 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: serviceStatus.color + "20",
                    color: serviceStatus.color,
                  }}
                >
                  {serviceStatus.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Handle book service logic
              console.log("Book service for:", vehicle.vehicleId);
              onClose();
            }}
            className="px-6 py-3 rounded-lg text-white text-sm font-medium cursor-pointer transition-all duration-200 outline-none hover:scale-[1.02] active:scale-[0.98]"
            style={{
              border: "1px solid var(--color-primary)",
              backgroundColor: "var(--color-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-primary-hover)";
              e.currentTarget.style.borderColor = "var(--color-primary-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary)";
              e.currentTarget.style.borderColor = "var(--color-primary)";
            }}
          >
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
}
