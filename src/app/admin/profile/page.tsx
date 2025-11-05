"use client";

import { useState, useEffect } from "react";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
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
  Shield,
  Edit2,
  Save,
  X,
  Camera,
  Award,
  Users,
  TrendingUp,
  Building,
} from "lucide-react";

// Types
interface AdminProfile {
  id: string;
  name: string;
  jobTitle: string;
  adminLevel: string;
  adminId: string;
  email: string;
  phone: string;
  joinedDate: string;
  avatar: string;
  department: string;
}

interface AdminStats {
  totalEmployees: number;
  activeProjects: number;
  systemUptime: number;
}

export default function AdminProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<AdminProfile>({
    id: "1",
    name: "Nirmal Fernando",
    jobTitle: "System Administrator",
    adminLevel: "Super Admin",
    adminId: "ADM-00001",
    email: "nirmal.fernando@autoservice.com",
    phone: "+94 77 987 6543",
    joinedDate: "March 1, 2020",
    avatar: "",
    department: "IT Operations",
  });

  const [stats] = useState<AdminStats>({
    totalEmployees: 156,
    activeProjects: 24,
    systemUptime: 99.8,
  });

  const [editForm, setEditForm] = useState<AdminProfile>(profile);

  useEffect(() => {
    // Simulate data loading
    // TODO: Replace with actual API call
    // fetch('/api/admin/profile')
    //   .then(res => res.json())
    //   .then(data => {
    //     setProfile(data);
    //     setEditForm(data);
    //     setIsLoading(false);
    //   });

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditForm(profile);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm(profile);
  };

  const handleSaveProfile = () => {
    // TODO: Replace with actual API call
    // fetch('/api/admin/profile', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(editForm)
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setProfile(data);
    //     setIsEditing(false);
    //   });

    setProfile(editForm);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof AdminProfile, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Admin Profile
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              View and manage your administrator information
            </p>
          </div>
          {!isEditing && (
            <Button
              onClick={handleEditClick}
              className="bg-[#1f3a93] hover:bg-[#2c4ba5] text-white px-6 h-11 rounded-xl font-semibold shadow-lg"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f3a93] mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading profile...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Profile Card */}
            <Card className="p-8 rounded-2xl shadow-lg border-gray-200 bg-white">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-gray-200">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1f3a93] to-[#2c4ba5] flex items-center justify-center shadow-lg border-4 border-white">
                    <User className="h-16 w-16 text-white" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-3 bg-[#1f3a93] rounded-full shadow-lg hover:bg-[#2c4ba5] transition-colors">
                      <Camera className="h-5 w-5 text-white" />
                    </button>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  {!isEditing ? (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold text-gray-900">
                          {profile.name}
                        </h2>
                        <Badge className="bg-[#1f3a93] text-white border-0">
                          <Shield className="h-3 w-3 mr-1" />
                          {profile.adminLevel}
                        </Badge>
                      </div>
                      <p className="text-lg text-gray-600 mb-3">
                        {profile.jobTitle}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
                          <Building className="h-5 w-5 text-[#1f3a93]" />
                          <span className="text-sm font-semibold text-gray-900">
                            {profile.department}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="mt-1 text-gray-900 h-11"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="jobTitle"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Job Title
                        </Label>
                        <Input
                          id="jobTitle"
                          value={editForm.jobTitle}
                          onChange={(e) =>
                            handleInputChange("jobTitle", e.target.value)
                          }
                          className="mt-1 text-gray-900 h-11"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="department"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Department
                        </Label>
                        <Input
                          id="department"
                          value={editForm.department}
                          onChange={(e) =>
                            handleInputChange("department", e.target.value)
                          }
                          className="mt-1 text-gray-900 h-11"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                {/* Admin ID */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-3 bg-[#1f3a93] rounded-xl">
                    <BadgeCheck className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Administrator ID
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {profile.adminId}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-3 bg-[#1f3a93] rounded-xl">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Email Address
                    </p>
                    {!isEditing ? (
                      <p className="text-lg font-bold text-gray-900 break-all">
                        {profile.email}
                      </p>
                    ) : (
                      <Input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="mt-1 text-gray-900 h-10"
                      />
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-3 bg-[#1f3a93] rounded-xl">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Phone Number
                    </p>
                    {!isEditing ? (
                      <p className="text-lg font-bold text-gray-900">
                        {profile.phone}
                      </p>
                    ) : (
                      <Input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="mt-1 text-gray-900 h-10"
                      />
                    )}
                  </div>
                </div>

                {/* Joined Date */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-3 bg-[#1f3a93] rounded-xl">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      Joined Date
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {profile.joinedDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Edit Mode) */}
              {isEditing && (
                <>
                  <div className="h-px bg-gray-200 my-6" />
                  <div className="flex items-center justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="h-11 px-6 border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      className="h-11 px-6 bg-[#1f3a93] hover:bg-[#2c4ba5] text-white font-semibold shadow-lg rounded-xl"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </>
              )}
            </Card>

            {/* Admin Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Employees */}
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="h-8 w-8 text-[#1f3a93]" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-[#1f3a93]" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Employees
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.totalEmployees}
                </p>
                <p className="text-xs text-gray-500 mt-2">Under management</p>
              </Card>

              {/* Active Projects */}
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gray-100 rounded-xl">
                    <Award className="h-8 w-8 text-gray-700" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-gray-700" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Active Projects
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.activeProjects}
                </p>
                <p className="text-xs text-gray-500 mt-2">Currently running</p>
              </Card>

              {/* System Uptime */}
              <Card className="p-6 rounded-2xl shadow-lg border-gray-200 bg-white hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  System Uptime
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.systemUptime}%
                </p>
                <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
              </Card>
            </div>
          </>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
