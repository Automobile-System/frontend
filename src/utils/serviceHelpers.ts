import { ServiceStatus, PriorityLevel } from '@/types/service';

export const getStatusColor = (status: ServiceStatus): string => {
  const colors = {
    scheduled: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    waiting_parts: 'bg-orange-100 text-orange-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status];
};

export const getStatusText = (status: ServiceStatus): string => {
  const texts = {
    scheduled: 'Scheduled',
    in_progress: 'In Progress',
    completed: 'Completed',
    waiting_parts: 'Waiting for Parts',
    cancelled: 'Cancelled'
  };
  return texts[status];
};

export const getPriorityColor = (priority: PriorityLevel): string => {
  const colors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };
  return colors[priority];
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};