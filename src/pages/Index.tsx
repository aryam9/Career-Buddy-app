import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Target, TrendingUp, Users, Zap } from "lucide-react";
import { KanbanBoard } from "@/components/KanbanBoard";
import { StatsGrid } from "@/components/StatsGrid";
import { AddJobDialog } from "@/components/AddJobDialog";
import { useJobData } from "@/hooks/useJobData";
import { Job } from "@/types/job";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { jobs, addJob, updateJob, deleteJob, stats } = useJobData();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();

  const handleAddJob = (newJob: Omit<Job, "id" | "lastUpdated">) => {
    addJob(newJob);
    toast({
      title: "Job Application Added",
      description: `Added ${newJob.company} - ${newJob.role} to your tracker.`,
    });
  };

  const handleDeleteJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      deleteJob(jobId);
      toast({
        title: "Job Application Removed",
        description: `Removed ${job.company} - ${job.role} from your tracker.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">JobTracker</h1>
                <p className="text-sm text-muted-foreground">Manage your job applications</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-primary hover:opacity-90 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Job
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        {jobs.length === 0 && (
          <div className="text-center py-16 mb-12">
            <div className="h-16 w-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Welcome to JobTracker! 🚀
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take control of your job search with our intuitive Kanban board. 
              Track applications, manage interviews, and celebrate offers.
            </p>
            <Button 
              onClick={() => setShowAddDialog(true)}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Your First Job Application
            </Button>
          </div>
        )}

        {/* Stats Grid */}
        {jobs.length > 0 && <StatsGrid stats={stats} />}

        {/* Kanban Board */}
        <KanbanBoard
          jobs={jobs}
          onAddJob={() => setShowAddDialog(true)}
          onEditJob={(job) => {
            // Future: implement edit functionality
            toast({
              title: "Edit Feature",
              description: "Edit functionality coming soon!",
            });
          }}
          onDeleteJob={handleDeleteJob}
        />

        {/* Features Section (shown when no jobs) */}
        {jobs.length === 0 && (
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6">
              <div className="h-12 w-12 bg-status-applied/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-status-applied" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Track Applications</h3>
              <p className="text-sm text-muted-foreground">
                Monitor all your job applications in one organized dashboard
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="h-12 w-12 bg-status-interview/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-status-interview" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Manage Interviews</h3>
              <p className="text-sm text-muted-foreground">
                Keep track of interview stages and follow-up reminders
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="h-12 w-12 bg-status-offer/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-status-offer" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Celebrate Success</h3>
              <p className="text-sm text-muted-foreground">
                Track offers and manage your career opportunities
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Add Job Dialog */}
      <AddJobDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddJob={handleAddJob}
      />
    </div>
  );
};

export default Index;
