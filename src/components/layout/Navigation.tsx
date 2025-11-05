"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Menu,
  Wrench,
  Package,
  Calendar,
  Car,
  Settings,
  Award,
  Users,
  Globe,
  Building,
} from "lucide-react"

const services = [
  {
    title: "Periodic Maintenance",
    href: "/services/maintenance",
    description: "Regular vehicle inspections, wash & grooming, waxing services",
    icon: <Settings className="h-6 w-6" />,
  },
  {
    title: "Paints & Repairs",
    href: "/services/paints",
    description: "Insurance claims, nano coating, spare parts replacement",
    icon: <Car className="h-6 w-6" />,
  },
  {
    title: "Terminal Services",
    href: "/services/terminal",
    description: "Battery services, engine tune-up, wheel alignment",
    icon: <Wrench className="h-6 w-6" />,
  },
]

const branches = [
  {
    title: "Colombo Branch",
    href: "/branches/colombo",
    description: "Main branch located in heart of Colombo",
    icon: <Building className="h-6 w-6" />,
  },
  {
    title: "Kandy Branch",
    href: "/branches/kandy",
    description: "Full service center in hill capital",
    icon: <Building className="h-6 w-6" />,
  },
  {
    title: "Galle Branch",
    href: "/branches/galle",
    description: "Coastal branch with modern facilities",
    icon: <Building className="h-6 w-6" />,
  },
  {
    title: "All Branches",
    href: "/branches",
    description: "View all 40+ locations islandwide",
    icon: <Globe className="h-6 w-6" />,
  },
]

const packages = [
  {
    title: "Premium Package",
    href: "/packages/premium",
    description: "Comprehensive care for luxury vehicles",
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: "Standard Package",
    href: "/packages/standard",
    description: "Essential services for everyday vehicles",
    icon: <Package className="h-6 w-6" />,
  },
  {
    title: "Express Package",
    href: "/packages/express",
    description: "Quick service for busy schedules",
    icon: <Users className="h-6 w-6" />,
  },
]

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-white shadow-md", className)}>
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <div className="flex flex-col">
              <div className="text-2xl font-bold font-roboto">
                <span className="text-black">Car</span>
                <span className="text-red-600">veo</span>
              </div>
              <div className="w-12 h-1 bg-red-600"></div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList className="flex items-center space-x-1">
            <NavigationMenuItem>
              {/*
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-black hover:text-red-600 font-medium")}>
                  HOME
                </NavigationMenuLink>
              </Link>
              */}
              <Link
                href="/"
                className={cn(navigationMenuTriggerStyle(), "text-black hover:text-red-600 font-medium")}
              >
                HOME
              </Link>



            </NavigationMenuItem>

            <NavigationMenuItem>
              {/*
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-black hover:text-red-600 font-medium")}>
                  ABOUT US
                </NavigationMenuLink>
              </Link>
              */}
              <Link
                  href="/about"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-black hover:text-red-600 font-medium"
                  )}
                >
                  ABOUT US
                </Link>


            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium text-black hover:text-red-600">
                SERVICES
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-red-600/20 to-red-600/40 p-6 no-underline outline-none focus:shadow-md"
                        href="/services"
                      >
                        <Car className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Our Services
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Comprehensive automotive care with 28+ years of excellence
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {services.map((service) => (
                    <ListItem
                      key={service.title}
                      title={service.title}
                      href={service.href}
                      icon={service.icon}
                    >
                      {service.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium text-black hover:text-red-600">
                BRANCHES
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {branches.map((branch) => (
                    <ListItem
                      key={branch.title}
                      title={branch.title}
                      href={branch.href}
                      icon={branch.icon}
                    >
                      {branch.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium text-black hover:text-red-600">
                PACKAGES
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {packages.map((pkg) => (
                    <ListItem
                      key={pkg.title}
                      title={pkg.title}
                      href={pkg.href}
                      icon={pkg.icon}
                    >
                      {pkg.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              {/*
              <Link href="/news" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-black hover:text-red-600 font-medium")}>
                  NEWS
                </NavigationMenuLink>
              </Link>
              */}
              <Link
                href="/news"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "text-black hover:text-red-600 font-medium"
                )}
              >
                NEWS
              </Link>

            </NavigationMenuItem>

            <NavigationMenuItem>
              {/*
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-black hover:text-red-600 font-medium")}>
                  CONTACT
                </NavigationMenuLink>
              </Link>
              */}
              <Link
                href="/contact"     
                className={cn(
                  navigationMenuTriggerStyle(),
                  "text-black hover:text-red-600 font-medium"
                )}
              >
                CONTACT
              </Link>
              
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Book Now Button - Desktop */}
        <div className="hidden md:flex flex-shrink-0">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 transition-all duration-200 hover:scale-105"
            size="lg"
          >
            <Calendar className="mr-2 h-4 w-4" />
            BOOK NOW
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="flex items-center">
                  <div className="flex flex-col">
                    <div className="text-xl font-bold font-roboto"> 
                      <span className="text-black">Car</span>
                      <span className="text-red-600">veo</span>
                    </div>
                    <div className="w-10 h-0.5 bg-red-600"></div>
                  </div>
                </Link>
              </SheetTitle>
              <SheetDescription>
                Navigate through our automotive services
              </SheetDescription>
            </SheetHeader>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="py-2 text-lg font-medium hover:text-red-600 transition-colors">
                  HOME
                </Link>
                <Link href="/about" className="py-2 text-lg font-medium hover:text-red-600 transition-colors">
                  ABOUT US
                </Link>
                <Link href="/services" className="py-2 text-lg font-medium hover:text-red-600 transition-colors">
                  SERVICES
                </Link>
                <Link href="/branches" className="py-2 text-lg font-medium hover:text-red-600 transition-colors">
                  BRANCHES
                </Link>
                <Link href="/packages" className="py-2 text-lg font-medium hover:text-red-600 transition-colors">
                  PACKAGES
                </Link>
                <Link href="/news" className="py-2 text-lg font-medium hover:text-red-600 transition-colors">
                  NEWS
                </Link>
                <Link href="/contact" className="py-2 text-lg font-medium hover:text-red-600 transition-colors">
                  CONTACT
                </Link>
                <div className="pt-4">
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium"
                    size="lg"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    BOOK NOW
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"