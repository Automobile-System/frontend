"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import ProjectFormModal from "@/components/modals/ProjectFormModal";
import SubTaskModal from "@/components/modals/SubTaskModal";
import { fetchProjects, type ProjectSummary } from "@/services/managerService";
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
  projectId?: number | null;
}

// Helper function to format date
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

// Helper function to format currency
function formatCurrency(cost: number | null | undefined): string {
  if (cost == null) return "Rs. 0";
  return `Rs. ${cost.toLocaleString('en-US')}`;
}

// Map ProjectSummary to local Project interface
function mapProjectSummary(summary: ProjectSummary): Project {
  const status = (summary.status || "Discussion") as Project["status"];
  
  // Format start date from createdAt or job arrivingDate
  const startDate = summary.job?.arrivingDate 
    ? formatDate(summary.job.arrivingDate)
    : formatDate(summary.createdAt);

  // Build timeline from job dates if available
  let timeline: string | undefined;
  if (summary.job?.arrivingDate && summary.job?.completionDate) {
    const start = formatDate(summary.job.arrivingDate);
    const end = formatDate(summary.job.completionDate);
    timeline = `${start} - ${end}`;
  }

  // Determine if requirements are gathered (has tasks)
  const requirements = (summary.tasks && summary.tasks.length > 0) || false;

  return {
    id: summary.id || `proj-${summary.projectId || 'unknown'}`,
    title: summary.title || "Untitled Project",
    customer: summary.customer || "N/A",
    estimatedCost: formatCurrency(summary.cost),
    startDate,
    status,
    requirements,
    projectId: summary.projectId,
    timeline,
  };
}

export default function ProjectsManagement() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showSubTaskModal, setShowSubTaskModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to transform API response to projects array
  const transformProjects = (response: Awaited<ReturnType<typeof fetchProjects>>): Project[] => {
    const allProjects: Project[] = [];
    response.forEach((boardResponse) => {
      if (boardResponse.projects && Array.isArray(boardResponse.projects)) {
        const mappedProjects = boardResponse.projects.map(mapProjectSummary);
        allProjects.push(...mappedProjects);
      }
    });
    return allProjects;
  };

  // Helper function to refresh projects from API
  const refreshProjects = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
        setError(null);
      }
      const response = await fetchProjects();
      setProjects(transformProjects(response));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load projects";
      if (showLoading) {
        setError(message);
      }
      showToast.error(message);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

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
    // TODO: Implement API call to create project
    // For now, just close the modal and refresh the list
    setShowProjectModal(false);
    
    // Refresh projects list without showing loading state
    await refreshProjects(false);
    showToast.success("Project created successfully");
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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="font-roboto text-[#020079]">Loading projects...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <p className="font-medium">Unable to load projects</p>
          <p className="mt-1">{error}</p>
        </div>
      )}

      {/* Project Columns */}
      {!loading && !error && (
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
      )}

      {/* Empty State */}
      {!loading && !error && projects.length === 0 && (
        <Card className="border-[#020079]/20">
          <CardContent className="py-12 text-center">
            <p className="font-roboto text-[#020079]/70">
              No projects found. Create your first project to get started.
            </p>
          </CardContent>
        </Card>
      )}

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
          onFinalize={async (subTasks) => {
            setShowSubTaskModal(false);
            setSelectedProject(null);
            
            // Refresh projects list from API to get updated status (without loading state)
            await refreshProjects(false);
            showToast.success("Sub-tasks created successfully");
          }}
        />
      )}
    </div>
  );
}
