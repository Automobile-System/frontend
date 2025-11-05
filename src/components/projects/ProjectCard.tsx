"use client"
import * as React from "react"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Project, ProjectStatus } from "@/types/project"
import { cn } from "@/lib/utils"

export type ProjectCardProps = {
  project: Project
  className?: string
  /** simple: image + title; detailed: full meta */
  variant?: "simple" | "detailed" | "flip" | "tilt"
  /** how flipping is triggered on the flip variant */
  flipOn?: "hover" | "click" | "hoverAndClick"
}

function currency(value: number) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  } catch {
    return `$${value.toLocaleString()}`
  }
}

function statusVariant(status?: ProjectStatus): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Completed":
      return "secondary"
    case "On Hold":
      return "outline"
    case "Cancelled":
      return "destructive"
    case "Not Started":
    case "In Progress":
    default:
      return "default"
  }
}

function statusColor(status?: ProjectStatus): string {
  switch (status) {
    case "Completed":
      return "bg-green-500 text-white border-green-500 font-semibold"
    case "In Progress":
      return "bg-yellow-500 text-[#020079] border-yellow-500 font-semibold"
    case "On Hold":
      return "bg-orange-500 text-white border-orange-500 font-semibold"
    case "Cancelled":
      return "bg-red-500 text-white border-red-500 font-semibold"
    case "Not Started":
      return "bg-gray-500 text-white border-gray-500 font-semibold"
    default:
      return "bg-[#020079] text-white border-[#020079] font-semibold"
  }
}


function formatDate(value?: string, locale = "en-US") {
  if (!value) return "—"
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(value))
  } catch {
    return value
  }
}

