"use client";

import { useCallback, useEffect, useState } from 'react';
import { getOverview } from '../services/api';
import { toast } from 'sonner';

export type DashboardStats = {
  totalEmployees: number;
  activeProjects: number;
  pendingTasks: number;
  completedToday: number;
};

export function useDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const stats = await getOverview();
      setData(stats);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}