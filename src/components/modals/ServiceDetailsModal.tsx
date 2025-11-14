"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Calendar, DollarSign, Clock, User, Wrench, CheckCircle2, FileText, Users, Car } from "lucide-react";
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

interface ServiceDetails {
  serviceId: number;
  title: string;
  description: string;
  category: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'SCHEDULED' | 'CANCELLED';
  arrivingDate: string;
  cost: number;
  estimatedHours: number;
  imageUrl: string;
  vehicle: Vehicle;
  tasks: Task[];
  assignedEmployees: AssignedEmployee[];
  bookedAt: string;
  updatedAt: string;
}

interface ServiceDetailsModalProps {
  jobId: number;
  onClose: () => void;
}

const statusColors = {
  COMPLETED: 'bg-green-100 text-green-800 border-green-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
  WAITING_PARTS: 'bg-orange-100 text-orange-800 border-orange-300',
  SCHEDULED: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  CANCELLED: 'bg-red-100 text-red-800 border-red-300',
};

export default function ServiceDetailsModal({ jobId, onClose }: ServiceDetailsModalProps) {
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServiceDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const fetchServiceDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/services/${jobId}`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch service details' }));
        throw new Error(errorData.message || 'Failed to fetch service details');
      }

      const data = await response.json();
      setService(data);
    } catch (error) {
      console.error('Failed to fetch service details:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to load service details');
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
            <Loader2 className="w-10 h-10 animate-spin text-[#03009B]" />
          </div>
        ) : service ? (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-[#03009B]/10 flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-[#03009B]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                    <p className="text-sm text-gray-600">{service.category}</p>
                  </div>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[service.status]}`}>
                  {service.status.replace('_', ' ')}
                </span>
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
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
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
                    <p className="font-semibold text-gray-900">{service.vehicle.registrationNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Brand & Model</p>
                    <p className="font-semibold text-gray-900">{service.vehicle.brandName} {service.vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-semibold text-gray-900">{service.vehicle.capacity} cc</p>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-600">Arriving Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(service.arrivingDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-600">Cost</p>
                      <p className="font-semibold text-gray-900">LKR {service.cost.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-600">Estimated Hours</p>
                      <p className="font-semibold text-gray-900">{service.estimatedHours} hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-600">Booked At</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(service.bookedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Employees */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  Assigned Employees ({service.assignedEmployees.length})
                </h3>
                {service.assignedEmployees.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">No employees assigned yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.assignedEmployees.map((employee) => (
                      <div
                        key={employee.employeeId}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#03009B] text-white flex items-center justify-center font-semibold">
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
                  Tasks ({service.tasks.length})
                </h3>
                {service.tasks.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">No tasks created yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {service.tasks.map((task) => (
                      <div
                        key={task.taskId}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{task.title}</h4>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
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
