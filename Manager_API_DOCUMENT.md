# Manager API Documentation

**Complete API Reference for Manager Panel - Customer Details**  
**Last Updated**: November 6, 2025  
**Version**: 1.0

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base Configuration](#base-configuration)
4. [Customer Management Endpoints](#customer-management-endpoints)
   - [Customer Overview & Statistics](#customer-overview--statistics)
   - [Customer List & Search](#customer-list--search)
   - [Customer Details](#customer-details)
   - [Active Services & Projects](#active-services--projects)
   - [Service & Project History](#service--project-history)
   - [Customer Analytics](#customer-analytics)
5. [Data Types & Interfaces](#data-types--interfaces)
6. [Error Handling](#error-handling)
7. [Usage Examples](#usage-examples)

---

## Overview

This document contains all API endpoints for the Manager's Customer Details page. All endpoints are centralized in `/src/services/managerService.ts` and are used in the customer details management interface.

**Base URL**: Configure in environment variable `NEXT_PUBLIC_BASE_URL`  
**Default**: `http://localhost:8080`  
**Authentication**: JWT Bearer Token (required for all endpoints)  
**Content-Type**: `application/json`

---

## Authentication

All API requests must include a JWT authentication token in the Authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

**Token Storage**: Frontend stores token in `localStorage.getItem('authToken')`

**Role Required**: `MANAGER` or `ADMIN`

**Error Responses**:
- **401 Unauthorized**: Invalid or expired token
- **403 Forbidden**: Insufficient permissions (not a manager/admin)

---

## Base Configuration

### Environment Variables

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8080
```

### Service File Location

```
frontend/src/services/managerService.ts
```

### Page Location

```
frontend/src/app/manager/customersdetails/page.tsx
```

---

## Customer Management Endpoints

### Customer Overview & Statistics

#### 1. Fetch Customer Overview

**Function**: `fetchCustomerOverview()`  
**Endpoint**: `GET /api/manager/customers/overview`  
**Description**: Get comprehensive overview statistics for all customers

**Request**: No body required

**Response**:
```json
{
  "totalCustomers": 150,
  "newThisMonth": 12,
  "activeCustomers": 128,
  "activityRate": 85.3,
  "topCustomer": {
    "name": "Nimal Perera",
    "email": "nimal.perera@email.com",
    "totalSpent": 245780,
    "servicesUsed": 18
  },
  "ratingDistribution": {
    "five": 65.5,
    "four": 22.3,
    "three": 8.7,
    "below": 3.5
  }
}
```

**SQL Query Example**:
```sql
-- Total and new customers
SELECT 
  COUNT(*) as total_customers,
  COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH) THEN 1 END) as new_this_month,
  COUNT(CASE WHEN status = 'Active' THEN 1 END) as active_customers,
  (COUNT(CASE WHEN status = 'Active' THEN 1 END) * 100.0 / COUNT(*)) as activity_rate
FROM customers;

-- Top spending customer
SELECT 
  c.name, 
  c.email, 
  SUM(s.cost) as total_spent,
  COUNT(DISTINCT s.id) as services_used
FROM customers c
LEFT JOIN services s ON c.id = s.customer_id
GROUP BY c.id, c.name, c.email
ORDER BY total_spent DESC
LIMIT 1;

-- Rating distribution
SELECT 
  SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) * 100.0 / COUNT(*) as five,
  SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) * 100.0 / COUNT(*) as four,
  SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) * 100.0 / COUNT(*) as three,
  SUM(CASE WHEN rating < 3 THEN 1 ELSE 0 END) * 100.0 / COUNT(*) as below
FROM service_ratings;
```

**Response Codes**:
- **200**: Success - Returns overview data
- **401**: Unauthorized - Invalid/missing token
- **403**: Forbidden - Insufficient permissions
- **500**: Internal server error

**Usage**:
```typescript
const overview = await fetchCustomerOverview();
console.log(`Total customers: ${overview.totalCustomers}`);
console.log(`Active customers: ${overview.activeCustomers} (${overview.activityRate}%)`);
```

---

### Customer List & Search

#### 2. Fetch Customer List

**Function**: `fetchCustomerList()`  
**Endpoint**: `GET /api/manager/customers/list`  
**Description**: Get detailed list of all customers with their information

**Request**: No body required

**Response**:
```json
[
  {
    "id": "CUST001",
    "name": "Nimal Perera",
    "email": "nimal.perera@email.com",
    "phone": "+94 77 123 4567",
    "vehicleCount": 2,
    "totalSpent": 45780,
    "lastServiceDate": "2024-10-28",
    "status": "Active"
  },
  {
    "id": "CUST002",
    "name": "Saman Silva",
    "email": "saman.silva@email.com",
    "phone": "+94 71 234 5678",
    "vehicleCount": 1,
    "totalSpent": 12450,
    "lastServiceDate": "2024-10-25",
    "status": "Active"
  }
]
```

**SQL Query Example**:
```sql
SELECT 
  c.id,
  c.name,
  c.email,
  c.phone,
  COUNT(DISTINCT v.id) as vehicle_count,
  COALESCE(SUM(s.cost), 0) as total_spent,
  MAX(s.start_date) as last_service_date,
  c.status
FROM customers c
LEFT JOIN vehicles v ON c.id = v.customer_id
LEFT JOIN services s ON c.id = s.customer_id
GROUP BY c.id, c.name, c.email, c.phone, c.status
ORDER BY c.name ASC;
```

**Response Codes**:
- **200**: Success - Returns array of customers
- **401**: Unauthorized - Invalid/missing token
- **403**: Forbidden - Insufficient permissions
- **500**: Internal server error

---

#### 3. Search Customers

**Function**: `searchCustomers(query: string)`  
**Endpoint**: `GET /api/manager/customers/search?q={query}`  
**Description**: Search customers by name, email, or phone number

**Query Parameters**:
- `q` (required): Search query string

**Example Request**:
```http
GET /api/manager/customers/search?q=nimal
```

**Response**:
```json
[
  {
    "id": "CUST001",
    "name": "Nimal Perera",
    "email": "nimal.perera@email.com",
    "phone": "+94 77 123 4567",
    "vehicleCount": 2,
    "totalSpent": 45780,
    "lastServiceDate": "2024-10-28",
    "status": "Active"
  }
]
```

**SQL Query Example**:
```sql
SELECT 
  c.id,
  c.name,
  c.email,
  c.phone,
  COUNT(DISTINCT v.id) as vehicle_count,
  COALESCE(SUM(s.cost), 0) as total_spent,
  MAX(s.start_date) as last_service_date,
  c.status
FROM customers c
LEFT JOIN vehicles v ON c.id = v.customer_id
LEFT JOIN services s ON c.id = s.customer_id
WHERE 
  LOWER(c.name) LIKE LOWER(CONCAT('%', ?, '%'))
  OR LOWER(c.email) LIKE LOWER(CONCAT('%', ?, '%'))
  OR c.phone LIKE CONCAT('%', ?, '%')
GROUP BY c.id, c.name, c.email, c.phone, c.status
ORDER BY c.name ASC;
```

**Response Codes**:
- **200**: Success - Returns matching customers
- **400**: Bad request - Invalid query parameter
- **401**: Unauthorized
- **500**: Internal server error

---

#### 4. Filter Customers by Status

**Function**: `filterCustomersByStatus(status: string)`  
**Endpoint**: `GET /api/manager/customers/filter?status={status}`  
**Description**: Filter customers by their status (Active/Inactive)

**Query Parameters**:
- `status` (required): Customer status ("Active" or "Inactive")

**Example Request**:
```http
GET /api/manager/customers/filter?status=Active
```

**Response**: Same structure as customer list (array of Customer objects)

**SQL Query Example**:
```sql
SELECT 
  c.id,
  c.name,
  c.email,
  c.phone,
  COUNT(DISTINCT v.id) as vehicle_count,
  COALESCE(SUM(s.cost), 0) as total_spent,
  MAX(s.start_date) as last_service_date,
  c.status
FROM customers c
LEFT JOIN vehicles v ON c.id = v.customer_id
LEFT JOIN services s ON c.id = s.customer_id
WHERE c.status = ?
GROUP BY c.id, c.name, c.email, c.phone, c.status
ORDER BY c.name ASC;
```

**Response Codes**:
- **200**: Success - Returns filtered customers
- **400**: Bad request - Invalid status value
- **401**: Unauthorized
- **500**: Internal server error

---

#### 5. Add New Customer

**Function**: `addCustomer(customerData: AddCustomerRequest)`  
**Endpoint**: `POST /api/manager/customers`  
**Description**: Create a new customer record

**Request Body**:
```json
{
  "name": "New Customer",
  "email": "new@email.com",
  "phone": "+94 77 000 0000",
  "address": "123 Main Street, Colombo"
}
```

**Response**:
```json
{
  "id": "CUST151",
  "name": "New Customer",
  "email": "new@email.com",
  "phone": "+94 77 000 0000",
  "vehicleCount": 0,
  "totalSpent": 0,
  "lastServiceDate": null,
  "status": "Active"
}
```

**SQL Query Example**:
```sql
INSERT INTO customers (name, email, phone, address, status, created_at)
VALUES (?, ?, ?, ?, 'Active', NOW())
RETURNING id, name, email, phone, status;
```

**Response Codes**:
- **201**: Created - Customer successfully created
- **400**: Bad request - Invalid data or duplicate email
- **401**: Unauthorized
- **409**: Conflict - Email already exists
- **500**: Internal server error

---

#### 6. Update Customer Status

**Function**: `updateCustomerStatus(customerId: string, newStatus: string)`  
**Endpoint**: `PUT /api/manager/customers/:id/status`  
**Description**: Update customer status (Active/Inactive)

**Request Body**:
```json
{
  "status": "Inactive"
}
```

**Response**: Returns updated customer object

**SQL Query Example**:
```sql
UPDATE customers
SET status = ?, updated_at = NOW()
WHERE id = ?
RETURNING id, name, email, phone, status;
```

**Response Codes**:
- **200**: Success - Status updated
- **400**: Bad request - Invalid status value
- **401**: Unauthorized
- **404**: Not found - Customer doesn't exist
- **500**: Internal server error

---

#### 7. Update Customer Information

**Function**: `updateCustomer(customerId: string, customerData: UpdateCustomerRequest)`  
**Endpoint**: `PUT /api/manager/customers/:id`  
**Description**: Update customer details

**Request Body**:
```json
{
  "name": "Updated Name",
  "email": "updated@email.com",
  "phone": "+94 77 999 9999",
  "address": "New Address",
  "notes": "VIP customer"
}
```

**Response**: Returns updated customer object

**SQL Query Example**:
```sql
UPDATE customers
SET 
  name = COALESCE(?, name),
  email = COALESCE(?, email),
  phone = COALESCE(?, phone),
  address = COALESCE(?, address),
  notes = COALESCE(?, notes),
  updated_at = NOW()
WHERE id = ?
RETURNING id, name, email, phone, status;
```

**Response Codes**:
- **200**: Success - Customer updated
- **400**: Bad request - Invalid data
- **401**: Unauthorized
- **404**: Not found
- **409**: Conflict - Email already in use
- **500**: Internal server error

---

#### 8. Delete Customer

**Function**: `deleteCustomer(customerId: string)`  
**Endpoint**: `DELETE /api/manager/customers/:id`  
**Description**: Delete a customer record (consider soft delete)

**Request**: No body required (customer ID in URL)

**Response**:
```json
{
  "message": "Customer deleted successfully"
}
```

**SQL Query Example (Soft Delete - Recommended)**:
```sql
UPDATE customers
SET status = 'Deleted', deleted_at = NOW()
WHERE id = ?;
```

**SQL Query Example (Hard Delete)**:
```sql
DELETE FROM customers WHERE id = ?;
```

**Response Codes**:
- **200**: Success - Customer deleted
- **401**: Unauthorized
- **404**: Not found - Customer doesn't exist
- **409**: Conflict - Customer has active services/projects
- **500**: Internal server error

---

### Customer Details

#### 9. Fetch Customer Details

**Function**: `fetchCustomerDetails(customerId: string)`  
**Endpoint**: `GET /api/manager/customers/:id`  
**Description**: Get comprehensive details about a specific customer

**Example Request**:
```http
GET /api/manager/customers/CUST001
```

**Response**:
```json
{
  "id": "CUST001",
  "name": "Nimal Perera",
  "email": "nimal.perera@email.com",
  "phone": "+94 77 123 4567",
  "status": "Active",
  "memberSince": "2023-01-15",
  "vehicleCount": 2,
  "totalServices": 18,
  "totalProjects": 3,
  "totalSpent": 245780,
  "address": "123 Main Street, Colombo 07",
  "notes": "Preferred customer, always pays on time"
}
```

**SQL Query Example**:
```sql
SELECT 
  c.id,
  c.name,
  c.email,
  c.phone,
  c.status,
  c.created_at as member_since,
  c.address,
  c.notes,
  COUNT(DISTINCT v.id) as vehicle_count,
  COUNT(DISTINCT s.id) as total_services,
  COUNT(DISTINCT p.id) as total_projects,
  COALESCE(SUM(s.cost), 0) + COALESCE(SUM(p.budget), 0) as total_spent
FROM customers c
LEFT JOIN vehicles v ON c.id = v.customer_id
LEFT JOIN services s ON c.id = s.customer_id
LEFT JOIN projects p ON c.id = p.customer_id
WHERE c.id = ?
GROUP BY c.id, c.name, c.email, c.phone, c.status, c.created_at, c.address, c.notes;
```

**Response Codes**:
- **200**: Success - Returns customer details
- **401**: Unauthorized
- **404**: Not found - Customer doesn't exist
- **500**: Internal server error

---

### Active Services & Projects

#### 10. Fetch Customer Active Services

**Function**: `fetchCustomerActiveServices(customerId: string)`  
**Endpoint**: `GET /api/manager/customers/:id/services/active`  
**Description**: Get all currently active/ongoing services for a customer

**Example Request**:
```http
GET /api/manager/customers/CUST001/services/active
```

**Response**:
```json
[
  {
    "id": "SRV001",
    "serviceName": "Full Service",
    "vehicleInfo": "Toyota Corolla - ABC-1234",
    "status": "In Progress",
    "startDate": "2024-11-01",
    "expectedCompletion": "2024-11-08",
    "assignedEmployee": "Kamal Silva",
    "cost": 15000,
    "progress": 65,
    "notes": "Waiting for spare parts"
  },
  {
    "id": "SRV002",
    "serviceName": "Engine Diagnostics",
    "vehicleInfo": "Honda Civic - XYZ-5678",
    "status": "Pending",
    "startDate": "2024-11-05",
    "expectedCompletion": "2024-11-06",
    "assignedEmployee": "Sunil Fernando",
    "cost": 8000,
    "progress": 0
  }
]
```

**SQL Query Example**:
```sql
SELECT 
  s.id,
  st.name as service_name,
  CONCAT(v.make, ' ', v.model, ' - ', v.license_plate) as vehicle_info,
  s.status,
  s.start_date,
  s.expected_completion,
  CONCAT(e.first_name, ' ', e.last_name) as assigned_employee,
  s.cost,
  s.progress,
  s.notes
FROM services s
JOIN service_types st ON s.service_type_id = st.id
JOIN vehicles v ON s.vehicle_id = v.id
JOIN employees e ON s.assigned_employee_id = e.id
WHERE s.customer_id = ? 
  AND s.status IN ('In Progress', 'Pending')
ORDER BY s.start_date DESC;
```

**Response Codes**:
- **200**: Success - Returns array of active services
- **401**: Unauthorized
- **404**: Not found - Customer doesn't exist
- **500**: Internal server error

---

#### 11. Fetch Customer Active Projects

**Function**: `fetchCustomerActiveProjects(customerId: string)`  
**Endpoint**: `GET /api/manager/customers/:id/projects/active`  
**Description**: Get all currently active/ongoing projects for a customer

**Example Request**:
```http
GET /api/manager/customers/CUST001/projects/active
```

**Response**:
```json
[
  {
    "id": "PRJ001",
    "projectName": "Custom Body Kit Installation",
    "description": "Full body kit with paint job",
    "status": "In Progress",
    "startDate": "2024-10-15",
    "expectedCompletion": "2024-11-30",
    "progress": 45,
    "budget": 150000,
    "assignedTeam": ["Kamal Silva", "Sunil Fernando", "Nimal Dias"],
    "notes": "Customer requested premium paint"
  }
]
```

**SQL Query Example**:
```sql
SELECT 
  p.id,
  p.name as project_name,
  p.description,
  p.status,
  p.start_date,
  p.expected_completion,
  p.progress,
  p.budget,
  p.notes,
  GROUP_CONCAT(CONCAT(e.first_name, ' ', e.last_name)) as assigned_team
FROM projects p
LEFT JOIN project_team pt ON p.id = pt.project_id
LEFT JOIN employees e ON pt.employee_id = e.id
WHERE p.customer_id = ? 
  AND p.status IN ('In Progress', 'Not Started', 'On Hold')
GROUP BY p.id, p.name, p.description, p.status, p.start_date, p.expected_completion, p.progress, p.budget, p.notes
ORDER BY p.start_date DESC;
```

**Response Codes**:
- **200**: Success - Returns array of active projects
- **401**: Unauthorized
- **404**: Not found - Customer doesn't exist
- **500**: Internal server error

---

### Service & Project History

#### 12. Fetch Customer Service History

**Function**: `fetchCustomerServiceHistory(customerId: string)`  
**Endpoint**: `GET /api/manager/customers/:id/services/history`  
**Description**: Get complete history of all services (completed, cancelled)

**Example Request**:
```http
GET /api/manager/customers/CUST001/services/history
```

**Response**: Same structure as active services, but includes completed/cancelled services

**SQL Query Example**:
```sql
SELECT 
  s.id,
  st.name as service_name,
  CONCAT(v.make, ' ', v.model, ' - ', v.license_plate) as vehicle_info,
  s.status,
  s.start_date,
  s.completion_date as expected_completion,
  CONCAT(e.first_name, ' ', e.last_name) as assigned_employee,
  s.cost,
  s.progress,
  s.notes
FROM services s
JOIN service_types st ON s.service_type_id = st.id
JOIN vehicles v ON s.vehicle_id = v.id
JOIN employees e ON s.assigned_employee_id = e.id
WHERE s.customer_id = ? 
  AND s.status IN ('Completed', 'Cancelled')
ORDER BY s.completion_date DESC;
```

**Response Codes**:
- **200**: Success - Returns array of service history
- **401**: Unauthorized
- **404**: Not found
- **500**: Internal server error

---

#### 13. Fetch Customer Project History

**Function**: `fetchCustomerProjectHistory(customerId: string)`  
**Endpoint**: `GET /api/manager/customers/:id/projects/history`  
**Description**: Get complete history of all projects (completed, cancelled)

**Example Request**:
```http
GET /api/manager/customers/CUST001/projects/history
```

**Response**: Same structure as active projects, but includes completed/cancelled projects

**SQL Query Example**:
```sql
SELECT 
  p.id,
  p.name as project_name,
  p.description,
  p.status,
  p.start_date,
  p.completion_date as expected_completion,
  p.progress,
  p.budget,
  p.notes,
  GROUP_CONCAT(CONCAT(e.first_name, ' ', e.last_name)) as assigned_team
FROM projects p
LEFT JOIN project_team pt ON p.id = pt.project_id
LEFT JOIN employees e ON pt.employee_id = e.id
WHERE p.customer_id = ? 
  AND p.status IN ('Completed', 'Cancelled')
GROUP BY p.id, p.name, p.description, p.status, p.start_date, p.completion_date, p.progress, p.budget, p.notes
ORDER BY p.completion_date DESC;
```

**Response Codes**:
- **200**: Success - Returns array of project history
- **401**: Unauthorized
- **404**: Not found
- **500**: Internal server error

---

#### 14. Fetch Customer Vehicles

**Function**: `fetchCustomerVehicles(customerId: string)`  
**Endpoint**: `GET /api/manager/customers/:id/vehicles`  
**Description**: Get all vehicles owned by the customer

**Example Request**:
```http
GET /api/manager/customers/CUST001/vehicles
```

**Response**:
```json
[
  {
    "id": "VEH001",
    "make": "Toyota",
    "model": "Corolla",
    "year": 2020,
    "licensePlate": "ABC-1234",
    "color": "Silver",
    "vin": "JT2BF28K5X0123456"
  }
]
```

**Response Codes**:
- **200**: Success
- **401**: Unauthorized
- **404**: Not found
- **500**: Internal server error

---

#### 15. Fetch Customer Payments

**Function**: `fetchCustomerPayments(customerId: string)`  
**Endpoint**: `GET /api/manager/customers/:id/payments`  
**Description**: Get payment history for the customer

**Example Request**:
```http
GET /api/manager/customers/CUST001/payments
```

**Response**:
```json
[
  {
    "id": "PAY001",
    "date": "2024-11-01",
    "amount": 15000,
    "method": "Credit Card",
    "status": "Completed",
    "serviceId": "SRV001",
    "description": "Full Service Payment"
  }
]
```

**Response Codes**:
- **200**: Success
- **401**: Unauthorized
- **404**: Not found
- **500**: Internal server error

---

### Customer Analytics

#### 16. Fetch Customer Spending Analytics

**Function**: `fetchCustomerSpendingAnalytics(customerId: string)`  
**Endpoint**: `GET /api/manager/customers/:id/analytics/spending`  
**Description**: Get detailed spending patterns and analytics

**Example Request**:
```http
GET /api/manager/customers/CUST001/analytics/spending
```

**Response**:
```json
{
  "totalSpent": 245780,
  "averagePerService": 13654,
  "monthlySpending": [
    { "month": "2024-01", "amount": 25000 },
    { "month": "2024-02", "amount": 18000 }
  ],
  "categoryBreakdown": {
    "maintenance": 120000,
    "repairs": 85000,
    "customization": 40780
  }
}
```

**Response Codes**:
- **200**: Success
- **401**: Unauthorized
- **404**: Not found
- **500**: Internal server error

---

#### 17. Fetch Customer Satisfaction Metrics

**Function**: `fetchCustomerSatisfactionMetrics(customerId: string)`  
**Endpoint**: `GET /api/manager/customers/:id/analytics/satisfaction`  
**Description**: Get customer satisfaction ratings and feedback

**Example Request**:
```http
GET /api/manager/customers/CUST001/analytics/satisfaction
```

**Response**:
```json
{
  "averageRating": 4.7,
  "totalReviews": 18,
  "ratingDistribution": {
    "5": 12,
    "4": 5,
    "3": 1,
    "2": 0,
    "1": 0
  },
  "recentFeedback": [
    {
      "date": "2024-10-28",
      "rating": 5,
      "comment": "Excellent service as always",
      "serviceId": "SRV015"
    }
  ]
}
```

**Response Codes**:
- **200**: Success
- **401**: Unauthorized
- **404**: Not found
- **500**: Internal server error

---

## Data Types & Interfaces

### TypeScript Interfaces

```typescript
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
```

---

## Error Handling

### Error Response Format

```json
{
  "message": "Error description",
  "status": 400,
  "timestamp": "2024-11-06T10:30:00Z",
  "path": "/api/manager/customers/CUST001"
}
```

### Common Error Codes

| Code | Description | Common Causes |
|------|-------------|---------------|
| 400 | Bad Request | Invalid input data, missing required fields |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | Insufficient permissions (not a manager) |
| 404 | Not Found | Customer ID doesn't exist |
| 409 | Conflict | Duplicate email, customer has active services |
| 500 | Internal Server Error | Database error, server issue |

### Frontend Error Handling

```typescript
try {
  const customer = await fetchCustomerDetails('CUST001');
  console.log(customer);
} catch (error) {
  if (error.status === 404) {
    toast.error('Customer not found');
  } else if (error.status === 401) {
    // Redirect to login
    router.push('/login');
  } else {
    toast.error('An error occurred: ' + error.message);
  }
}
```

---

## Usage Examples

### Example 1: Load Customer Overview Dashboard

```typescript
import { 
  fetchCustomerOverview, 
  fetchCustomerList 
} from '@/services/managerService';

async function loadDashboard() {
  try {
    const [overview, customers] = await Promise.all([
      fetchCustomerOverview(),
      fetchCustomerList()
    ]);
    
    console.log(`Total Customers: ${overview.totalCustomers}`);
    console.log(`Active Customers: ${overview.activeCustomers}`);
    console.log(`Customer List:`, customers);
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}
```

### Example 2: Search and Filter Customers

```typescript
import { 
  searchCustomers, 
  filterCustomersByStatus 
} from '@/services/managerService';

// Search by name/email/phone
const searchResults = await searchCustomers('nimal');
console.log('Search results:', searchResults);

// Filter by status
const activeCustomers = await filterCustomersByStatus('Active');
console.log('Active customers:', activeCustomers);
```

### Example 3: View Complete Customer Details

```typescript
import { 
  fetchCustomerDetails,
  fetchCustomerActiveServices,
  fetchCustomerActiveProjects,
  fetchCustomerServiceHistory,
  fetchCustomerProjectHistory
} from '@/services/managerService';

async function viewCustomerDetails(customerId: string) {
  try {
    const [details, activeServices, activeProjects, serviceHistory, projectHistory] = 
      await Promise.all([
        fetchCustomerDetails(customerId),
        fetchCustomerActiveServices(customerId),
        fetchCustomerActiveProjects(customerId),
        fetchCustomerServiceHistory(customerId),
        fetchCustomerProjectHistory(customerId)
      ]);
    
    console.log('Customer:', details);
    console.log('Active Services:', activeServices);
    console.log('Active Projects:', activeProjects);
    console.log('Service History:', serviceHistory);
    console.log('Project History:', projectHistory);
  } catch (error) {
    console.error('Error loading customer details:', error);
  }
}
```

### Example 4: Add New Customer

```typescript
import { addCustomer } from '@/services/managerService';

const newCustomerData = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+94 77 123 4567',
  address: '123 Main Street, Colombo'
};

try {
  const customer = await addCustomer(newCustomerData);
  console.log('Customer created:', customer);
  toast.success('Customer added successfully!');
} catch (error) {
  console.error('Error adding customer:', error);
  toast.error('Failed to add customer');
}
```

### Example 5: Update Customer Status

```typescript
import { updateCustomerStatus } from '@/services/managerService';

async function toggleCustomerStatus(customerId: string, currentStatus: string) {
  const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
  
  try {
    const updatedCustomer = await updateCustomerStatus(customerId, newStatus);
    console.log('Status updated:', updatedCustomer);
    toast.success(`Customer ${newStatus.toLowerCase()}`);
  } catch (error) {
    console.error('Error updating status:', error);
    toast.error('Failed to update status');
  }
}
```

---

## Implementation Checklist

### Backend Development

- [ ] Implement all API endpoints listed in this document
- [ ] Add JWT authentication middleware
- [ ] Implement role-based access control (MANAGER role)
- [ ] Add input validation for all endpoints
- [ ] Implement proper error handling
- [ ] Add database indexes for performance
- [ ] Write unit tests for all endpoints
- [ ] Add API rate limiting
- [ ] Implement logging for all operations
- [ ] Add database transactions for data consistency

### Frontend Development

- [x] Create `managerService.ts` with all API functions
- [x] Create customer details page UI
- [ ] Add loading states and error handling
- [ ] Implement search and filter functionality
- [ ] Add customer details modal
- [ ] Implement tabs for active/history views
- [ ] Add customer analytics visualizations
- [ ] Implement real-time updates (if needed)
- [ ] Add export functionality (CSV/PDF)
- [ ] Write integration tests

### Testing

- [ ] Test all API endpoints with Postman
- [ ] Test authentication and authorization
- [ ] Test error scenarios
- [ ] Test with large datasets
- [ ] Perform security testing
- [ ] Test cross-browser compatibility
- [ ] Test responsive design

---

## Database Schema Reference

### Required Tables

```sql
-- Customers table
CREATE TABLE customers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  status ENUM('Active', 'Inactive', 'Deleted') DEFAULT 'Active',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);

-- Vehicles table
CREATE TABLE vehicles (
  id VARCHAR(50) PRIMARY KEY,
  customer_id VARCHAR(50) NOT NULL,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  license_plate VARCHAR(20) UNIQUE NOT NULL,
  color VARCHAR(50),
  vin VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  INDEX idx_customer_id (customer_id)
);

-- Services table
CREATE TABLE services (
  id VARCHAR(50) PRIMARY KEY,
  customer_id VARCHAR(50) NOT NULL,
  vehicle_id VARCHAR(50) NOT NULL,
  service_type_id VARCHAR(50) NOT NULL,
  assigned_employee_id VARCHAR(50) NOT NULL,
  status ENUM('Pending', 'In Progress', 'Completed', 'Cancelled') NOT NULL,
  start_date DATE NOT NULL,
  expected_completion DATE,
  completion_date DATE,
  cost DECIMAL(10, 2) NOT NULL,
  progress INT DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  INDEX idx_customer_id (customer_id),
  INDEX idx_status (status),
  INDEX idx_start_date (start_date)
);

-- Projects table
CREATE TABLE projects (
  id VARCHAR(50) PRIMARY KEY,
  customer_id VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled') NOT NULL,
  start_date DATE NOT NULL,
  expected_completion DATE,
  completion_date DATE,
  progress INT DEFAULT 0,
  budget DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  INDEX idx_customer_id (customer_id),
  INDEX idx_status (status)
);
```

---

## Support and Maintenance

### Contact Information

**Development Team**: EAD Team  
**Last Updated**: November 6, 2025  
**Version**: 1.0

### Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-11-06 | Initial API documentation for manager customer details |

---

**End of Documentation**
