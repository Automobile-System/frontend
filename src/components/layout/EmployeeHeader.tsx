"use client";

import { useState, useEffect } from "react";
import { Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { getMyProfile, getMyNotifications, clearEmployeeCache } from "@/services/employeeService";
import { toast } from "sonner";

// Notification type
interface Notification {
  id: number;
  message: string;
  type: string;
  timestamp: string; // ISO date string
}

// Handler functions
const handleLogout = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    console.warn('Logout request failed, proceeding to clear state');
  } finally {
    clearEmployeeCache();
    window.location.href = '/login';
  }
};

const handleViewProfile = () => {
  console.log("Navigate to profile");
  window.location.href = "/employee/profile";
};

const handleViewSettings = () => {
  console.log("Navigate to settings");
  window.location.href = "/employee/settings";
};

// Format relative time (e.g., "2 hours ago")
const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};

// Get notification title based on type and message
const getNotificationTitle = (notification: Notification): string => {
  const message = notification.message.toLowerCase();
  if (message.includes("task assigned") || message.includes("assigned")) {
    return "New Task Assigned";
  } else if (message.includes("reminder") || message.includes("due")) {
    return "Task Reminder";
  } else if (message.includes("completed") || message.includes("complete")) {
    return "Task Completed";
  } else if (message.includes("schedule") || message.includes("shift")) {
    return "Schedule Update";
  }
  return "Notification";
};

export default function EmployeeHeader() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [employeeName, setEmployeeName] = useState("Employee");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Fetch employee profile and notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile
        const profile = await getMyProfile();
        setEmployeeName(profile.name || `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Employee");
        setEmployeeEmail(profile.email || "");
        setIsLoadingProfile(false);
      } catch (error) {
        console.error("Error fetching employee profile:", error);
        setIsLoadingProfile(false);
        toast.error("Failed to load profile");
      }

      try {
        // Fetch notifications
        const notificationData = await getMyNotifications();
        // Ensure it's an array
        const notificationsList = Array.isArray(notificationData) ? notificationData : [];
        setNotifications(notificationsList);
        setNotificationCount(notificationsList.length);
        setIsLoadingNotifications(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setIsLoadingNotifications(false);
        // Don't show toast for notifications error as it's less critical
      }
    };

    fetchData();
  }, []);

  const handleMarkAllAsRead = () => {
    console.log("Mark all notifications as read");
    // TODO: Implement API call to mark all as read when backend supports it
    setNotificationCount(0);
    toast.success("All notifications marked as read");
  };

  const handleNotificationClick = (notificationId: number) => {
    console.log("Notification clicked:", notificationId);
    // TODO: Implement API call to mark as read when backend supports it
    // For now, just remove it from the unread count if needed
  };

  return (
    <header className="bg-[#020079]/5 border-b border-[#020079]/20">
      <div className="px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <h1 className="text-5xl font-bebas text-[#020079]">Employee Portal</h1>
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center gap-6">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#020079] hover:bg-[#020079]/5 rounded-full h-10 w-10 relative"
                >
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#FFD700] text-[#020079] text-xs font-roboto">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-white border-[#020079]/20 max-h-96 overflow-y-auto">
                <DropdownMenuLabel className="font-roboto font-semibold text-base text-[#020079]">
                  Notifications {notificationCount > 0 && `(${notificationCount})`}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#020079]/10" />
                {isLoadingNotifications ? (
                  <DropdownMenuItem className="justify-center p-4">
                    <div className="font-roboto text-sm text-slate-600">Loading notifications...</div>
                  </DropdownMenuItem>
                ) : notifications.length === 0 ? (
                  <DropdownMenuItem className="justify-center p-4">
                    <div className="font-roboto text-sm text-slate-500">No notifications</div>
                  </DropdownMenuItem>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id}>
                      <DropdownMenuItem
                        className="flex flex-col items-start p-4 cursor-pointer hover:bg-[#020079]/5 focus:bg-[#020079]/5"
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="font-roboto font-semibold text-sm text-[#020079]">
                          {getNotificationTitle(notification)}
                        </div>
                        <div className="font-roboto text-xs text-slate-600 mt-1">
                          {notification.message}
                        </div>
                        <div className="font-roboto text-xs text-slate-400 mt-1">
                          {formatRelativeTime(notification.timestamp)}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-[#020079]/10" />
                    </div>
                  ))
                )}
                {notifications.length > 0 && (
                  <DropdownMenuItem
                    className="justify-center text-[#020079] font-roboto font-semibold cursor-pointer hover:bg-[#020079]/5 focus:bg-[#020079]/5"
                    onClick={handleMarkAllAsRead}
                  >
                    Mark All as Read
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#020079] hover:bg-[#020079]/5 rounded-full h-10 w-10"
                >
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-[#020079]/20">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    {isLoadingProfile ? (
                      <>
                        <span className="font-roboto font-semibold text-[#020079] animate-pulse">
                          Loading...
                        </span>
                        <span className="font-roboto text-xs text-slate-500 font-normal animate-pulse">
                          ...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-roboto font-semibold text-[#020079]">
                          {employeeName}
                        </span>
                        <span className="font-roboto text-xs text-slate-500 font-normal">
                          {employeeEmail || "No email"}
                        </span>
                      </>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#020079]/10" />
                <DropdownMenuItem
                  className="font-roboto cursor-pointer hover:bg-[#020079]/5 focus:bg-[#020079]/5 text-[#020079]"
                  onClick={handleViewProfile}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="font-roboto cursor-pointer hover:bg-[#020079]/5 focus:bg-[#020079]/5 text-[#020079]"
                  onClick={handleViewSettings}
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#020079]/10" />
                <DropdownMenuItem
                  className="font-roboto cursor-pointer text-red-600 focus:text-red-600 hover:bg-red-50 focus:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
