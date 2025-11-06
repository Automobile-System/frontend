// Manager Service - API functions for manager operations

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

// Helper function for API calls
async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    credentials: 'include',
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

// ============================================================================
// TYPES AND INTERFACES
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
  address?: string;
  notes?: string;
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
  progress?: number;
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
  assignedTeam?: string[];
  notes?: string;
}

export interface AddCustomerRequest {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface UpdateCustomerRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  vin: string;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: string;
  serviceId: string;
  description: string;
}

export interface SpendingAnalytics {
  totalSpent: number;
  averagePerService: number;
  monthlySpending: Array<{ month: string; amount: number }>;
  categoryBreakdown: Record<string, number>;
}

export interface SatisfactionMetrics {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<string, number>;
  recentFeedback: Array<{
    date: string;
    rating: number;
    comment: string;
    serviceId: string;
  }>;
}

// ============================================================================
// CUSTOMER OVERVIEW & STATISTICS
// ============================================================================

/**
 * Fetch customer overview statistics
 * GET /api/manager/customers/overview
 */
export async function fetchCustomerOverview(): Promise<CustomerOverview> {
  return apiFetch('/api/manager/customers/overview');
}

// ============================================================================
// CUSTOMER LIST & MANAGEMENT
// ============================================================================

/**
 * Fetch list of all customers
 * GET /api/manager/customers/list
 */
export async function fetchCustomerList(): Promise<Customer[]> {
  return apiFetch('/api/manager/customers/list');
}

/**
 * Search customers by query
 * GET /api/manager/customers/search?q={query}
 */
export async function searchCustomers(query: string): Promise<Customer[]> {
  return apiFetch(`/api/manager/customers/search?q=${encodeURIComponent(query)}`);
}

/**
 * Filter customers by status
 * GET /api/manager/customers/filter?status={status}
 */
export async function filterCustomersByStatus(status: string): Promise<Customer[]> {
  return apiFetch(`/api/manager/customers/filter?status=${encodeURIComponent(status)}`);
}

/**
 * Add a new customer
 * POST /api/manager/customers
 */
export async function addCustomer(customerData: AddCustomerRequest): Promise<Customer> {
  return apiFetch('/api/manager/customers', {
    method: 'POST',
    body: JSON.stringify(customerData),
  });
}

/**
 * Update customer status (Active/Inactive)
 * PUT /api/manager/customers/:id/status
 */
export async function updateCustomerStatus(
  customerId: string,
  newStatus: string
): Promise<Customer> {
  return apiFetch(`/api/manager/customers/${customerId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: newStatus }),
  });
}

/**
 * Update customer information
 * PUT /api/manager/customers/:id
 */
export async function updateCustomer(
  customerId: string,
  customerData: UpdateCustomerRequest
): Promise<Customer> {
  return apiFetch(`/api/manager/customers/${customerId}`, {
    method: 'PUT',
    body: JSON.stringify(customerData),
  });
}

/**
 * Delete a customer
 * DELETE /api/manager/customers/:id
 */
export async function deleteCustomer(customerId: string): Promise<{ message: string }> {
  return apiFetch(`/api/manager/customers/${customerId}`, {
    method: 'DELETE',
  });
}

// ============================================================================
// CUSTOMER DETAILS
// ============================================================================

/**
 * Fetch detailed information about a specific customer
 * GET /api/manager/customers/:id
 */
export async function fetchCustomerDetails(customerId: string): Promise<CustomerDetails> {
  return apiFetch(`/api/manager/customers/${customerId}`);
}

// ============================================================================
// CUSTOMER ACTIVE SERVICES & PROJECTS
// ============================================================================

/**
 * Fetch customer's currently active services
 * GET /api/manager/customers/:id/services/active
 */
export async function fetchCustomerActiveServices(customerId: string): Promise<CustomerService[]> {
  return apiFetch(`/api/manager/customers/${customerId}/services/active`);
}

/**
 * Fetch customer's currently active projects
 * GET /api/manager/customers/:id/projects/active
 */
export async function fetchCustomerActiveProjects(customerId: string): Promise<CustomerProject[]> {
  return apiFetch(`/api/manager/customers/${customerId}/projects/active`);
}

// ============================================================================
// CUSTOMER HISTORY
// ============================================================================

/**
 * Fetch customer's complete service history
 * GET /api/manager/customers/:id/services/history
 */
export async function fetchCustomerServiceHistory(customerId: string): Promise<CustomerService[]> {
  return apiFetch(`/api/manager/customers/${customerId}/services/history`);
}

/**
 * Fetch customer's complete project history
 * GET /api/manager/customers/:id/projects/history
 */
export async function fetchCustomerProjectHistory(customerId: string): Promise<CustomerProject[]> {
  return apiFetch(`/api/manager/customers/${customerId}/projects/history`);
}

/**
 * Fetch customer's vehicles
 * GET /api/manager/customers/:id/vehicles
 */
export async function fetchCustomerVehicles(customerId: string): Promise<Vehicle[]> {
  return apiFetch(`/api/manager/customers/${customerId}/vehicles`);
}

/**
 * Fetch customer's payment history
 * GET /api/manager/customers/:id/payments
 */
export async function fetchCustomerPayments(customerId: string): Promise<Payment[]> {
  return apiFetch(`/api/manager/customers/${customerId}/payments`);
}

// ============================================================================
// CUSTOMER ANALYTICS
// ============================================================================

/**
 * Fetch customer spending analytics
 * GET /api/manager/customers/:id/analytics/spending
 */
export async function fetchCustomerSpendingAnalytics(customerId: string): Promise<SpendingAnalytics> {
  return apiFetch(`/api/manager/customers/${customerId}/analytics/spending`);
}

/**
 * Fetch customer satisfaction metrics
 * GET /api/manager/customers/:id/analytics/satisfaction
 */
export async function fetchCustomerSatisfactionMetrics(customerId: string): Promise<SatisfactionMetrics> {
  return apiFetch(`/api/manager/customers/${customerId}/analytics/satisfaction`);
}

// ============================================================================
// EXPORT ALL
// ============================================================================

const managerService = {
  // Overview
  fetchCustomerOverview,
  
  // List & Management
  fetchCustomerList,
  searchCustomers,
  filterCustomersByStatus,
  addCustomer,
  updateCustomerStatus,
  updateCustomer,
  deleteCustomer,
  
  // Details
  fetchCustomerDetails,
  
  // Active
  fetchCustomerActiveServices,
  fetchCustomerActiveProjects,
  
  // History
  fetchCustomerServiceHistory,
  fetchCustomerProjectHistory,
  fetchCustomerVehicles,
  fetchCustomerPayments,
  
  // Analytics
  fetchCustomerSpendingAnalytics,
  fetchCustomerSatisfactionMetrics,
};

export default managerService;
