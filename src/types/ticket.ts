export type Category = 'WATER' | 'ELECTRICITY' | 'SANITATION' | 'SAFETY' | 'OTHER';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Ticket {
  category: Category;
  priority: Priority;
  department: string;
  issue_summary: string;
  suggested_sla_hours: number;
  needs_followup_call: boolean;
  reasoning: string;
}

export interface ComplaintFormData {
  description: string;
  location?: string;
  contact?: string;
}
