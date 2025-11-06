# API Documentation

**Complete API Reference for Admin Panel**  
**Last Updated**: November 5, 2025  
**Version**: 1.0

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Common/Shared Endpoints](#commonshared-endpoints)
4. [Page-Specific Endpoints](#page-specific-endpoints)
   - [Dashboard](#page-1-dashboard)
   - [Financial Reports](#page-2-financial-reports)
   - [Workforce Overview](#page-3-workforce-overview)
   - [Services Analytics](#page-4-services-analytics)
   - [AI Insights](#page-5-ai-insights)
   - [Security](#page-6-settings)
5. [Data Types & Schemas](#data-types--schemas)
6. [Error Handling](#error-handling)
7. [Backend Integration Guide](#backend-integration-guide)

---

## Overview

This document contains all API endpoints for the admin panel. All endpoints are centralized in `/src/services/adminService.ts` and organized by page.

**Base URL**: TBD (Configure in service file)  
**Authentication**: JWT Bearer Token (required for all endpoints)  
**Content-Type**: `application/json`

---

## Authentication

All API requests must include a JWT authentication token in the Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

**Token Storage**: Frontend stores token in `localStorage.getItem('authToken')`

**Error Responses**:
- **401 Unauthorized**: Invalid or expired token
- **403 Forbidden**: Insufficient permissions

---

## Common/Shared Endpoints

These endpoints are used across multiple pages (typically in header/navigation):

### 1. Logout

**Endpoint**: `POST /api/auth/logout`  
**Used in**: Header (all pages)  
**Function**: `logoutUser()`

**Request**:
```javascript
// No body required
```

**Response**:
```json
{
  "message": "Logout successful"
}
```

**Actions**:
- Clears `authToken` and `userProfile` from localStorage
- Redirects to `/login`

---

### 2. Fetch Notifications

**Endpoint**: `GET /api/notifications`  
**Used in**: Header notification dropdown (all pages)  
**Function**: `fetchNotifications()`

**Response**:
```json
[
  {
    "id": "notification-123",
    "title": "System Alert",
    "message": "Employee at maximum workload capacity",
    "time": "2 hours ago",
    "read": false,
    "type": "system"
  }
]
```

**Types**: `system` | `security` | `approval`

---

### 3. Mark Notification as Read

**Endpoint**: `PUT /api/notifications/:id/read`  
**Used in**: Header notification dropdown (all pages)  
**Function**: `markNotificationAsRead(notificationId: string)`

**Response**:
```json
{
  "message": "Notification marked as read"
}
```

---

### 4. Delete Notification

**Endpoint**: `DELETE /api/notifications/:id`  
**Used in**: Header notification dropdown (all pages)  
**Function**: `deleteNotification(notificationId: string)`

**Response**:
```json
{
  "message": "Notification deleted"
}
```

---

### 5. Fetch User Profile

**Endpoint**: `GET /api/user/profile`  
**Used in**: Header profile dropdown (all pages)  
**Function**: `fetchUserProfile()`

**Response**:
```json
{
  "id": "user-123",
  "name": "Admin User",
  "email": "admin@center.com",
  "role": "admin",
  "avatar": "https://..."
}
```

---

### 6. Update User Profile

**Endpoint**: `PUT /api/user/profile`  
**Used in**: Profile settings modal (all pages)  
**Function**: `updateUserProfile(profileData: Partial<UserProfile>)`

**Request**:
```json
{
  "name": "New Name",
  "email": "newemail@center.com"
}
```

**Response**:
```json
{
  "id": "user-123",
  "name": "New Name",
  "email": "newemail@center.com",
  "role": "admin"
}
```

---

### 7. Fetch User Settings

**Endpoint**: `GET /api/user/settings`  
**Used in**: Settings modal (all pages)  
**Function**: `fetchUserSettings()`

**Response**:
```json
{
  "notifications": true,
  "emailAlerts": true,
  "theme": "light"
}
```

---

### 8. Update User Settings

**Endpoint**: `PUT /api/user/settings`  
**Used in**: Settings modal (all pages)  
**Function**: `updateUserSettings(settings: Record<string, unknown>)`

**Request**:
```json
{
  "notifications": false,
  "emailAlerts": true,
  "theme": "dark"
}
```

**Response**:
```json
{
  "notifications": false,
  "emailAlerts": true,
  "theme": "dark"
}
```

---

## Page-Specific Endpoints

### Page 1: Dashboard

**Route**: `/admin/dashboard`  
**File**: `/src/app/admin/dashboard/page.tsx`

#### 1.1 Fetch Dashboard Statistics

**Endpoint**: `GET /api/admin/dashboard/stats`  
**Function**: `fetchDashboardStats()`

**Response**:
```json
{
  "profitThisMonth": {
    "value": "LKR 1.8M",
    "change": "12% from last month",
    "percentage": 12
  },
  "activeCustomers": {
    "value": 312,
    "newThisMonth": 23
  },
  "ongoingServices": {
    "value": 23,
    "status": "In Progress"
  },
  "activeEmployees": {
    "value": 27,
    "onLeave": 2,
    "frozen": 1
  }
}
```

**TypeScript Interface**:
```typescript
interface DashboardStats {
  profitThisMonth: {
    value: string        // Format: "LKR X.XM"
    change: string       // Format: "X% from last month"
    percentage: number   // Raw percentage value
  }
  activeCustomers: {
    value: number        // Total count
    newThisMonth: number // New this month
  }
  ongoingServices: {
    value: number        // Service count
    status: string       // Status text
  }
  activeEmployees: {
    value: number        // Total active
    onLeave: number      // On leave count
    frozen: number       // Frozen/suspended count
  }
}
```

---

#### 1.2 Fetch System Alerts

**Endpoint**: `GET /api/admin/dashboard/alerts`  
**Function**: `fetchSystemAlerts()`

**Response**:
```json
[
  {
    "id": "alert-123",
    "type": "warning",
    "message": "Employee at maximum workload capacity",
    "timestamp": "2024-11-05T10:30:00Z"
  },
  {
    "id": "alert-456",
    "type": "error",
    "message": "Security system detected suspicious pattern",
    "timestamp": "2024-11-05T09:15:00Z"
  }
]
```

**Alert Types**:
- `warning`: Caution (yellow/amber styling)
- `error`: Critical (red styling)
- `info`: Informational (blue styling)

**TypeScript Interface**:
```typescript
interface SystemAlert {
  id: string
  type: 'warning' | 'info' | 'error'
  message: string
  timestamp: string  // ISO 8601 format
}
```

---

#### 1.3 Fetch AI Insights

**Endpoint**: `GET /api/admin/dashboard/ai-insights`  
**Function**: `fetchAIInsights()`

**Response**:
```json
[
  {
    "id": "insight-001",
    "title": "Next Month Demand Forecast",
    "description": "15% increase expected. AI recommends hiring 2 more mechanics.",
    "category": "forecast",
    "icon": "trending-up"
  },
  {
    "id": "insight-002",
    "title": "Profit Projection Curve",
    "description": "Monthly profit will reach LKR 2.1M by Q4 2025.",
    "category": "projection",
    "icon": "dollar-sign"
  }
]
```

**Categories & Icons**:
- `forecast`: Future predictions (Blue TrendingUp icon)
- `projection`: Financial projections (Green DollarSign icon)
- `warning`: Issues to address (Amber AlertTriangle icon)
- `recommendation`: Actionable suggestions (Purple Users icon)

**TypeScript Interface**:
```typescript
interface AIInsight {
  id: string
  title: string           // Max 60 chars recommended
  description: string     // Max 200 chars recommended
  category: 'forecast' | 'projection' | 'warning' | 'recommendation'
  icon: string           // Icon name (optional)
}
```

---

### Page 2: Financial Reports

**Route**: `/admin/finacialReports`  
**File**: `/src/app/admin/finacialReports/page.tsx`

**Status**: ✅ Implemented

#### 1. Fetch Financial Reports

**Endpoint**: `GET /api/admin/financial-reports`  
**Function**: `fetchFinancialReports(serviceFilter, startDate, endDate)`

**Parameters**:
```typescript
serviceFilter: string = 'all' | 'predefined' | 'custom'
startDate: string // Format: YYYY-MM-DD
endDate: string   // Format: YYYY-MM-DD
```

**Request URL**:
```
GET /api/admin/financial-reports?serviceFilter=all&startDate=2025-01-01&endDate=2025-11-04
```

**Response**:
```json
{
  "breakdown": [
    {
      "serviceType": "Oil Changes",
      "revenue": 450000,
      "cost": 180000,
      "profit": 270000,
      "margin": 60,
      "trend": 8
    },
    {
      "serviceType": "Brake Services",
      "revenue": 380000,
      "cost": 190000,
      "profit": 190000,
      "margin": 50,
      "trend": -3
    },
    {
      "serviceType": "Engine Services",
      "revenue": 620000,
      "cost": 310000,
      "profit": 310000,
      "margin": 50,
      "trend": 12
    },
    {
      "serviceType": "Electrical Diagnostics",
      "revenue": 280000,
      "cost": 140000,
      "profit": 140000,
      "margin": 50,
      "trend": 15
    },
    {
      "serviceType": "Custom Projects",
      "revenue": 970000,
      "cost": 582000,
      "profit": 388000,
      "margin": 40,
      "trend": 6
    }
  ],
  "totals": {
    "totalRevenue": 2700000,
    "totalCost": 1402000,
    "totalProfit": 1298000,
    "overallMargin": 48,
    "overallTrend": 9
  },
  "period": {
    "startDate": "2025-01-01",
    "endDate": "2025-11-04"
  }
}
```

**TypeScript Interfaces**:
```typescript
export interface ServiceTypeBreakdown {
  serviceType: string
  revenue: number
  cost: number
  profit: number
  margin: number    // Percentage
  trend: number     // Percentage change (can be negative)
}

export interface FinancialTotals {
  totalRevenue: number
  totalCost: number
  totalProfit: number
  overallMargin: number    // Percentage
  overallTrend: number     // Percentage change
}

export interface FinancialReport {
  breakdown: ServiceTypeBreakdown[]
  totals: FinancialTotals
  period: {
    startDate: string
    endDate: string
  }
}
```

**Backend Implementation Notes**:
- Filter by service type (all, predefined, custom)
- Calculate revenue, cost, profit for each service type
- Calculate margin percentage: `(profit / revenue) * 100`
- Calculate trend: percentage change from previous period
- Sum all values for totals row
- All monetary values in LKR (Sri Lankan Rupees)

---

#### 2. Export Financial Report as PDF

**Endpoint**: `POST /api/financial-reports/export-pdf`  
**Function**: `handleDownloadPDF()`

**Description**: Generates a PDF report of financial data for the specified period and service filter.

**Request Headers**:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {authToken}"
}
```

**Request Body**:
```json
{
  "serviceFilter": "all",
  "startDate": "2025-01-01",
  "endDate": "2025-11-04",
  "data": {
    "breakdown": [...],
    "totals": {...}
  }
}
```

**Response**:
- Content-Type: `application/pdf`
- Returns binary PDF file
- Filename format: `financial-report-{startDate}-to-{endDate}.pdf`

**Frontend Implementation**:
```typescript
const handleDownloadPDF = async () => {
  const response = await fetch('/api/financial-reports/export-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify({
      serviceFilter,
      startDate,
      endDate,
      data: financialData
    })
  })
  
  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `financial-report-${startDate}-to-${endDate}.pdf`
  link.click()
  window.URL.revokeObjectURL(url)
}
```

**PDF Contents Should Include**:
- Company header with logo and date range
- Service type breakdown table (revenue, cost, profit, margin, trend)
- Total summary row
- Visual charts (optional)
- Generated date and time stamp
- Page numbers for multi-page reports

**Response Codes**:
- **200**: Success - Returns PDF file
- **400**: Bad request - Invalid date range or parameters
- **401**: Unauthorized - Missing or invalid token
- **500**: Internal server error - PDF generation failed

---

#### 3. Export Financial Report as Excel

**Endpoint**: `POST /api/financial-reports/export-excel`  
**Function**: `handleExportExcel()`

**Description**: Generates an Excel (.xlsx) spreadsheet of financial data for the specified period and service filter.

**Request Headers**:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {authToken}"
}
```

**Request Body**:
```json
{
  "serviceFilter": "all",
  "startDate": "2025-01-01",
  "endDate": "2025-11-04",
  "data": {
    "breakdown": [...],
    "totals": {...}
  }
}
```

**Response**:
- Content-Type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- Returns binary Excel file (.xlsx)
- Filename format: `financial-report-{startDate}-to-{endDate}.xlsx`

**Frontend Implementation**:
```typescript
const handleExportExcel = async () => {
  const response = await fetch('/api/financial-reports/export-excel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify({
      serviceFilter,
      startDate,
      endDate,
      data: financialData
    })
  })
  
  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `financial-report-${startDate}-to-${endDate}.xlsx`
  link.click()
  window.URL.revokeObjectURL(url)
}
```

**Excel File Structure**:

**Sheet 1: Financial Summary**
- Header row with report details (date range, generated date)
- Service type breakdown table with columns:
  - Service Type
  - Revenue (LKR)
  - Cost (LKR)
  - Profit (LKR)
  - Margin (%)
  - Trend (%)
- Total summary row (bold, highlighted)
- Formatted cells with number formatting and borders

**Sheet 2: Charts** (Optional)
- Revenue distribution pie chart
- Profit trend line chart
- Cost analysis bar chart

**Excel Formatting**:
- Currency format: `#,##0` for LKR values
- Percentage format: `0.0%` for margin and trend
- Header row: Bold, colored background
- Total row: Bold, highlighted background
- Conditional formatting for trends (green for positive, red for negative)

**Response Codes**:
- **200**: Success - Returns Excel file
- **400**: Bad request - Invalid date range or parameters
- **401**: Unauthorized - Missing or invalid token
- **500**: Internal server error - Excel generation failed

**Backend Library Recommendations**:
- **PDF**: Use libraries like `pdfkit` (Node.js), `ReportLab` (Python), or `iText` (Java)
- **Excel**: Use libraries like `exceljs` (Node.js), `openpyxl` (Python), or `Apache POI` (Java)

---

### Page 3: Workforce Overview

**Route**: `/admin/workforceOverview`  
**File**: `/src/app/admin/workforceOverview/page.tsx`

**Status**: ✅ Implemented

#### 1. Fetch Workforce Overview

**Endpoint**: `GET /api/admin/workforce/overview`  
**Function**: `fetchWorkforceOverview()`

**Response**:
```json
{
  "stats": {
    "totalEmployees": 27,
    "activeEmployees": 24,
    "onLeave": 2,
    "frozen": 1,
    "avgRating": 4.7,
    "ratingChange": 0.2,
    "avgWorkload": 3.2,
    "avgSalary": "85K"
  },
  "centerInfo": {
    "totalCenters": 1,
    "activeManagers": 3,
    "minimumManagers": 1,
    "totalEmployees": 27
  },
  "overloadedEmployee": {
    "name": "Kamal Perera",
    "specialization": "Electrical Systems",
    "capacityPercentage": 100,
    "activeTasks": 5,
    "maxTasks": 5
  }
}
```

#### 2. Fetch Top Employees

**Endpoint**: `GET /api/admin/workforce/top-employees`  
**Function**: `fetchTopEmployees()`

**Response**:
```json
[
  {
    "id": "EMP-003",
    "name": "Nimal Fernando",
    "specialization": "Bodywork & Paint Specialist",
    "rating": 4.9,
    "rewardEligible": true,
    "overloaded": false
  }
]
```

#### 3. Fetch Manager Performance

**Endpoint**: `GET /api/admin/workforce/manager-performance`  
**Function**: `fetchManagerPerformance()`

**Response**:
```json
[
  {
    "id": "MGR-001",
    "name": "Rajesh Kumar",
    "tasksAssigned": 48,
    "completionRate": 94,
    "avgEmployeeRating": 4.7,
    "status": "Active"
  }
]
```

#### 4. Fetch All Managers

**Endpoint**: `GET /api/admin/workforce/managers`  
**Function**: `fetchAllManagers()`

**Response**:
```json
[
  {
    "id": "MGR-001",
    "name": "Rajesh Kumar",
    "email": "rajesh.kumar@center.com",
    "phone": "+94 77 123 4567",
    "joinDate": "Jan 15, 2023",
    "status": "Active"
  }
]
```

#### 5. Fetch All Employees

**Endpoint**: `GET /api/admin/workforce/employees`  
**Function**: `fetchAllEmployees()`

**Response**:
```json
[
  {
    "id": "EMP-001",
    "name": "Ruwan Silva",
    "specialization": "Engine Specialist",
    "email": "ruwan.silva@center.com",
    "phone": "+94 71 111 2222",
    "rating": 4.8,
    "status": "Active"
  }
]
```

**TypeScript Interfaces**:
```typescript
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
```

---

#### 3.6. Add Manager

**Endpoint**: `POST /api/admin/workforce/managers`  
**Function**: `addManager(data: AddManagerRequest)`  
**Used in**: Workforce Overview Page (Add Manager Modal)

**Request Body**:
```typescript
interface AddManagerRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  managerId: string  // Format: MGR-XXX
  joinDate: string   // ISO date string
  username: string
  password: string
  address?: string
}
```

**Example Request**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@center.com",
  "phone": "+94 77 123 4567",
  "managerId": "MGR-004",
  "joinDate": "2025-11-05",
  "username": "johndoe",
  "password": "TempPass123",
  "address": "123 Main St, Colombo"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Manager Added Successfully!\n\nName: John Doe\nID: MGR-004\nEmail: john.doe@center.com\n\nCredentials have been sent to the manager's email.",
  "manager": {
    "id": "MGR-004",
    "name": "John Doe",
    "email": "john.doe@center.com",
    "phone": "+94 77 123 4567",
    "joinDate": "Nov 5, 2025",
    "status": "Active"
  }
}
```

---

#### 3.7. Add Employee

**Endpoint**: `POST /api/admin/workforce/employees`  
**Function**: `addEmployee(data: AddEmployeeRequest)`  
**Used in**: Workforce Overview Page (Add Employee Modal)

**Request Body**:
```typescript
interface AddEmployeeRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  employeeId: string      // Format: EMP-XXX
  specialization: string  // See specialization list below
  joinDate: string        // ISO date string
  salary: string
  username: string
  password: string
  experience?: string
  address?: string
}
```

**Specializations**:
- Engine Specialist
- Electrical Systems
- Brake Systems
- Transmission Specialist
- Bodywork & Paint
- Suspension & Steering
- AC & Cooling Systems
- General Mechanic

**Example Request**:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@center.com",
  "phone": "+94 71 234 5678",
  "employeeId": "EMP-007",
  "specialization": "Engine Specialist",
  "joinDate": "2025-11-05",
  "salary": "65000",
  "username": "janesmith",
  "password": "TempPass456",
  "experience": "5",
  "address": "456 Park Ave, Kandy"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Employee Added Successfully!\n\nName: Jane Smith\nID: EMP-007\nSpecialization: Engine Specialist\nEmail: jane.smith@center.com\n\nCredentials have been sent to the employee's email.",
  "employee": {
    "id": "EMP-007",
    "name": "Jane Smith",
    "specialization": "Engine Specialist",
    "email": "jane.smith@center.com",
    "phone": "+94 71 234 5678",
    "rating": 0,
    "status": "Active"
  }
}
```

---

#### 3.8. Update Manager

**Endpoint**: `PUT /api/admin/workforce/managers/:id`  
**Function**: `updateManager(managerId: string, data: Partial<AddManagerRequest>)`  
**Used in**: Workforce Overview Page (Edit Manager Modal)

**URL Parameters**:
- `id`: Manager ID (e.g., "MGR-001")

**Request Body**: Partial manager data (any fields from AddManagerRequest)

**Response**:
```json
{
  "success": true,
  "message": "Manager MGR-001 updated successfully."
}
```

---

#### 3.9. Update Employee

**Endpoint**: `PUT /api/admin/workforce/employees/:id`  
**Function**: `updateEmployee(employeeId: string, data: Partial<AddEmployeeRequest>)`  
**Used in**: Workforce Overview Page (Edit Employee Modal)

**URL Parameters**:
- `id`: Employee ID (e.g., "EMP-001")

**Request Body**: Partial employee data (any fields from AddEmployeeRequest)

**Response**:
```json
{
  "success": true,
  "message": "Employee EMP-001 updated successfully."
}
```

---

#### 3.10. Freeze Manager

**Endpoint**: `PUT /api/admin/workforce/managers/:id/freeze`  
**Function**: `freezeManager(managerId: string)`  
**Used in**: Workforce Overview Page (Freeze Manager Button)

**URL Parameters**:
- `id`: Manager ID (e.g., "MGR-001")

**Response**:
```json
{
  "success": true,
  "message": "Manager MGR-001 has been frozen. They can no longer access the system."
}
```

**Actions**:
- Revokes manager's system access
- Prevents task assignment capabilities
- Requires admin approval to reactivate
- Updates manager status to "Frozen"

---

#### 3.11. Freeze Employee

**Endpoint**: `PUT /api/admin/workforce/employees/:id/freeze`  
**Function**: `freezeEmployee(employeeId: string)`  
**Used in**: Workforce Overview Page (Freeze Employee Button)

**URL Parameters**:
- `id`: Employee ID (e.g., "EMP-001")

**Response**:
```json
{
  "success": true,
  "message": "Employee EMP-001 has been frozen. They can no longer access the system."
}
```

**Actions**:
- Revokes employee's system access
- Removes from active task assignments
- Requires admin approval to reactivate
- Updates employee status to "Frozen"

---

#### 3.12. Activate Employee

**Endpoint**: `PUT /api/admin/workforce/employees/:id/activate`  
**Function**: `activateEmployee(employeeId: string)`  
**Used in**: Workforce Overview Page (Activate Employee Button)

**URL Parameters**:
- `id`: Employee ID (e.g., "EMP-004")

**Response**:
```json
{
  "success": true,
  "message": "Employee EMP-004 has been activated and is available for task assignments."
}
```

**Actions**:
- Restores employee's system access
- Makes employee available for task assignments
- Updates employee status to "Active"

**Backend Implementation Notes**:
- Track employee workload and performance metrics
- Calculate average ratings and workload distribution
- Identify overloaded employees (capacity ≥ 100%)
- Support employee status management (Active, On Leave, Frozen)
- Manager performance tracking with completion rates
- Support for manager and employee CRUD operations
- Validate manager ID pattern (MGR-XXX) and employee ID pattern (EMP-XXX)
- Send email notifications with credentials to new managers/employees
- Hash passwords before storing in database
- Enforce minimum manager requirement (at least 1 active manager)

---

### Page 4: Services Analytics

**Route**: `/admin/servicesAnalytics`  
**File**: `/src/app/admin/servicesAnalytics/page.tsx`

**Status**: ✅ Implemented (5 focused endpoints)

---

#### 4.1 Fetch Most Profitable Service

**Endpoint**: `GET /api/admin/services/analytics/most-profitable`  
**Function**: `fetchMostProfitableService()`  
**Purpose**: Retrieve the most profitable service with profit margin analysis

**Request**:
```http
GET /api/admin/services/analytics/most-profitable
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
{
  "name": "Engine Services",
  "profit": 310000,
  "margin": 50
}
```

**TypeScript Interface**:
```typescript
export interface MostProfitableService {
  name: string
  profit: number        // Total profit in currency
  margin: number        // Profit margin percentage
}
```

**Backend Implementation**:
- Calculate profit: `revenue - (cost_of_parts + labor_cost + overhead)`
- Calculate margin: `(profit / revenue) * 100`
- Query all services for the current month
- Group by service type and aggregate totals
- Return the service with highest profit value

**Calculation Formula**:
```sql
SELECT 
  service_type AS name,
  SUM(revenue - cost) AS profit,
  (SUM(revenue - cost) / SUM(revenue) * 100) AS margin
FROM services
WHERE MONTH(service_date) = MONTH(CURRENT_DATE)
  AND YEAR(service_date) = YEAR(CURRENT_DATE)
GROUP BY service_type
ORDER BY profit DESC
LIMIT 1
```

---

#### 4.2 Fetch Total Services Data

**Endpoint**: `GET /api/admin/services/analytics/total-services`  
**Function**: `fetchTotalServicesData()`  
**Purpose**: Retrieve total services completed this month and compare with previous month

**Request**:
```http
GET /api/admin/services/analytics/total-services
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
{
  "totalServicesMonth": 148,
  "changeFromLastMonth": 12
}
```

**TypeScript Interface**:
```typescript
export interface TotalServicesData {
  totalServicesMonth: number       // Total services this month
  changeFromLastMonth: number      // Numeric change (+/- from last month)
}
```

**Backend Implementation**:
- Count completed services in current month
- Count completed services in previous month
- Calculate change: `current_month_count - previous_month_count`
- Status filter: Only include services with status 'Completed'

**Calculation Formula**:
```sql
-- Current month count
SELECT COUNT(*) FROM services
WHERE MONTH(completion_date) = MONTH(CURRENT_DATE)
  AND YEAR(completion_date) = YEAR(CURRENT_DATE)
  AND status = 'Completed'

-- Previous month count
SELECT COUNT(*) FROM services
WHERE MONTH(completion_date) = MONTH(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH))
  AND YEAR(completion_date) = YEAR(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH))
  AND status = 'Completed'

-- Change = current_count - previous_count
```

---

#### 4.3 Fetch Parts Replaced Data

**Endpoint**: `GET /api/admin/services/analytics/parts-replaced`  
**Function**: `fetchPartsReplacedData()`  
**Purpose**: Track total parts replaced and calculate usage rate increase

**Request**:
```http
GET /api/admin/services/analytics/parts-replaced
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
{
  "partsReplaced": 342,
  "partsUsageRate": 8
}
```

**TypeScript Interface**:
```typescript
export interface PartsReplacedData {
  partsReplaced: number       // Total parts replaced this month
  partsUsageRate: number      // Percentage increase in parts usage
}
```

**Backend Implementation**:
- Sum all parts quantities from `service_parts` table for current month
- Compare with previous month's total
- Calculate usage rate: `((current - previous) / previous) * 100`
- Track by joining services with parts inventory

**Calculation Formula**:
```sql
-- Current month parts
SELECT SUM(quantity) FROM service_parts sp
JOIN services s ON sp.service_id = s.id
WHERE MONTH(s.completion_date) = MONTH(CURRENT_DATE)
  AND YEAR(s.completion_date) = YEAR(CURRENT_DATE)
  AND s.status = 'Completed'

-- Previous month parts
SELECT SUM(quantity) FROM service_parts sp
JOIN services s ON sp.service_id = s.id
WHERE MONTH(s.completion_date) = MONTH(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH))
  AND YEAR(s.completion_date) = YEAR(DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH))
  AND s.status = 'Completed'

-- Usage rate = ((current - previous) / previous) * 100
```

---

#### 4.4 Fetch Customer Retention Data

**Endpoint**: `GET /api/admin/services/analytics/customer-retention`  
**Function**: `fetchCustomerRetentionData()`  
**Purpose**: Calculate customer retention percentage and track improvement

**Request**:
```http
GET /api/admin/services/analytics/customer-retention
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
{
  "customerRetention": 87,
  "retentionImprovement": 3
}
```

**TypeScript Interface**:
```typescript
export interface CustomerRetentionData {
  customerRetention: number        // Retention percentage
  retentionImprovement: number     // Percentage point improvement
}
```

**Backend Implementation**:
- Identify returning customers (customers with 2+ services)
- Calculate retention: `(returning_customers / total_customers) * 100`
- Compare with previous period to get improvement
- Track by customer_id in services table

**Calculation Formula**:
```sql
-- Returning customers this month
SELECT COUNT(DISTINCT customer_id) FROM (
  SELECT customer_id, COUNT(*) as service_count
  FROM services
  WHERE MONTH(service_date) = MONTH(CURRENT_DATE)
    AND YEAR(service_date) = YEAR(CURRENT_DATE)
  GROUP BY customer_id
  HAVING service_count >= 2
) AS returning_customers

-- Total unique customers this month
SELECT COUNT(DISTINCT customer_id) FROM services
WHERE MONTH(service_date) = MONTH(CURRENT_DATE)
  AND YEAR(service_date) = YEAR(CURRENT_DATE)

-- Retention = (returning / total) * 100
-- Improvement = current_retention - previous_retention
```

---

#### 4.5 Fetch Service Performance Data

**Endpoint**: `GET /api/admin/services/analytics/service-performance`  
**Function**: `fetchServicePerformance()`  
**Purpose**: Retrieve detailed performance metrics for all service types

**Request**:
```http
GET /api/admin/services/analytics/service-performance
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
[
  {
    "id": "S001",
    "name": "Engine Oil Change",
    "totalBookings": 245,
    "avgDuration": "45 min",
    "profitPerService": 4500,
    "customerRating": 4.8,
    "trend": 15
  },
  {
    "id": "S002",
    "name": "Brake Service",
    "totalBookings": 189,
    "avgDuration": "2 hours",
    "profitPerService": 12500,
    "customerRating": 4.7,
    "trend": 8
  }
]
```

**TypeScript Interface**:
```typescript
export interface ServicePerformance {
  id: string                    // Service type ID
  name: string                  // Service type name
  totalBookings: number         // Total bookings this month
  avgDuration: string           // Average duration (human-readable)
  profitPerService: number      // Average profit per service
  customerRating: number        // Average customer rating (1-5)
  trend: number                 // Percentage change from previous period
}
```

**Backend Implementation**:
- Group services by service_type_id
- Calculate average duration in minutes, then format to human-readable
- Calculate average profit: `SUM(profit) / COUNT(*)`
- Aggregate customer ratings from feedback table
- Calculate trend by comparing with previous month

**Calculation Formulas**:
```sql
-- Service performance metrics
SELECT 
  st.id,
  st.name,
  COUNT(s.id) AS totalBookings,
  AVG(s.duration_minutes) AS avgDurationMinutes,
  AVG(s.revenue - s.cost) AS profitPerService,
  AVG(f.rating) AS customerRating
FROM service_types st
LEFT JOIN services s ON st.id = s.service_type_id
LEFT JOIN feedback f ON s.id = f.service_id
WHERE MONTH(s.completion_date) = MONTH(CURRENT_DATE)
  AND YEAR(s.completion_date) = YEAR(CURRENT_DATE)
  AND s.status = 'Completed'
GROUP BY st.id, st.name
ORDER BY totalBookings DESC

-- Trend calculation
-- Compare current month bookings with previous month for each service
-- trend = ((current_bookings - previous_bookings) / previous_bookings) * 100

-- Duration formatting
-- < 60 min: "X min"
-- >= 60 min: "X hours" or "X.5 hours"
```

---

#### 4.6 Fetch Complete Analytics (Combined)

**Endpoint**: `GET /api/admin/services/analytics`  
**Function**: `fetchServicesAnalytics()`  
**Purpose**: Aggregate all analytics data in a single call (calls endpoints 4.1-4.5 in parallel)

**Request**:
```http
GET /api/admin/services/analytics
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
{
  "summary": {
    "mostProfitableService": {
      "name": "Engine Services",
      "profit": 310000,
      "margin": 50
    },
    "totalServicesMonth": 148,
    "changeFromLastMonth": 12,
    "partsReplaced": 342,
    "partsUsageRate": 8,
    "customerRetention": 87,
    "retentionImprovement": 3
  },
  "servicePerformance": [...]
}
```

**TypeScript Interface**:
```typescript
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
```

**Implementation Note**:
- Frontend calls all 5 endpoints in parallel using `Promise.all()`
- Backend can implement as a single aggregated query or call individual services
- Better performance with separate endpoints for partial data updates

---

**Common Error Responses for All Services Analytics Endpoints**:
```json
// 401 Unauthorized
{
  "error": "Invalid authentication token"
}

// 403 Forbidden
{
  "error": "Insufficient permissions to access analytics"
}

// 500 Internal Server Error
{
  "error": "Failed to fetch analytics data",
  "details": "Database connection error"
}
```

---

### Page 5: AI Insights

**Route**: `/admin/aiInsights`  
**File**: `/src/app/admin/aiInsights/page.tsx`

**Status**: ✅ Implemented (4 AI-powered endpoints)

---

#### 5.1 Fetch Demand Forecast

**Endpoint**: `GET /api/admin/ai-insights/demand-forecast`  
**Function**: `fetchDemandForecast()`  
**Purpose**: AI-powered forecast of next month's service demand with hiring recommendations

**Request**:
```http
GET /api/admin/ai-insights/demand-forecast
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
{
  "overallIncrease": 15,
  "forecastMonth": "November 2025",
  "projectedBookings": 170,
  "changeFromPrevious": 22,
  "previousMonth": "October",
  "serviceBreakdown": [
    {
      "serviceName": "Engine services",
      "percentageChange": 18
    },
    {
      "serviceName": "Electrical diagnostics",
      "percentageChange": 35
    },
    {
      "serviceName": "Brake services",
      "percentageChange": 5
    },
    {
      "serviceName": "Custom projects",
      "percentageChange": 10
    }
  ],
  "hiringRecommendation": {
    "totalMechanics": 2,
    "breakdown": [
      "1 Engine Specialist",
      "1 Electrical Diagnostics Expert"
    ]
  }
}
```

**TypeScript Interface**:
```typescript
export interface ServiceBreakdown {
  serviceName: string
  percentageChange: number  // Can be positive or negative
}

export interface DemandForecast {
  overallIncrease: number           // Overall percentage increase
  forecastMonth: string              // Month being forecasted
  projectedBookings: number          // Total bookings projected
  changeFromPrevious: number         // Numeric change from previous month
  previousMonth: string              // Previous month name
  serviceBreakdown: ServiceBreakdown[]  // Per-service breakdown
  hiringRecommendation: {
    totalMechanics: number           // Total mechanics needed
    breakdown: string[]              // Specific roles needed
  }
}
```

**Backend Implementation**:
- Use machine learning model trained on historical booking data
- Analyze seasonal trends and year-over-year growth patterns
- Factor in external variables (economy, holidays, marketing campaigns)
- Calculate service-specific forecasts using time series analysis
- Generate hiring recommendations based on capacity constraints
- Model: ARIMA, LSTM, or Prophet for time series forecasting

**AI/ML Model Details**:
```python
# Example ML approach
1. Historical Data: Last 24 months of bookings by service type
2. Features: Month, season, marketing spend, economic indicators
3. Model: Prophet or ARIMA for time series forecasting
4. Training: Rolling window validation with last 6 months as test set
5. Prediction: Next month forecast with 95% confidence interval
6. Capacity Analysis: Compare forecast with current workforce capacity
7. Hiring Recommendation: Gap analysis → specific skill requirements
```

---

#### 5.2 Fetch Profit Projection

**Endpoint**: `GET /api/admin/ai-insights/profit-projection`  
**Function**: `fetchProfitProjection()`  
**Purpose**: AI-generated profit trajectory with optimization recommendations

**Request**:
```http
GET /api/admin/ai-insights/profit-projection
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
{
  "monthOverMonthGrowth": 9,
  "trajectory": [
    {
      "month": "October",
      "profit": "1.7M"
    },
    {
      "month": "November",
      "profit": "1.85M"
    },
    {
      "month": "December",
      "profit": "2.02M (projected)"
    }
  ],
  "yearEndTarget": {
    "monthlyProfit": "2.1M",
    "date": "December 31, 2025",
    "annualGrowth": 18
  },
  "optimizationTip": "Focus on high-margin custom projects (40% margin) and engine services (50% margin) for faster profit acceleration."
}
```

**TypeScript Interface**:
```typescript
export interface MonthlyProfit {
  month: string
  profit: string  // Formatted string (e.g., "1.7M")
}

export interface ProfitProjection {
  monthOverMonthGrowth: number       // Average monthly growth percentage
  trajectory: MonthlyProfit[]        // 3-month profit trajectory
  yearEndTarget: {
    monthlyProfit: string            // Target monthly profit
    date: string                     // Target achievement date
    annualGrowth: number             // Annual growth percentage
  }
  optimizationTip: string            // AI-generated recommendation
}
```

**Backend Implementation**:
- Analyze historical profit data with trend analysis
- Factor in service mix optimization (high vs low margin services)
- Use linear regression or polynomial regression for trend projection
- Generate optimization recommendations based on margin analysis
- Consider cost structures and pricing strategies

**Calculation Formulas**:
```sql
-- Month-over-month growth
SELECT 
  (current_month_profit - previous_month_profit) / previous_month_profit * 100 AS mom_growth
FROM profit_summary

-- Projection formula (linear trend)
projected_profit = current_profit * (1 + avg_growth_rate) ^ months_ahead

-- Year-end target
annual_growth = (december_projected - january_actual) / january_actual * 100

-- Optimization analysis
SELECT service_type, AVG(margin) as avg_margin
FROM services
GROUP BY service_type
ORDER BY avg_margin DESC
LIMIT 3  -- Top 3 most profitable services
```

---

#### 5.3 Fetch Underperforming Departments

**Endpoint**: `GET /api/admin/ai-insights/underperforming-departments`  
**Function**: `fetchUnderperformingDepartments()`  
**Purpose**: AI-detected underperforming departments with root cause analysis

**Request**:
```http
GET /api/admin/ai-insights/underperforming-departments
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
[
  {
    "departmentName": "Brake Service Department",
    "slowerCompletion": 20,
    "avgCompletionTime": 72,
    "targetTime": 60,
    "rootCause": "Possible workload imbalance or outdated tools",
    "managerOversight": {
      "name": "C",
      "score": 82,
      "threshold": 90
    },
    "recommendation": "Audit brake dept processes, provide training, or reassign tasks to balance workload across team."
  }
]
```

**TypeScript Interface**:
```typescript
export interface UnderperformingDepartment {
  departmentName: string
  slowerCompletion: number           // Percentage slower than benchmark
  avgCompletionTime: number          // Average time in minutes
  targetTime: number                 // Target time in minutes
  rootCause: string                  // AI-identified root cause
  managerOversight: {
    name: string                     // Manager identifier
    score: number                    // Oversight quality score (0-100)
    threshold: number                // Minimum acceptable score
  }
  recommendation: string             // AI-generated action items
}
```

**Backend Implementation**:
- Compare department completion times against benchmarks
- Analyze task assignment quality and distribution
- Evaluate manager oversight metrics (task approval time, feedback quality)
- Use anomaly detection to identify unusual patterns
- Generate root cause analysis using decision trees or rule-based system
- Provide actionable recommendations based on similar historical cases

**AI Analysis Logic**:
```python
# Performance Analysis
1. Calculate department completion time: AVG(completion_time) by department
2. Compare against benchmark: (dept_time - benchmark_time) / benchmark_time * 100
3. Flag if > 10% slower than benchmark

# Root Cause Detection
Factors analyzed:
- Workload distribution (std dev of tasks per employee)
- Tool/equipment age and maintenance records
- Employee skill levels and training dates
- Manager oversight metrics (response time, feedback quality)
- Task complexity scores

# Recommendation Engine
IF workload_imbalance > threshold: "Redistribute tasks"
IF tools_outdated: "Upgrade equipment"
IF skills_gap: "Provide training"
IF manager_score < 90: "Review management practices"
```

---

#### 5.4 Fetch Skill Shortage Prediction

**Endpoint**: `GET /api/admin/ai-insights/skill-shortage-prediction`  
**Function**: `fetchSkillShortagePrediction()`  
**Purpose**: Predict future skill shortages and workforce crisis with action plans

**Request**:
```http
GET /api/admin/ai-insights/skill-shortage-prediction
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```json
[
  {
    "skillArea": "Electrical Diagnostics",
    "demandIncrease": 35,
    "availableEmployees": 2,
    "crisisWeeks": 8,
    "impactForecast": {
      "delayedCustomers": "12-15",
      "month": "December 2025",
      "revenueLoss": 180000
    },
    "actionPlan": [
      "Train 2 existing mechanics in electrical systems (4 weeks)",
      "Hire 1 experienced electrician immediately"
    ]
  }
]
```

**TypeScript Interface**:
```typescript
export interface SkillShortagePrediction {
  skillArea: string                  // Skill category at risk
  demandIncrease: number             // Demand increase percentage
  availableEmployees: number         // Current workforce count
  crisisWeeks: number                // Weeks until crisis point
  impactForecast: {
    delayedCustomers: string         // Expected delayed customers
    month: string                    // Crisis month
    revenueLoss: number              // Projected revenue loss
  }
  actionPlan: string[]               // Ordered action items
}
```

**Backend Implementation**:
- Forecast demand growth by skill area (from endpoint 5.1)
- Calculate current workforce capacity by skill
- Use queuing theory to determine saturation point
- Estimate time until workforce overwhelmed
- Calculate financial impact (delayed bookings × avg revenue)
- Generate action plans ranked by cost/benefit analysis

**Prediction Algorithm**:
```python
# Capacity Analysis
current_capacity = available_employees * max_tasks_per_employee * work_days
forecasted_demand = current_bookings * (1 + demand_increase / 100)
capacity_utilization = forecasted_demand / current_capacity

# Crisis Prediction
IF capacity_utilization > 0.9:
    crisis_weeks = weeks_until(capacity_utilization == 1.0)
    delayed_customers = (forecasted_demand - current_capacity) / avg_tasks_per_customer
    revenue_loss = delayed_customers * avg_revenue_per_customer

# Action Plan Generation
Options:
1. Train existing staff (cost: training_time × salary, timeline: 4-6 weeks)
2. Hire new staff (cost: recruitment + onboarding, timeline: 6-8 weeks)
3. Outsource temporary (cost: contractor_rate, timeline: 1-2 weeks)

Recommendation: Lowest cost option that resolves crisis before deadline
```

---

**Common Error Responses for All AI Insights Endpoints**:
```json
// 401 Unauthorized
{
  "error": "Invalid authentication token"
}

// 403 Forbidden
{
  "error": "Insufficient permissions to access AI insights"
}

// 500 Internal Server Error
{
  "error": "AI model processing error",
  "details": "Machine learning model unavailable"
}

// 503 Service Unavailable
{
  "error": "AI service temporarily unavailable",
  "details": "ML inference service is down"
}
```

---


### Page 6: Settings

**Route**: `/admin/settings`  
**File**: `/src/app/admin/settings/page.tsx`

**Status**: ✅ Implemented

**Description**: System configuration management for roles, services, task limits, and compensation rules.

**UI Sections**:
1. **Roles & Permissions** (Indigo/Purple gradient)
2. **Services & Pricing** (Cyan/Blue gradient)
3. **Task Limits** (Amber/Orange gradient)
4. **Compensation Rules** (Emerald/Teal gradient)

---

#### 6.1 Fetch Roles & Permissions

**Function**: `fetchRolesPermissions()`  
**Endpoint**: `GET /api/settings/roles`  
**Description**: Retrieve all system roles with user counts and permission details

**Request**: No body required

**Response**:
```json
[
  {
    "roleId": "role_001",
    "roleName": "Admin (Business Owner)",
    "userCount": 1,
    "permissions": "Full Access - All modules",
    "status": "Active"
  },
  {
    "roleId": "role_002",
    "roleName": "Manager",
    "userCount": 3,
    "permissions": "Task assignment, Employee management, Customer handling",
    "status": "Active"
  },
  {
    "roleId": "role_003",
    "roleName": "Employee",
    "userCount": 27,
    "permissions": "View assigned tasks, Update status, Chat with manager",
    "status": "Active"
  },
  {
    "roleId": "role_004",
    "roleName": "Customer",
    "userCount": 312,
    "permissions": "Book services, View history, Make payments",
    "status": "Active"
  }
]
```

**SQL Query**:
```sql
SELECT 
  role_id, role_name, 
  COUNT(user_id) as user_count,
  GROUP_CONCAT(permission_name) as permissions,
  status
FROM roles r
LEFT JOIN user_roles ur ON r.role_id = ur.role_id
LEFT JOIN role_permissions rp ON r.role_id = rp.role_id
GROUP BY r.role_id
```

**Response Codes**:
- **200**: Success - Returns array of role objects
- **401**: Unauthorized - Admin access required
- **500**: Internal server error

---

#### 6.2 Fetch Services & Pricing

**Function**: `fetchServicesPricing()`  
**Endpoint**: `GET /api/settings/services`  
**Description**: Retrieve all active services with pricing and duration information

**Request**: No body required

**Response**:
```json
[
  {
    "serviceId": "srv_001",
    "serviceName": "Engine Oil Change",
    "basePrice": 3500,
    "duration": "45 mins",
    "requiredSkill": "Engine Specialist",
    "status": "Active"
  },
  {
    "serviceId": "srv_002",
    "serviceName": "Brake Inspection",
    "basePrice": 2500,
    "duration": "60 mins",
    "requiredSkill": "Brake Systems",
    "status": "Active"
  },
  {
    "serviceId": "srv_003",
    "serviceName": "Electrical Diagnostics",
    "basePrice": 5000,
    "duration": "90 mins",
    "requiredSkill": "Electrical Systems",
    "status": "Active"
  }
]
```

**SQL Query**:
```sql
SELECT 
  service_id, service_name, base_price, 
  duration, required_skill, status
FROM services
WHERE deleted_at IS NULL
ORDER BY service_name ASC
```

**CRUD Operations**:
- **POST /api/settings/services** - Add new service
- **PUT /api/settings/services/:id** - Update service details
- **DELETE /api/settings/services/:id** - Disable/soft delete service

**Response Codes**:
- **200**: Success - Returns array of service objects
- **401**: Unauthorized - Admin access required
- **500**: Internal server error

---

#### 6.3 Fetch Task Limits

**Function**: `fetchTaskLimits()`  
**Endpoint**: `GET /api/settings/task-limits`  
**Description**: Retrieve employee task limit configuration

**Request**: No body required

**Response**:
```json
{
  "maxTasksPerDay": 5,
  "overloadThreshold": 4
}
```

**SQL Query**:
```sql
SELECT 
  max_tasks_per_day, overload_threshold
FROM system_config
WHERE config_key = 'task_limits'
LIMIT 1
```

**Update Operation**:
- **PUT /api/settings/task-limits** - Update task limits

**Request Body**:
```json
{
  "maxTasksPerDay": 5,
  "overloadThreshold": 4
}
```

**Response Codes**:
- **200**: Success - Returns task limits object
- **400**: Bad request - Invalid values (e.g., negative numbers)
- **401**: Unauthorized - Admin access required
- **500**: Internal server error

---

#### 6.4 Fetch Compensation Rules

**Function**: `fetchCompensationRules()`  
**Endpoint**: `GET /api/settings/compensation`  
**Description**: Retrieve compensation rules with auto-calculated bonus examples

**Request**: No body required

**Response**:
```json
{
  "baseSalary": 65000,
  "demandBonusPercentage": 30,
  "exampleBonus": 19500,
  "exampleTotal": 84500
}
```

**SQL Query**:
```sql
SELECT 
  base_salary, demand_bonus_percentage
FROM compensation_rules
WHERE active = true
LIMIT 1
```

**Calculation Logic**:
```typescript
const baseSalary = 65000
const bonusPercentage = 30
const bonusAmount = (baseSalary * bonusPercentage) / 100  // 19,500
const totalCompensation = baseSalary + bonusAmount  // 84,500
```

**Update Operation**:
- **PUT /api/settings/compensation** - Update compensation rules

**Request Body**:
```json
{
  "baseSalary": 65000,
  "demandBonusPercentage": 30
}
```

**Response Codes**:
- **200**: Success - Returns compensation rules with calculated examples
- **400**: Bad request - Invalid values (e.g., negative salary, bonus > 100%)
- **401**: Unauthorized - Admin access required
- **500**: Internal server error

**Business Rules**:
- Base salary must be positive
- Bonus percentage must be between 0-100%
- High-demand employees automatically receive the bonus
- Example calculation shown in UI for transparency

---

## Data Types & Schemas

All TypeScript interfaces are defined in `/src/services/adminService.ts`

### Common Types

```typescript
interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type?: 'system' | 'security' | 'approval'
}

interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}
```

### Dashboard Types

```typescript
interface DashboardStats {
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

interface SystemAlert {
  id: string
  type: 'warning' | 'info' | 'error'
  message: string
  timestamp: string
}

interface AIInsight {
  id: string
  title: string
  description: string
  category: 'forecast' | 'projection' | 'warning' | 'recommendation'
  icon: string
}
```

---

## Error Handling

### Standard Error Response

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { }
}
```

### HTTP Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (invalid/expired token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **500**: Internal Server Error

### Frontend Error Handling

All API functions include try-catch blocks:

```typescript
try {
  const data = await fetchDashboardStats()
  // Handle success
} catch (error) {
  console.error('Error:', error)
  // Show error message to user
}
```

---

## Backend Integration Guide

### Step 1: Update Service File

In `/src/services/adminService.ts`, uncomment the actual API calls and remove dummy data:

```typescript
// Before (Dummy):
console.log('API: Fetch dashboard stats')
return { /* dummy data */ }

// After (Real):
const response = await fetch('/api/admin/dashboard/stats', {
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
  }
})
if (!response.ok) throw new Error('API request failed')
return await response.json()
```

### Step 2: Configure Base URL

Add base URL configuration at the top of `adminService.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
```

### Step 3: Test with cURL

```bash
# Dashboard Stats
curl -X GET http://localhost:3000/api/admin/dashboard/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# System Alerts
curl -X GET http://localhost:3000/api/admin/dashboard/alerts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# AI Insights
curl -X GET http://localhost:3000/api/admin/dashboard/ai-insights \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Step 4: Database Queries (Example)

```sql
-- Dashboard Stats
SELECT 
  CONCAT('LKR ', ROUND(SUM(amount) / 1000000, 1), 'M') as profit_value,
  COUNT(DISTINCT customer_id) as active_customers,
  COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as ongoing_services,
  (SELECT COUNT(*) FROM employees WHERE status = 'active') as active_employees
FROM transactions
WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE);
```

### Step 5: Enable CORS

```javascript
// Backend (Express example)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}))
```

---

## Quick Reference

### File Structure

```
/src/services/adminService.ts
├── Type Definitions (Top)
├── Common/Shared Endpoints
├── Page 1: Dashboard
├── Page 2: Financial Reports
├── Page 3: Workforce Overview
├── Page 4: Services Analytics
├── Page 5: AI Insights
├── Page 6: Settings
```

### Adding New Endpoints

1. Define TypeScript interface at top of file
2. Add function under appropriate page section
3. Include TODO comment for backend integration
4. Add dummy data for development
5. Document in this file

---

## Status Legend

- ✅ **Implemented**: Endpoint ready with dummy data
- 🔴 **Pending**: Endpoint not implemented yet
- 🟡 **In Progress**: Endpoint being developed

---

## Contact & Support

**Frontend Service File**: `/src/services/adminService.ts`  
**Documentation**: `/API_DOCUMENTATION.md`  
**Last Updated**: November 5, 2025

For questions or issues, refer to the inline comments in `adminService.ts`
