"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProjectFormModal from "@/components/modals/ProjectFormModal";
import SubTaskModal from "@/components/modals/SubTaskModal";

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

  const handleCreateProject = (formData: any) => {
    const newProject: Project = {
      id: `PRJ-${String(projects.length + 1).padStart(3, '0')}`,
      title: formData.title,
      customer: formData.customer,
      estimatedCost: `Rs. ${formData.estimatedCost}`,
      startDate: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric'
      }),
      status: "Discussion"
    };
    
    setProjects([...projects, newProject]);
    setShowProjectModal(false);
  };

  const getColumnProjects = (status: Project["status"]) => {
    return projects.filter(project => project.status === status);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">📋</span>
          <h1 className="text-3xl font-bold text-gray-800">Projects Management</h1>
        </div>
        <Button 
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          onClick={() => setShowProjectModal(true)}
        >
          + Create New Project
        </Button>
      </div>

      {/* Project Columns */}
      <div className="grid grid-cols-4 gap-6">
        {/* Discussion Column */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-400">💭</span>
            <h2 className="text-lg font-semibold text-gray-800">Discussion</h2>
          </div>
          <div className="space-y-3">
            {getColumnProjects("Discussion").map((project) => (
              <div key={project.title} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800 mb-3">{project.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    <span className="text-sm text-gray-600">Customer:</span>
                    <span className="text-sm text-black font-medium">{project.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span className="text-sm text-gray-600">Est. Cost:</span>
                    <span className="text-sm text-black font-medium">{project.estimatedCost}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span className="text-sm text-gray-600">Started:</span>
                    <span className="text-sm text-black">{project.startDate}</span>
                  </div>
                  {project.requirements && (
                    <div className="flex items-center gap-2 text-emerald-600">
                      <span>✓</span>
                      <span className="text-sm font-medium">Requirements Gathered</span>
                    </div>
                  )}
                  <Button 
                    className="w-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 mt-2"
                    size="sm"
                    onClick={() => {
                      setSelectedProject(project);
                      setShowSubTaskModal(true);
                    }}
                  >
                    📋 Create Sub-Tasks
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">⚡</span>
            <h2 className="text-lg font-semibold text-gray-800">In Progress</h2>
          </div>
          <div className="space-y-3">
            {getColumnProjects("In Progress").map((project) => (
              <div key={project.title} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800 mb-3">{project.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    <span className="text-sm text-gray-600">Customer:</span>
                    <span className="text-sm text-black  font-medium">{project.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span className="text-sm text-gray-600">Est. Cost:</span>
                    <span className="text-sm text-black font-medium">{project.estimatedCost}</span>
                  </div>
                  {project.team && (
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <span className="text-sm text-gray-600">Team:</span>
                      <span className="text-sm text-black  font-medium">{project.team.join(", ")}</span>
                    </div>
                  )}
                  {project.timeline && (
                    <div className="flex items-center gap-2">
                      <span>⏱</span>
                      <span className="text-sm text-gray-600">Timeline:</span>
                      <span className="text-sm text-black ">{project.timeline}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waiting for Parts Column */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-500">⚠</span>
            <h2 className="text-lg font-semibold text-gray-800">Waiting for Parts</h2>
          </div>
          <div className="space-y-3">
            {getColumnProjects("Waiting for Parts").map((project) => (
              <div key={project.title} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800 mb-3">{project.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    <span className="text-sm text-gray-600">Customer:</span>
                    <span className="text-sm text-black  font-medium">{project.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span className="text-sm text-gray-600">Est. Cost:</span>
                    <span className="text-sm text-black font-medium">{project.estimatedCost}</span>
                  </div>
                  {project.onHold && (
                    <div className="flex items-center gap-2">
                      <span>⏳</span>
                      <span className="text-sm text-gray-600">On Hold:</span>
                      <span className="text-sm text-black font-medium">{project.onHold}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span className="text-sm text-gray-600">Started:</span>
                    <span className="text-sm text-black ">{project.startDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-500">✓</span>
            <h2 className="text-lg font-semibold text-gray-800">Completed</h2>
          </div>
          <div className="space-y-3">
            {getColumnProjects("Completed").map((project) => (
              <div key={project.title} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800 mb-3">{project.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    <span className="text-sm text-gray-600">Customer:</span>
                    <span className="text-sm text-black font-medium">{project.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span className="text-sm text-gray-600">Final Cost:</span>
                    <span className="text-sm text-black font-medium">{project.estimatedCost}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <span>✓</span>
                    <span className="text-sm">Completed:</span>
                    <span className="text-sm font-medium">{project.startDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
