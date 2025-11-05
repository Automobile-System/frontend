export const mockVehicles = [
  {
    id: 1,
    name: 'Toyota Corolla',
    licensePlate: 'KA-1234',
    model: 'Corolla 2020',
    lastService: '2024-01-15',
    nextService: '2024-04-15',
    image: '/images/corolla.png'
  },
  {
    id: 2,
    name: 'Honda Civic',
    licensePlate: 'KB-5678',
    model: 'Civic 2021',
    lastService: '2024-02-20',
    nextService: '2024-05-20',
    image: '/images/civic.png'
  },
  {
    id: 3,
    name: 'Ford Explorer',
    licensePlate: 'KC-9012',
    model: 'Explorer 2022',
    lastService: '2024-03-10',
    nextService: '2024-06-10',
    image: '/images/explorer.png'
  }
];

export const mockServices = [
  {
    id: 1,
    name: 'Oil Change',
    duration: '45 min',
    price: '$49.99',
    description: 'Complete oil and filter change'
  },
  {
    id: 2,
    name: 'Brake Service',
    duration: '90 min',
    price: '$129.99',
    description: 'Brake inspection and pad replacement'
  },
  {
    id: 3,
    name: 'Engine Diagnosis',
    duration: '60 min',
    price: '$89.99',
    description: 'Complete engine diagnostic check'
  },
  {
    id: 4,
    name: 'Battery Check',
    duration: '30 min',
    price: '$29.99',
    description: 'Battery health and charging system check'
  },
  {
    id: 5,
    name: 'Tire Rotation',
    duration: '40 min',
    price: '$39.99',
    description: 'Tire rotation and pressure check'
  },
  {
    id: 6,
    name: 'Custom Project',
    duration: 'Varies',
    price: 'Custom Quote',
    description: 'Request custom service or modification'
  }
];

export const mockEmployees = [
  {
    id: 1,
    name: 'Mike Johnson',
    specialization: 'Engine Specialist',
    rating: 4.8,
    experience: '5 years',
    image: '/images/employee1.jpg'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    specialization: 'Brake Systems',
    rating: 4.9,
    experience: '7 years',
    image: '/images/employee2.jpg'
  },
  {
    id: 3,
    name: 'David Chen',
    specialization: 'Electrical Systems',
    rating: 4.7,
    experience: '4 years',
    image: '/images/employee3.jpg'
  }
];

export const mockRecommendations = [
  {
    id: 1,
    type: 'Oil Change Due',
    message: "Your Corolla's oil change is due in 20 days",
    vehicle: 'Toyota Corolla (KA-1234)',
    priority: 'high',
    icon: '🛢️'
  },
  {
    id: 2,
    type: 'Brake Inspection',
    message: 'Recommended brake check for Vehicle KA-1234',
    vehicle: 'Toyota Corolla (KA-1234)',
    priority: 'medium',
    icon: '🛑'
  },
  {
    id: 3,
    type: 'Tire Rotation',
    message: 'Your Honda Civic needs tire rotation (Last done 6 months ago)',
    vehicle: 'Honda Civic (KB-5678)',
    priority: 'medium',
    icon: '🌀'
  }
];

export const mockServiceHistory = [
  {
    id: 1,
    date: '2024-02-15',
    service: 'Oil Change',
    vehicle: 'Toyota Corolla',
    status: 'Completed',
    cost: '$49.99'
  },
  {
    id: 2,
    date: '2024-01-20',
    service: 'Brake Service',
    vehicle: 'Honda Civic',
    status: 'Completed',
    cost: '$129.99'
  }
];