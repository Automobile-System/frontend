export type ProjectStatus =
  | "In Progress"
  | "Completed"
  | "On Hold"
  | "Not Started"
  | "Cancelled"

export interface Project {
  id: string
  name: string
  cost: number
  estimatedHours: number
  description: string
  image: string
  status?: ProjectStatus
  startDate?: string
  endDate?: string
}
