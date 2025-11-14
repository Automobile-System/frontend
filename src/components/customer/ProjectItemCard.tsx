import { FolderKanban, Calendar, Users, Clock, DollarSign } from 'lucide-react';

interface AssignedEmployee {
  employeeId: string;
  firstName: string;
  lastName: string;
  specialty: string;
  profileImageUrl: string | null;
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

interface ProjectItemCardProps {
  project: CustomerProject;
  onViewDetails: (jobId: number) => void;
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  APPROVED: 'bg-cyan-100 text-cyan-800 border-cyan-300',
  COMPLETED: 'bg-green-100 text-green-800 border-green-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
  WAITING_PARTS: 'bg-orange-100 text-orange-800 border-orange-300',
  SCHEDULED: 'bg-purple-100 text-purple-800 border-purple-300',
  CANCELLED: 'bg-red-100 text-red-800 border-red-300',
};

export default function ProjectItemCard({ project, onViewDetails }: ProjectItemCardProps) {
  const progress = project.totalTasks > 0 
    ? Math.round((project.completedTasks / project.totalTasks) * 100) 
    : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-[#020079]/30">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <FolderKanban className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.vehicleBrand} {project.vehicleModel}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
          {project.status.replace('_', ' ')}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{project.description}</p>

      {project.totalTasks > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600 font-medium">Progress</span>
            <span className="text-xs text-gray-600 font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {project.completedTasks} of {project.totalTasks} tasks completed
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>Started: {new Date(project.arrivingDate).toLocaleDateString()}</span>
        </div>
        {project.cost && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span>Cost: LKR {project.cost.toLocaleString()}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>Est. {project.estimatedHours}h</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span>{project.assignedEmployees.length} Team member{project.assignedEmployees.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(project.jobId)}
        className="mt-4 w-full text-center px-4 py-2 bg-gray-50 hover:bg-purple-600 hover:text-white text-gray-700 rounded-lg transition-all font-medium text-sm border border-gray-200 hover:border-purple-600"
      >
        View Details
      </button>
    </div>
  );
}
