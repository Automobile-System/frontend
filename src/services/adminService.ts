/**
 * ============================================================================
 * ADMIN API SERVICE
 * ============================================================================
 * Centralized API service for all admin panel endpoints
 * All endpoints require JWT authentication via Bearer token
 * 
 * Documentation: See API_DOCUMENTATION.md for complete API reference
 * ============================================================================
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// --- Common/Shared Types ---
export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type?: 'system' | 'security' | 'approval'
}

export interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

// --- Dashboard Page Types ---
export interface DashboardStats {
  profitThisMonth: {
    value: string
    change: string
    percentage: number
  }
  activeCustomers: {
    value: number
    newThisMonth: number
  }
  ongoingServices: {
    value: number
    status: string
  }
  activeEmployees: {
    value: number
    onLeave: number
    frozen: number
  }
}

export interface AIInsight {
  id: string
  title: string
  description: string
  category: 'forecast' | 'projection' | 'warning' | 'recommendation'
  icon: string
}

// --- Financial Reports Page Types ---
export interface ServiceTypeBreakdown {
  serviceType: string
  revenue: number
  cost: number
  profit: number
  margin: number
  trend: number
}

export interface FinancialTotals {
  totalRevenue: number
  totalCost: number
  totalProfit: number
  overallMargin: number
  overallTrend: number
}

export interface FinancialReport {
  breakdown: ServiceTypeBreakdown[]
  totals: FinancialTotals
  period: {
    startDate: string
    endDate: string
  }
}

// --- Workforce Overview Page Types ---
export interface WorkforceStats {
  totalEmployees: number
  activeEmployees: number
  onLeave: number
  frozen: number
  avgRating: number
  ratingChange: number
  avgWorkload: number
  avgSalary: string
}

export interface CenterInfo {
  totalCenters: number
  activeManagers: number
  minimumManagers: number
  totalEmployees: number
}

export interface OverloadedEmployee {
  name: string
  specialization: string
  capacityPercentage: number
  activeTasks: number
  maxTasks: number
}

export interface WorkforceOverview {
  stats: WorkforceStats
  centerInfo: CenterInfo
  overloadedEmployee?: OverloadedEmployee
}

export interface TopEmployee {
  id: string
  name: string
  specialization: string
  rating: number
  rewardEligible: boolean
  overloaded: boolean
}

export interface ManagerPerformance {
  id: string
  name: string
  tasksAssigned: number
  completionRate: number
  avgEmployeeRating: number
  status: 'Active' | 'Under Review'
}

export interface Manager {
  id: string
  name: string
  email: string
  phone: string
  joinDate: string
  status: 'Active' | 'Under Review' | 'Frozen'
}

export interface Employee {
  id: string
  name: string
  specialization: string
  email: string
  phone: string
  rating: number
  status: 'Active' | 'On Leave' | 'Frozen'
}

// --- Services Analytics Page Types ---
export interface MostProfitableService {
  name: string
  profit: number
  margin: number
}

export interface TotalServicesData {
  totalServicesMonth: number
  changeFromLastMonth: number
}

export interface PartsReplacedData {
  partsReplaced: number
  partsUsageRate: number
}

export interface CustomerRetentionData {
  customerRetention: number
  retentionImprovement: number
}

export interface ServicePerformance {
  id: string
  name: string
  totalBookings: number
  avgDuration: string
  profitPerService: number
  customerRating: number
  trend: number
}

export interface ServicesAnalytics {
  summary: {
    mostProfitableService: MostProfitableService
    totalServicesMonth: number
    changeFromLastMonth: number
    partsReplaced: number
    partsUsageRate: number
    customerRetention: number
    retentionImprovement: number
  }
  servicePerformance: ServicePerformance[]
}

// --- AI Insights Page Types ---
export interface ServiceBreakdown {
  serviceName: string
  percentageChange: number
}

export interface DemandForecast {
  overallIncrease: number
  forecastMonth: string
  projectedBookings: number
  changeFromPrevious: number
  previousMonth: string
  serviceBreakdown: ServiceBreakdown[]
  hiringRecommendation: {
    totalMechanics: number
    breakdown: string[]
  }
}

export interface MonthlyProfit {
  month: string
  profit: string
}

export interface ProfitProjection {
  monthOverMonthGrowth: number
  trajectory: MonthlyProfit[]
  yearEndTarget: {
    monthlyProfit: string
    date: string
    annualGrowth: number
  }
  optimizationTip: string
}

export interface UnderperformingDepartment {
  departmentName: string
  slowerCompletion: number
  avgCompletionTime: number
  targetTime: number
  rootCause: string
  managerOversight: {
    name: string
    score: number
    threshold: number
  }
  recommendation: string
}

export interface SkillShortagePrediction {
  skillArea: string
  demandIncrease: number
  availableEmployees: number
  crisisWeeks: number
  impactForecast: {
    delayedCustomers: string
    month: string
    revenueLoss: number
  }
  actionPlan: string[]
}

// --- Security Page Types ---
export interface SecurityAlert {
  id: string
  title: string
  description: string
  severity: "HIGH" | "MEDIUM" | "LOW"
  date: string
  employeeName?: string
  amount?: number
}

export interface FraudLogEntry {
  id: string
  date: string
  type: string
  person: string
  amount: number
  severity: "HIGH" | "MEDIUM" | "LOW"
  status: "Under Review" | "Resolved" | "Pending"
}

export interface ManagerWarning {
  managerId: string
  managerName: string
  warningsIssued: number
  lastWarningDate: string
  reason: string
  status: "On Probation" | "Under Investigation" | "Warning Issued"
}

export interface PolicyCompliance {
  complianceRate: number
  lastAuditDate: string
  auditStatus: "Passed" | "Failed" | "Pending"
  aiSystemStatus: string
}

// --- Settings Page Types ---
export interface RolePermission {
  roleId: string
  roleName: string
  userCount: number
  permissions: string
  status: "Active" | "Inactive"
}

export interface ServicePricing {
  serviceId: string
  serviceName: string
  basePrice: number
  duration: string
  requiredSkill: string
  status: "Active" | "Inactive"
}

export interface TaskLimits {
  maxTasksPerDay: number
  overloadThreshold: number
}

export interface CompensationRules {
  baseSalary: number
  demandBonusPercentage: number
  exampleBonus: number
  exampleTotal: number
}

// --- Customer Details Page Types ---
export interface CustomerOverview {
  totalCustomers: number
  newThisMonth: number
  activeCustomers: number
  activityRate: number
  topCustomer: {
    name: string
    email: string
    totalSpent: number
    servicesUsed: number
  }
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  vehicleCount: number
  totalSpent: number
  lastServiceDate: string
  status: "Active" | "Inactive"
}

export interface AddCustomerRequest {
  name: string
  email: string
  phone: string
}

// ============================================================================
// COMMON/SHARED ENDPOINTS (Used across multiple pages)
// ============================================================================

/**
 * AUTH: Logout user
 * Used in: Header (all pages)
 * Backend: POST /api/auth/logout
 */
