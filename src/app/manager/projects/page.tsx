"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import ProjectFormModal from "@/components/modals/ProjectFormModal";
import SubTaskModal from "@/components/modals/SubTaskModal";
import { postProject, getProjects } from "@/services/api";
import { showToast } from "@/lib/toast";

interface Project {
  id: string;
  title: string;
  customer: string;
  estimatedCost: string;
  startDate: string;
  team?: string[];
  timeline?: string;
  status: "Discussion" | "In Progress" | "Waiting for Parts" | "Completed";
  requirements?: boolean;
  onHold?: string;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: "PRJ-001",
    title: "Custom Modification",
    customer: "John Smith",
    estimatedCost: "Rs. 150,000",
    startDate: "Nov 1, 2025",
    status: "Discussion",
    requirements: true
  },
  {
    id: "PRJ-002",
    title: "Full Restoration",
    customer: "Sarah Johnson",
    estimatedCost: "Rs. 500,000",
    startDate: "Nov 3, 2025",
    status: "Discussion",
    requirements: true
  },
  {
    id: "PRJ-003",
    title: "Engine Overhaul",
    customer: "Mike Davis",
    estimatedCost: "Rs. 250,000",
    startDate: "Nov 2",
    team: ["Ruwan", "Amal"],
    timeline: "Nov 2 - Nov 10",
    status: "In Progress"
  },
  {
    id: "PRJ-004",
    title: "Custom Paint Job",
    customer: "Lisa Anderson",
    estimatedCost: "Rs. 120,000",
    startDate: "Oct 30",
    team: ["Nimal"],
    timeline: "Oct 30 - Nov 7",
    status: "In Progress"
  },
  {
    id: "PRJ-005",
    title: "Suspension Upgrade",
    customer: "David Wilson",
    estimatedCost: "Rs. 180,000",
    startDate: "Nov 2, 2025",
    status: "Waiting for Parts",
    onHold: "2 days"
  },
  {
    id: "PRJ-006",
    title: "AC System Replacement",
    customer: "Emma Brown",
    estimatedCost: "Rs. 95,000",
    startDate: "Nov 1, 2025",
    status: "Completed"
  },
  {
    id: "PRJ-007",
    title: "Wheel Alignment",
    customer: "Tom Harris",
    estimatedCost: "Rs. 25,000",
    startDate: "Nov 1, 2025",
    status: "Completed"
  }
];

