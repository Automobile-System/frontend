'use client';

import { useState, useEffect } from 'react';
import CustomerLayout from '@/components/layout/customer/CustomerLayout';
import ServiceItemCard from '@/components/customer/ServiceItemCard';
import ProjectItemCard from '@/components/customer/ProjectItemCard';
import AddServiceModal from '@/components/modals/AddServiceModal';
import AddProjectModal from '@/components/modals/AddProjectModal';
import ServiceDetailsModal from '@/components/modals/ServiceDetailsModal';
import ProjectDetailsModal from '@/components/modals/ProjectDetailsModal';
import { Plus, Wrench, FolderKanban, Loader } from 'lucide-react';

interface AssignedEmployee {
  employeeId: string;
  firstName: string;
  lastName: string;
  specialty: string;
  profileImageUrl: string | null;
}

interface CustomerService {
  serviceId: number;
  jobId: number;
  title: string;
  description: string;
  category: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'SCHEDULED' | 'CANCELLED';
  arrivingDate: string;
  cost: number;
  estimatedHours: number;
  vehicleRegistration: string;
  vehicleBrand: string;
  vehicleModel: string;
  assignedEmployees: AssignedEmployee[];
  bookedAt: string;
}

interface CustomerProject {
  projectId: number;
  jobId: number;
  title: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'SCHEDULED' | 'CANCELLED';
  projectStatus: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'SCHEDULED' | 'CANCELLED';
  arrivingDate: string;
  completionDate: string | null;
  cost: number | null;
  estimatedHours: number;
  vehicleRegistration: string;
  vehicleBrand: string;
  vehicleModel: string;
  assignedEmployees: AssignedEmployee[];
  totalTasks: number;
  completedTasks: number;
  bookedAt: string;
  updatedAt: string;
}

export default function ServicesPage() {
    const [showAddService, setShowAddService] = useState(false);
    const [showAddProject, setShowAddProject] = useState(false);
    const [selectedServiceJobId, setSelectedServiceJobId] = useState<number | null>(null);
    const [selectedProjectJobId, setSelectedProjectJobId] = useState<number | null>(null);
    const [services, setServices] = useState<CustomerService[]>([]);
    const [projects, setProjects] = useState<CustomerProject[]>([]);
    const [isLoadingServices, setIsLoadingServices] = useState(true);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);

    useEffect(() => {
        fetchServices();
        fetchProjects();
    }, []);

    const fetchServices = async () => {
        try {
            setIsLoadingServices(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/services`, {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        } catch (error) {
            console.error('Failed to fetch services:', error);
        } finally {
            setIsLoadingServices(false);
        }
    };

    const fetchProjects = async () => {
        try {
            setIsLoadingProjects(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/projects`, {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setIsLoadingProjects(false);
        }
    };

    const handleServiceAdded = () => {
        setShowAddService(false);
        fetchServices();
    };

    const handleProjectAdded = () => {
        setShowAddProject(false);
        fetchProjects();
    };

    return (
        <CustomerLayout>
            <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
                {/* My Services Section */}
                <section>
                    <div className="flex items-start justify-between mb-6 pb-6 border-b-2 border-[#020079]/10">
                        <div>
                            <h2 className="text-3xl font-bold text-[#020079] mb-2 tracking-wide flex items-center gap-3">
                                <Wrench className="w-8 h-8" />
                                My Services
                            </h2>
                            <p className="text-gray-600 text-base">
                                Track and manage your vehicle services
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddService(true)}
                            className="bg-[#03009B] hover:bg-[#020079] active:bg-[#01024D] text-white px-6 py-3 rounded-xl border-none font-semibold text-base cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 active:scale-98 flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Service
                        </button>
                    </div>

                    {isLoadingServices ? (
                        <div className="flex justify-center items-center py-16">
                            <Loader className="w-8 h-8 animate-spin text-[#03009B]" />
                        </div>
                    ) : services.length === 0 ? (
                        <div className="text-center py-16 px-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center">
                                <Wrench className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                No Services Yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Get started by scheduling your first service
                            </p>
                            <button
                                onClick={() => setShowAddService(true)}
                                className="px-6 py-3 bg-[#03009B] hover:bg-[#020079] text-white border-none rounded-lg cursor-pointer font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2 mx-auto"
                            >
                                <Plus className="w-5 h-5" />
                                Add Your First Service
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map(service => (
                                <ServiceItemCard 
                                    key={service.serviceId} 
                                    service={service}
                                    onViewDetails={(jobId) => setSelectedServiceJobId(jobId)}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* My Projects Section */}
                <section>
                    <div className="flex items-start justify-between mb-6 pb-6 border-b-2 border-[#020079]/10">
                        <div>
                            <h2 className="text-3xl font-bold text-[#020079] mb-2 tracking-wide flex items-center gap-3">
                                <FolderKanban className="w-8 h-8" />
                                My Projects
                            </h2>
                            <p className="text-gray-600 text-base">
                                Monitor your ongoing vehicle projects
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddProject(true)}
                            className="bg-[#03009B] hover:bg-[#020079] active:bg-[#01024D] text-white px-6 py-3 rounded-xl border-none font-semibold text-base cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 active:scale-98 flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Project
                        </button>
                    </div>

                    {isLoadingProjects ? (
                        <div className="flex justify-center items-center py-16">
                            <Loader className="w-8 h-8 animate-spin text-purple-600" />
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-16 px-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center">
                                <FolderKanban className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                No Projects Yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Start your first custom vehicle project
                            </p>
                            <button
                                onClick={() => setShowAddProject(true)}
                                className="px-6 py-3 bg-[#03009B] hover:bg-[#020079] text-white border-none rounded-lg cursor-pointer font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2 mx-auto"
                            >
                                <Plus className="w-5 h-5" />
                                Add Your First Project
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map(project => (
                                <ProjectItemCard 
                                    key={project.projectId} 
                                    project={project}
                                    onViewDetails={(jobId) => setSelectedProjectJobId(jobId)}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Modals */}
                {showAddService && (
                    <AddServiceModal 
                        onClose={() => setShowAddService(false)}
                        onServiceAdded={handleServiceAdded}
                    />
                )}

                {showAddProject && (
                    <AddProjectModal 
                        onClose={() => setShowAddProject(false)}
                        onProjectAdded={handleProjectAdded}
                    />
                )}

                {selectedServiceJobId && (
                    <ServiceDetailsModal
                        jobId={selectedServiceJobId}
                        onClose={() => setSelectedServiceJobId(null)}
                    />
                )}

                {selectedProjectJobId && (
                    <ProjectDetailsModal
                        jobId={selectedProjectJobId}
                        onClose={() => setSelectedProjectJobId(null)}
                    />
                )}
            </div>
        </CustomerLayout>
    );
}