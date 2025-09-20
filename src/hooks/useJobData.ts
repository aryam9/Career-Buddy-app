import { useState } from "react";
import { Job, JobStats } from "@/types/job";

// Mock data for demonstration
const mockJobs: Job[] = [
  {
    id: "1",
    company: "Google",
    role: "Senior Frontend Developer",
    applicationDate: "2024-01-15",
    status: "interview",
    notes: "Great team, exciting products. Second round interview scheduled.",
    jobLink: "https://careers.google.com/jobs/123",
    lastUpdated: "2024-01-20T10:30:00Z"
  },
  {
    id: "2", 
    company: "Microsoft",
    role: "React Developer",
    applicationDate: "2024-01-10",
    status: "applied",
    notes: "Applied through referral from John. Waiting for response.",
    lastUpdated: "2024-01-10T14:20:00Z"
  },
  {
    id: "3",
    company: "Netflix",
    role: "Full Stack Engineer",
    applicationDate: "2024-01-08",
    status: "offer",
    notes: "Offer received! Considering compensation package.",
    jobLink: "https://jobs.netflix.com/jobs/456",
    lastUpdated: "2024-01-22T09:15:00Z"
  },
  {
    id: "4",
    company: "Spotify",
    role: "Frontend Engineer",
    applicationDate: "2024-01-05",
    status: "rejected",
    notes: "Not a good fit for the role at this time. Keep trying!",
    lastUpdated: "2024-01-18T16:45:00Z"
  },
  {
    id: "5",
    company: "Airbnb",
    role: "UI/UX Engineer",
    applicationDate: "2024-01-12",
    status: "applied",
    notes: "Dream company! Portfolio submitted with application.",
    jobLink: "https://careers.airbnb.com/positions/789",
    lastUpdated: "2024-01-12T11:30:00Z"
  }
];

export function useJobData() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  const addJob = (newJob: Omit<Job, "id" | "lastUpdated">) => {
    const job: Job = {
      ...newJob,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    };
    setJobs(prev => [job, ...prev]);
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, ...updates, lastUpdated: new Date().toISOString() }
        : job
    ));
  };

  const deleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const getStats = (): JobStats => {
    return jobs.reduce((stats, job) => {
      stats.total++;
      stats[job.status]++;
      return stats;
    }, { total: 0, applied: 0, interview: 0, offer: 0, rejected: 0 });
  };

  return {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    stats: getStats()
  };
}