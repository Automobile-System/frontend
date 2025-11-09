import { StepProps, Vehicle } from "../../../types/booking";
import Link from "next/link";

interface VehicleSelectionProps extends StepProps {
  vehicles: Vehicle[];
}

export default function VehicleSelection({
  data,
  vehicles,
  onUpdate,
  onNext,
}: VehicleSelectionProps) {
  const handleSelect = (vehicleId: string) => {
    onUpdate({ vehicleId });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Step 1: Choose Your Vehicle
        </h2>
        <p className="text-gray-600">
          Select the vehicle you want to service
        </p>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No vehicles found. Please add a vehicle first.</p>
          <Link href="/customer/vehicles" className="text-[#020079] hover:underline">
            Add Vehicle →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.vehicleId}
              onClick={() => handleSelect(vehicle.vehicleId)}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                data.vehicleId === vehicle.vehicleId
                  ? 'border-[#020079] bg-[#020079]/5'
                  : 'border-gray-200 hover:border-[#020079]/50'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {vehicle.brandName} {vehicle.model}
              </h3>
              <p className="text-gray-600 mb-1">
                Capacity: {vehicle.capacity} cc
              </p>
              <p className="text-gray-600 text-sm">
                Plate: {vehicle.registrationNo}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!data.vehicleId}
          className={`px-8 py-3 rounded-lg font-medium transition-all ${
            data.vehicleId
              ? 'bg-[#020079] hover:bg-[#03009B] text-white cursor-pointer shadow-sm hover:shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