export default function ProjectsManagement() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showSubTaskModal, setShowSubTaskModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [creating, setCreating] = useState(false);

  // Map server project shape to UI card
  const toUiProject = (p: any): Project => ({
    id: String(p?.id ?? p?.code ?? `PRJ-${Math.random().toString(36).slice(2,7).toUpperCase()}`),
    title: String(p?.title ?? p?.projectTitle ?? "Untitled Project"),
    customer: String(p?.customer ?? p?.customerName ?? "Unknown"),
    estimatedCost: (() => {
      const cost = p?.estimatedCost ?? p?.totalCost ?? p?.finalCost;
      return typeof cost !== 'undefined' ? `Rs. ${cost}` : "Rs. -";
    })(),
    startDate: new Date(p?.startDate ?? Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    team: Array.isArray(p?.team) ? p.team : undefined,
    timeline: p?.timeline ?? undefined,
    status: ((): Project["status"] => {
      const s = (p?.status ?? p?.state ?? "Discussion") as string;
      const allowed: Project["status"][] = ["Discussion","In Progress","Waiting for Parts","Completed"];
      return (allowed as string[]).includes(s) ? (s as Project["status"]) : "Discussion";
    })(),
    requirements: Boolean(p?.requirements ?? false),
    onHold: p?.onHold ?? undefined,
  });

  const handleCreateProject = async (formData: {
    customerName: string;
    contactNumber: string;
    vehicleRegistration: string;
    vehicleModel: string;
    projectTitle: string;
    projectDescription: string;
    startDate: string;
    estimatedCompletionDate: string;
    totalCost: string;
    subTasks: Array<{ name: string; hours: number }>;
  }) => {
    try {
      if (creating) return;
      setCreating(true);

      // Map modal data to backend payload
      const payload = {
        projectTitle: formData.projectTitle,
        customerName: formData.customerName,
        contactNumber: formData.contactNumber,
        vehicleRegistration: formData.vehicleRegistration,
        vehicleModel: formData.vehicleModel,
        projectDescription: formData.projectDescription,
        startDate: formData.startDate,
        estimatedCompletionTime: formData.estimatedCompletionDate,
        totalProjectCost: Number(formData.totalCost),
        subTasks: formData.subTasks?.map(st => ({ name: st.name, hours: st.hours })) ?? [],
      } as Record<string, unknown>;

      await postProject(payload);

      // Refresh from server to ensure DB persisted
      try {
        const list: any[] = await getProjects();
        const uiList = Array.isArray(list) ? list.map(toUiProject) : [];
        if (uiList.length) {
          setProjects(uiList);
        }
      } catch {}

      showToast.success("Project created", `${formData.projectTitle} added to Discussion`);
    } catch (e: any) {
      console.error("Project creation error:", e);
      // Extract error message properly
      let msg = "Failed to create project";
      if (typeof e === 'string') {
        msg = e;
      } else if (e?.message && typeof e.message === 'string') {
        msg = e.message;
      } else if (e?.error && typeof e.error === 'string') {
        msg = e.error;
      } else if (e?.data?.message) {
        msg = e.data.message;
      }
      showToast.error("Create project failed", msg);
    } finally {
      setCreating(false);
      setShowProjectModal(false);
    }
  };

  const getColumnProjects = (status: Project["status"]) => {
    return projects.filter(project => project.status === status);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bebas text-[#020079] mb-2">
          Projects Management
        </h1>
        <p className="font-roboto text-[#020079]/70">
          Manage project workflow across different stages
        </p>
      </div>

      {/* Action Button */}
      <div className="mb-6">
        <Button 
          size="lg"
          className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto font-semibold"
          onClick={() => setShowProjectModal(true)}
        >
          + Create New Project
        </Button>
      </div>

      {/* Project Columns */}
      <div className="grid grid-cols-4 gap-6">
        {/* Discussion Column */}
        <Card className="border-[#020079]/20">
          <CardHeader className="border-b border-[#020079]/20">
            <CardTitle className="font-bebas text-xl text-[#020079]">
              Discussion
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {getColumnProjects("Discussion").map((project) => (
                <div key={project.title} className="border border-[#020079]/20 rounded-lg p-4 hover:border-[#020079] hover:shadow-md transition-all">
                  <h3 className="font-bebas text-lg text-[#020079] mb-3">{project.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Customer:</span>
                      <span className="text-sm font-roboto text-[#020079] font-semibold">{project.customer}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Est. Cost:</span>
                      <span className="text-sm font-roboto text-[#020079] font-semibold">{project.estimatedCost}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Started:</span>
                      <span className="text-sm font-roboto text-[#020079]">{project.startDate}</span>
                    </div>
                    {project.requirements && (
                      <Badge className="bg-[#FFD700]/20 text-[#020079] border-[#FFD700]/30 font-roboto text-xs mt-2">
                        Requirements Gathered
                      </Badge>
                    )}
                    <Button 
                      className="w-full bg-[#FFD700]/20 text-[#020079] hover:bg-[#FFD700]/30 font-roboto mt-3 border border-[#FFD700]/30"
                      size="sm"
                      onClick={() => {
                        setSelectedProject(project);
                        setShowSubTaskModal(true);
                      }}
                    >
                      Create Sub-Tasks
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* In Progress Column */}
        <Card className="border-[#020079]/20">
          <CardHeader className="border-b border-[#020079]/20">
            <CardTitle className="font-bebas text-xl text-[#020079]">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {getColumnProjects("In Progress").map((project) => (
                <div key={project.title} className="border border-[#020079]/20 rounded-lg p-4 hover:border-[#020079] hover:shadow-md transition-all">
                  <h3 className="font-bebas text-lg text-[#020079] mb-3">{project.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Customer:</span>
                      <span className="text-sm font-roboto text-[#020079] font-semibold">{project.customer}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Est. Cost:</span>
                      <span className="text-sm font-roboto text-[#020079] font-semibold">{project.estimatedCost}</span>
                    </div>
                    {project.team && (
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Team:</span>
                        <span className="text-sm font-roboto text-[#020079] font-semibold">{project.team.join(", ")}</span>
                      </div>
                    )}
                    {project.timeline && (
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Timeline:</span>
                        <span className="text-sm font-roboto text-[#020079]">{project.timeline}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Waiting for Parts Column */}
        <Card className="border-[#020079]/20">
          <CardHeader className="border-b border-[#020079]/20">
            <CardTitle className="font-bebas text-xl text-[#020079]">
              Waiting for Parts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {getColumnProjects("Waiting for Parts").map((project) => (
                <div key={project.title} className="border border-[#020079]/20 rounded-lg p-4 hover:border-[#020079] hover:shadow-md transition-all">
                  <h3 className="font-bebas text-lg text-[#020079] mb-3">{project.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Customer:</span>
                      <span className="text-sm font-roboto text-[#020079] font-semibold">{project.customer}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Est. Cost:</span>
                      <span className="text-sm font-roboto text-[#020079] font-semibold">{project.estimatedCost}</span>
                    </div>
                    {project.onHold && (
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">On Hold:</span>
                        <span className="text-sm font-roboto text-[#020079] font-semibold">{project.onHold}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Started:</span>
                      <span className="text-sm font-roboto text-[#020079]">{project.startDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Column */}
        <Card className="border-[#020079]/20">
          <CardHeader className="border-b border-[#020079]/20">
            <CardTitle className="font-bebas text-xl text-[#020079]">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {getColumnProjects("Completed").map((project) => (
                <div key={project.title} className="border border-[#020079]/20 rounded-lg p-4 hover:border-[#020079] hover:shadow-md transition-all">
                  <h3 className="font-bebas text-lg text-[#020079] mb-3">{project.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Customer:</span>
                      <span className="text-sm font-roboto text-[#020079] font-semibold">{project.customer}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-roboto text-[#020079]/60 min-w-[70px]">Final Cost:</span>
                      <span className="text-sm font-roboto text-[#020079] font-semibold">{project.estimatedCost}</span>
                    </div>
                    <Badge className="bg-[#FFD700]/20 text-[#020079] border-[#FFD700]/30 font-roboto text-xs mt-2">
                      Completed: {project.startDate}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Form Modal */}
      <ProjectFormModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSubmit={handleCreateProject}
      />

      {/* Sub-Task Modal */}
      {selectedProject && (
        <SubTaskModal
          isOpen={showSubTaskModal}
          onClose={() => {
            setShowSubTaskModal(false);
            setSelectedProject(null);
          }}
          project={{
            id: selectedProject.id!,
            title: selectedProject.title,
            customer: selectedProject.customer,
            requirements: selectedProject.requirements
          }}
          onFinalize={(subTasks) => {
            const updatedProjects = projects.map(p => {
              if (p.id === selectedProject.id) {
                return {
                  ...p,
                  status: "In Progress" as const,
                  team: [...new Set(subTasks.map(task => task.assignedTo))]
                };
              }
              return p;
            });
            setProjects(updatedProjects);
            setShowSubTaskModal(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
}
