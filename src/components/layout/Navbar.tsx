"use client"

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
    Car, 
    Bell, 
    Search, 
    Settings, 
    LogOut, 
    User,
    Menu
} from "lucide-react";

export default function Navbar() {
    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="flex h-16 items-center px-4 lg:px-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Car className="h-6 w-6 text-white" />
                    </div>
                    <span className="hidden sm:block text-xl font-bold text-gray-900">
                        AutoManager
                    </span>
                </div>

                {/* Mobile menu button */}
                <Button variant="ghost" size="sm" className="ml-auto lg:hidden">
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:ml-8 lg:space-x-8">
                    <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                        Dashboard
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                        Vehicles
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                        Maintenance
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                        Reports
                    </a>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:space-x-4">
                    {/* Search */}
                    <Button variant="ghost" size="sm">
                        <Search className="h-4 w-4" />
                    </Button>

                    {/* Notifications */}
                    <Button variant="ghost" size="sm" className="relative">
                        <Bell className="h-4 w-4" />
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                    </Button>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/01.png" alt="User" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">John Doe</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        john.doe@company.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}