import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProjectById } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default async function ProjectDetails({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return notFound()

  return (
    <main className="container mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-[#020079] hover:text-[#020079]/80 transition-colors group">
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#020079] mb-3">
              {project.name}
            </h1>
            {project.status ? (
              <Badge className="text-sm px-4 py-1.5 font-bold">
                {project.status}
              </Badge>
            ) : null}
          </div>
          <div className="text-right">
            <div className="text-sm text-[#020079]/70 uppercase tracking-wide font-semibold mb-1">Total Cost</div>
            <div className="text-3xl font-black text-yellow-600">
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(project.cost)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Image Section */}
        <div className="lg:col-span-3">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-2xl shadow-[#020079]/10 bg-[#020079]/5">
            {project.image ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020079]/60 via-transparent to-transparent z-10" />
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </>
            ) : null}
          </div>

          {/* Description */}
          <Card className="mt-6 bg-gradient-to-br from-white to-blue-50/30 border-2 border-[#020079]/10">
            <CardContent className="pt-6">
              <h2 className="text-xl font-extrabold text-[#020079] mb-3">Project Overview</h2>
              <p className="text-[#020079]/80 leading-relaxed font-medium">{project.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Details Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-[#020079] to-[#020079]/90 text-white border-0 shadow-xl">
            <CardContent className="pt-6 space-y-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/70 mb-2 font-semibold">Project ID</div>
                <div className="font-mono text-lg font-extrabold text-yellow-400">{project.id}</div>
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="text-xs uppercase tracking-wider text-white/70 mb-2 font-semibold">Estimated Hours</div>
                <div className="text-2xl font-extrabold text-white">{project.estimatedHours} hrs</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-yellow-50/30 border-2 border-yellow-400/20">
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-extrabold text-[#020079] mb-4">Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#020079] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[#020079]/70 uppercase tracking-wide">Start Date</div>
                    <div className="text-base font-extrabold text-[#020079]">{project.startDate ?? "—"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#020079]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[#020079]/70 uppercase tracking-wide">End Date</div>
                    <div className="text-base font-extrabold text-[#020079]">{project.endDate ?? "—"}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-2 border-yellow-400/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#020079]/70 uppercase tracking-wide mb-1">Project Status</div>
                  <div className="text-2xl font-extrabold text-[#020079]">{project.status || "Active"}</div>
                </div>
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#020079] to-[#020079]/80 flex items-center justify-center">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