export const logoutUser = async (): Promise<void> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/auth/logout', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   },
    // })
    // if (!response.ok) throw new Error('Logout failed')
    
    console.log('API: Logout endpoint called')
    
    // Clear authentication data
    localStorage.removeItem('authToken')
    localStorage.removeItem('userProfile')
    
    // Redirect to login page
    window.location.href = '/login'
  } catch (error) {
    console.error('Logout failed:', error)
    throw error
  }
}

/**
 * NOTIFICATIONS: Fetch all notifications
 * Used in: Header notification dropdown (all pages)
 * Backend: GET /api/notifications
 */
export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/notifications', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // return await response.json()
    
    console.log('API: Fetch notifications endpoint called')
    
    // Dummy data
    return [
      {
        id: '1',
        title: 'System Alert',
        message: 'Employee "Kamal Perera" at maximum workload capacity',
        time: '2 hours ago',
        read: false,
        type: 'system'
      },
      {
        id: '2',
        title: 'Security Alert',
        message: 'Suspicious payment pattern detected - Review needed',
        time: '4 hours ago',
        read: false,
        type: 'security'
      },
      {
        id: '3',
        title: 'Pending Approval',
        message: '2 managers pending large project budget approval',
        time: '6 hours ago',
        read: false,
        type: 'approval'
      }
    ]
  } catch (error) {
    console.error('Failed to fetch notifications:', error)
    throw error
  }
}

