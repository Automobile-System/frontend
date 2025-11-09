'use client';
import { useWebSocket } from './useWebSocket';

const WEBSOCKET_BASE = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080/websocket";

const WEBSOCKET_ENDPOINTS = {
  customerDashboard: (id: string) => `${WEBSOCKET_BASE}/customer/dashboard/${id}`,
  adminDashboard: () => `${WEBSOCKET_BASE}/admin/dashboard`,
};


export function useCustomerUpdates(customerId: string) {
  const { data, connected } = useWebSocket(WEBSOCKET_ENDPOINTS.customerDashboard(customerId));

  return {
    dashboardUpdate: data,
    connected,
  };
}
