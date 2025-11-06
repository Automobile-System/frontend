'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomerVehicle } from '@/types/authTypes';
import { deleteCustomerVehicle } from '@/services/api';
import EditVehicleModal from './EditVehicleModal';

interface VehicleCardProps {
    vehicle: CustomerVehicle;
    onDelete?: () => void;
    onUpdate?: () => void;
}

export default function VehicleCard({ vehicle, onDelete, onUpdate }: VehicleCardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    const handleVehicleUpdated = () => {
        setIsEditModalOpen(false);
        if (onUpdate) {
            onUpdate();
        }
    };

    return (
        <div
            style={{
                background: 'white',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.25s ease',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#d1d5db';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#e5e7eb';
            }}
        >
            {/* Vehicle Header */}
            <div style={{ marginBottom: '1rem' }}>
                <h3
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#111827',
                        margin: '0 0 0.25rem 0'
                    }}
                >
                    {vehicle.brandName} {vehicle.model}
                </h3>
                <p
                    style={{
                        color: '#6b7280',
                        fontSize: '0.875rem',
                        margin: 0
                    }}
                >
                    Registration: {vehicle.registrationNo}
                </p>
            </div>

            {/* Vehicle Details */}
            <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span
                        style={{
                            fontWeight: '500',
                            color: '#374151',
                            minWidth: '120px'
                        }}
                    >
                        Engine Capacity:
                    </span>
                    <span style={{ color: '#111827' }}>{vehicle.capacity} CC</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                        style={{
                            fontWeight: '500',
                            color: '#374151',
                            minWidth: '120px'
                        }}
                    >
                        Vehicle ID:
                    </span>
                    <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                        {vehicle.vehicleId.substring(0, 8)}...
                    </span>
                </div>
            </div>

            {/* Customer Badge */}
            <div
                style={{
                    background: '#eff6ff',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                    border: '1px solid #dbeafe'
                }}
            >
                <p
                    style={{
                        fontSize: '0.875rem',
                        color: '#1e40af',
                        margin: 0,
                        textAlign: 'center',
                        fontWeight: '500'
                    }}
                >
                    🚗 Your Vehicle
                </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    onClick={viewServiceHistory}
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: '1px solid #d1d5db',
                        color: '#374151',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f9fafb';
                        e.currentTarget.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = '#d1d5db';
                    }}
                >
                    Service History
                </button>

                <button
                    onClick={() => setIsEditModalOpen(true)}
                    style={{
                        background: 'transparent',
                        border: '1px solid #03009B',
                        color: '#03009B',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#03009B';
                        e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#03009B';
                    }}
                >
                    ✏️
                </button>

                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    style={{
                        background: showConfirm ? '#dc2626' : 'transparent',
                        border: '1px solid #dc2626',
                        color: showConfirm ? 'white' : '#dc2626',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.5rem',
                        cursor: isDeleting ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        opacity: isDeleting ? 0.6 : 1,
                        whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                        if (!isDeleting) {
                            e.currentTarget.style.background = '#dc2626';
                            e.currentTarget.style.color = 'white';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isDeleting && !showConfirm) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#dc2626';
                        }
                    }}
                >
                    {isDeleting ? 'Deleting...' : showConfirm ? 'Confirm?' : '🗑️'}
                </button>
            </div>

            {showConfirm && !isDeleting && (
                <div style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    backgroundColor: '#fee2e2',
                    borderRadius: '0.5rem',
                    border: '1px solid #fecaca',
                    fontSize: '0.75rem',
                    color: '#991b1b',
                    textAlign: 'center'
                }}>
                    Click again to confirm deletion
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <EditVehicleModal
                    vehicle={vehicle}
                    onClose={() => setIsEditModalOpen(false)}
                    onVehicleUpdated={handleVehicleUpdated}
                />
            )}
        </div>
    );
}
