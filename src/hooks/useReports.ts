"use client";

import { useCallback, useEffect, useState } from 'react';
import { getEmployeeEfficiency, getMostRequestedEmployees, getPartsDelayAnalytics, getCompletedProjectsByType } from '../services/api';
import { toast } from 'sonner';

export type ReportData = {
  employeeEfficiency: Array<{ employeeId: string; efficiency: number }>;
  mostRequested: Array<{ employeeId: string; requestCount: number }>;
  partsDelay: Array<{ partId: string; avgDelay: number }>;
  completedByType: Array<{ type: string; count: number }>;
};

export function useReports() {
  const [data, setData] = useState<Partial<ReportData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [efficiency, mostRequested, partsDelay, byType] = await Promise.all([
        getEmployeeEfficiency(),
        getMostRequestedEmployees(),
        getPartsDelayAnalytics(),
        getCompletedProjectsByType()
      ]);

      setData({
        employeeEfficiency: efficiency,
        mostRequested,
        partsDelay,
        completedByType: byType
      });
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}