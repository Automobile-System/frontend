"use client";

import { useState } from "react";
import { Bell, User, LogOut, Settings } from "lucide-react";
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

// Handler functions
const handleLogout = async () => {
  console.log("Logout employee");
  window.location.href = "/logout";
};

const handleViewProfile = () => {
  console.log("Navigate to profile");
  window.location.href = "/employee/profile";
};

const handleViewSettings = () => {
  console.log("Navigate to settings");
  window.location.href = "/employee/settings";
};

export default function EmployeeHeader() {
  const [notificationCount, setNotificationCount] = useState(4);

  const handleMarkAllAsRead = () => {
    console.log("Mark all notifications as read");
    setNotificationCount(0);
  };

  const handleNotificationClick = (notificationId: string) => {
    console.log("Notification clicked:", notificationId);
    // Mark individual notification as read
  };

  return (
    <header className="bg-gradient-to-r from-[#020079] to-[#01024D] text-white shadow-lg">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center gap-3">
            <div className="text-5xl font-bold flex items-center gap-2">
              <h1>Employee Portal</h1>
            </div>
          </div>

          {/* Right Side - Icons with Dropdowns */}
          <div className="flex items-center gap-4">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full h-12 w-12 relative"
                >
                  <Bell className="w-6 h-6" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#E6C200] text-[#020079] text-xs font-bold">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-white">
                <DropdownMenuLabel className="font-semibold text-base text-gray-900">
                  Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleNotificationClick("1")}
                >
                  <div className="font-semibold text-sm text-gray-900">
                    New Task Assigned
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    You have been assigned a new service task - Vehicle
                    inspection
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    30 minutes ago
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleNotificationClick("2")}
                >
                  <div className="font-semibold text-sm text-gray-900">
                    Task Reminder
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Task &quot;Oil Change - Vehicle #A123&quot; due today at
                    3:00 PM
                  </div>
                  <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleNotificationClick("3")}
                >
                  <div className="font-semibold text-sm text-gray-900">
                    Task Completed
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Your task &quot;Brake Service&quot; has been marked as
                    completed
                  </div>
                  <div className="text-xs text-gray-400 mt-1">4 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleNotificationClick("4")}
                >
                  <div className="font-semibold text-sm text-gray-900">
                    Schedule Update
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Your shift schedule for next week has been updated
                  </div>
                  <div className="text-xs text-gray-400 mt-1">6 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="justify-center text-red-700 font-semibold cursor-pointer hover:bg-gray-100"
                  onClick={handleMarkAllAsRead}
                >
                  Mark All as Read
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full h-12 w-12"
                >
                  <User className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">
                      Employee User
                    </span>
                    <span className="text-xs text-gray-500 font-normal">
                      employee@center.com
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={handleViewProfile}
                >
                  <User className="w-4 h-4 mr-2 text-gray-700" />
                  <span className="text-gray-900">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={handleViewSettings}
                >
                  <Settings className="w-4 h-4 mr-2 text-gray-700" />
                  <span className="text-gray-900">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600 hover:bg-red-50"
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
