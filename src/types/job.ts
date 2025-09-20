export type JobStatus = "applied" | "interview" | "offer" | "rejected";

export interface Job {
  id: string;
  company: string;
  role: string;
  applicationDate: string;
  status: JobStatus;
  notes?: string;
  jobLink?: string;
  lastUpdated: string;
}

export interface JobStats {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}