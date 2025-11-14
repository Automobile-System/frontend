// Service Analytics Types

export interface PopularServices {
  labels: string[];
  data: number[];
}

export interface AverageCost {
  labels: string[];
  data: number[];
}

export interface AverageDuration {
  labels: string[];
  data: number[];
}

export interface CategoryPerformance {
  labels: string[];
  jobs: number[];
  delays: number[];
}

export interface BrandAnalytics {
  labels: string[];
  data: number[];
}

export interface JobTimeliness {
  labels: string[];
  data: number[];
}

export interface TaskDelayBreakdown {
  employeeName?: string;
  count?: number;
}

export interface TaskDelays {
  totalDelayed: number;
  breakdown: TaskDelayBreakdown[];
}

export interface ProjectSummary {
  totalProjects: number;
  pending: number;
  approved: number;
  completed: number;
  inProgress: number;
  waitingParts: number;
  scheduled: number;
  cancelled: number;
  averageCost: number;
}

export interface ServiceSummary {
  totalServices: number;
  completed: number;
  inProgress: number;
  waitingParts: number;
  scheduled: number;
  cancelled: number;
  averageCost: number;
}

export interface ProjectAnalytics {
  labels: string[];
  estimated: number[];
  actual: number[];
  summary: ProjectSummary;
}

export interface ServiceAnalyticsDetailedResponse {
  popularServices: PopularServices;
  averageCost: AverageCost;
  averageDuration: AverageDuration;
  categoryPerformance: CategoryPerformance;
  brandAnalytics: BrandAnalytics;
  jobTimeliness: JobTimeliness;
  taskDelays: TaskDelays;
  projectAnalytics: ProjectAnalytics;
  serviceSummary: ServiceSummary;
}

export interface ServiceInfoResponse {
  serviceId: number;
  title: string;
  description: string;
  category: string;
  cost: number;
  estimatedHours: number;
  imageUrl?: string;
  totalBookings: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceRequest {
  title: string;
  description: string;
  category: string;
  cost: number;
  estimatedHours: number;
  imageUrl?: string;
}

export interface UpdateServiceRequest {
  title: string;
  description: string;
  category: string;
  cost: number;
  estimatedHours: number;
  imageUrl?: string;
}
