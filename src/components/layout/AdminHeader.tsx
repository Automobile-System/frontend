"use client"

import { useState } from "react"
import { Bell, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { logoutUser, markNotificationAsRead } from "@/services/adminService"

// Handler functions using the API service
const handleLogout = async () => {
  await logoutUser()
}

const handleViewProfile = () => {
  console.log('Navigate to profile')
  window.location.href = '/admin/profile'
}


const handleViewSettings = () => {
  console.log('Navigate to settings')
  window.location.href = '/admin/settings'
}

export default function AdminHeader() {
  const [notificationCount, setNotificationCount] = useState(3)

  const handleMarkAllAsRead = () => {
    console.log('Mark all notifications as read')
    setNotificationCount(0)
  }

  const handleNotificationClick = async (notificationId: string) => {
    await markNotificationAsRead(notificationId)
  }
  return (
    <header className="bg-white border-b border-[#020079]/10">
      <div className="px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <h1 className="text-5xl font-bebas text-[#020079]">Admin Portal</h1>
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
              <DropdownMenuContent align="end" className="w-80 bg-white border-[#020079]/20">
                <DropdownMenuLabel className="font-roboto font-semibold text-base text-[#020079]">
                  Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#020079]/10" />
                <DropdownMenuItem 
                  className="flex flex-col items-start p-4 cursor-pointer hover:bg-[#020079]/5 focus:bg-[#020079]/5"
                  onClick={() => handleNotificationClick('1')}
                >
                  <div className="font-roboto font-semibold text-sm text-[#020079]">System Alert</div>
                  <div className="font-roboto text-xs text-slate-600 mt-1">
                    Employee &quot;Kamal Perera&quot; at maximum workload capacity
                  </div>
                  <div className="font-roboto text-xs text-slate-400 mt-1">2 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#020079]/10" />
                <DropdownMenuItem 
                  className="flex flex-col items-start p-4 cursor-pointer hover:bg-[#020079]/5 focus:bg-[#020079]/5"
                  onClick={() => handleNotificationClick('2')}
                >
                  <div className="font-roboto font-semibold text-sm text-[#020079]">Security Alert</div>
                  <div className="font-roboto text-xs text-slate-600 mt-1">
                    Suspicious payment pattern detected - Review needed
                  </div>
                  <div className="font-roboto text-xs text-slate-400 mt-1">4 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#020079]/10" />
                <DropdownMenuItem 
                  className="flex flex-col items-start p-4 cursor-pointer hover:bg-[#020079]/5 focus:bg-[#020079]/5"
                  onClick={() => handleNotificationClick('3')}
                >
                  <div className="font-roboto font-semibold text-sm text-[#020079]">Pending Approval</div>
                  <div className="font-roboto text-xs text-slate-600 mt-1">
                    2 managers pending large project budget approval
                  </div>
                  <div className="font-roboto text-xs text-slate-400 mt-1">6 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#020079]/10" />
                <DropdownMenuItem 
                  className="justify-center text-[#020079] font-roboto font-semibold cursor-pointer hover:bg-[#020079]/5 focus:bg-[#020079]/5"
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
                  className="text-[#020079] hover:bg-[#020079]/5 rounded-full h-10 w-10"
                >
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-[#020079]/20">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-roboto font-semibold text-[#020079]">Admin User</span>
                    <span className="font-roboto text-xs text-slate-500 font-normal">
                      admin@center.com
                    </span>
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
  )
}
