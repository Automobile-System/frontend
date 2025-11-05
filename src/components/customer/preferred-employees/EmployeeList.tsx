import EmployeeCard from './EmployeeCard';

export type EmployeeStatus = 'available' | 'busy' | 'offline';

export interface Employee {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  status: EmployeeStatus;
  experience: string;
  image?: string;
}

interface EmployeeListProps {
  preferredEmployees: string[];
  onTogglePreferred: (employeeId: string) => void;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Ruwan Silva',
    specialization: 'Engine Specialist',
    rating: 4.8,
    reviewCount: 127,
    status: 'available',
    experience: '8 years experience'
  },
  {
    id: '2',
    name: 'Kamal Perera',
    specialization: 'Electrical Expert',
    rating: 4.6,
    reviewCount: 89,
    status: 'busy',
    experience: '6 years experience'
  },
  {
    id: '3',
    name: 'Nimal Fernando',
    specialization: 'Bodywork Specialist',
    rating: 4.9,
    reviewCount: 156,
    status: 'available',
    experience: '10 years experience'
  },
  {
    id: '4',
    name: 'Sunil Jayasinghe',
    specialization: 'Transmission Expert',
    rating: 4.5,
    reviewCount: 67,
    status: 'available',
    experience: '7 years experience'
  }
];

export default function EmployeeList({ preferredEmployees, onTogglePreferred }: EmployeeListProps) {
  return (
    <div style={{
      display: 'grid',
      gap: '1.5rem',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
    }}>
      {mockEmployees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          isPreferred={preferredEmployees.includes(employee.id)}
          onTogglePreferred={() => onTogglePreferred(employee.id)}
        />
      ))}
    </div>
  );
}