"use client";

import { useCallback, useEffect, useState } from 'react';
import { getProjects, postProject } from '../services/api';
import { toast } from 'sonner';

export type Project = {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  tasks: {
    id: string;
    name: string;
    status: string;
    assignedTo?: string;
  }[];
};

export type NewProject = Omit<Project, 'id'>;

export function useProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const projects = await getProjects();
      setData(projects);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (project: NewProject) => {
    try {
      await postProject(project);
      toast.success('Project created successfully');
      refresh();
    } catch (err) {
      toast.error('Failed to create project');
      throw err;
    }
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh, createProject };
}