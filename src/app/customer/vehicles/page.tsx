'use client';

import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import VehicleCard from '@/components/layout/customer/VehicleCard';
import AddVehicleModal from '@/components/layout/customer/AddVehicleModal';
import UpdateVehicleModal from '@/components/modals/UpdateVehicleModal';
import VehicleServiceHistoryModal from '@/components/modals/VehicleServiceHistoryModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getCustomerVehicles } from '@/services/api';
import { CustomerVehicle } from '@/types/authTypes';
import { Plus, Car } from 'lucide-react';

import { useState, useEffect } from 'react';

export default function Vehicles() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
    const [selectedVehicleToEdit, setSelectedVehicleToEdit] = useState<CustomerVehicle | null>(null);
    const [vehicles, setVehicles] = useState<CustomerVehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getCustomerVehicles();
            setVehicles(data);
        } catch (err: unknown) {
            console.error('Failed to fetch vehicles:', err);
            setError(err instanceof Error ? err.message : 'Failed to load vehicles');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVehicleAdded = () => {
        setShowAddForm(false);
        fetchVehicles(); // Refresh the list
    };

    return (
        <CustomerLayout>
            <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4 pb-6 border-b-2 border-[#020079]/10">
                    <div>
                        <h1 className="text-4xl font-bold text-[#020079] mb-2 tracking-wide">
                            My Vehicles
                        </h1>
                        <p className="text-gray-600 text-base">
                            Manage your vehicles and view service history
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-[#03009B] hover:bg-[#020079] active:bg-[#01024D] text-white px-6 py-3 rounded-xl border-none font-semibold text-base cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 active:scale-98 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Vehicle
                    </button>
                </div>

                {/* Vehicles Grid */}
                {isLoading ? (
                    <LoadingSpinner 
                        size="large" 
                        message="Loading your vehicles..." 
                    />
                ) : error ? (
                    <div className="text-center p-12 bg-red-50 rounded-xl border border-red-200">
                        <p className="text-lg text-red-900 mb-4 font-semibold">
                            Failed to load vehicles
                        </p>
                        <p className="text-red-800 mb-6">{error}</p>
                        <button
                            onClick={fetchVehicles}
                            className="px-6 py-3 bg-red-600 text-white border-none rounded-lg cursor-pointer font-medium hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : vehicles.length === 0 ? (
                    <div className="text-center py-16 px-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center">
                            <Car className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                            No Vehicles Yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Get started by adding your first vehicle
                        </p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="px-6 py-3 bg-[#03009B] hover:bg-[#020079] text-white border-none rounded-lg cursor-pointer font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2 mx-auto"
                        >
                            <Plus className="w-5 h-5" />
                            Add Your First Vehicle
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vehicles.map(vehicle => (
                            <VehicleCard 
                                key={vehicle.vehicleId} 
                                vehicle={vehicle}
                                onDelete={fetchVehicles}
                                onViewHistory={(vehicleId) => setSelectedVehicleId(vehicleId)}
                                onEdit={(vehicle) => setSelectedVehicleToEdit(vehicle)}
                            />
                        ))}
                    </div>
                )}

                {/* Add Vehicle Form Modal */}
                {showAddForm && (
                    <AddVehicleModal 
                        onClose={() => setShowAddForm(false)}
                        onVehicleAdded={handleVehicleAdded}
                    />
                )}

                {/* Update Vehicle Modal */}
                {selectedVehicleToEdit && (
                    <UpdateVehicleModal
                        vehicle={selectedVehicleToEdit}
                        onClose={() => setSelectedVehicleToEdit(null)}
                        onVehicleUpdated={() => {
                            setSelectedVehicleToEdit(null);
                            fetchVehicles();
                        }}
                    />
                )}

                {/* Service History Modal */}
                {selectedVehicleId && (
                    <VehicleServiceHistoryModal
                        vehicleId={selectedVehicleId}
                        onClose={() => setSelectedVehicleId(null)}
                    />
                )}
            </div>
        </CustomerLayout>
    );
}