/**
 * NOTIFICATIONS: Mark notification as read
 * Used in: Header notification dropdown (all pages)
 * Backend: PUT /api/notifications/:id/read
 */
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/notifications/${notificationId}/read`, {
    //   method: 'PUT',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to mark as read')
    
    console.log(`API: Mark notification ${notificationId} as read`)
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
    throw error
  }
}

/**
 * NOTIFICATIONS: Delete notification
 * Used in: Header notification dropdown (all pages)
 * Backend: DELETE /api/notifications/:id
 */
export const deleteNotification = async (notificationId: string): Promise<void> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/notifications/${notificationId}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to delete notification')
    
    console.log(`API: Delete notification ${notificationId}`)
  } catch (error) {
    console.error('Failed to delete notification:', error)
    throw error
  }
}

/**
 * USER PROFILE: Fetch current user profile
 * Used in: Header profile dropdown (all pages)
 * Backend: GET /api/user/profile
 */
export const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/user/profile', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // return await response.json()
    
    console.log('API: Fetch user profile endpoint called')
    
    // Dummy data
    return {
      id: '1',
      name: 'Admin User',
      email: 'admin@center.com',
      role: 'admin'
    }
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    throw error
  }
}

/**
 * USER PROFILE: Update user profile
 * Used in: Profile settings modal (all pages)
 * Backend: PUT /api/user/profile
 */
export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/user/profile', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   },
    //   body: JSON.stringify(profileData)
    // })
    // return await response.json()
    
    console.log('API: Update user profile endpoint called', profileData)
    
    // Return updated dummy data
    return {
      id: '1',
      name: profileData.name || 'Admin User',
      email: profileData.email || 'admin@center.com',
      role: 'admin'
    }
  } catch (error) {
    console.error('Failed to update user profile:', error)
    throw error
  }
}

/**
 * USER SETTINGS: Fetch user settings
 * Used in: Settings modal (all pages)
 * Backend: GET /api/user/settings
 */
export const fetchUserSettings = async () => {
  try {
    // TODO: Replace with actual API call
    console.log('API: Fetch user settings endpoint called')
    
    return {
      notifications: true,
      emailAlerts: true,
      theme: 'light'
    }
  } catch (error) {
    console.error('Failed to fetch user settings:', error)
    throw error
  }
}

/**
 * USER SETTINGS: Update user settings
 * Used in: Settings modal (all pages)
 * Backend: PUT /api/user/settings
 */
export const updateUserSettings = async (settings: Record<string, unknown>) => {
  try {
    // TODO: Replace with actual API call
    console.log('API: Update user settings endpoint called', settings)
    
    return settings
  } catch (error) {
    console.error('Failed to update user settings:', error)
    throw error
  }
}

// ============================================================================
// PAGE 1: DASHBOARD (/admin/dashboard)
// ============================================================================

// ============================================================================
// PAGE 1: DASHBOARD (/admin/dashboard)
// ============================================================================

/**
 * DASHBOARD: Fetch dashboard statistics
 * Backend: GET /api/admin/dashboard/stats
 */
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/admin/dashboard/stats', {
    //   headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    // })
    // return await response.json()
    
    console.log('API: Fetch dashboard stats')
    return {
      profitThisMonth: {
        value: "LKR 1.8M",
        change: "12% from last month",
        percentage: 12
      },
      activeCustomers: {
        value: 312,
        newThisMonth: 23
      },
      ongoingServices: {
        value: 23,
        status: "In Progress"
      },
      activeEmployees: {
        value: 27,
        onLeave: 2,
        frozen: 1
      }
    }
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    throw error
  }
}

/**
 * DASHBOARD: Fetch AI-powered insights
 * Backend: GET /api/admin/dashboard/ai-insights
 */
export const fetchAIInsights = async (): Promise<AIInsight[]> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/admin/dashboard/ai-insights', {
    //   headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    // })
    // return await response.json()
    
    console.log('API: Fetch AI insights')
    return [
      {
        id: '1',
        title: 'Next Month Demand Forecast',
        description: '15% increase expected in November. AI recommends hiring 2 more mechanics specializing in Engine Services.',
        category: 'forecast',
        icon: 'trending-up'
      },
      {
        id: '2',
        title: 'Profit Projection Curve',
        description: 'If current trend continues, monthly profit will reach LKR 2.1M by end of Q4 2025. 18% growth trajectory maintained.',
        category: 'projection',
        icon: 'dollar-sign'
      },
      {
        id: '3',
        title: 'Underperforming Department Warning',
        description: 'Brake service department showing 20% slower completion rate. Investigate workload distribution or skill gaps.',
        category: 'warning',
        icon: 'alert'
      },
      {
        id: '4',
        title: 'Skill Shortage Prediction',
        description: 'Electrical diagnostics demand up 35%. Current workforce may struggle in 2 months. Consider training or hiring.',
        category: 'recommendation',
        icon: 'target'
      }
    ]
  } catch (error) {
    console.error('Failed to fetch AI insights:', error)
    throw error
  }
}

// ============================================================================
// PAGE 2: FINANCIAL REPORTS (/admin/finacialReports)
// ============================================================================

/**
 * FINANCIAL REPORTS: Get financial breakdown by service type
 * Used in: Financial Reports Page
 * Backend: GET /api/admin/financial-reports?serviceFilter={filter}&startDate={date}&endDate={date}
 */
export const fetchFinancialReports = async (
  serviceFilter: string,
  startDate: string,
  endDate: string
): Promise<FinancialReport> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(
    //   `/api/admin/financial-reports?serviceFilter=${serviceFilter}&startDate=${startDate}&endDate=${endDate}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${getAuthToken()}`
    //     }
    //   }
    // )
    // if (!response.ok) throw new Error('Failed to fetch financial reports')
    // return await response.json()

    // Mock data for development
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      breakdown: [
        {
          serviceType: 'Oil Changes',
          revenue: 450000,
          cost: 180000,
          profit: 270000,
          margin: 60,
          trend: 8
        },
        {
          serviceType: 'Brake Services',
          revenue: 380000,
          cost: 190000,
          profit: 190000,
          margin: 50,
          trend: -3
        },
        {
          serviceType: 'Engine Services',
          revenue: 620000,
          cost: 310000,
          profit: 310000,
          margin: 50,
          trend: 12
        },
        {
          serviceType: 'Electrical Diagnostics',
          revenue: 280000,
          cost: 140000,
          profit: 140000,
          margin: 50,
          trend: 15
        },
        {
          serviceType: 'Custom Projects',
          revenue: 970000,
          cost: 582000,
          profit: 388000,
          margin: 40,
          trend: 6
        }
      ],
      totals: {
        totalRevenue: 2700000,
        totalCost: 1402000,
        totalProfit: 1298000,
        overallMargin: 48,
        overallTrend: 9
      },
      period: {
        startDate,
        endDate
      }
    }
  } catch (error) {
    console.error('Error fetching financial reports:', error)
    throw error
  }
}

// ============================================================================
// PAGE 3: WORKFORCE OVERVIEW (/admin/workforceOverview)
// ============================================================================

/**
 * WORKFORCE: Get workforce overview stats
 * Used in: Workforce Overview Page
 * Backend: GET /api/admin/workforce/overview
 */
export const fetchWorkforceOverview = async (): Promise<WorkforceOverview> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
    const token = localStorage.getItem('authToken')
    
    const response = await fetch(`${baseUrl}/api/admin/workforce/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch workforce overview')
    }
    
    const data = await response.json()
    
    // Map backend fields to frontend interface with flexible field mapping
    return {
      stats: {
        totalEmployees: data.stats?.totalEmployees || data.stats?.total || 0,
        activeEmployees: data.stats?.activeEmployees || data.stats?.active || 0,
        onLeave: data.stats?.onLeave || data.stats?.leave || 0,
        frozen: data.stats?.frozen || data.stats?.frozenEmployees || 0,
        avgRating: data.stats?.avgRating || data.stats?.averageRating || data.stats?.rating || 0,
        ratingChange: data.stats?.ratingChange || data.stats?.ratingDelta || 0,
        avgWorkload: data.stats?.avgWorkload || data.stats?.averageWorkload || data.stats?.workload || 0,
        avgSalary: data.stats?.avgSalary || data.stats?.averageSalary || data.stats?.salary || '0K'
      },
      centerInfo: {
        totalCenters: data.centerInfo?.totalCenters || data.centerInfo?.centers || 1,
        activeManagers: data.centerInfo?.activeManagers || data.centerInfo?.managers || 0,
        minimumManagers: data.centerInfo?.minimumManagers || data.centerInfo?.minManagers || 1,
        totalEmployees: data.centerInfo?.totalEmployees || data.centerInfo?.employees || 0
      },
      overloadedEmployee: data.overloadedEmployee ? {
        name: data.overloadedEmployee.name || `${data.overloadedEmployee.firstName || ''} ${data.overloadedEmployee.lastName || ''}`.trim(),
        specialization: data.overloadedEmployee.specialization || data.overloadedEmployee.specialty || data.overloadedEmployee.skill || data.overloadedEmployee.jobType || 'N/A',
        capacityPercentage: data.overloadedEmployee.capacityPercentage || data.overloadedEmployee.capacity || 100,
        activeTasks: data.overloadedEmployee.activeTasks || data.overloadedEmployee.tasks || data.overloadedEmployee.currentTasks || 0,
        maxTasks: data.overloadedEmployee.maxTasks || data.overloadedEmployee.maximumTasks || data.overloadedEmployee.taskLimit || 5
      } : undefined
    }
  } catch (error) {
    console.error('Error fetching workforce overview:', error)
    throw error
  }
}

/**
 * WORKFORCE: Get top employees by rating
 * Used in: Workforce Overview Page
 * Backend: GET /api/admin/workforce/top-employees
 */
export const fetchTopEmployees = async (): Promise<TopEmployee[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
    const response = await fetch(`${baseUrl}/api/admin/workforce/top-employees`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch top employees: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Map backend response to TopEmployee interface
    return Array.isArray(data) ? data.map((item: Record<string, unknown>) => ({
      id: String(item.id || item.employeeId || item.empId || ''),
      name: String(item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || ''),
      specialization: String(item.specialization || item.specialty || item.skill || '-'),
      rating: Number(item.rating || item.employeeRating || 0),
      rewardEligible: Boolean(item.rewardEligible ?? item.eligible ?? true),
      overloaded: Boolean(item.overloaded ?? item.isOverloaded ?? false)
    })) : []
  } catch (error) {
    console.error('Error fetching top employees:', error)
    throw error
  }
}

