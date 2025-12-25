import { CheckCircle2, Sparkles } from "lucide-react";

interface EmptyStateProps {
  type: "no-results" | "all-done" | "no-planned";
}

export const EmptyState = ({ type }: EmptyStateProps) => {
  const configs = {
    "no-results": {
      icon: Sparkles,
      title: "No recommendations found",
      description: "Try adjusting your filters to see more recommendations.",
      iconBg: "bg-muted/50",
      iconColor: "text-muted-foreground",
    },
    "all-done": {
      icon: CheckCircle2,
      title: "You're all caught up!",
      description: "No urgent actions needed right now. Great job keeping your campaigns optimized!",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    "no-planned": {
      icon: Sparkles,
      title: "No planned recommendations",
      description: "Check back later for new optimization opportunities.",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="glass-card rounded-2xl p-8 md:p-12 border border-border/50 text-center">
      <div className={`inline-flex p-4 rounded-2xl ${config.iconBg} mb-4`}>
        <Icon className={`h-8 w-8 ${config.iconColor}`} />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{config.title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        {config.description}
      </p>
    </div>
  );
};
