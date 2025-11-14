"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AuthButtons } from "@/components/layout/AuthButtons"
import { User } from "@/hooks/useAuth"
import { getServicesList } from "@/services/api"
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
import { Menu, Calendar, ArrowRight, Loader2, List } from "lucide-react"
import { NormalizedService, normalizeServiceCollection } from "@/lib/serviceMapper"

// Note: previously defined placeholder arrays (services, branches, packages)
// were removed because the navigation no longer renders from data.
// This prevents unused-variable warnings during builds.

interface NavigationProps {
  className?: string
  initialUser?: User | null
}

export function Navigation({ className, initialUser }: NavigationProps) {
  const pathname = usePathname()
  const [navServices, setNavServices] = React.useState<NormalizedService[]>([])
  const [servicesError, setServicesError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let isMounted = true
    const loadServices = async () => {
      try {
        const response = await getServicesList()
        if (!isMounted) return
        setNavServices(normalizeServiceCollection(response))
        setServicesError(null)
      } catch (error) {
        console.error("Failed to load services for nav", error)
        if (isMounted) {
          setServicesError("Unable to load services")
        }
      }
    }

    loadServices()

    return () => {
      isMounted = false
    }
  }, [])

  // Auto Miraj style: larger font, normal weight, bottom border on active
  const linkBase =
    "relative bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-[#020079] hover:text-brand uppercase tracking-[0.15em] font-teko transition-colors text-[17px] md:text-[18px] lg:text-[19px] px-3 py-2"

  const linkClass = (href: string) =>
    cn(
      navigationMenuTriggerStyle(), 
      linkBase,
  pathname === href && "text-brand after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-brand"
    )
  return (
    <header className={cn("sticky top-0 z-50 w-full bg-white border-b border-gray-200", className)}>
      <div className="container flex h-[92px] max-w-7xl items-center justify-between px-8 md:px-12">
        {/* Logo */}
        <div className="flex-shrink-0 min-w-[200px]">
          <Link href="/" className="flex items-center">
            <div className="flex flex-col gap-1">
              <div className="text-[48px] font-extrabold tracking-wider leading-none">
                <span className="text-[#00008B]">NITRO</span>
                <span className="text-accent glow-accent">LINE</span>
              </div>
              <div className="w-[96px] h-[3px] bg-brand"></div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center ml-32">
          <NavigationMenuList className="flex items-center gap-6 lg:gap-7">
            <NavigationMenuItem>
              <Link href="/" className={linkClass("/")}>
                HOME
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about" className={linkClass("/about")}>
                ABOUT US
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={linkClass("/services")}>
                SERVICES
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[700px] bg-white">
                  <div className="max-h-[360px] overflow-y-auto p-5">
                    {navServices.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {(() => {
                          const grouped = navServices.reduce<Record<string, NormalizedService[]>>((groups, service) => {
                            const key = service.category?.toUpperCase() || "OTHER SERVICES"
                            if (!groups[key]) {
                              groups[key] = []
                            }
                            groups[key].push(service)
                            return groups
                          }, {})
                          return Object.entries(grouped).map(([category, services]) => (
                            <div key={category}>
                              <div className="bg-brand text-white font-extrabold text-base px-4 py-3 mb-4 tracking-wide">
                                {category}
                              </div>
                              <div className="space-y-2">
                                {services.map((service, serviceIndex) => (
                                  <Link
                                    key={`${category}-${service.id}-${serviceIndex}`}
                                    href={`/services/${service.id}`}
                                    className="flex items-center justify-between border-b border-gray-200 pb-2 text-base font-medium text-[#020079] hover:text-brand"
                                  >
                                    <span>{service.name}</span>
                                    <ArrowRight className="h-4 w-4" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))
                        })()}
                      </div>
                    ) : (
                      <div className="flex h-56 flex-col items-center justify-center text-center text-gray-500">
                        {servicesError ? (
                          <>
                            <p className="font-medium">{servicesError}</p>
                            <p className="text-sm">Please check back later.</p>
                          </>
                        ) : (
                          <>
                            <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
                            <p className="text-sm">Loading services...</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <Link href="/services" className="text-base font-bold text-[#020079] hover:text-brand flex items-center gap-2 transition-colors">
                      <List className="h-5 w-5" />
                      View All Services
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/booking" className="flex items-center text-sm font-semibold text-brand hover:text-[#020079] transition-colors">
                      Book a service now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/projects" className={linkClass("/projects")}>
                PROJECTS
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/booking" className={linkClass("/booking")}>
                BOOKING
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/packages" className={linkClass("/packages")}>
                PACKAGES
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" className={linkClass("/contact")}>
                CONTACT
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side - Auth Buttons or User Menu */}
        <div className="hidden md:flex flex-shrink-0 min-w-[200px] justify-end items-center gap-3">
          {initialUser ? (
            <AuthButtons user={initialUser} />
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button 
                  variant="outline"
                  className="border-brand text-brand hover:bg-brand hover:text-white font-teko uppercase tracking-[0.15em] text-[15px] transition-all"
                >
                  LOG IN
                </Button>
              </Link>
              <Link href="/signup">
                <Button 
                  className="btn-accent text-black font-teko uppercase tracking-[0.15em] text-[15px] shadow-accent-glow transition-all"
                >
                  SIGN UP
                </Button>
              </Link>
            </div>
          )}
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
                      <span className="text-black">NITRO</span>
                      <span className="text-accent glow-accent">LINE</span>
                    </div>
                    <div className="w-10 h-0.5 bg-brand"></div>
                  </div>
                </Link>
              </SheetTitle>
              <SheetDescription>
                Navigate through our automotive services
              </SheetDescription>
            </SheetHeader>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="py-2 text-lg font-medium text-[#020079] hover:text-brand transition-colors">
                  HOME
                </Link>
                <Link href="/about" className="py-2 text-lg font-medium text-[#020079] hover:text-brand transition-colors">
                  ABOUT US
                </Link>
                <div className="space-y-2">
                  <Link href="/services" className="py-2 text-lg font-medium text-[#020079] hover:text-brand transition-colors">
                    SERVICES
                  </Link>
                  {navServices.length > 0 && (
                    <div className="pl-3 space-y-2">
                      {navServices.map((service) => (
                        <div key={service.id} className="flex items-center justify-between gap-2">
                          <Link
                            href={`/services/${service.id}`}
                            className="text-sm font-medium text-gray-600 hover:text-brand"
                          >
                            {service.name}
                          </Link>
                          <Link
                            href={`/booking?serviceId=${service.id}&serviceName=${encodeURIComponent(service.name)}`}
                            className="text-xs text-brand font-semibold"
                          >
                            Book
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Link href="/projects" className="py-2 text-lg font-medium text-[#020079] hover:text-brand transition-colors">
                  PROJECTS
                </Link>
                <Link href="/booking" className="py-2 text-lg font-medium text-[#020079] hover:text-brand transition-colors">
                  BOOKING
                </Link>
                <Link href="/packages" className="py-2 text-lg font-medium text-[#020079] hover:text-brand transition-colors">
                  PACKAGES
                </Link>
                <Link href="/contact" className="py-2 text-lg font-medium text-[#020079] hover:text-brand transition-colors">
                  CONTACT
                </Link>
                <div className="pt-4">
                  <Link href="/booking" className="block w-full">
                    <Button 
                      className="w-full btn-accent text-black font-medium shadow-accent-glow"
                      size="lg"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      BOOK NOW
                    </Button>
                  </Link>
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