/**
 * WORKFORCE: Get manager performance summary
 * Used in: Workforce Overview Page
 * Backend: GET /api/admin/workforce/manager-performance
 */
export const fetchManagerPerformance = async (): Promise<ManagerPerformance[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
    const response = await fetch(`${baseUrl}/api/admin/workforce/manager-performance`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch manager performance: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Map backend response to ManagerPerformance interface
    return Array.isArray(data) ? data.map((item: Record<string, unknown>) => ({
      id: String(item.id || item.managerId || item.empId || ''),
      name: String(item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || ''),
      tasksAssigned: Number(item.tasksAssigned || item.totalTasks || 0),
      completionRate: Number(item.completionRate || item.completionPercentage || 0),
      avgEmployeeRating: Number(item.avgEmployeeRating || item.averageRating || item.rating || 0),
      status: (item.status === 'Under Review' ? 'Under Review' : 'Active') as 'Active' | 'Under Review'
    })) : []
  } catch (error) {
    console.error('Error fetching manager performance:', error)
    throw error
  }
}

/**
 * WORKFORCE: Get all managers
 * Used in: Workforce Overview Page
 * Backend: GET /api/admin/workforce/managers
 */
export const fetchAllManagers = async (): Promise<Manager[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
    const response = await fetch(`${baseUrl}/api/admin/workforce/managers`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch managers: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Map backend response to Manager interface
    return Array.isArray(data) ? data.map((item: Record<string, unknown>) => {
      const status = String(item.status || 'Active');
      const validStatus: 'Active' | 'Under Review' | 'Frozen' = 
        status === 'Under Review' ? 'Under Review' : 
        status === 'Frozen' ? 'Frozen' : 'Active';
      
      return {
        id: String(item.id || item.managerId || item.employeeId || ''),
        name: String(item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || ''),
        email: String(item.email || ''),
        phone: String(item.phone || item.phoneNumber || ''),
        joinDate: String(item.joinDate || item.createdAt || item.hireDate || '-'),
        status: validStatus
      };
    }) : []
  } catch (error) {
    console.error('Error fetching all managers:', error)
    throw error
  }
}

/**
 * WORKFORCE: Get all employees
 * Used in: Workforce Overview Page
 * Backend: GET /api/admin/workforce/employees
 */
export const fetchAllEmployees = async (): Promise<Employee[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
    const response = await fetch(`${baseUrl}/api/admin/workforce/employees`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch employees: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Map backend response to Employee interface
    return Array.isArray(data) ? data.map((item: Record<string, unknown>) => {
      const status = String(item.status || 'Active');
      const validStatus: 'Active' | 'Frozen' | 'On Leave' = 
        status === 'Frozen' ? 'Frozen' : 
        status === 'On Leave' ? 'On Leave' : 'Active';
      
      return {
        id: String(item.id || item.employeeId || item.empId || ''),
        name: String(item.name || `${item.firstName || ''} ${item.lastName || ''}`.trim() || ''),
        specialization: String(item.specialization || item.specialty || item.skill || item.jobType || '-'),
        email: String(item.email || ''),
        phone: String(item.phone || item.phoneNumber || item.contact || ''),
        rating: Number(item.rating || item.employeeRating || 0),
        status: validStatus
      };
    }) : []
  } catch (error) {
    console.error('Error fetching all employees:', error)
    throw error
  }
}

/**
 * WORKFORCE: Add new manager
 * Used in: Workforce Overview Page
 * Backend: POST /api/admin/workforce/managers
 */
export interface AddManagerRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  managerId: string
  joinDate: string
  username: string
  password: string
  address?: string
}

export const addManager = async (data: AddManagerRequest): Promise<{ success: boolean; message: string; manager: Manager }> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    const response = await fetch(`${API_BASE_URL}/api/admin/workforce/managers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to add manager' }))
      throw new Error(error.message || 'Failed to add manager')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error adding manager:', error)
    throw error
  }
}

/**
 * WORKFORCE: Add new employee
 * Used in: Workforce Overview Page
 * Backend: POST /api/admin/workforce/employees
 */
export interface AddEmployeeRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  employeeId: string
  specialization: string
  joinDate: string
  salary: string
  username: string
  password: string
  experience?: string
  address?: string
}

export const addEmployee = async (data: AddEmployeeRequest): Promise<{ success: boolean; message: string; employee: Employee }> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    const response = await fetch(`${API_BASE_URL}/api/admin/workforce/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to add employee' }))
      throw new Error(error.message || 'Failed to add employee')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error adding employee:', error)
    throw error
  }
}

/**
 * WORKFORCE: Update manager
 * Used in: Workforce Overview Page
 * Backend: PUT /api/admin/workforce/managers/:id
 */
export const updateManager = async (managerId: string, data: Partial<AddManagerRequest>): Promise<{ success: boolean; message: string }> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/admin/workforce/managers/${managerId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${getAuthToken()}`
    //   },
    //   body: JSON.stringify(data)
    // })
    // if (!response.ok) throw new Error('Failed to update manager')
    // return await response.json()

    // Mock data for development
    await new Promise(resolve => setTimeout(resolve, 800))
    console.log('Update manager data:', data) // Log for development
    return {
      success: true,
      message: `Manager ${managerId} updated successfully.`
    }
  } catch (error) {
    console.error('Error updating manager:', error)
    throw error
  }
}

/**
 * WORKFORCE: Update employee
 * Used in: Workforce Overview Page
 * Backend: PUT /api/admin/workforce/employees/:id
 */
export const updateEmployee = async (employeeId: string, data: Partial<AddEmployeeRequest>): Promise<{ success: boolean; message: string }> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/admin/workforce/employees/${employeeId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${getAuthToken()}`
    //   },
    //   body: JSON.stringify(data)
    // })
    // if (!response.ok) throw new Error('Failed to update employee')
    // return await response.json()

    // Mock data for development
    await new Promise(resolve => setTimeout(resolve, 800))
    console.log('Update employee data:', data) // Log for development
    return {
      success: true,
      message: `Employee ${employeeId} updated successfully.`
    }
  } catch (error) {
    console.error('Error updating employee:', error)
    throw error
  }
}

/**
 * WORKFORCE: Freeze manager
 * Used in: Workforce Overview Page
 * Backend: PUT /api/admin/workforce/managers/:id/freeze
 */
