"use client";

import { useCallback, useEffect, useState } from 'react';
import { getSchedule, putScheduleTask, postAutoBalance } from '../services/api';
import { toast } from 'sonner';

export type ScheduleTask = {
  id: string;
  taskId: string;
  employeeId: string;
  startTime: string;
  endTime: string;
  status: string;
};

export type ScheduleUpdate = {
  startTime: string;
  endTime: string;
  employeeId?: string;
};

export function useSchedule(fromDate?: string, toDate?: string) {
  const [data, setData] = useState<ScheduleTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const schedule = await getSchedule(fromDate, toDate);
      setData(schedule);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load schedule');
    } finally {
      setLoading(false);
    }
  }, [fromDate, toDate]);

  const updateTask = useCallback(async (taskId: string, update: ScheduleUpdate) => {
    try {
      await putScheduleTask(taskId, update);
      toast.success('Schedule updated');
      refresh();
    } catch (err) {
      toast.error('Failed to update schedule');
      throw err;
    }
  }, [refresh]);

  const autoBalance = useCallback(async () => {
    try {
      await postAutoBalance();
      toast.success('Schedule auto-balanced');
      refresh();
    } catch (err) {
      toast.error('Failed to auto-balance schedule');
      throw err;
    }
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh, updateTask, autoBalance };
}