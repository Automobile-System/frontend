"use client";

import { useState, useEffect } from "react";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Edit2,
  Save,
  X,
  Camera,
} from "lucide-react";
import { fetchUserProfile } from "@/services/adminService";
import { showToast } from "@/lib/toast";

// Types
interface AdminProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  nationalId: string;
  profileImageUrl: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  lockedUntil: string | null;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  failedLoginAttempts: number;
}

export default function AdminProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<AdminProfile>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    nationalId: "",
    profileImageUrl: "",
    roles: [],
    createdAt: "",
    updatedAt: "",
    lastLoginAt: "",
    lockedUntil: null,
    enabled: true,
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
    failedLoginAttempts: 0,
  });

  const [editForm, setEditForm] = useState<AdminProfile>(profile);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const userData = await fetchUserProfile();
        
        console.log('=== PROFILE DATA FROM API ===');
        console.log('Raw userData:', userData);
        
        // Map backend data to AdminProfile - use all database fields
        const mappedProfile: AdminProfile = {
          id: userData.id,
          email: userData.email || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phoneNumber: userData.phoneNumber || '',
          nationalId: userData.nationalId || '',
          profileImageUrl: userData.profileImageUrl || '',
          roles: userData.roles || [],
          createdAt: userData.createdAt || '',
          updatedAt: userData.updatedAt || '',
          lastLoginAt: userData.lastLoginAt || '',
          lockedUntil: userData.lockedUntil || null,
          enabled: userData.enabled ?? true,
          accountNonExpired: userData.accountNonExpired ?? true,
          accountNonLocked: userData.accountNonLocked ?? true,
          credentialsNonExpired: userData.credentialsNonExpired ?? true,
          failedLoginAttempts: userData.failedLoginAttempts ?? 0,
        };
        
        console.log('Mapped profile:', mappedProfile);
        
        setProfile(mappedProfile);
        setEditForm(mappedProfile);
      } catch (error) {
        console.error('Error loading profile:', error);
        showToast.error('Error', 'Failed to load profile data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditForm(profile);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm(profile);
  };

  const handleSaveProfile = async () => {
    try {
      console.log('=== SAVING PROFILE ===');
      console.log('Edit form data:', editForm);
      
      const updateData = {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        phoneNumber: editForm.phoneNumber,
        nationalId: editForm.nationalId,
        profileImageUrl: editForm.profileImageUrl,
      };
      
      console.log('Sending update data:', updateData);
      
      // Call the update profile API
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updateData)
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      console.log('Updated data from server:', updatedData);
      
      // Update local state with response
      setProfile(editForm);
      setIsEditing(false);
      showToast.success('Profile Updated', 'Your profile has been updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast.error('Error', 'Failed to update profile. Please try again.');
    }
  };

  const handleInputChange = (field: keyof AdminProfile, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-white p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bebas text-[#020079] mb-2">
              Admin Profile
            </h1>
            <p className="font-roboto text-[#020079]/70">
              View and manage your administrator information
            </p>
          </div>
          {!isEditing && (
            <Button
              onClick={handleEditClick}
              className="bg-[#020079] hover:bg-[#03009B] text-white px-6 h-11 font-roboto font-semibold"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto mb-4"></div>
              <p className="font-roboto text-[#020079]/70 font-medium">Loading profile...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Profile Card */}
            <Card className="p-8 border-[#020079]/20 bg-white">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-[#020079]/10">
                {/* Avatar */}
                <div className="relative group">
                  {profile.profileImageUrl ? (
                    <img 
                      src={profile.profileImageUrl} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full border-4 border-[#020079]/10 object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-[#020079] flex items-center justify-center border-4 border-[#020079]/10">
                      <User className="h-16 w-16 text-white" />
                    </div>
                  )}
                  
                  {isEditing && (
                    <label 
                      htmlFor="profile-image-upload"
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera className="h-8 w-8 text-white" />
                      <input
                        id="profile-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            console.log('Image file selected:', file.name, file.type, file.size);
                            // For now, just use a placeholder URL
                            // In production, you should upload to a storage service
                            const imageUrl = `https://via.placeholder.com/150?text=${encodeURIComponent(file.name.substring(0, 10))}`;
                            console.log('Setting image URL to:', imageUrl);
                            handleInputChange("profileImageUrl", imageUrl);
                            showToast.success('Image Selected', 'Image will be saved when you click Save Changes');
                          }
                        }}
                      />
                    </label>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bebas text-[#020079]">
                      {profile.firstName} {profile.lastName}
                    </h2>
                    
                  </div>
                  <p className="text-lg font-roboto text-[#020079]/70 mb-3">
                    {profile.email}
                  </p>
                
                </div>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                

                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[#020079]/20">
                  <div className="flex-1">
                    <p className="text-xs font-roboto font-semibold text-[#020079]/60 mb-1">
                      Email Address
                    </p>
                    <p className="text-lg font-roboto font-bold text-[#020079] break-all">
                      {profile.email || 'Not set'}
                    </p>
                  </div>
                </div>

                {/* First Name */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[#020079]/20">
                  <div className="flex-1">
                    <p className="text-xs font-roboto font-semibold text-[#020079]/60 mb-1">
                      First Name
                    </p>
                    {!isEditing ? (
                      <p className="text-lg font-roboto font-bold text-[#020079]">
                        {profile.firstName || 'Not set'}
                      </p>
                    ) : (
                      <Input
                        value={editForm.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="mt-1 font-roboto text-[#020079] h-10 border-[#020079]/20"
                      />
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[#020079]/20">
                  <div className="flex-1">
                    <p className="text-xs font-roboto font-semibold text-[#020079]/60 mb-1">
                      Last Name
                    </p>
                    {!isEditing ? (
                      <p className="text-lg font-roboto font-bold text-[#020079]">
                        {profile.lastName || 'Not set'}
                      </p>
                    ) : (
                      <Input
                        value={editForm.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="mt-1 font-roboto text-[#020079] h-10 border-[#020079]/20"
                      />
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[#020079]/20">
                  <div className="flex-1">
                    <p className="text-xs font-roboto font-semibold text-[#020079]/60 mb-1">
                      Phone Number
                    </p>
                    {!isEditing ? (
                      <p className="text-lg font-roboto font-bold text-[#020079]">
                        {profile.phoneNumber || 'Not set'}
                      </p>
                    ) : (
                      <Input
                        type="tel"
                        value={editForm.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="mt-1 font-roboto text-[#020079] h-10 border-[#020079]/20"
                      />
                    )}
                  </div>
                </div>

                
              </div>

              {/* Action Buttons (Edit Mode) */}
              {isEditing && (
                <>
                  <div className="h-px bg-[#020079]/10 my-6" />
                  <div className="flex items-center justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="h-11 px-6 border-[#020079]/30 hover:bg-[#020079]/5 text-[#020079] font-roboto font-semibold"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      className="h-11 px-6 bg-[#020079] hover:bg-[#03009B] text-white font-roboto font-semibold"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </>
              )}
            </Card>

           
          </>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