export const freezeManager = async (managerId: string): Promise<{ success: boolean; message: string }> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/admin/workforce/managers/${managerId}/freeze`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${getAuthToken()}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to freeze manager')
    // return await response.json()

    // Mock data for development
    await new Promise(resolve => setTimeout(resolve, 800))
    return {
      success: true,
      message: `Manager ${managerId} has been frozen. They can no longer access the system.`
    }
  } catch (error) {
    console.error('Error freezing manager:', error)
    throw error
  }
}

/**
 * WORKFORCE: Freeze employee
 * Used in: Workforce Overview Page
 * Backend: PUT /api/admin/workforce/employees/:id/freeze
 */
export const freezeEmployee = async (employeeId: string): Promise<{ success: boolean; message: string }> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/admin/workforce/employees/${employeeId}/freeze`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${getAuthToken()}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to freeze employee')
    // return await response.json()

    // Mock data for development
    await new Promise(resolve => setTimeout(resolve, 800))
    return {
      success: true,
      message: `Employee ${employeeId} has been frozen. They can no longer access the system.`
    }
  } catch (error) {
    console.error('Error freezing employee:', error)
    throw error
  }
}

/**
 * WORKFORCE: Activate employee
 * Used in: Workforce Overview Page
 * Backend: PUT /api/admin/workforce/employees/:id/activate
 */
