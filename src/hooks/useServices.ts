"use client";

import { useCallback, useEffect, useState } from 'react';
import { getServiceTypes } from '../services/api';
import { toast } from 'sonner';

export type ServiceType = {
  id: string;
  name: string;
  description: string;
  estimatedDuration: number;
  requiredParts?: string[];
};

export function useServices() {
  const [data, setData] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const types = await getServiceTypes();
      setData(types);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load service types');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}