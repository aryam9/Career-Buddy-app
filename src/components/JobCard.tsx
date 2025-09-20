import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Edit, Trash2 } from "lucide-react";
import { Job, JobStatus } from "@/types/job";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (jobId: string) => void;
}

const statusConfig = {
  applied: {
    color: "bg-status-applied text-white",
    label: "Applied"
  },
  interview: {
    color: "bg-status-interview text-white", 
    label: "Interview"
  },
  offer: {
    color: "bg-status-offer text-white",
    label: "Offer"
  },
  rejected: {
    color: "bg-status-rejected text-white",
    label: "Rejected"
  }
};

export function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  const statusInfo = statusConfig[job.status];
  
  return (
    <Card className="group shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">{job.company}</h3>
            <p className="text-muted-foreground text-sm mt-1">{job.role}</p>
          </div>
          <Badge className={cn("ml-2 flex-shrink-0", statusInfo.color)}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <span>Applied {new Date(job.applicationDate).toLocaleDateString()}</span>
        </div>
        
        {job.notes && (
          <p className="text-sm text-foreground bg-muted rounded-md p-2 mb-3 line-clamp-2">
            {job.notes}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex gap-1">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(job);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(job.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        {job.jobLink && (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <a href={job.jobLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}