export const activateEmployee = async (employeeId: string): Promise<{ success: boolean; message: string }> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/admin/workforce/employees/${employeeId}/activate`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${getAuthToken()}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to activate employee')
    // return await response.json()

    // Mock data for development
    await new Promise(resolve => setTimeout(resolve, 800))
    return {
      success: true,
      message: `Employee ${employeeId} has been activated and is available for task assignments.`
    }
  } catch (error) {
    console.error('Error activating employee:', error)
    throw error
  }
}

// ============================================================================
// PAGE 4: SERVICES ANALYTICS (/admin/servicesAnalytics)
// ============================================================================

/**
 * 4.1 Fetch Most Profitable Service
 * Backend: GET /api/admin/services/analytics/most-profitable
 */
export const fetchMostProfitableService = async (): Promise<MostProfitableService> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/admin/services/analytics/most-profitable', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to fetch most profitable service')
    // return await response.json()
    
    console.log('API: Fetch most profitable service endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Engine Services',
          profit: 310000,
          margin: 50
        })
      }, 600)
    })
  } catch (error) {
    console.error('Failed to fetch most profitable service:', error)
    throw error
  }
}

/**
 * 4.2 Fetch Total Services Data
 * Backend: GET /api/admin/services/analytics/total-services
 */
export const fetchTotalServicesData = async (): Promise<TotalServicesData> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/admin/services/analytics/total-services', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to fetch total services data')
    // return await response.json()
    
    console.log('API: Fetch total services data endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalServicesMonth: 148,
          changeFromLastMonth: 12
        })
      }, 600)
    })
  } catch (error) {
    console.error('Failed to fetch total services data:', error)
    throw error
  }
}

/**
 * 4.3 Fetch Parts Replaced Data
 * Backend: GET /api/admin/services/analytics/parts-replaced
 */
export const fetchPartsReplacedData = async (): Promise<PartsReplacedData> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/admin/services/analytics/parts-replaced', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to fetch parts replaced data')
    // return await response.json()
    
    console.log('API: Fetch parts replaced data endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          partsReplaced: 342,
          partsUsageRate: 8
        })
      }, 600)
    })
  } catch (error) {
    console.error('Failed to fetch parts replaced data:', error)
    throw error
  }
}

/**
 * 4.4 Fetch Customer Retention Data
 * Backend: GET /api/admin/services/analytics/customer-retention
 */
export const fetchCustomerRetentionData = async (): Promise<CustomerRetentionData> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/admin/services/analytics/customer-retention', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to fetch customer retention data')
    // return await response.json()
    
    console.log('API: Fetch customer retention data endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          customerRetention: 87,
          retentionImprovement: 3
        })
      }, 600)
    })
  } catch (error) {
    console.error('Failed to fetch customer retention data:', error)
    throw error
  }
}

/**
 * 4.5 Fetch Service Performance Data
 * Backend: GET /api/admin/services/analytics/service-performance
 */
export const fetchServicePerformance = async (): Promise<ServicePerformance[]> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/admin/services/analytics/service-performance', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to fetch service performance')
    // return await response.json()
    
    console.log('API: Fetch service performance endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'S001',
            name: 'Engine Oil Change',
            totalBookings: 245,
            avgDuration: '45 min',
            profitPerService: 4500,
            customerRating: 4.8,
            trend: 15
          },
          {
            id: 'S002',
            name: 'Brake Service',
            totalBookings: 189,
            avgDuration: '2 hours',
            profitPerService: 12500,
            customerRating: 4.7,
            trend: 8
          },
          {
            id: 'S003',
            name: 'Electrical Diagnostics',
            totalBookings: 156,
            avgDuration: '1.5 hours',
            profitPerService: 8900,
            customerRating: 4.9,
            trend: -5
          },
          {
            id: 'S004',
            name: 'Transmission Repair',
            totalBookings: 87,
            avgDuration: '4 hours',
            profitPerService: 35000,
            customerRating: 4.6,
            trend: 12
          },
          {
            id: 'S005',
            name: 'Custom Paint Jobs',
            totalBookings: 54,
            avgDuration: '6 hours',
            profitPerService: 45000,
            customerRating: 4.9,
            trend: 20
          }
        ])
      }, 800)
    })
  } catch (error) {
    console.error('Failed to fetch service performance:', error)
    throw error
  }
}

/**
 * COMBINED: Fetch comprehensive services analytics (calls all endpoints above)
 * This is a convenience function that aggregates all analytics data
 */
export const fetchServicesAnalytics = async (): Promise<ServicesAnalytics> => {
  try {
    console.log('API: Fetch services analytics (combined) endpoint called')
    
    // Call all endpoints in parallel for better performance
    const [
      mostProfitable,
      totalServices,
      partsReplaced,
      customerRetention,
      servicePerformance
    ] = await Promise.all([
      fetchMostProfitableService(),
      fetchTotalServicesData(),
      fetchPartsReplacedData(),
      fetchCustomerRetentionData(),
      fetchServicePerformance()
    ])
    
    return {
      summary: {
        mostProfitableService: mostProfitable,
        totalServicesMonth: totalServices.totalServicesMonth,
        changeFromLastMonth: totalServices.changeFromLastMonth,
        partsReplaced: partsReplaced.partsReplaced,
        partsUsageRate: partsReplaced.partsUsageRate,
        customerRetention: customerRetention.customerRetention,
        retentionImprovement: customerRetention.retentionImprovement
      },
      servicePerformance
    }
  } catch (error) {
    console.error('Failed to fetch services analytics:', error)
    throw error
  }
}

// ============================================================================
// PAGE 5: AI INSIGHTS (/admin/aiInsights)
// ============================================================================

/**
 * 5.1 Fetch Demand Forecast
 * Backend: GET /api/admin/ai-insights/demand-forecast
 */
export const fetchDemandForecast = async (): Promise<DemandForecast> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/admin/ai-insights/demand-forecast', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to fetch demand forecast')
    // return await response.json()
    
    console.log('API: Fetch demand forecast endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          overallIncrease: 15,
          forecastMonth: 'November 2025',
          projectedBookings: 170,
          changeFromPrevious: 22,
          previousMonth: 'October',
          serviceBreakdown: [
            { serviceName: 'Engine services', percentageChange: 18 },
            { serviceName: 'Electrical diagnostics', percentageChange: 35 },
            { serviceName: 'Brake services', percentageChange: 5 },
            { serviceName: 'Custom projects', percentageChange: 10 }
          ],
          hiringRecommendation: {
            totalMechanics: 2,
            breakdown: ['1 Engine Specialist', '1 Electrical Diagnostics Expert']
          }
        })
      }, 700)
    })
  } catch (error) {
    console.error('Failed to fetch demand forecast:', error)
    throw error
  }
}

/**
 * 5.2 Fetch Profit Projection
 * Backend: GET /api/admin/ai-insights/profit-projection
 */
export const fetchProfitProjection = async (): Promise<ProfitProjection> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/admin/ai-insights/profit-projection', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to fetch profit projection')
    // return await response.json()
    
    console.log('API: Fetch profit projection endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          monthOverMonthGrowth: 9,
          trajectory: [
            { month: 'October', profit: '1.7M' },
            { month: 'November', profit: '1.85M' },
            { month: 'December', profit: '2.02M (projected)' }
          ],
          yearEndTarget: {
            monthlyProfit: '2.1M',
            date: 'December 31, 2025',
            annualGrowth: 18
          },
          optimizationTip: 'Focus on high-margin custom projects (40% margin) and engine services (50% margin) for faster profit acceleration.'
        })
      }, 700)
    })
  } catch (error) {
    console.error('Failed to fetch profit projection:', error)
    throw error
  }
}

/**
 * 5.3 Fetch Underperforming Departments
 * Backend: GET /api/admin/ai-insights/underperforming-departments
 */
export const fetchUnderperformingDepartments = async (): Promise<UnderperformingDepartment[]> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/admin/ai-insights/underperforming-departments', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to fetch underperforming departments')
    // return await response.json()
    
    console.log('API: Fetch underperforming departments endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            departmentName: 'Brake Service Department',
            slowerCompletion: 20,
            avgCompletionTime: 72,
            targetTime: 60,
            rootCause: 'Possible workload imbalance or outdated tools',
            managerOversight: {
              name: 'C',
              score: 82,
              threshold: 90
            },
            recommendation: 'Audit brake dept processes, provide training, or reassign tasks to balance workload across team.'
          }
        ])
      }, 700)
    })
  } catch (error) {
    console.error('Failed to fetch underperforming departments:', error)
    throw error
  }
}

/**
 * 5.4 Fetch Skill Shortage Prediction
 * Backend: GET /api/admin/ai-insights/skill-shortage-prediction
 */
export const fetchSkillShortagePrediction = async (): Promise<SkillShortagePrediction[]> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/admin/ai-insights/skill-shortage-prediction', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to fetch skill shortage prediction')
    // return await response.json()
    
    console.log('API: Fetch skill shortage prediction endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            skillArea: 'Electrical Diagnostics',
            demandIncrease: 35,
            availableEmployees: 2,
            crisisWeeks: 8,
            impactForecast: {
              delayedCustomers: '12-15',
              month: 'December 2025',
              revenueLoss: 180000
            },
            actionPlan: [
              'Train 2 existing mechanics in electrical systems (4 weeks)',
              'Hire 1 experienced electrician immediately'
            ]
          }
        ])
      }, 700)
    })
  } catch (error) {
    console.error('Failed to fetch skill shortage prediction:', error)
    throw error
  }
}



// ============================================================================
// PAGE 7: SETTINGS (/admin/settings)
// ============================================================================

/**
 * SETTINGS: Fetch all roles and permissions
 * Endpoint: GET /api/settings/roles
 * Backend SQL Query:
 * ```sql
 * SELECT 
 *   role_id, role_name, 
 *   COUNT(user_id) as user_count,
 *   GROUP_CONCAT(permission_name) as permissions,
 *   status
 * FROM roles r
 * LEFT JOIN user_roles ur ON r.role_id = ur.role_id
 * LEFT JOIN role_permissions rp ON r.role_id = rp.role_id
 * GROUP BY r.role_id
 * ```
 */
export const fetchRolesPermissions = async (): Promise<RolePermission[]> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/settings/roles`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
    // if (!response.ok) throw new Error('Failed to fetch roles and permissions')
    // return await response.json()
    
    console.log('API: Fetch roles and permissions endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            roleId: 'role_001',
            roleName: 'Admin (Business Owner)',
            userCount: 1,
            permissions: 'Full Access - All modules',
            status: 'Active'
          },
          {
            roleId: 'role_002',
            roleName: 'Manager',
            userCount: 3,
            permissions: 'Task assignment, Employee management, Customer handling',
            status: 'Active'
          },
          {
            roleId: 'role_003',
            roleName: 'Employee',
            userCount: 27,
            permissions: 'View assigned tasks, Update status, Chat with manager',
            status: 'Active'
          },
          {
            roleId: 'role_004',
            roleName: 'Customer',
            userCount: 312,
            permissions: 'Book services, View history, Make payments',
            status: 'Active'
          }
        ])
      }, 600)
    })
  } catch (error) {
    console.error('Failed to fetch roles and permissions:', error)
    throw error
  }
}

