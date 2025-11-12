// Manager Service - API functions for manager dashboard operations

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8080';

// Helper function for API calls
async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const headers = new Headers(options.headers ?? {});
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

export interface DashboardOverviewResponse {
  activeEmployees: {
    total: number;
    available: number;
  };
  ongoingServices: {
    total: number;
    status: string;
  };
  projectsPending: {
    total: number;
    status: string;
  };
  avgCompletionTime: {
    value: number;
    unit: string;
  };
  systemAlerts: Array<{
    message: string;
    employee: string;
    reason: string;
  }>;
  taskDistribution: Record<string, string>;
  completionRateTrend: Record<string, string>;
}

export interface EmployeeListItem {
  id: string;
  name: string;
  skill: string;
  currentTasks: string;
  rating: number;
  status: string;
}

export interface EmployeeHistoryEntry {
  serviceId: string;
  vehicle: string;
  serviceType: string;
  date: string;
  customerRating: number;
}

export interface CreateSubTaskPayload {
  projectId: number;
  title: string;
  description?: string;
  estimatedHours?: number;
  status?: string;
}

export interface CreateServicePayload {
  title: string;
  description: string;
  category?: string;
  imageUrl?: string;
  estimatedHours?: number;
  cost?: number;
}

export interface UpdateEmployeeStatusPayload {
  status: string;
}

export interface UpdateSchedulePayload {
  newDate: string;
  newTime?: string;
  assignedEmployeeId?: string;
}

export interface ProjectBoardResponse {
  status: string;
  projects: ProjectSummary[];
}

export interface ProjectSummary {
  id: string | null;
  projectId: number | null;
  title: string | null;
  description: string | null;
  estimatedHours: number | null;
  cost: number | null;
  customer: string | null;
  status: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  customerDetails?: CustomerInfo;
  vehicle?: VehicleInfo;
  job?: JobInfo;
  tasks?: TaskSummary[];
}

