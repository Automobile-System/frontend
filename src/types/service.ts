export type ServiceStatus = 
  | 'scheduled' 
  | 'in_progress' 
  | 'completed' 
  | 'waiting_parts' 
  | 'cancelled';

export type PriorityLevel = 'low' | 'medium' | 'high';

export interface Service {
  id: string;
  title: string;
  vehicle: {
    model: string;
    plate: string;
  };
  assignedEmployee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: ServiceStatus;
  priority: PriorityLevel;
  expectedCompletion?: Date;
  completedOn?: Date;
  completedBy?: string;
  timeline: ServiceUpdate[];
  description?: string;
  isProject?: boolean;
  projectTeam?: number;
  progress?: number;
}

export interface ServiceUpdate {
  timestamp: Date;
  message: string;
  employee?: string;
}

export interface ServiceReview {
  rating: number;
  comment: string;
  serviceId: string;
}