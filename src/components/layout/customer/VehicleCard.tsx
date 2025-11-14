'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomerVehicle } from '@/types/authTypes';
import { deleteCustomerVehicle } from '@/services/api';

interface VehicleCardProps {
    vehicle: CustomerVehicle;
    onDelete?: () => void;
}

export default function VehicleCard({ vehicle, onDelete }: VehicleCardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const viewServiceHistory = () => {
        router.push(`/customer/vehicles/${vehicle.vehicleId}`);
    };

    const handleDelete = async () => {
        if (!showConfirm) {
            setShowConfirm(true);
            return;
        }

        try {
            setIsDeleting(true);
            await deleteCustomerVehicle(vehicle.vehicleId);
            if (onDelete) {
                onDelete();
            }
        } catch (error) {
            console.error('Failed to delete vehicle:', error);
            alert('Failed to delete vehicle. Please try again.');
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    return (
        <div
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-250 cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-gray-300"
        >
            {/* Vehicle Header */}
            <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {vehicle.brandName} {vehicle.model}
                </h3>
                <p className="text-gray-500 text-sm m-0">
                    Registration: {vehicle.registrationNo}
                </p>
            </div>

            {/* Vehicle Details */}
            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <span className="font-medium text-gray-700 min-w-[120px]">
                        Engine Capacity:
                    </span>
                    <span className="text-gray-900">{vehicle.capacity} CC</span>
                </div>
                <div className="flex items-center">
                    <span className="font-medium text-gray-700 min-w-[120px]">
                        Vehicle ID:
                    </span>
                    <span className="text-gray-500 text-xs">
                        {vehicle.vehicleId.substring(0, 8)}...
                    </span>
                </div>
            </div>

            {/* Customer Badge */}
            <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-100">
                <p className="text-sm text-blue-800 m-0 text-center font-medium">
                    🚗 Your Vehicle
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={viewServiceHistory}
                    className="flex-1 bg-transparent border border-gray-300 text-gray-700 p-2 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 hover:bg-gray-50 hover:border-gray-400"
                >
                    Service History
                </button>

                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={`border border-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        showConfirm 
                            ? 'bg-red-600 text-white' 
                            : 'bg-transparent text-red-600 hover:bg-red-600 hover:text-white'
                    } ${isDeleting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    {isDeleting ? 'Deleting...' : showConfirm ? 'Confirm?' : '🗑️'}
                </button>
            </div>

            {showConfirm && !isDeleting && (
                <div className="mt-2 p-2 bg-red-50 rounded-lg border border-red-200 text-xs text-red-800 text-center">
                    Click again to confirm deletion
                </div>
            )}
        </div>
    );
}
