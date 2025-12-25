import { Zap, Clock, CheckCircle2, Target } from "lucide-react";

interface RecommendationStatsProps {
  urgentCount: number;
  plannedCount: number;
  completedCount: number;
  campaignCount: number;
}

export const RecommendationStats = ({
  urgentCount,
  plannedCount,
  completedCount,
  campaignCount,
}: RecommendationStatsProps) => {
  const stats = [
    {
      label: "Urgent Actions",
      value: urgentCount,
      icon: Zap,
      gradient: "from-red-500 to-orange-500",
      bgGlow: "bg-red-500/10",
      iconBg: "bg-red-500/20",
      textColor: "text-red-500",
    },
    {
      label: "Planned",
      value: plannedCount,
      icon: Clock,
      gradient: "from-amber-500 to-yellow-500",
      bgGlow: "bg-amber-500/10",
      iconBg: "bg-amber-500/20",
      textColor: "text-amber-500",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-green-500",
      bgGlow: "bg-emerald-500/10",
      iconBg: "bg-emerald-500/20",
      textColor: "text-emerald-500",
    },
    {
      label: "Campaigns",
      value: campaignCount,
      icon: Target,
      gradient: "from-primary to-purple-500",
      bgGlow: "bg-primary/10",
      iconBg: "bg-primary/20",
      textColor: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`glass-card rounded-2xl p-4 md:p-5 ${stat.bgGlow} border border-border/50 hover-lift transition-all duration-300`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
              <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
            </div>
            <div>
              <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
