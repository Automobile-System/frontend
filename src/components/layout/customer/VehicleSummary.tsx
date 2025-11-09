import { useState } from 'react';
import AddVehicleModal from './AddVehicleModal';
import VehicleDetailsModal from './VehicleDetailsModal';
import { Car, Trash2 } from 'lucide-react';
import { CustomerVehicle } from '@/types/authTypes';
import { deleteCustomerVehicle } from '@/services/api';
import { showToast } from '@/lib/toast';

interface VehicleSummaryProps {
    vehicles: CustomerVehicle[];
    onVehicleAdded?: () => void;
}

export default function VehicleSummary({ vehicles, onVehicleAdded }: VehicleSummaryProps) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<CustomerVehicle | null>(null);
    const [deletingVehicleId, setDeletingVehicleId] = useState<string | null>(null);

    const handleViewDetails = (vehicle: CustomerVehicle) => {
        setSelectedVehicle(vehicle);
    };

    const handleVehicleAdded = () => {
        setIsAddModalOpen(false);
        if (onVehicleAdded) {
            onVehicleAdded();
        }
    };

    const handleDeleteVehicle = async (vehicleId: string) => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) {
            return;
        }

        try {
            setDeletingVehicleId(vehicleId);
            await deleteCustomerVehicle(vehicleId);
            showToast.success('Vehicle deleted successfully');
            if (onVehicleAdded) {
                onVehicleAdded(); // Refresh the list
            }
        } catch (error) {
            console.error('Failed to delete vehicle:', error);
            showToast.error(error instanceof Error ? error.message : 'Failed to delete vehicle');
        } finally {
            setDeletingVehicleId(null);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Car size={20} /> My Vehicles
            </h2>

            <div className="flex flex-col gap-4">
                {vehicles.length === 0 ? (
                    <div className="text-center py-8 px-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <div className="text-4xl mb-2">🚗</div>
                        <p className="text-gray-600 text-sm">
                            No vehicles added yet
                        </p>
                    </div>
                ) : (
                    vehicles.map((vehicle, index) => (
                        <div key={vehicle.vehicleId}>
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            {vehicle.brandName} {vehicle.model}
                                        </h3>
                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                                            {vehicle.registrationNo}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-600 text-xs">Engine Capacity:</span>
                                        <span className="text-gray-900 text-xs font-medium">
                                            {vehicle.capacity} CC
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleViewDetails(vehicle)}
                                        className="px-4 py-2 border border-[#020079] rounded-lg bg-transparent text-[#020079] text-xs font-medium hover:bg-[#020079] hover:text-white transition-all whitespace-nowrap"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => handleDeleteVehicle(vehicle.vehicleId)}
                                        disabled={deletingVehicleId === vehicle.vehicleId}
                                        className="p-2 border border-red-600 rounded-lg bg-transparent text-red-600 hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Delete vehicle"
                                    >
                                        {deletingVehicleId === vehicle.vehicleId ? (
                                            <span className="text-xs">...</span>
                                        ) : (
                                            <Trash2 size={14} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {index < vehicles.length - 1 && (
                                <div className="h-px bg-gray-100 mt-4" />
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Add Vehicle Button */}
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-gray-600 text-sm font-medium hover:border-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
            >
                + Add New Vehicle
            </button>

            {/* Modals */}
            {isAddModalOpen && (
                <AddVehicleModal
                    onClose={() => setIsAddModalOpen(false)}
                    onVehicleAdded={handleVehicleAdded}
                />
            )}

            {selectedVehicle && (
                <VehicleDetailsModal
                    vehicle={selectedVehicle}
                    onClose={() => setSelectedVehicle(null)}
                />
            )}
        </div>
    );
}