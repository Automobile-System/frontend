import { Wrench, Calendar, Clock, DollarSign, Users } from 'lucide-react';

interface AssignedEmployee {
  employeeId: string;
  firstName: string;
  lastName: string;
  specialty: string;
  profileImageUrl: string | null;
}

interface CustomerService {
  serviceId: number;
  title: string;
  description: string;
  category: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  arrivingDate: string;
  cost: number;
  estimatedHours: number;
  vehicleRegistration: string;
  vehicleBrand: string;
  vehicleModel: string;
  assignedEmployees: AssignedEmployee[];
  bookedAt: string;
}

interface ServiceItemCardProps {
  service: CustomerService;
  onViewDetails: (serviceId: number) => void;
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
  COMPLETED: 'bg-green-100 text-green-800 border-green-300',
  CANCELLED: 'bg-red-100 text-red-800 border-red-300',
};

export default function ServiceItemCard({ service, onViewDetails }: ServiceItemCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-[#020079]/30">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#03009B]/10 flex items-center justify-center">
            <Wrench className="w-6 h-6 text-[#03009B]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.vehicleBrand} {service.vehicleModel}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[service.status]}`}>
          {service.status.replace('_', ' ')}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{service.description}</p>

      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>Arriving: {new Date(service.arrivingDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span>Cost: LKR {service.cost.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>Est. {service.estimatedHours}h</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span>{service.assignedEmployees.length} Employee{service.assignedEmployees.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(service.serviceId)}
        className="mt-4 w-full text-center px-4 py-2 bg-gray-50 hover:bg-[#03009B] hover:text-white text-gray-700 rounded-lg transition-all font-medium text-sm border border-gray-200 hover:border-[#03009B]"
      >
        View Details
      </button>
    </div>
  );
}
