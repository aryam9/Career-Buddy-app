import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Job, JobStatus } from "@/types/job";
import { JobCard } from "./JobCard";
import { cn } from "@/lib/utils";

interface KanbanBoardProps {
  jobs: Job[];
  onAddJob?: () => void;
  onEditJob?: (job: Job) => void;
  onDeleteJob?: (jobId: string) => void;
}

const columns: { status: JobStatus; title: string; color: string }[] = [
  { status: "applied", title: "Applied", color: "border-t-status-applied" },
  { status: "interview", title: "Interview", color: "border-t-status-interview" },
  { status: "offer", title: "Offer", color: "border-t-status-offer" },
  { status: "rejected", title: "Rejected", color: "border-t-status-rejected" },
];

export function KanbanBoard({ jobs, onAddJob, onEditJob, onDeleteJob }: KanbanBoardProps) {
  const getJobsByStatus = (status: JobStatus) => 
    jobs.filter(job => job.status === status);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => {
        const statusJobs = getJobsByStatus(column.status);
        
        return (
          <Card key={column.status} className={cn("border-t-4", column.color)}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  {column.title}
                </CardTitle>
                <span className="bg-muted text-muted-foreground text-sm px-2 py-1 rounded-full">
                  {statusJobs.length}
                </span>
              </div>
              
              {column.status === "applied" && onAddJob && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAddJob}
                  className="w-full justify-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Job
                </Button>
              )}
            </CardHeader>
            
            <CardContent className="space-y-3">
              {statusJobs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No jobs in this stage</p>
                </div>
              ) : (
                statusJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={onEditJob}
                    onDelete={onDeleteJob}
                  />
                ))
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}