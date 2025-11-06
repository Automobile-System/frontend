'use client';

import { useState } from 'react';
import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import ProfileHeader from '@/components/layout/customer/ProfileHeader';
import PersonalInfo from '@/components/layout/customer/PersonalInfo';
import VehicleSummary from '@/components/layout/customer/VehicleSummary';
//import Preferences from    '@/components/customer/profile/Preferences';
import EditProfileModal from '@/components/layout/customer/EditProfileModal';

export default function ProfilePage() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const customerData = {
        id: '1',
        name: 'Kethmi Pujani',
        email: 'kethmi.pujani@example.com',
        phone: '+1 (555) 123-4567',
        joinDate: 'January 15, 2023',
        avatar: null,
        address: {
            street: '123 Main Street',
            city: 'Colombo',
            state: 'Western Province',
            zipCode: '00100'
        },
        preferences: {
            notifications: true,
            emailUpdates: true,
            smsAlerts: false,
            preferredContact: 'email'
        }
    };

    const vehicles = [
        {
            id: '1',
            make: 'Toyota',
            model: 'Corolla',
            year: 2020,
            licensePlate: 'KA-1234',
            lastService: '2024-11-15',
            nextService: '2024-12-15'
        },
        {
            id: '2',
            make: 'Honda',
            model: 'Civic',
            year: 2019,
            licensePlate: 'KB-5678',
            lastService: '2024-10-20',
            nextService: '2024-11-20'
        }
    ];

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
                        <VehicleSummary vehicles={vehicles} />
                    </div>
                </div>

                {/* Edit Profile Modal */}
                {isEditModalOpen && (
                    <EditProfileModal
                        customer={customerData}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={(updatedData) => {
                            console.log('Updated profile:', updatedData);
                            setIsEditModalOpen(false);
                        }}
                    />
                )}
            </div>
        </CustomerLayout>
    );
}