export interface CustomerInfo {
  id: string | null;
  customerId: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export interface VehicleInfo {
  vehicleId: string | null;
  registrationNumber: string | null;
  brandName: string | null;
  model: string | null;
  capacity: number | null;
  createdBy: string | null;
}

export interface JobInfo {
  jobId: number | null;
  type: string | null;
  typeId: number | null;
  status: string | null;
  arrivingDate: string | null;
  completionDate: string | null;
  cost: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface TaskSummary {
  taskId: number | null;
  title: string | null;
  description: string | null;
  status: string | null;
  estimatedHours: number | null;
  completedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ServiceSummary {
  serviceId: number;
  title: string;
  description: string | null;
  category: string | null;
  imageUrl: string | null;
  estimatedHours: number | null;
  cost: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AvailableEmployee {
  id: string;
  name: string;
  skill: string;
  tasks: string;
  disabled: boolean;
}

export interface ScheduleTask {
  id: string;
  employee: string;
  task: string;
  taskId: string;
  text?: string;
}

export interface ScheduleResponse {
  weekOf: string;
  schedule: Record<string, ScheduleTask[]>;
}

export interface ReportsDataPoint {
  name?: string;
  requests?: number;
  month?: string;
  delays?: number;
  type?: string;
  value?: number;
}

export interface ReportsResponse {
  data?: Record<string, number>;
  dataList?: ReportsDataPoint[];
  averageDelayDays?: number;
  mostCommonReason?: string;
  type?: string;
}

export interface CompletionRateDataPoint {
  month: string;
  rate: number;
  completedTasks: number;
  totalTasks: number;
}

export interface CompletionRatePercentageResponse {
  chartType: string;
  title: string;
  data: CompletionRateDataPoint[];
}

export interface ApiMessageResponse {
  message: string;
  [key: string]: unknown;
}

// ============================================================================
// CUSTOMER MANAGEMENT TYPES
// ============================================================================

export interface CustomerOverview {
  totalCustomers: number;
  newThisMonth: number;
  activeCustomers: number;
  activityRate: number;
  topCustomer: {
    name: string;
    email: string;
    totalSpent: number;
    servicesUsed: number;
  };
  ratingDistribution: {
    five: number;
    four: number;
    three: number;
    below: number;
  };
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleCount: number;
  totalSpent: number;
  lastServiceDate: string;
  status: string;
}

export interface CustomerDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  memberSince: string;
  vehicleCount: number;
  totalServices: number;
  totalProjects: number;
  totalSpent: number;
  address: string;
  notes: string;
}

export interface CustomerService {
  id: string;
  serviceName: string;
  vehicleInfo: string;
  status: string;
  startDate: string;
  expectedCompletion: string;
  assignedEmployee: string;
  cost: number;
  progress: number;
  notes?: string;
}

export interface CustomerProject {
  id: string;
  projectName: string;
  description: string;
  status: string;
  startDate: string;
  expectedCompletion: string;
  progress: number;
  budget: number;
  assignedTeam: string[];
  notes?: string;
}

// ============================================================================
// MANAGER DASHBOARD API CALLS
// ============================================================================

export async function fetchDashboardOverview(): Promise<DashboardOverviewResponse> {
  return apiFetch<DashboardOverviewResponse>('/api/manager/dashboard/overview');
}

export async function fetchEmployees(): Promise<EmployeeListItem[]> {
  return apiFetch<EmployeeListItem[]>('/api/manager/employees');
}

export async function updateEmployeeStatus(
  employeeId: string,
  payload: UpdateEmployeeStatusPayload
): Promise<ApiMessageResponse> {
  return apiFetch<ApiMessageResponse>(`/api/employees/${employeeId}/status`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function fetchEmployeeHistory(employeeId: string): Promise<EmployeeHistoryEntry[]> {
  return apiFetch<EmployeeHistoryEntry[]>(`/api/employees/${employeeId}/history`);
}

export async function createSubTask(
  payload: CreateSubTaskPayload
): Promise<ApiMessageResponse> {
  return apiFetch<ApiMessageResponse>('/api/subtasks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function createService(
  payload: CreateServicePayload
): Promise<ApiMessageResponse> {
   return apiFetch<ApiMessageResponse>('/api/services', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateService(
  serviceId: number,
  payload: CreateServicePayload
): Promise<ApiMessageResponse> {
  return apiFetch<ApiMessageResponse>(`/api/services/${serviceId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteService(serviceId: number): Promise<ApiMessageResponse> {
  return apiFetch<ApiMessageResponse>(`/api/services/${serviceId}`, {
    method: 'DELETE',
  });
}

export async function fetchProjects(): Promise<ProjectBoardResponse[]> {
  return apiFetch<ProjectBoardResponse[]>('/api/manager/projects');
}

export async function fetchServices(): Promise<ServiceSummary[]> {
  return apiFetch<ServiceSummary[]>('/api/services');
}

export async function fetchAvailableEmployees(): Promise<AvailableEmployee[]> {
  return apiFetch<AvailableEmployee[]>('/api/manager/employees/available');
}

export async function fetchSchedule(
  startDate: string,
  endDate: string
): Promise<ScheduleResponse> {
  const params = new URLSearchParams({ startDate, endDate });
  return apiFetch<ScheduleResponse>(`/api/manager/schedule?${params.toString()}`);
}

export async function updateScheduleTask(
  taskId: number,
  payload: UpdateSchedulePayload
): Promise<ApiMessageResponse> {
  return apiFetch<ApiMessageResponse>(`/api/manager/schedule/task/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function autoBalanceWorkload(): Promise<ApiMessageResponse> {
  return apiFetch<ApiMessageResponse>('/api/manager/schedule/auto-balance', {
    method: 'POST',
  });
}

export async function fetchEmployeeEfficiencyReport(): Promise<ReportsResponse> {
  return apiFetch<ReportsResponse>('/api/manager/reports/employee-efficiency');
}

export async function fetchMostRequestedEmployeesReport(): Promise<ReportsResponse> {
  return apiFetch<ReportsResponse>('/api/manager/reports/most-requested-employees');
}

export async function fetchPartsDelayAnalyticsReport(): Promise<ReportsResponse> {
  return apiFetch<ReportsResponse>('/api/manager/reports/parts-delay-analytics');
}

export async function fetchCompletedProjectsByTypeReport(): Promise<ReportsResponse> {
  return apiFetch<ReportsResponse>('/api/manager/reports/completed-projects-by-type');
}

export async function fetchCompletionRateTrendReport(): Promise<CompletionRatePercentageResponse> {
  return apiFetch<CompletionRatePercentageResponse>('/api/manager/reports/completion-rate-trend');
}

// ============================================================================
// EXPORT ALL
// ============================================================================

const managerService = {
  fetchDashboardOverview,
  fetchEmployees,
  updateEmployeeStatus,
  fetchEmployeeHistory,
  createSubTask,
  createService,
  updateService,
  deleteService,
  fetchProjects,
  fetchServices,
  fetchAvailableEmployees,
  fetchSchedule,
  updateScheduleTask,
  autoBalanceWorkload,
  fetchEmployeeEfficiencyReport,
  fetchMostRequestedEmployeesReport,
  fetchPartsDelayAnalyticsReport,
  fetchCompletedProjectsByTypeReport,
  fetchCompletionRateTrendReport,
};

export default managerService;
