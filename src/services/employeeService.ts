// Employee Service - API functions for employee operations

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

// Helper function for API calls
async function apiFetch(path: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Use cookies for authentication
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Cache for employee ID to avoid repeated API calls
let cachedEmployeeId: string | null = null;
let cachedEmployeeProfile: Record<string, unknown> | null = null;

/**
 * Get employee ID from profile
 * Uses /api/employees/me which gets the current authenticated employee
 */
async function getEmployeeId(): Promise<string> {
  if (cachedEmployeeId) {
    return cachedEmployeeId;
  }

  try {
    const profile = await getMyProfile();
    cachedEmployeeId = profile.id;
    cachedEmployeeProfile = profile;
    return profile.id;
  } catch (error) {
    console.error('Error getting employee ID:', error);
    throw new Error('Failed to get employee ID. Please ensure you are logged in.');
  }
}

// ============================================================================
// TASKS ENDPOINTS
// ============================================================================

/**
 * GET /api/tasks/calendar/{employeeId}
 * Get calendar events for date range
 * Backend expects LocalDateTime format (ISO_DATE_TIME)
 */
export const getCalendarEvents = async (startDate: Date, endDate: Date) => {
  const employeeId = await getEmployeeId();
  // Format as ISO date-time string for LocalDateTime
  const start = startDate.toISOString();
  const end = endDate.toISOString();
  return apiFetch(`/api/tasks/calendar/${employeeId}?startDate=${encodeURIComponent(start)}&endDate=${encodeURIComponent(end)}`);
};

/**
 * GET /api/tasks/employee/{employeeId}
 * Get assigned tasks
 */
export const getAssignedTasks = async (status?: string) => {
  const employeeId = await getEmployeeId();
  const url = `/api/tasks/employee/${employeeId}${status ? `?status=${status}` : ''}`;
  return apiFetch(url);
};

/**
 * GET /api/tasks/dashboard-summary
 * Get dashboard summary (uses auth context)
 */
export const getDashboardSummary = async () => {
  return apiFetch('/api/tasks/dashboard-summary');
};

/**
 * GET /api/v1/tasks/{taskId}
 * Get single task details
 * Note: This uses TaskController which returns the full Task entity
 */
export const getTaskById = async (taskId: string) => {
  return apiFetch(`/api/v1/tasks/${taskId}`);
};

/**
 * POST /api/tasks/{taskId}/start
 * Start a task
 */
export const startTask = async (taskId: string) => {
  return apiFetch(`/api/tasks/${taskId}/start`, { method: 'POST' });
};

/**
 * POST /api/tasks/{taskId}/pause
 * Pause a task
 */
export const pauseTask = async (taskId: string, reason: string, notes?: string) => {
  return apiFetch(`/api/tasks/${taskId}/pause`, {
    method: 'POST',
    body: JSON.stringify({ reason, notes }),
  });
};

/**
 * POST /api/tasks/{taskId}/resume
 * Resume a task
 */
export const resumeTask = async (taskId: string) => {
  return apiFetch(`/api/tasks/${taskId}/resume`, { method: 'POST' });
};

/**
 * POST /api/tasks/{taskId}/complete
 * Complete a task
 */
export const completeTask = async (taskId: string) => {
  return apiFetch(`/api/tasks/${taskId}/complete`, { method: 'POST' });
};

// ============================================================================
// TIME LOGS ENDPOINTS
// ============================================================================

/**
 * GET /api/timelogs/employee/{employeeId}
 * Get time logs for employee
 * dateRange can be "week", "month", or "2024-01-01,2024-01-31"
 */
export const getTimeLogs = async (dateRange?: string) => {
  const employeeId = await getEmployeeId();
  const url = `/api/timelogs/employee/${employeeId}${dateRange ? `?dateRange=${dateRange}` : ''}`;
  return apiFetch(url);
};

/**
 * GET /api/timelogs/weekly-total
 * Get weekly total hours (uses auth context)
 */
export const getWeeklyTotalHours = async () => {
  return apiFetch('/api/timelogs/weekly-total');
};

/**
 * POST /api/timelogs
 * Add New Manual Log
 * Allows an employee to manually submit a time log entry
 */
export const createManualTimeLog = async (logData: {
  taskId: number;
  startTime: string; // ISO date-time string
  endTime: string; // ISO date-time string
  remarks?: string;
}) => {
  return apiFetch('/api/timelogs', {
    method: 'POST',
    body: JSON.stringify(logData),
  });
};

/**
 * PUT /api/timelogs/{logId}/remarks
 * Update remarks/description for a time log
 */
export const updateTimeLogRemarks = async (logId: string, remarks: string) => {
  return apiFetch(`/api/timelogs/${logId}/remarks`, {
    method: 'PUT',
    body: JSON.stringify({ remarks }),
  });
};

// ============================================================================
// PERFORMANCE ENDPOINTS
// ============================================================================

/**
 * GET /api/performance/earnings/{employeeId}
 * Get monthly earnings breakdown
 */
export const getMonthlyEarnings = async () => {
  const employeeId = await getEmployeeId();
  return apiFetch(`/api/performance/earnings/${employeeId}`);
};

/**
 * GET /api/performance/demand-meter/{employeeId}
 * Get demand meter status
 */
export const getDemandMeterStatus = async () => {
  const employeeId = await getEmployeeId();
  return apiFetch(`/api/performance/demand-meter/${employeeId}`);
};

/**
 * GET /api/performance/charts/{employeeId}
 * Get all chart data
 */
export const getChartsData = async () => {
  const employeeId = await getEmployeeId();
  return apiFetch(`/api/performance/charts/${employeeId}`);
};

// ============================================================================
// PROFILE ENDPOINTS
// ============================================================================

/**
 * GET /api/employees/me
 * Get current employee profile (uses auth context)
 */
export const getMyProfile = async () => {
  if (cachedEmployeeProfile) {
    return cachedEmployeeProfile;
  }
  const profile = await apiFetch('/api/employees/me');
  cachedEmployeeProfile = profile;
  if (profile.id) {
    cachedEmployeeId = profile.id;
  }
  return profile;
};

/**
 * PUT /api/employees/me
 * Update employee profile
 */
export const updateMyProfile = async (profileData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  profileImageUrl?: string;
}) => {
  const updated = await apiFetch('/api/employees/me', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
  // Clear cache to force refresh
  cachedEmployeeProfile = null;
  cachedEmployeeId = null;
  return updated;
};

/**
 * GET /api/employees/notifications
 * Get employee notifications (uses auth context)
 */
export const getMyNotifications = async () => {
  return apiFetch('/api/employees/notifications');
};

/**
 * Clear cached employee data (useful on logout)
 */
export const clearEmployeeCache = () => {
  cachedEmployeeId = null;
  cachedEmployeeProfile = null;
};

