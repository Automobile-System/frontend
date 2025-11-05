
import { getPriorityColor } from '@/utils/serviceHelpers';
import { PriorityLevel } from '@/types/service';

interface PriorityTagProps {
  priority: PriorityLevel;
  className?: string;
}

export default function PriorityTag({ priority, className = '' }: PriorityTagProps) {
  const priorityText = priority.charAt(0).toUpperCase() + priority.slice(1);
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(priority)} ${className}`}>
      {priorityText} Priority
    </span>
  );
}