export default function ProjectCard({ project, className, variant = "simple", flipOn = "hoverAndClick" }: ProjectCardProps) {
  const { id, name, description, image, cost, estimatedHours, status } = project
  const isSimple = variant === "simple"
  const isFlip = variant === "flip"
  const isTilt = variant === "tilt"

  // Hook must not be called conditionally; define once at the top
  const [flipped, setFlipped] = React.useState(false)

  if (isFlip) {
    // Flip card variant: hover flip on desktop, click to flip on mobile
    const allowHover = flipOn === "hover" || flipOn === "hoverAndClick"
    const allowClick = flipOn === "click" || flipOn === "hoverAndClick"

    const onToggle = () => {
      if (allowClick) setFlipped((f) => !f)
    }

    return (
      <button
        type="button"
        className={cn("group w-full text-left [perspective:1000px]", className)}
        onClick={allowClick ? onToggle : undefined}
        onKeyDown={(e) => {
          if (!allowClick) return
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onToggle()
          }
        }}
        {...(allowClick ? { "aria-pressed": flipped ? "true" : "false" } : {})}
      >
        <div
          className={cn(
            "relative h-full w-full min-h-[320px] transition-transform duration-500 [transform-style:preserve-3d]",
            allowHover && "md:group-hover:[transform:rotateY(180deg)]",
            flipped && "[transform:rotateY(180deg)]"
          )}
        >
          {/* Front */}
          <Card className="absolute inset-0 bg-white overflow-hidden [backface-visibility:hidden]">
            <div className="relative aspect-[16/9] w-full bg-[#020079]/5">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="px-6 py-6">
              <div className="text-lg font-bold uppercase tracking-wide text-[#020079]">
                {name}
              </div>
            </div>
          </Card>

          {/* Back */}
          <Card className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#020079]">{name}</CardTitle>
              <CardDescription className="line-clamp-3">{description}</CardDescription>
              {status ? (
                <div className="mt-2">
                  <Badge variant={statusVariant(status)}>{status}</Badge>
                </div>
              ) : null}
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Est. Hours</span>
                <span className="font-medium">{estimatedHours}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Cost</span>
                <span className="font-semibold text-yellow-600">{currency(cost)}</span>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Link href={`/projects/${id}`} onClick={(e) => e.stopPropagation()}>
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </button>
    )
  }

  // Tilt (animated) variant with modern gradient design
  if (isTilt) {
    return (
      <Link href={`/projects/${id}`} className="block group">
        <Card
          className={cn(
            "overflow-hidden bg-gradient-to-br from-blue-50/50 via-blue-50/30 to-white transition-all duration-500 will-change-transform border-2 border-transparent",
            "group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[#020079]/10 group-hover:border-[#020079]/10 group-hover:[transform:rotate3d(1,1,0,1deg)]",
            className
          )}
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            {image ? (
              <>
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                />
              </>
            ) : null}
            {status ? (
              <div className="absolute top-4 right-4 z-20">
                <Badge 
                  className={cn("backdrop-blur-sm shadow-lg", statusColor(status))}
                >
                  {status}
                </Badge>
              </div>
            ) : null}
          </div>

          <CardHeader className="pb-3 pt-5 space-y-3">
            <CardTitle className="text-lg font-normal uppercase text-[#020079] leading-tight tracking-tight">
              {name}
            </CardTitle>
            <CardDescription className="text-[#020079] text-sm font-medium leading-relaxed line-clamp-2">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0 pb-4">
            <dl className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gradient-to-br from-[#020079]/5 to-yellow-400/5 border border-[#020079]/10">
              <div className="space-y-1">
                <dt className="text-xs font-semibold text-[#020079] uppercase tracking-wide">Cost</dt>
                <dd className="text-lg font-semibold text-yellow-600">{currency(cost)}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs font-semibold text-[#020079] uppercase tracking-wide">Hours</dt>
                <dd className="text-lg font-semibold text-[#020079]">{estimatedHours}</dd>
              </div>
            </dl>
            
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#020079]" />
                <span className="text-[#020079] font-medium">ID: <span className="font-semibold text-[#020079]">{id.split('-')[0]}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                <span className="text-[#020079] font-medium">{formatDate(project.startDate)}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-0 pb-5">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-semibold text-[#020079] uppercase tracking-wider">View Project</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#020079] to-[#020079]/80 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#020079]/30 transition-all duration-300">
                <svg className="w-4 h-4 text-white transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    )
  }

  // Non-flip, non-tilt variants
  return (
    <Link href={`/projects/${id}`} className="block">
      <Card
        className={cn(
          "overflow-hidden hover:shadow-lg transition-shadow bg-white",
          isSimple ? "gap-0" : undefined,
          className
        )}
      >
        <div className="relative aspect-[16/9] w-full bg-[#020079]/5">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              priority={false}
            />
          ) : null}
        </div>

        {isSimple ? (
          <div className="px-6 py-6">
            <div className="text-lg font-normal uppercase tracking-wide text-[#020079]">
              {name}
            </div>
          </div>
        ) : (
          <>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-normal text-[#020079]">{name}</CardTitle>
              <CardDescription className="line-clamp-2 text-[#020079]/75 font-normal">{description}</CardDescription>
              {status ? (
                <div className="mt-2">
                  <Badge className={statusColor(status)}>{status}</Badge>
                </div>
              ) : null}
            </CardHeader>
            <CardContent className="pt-2">
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-[#020079]/70">Project ID</dt>
                  <dd className="font-semibold text-[#020079]">{id}</dd>
                </div>
                <div>
                  <dt className="text-[#020079]/70">Cost</dt>
                  <dd className="font-semibold text-yellow-600">{currency(cost)}</dd>
                </div>
                <div>
                  <dt className="text-[#020079]/70">Estimated Hours</dt>
                  <dd className="font-semibold text-[#020079]">{estimatedHours}</dd>
                </div>
                <div>
                  <dt className="text-[#020079]/70">Start Date</dt>
                  <dd className="font-semibold text-[#020079]">{formatDate(project.startDate)}</dd>
                </div>
                <div>
                  <dt className="text-[#020079]/70">End Date</dt>
                  <dd className="font-semibold text-[#020079]">{formatDate(project.endDate)}</dd>
                </div>
              </dl>
            </CardContent>
            <CardFooter>
              <span className="text-xs font-semibold text-[#020079]">View details →</span>
            </CardFooter>
          </>
        )}
      </Card>
    </Link>
  )
}
