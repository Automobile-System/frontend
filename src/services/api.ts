// frontend/src/services/api.ts
export type ApiError = { message?: string; status?: number };

async function handleRes(res: Response) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let json;
    try { json = JSON.parse(text); } catch { json = undefined; }
    const message = json?.message ?? text ?? res.statusText;
    const err: ApiError = { message, status: res.status };
    throw err;
  }
  return res.status === 204 ? null : res.json();
}

const apiFetch = async (path: string, opts: RequestInit = {}) => {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(base + path, {
    credentials: "include", // Changed to "include" for HTTP-only cookies
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    ...opts,
  });
  return handleRes(res);
};

/* Dashboard */
export const getOverview = () => apiFetch("/api/dashboard/overview");

/* Employees */
export const getEmployees = () => apiFetch("/api/employees");
export const putEmployeeStatus = (id: string, status: string) =>
  apiFetch(`/api/employees/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
export const getEmployeeHistory = (id: string) =>
  apiFetch(`/api/employees/${id}/history`);

/* Services / Tasks / Projects */
export const postTask = (payload: Record<string, unknown>) =>
  apiFetch("/api/tasks", { method: "POST", body: JSON.stringify(payload) });

export const postProject = (payload: Record<string, unknown>) =>
  apiFetch("/api/projects", { method: "POST", body: JSON.stringify(payload) });

export const getProjects = () => apiFetch("/api/projects");

/* Dropdown lists */
export const getServiceTypes = () => apiFetch("/api/services/types");
export const getAvailableEmployees = () => apiFetch("/api/employees/available");

/* Schedule */
export const getSchedule = (fromIso?: string, toIso?: string) =>
  apiFetch(`/api/schedule${fromIso && toIso ? `?from=${fromIso}&to=${toIso}` : ""}`);

export const putScheduleTask = (id: string, payload: Record<string, unknown>) =>
  apiFetch(`/api/schedule/task/${id}`, { method: "PUT", body: JSON.stringify(payload) });

export const postAutoBalance = () =>
  apiFetch("/api/schedule/auto-balance", { method: "POST" });

/* Reports */
export const getEmployeeEfficiency = () => apiFetch("/api/reports/employee-efficiency");
export const getMostRequestedEmployees = () => apiFetch("/api/reports/most-requested-employees");
export const getPartsDelayAnalytics = () => apiFetch("/api/reports/parts-delay-analytics");
export const getCompletedProjectsByType = () => apiFetch("/api/reports/completed-projects-by-type");

/* Customer Profile */
export const getCustomerProfile = () => apiFetch("/api/customer/profile");

export const updateCustomerProfile = (payload: {
  email?: string;
  firstName?: string;
  lastName?: string;
  nationalId?: string;
  phoneNumber?: string;
  profileImageUrl?: string;
}) => apiFetch("/api/customer/profile", { 
  method: "PUT", 
  body: JSON.stringify(payload) 
});

/* Customer Vehicles */
export const getCustomerVehicles = () => apiFetch("/api/customer/vehicles");

export const addCustomerVehicle = (payload: {
  registrationNo: string;
  brandName: string;
  model: string;
  capacity: number;
}) => apiFetch("/api/customer/vehicles", {
  method: "POST",
  body: JSON.stringify(payload)
});

export const deleteCustomerVehicle = (id: string) => 
  apiFetch(`/api/customer/vehicles/${id}`, {
    method: "DELETE"
  });
