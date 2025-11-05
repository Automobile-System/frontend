"use client";

import { useEffect, useState, useCallback } from "react";
import { getEmployees, putEmployeeStatus, getEmployeeHistory } from "@/services/api";

export type Employee = {
  id: string;
  name: string;
  role: string;
  status: string;
  assignedTasks: number;
};

export function useEmployees() {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getEmployees();
      setData(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: string) => {
    await putEmployeeStatus(id, status);
    await load();
  };

  const getHistory = async (id: string) => {
    return getEmployeeHistory(id);
  };

  return { data, loading, error, refresh: load, updateStatus, getHistory };
}