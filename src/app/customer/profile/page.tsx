'use client';

import { useState, useEffect } from 'react';
import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import ProfileHeader from '@/components/layout/customer/ProfileHeader';
import PersonalInfo from '@/components/layout/customer/PersonalInfo';
import VehicleSummary from '@/components/layout/customer/VehicleSummary';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
//import Preferences from    '@/components/customer/profile/Preferences';
import EditProfileModal from '@/components/layout/customer/EditProfileModal';
import { getCustomerProfile, updateCustomerProfile, getCustomerVehicles } from '@/services/api';
import { CustomerProfile, CustomerVehicle } from '@/types/authTypes';

export default function ProfilePage() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerProfile | null>(null);
    const [vehicles, setVehicles] = useState<CustomerVehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const [profileData, vehiclesData] = await Promise.all([
                getCustomerProfile(),
                getCustomerVehicles()
            ]);
            setCustomerData(profileData);
            setVehicles(vehiclesData);
        } catch (err: any) {
            console.error('Failed to fetch data:', err);
            setError(err.message || 'Failed to load profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveProfile = async (updatedData: any) => {
        try {
            await updateCustomerProfile({
                email: updatedData.email,
                firstName: updatedData.firstName,
                lastName: updatedData.lastName,
                nationalId: updatedData.nationalId,
                phoneNumber: updatedData.phoneNumber,
                profileImageUrl: updatedData.profileImageUrl || null,
            });
            // Refresh the profile data
            await fetchData();
            setIsEditModalOpen(false);
        } catch (err: any) {
            console.error('Failed to update profile:', err);
            alert(err.message || 'Failed to update profile');
        }
    };

    if (isLoading) {
        return (
            <CustomerLayout>
                <LoadingSpinner 
                    size="large" 
                    message="Loading your profile..." 
                />
            </CustomerLayout>
        );
    }

    if (error || !customerData) {
        return (
            <CustomerLayout>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '400px' 
                }}>
                    <div style={{ 
                        textAlign: 'center', 
                        backgroundColor: '#fee2e2', 
                        padding: '2rem',
                        borderRadius: '0.5rem',
                        maxWidth: '400px'
                    }}>
                        <div style={{ 
                            fontSize: '1.25rem', 
                            color: '#991b1b',
                            marginBottom: '1rem',
                            fontWeight: '600'
                        }}>
                            Failed to load profile
                        </div>
                        <div style={{ color: '#7f1d1d', marginBottom: '1rem' }}>
                            {error || 'An error occurred'}
                        </div>
                        <button
                            onClick={fetchCustomerProfile}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </CustomerLayout>
        );
    }

    return (
        <CustomerLayout>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
                {/* Profile Header */}
                <ProfileHeader
                    customer={customerData}
                    onEditProfile={() => setIsEditModalOpen(true)}
                />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                    marginTop: '1.5rem'
                }}>
                    {/* Left Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <PersonalInfo customer={customerData} />
                        {/* <Preferences preferences={customerData.preferences} /> */}
                    </div>

                    {/* Right Column */}
                    <div>
                        <VehicleSummary vehicles={vehicles} onVehicleAdded={fetchData} />
                    </div>
                </div>

                {/* Edit Profile Modal */}
                {isEditModalOpen && (
                    <EditProfileModal
                        customer={customerData}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleSaveProfile}
                    />
                )}
            </div>
        </CustomerLayout>
    );
}