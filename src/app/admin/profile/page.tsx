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
  Edit2,
  Save,
  X,
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
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-[#020079] flex items-center justify-center border-4 border-[#020079]/10">
                    <User className="h-16 w-16 text-white" />
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  {!isEditing ? (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bebas text-[#020079]">
                          {profile.name}
                        </h2>
                        <Badge className="bg-[#FFD700] text-[#020079] border-0 font-roboto font-semibold">
                          {profile.adminLevel}
                        </Badge>
                      </div>
                      <p className="text-lg font-roboto text-[#020079]/70 mb-3">
                        {profile.jobTitle}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#020079]/20">
                          <span className="text-sm font-roboto font-semibold text-[#020079]">
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
                          className="text-sm font-roboto font-semibold text-[#020079]"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="mt-1 font-roboto text-[#020079] h-11 border-[#020079]/20 focus:border-[#020079]"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="jobTitle"
                          className="text-sm font-roboto font-semibold text-[#020079]"
                        >
                          Job Title
                        </Label>
                        <Input
                          id="jobTitle"
                          value={editForm.jobTitle}
                          onChange={(e) =>
                            handleInputChange("jobTitle", e.target.value)
                          }
                          className="mt-1 font-roboto text-[#020079] h-11 border-[#020079]/20 focus:border-[#020079]"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="department"
                          className="text-sm font-roboto font-semibold text-[#020079]"
                        >
                          Department
                        </Label>
                        <Input
                          id="department"
                          value={editForm.department}
                          onChange={(e) =>
                            handleInputChange("department", e.target.value)
                          }
                          className="mt-1 font-roboto text-[#020079] h-11 border-[#020079]/20 focus:border-[#020079]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                {/* Admin ID */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[#020079]/20">
                  <div className="flex-1">
                    <p className="text-xs font-roboto font-semibold text-[#020079]/60 mb-1">
                      Administrator ID
                    </p>
                    <p className="text-lg font-roboto font-bold text-[#020079]">
                      {profile.adminId}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[#020079]/20">
                  <div className="flex-1">
                    <p className="text-xs font-roboto font-semibold text-[#020079]/60 mb-1">
                      Email Address
                    </p>
                    {!isEditing ? (
                      <p className="text-lg font-roboto font-bold text-[#020079] break-all">
                        {profile.email}
                      </p>
                    ) : (
                      <Input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="mt-1 font-roboto text-[#020079] h-10 border-[#020079]/20 focus:border-[#020079]"
                      />
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[#020079]/20">
                  <div className="flex-1">
                    <p className="text-xs font-roboto font-semibold text-[#020079]/60 mb-1">
                      Phone Number
                    </p>
                    {!isEditing ? (
                      <p className="text-lg font-roboto font-bold text-[#020079]">
                        {profile.phone}
                      </p>
                    ) : (
                      <Input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="mt-1 font-roboto text-[#020079] h-10 border-[#020079]/20 focus:border-[#020079]"
                      />
                    )}
                  </div>
                </div>

                {/* Joined Date */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[#020079]/20">
                  <div className="flex-1">
                    <p className="text-xs font-roboto font-semibold text-[#020079]/60 mb-1">
                      Joined Date
                    </p>
                    <p className="text-lg font-roboto font-bold text-[#020079]">
                      {profile.joinedDate}
                    </p>
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

            {/* Admin Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Employees */}
              <Card className="p-6 border-[#020079]/20 bg-white hover:border-[#020079]/40 transition-colors">
                <p className="text-sm font-roboto font-medium text-[#020079]/60 mb-1">
                  Total Employees
                </p>
                <p className="text-4xl font-bebas text-[#020079]">
                  {stats.totalEmployees}
                </p>
                <p className="text-xs font-roboto text-[#020079]/50 mt-2">Under management</p>
              </Card>

              {/* Active Projects */}
              <Card className="p-6 border-[#020079]/20 bg-white hover:border-[#020079]/40 transition-colors">
                <p className="text-sm font-roboto font-medium text-[#020079]/60 mb-1">
                  Active Projects
                </p>
                <p className="text-4xl font-bebas text-[#020079]">
                  {stats.activeProjects}
                </p>
                <p className="text-xs font-roboto text-[#020079]/50 mt-2">Currently running</p>
              </Card>

              {/* System Uptime */}
              <Card className="p-6 border-[#020079]/20 bg-white hover:border-[#FFD700]/40 transition-colors">
                <p className="text-sm font-roboto font-medium text-[#020079]/60 mb-1">
                  System Uptime
                </p>
                <p className="text-4xl font-bebas text-[#020079]">
                  {stats.systemUptime}%
                </p>
                <p className="text-xs font-roboto text-[#020079]/50 mt-2">Last 30 days</p>
              </Card>
            </div>
          </>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