/**
 * SETTINGS: Fetch all services and pricing
 * Endpoint: GET /api/settings/services
 * Backend SQL Query:
 * ```sql
 * SELECT 
 *   service_id, service_name, base_price, 
 *   duration, required_skill, status
 * FROM services
 * WHERE deleted_at IS NULL
 * ORDER BY service_name ASC
 * ```
 */
export const fetchServicesPricing = async (): Promise<ServicePricing[]> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/settings/services`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
    // if (!response.ok) throw new Error('Failed to fetch services and pricing')
    // return await response.json()
    
    console.log('API: Fetch services and pricing endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            serviceId: 'srv_001',
            serviceName: 'Engine Oil Change',
            basePrice: 3500,
            duration: '45 mins',
            requiredSkill: 'Engine Specialist',
            status: 'Active'
          },
          {
            serviceId: 'srv_002',
            serviceName: 'Brake Inspection',
            basePrice: 2500,
            duration: '60 mins',
            requiredSkill: 'Brake Systems',
            status: 'Active'
          },
          {
            serviceId: 'srv_003',
            serviceName: 'Electrical Diagnostics',
            basePrice: 5000,
            duration: '90 mins',
            requiredSkill: 'Electrical Systems',
            status: 'Active'
          }
        ])
      }, 600)
    })
  } catch (error) {
    console.error('Failed to fetch services and pricing:', error)
    throw error
  }
}

/**
 * SETTINGS: Fetch task limits configuration
 * Endpoint: GET /api/settings/task-limits
 * Backend SQL Query:
 * ```sql
 * SELECT 
 *   max_tasks_per_day, overload_threshold
 * FROM system_config
 * WHERE config_key = 'task_limits'
 * LIMIT 1
 * ```
 */
export const fetchTaskLimits = async (): Promise<TaskLimits> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/settings/task-limits`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
    // if (!response.ok) throw new Error('Failed to fetch task limits')
    // return await response.json()
    
    console.log('API: Fetch task limits endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          maxTasksPerDay: 5,
          overloadThreshold: 4
        })
      }, 600)
    })
  } catch (error) {
    console.error('Failed to fetch task limits:', error)
    throw error
  }
}

/**
 * SETTINGS: Fetch compensation rules configuration
 * Endpoint: GET /api/settings/compensation
 * Backend SQL Query:
 * ```sql
 * SELECT 
 *   base_salary, demand_bonus_percentage
 * FROM compensation_rules
 * WHERE active = true
 * LIMIT 1
 * ```
 */
export const fetchCompensationRules = async (): Promise<CompensationRules> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/settings/compensation`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
    // if (!response.ok) throw new Error('Failed to fetch compensation rules')
    // return await response.json()
    
    console.log('API: Fetch compensation rules endpoint called')
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const baseSalary = 65000
        const bonusPercentage = 30
        const bonusAmount = (baseSalary * bonusPercentage) / 100
        
        resolve({
          baseSalary: baseSalary,
          demandBonusPercentage: bonusPercentage,
          exampleBonus: bonusAmount,
          exampleTotal: baseSalary + bonusAmount
        })
      }, 600)
    })
  } catch (error) {
    console.error('Failed to fetch compensation rules:', error)
    throw error
  }
}

// ============================================================================
// CUSTOMER DETAILS PAGE ENDPOINTS
// ============================================================================

/**
 * CUSTOMER DETAILS: Fetch customer overview statistics
 * Endpoint: GET /api/customers/overview
 * Backend SQL Query:
 * ```sql
 * SELECT 
 *   COUNT(*) as total_customers,
 *   COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH) THEN 1 END) as new_this_month,
 *   COUNT(CASE WHEN status = 'Active' THEN 1 END) as active_customers,
 *   (COUNT(CASE WHEN status = 'Active' THEN 1 END) * 100.0 / COUNT(*)) as activity_rate,
 *   SUM(total_spent) as total_revenue,
 *   AVG(total_spent) as avg_customer_value,
 *   AVG(satisfaction_score) as avg_satisfaction,
 *   (COUNT(CASE WHEN repeat_customer = true THEN 1 END) * 100.0 / COUNT(*)) as retention_rate,
 *   COUNT(CASE WHEN repeat_customer = true THEN 1 END) as repeat_customers,
 *   AVG(lifetime_months) as avg_lifetime_months
 * FROM customers
 * ```
 */
export const fetchCustomerOverview = async (): Promise<CustomerOverview> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
    const token = localStorage.getItem('authToken')
    
    const response = await fetch(`${baseUrl}/api/admin/customers/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch customer overview')
    }
    
    const data = await response.json()
    
    // Map backend fields to frontend interface with flexible field mapping
    return {
      totalCustomers: data.totalCustomers || data.total || data.count || 0,
      newThisMonth: data.newThisMonth || data.newCustomers || data.recentCustomers || 0,
      activeCustomers: data.activeCustomers || data.active || 0,
      activityRate: data.activityRate || data.rate || data.activeRate || 0,
      topCustomer: data.topCustomer ? {
        name: data.topCustomer.name || `${data.topCustomer.firstName || ''} ${data.topCustomer.lastName || ''}`.trim(),
        email: data.topCustomer.email || '',
        totalSpent: data.topCustomer.totalSpent || data.topCustomer.spent || data.topCustomer.amount || 0,
        servicesUsed: data.topCustomer.servicesUsed || data.topCustomer.services || data.topCustomer.bookings || 0
      } : {
        name: 'N/A',
        email: 'N/A',
        totalSpent: 0,
        servicesUsed: 0
      }
    }
  } catch (error) {
    console.error('Failed to fetch customer overview:', error)
    throw error
  }
}

/**
 * CUSTOMER DETAILS: Fetch list of all customers
 * Endpoint: GET /api/customers/list
 * Backend SQL Query:
 * ```sql
 * SELECT 
 *   c.customer_id as id,
 *   c.name,
 *   c.email,
 *   c.phone,
 *   COUNT(DISTINCT v.vehicle_id) as vehicle_count,
 *   COALESCE(SUM(b.total_amount), 0) as total_spent,
 *   MAX(b.service_date) as last_service_date,
 *   c.status
 * FROM customers c
 * LEFT JOIN vehicles v ON c.customer_id = v.customer_id
 * LEFT JOIN bookings b ON c.customer_id = b.customer_id
 * GROUP BY c.customer_id, c.name, c.email, c.phone, c.status
 * ORDER BY c.name ASC
 * ```
 */
