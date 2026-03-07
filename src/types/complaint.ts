import type { Category, Priority } from "./ticket";

export type ComplaintStatus = "open" | "assigned" | "in_progress" | "resolved" | "escalated";

export interface Complaint {
  id: string;
  ticketNumber: string;
  category: Category;
  priority: Priority;
  department: string;
  issue_summary: string;
  description: string;
  location: string;
  citizenName: string;
  citizenPhone: string;
  suggested_sla_hours: number;
  needs_followup_call: boolean;
  reasoning: string;
  status: ComplaintStatus;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  slaDeadline: Date;
}

export interface DashboardStats {
  totalComplaints: number;
  openComplaints: number;
  resolvedToday: number;
  escalated: number;
  avgResolutionTime: number;
}
