"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Calendar, Wrench, FolderKanban, DollarSign, Clock, CheckCircle2, FileText } from "lucide-react";
import { showToast } from "@/lib/toast";

interface AssignedEmployee {
  employeeId: string;
  employeeName: string;
  specialty: string;
  rating: number | null;
  profileImageUrl: string | null;
  hoursWorked: number;
  workDescription: string | null;
  assignedAt: string;
}

interface JobHistory {
  jobId: number;
  jobType: 'SERVICE' | 'PROJECT';
  jobStatus: 'COMPLETED' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'SCHEDULED' | 'CANCELLED' | 'PENDING' | 'APPROVED';
  arrivingDate: string;
  completionDate: string | null;
  cost: number | null;
  typeId: number;
  title: string;
  description: string;
  estimatedHours: number;
  category: string | null;
  imageUrl: string | null;
  projectStatus: string | null;
  totalTasks: number | null;
  completedTasks: number | null;
  assignedEmployees: AssignedEmployee[];
  createdAt: string;
  updatedAt: string;
}

interface ServiceHistory {
  vehicleRegistration: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleCapacity: number;
  totalJobs: number;
  completedJobs: number;
  activeJobs: number;
  jobHistory: JobHistory[];
}

interface VehicleServiceHistoryModalProps {
  vehicleId: string;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  COMPLETED: 'bg-green-100 text-green-800 border-green-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
  WAITING_PARTS: 'bg-orange-100 text-orange-800 border-orange-300',
  SCHEDULED: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  CANCELLED: 'bg-red-100 text-red-800 border-red-300',
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  APPROVED: 'bg-cyan-100 text-cyan-800 border-cyan-300',
};

export default function VehicleServiceHistoryModal({ vehicleId, onClose }: VehicleServiceHistoryModalProps) {
  const [history, setHistory] = useState<ServiceHistory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServiceHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleId]);

  const fetchServiceHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/vehicles/${vehicleId}/service-history`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch service history");
      }

      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Failed to fetch service history:', error);
      showToast.error('Failed to load service history');
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
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#03009B]" />
          </div>
        ) : history ? (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Service History</h2>
                <p className="text-lg text-gray-700 font-semibold">
                  {history.vehicleBrand} {history.vehicleModel} - {history.vehicleRegistration}
                </p>
                <p className="text-sm text-gray-600 mt-1">Capacity: {history.vehicleCapacity} cc</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Stats Summary */}
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <p className="text-2xl font-bold text-gray-900">{history.totalJobs}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Jobs</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <p className="text-2xl font-bold text-gray-900">{history.completedJobs}</p>
                  <p className="text-sm text-gray-600 mt-1">Completed</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <p className="text-2xl font-bold text-gray-900">{history.activeJobs}</p>
                  <p className="text-sm text-gray-600 mt-1">Active</p>
                </div>
              </div>
            </div>

            {/* Job History */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job History</h3>
              {history.jobHistory.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">No job history available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.jobHistory.map((job) => (
                    <div
                      key={job.jobId}
                      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all"
                    >
                      {/* Job Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            job.jobType === 'SERVICE' ? 'bg-gray-100' : 'bg-gray-100'
                          }`}>
                            {job.jobType === 'SERVICE' ? (
                              <Wrench className="w-6 h-6 text-gray-700" />
                            ) : (
                              <FolderKanban className="w-6 h-6 text-gray-700" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                              <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                {job.jobType}
                              </span>
                            </div>
                            {job.category && (
                              <p className="text-sm text-gray-600">{job.category}</p>
                            )}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[job.jobStatus]}`}>
                          {job.jobStatus.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Job Description */}
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>

                      {/* Job Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Arriving</p>
                            <p className="font-medium text-gray-900">
                              {new Date(job.arrivingDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {job.cost && (
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Cost</p>
                              <p className="font-medium text-gray-900">LKR {job.cost.toLocaleString()}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Est. Hours</p>
                            <p className="font-medium text-gray-900">{job.estimatedHours}h</p>
                          </div>
                        </div>
                        {job.jobType === 'PROJECT' && job.totalTasks !== null && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Tasks</p>
                              <p className="font-medium text-gray-900">
                                {job.completedTasks}/{job.totalTasks}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Assigned Employees */}
                      {job.assignedEmployees.length > 0 && (
                        <div className="pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500 mb-2 font-medium">Assigned Team</p>
                          <div className="flex flex-wrap gap-2">
                            {job.assignedEmployees.map((employee) => (
                              <div
                                key={employee.employeeId}
                                className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200"
                              >
                                <div className="w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-semibold">
                                  {employee.employeeName.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="text-xs">
                                  <p className="font-medium text-gray-900">{employee.employeeName}</p>
                                  <p className="text-gray-600">{employee.specialty}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
