import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobStats } from "@/types/job";
import { TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react";

interface StatsGridProps {
  stats: JobStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: TrendingUp,
      description: "All applications",
      color: "text-foreground"
    },
    {
      title: "Applied",
      value: stats.applied,
      icon: Clock,
      description: "Awaiting response",
      color: "text-status-applied"
    },
    {
      title: "Interviews",
      value: stats.interview,
      icon: CheckCircle,
      description: "In progress",
      color: "text-status-interview"
    },
    {
      title: "Offers",
      value: stats.offer,
      icon: CheckCircle,
      description: "Success!",
      color: "text-status-offer"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item) => {
        const Icon = item.icon;
        
        return (
          <Card key={item.title} className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {item.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}