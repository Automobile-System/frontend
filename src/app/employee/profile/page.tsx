"use client";

import { useState, useEffect } from "react";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Calendar,
  BadgeCheck,
  Star,
  Edit2,
  Save,
  X,
  Camera,
  Award,
  Clock,
  TrendingUp,
} from "lucide-react";
import { getMyProfile, updateMyProfile, getDashboardSummary, getChartsData } from "@/services/employeeService";
import { toast } from "sonner";

// Types
interface EmployeeProfile {
  id: string;
  name: string;
  jobTitle: string;
  rating: number;
  totalReviews: number;
  employeeId: string;
  email: string;
  phone: string;
  joinedDate: string;
  avatar: string;
}

interface PerformanceStats {
  tasksCompleted: number;
  hoursWorked: number;
  customerSatisfaction: number;
}

// Mock data as fallback
const MOCK_PROFILE: EmployeeProfile = {
  id: "1",
  name: "Ruwan Silva",
  jobTitle: "Engine Specialist",
  rating: 4.8,
  totalReviews: 142,
  employeeId: "EMP-12345",
  email: "ruwan.silva@autoservice.com",
  phone: "+94 77 123 4567",
  joinedDate: "January 15, 2023",
  avatar: "",
};

const MOCK_STATS: PerformanceStats = {
  tasksCompleted: 328,
  hoursWorked: 1450,
  customerSatisfaction: 96,
};

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<EmployeeProfile>(MOCK_PROFILE);
  const [stats, setStats] = useState<PerformanceStats>(MOCK_STATS);
  const [editForm, setEditForm] = useState<EmployeeProfile>(MOCK_PROFILE);
  const [isBackendAvailable, setIsBackendAvailable] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      let backendAvailable = false;
      let currentProfile: EmployeeProfile = MOCK_PROFILE;
      let currentRating = MOCK_PROFILE.rating;
      
      // Try to load profile from backend
      try {
        const profileData = await getMyProfile();
        
        // Transform API response to match EmployeeProfile interface
        const transformedProfile: EmployeeProfile = {
          id: profileData.id || MOCK_PROFILE.id,
          name: profileData.name || `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim() || MOCK_PROFILE.name,
          jobTitle: profileData.specialty || MOCK_PROFILE.jobTitle,
          rating: profileData.currentRating || MOCK_PROFILE.rating,
          totalReviews: profileData.totalReviews || MOCK_PROFILE.totalReviews,
          employeeId: profileData.employeeId || profileData.id || MOCK_PROFILE.employeeId,
          email: profileData.email || MOCK_PROFILE.email,
          phone: profileData.phone || profileData.phoneNumber || MOCK_PROFILE.phone,
          joinedDate: profileData.joinDate
            ? new Date(profileData.joinDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : MOCK_PROFILE.joinedDate,
          avatar: profileData.profileImageUrl || MOCK_PROFILE.avatar,
        };
        
        currentProfile = transformedProfile;
        currentRating = transformedProfile.rating;
        setProfile(transformedProfile);
        setEditForm(transformedProfile);
        backendAvailable = true;
      } catch (error) {
        console.error("Error loading profile from backend, using mock data:", error);
        // Keep mock data - already set as initial state
      }

      // Try to load performance stats from backend
      try {
        const [dashboardSummary, chartsData] = await Promise.all([
          getDashboardSummary().catch(() => null),
          getChartsData().catch(() => null),
        ]);

        // Calculate tasks completed (sum from monthly tasks data if available, or use this month's count)
        let tasksCompleted = MOCK_STATS.tasksCompleted;
        if (chartsData?.monthlyTasksData && chartsData.monthlyTasksData.length > 0) {
          // Sum all completed tasks from monthly data
          tasksCompleted = chartsData.monthlyTasksData.reduce(
            (sum: number, month: { completedTasks?: number }) => sum + (month.completedTasks || 0),
            0
          );
        } else if (dashboardSummary?.tasksCompletedThisMonth) {
          // If we only have this month's data, use it as approximation
          tasksCompleted = dashboardSummary.tasksCompletedThisMonth;
        }

        // Calculate total hours worked
        let hoursWorked = MOCK_STATS.hoursWorked;
        if (chartsData?.dailyHoursData && chartsData.dailyHoursData.length > 0) {
          // Sum all daily hours
          hoursWorked = Math.round(
            chartsData.dailyHoursData.reduce((sum: number, day: { hours?: number }) => sum + (day.hours || 0), 0)
          );
        } else if (dashboardSummary?.totalHoursLoggedThisMonth) {
          // Use this month as approximation (multiply by 12 for yearly estimate)
          hoursWorked = Math.round(dashboardSummary.totalHoursLoggedThisMonth * 12);
        }

        // Calculate customer satisfaction from rating (use current profile rating or fallback)
        let customerSatisfaction = MOCK_STATS.customerSatisfaction;
        if (currentRating > 0) {
          // Convert rating (0-5) to satisfaction percentage
          customerSatisfaction = Math.round((currentRating / 5) * 100);
        }

        setStats({
          tasksCompleted,
          hoursWorked,
          customerSatisfaction,
        });
        backendAvailable = true;
      } catch (error) {
        console.error("Error loading stats from backend, using mock data:", error);
        // Keep mock stats - already set as initial state
      } finally {
        setIsBackendAvailable(backendAvailable);
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
    if (!isBackendAvailable) {
      toast.error("Backend unavailable. Cannot save profile.");
      return;
    }

    try {
      // Map frontend form to backend request format
      const updateData: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phoneNumber?: string;
        profileImageUrl?: string;
      } = {};
      
      // Split name into first/last if needed
      const nameParts = editForm.name.split(" ");
      if (nameParts.length >= 2) {
        updateData.firstName = nameParts[0];
        updateData.lastName = nameParts.slice(1).join(" ");
      } else if (nameParts.length === 1) {
        updateData.firstName = nameParts[0];
        updateData.lastName = "";
      }
      
      if (editForm.email) updateData.email = editForm.email;
      if (editForm.phone) updateData.phoneNumber = editForm.phone;
      if (editForm.avatar) updateData.profileImageUrl = editForm.avatar;
      
      const updatedProfile = await updateMyProfile(updateData);
      
      // Transform updated response back to EmployeeProfile
      const transformedProfile: EmployeeProfile = {
        id: updatedProfile.id || profile.id,
        name: updatedProfile.name || `${updatedProfile.firstName || ""} ${updatedProfile.lastName || ""}`.trim() || profile.name,
        jobTitle: updatedProfile.specialty || profile.jobTitle,
        rating: updatedProfile.currentRating || profile.rating,
        totalReviews: updatedProfile.totalReviews || profile.totalReviews,
        employeeId: updatedProfile.employeeId || profile.employeeId,
        email: updatedProfile.email || profile.email,
        phone: updatedProfile.phone || updatedProfile.phoneNumber || profile.phone,
        joinedDate: updatedProfile.joinDate
          ? new Date(updatedProfile.joinDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : profile.joinedDate,
        avatar: updatedProfile.profileImageUrl || profile.avatar,
      };
      
      setProfile(transformedProfile);
      setEditForm(transformedProfile);
      setIsEditing(false);
      setIsBackendAvailable(true);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleInputChange = (field: keyof EmployeeProfile, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <EmployeeLayout>
      <div className="min-h-screen bg-white p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#020079] mb-2">
              My Profile
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <User className="h-4 w-4" />
              View and manage your personal information
              {!isBackendAvailable && (
                <Badge variant="outline" className="ml-2 text-xs">
                  Offline Mode
                </Badge>
              )}
            </p>
          </div>
          {!isEditing && (
            <Button
              onClick={handleEditClick}
              disabled={!isBackendAvailable}
              className="bg-[#020079] hover:bg-[#03009B] text-white px-6 h-11 rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title={!isBackendAvailable ? "Backend unavailable. Cannot edit profile." : ""}
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
              <p className="text-gray-600 font-medium">Loading profile...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Profile Card */}
            <Card className="p-8 rounded-2xl shadow-lg border-[#020079]/20 hover:border-[#020079] bg-white hover:shadow-2xl transition-all duration-300">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-[#020079]/20">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-[#0200791F] flex items-center justify-center shadow-lg border-4 border-white">
                    <User className="h-16 w-16 text-[#020079]" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-3 bg-[#E6C200] rounded-full shadow-lg hover:bg-[#E6C200]/80 transition-colors">
                      <Camera className="h-5 w-5 text-[#020079]" />
                    </button>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  {!isEditing ? (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold text-[#020079]">
                          {profile.name}
                        </h2>
                        <Badge className="bg-[#E6C200] text-[#020079] border-0 hover:bg-[#E6C200]/80">
                          <BadgeCheck className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <p className="text-lg text-gray-600 mb-3">
                        {profile.jobTitle}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#FFD70029] rounded-xl border border-[#E6C200]">
                          <Star className="h-5 w-5 text-[#E6C200] fill-[#E6C200]" />
                          <span className="text-lg font-bold text-[#020079]">
                            {profile.rating}
                          </span>
                          <span className="text-sm text-gray-600">/ 5.0</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {profile.totalReviews} reviews
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-sm font-semibold text-[#020079]"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="mt-1 text-gray-900 h-11 border-[#020079]/20 focus:border-[#020079]"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="jobTitle"
                          className="text-sm font-semibold text-[#020079]"
                        >
                          Job Title
                        </Label>
                        <Input
                          id="jobTitle"
                          value={editForm.jobTitle}
                          onChange={(e) =>
                            handleInputChange("jobTitle", e.target.value)
                          }
                          className="mt-1 text-gray-900 h-11 border-[#020079]/20 focus:border-[#020079]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                {/* Employee ID */}
                <div className="flex items-center gap-4 p-4 bg-[#0200791F] rounded-xl border border-[#020079]/20 hover:border-[#020079] hover:shadow-lg transition-all duration-300">
                  <div className="p-3 bg-[#020079] rounded-xl">
                    <BadgeCheck className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Employee ID
                    </p>
                    <p className="text-lg font-bold text-[#020079]">
                      {profile.employeeId}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-4 bg-[#0200791F] rounded-xl border border-[#020079]/20 hover:border-[#020079] hover:shadow-lg transition-all duration-300">
                  <div className="p-3 bg-[#020079] rounded-xl">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Email Address
                    </p>
                    {!isEditing ? (
                      <p className="text-lg font-bold text-[#020079] break-all">
                        {profile.email}
                      </p>
                    ) : (
                      <Input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="mt-1 text-gray-900 h-10 border-[#020079]/20 focus:border-[#020079]"
                      />
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-4 bg-[#0200791F] rounded-xl border border-[#020079]/20 hover:border-[#020079] hover:shadow-lg transition-all duration-300">
                  <div className="p-3 bg-[#020079] rounded-xl">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Phone Number
                    </p>
                    {!isEditing ? (
                      <p className="text-lg font-bold text-[#020079]">
                        {profile.phone}
                      </p>
                    ) : (
                      <Input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="mt-1 text-gray-900 h-10 border-[#020079]/20 focus:border-[#020079]"
                      />
                    )}
                  </div>
                </div>

                {/* Joined Date */}
                <div className="flex items-center gap-4 p-4 bg-[#0200791F] rounded-xl border border-[#020079]/20 hover:border-[#020079] hover:shadow-lg transition-all duration-300">
                  <div className="p-3 bg-[#020079] rounded-xl">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Joined Date
                    </p>
                    <p className="text-lg font-bold text-[#020079]">
                      {profile.joinedDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Edit Mode) */}
              {isEditing && (
                <>
                  <div className="h-px bg-[#020079]/20 my-6" />
                  <div className="flex items-center justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="h-11 px-6 border-[#020079]/30 hover:bg-[#0200791F] text-[#020079] font-semibold rounded-xl transition-all duration-300"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      className="h-11 px-6 bg-[#020079] hover:bg-[#03009B] text-white font-semibold shadow-lg rounded-xl transition-all duration-300"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </>
              )}
            </Card>

            {/* Performance Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tasks Completed */}
              <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#FFD70029] rounded-xl">
                    <Award className="h-8 w-8 text-[#020079]" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-[#020079]" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Tasks Completed
                </p>
                <p className="text-4xl font-bold text-[#020079]">
                  {stats.tasksCompleted}
                </p>
                <p className="text-xs text-gray-500 mt-2">Since joining</p>
              </Card>

              {/* Hours Worked */}
              <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#FFD70029] rounded-xl">
                    <Clock className="h-8 w-8 text-[#020079]" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-[#020079]" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Hours Worked
                </p>
                <p className="text-4xl font-bold text-[#020079]">
                  {stats.hoursWorked}
                </p>
                <p className="text-xs text-gray-500 mt-2">Total logged hours</p>
              </Card>

              {/* Customer Satisfaction */}
              <Card className="p-6 rounded-2xl shadow-lg border-[#FFD700]/30 hover:border-[#E6C200] bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#FFD70029] rounded-xl">
                    <Star className="h-8 w-8 text-[#020079]" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-[#020079]" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Satisfaction Rate
                </p>
                <p className="text-4xl font-bold text-[#020079]">
                  {stats.customerSatisfaction}%
                </p>
                <p className="text-xs text-gray-500 mt-2">Customer approval</p>
              </Card>
            </div>
          </>
        )}
      </div>
    </EmployeeLayout>
  );
}