export const fetchCustomerList = async (): Promise<Customer[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
    const token = localStorage.getItem('authToken')
    
    const response = await fetch(`${baseUrl}/api/admin/customers/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch customer list')
    }
    
    const data = await response.json()
    
    // Map backend fields to frontend interface with flexible field mapping
    const customers = Array.isArray(data) ? data : (data.customers || data.data || [])
    
    return customers.map((customer: Record<string, unknown>) => ({
      id: String(customer.id || customer.customerId || customer.customer_id || ''),
      name: String(customer.name || `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || ''),
      email: String(customer.email || ''),
      phone: String(customer.phone || customer.phoneNumber || customer.contactNumber || ''),
      vehicleCount: typeof customer.vehicleCount === 'number' ? customer.vehicleCount : 
                   typeof customer.vehicles === 'number' ? customer.vehicles : 
                   typeof customer.vehicle_count === 'number' ? customer.vehicle_count : 0,
      totalSpent: typeof customer.totalSpent === 'number' ? customer.totalSpent :
                 typeof customer.spent === 'number' ? customer.spent :
                 typeof customer.total_spent === 'number' ? customer.total_spent :
                 typeof customer.amount === 'number' ? customer.amount : 0,
      lastServiceDate: String(customer.lastServiceDate || customer.last_service_date || 
                      customer.lastService || customer.recentService || ''),
      status: (customer.status === 'Inactive' || customer.status === 'inactive') ? 'Inactive' : 'Active'
    }))
  } catch (error) {
    console.error('Failed to fetch customer list:', error)
    throw error
  }
}

/**
 * CUSTOMER DETAILS: Add new customer
 * Endpoint: POST /api/customers
 * Backend SQL Query:
 * ```sql
 * INSERT INTO customers (name, email, phone, status, created_at)
 * VALUES (?, ?, ?, 'Active', NOW())
 * RETURNING customer_id as id, name, email, phone, status
 * ```
 */
export const addCustomer = async (customerData: AddCustomerRequest): Promise<Customer> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/customers`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   },
    //   body: JSON.stringify(customerData)
    // })
    // if (!response.ok) throw new Error('Failed to add customer')
    // return await response.json()
    
    console.log('API: Add customer endpoint called', customerData)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `CUST${Date.now()}`,
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          vehicleCount: 0,
          totalSpent: 0,
          lastServiceDate: 'N/A',
          status: 'Active'
        })
      }, 600)
    })
  } catch (error) {
    console.error('Failed to add customer:', error)
    throw error
  }
}

/**
 * CUSTOMER DETAILS: Update customer status (Active/Inactive)
 * Endpoint: PUT /api/customers/:id/status
 * Backend SQL Query:
 * ```sql
 * UPDATE customers
 * SET status = ?, updated_at = NOW()
 * WHERE customer_id = ?
 * RETURNING customer_id as id, name, email, phone, status
 * ```
 */
export const updateCustomerStatus = async (
  customerId: string,
  newStatus: string
): Promise<Customer> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/customers/${customerId}/status`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   },
    //   body: JSON.stringify({ status: newStatus })
    // })
    // if (!response.ok) throw new Error('Failed to update customer status')
    // return await response.json()
    
    console.log(`API: Update customer status endpoint called - ID: ${customerId}, New Status: ${newStatus}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: customerId,
          name: 'Updated Customer',
          email: 'updated@email.com',
          phone: '+94 77 000 0000',
          vehicleCount: 1,
          totalSpent: 5000,
          lastServiceDate: '2024-11-01',
          status: newStatus as "Active" | "Inactive"
        })
      }, 600)
    })
  } catch (error) {
    console.error('Failed to update customer status:', error)
    throw error
  }
}

/**
 * CUSTOMER DETAILS: Delete customer
 * Endpoint: DELETE /api/customers/:id
 * Backend SQL Query:
 * ```sql
 * DELETE FROM customers
 * WHERE customer_id = ?
 * ```
 */
export const deleteCustomer = async (customerId: string): Promise<void> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
    //   method: 'DELETE',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to delete customer')
    
    console.log(`API: Delete customer endpoint called - ID: ${customerId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 600)
    })
  } catch (error) {
    console.error('Failed to delete customer:', error)
    throw error
  }
}

/**
 * CUSTOMER DETAILS: Activate customer
 * Endpoint: PUT /api/customers/:id/activate
 * Backend SQL Query:
 * ```sql
 * UPDATE customers
 * SET status = 'Active', updated_at = NOW()
 * WHERE customer_id = ?
 * RETURNING customer_id as id, name, email, phone, status
 * ```
 */
export const activateCustomer = async (customerId: string): Promise<Customer> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/customers/${customerId}/activate`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to activate customer')
    // return await response.json()
    
    console.log(`API: Activate customer endpoint called - ID: ${customerId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: customerId,
          name: 'Activated Customer',
          email: 'activated@email.com',
          phone: '+94 77 000 0000',
          vehicleCount: 1,
          totalSpent: 5000,
          lastServiceDate: '2024-11-01',
          status: 'Active'
        })
      }, 600)
    })
  } catch (error) {
    console.error('Failed to activate customer:', error)
    throw error
  }
}

/**
 * CUSTOMER DETAILS: Deactivate customer
 * Endpoint: PUT /api/customers/:id/deactivate
 * Backend SQL Query:
 * ```sql
 * UPDATE customers
 * SET status = 'Inactive', updated_at = NOW()
 * WHERE customer_id = ?
 * RETURNING customer_id as id, name, email, phone, status
 * ```
 */
export const deactivateCustomer = async (customerId: string): Promise<Customer> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/customers/${customerId}/deactivate`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    // if (!response.ok) throw new Error('Failed to deactivate customer')
    // return await response.json()
    
    console.log(`API: Deactivate customer endpoint called - ID: ${customerId}`)
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: customerId,
          name: 'Deactivated Customer',
          email: 'deactivated@email.com',
          phone: '+94 77 000 0000',
          vehicleCount: 1,
          totalSpent: 5000,
          lastServiceDate: '2024-11-01',
          status: 'Inactive'
        })
      }, 600)
    })
  } catch (error) {
    console.error('Failed to deactivate customer:', error)
    throw error
  }
}

