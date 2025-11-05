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
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "";
  const res = await fetch(base + path, {
    credentials: "same-origin",
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
export const postTask = (payload: any) =>
  apiFetch("/api/tasks", { method: "POST", body: JSON.stringify(payload) });

export const postProject = (payload: any) =>
  apiFetch("/api/projects", { method: "POST", body: JSON.stringify(payload) });

export const getProjects = () => apiFetch("/api/projects");

/* Dropdown lists */
export const getServiceTypes = () => apiFetch("/api/services/types");
export const getAvailableEmployees = () => apiFetch("/api/employees/available");

/* Schedule */
export const getSchedule = (fromIso?: string, toIso?: string) =>
  apiFetch(`/api/schedule${fromIso && toIso ? `?from=${fromIso}&to=${toIso}` : ""}`);

export const putScheduleTask = (id: string, payload: any) =>
  apiFetch(`/api/schedule/task/${id}`, { method: "PUT", body: JSON.stringify(payload) });

export const postAutoBalance = () =>
  apiFetch("/api/schedule/auto-balance", { method: "POST" });

/* Reports */
export const getEmployeeEfficiency = () => apiFetch("/api/reports/employee-efficiency");
export const getMostRequestedEmployees = () => apiFetch("/api/reports/most-requested-employees");
export const getPartsDelayAnalytics = () => apiFetch("/api/reports/parts-delay-analytics");
export const getCompletedProjectsByType = () => apiFetch("/api/reports/completed-projects-by-type");
