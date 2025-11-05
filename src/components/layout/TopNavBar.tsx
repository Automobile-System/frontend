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
  console.log('Logout manager');
  window.location.href = '/logout';
};

const handleViewProfile = () => {
  console.log('Navigate to profile');
  window.location.href = '/manager/profile';
};

const handleViewSettings = () => {
  console.log('Navigate to settings');
  window.location.href = '/manager/settings';
};

export default function TopNavBar() {
  const [notificationCount, setNotificationCount] = useState(5);

  const handleMarkAllAsRead = () => {
    console.log('Mark all notifications as read');
    setNotificationCount(0);
  };

  const handleNotificationClick = (notificationId: string) => {
    console.log('Notification clicked:', notificationId);
    // Mark individual notification as read
  };

  return (
    <header className="bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-lg">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center gap-3">
            <div className="text-5xl font-bold flex items-center gap-2">
              <h1>Manager Portal</h1>
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
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
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
                  onClick={() => handleNotificationClick('1')}
                >
                  <div className="font-semibold text-sm text-gray-900">Task Update</div>
                  <div className="text-xs text-gray-600 mt-1">
                    New task assigned to your team - Review required
                  </div>
                  <div className="text-xs text-gray-400 mt-1">1 hour ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleNotificationClick('2')}
                >
                  <div className="font-semibold text-sm text-gray-900">Project Deadline</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Project deadline approaching in 2 days
                  </div>
                  <div className="text-xs text-gray-400 mt-1">3 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleNotificationClick('3')}
                >
                  <div className="font-semibold text-sm text-gray-900">Employee Request</div>
                  <div className="text-xs text-gray-600 mt-1">
                    3 employees submitted leave requests for approval
                  </div>
                  <div className="text-xs text-gray-400 mt-1">5 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="justify-center text-teal-600 font-semibold cursor-pointer hover:bg-gray-100"
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
                    <span className="font-semibold text-gray-900">Manager User</span>
                    <span className="text-xs text-gray-500 font-normal">
                      manager@center.com
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
