"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Calendar, DollarSign, Clock, User, FolderKanban, CheckCircle2, FileText, Users, Car } from "lucide-react";
import { showToast } from "@/lib/toast";

interface AssignedEmployee {
  employeeId: string;
  firstName: string;
  lastName: string;
  specialty: string;
  profileImageUrl: string | null;
}

interface Task {
  taskId: number;
  title: string;
  description: string;
  status: string;
  assignedTo?: string;
}

interface Vehicle {
  registrationNo: string;
  brandName: string;
  model: string;
  capacity: number;
}

interface ProjectDetails {
  projectId: number;
  jobId: number;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  projectStatus: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
  arrivingDate: string;
  completionDate: string | null;
  cost: number | null;
  estimatedHours: number;
  vehicle: Vehicle;
  tasks: Task[];
  assignedEmployees: AssignedEmployee[];
  bookedAt: string;
  updatedAt: string;
}

interface ProjectDetailsModalProps {
  projectId: number;
  onClose: () => void;
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
  COMPLETED: 'bg-green-100 text-green-800 border-green-300',
  CANCELLED: 'bg-red-100 text-red-800 border-red-300',
};

const projectStatusColors = {
  PLANNING: 'bg-purple-100 text-purple-800 border-purple-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
  COMPLETED: 'bg-green-100 text-green-800 border-green-300',
  ON_HOLD: 'bg-orange-100 text-orange-800 border-orange-300',
};

export default function ProjectDetailsModal({ projectId, onClose }: ProjectDetailsModalProps) {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/projects/${projectId}`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }

      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error('Failed to fetch project details:', error);
      showToast.error('Failed to load project details');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
          </div>
        ) : project ? (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
                    <p className="text-sm text-gray-600">Job ID: {project.jobId}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${projectStatusColors[project.projectStatus]}`}>
                    {project.projectStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {/* Vehicle Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Car className="w-5 h-5 text-gray-600" />
                  Vehicle
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-600">Registration</p>
                    <p className="font-semibold text-gray-900">{project.vehicle.registrationNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Brand & Model</p>
                    <p className="font-semibold text-gray-900">{project.vehicle.brandName} {project.vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-semibold text-gray-900">{project.vehicle.capacity} cc</p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-600">Start Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(project.arrivingDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  {project.completionDate && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-600">Completion Date</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(project.completionDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                  {project.cost && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-600">Cost</p>
                        <p className="font-semibold text-gray-900">LKR {project.cost.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-600">Estimated Hours</p>
                      <p className="font-semibold text-gray-900">{project.estimatedHours} hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-600">Booked At</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(project.bookedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Employees */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  Assigned Team ({project.assignedEmployees.length})
                </h3>
                {project.assignedEmployees.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">No team members assigned yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.assignedEmployees.map((employee) => (
                      <div
                        key={employee.employeeId}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                          {employee.firstName[0]}{employee.lastName[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </p>
                          <p className="text-sm text-gray-600">{employee.specialty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tasks */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gray-600" />
                  Tasks ({project.tasks.length})
                </h3>
                {project.tasks.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">No tasks created yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {project.tasks.map((task) => (
                      <div
                        key={task.taskId}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{task.title}</h4>
                          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                            {task.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{task.description}</p>
                        {task.assignedTo && (
                          <p className="text-xs text-gray-600 mt-2">Assigned to: {task.assignedTo}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
