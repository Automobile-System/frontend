import { getStatusColor, getStatusText } from '@/utils/serviceHelpers';
import { ServiceStatus } from '@/types/service';

interface StatusBadgeProps {
  status: ServiceStatus;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)} ${className}`}>
      {getStatusText(status)}
    </span>
  );
}